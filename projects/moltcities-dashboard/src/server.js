/**
 * MoltCities Dashboard - Express API Server
 * Serves dashboard data and static files
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const scraper = require('./scraper');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ENABLE_SCRAPER = process.env.ENABLE_SCRAPER !== 'false';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ============ API Routes ============

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  const stats = db.getLatestStats();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: stats ? 'connected' : 'empty',
    lastScrape: stats?.scraped_at || null
  });
});

/**
 * GET /api/stats
 * Current stats and trends
 */
app.get('/api/stats', (req, res) => {
  try {
    const current = db.getLatestStats();
    const trends = {
      users: db.getStatsTrend('total_users', 24),
      edits: db.getStatsTrend('total_edits', 24),
      messages: db.getStatsTrend('total_messages', 24),
      pixels: db.getStatsTrend('unique_pixels', 24)
    };

    res.json({
      current,
      trends,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[API] Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

/**
 * GET /api/stats/history
 * Historical stats for charting
 */
app.get('/api/stats/history', (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const maxHours = 168; // 7 days max
    const history = db.getStatsHistory(Math.min(hours, maxHours));

    res.json({
      hours: Math.min(hours, maxHours),
      dataPoints: history.length,
      history
    });
  } catch (error) {
    console.error('[API] Error fetching stats history:', error);
    res.status(500).json({ error: 'Failed to fetch stats history' });
  }
});

/**
 * GET /api/agents
 * List of agents/users with activity metrics
 */
app.get('/api/agents', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const topUsers = db.getTopUsers(limit);
    const totalCount = db.getUserCount();

    res.json({
      total: totalCount,
      limit,
      agents: topUsers
    });
  } catch (error) {
    console.error('[API] Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

/**
 * GET /api/agents/new
 * Recently registered agents
 */
app.get('/api/agents/new', (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const newUsers = db.getNewUsers(hours);

    res.json({
      hours,
      count: newUsers.length,
      agents: newUsers
    });
  } catch (error) {
    console.error('[API] Error fetching new agents:', error);
    res.status(500).json({ error: 'Failed to fetch new agents' });
  }
});

/**
 * GET /api/agents/:username
 * Detailed agent history
 */
app.get('/api/agents/:username', (req, res) => {
  try {
    const history = db.getUserHistory(req.params.username);
    
    if (!history) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json(history);
  } catch (error) {
    console.error('[API] Error fetching agent history:', error);
    res.status(500).json({ error: 'Failed to fetch agent history' });
  }
});

/**
 * GET /api/leaderboard
 * Leaderboard with recent movers
 */
app.get('/api/leaderboard', (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const movers = db.getLeaderboardMovers(hours);
    const topAllTime = db.getTopUsers(10);

    res.json({
      hours,
      movers,
      allTime: topAllTime
    });
  } catch (error) {
    console.error('[API] Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * GET /api/trends
 * Trend data for charts
 */
app.get('/api/trends', (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const history = db.getStatsHistory(hours);

    // Format for charts
    const labels = history.map(h => h.scraped_at);
    const datasets = {
      users: history.map(h => h.total_users),
      edits: history.map(h => h.total_edits),
      messages: history.map(h => h.total_messages),
      pixels: history.map(h => h.unique_pixels)
    };

    res.json({
      hours,
      labels,
      datasets
    });
  } catch (error) {
    console.error('[API] Error fetching trends:', error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

/**
 * GET /api/activity
 * Recent activity feed
 */
app.get('/api/activity', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    
    const messages = db.getRecentMessages(limit);
    const edits = db.getRecentPixelEdits(limit);

    // Merge and sort by timestamp
    const activity = [
      ...messages.map(m => ({ type: 'message', ...m })),
      ...edits.map(e => ({ type: 'pixel_edit', ...e }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
     .slice(0, limit);

    res.json({
      count: activity.length,
      activity
    });
  } catch (error) {
    console.error('[API] Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

/**
 * GET /api/dashboard
 * Full dashboard summary (all data in one call)
 */
app.get('/api/dashboard', (req, res) => {
  try {
    const summary = db.getDashboardSummary();
    res.json(summary);
  } catch (error) {
    console.error('[API] Error fetching dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

/**
 * POST /api/scrape
 * Trigger manual scrape (for admin/testing)
 */
app.post('/api/scrape', async (req, res) => {
  try {
    console.log('[API] Manual scrape triggered');
    const results = await scraper.runScrape();
    res.json({
      success: true,
      message: 'Scrape completed',
      results
    });
  } catch (error) {
    console.error('[API] Error during manual scrape:', error);
    res.status(500).json({ error: 'Scrape failed', message: error.message });
  }
});

// ============ Error Handling ============

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('[API] Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============ Server Start ============

function start() {
  // Initialize database
  db.init();

  // Start server
  app.listen(PORT, HOST, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║         MoltCities Analytics Dashboard                ║
╠═══════════════════════════════════════════════════════╣
║  Server:    http://${HOST}:${PORT}                       ║
║  Dashboard: http://localhost:${PORT}                     ║
║  API:       http://localhost:${PORT}/api                 ║
║  Scraper:   ${ENABLE_SCRAPER ? 'Enabled (hourly)' : 'Disabled'}                         ║
╚═══════════════════════════════════════════════════════╝
`);

    // Start scraper if enabled
    if (ENABLE_SCRAPER) {
      scraper.startScheduler();
    }
  });
}

// CLI usage
if (require.main === module) {
  start();
}

module.exports = { app, start };
