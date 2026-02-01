# Agent Launchpad

Take any AI agent onchain with one command. Free.

## What You Get

- **Token** — Clanker V4 token on Base with LP and trading
- **Basename** — `<name>.base.eth` onchain identity (coming soon)
- **Fee Revenue** — 75% of all LP trading fees go to the agent
- **Cost** — $0. Token deploy is free. Basename is sponsored.

## Quick Start

### Option 1: API (Simplest)

```bash
curl -X POST https://YOUR_LAUNCHPAD_URL/api/launch \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Scout",
    "symbol": "SCOUT",
    "admin": "0xYOUR_AGENT_WALLET_ADDRESS",
    "description": "AI research assistant",
    "image": "https://example.com/avatar.png"
  }'
```

Response includes:
- Token contract address
- Clanker tracking URL
- **Twitter intent link** — click to announce your launch

### Option 2: CLI (Direct)

```bash
# Install
cd agent-tools/skills/agent-launchpad
npm install

# Deploy
node scripts/deploy-token.mjs \
  --name "Scout" \
  --symbol "SCOUT" \
  --admin 0xYOUR_WALLET \
  --description "AI research assistant" \
  --image https://example.com/avatar.png
```

### Option 3: Full Pipeline (Wallet + Token)

Creates a new CDP smart wallet, funds it, and deploys:

```bash
# Set up credentials
export CDP_API_KEY_ID="your-key-id"
export CDP_API_KEY_SECRET="your-key-secret"
export FUNDING_WALLET_KEY="0x..."

# Launch
node scripts/launch.mjs --name "Scout"
```

## API Reference

### POST /api/launch

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Agent/token name |
| `admin` | ✅ | Wallet address (receives 75% LP fees) |
| `symbol` | | Token symbol (auto-derived from name) |
| `description` | | Token description |
| `image` | | Image URL (IPFS preferred — use `upload-image.mjs` to pin) |
| `socialUrls` | | Array of `{platform, url}` e.g. `[{"platform":"twitter","url":"https://x.com/..."}]` |
| `chainId` | | `8453` (Base, default), `130` (Unichain), `42161` (Arbitrum) |
| `poolType` | | `standard` (default, meme) or `project` (tighter liquidity) |
| `feeType` | | `static` (default, 1%) or `dynamic` (volatility-based) |
| `vault` | | `{percentage, lockupDays, vestingDays}` — lock token supply as trust signal |
| `devBuy` | | `{ethAmount}` — initial purchase on the pool at launch |

### Response

```json
{
  "success": true,
  "token": {
    "tokenAddress": "0x...",
    "clankerUrl": "https://clanker.world/clanker/0x..."
  },
  "basename": {
    "basename": "scout.base.eth",
    "owner": "0x..."
  },
  "feeStructure": {
    "agent": "75%",
    "protocol": "25%"
  },
  "twitterIntentUrl": "https://twitter.com/intent/tweet?text=...",
  "announcement": "My agent Scout is officially tokenized..."
}
```

## Fee Structure

| Recipient | Share | Description |
|-----------|-------|-------------|
| Agent | 75% | LP trading fees → agent's wallet |
| Protocol | 25% | LP trading fees → protocol treasury |

Fees accumulate from trading volume on the Uniswap V4 pool. Claimable anytime via:

```bash
node scripts/claim-rewards.mjs --token 0x... --check-only
node scripts/claim-rewards.mjs --token 0x...
```

## After Launch

### Announce It
The API returns a ready-to-click Twitter intent link. Example tweet:

> Scout is now tokenized on Base.
>
> 75% of all LP trading fees go directly to me — with auto V4 LP management built in.
>
> Launched via @AxiomBot Agent Launchpad 🔬
>
> $SCOUT
> https://clanker.world/clanker/0x...

### Monitor Your Token
```bash
# Check token status + uncollected fees
curl https://YOUR_LAUNCHPAD_URL/api/status/0xYOUR_TOKEN_ADDRESS \
  -H "x-api-key: YOUR_KEY"

# See all tokens by your admin address
curl https://YOUR_LAUNCHPAD_URL/api/fees/0xYOUR_ADMIN_ADDRESS \
  -H "x-api-key: YOUR_KEY"
```

### Claim Fees
Fees accumulate automatically from trading volume. Claim anytime:
```bash
# Check available fees
node scripts/claim-rewards.mjs --token 0x... --check-only

# Claim to your wallet
node scripts/claim-rewards.mjs --token 0x...
```

Anyone can call `claim()` on the ClankerFeeLocker — funds always go to the registered recipient. You can automate this via cron.

### What to Do Next
1. **Share the Twitter link** — The 75% fee angle is compelling, lead with it
2. **Add liquidity context** — Tell your community what your agent does
3. **Monitor volume** — Check fees daily, claim weekly
4. **Build utility** — Tokens with real agent utility retain value

## Environment Variables

For CLI usage:

| Variable | Description |
|----------|-------------|
| `CLANKER_API_KEY` | Clanker V4 API key (for deploy-token.mjs) |
| `CDP_API_KEY_ID` | Coinbase Developer Platform key (for launch.mjs) |
| `CDP_API_KEY_SECRET` | CDP key secret |
| `CDP_WALLET_SECRET` | CDP wallet encryption secret |
| `CDP_PAYMASTER_URL` | Paymaster URL for sponsored basenames |

## Self-Hosting the API

```bash
cd api/
node server.mjs --port 3000
```

The server needs `CLANKER_API_KEY` and optionally CDP credentials for basename registration.
