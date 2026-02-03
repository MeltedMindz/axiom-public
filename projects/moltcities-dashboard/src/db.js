/**
 * MoltCities Dashboard - Database Module
 * SQLite storage for stats snapshots, user tracking, and activity history
 */

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'moltcities.db');

let db = null;

/**
 * Initialize database connection and create tables
 */
function init() {
  const fs = require('fs');
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Create tables
  db.exec(`
    -- Global stats snapshots (hourly)
    CREATE TABLE IF NOT EXISTS stats_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scraped_at TEXT NOT NULL DEFAULT (datetime('now')),
      total_edits INTEGER NOT NULL,
      unique_pixels INTEGER NOT NULL,
      total_users INTEGER NOT NULL,
      total_channels INTEGER NOT NULL,
      total_messages INTEGER NOT NULL
    );

    -- User directory
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      first_seen TEXT NOT NULL DEFAULT (datetime('now')),
      created_at TEXT NOT NULL
    );

    -- User activity snapshots (for leaderboard deltas)
    CREATE TABLE IF NOT EXISTS user_activity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      scraped_at TEXT NOT NULL DEFAULT (datetime('now')),
      pixel_edits INTEGER DEFAULT 0,
      message_count INTEGER DEFAULT 0,
      FOREIGN KEY (username) REFERENCES users(username)
    );

    -- Channel messages
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      channel TEXT NOT NULL,
      username TEXT NOT NULL,
      content TEXT,
      created_at TEXT NOT NULL
    );

    -- Pixel edit history (sampled)
    CREATE TABLE IF NOT EXISTS pixel_edits (
      id INTEGER PRIMARY KEY,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL,
      color TEXT NOT NULL,
      username TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    -- Raw JSON snapshots (for debugging/flexibility)
    CREATE TABLE IF NOT EXISTS raw_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint TEXT NOT NULL,
      scraped_at TEXT NOT NULL DEFAULT (datetime('now')),
      data TEXT NOT NULL
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS idx_stats_scraped ON stats_snapshots(scraped_at);
    CREATE INDEX IF NOT EXISTS idx_users_created ON users(created_at);
    CREATE INDEX IF NOT EXISTS idx_activity_scraped ON user_activity(scraped_at);
    CREATE INDEX IF NOT EXISTS idx_activity_user ON user_activity(username);
    CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
    CREATE INDEX IF NOT EXISTS idx_messages_user ON messages(username);
    CREATE INDEX IF NOT EXISTS idx_pixel_user ON pixel_edits(username);
  `);

  console.log(`[DB] Initialized at ${DB_PATH}`);
  return db;
}

/**
 * Get database instance (lazy init)
 */
function getDb() {
  if (!db) {
    init();
  }
  return db;
}

// ============ Stats Snapshots ============

function saveStatsSnapshot(stats) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO stats_snapshots (total_edits, unique_pixels, total_users, total_channels, total_messages)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(
    stats.total_edits,
    stats.unique_pixels,
    stats.total_users,
    stats.total_channels,
    stats.total_messages
  );
}

function getLatestStats() {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM stats_snapshots ORDER BY scraped_at DESC LIMIT 1
  `).get();
}

function getStatsHistory(hours = 24) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM stats_snapshots 
    WHERE scraped_at >= datetime('now', ?)
    ORDER BY scraped_at ASC
  `).all(`-${hours} hours`);
}

function getStatsTrend(field, hours = 24) {
  const db = getDb();
  const history = getStatsHistory(hours);
  if (history.length < 2) return null;
  
  const first = history[0][field];
  const last = history[history.length - 1][field];
  const delta = last - first;
  const pctChange = first > 0 ? ((delta / first) * 100).toFixed(2) : 0;
  
  return {
    field,
    first,
    last,
    delta,
    pctChange: parseFloat(pctChange),
    dataPoints: history.length
  };
}

// ============ Users ============

function upsertUser(username, createdAt) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO users (username, created_at) VALUES (?, ?)
    ON CONFLICT(username) DO NOTHING
  `);
  return stmt.run(username, createdAt);
}

function getNewUsers(hours = 24) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM users 
    WHERE first_seen >= datetime('now', ?)
    ORDER BY first_seen DESC
  `).all(`-${hours} hours`);
}

function getUserCount() {
  const db = getDb();
  return db.prepare('SELECT COUNT(*) as count FROM users').get().count;
}

function getTopUsers(limit = 10) {
  const db = getDb();
  return db.prepare(`
    SELECT 
      u.username,
      u.created_at,
      COALESCE(pe.edit_count, 0) as pixel_edits,
      COALESCE(m.msg_count, 0) as message_count,
      COALESCE(pe.edit_count, 0) + COALESCE(m.msg_count, 0) as total_activity
    FROM users u
    LEFT JOIN (
      SELECT username, COUNT(*) as edit_count FROM pixel_edits GROUP BY username
    ) pe ON u.username = pe.username
    LEFT JOIN (
      SELECT username, COUNT(*) as msg_count FROM messages GROUP BY username
    ) m ON u.username = m.username
    ORDER BY total_activity DESC
    LIMIT ?
  `).all(limit);
}

