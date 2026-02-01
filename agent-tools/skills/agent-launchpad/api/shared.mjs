/**
 * Shared logic for Vercel serverless functions
 */
import { randomBytes } from 'crypto';

// Fee recipients — hardcoded
export const PROTOCOL_FEE_ADDRESS = "0x0D9945F0a591094927df47DB12ACB1081cE9F0F6";
export const PROTOCOL_ALLOCATION = 25;
export const AGENT_ALLOCATION = 75;

// Input limits
const MAX_NAME_LENGTH = 50;
const MAX_SYMBOL_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 500;

// Rate limiting (in-memory, resets on cold start — good enough for serverless)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

export function checkRateLimit(ip) {
  const now = Date.now();
  if (rateLimitMap.size > 100) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) rateLimitMap.delete(key);
    }
  }
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + RATE_LIMIT_WINDOW_MS; }
  entry.count++;
  rateLimitMap.set(ip, entry);
  return { allowed: entry.count <= RATE_LIMIT_MAX, remaining: Math.max(0, RATE_LIMIT_MAX - entry.count) };
}

export function checkAuth(req) {
  const key = process.env.LAUNCHPAD_API_KEY;
  if (!key) return true; // no key set = open
  return req.headers['x-api-key'] === key;
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
}

export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[<>"'`\x00-\x1f\x7f-\x9f]/g, '').trim();
}

export function validateLaunchInput(body) {
  const errors = [];
  if (!body.name) errors.push('Missing: name');
  else if (body.name.length > MAX_NAME_LENGTH) errors.push(`name too long (max ${MAX_NAME_LENGTH})`);
  if (body.admin) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(body.admin)) errors.push('Invalid admin address');
    else if (body.admin === '0x0000000000000000000000000000000000000000') errors.push('admin cannot be zero address');
  }
  if (body.symbol && body.symbol.length > MAX_SYMBOL_LENGTH) errors.push(`symbol too long (max ${MAX_SYMBOL_LENGTH})`);
  if (body.description && body.description.length > MAX_DESCRIPTION_LENGTH) errors.push(`description too long (max ${MAX_DESCRIPTION_LENGTH})`);
  if (body.image && typeof body.image === 'string' && body.image.length > 500) errors.push('image URL too long');
  return errors;
}

export async function createAgentWallet() {
  const { generatePrivateKey, privateKeyToAccount } = await import('viem/accounts');
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return { address: account.address, privateKey };
}

export async function deployToken({ name, symbol, admin, description, image, socialUrls, chainId, poolType, feeType, vault, devBuy }) {
  const CLANKER_API_KEY = process.env.CLANKER_API_KEY;
  if (!CLANKER_API_KEY) throw new Error('CLANKER_API_KEY not configured');

  const requestKey = randomBytes(16).toString('hex');
  const socialMediaUrls = [];
  if (socialUrls) {
    if (typeof socialUrls === 'string') socialMediaUrls.push({ platform: 'twitter', url: socialUrls });
    else if (Array.isArray(socialUrls)) socialMediaUrls.push(...socialUrls);
  }

  const body = {
    token: {
      name,
      symbol: symbol || name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5),
      tokenAdmin: admin,
      description: description || `${name} — launched via Agent Launchpad`,
      requestKey,
      ...(image && { image }),
      ...(socialMediaUrls.length > 0 && { socialMediaUrls }),
    },
    rewards: [
      { admin, recipient: admin, allocation: AGENT_ALLOCATION, rewardsToken: "Both" },
      { admin: PROTOCOL_FEE_ADDRESS, recipient: PROTOCOL_FEE_ADDRESS, allocation: PROTOCOL_ALLOCATION, rewardsToken: "Paired" },
    ],
    pool: { type: poolType || "standard", pairedToken: "0x4200000000000000000000000000000000000006", initialMarketCap: 10 },
    fees: feeType === 'dynamic'
      ? { type: "dynamic", baseFee: 0.5, maxLpFee: 5 }
      : { type: "static", clankerFee: 1, pairedFee: 1 },
    chainId: chainId || 8453,
  };

  if (vault) {
    body.vault = { percentage: vault.percentage || 10, lockupDuration: (vault.lockupDays || 30) * 86400, vestingDuration: (vault.vestingDays || 0) * 86400 };
  }
  if (devBuy && devBuy.ethAmount) body.devBuy = { ethAmount: devBuy.ethAmount };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  
  const resp = await fetch('https://www.clanker.world/api/tokens/deploy/v4', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': CLANKER_API_KEY },
    body: JSON.stringify(body),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  const data = await resp.json();
  if (resp.ok && data.success) {
    return { success: true, tokenAddress: data.expectedAddress, requestKey, clankerUrl: `https://clanker.world/clanker/${data.expectedAddress}` };
  }
  const safeError = data.error || 'Deploy failed';
  return { success: false, error: typeof safeError === 'string' ? safeError : 'Deploy failed' };
}

export async function clankerGet(path) {
  const CLANKER_API_KEY = process.env.CLANKER_API_KEY;
  if (!CLANKER_API_KEY) return { error: 'Not configured' };
  try {
    const resp = await fetch(`https://www.clanker.world/api${path}`, {
      headers: { 'x-api-key': CLANKER_API_KEY },
    });
    if (!resp.ok) return { error: `API returned ${resp.status}` };
    return await resp.json();
  } catch { return { error: 'Clanker API unavailable' }; }
}
