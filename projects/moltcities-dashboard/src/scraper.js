/**
 * MoltCities Dashboard - Scraper Module
 * Fetches data from MoltCities API on a schedule
 */

const cron = require('node-cron');
const db = require('./db');

const BASE_URL = process.env.MOLTCITIES_URL || 'https://moltcities.com';
const SCRAPE_INTERVAL = process.env.SCRAPE_INTERVAL || '0 * * * *'; // Every hour

/**
 * Fetch with timeout and error handling
 */
async function fetchJSON(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MoltCities-Dashboard/1.0 (github.com/axiom/moltcities-dashboard)',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Timeout fetching ${endpoint}`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Scrape global stats
 */
async function scrapeStats() {
  console.log('[Scraper] Fetching /stats...');
  try {
    const stats = await fetchJSON('/stats');
    db.saveStatsSnapshot(stats);
    db.saveRawSnapshot('/stats', stats);
    console.log(`[Scraper] Stats saved: ${stats.total_users} users, ${stats.total_edits} edits`);
    return stats;
  } catch (error) {
    console.error('[Scraper] Failed to fetch stats:', error.message);
    return null;
  }
}

/**
 * Scrape user directory
 */
async function scrapeUsers() {
  console.log('[Scraper] Fetching /users...');
  try {
    const data = await fetchJSON('/users');
    let newCount = 0;
    
    for (const user of data.users || []) {
      const result = db.upsertUser(user.username, user.created_at);
      if (result.changes > 0) newCount++;
    }

    db.saveRawSnapshot('/users', { total: data.total_count, sample: data.users?.slice(0, 5) });
    console.log(`[Scraper] Users synced: ${data.total_count} total, ${newCount} new`);
    return { total: data.total_count, new: newCount };
  } catch (error) {
    console.error('[Scraper] Failed to fetch users:', error.message);
    return null;
  }
}

/**
 * Scrape channel messages (incremental)
 */
async function scrapeMessages(channel = 'general') {
  console.log(`[Scraper] Fetching /channels/${channel}/messages...`);
  try {
    const data = await fetchJSON(`/channels/${channel}/messages`);
    const lastId = db.getLastMessageId(channel);
    let newCount = 0;

    for (const msg of data.messages || []) {
      if (msg.id > lastId) {
        db.saveMessage({
          id: msg.id,
          channel: channel,
          username: msg.username,
          content: msg.content,
          created_at: msg.created_at
        });
        newCount++;
      }
    }

    console.log(`[Scraper] Messages synced: ${newCount} new messages in #${channel}`);
    return { channel, new: newCount };
  } catch (error) {
    console.error(`[Scraper] Failed to fetch messages from #${channel}:`, error.message);
    return null;
  }
}

/**
 * Scrape channels list
 */
async function scrapeChannels() {
  console.log('[Scraper] Fetching /channels...');
  try {
    const data = await fetchJSON('/channels');
    db.saveRawSnapshot('/channels', data);
    console.log(`[Scraper] Channels: ${data.channels?.length || 0} total`);
    return data.channels || [];
  } catch (error) {
    console.error('[Scraper] Failed to fetch channels:', error.message);
    return [];
  }
}

/**
 * Sample pixel history for activity tracking
 * Samples random pixels to discover recent edits
 */
async function samplePixelHistory() {
  console.log('[Scraper] Sampling pixel history...');
  
  // Sample some strategic coordinates
  const samples = [
    { x: 512, y: 512 },  // Center
    { x: 256, y: 256 },
    { x: 768, y: 768 },
    { x: 100, y: 100 },
    { x: 900, y: 100 }
  ];

  let totalEdits = 0;

  for (const { x, y } of samples) {
    try {
      const data = await fetchJSON(`/pixel/history?x=${x}&y=${y}`);
      
      for (const edit of data.history || []) {
        const result = db.savePixelEdit({
          id: edit.id,
          x: edit.x,
          y: edit.y,
          color: edit.color,
          username: edit.username,
          created_at: edit.created_at
        });
        if (result.changes > 0) totalEdits++;
      }

      // Small delay between requests
      await new Promise(r => setTimeout(r, 100));
    } catch (error) {
      console.error(`[Scraper] Failed to fetch pixel history (${x},${y}):`, error.message);
    }
  }

  console.log(`[Scraper] Pixel history: ${totalEdits} edits recorded`);
  return totalEdits;
}

/**
 * Run full scrape cycle
 */
async function runScrape() {
  const startTime = Date.now();
  console.log('\n' + '='.repeat(50));
  console.log(`[Scraper] Starting scrape at ${new Date().toISOString()}`);
  console.log('='.repeat(50));

  const results = {
    stats: await scrapeStats(),
    users: await scrapeUsers(),
    channels: await scrapeChannels(),
    messages: null,
    pixels: null
  };

  // Scrape messages from all channels
  for (const channel of results.channels) {
    const msgResult = await scrapeMessages(channel.name);
    if (!results.messages) results.messages = [];
    results.messages.push(msgResult);
    await new Promise(r => setTimeout(r, 200)); // Rate limiting
  }

  // Sample pixel history
  results.pixels = await samplePixelHistory();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('='.repeat(50));
  console.log(`[Scraper] Scrape complete in ${duration}s`);
  console.log('='.repeat(50) + '\n');

  return results;
}

/**
 * Start the cron scheduler
 */
function startScheduler() {
  console.log(`[Scraper] Starting scheduler with pattern: ${SCRAPE_INTERVAL}`);
  
  // Run immediately on start
  runScrape().catch(console.error);

  // Schedule recurring scrapes
  cron.schedule(SCRAPE_INTERVAL, () => {
    runScrape().catch(console.error);
  });

  console.log('[Scraper] Scheduler running. Press Ctrl+C to stop.');
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--once')) {
    // Single scrape then exit
    runScrape()
      .then(() => {
        console.log('[Scraper] Single scrape complete. Exiting.');
        process.exit(0);
      })
      .catch(err => {
        console.error('[Scraper] Fatal error:', err);
        process.exit(1);
      });
  } else {
    // Start scheduler
    startScheduler();
  }
}

module.exports = {
  fetchJSON,
  scrapeStats,
  scrapeUsers,
  scrapeMessages,
  scrapeChannels,
  samplePixelHistory,
  runScrape,
  startScheduler
};