// ============ Messages ============

function saveMessage(msg) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO messages (id, channel, username, content, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(msg.id, msg.channel, msg.username, msg.content, msg.created_at);
}

function getLastMessageId(channel = 'general') {
  const db = getDb();
  const result = db.prepare(`
    SELECT MAX(id) as last_id FROM messages WHERE channel = ?
  `).get(channel);
  return result?.last_id || 0;
}

function getRecentMessages(limit = 50) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM messages ORDER BY created_at DESC LIMIT ?
  `).all(limit);
}

function getMessagesByUser(username, limit = 20) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM messages WHERE username = ? ORDER BY created_at DESC LIMIT ?
  `).all(username, limit);
}

// ============ Pixel Edits ============

function savePixelEdit(edit) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO pixel_edits (id, x, y, color, username, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(edit.id, edit.x, edit.y, edit.color, edit.username, edit.created_at);
}

function getPixelEditsByUser(username, limit = 20) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM pixel_edits WHERE username = ? ORDER BY created_at DESC LIMIT ?
  `).all(username, limit);
}

function getRecentPixelEdits(limit = 50) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM pixel_edits ORDER BY created_at DESC LIMIT ?
  `).all(limit);
}

// ============ Leaderboard Deltas ============

function getLeaderboardMovers(hours = 24) {
  const db = getDb();
  
  // Get activity in the last N hours vs previous period
  const current = db.prepare(`
    SELECT 
      u.username,
      COUNT(DISTINCT CASE WHEN pe.id IS NOT NULL THEN pe.id END) as pixel_edits,
      COUNT(DISTINCT CASE WHEN m.id IS NOT NULL THEN m.id END) as messages
    FROM users u
    LEFT JOIN pixel_edits pe ON u.username = pe.username 
      AND pe.created_at >= datetime('now', ?)
    LEFT JOIN messages m ON u.username = m.username 
      AND m.created_at >= datetime('now', ?)
    GROUP BY u.username
    HAVING pixel_edits > 0 OR messages > 0
    ORDER BY (pixel_edits + messages) DESC
    LIMIT 20
  `).all(`-${hours} hours`, `-${hours} hours`);

  return current.map(u => ({
    username: u.username,
    pixelEdits: u.pixel_edits,
    messages: u.messages,
    totalActivity: u.pixel_edits + u.messages
  }));
}

// ============ Raw Snapshots ============

function saveRawSnapshot(endpoint, data) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO raw_snapshots (endpoint, data) VALUES (?, ?)
  `);
  return stmt.run(endpoint, JSON.stringify(data));
}

// ============ User History ============

function getUserHistory(username) {
  const db = getDb();
  
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) return null;

  const pixelEdits = getPixelEditsByUser(username, 50);
  const messages = getMessagesByUser(username, 50);

  return {
    ...user,
    pixelEdits,
    messages,
    stats: {
      totalPixelEdits: pixelEdits.length,
      totalMessages: messages.length
    }
  };
}

// ============ Aggregate Stats ============

function getDashboardSummary() {
  const db = getDb();
  
  const latestStats = getLatestStats();
  const newUsers24h = getNewUsers(24);
  const topUsers = getTopUsers(10);
  const recentMessages = getRecentMessages(10);
  const recentEdits = getRecentPixelEdits(10);
  const movers = getLeaderboardMovers(24);

  // Calculate trends
  const trends = {
    users: getStatsTrend('total_users', 24),
    edits: getStatsTrend('total_edits', 24),
    messages: getStatsTrend('total_messages', 24),
    pixels: getStatsTrend('unique_pixels', 24)
  };

  return {
    currentStats: latestStats,
    trends,
    newUsers24h: newUsers24h.slice(0, 10),
    topUsers,
    recentMessages,
    recentEdits,
    leaderboardMovers: movers,
    meta: {
      generatedAt: new Date().toISOString(),
      totalUsersTracked: getUserCount()
    }
  };
}

module.exports = {
  init,
  getDb,
  // Stats
  saveStatsSnapshot,
  getLatestStats,
  getStatsHistory,
  getStatsTrend,
  // Users
  upsertUser,
  getNewUsers,
  getUserCount,
  getTopUsers,
  getUserHistory,
  // Messages
  saveMessage,
  getLastMessageId,
  getRecentMessages,
  getMessagesByUser,
  // Pixels
  savePixelEdit,
  getPixelEditsByUser,
  getRecentPixelEdits,
  // Leaderboard
  getLeaderboardMovers,
  // Raw
  saveRawSnapshot,
  // Dashboard
  getDashboardSummary
};
