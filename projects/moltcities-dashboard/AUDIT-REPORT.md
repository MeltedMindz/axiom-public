# MoltCities Dashboard - Audit Report 🔍

**Auditor:** Analyst (Axiom Quality Specialist)  
**Date:** 2026-02-02  
**Version:** 1.0.0  
**Project:** moltcities-dashboard

---

## Executive Summary

| Category | Status | Issues |
|----------|--------|--------|
| Code Quality | ✅ **PASS** | 1 bug found & fixed |
| Security | ✅ **PASS** | Minor recommendations |
| Error Handling | ✅ **PASS** | Good coverage |
| Data Integrity | ✅ **PASS** | Solid implementation |
| Performance | ✅ **PASS** | Well-optimized |
| Documentation | ✅ **PASS** | Excellent |

**Final Verdict: ✅ READY FOR SUBMISSION** — Critical bug found and fixed during audit.

---

## 1. Code Quality

### Overall Assessment: ⚠️ NEEDS FIX

**Strengths:**
- ✅ Clean, modular architecture (db.js, server.js, scraper.js)
- ✅ Consistent coding style throughout
- ✅ Logical function naming (e.g., `saveStatsSnapshot`, `getLeaderboardMovers`)
- ✅ Good use of JSDoc-style comments for functions
- ✅ Proper ES module exports
- ✅ Frontend uses vanilla JS with clean separation of concerns

**Issues Found:**

### 🔴 CRITICAL BUG: Ambiguous Column Reference (db.js:274)

```javascript
// In getLeaderboardMovers() function
SELECT 
  username,  // ← BUG: Should be u.username
  COUNT(DISTINCT CASE WHEN pe.id IS NOT NULL THEN pe.id END) as pixel_edits,
  ...
FROM users u
LEFT JOIN pixel_edits pe ON u.username = pe.username 
LEFT JOIN messages m ON u.username = m.username 
```

**Error:** `SqliteError: ambiguous column name: username`

**Fix Required:**
```diff
- username,
+ u.username,
```

**Impact:** Dashboard summary endpoint crashes, `/api/dashboard` returns 500 error.

### Minor Issues:
- No unit tests included
- Missing TypeScript types (would improve maintainability)
- Some magic numbers (e.g., `maxHours = 168`) could be constants

---

## 2. Security

### Overall Assessment: ✅ PASS

**Strengths:**
- ✅ **SQL Injection Protection:** All queries use parameterized prepared statements
- ✅ **XSS Protection:** Frontend includes `escapeHtml()` function for user content
- ✅ **No Hardcoded Secrets:** Grep found zero API keys, tokens, or passwords in code
- ✅ **Input Validation:** Query parameters are parsed with `parseInt()` and bounded with `Math.min()`

**Verified Parameterized Queries:**
```javascript
// ✅ Safe - uses prepared statements
db.prepare('SELECT * FROM users WHERE username = ?').get(username);
db.prepare('INSERT INTO users (username, created_at) VALUES (?, ?)').run(username, createdAt);
```

**Recommendations:**
- 🟡 **CORS Configuration:** Currently allows all origins (`cors()`). Consider restricting to specific domains in production.
- 🟡 **POST /api/scrape Endpoint:** No authentication. Could be rate-limited or require an API key for production.
- 🟡 Consider adding `helmet.js` for additional HTTP security headers.

---

## 3. Error Handling

### Overall Assessment: ✅ PASS

**Strengths:**
- ✅ All API endpoints wrapped in try/catch blocks
- ✅ Consistent error response format: `{ error: 'message' }`
- ✅ Proper HTTP status codes (404 for not found, 500 for server errors)
- ✅ Request logging middleware captures duration and status
- ✅ Scraper has graceful error handling for failed requests
- ✅ AbortController timeout on fetch requests (30s)
- ✅ Global error handler middleware catches unhandled exceptions

**Example (server.js):**
```javascript
app.get('/api/stats', (req, res) => {
  try {
    const current = db.getLatestStats();
    // ... 
  } catch (error) {
    console.error('[API] Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});
```

**Frontend Error Handling:**
```javascript
try {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error('API error');
  // ...
} catch (error) {
  console.error('Failed to load data:', error);
  document.getElementById('stats-grid').innerHTML = 
    '<div class="error">Failed to load data...</div>';
}
```

---

## 4. Data Integrity

### Overall Assessment: ✅ PASS

**Strengths:**
- ✅ SQLite WAL mode enabled for better concurrency and crash recovery
- ✅ Foreign keys enabled (`PRAGMA foreign_keys = ON`)
- ✅ Automatic timestamps using `datetime('now')`
- ✅ `ON CONFLICT` clauses prevent duplicate key errors
- ✅ `INSERT OR IGNORE` for idempotent message/pixel inserts
- ✅ Primary keys properly defined on all tables
- ✅ Proper data types (INTEGER, TEXT) throughout schema

**Schema Review:**
```sql
-- ✅ Good: Primary keys, foreign keys, proper types
CREATE TABLE users (
  username TEXT PRIMARY KEY,
  first_seen TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL
);

-- ✅ Good: Auto-increment, timestamps
CREATE TABLE stats_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scraped_at TEXT NOT NULL DEFAULT (datetime('now')),
  ...
);
```

**Data Directory:**
- ✅ Auto-creates `data/` directory if missing
- ✅ Database path configurable via `DB_PATH` env var

---

## 5. Performance

### Overall Assessment: ✅ PASS

**Strengths:**
- ✅ **Proper Indexing:** All frequently-queried columns indexed
- ✅ **No N+1 Queries:** `getTopUsers()` uses subqueries instead of multiple queries
- ✅ **Bounded Queries:** All limits capped (e.g., `Math.min(limit, 200)`)
- ✅ **Prepared Statements:** Reusable query plans
- ✅ **Rate Limiting in Scraper:** 100-200ms delays between requests
- ✅ **Incremental Syncing:** Messages fetched only if `id > lastId`

**Indexes Created:**
```sql
CREATE INDEX IF NOT EXISTS idx_stats_scraped ON stats_snapshots(scraped_at);
CREATE INDEX IF NOT EXISTS idx_users_created ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_scraped ON user_activity(scraped_at);
CREATE INDEX IF NOT EXISTS idx_activity_user ON user_activity(username);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_user ON messages(username);
CREATE INDEX IF NOT EXISTS idx_pixel_user ON pixel_edits(username);
```

**Efficient Join Query:**
```javascript
// ✅ Good: Single query with joins, not N+1
getTopUsers(limit) {
  return db.prepare(`
    SELECT u.username, ...
    LEFT JOIN (SELECT username, COUNT(*) as edit_count FROM pixel_edits GROUP BY username) pe ...
    LEFT JOIN (SELECT username, COUNT(*) as msg_count FROM messages GROUP BY username) m ...
  `).all(limit);
}
```

---

## 6. Documentation

### Overall Assessment: ✅ PASS

**Strengths:**
- ✅ Comprehensive README with:
  - Feature list
  - Quick start instructions
  - Architecture diagram (ASCII art)
  - Project structure
  - Full API documentation
  - Environment variable reference
  - Deployment guides (PM2, Docker, Railway)
- ✅ In-code comments explain purpose of modules
- ✅ API research documented in `research/api-research.md`
- ✅ License specified (MIT)
- ✅ Author attribution

**Sample from README:**
```
## Architecture

┌─────────────────────────────────────────────────────────┐
│                    MoltCities API                       │
└─────────────────────┬───────────────────────────────────┘
                      │ Hourly scrape
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  Cron Scraper                           │
└─────────────────────┬───────────────────────────────────┘
...
```

---

## Edge Cases Tested

| Scenario | Result |
|----------|--------|
| Empty database | ✅ Handled gracefully (returns null/empty arrays) |
| Invalid username lookup | ✅ Returns 404 with proper error message |
| Large limit parameter | ✅ Capped to max values (200 agents, 168 hours) |
| Missing stats history | ✅ Trends return null safely |
| Concurrent requests | ✅ WAL mode handles concurrency |
| Network timeout in scraper | ✅ 30s AbortController timeout |

---

## Fixes Applied During Audit

### 1. ✅ Fixed Ambiguous Column Bug (CRITICAL)

**File:** `src/db.js`  
**Line:** 274  
**Status:** ✅ FIXED

```diff
const current = db.prepare(`
  SELECT 
-   username,
+   u.username,
    COUNT(DISTINCT CASE WHEN pe.id IS NOT NULL THEN pe.id END) as pixel_edits,
```

**Verified:** All database functions now execute without errors.

---

## Recommendations (Non-Blocking)

### High Priority
1. Add basic unit tests for db.js functions
2. Add rate limiting middleware to API endpoints
3. Restrict CORS to known domains in production

### Medium Priority
1. Add `/api/scrape` authentication
2. Add request validation (e.g., with `express-validator`)
3. Consider adding health check endpoint with DB connectivity test

### Low Priority
1. Add TypeScript types for better IDE support
2. Extract magic numbers to constants
3. Add API versioning (e.g., `/api/v1/...`)

---

## Conclusion

The MoltCities Dashboard is **well-architected** and demonstrates solid software engineering practices. The codebase is clean, secure, and performant. Documentation is excellent.

**However**, there is **one critical bug** that causes the main dashboard endpoint to crash:

> `SqliteError: ambiguous column name: username` in `getLeaderboardMovers()`

**The bug has been fixed during this audit. The project is now READY FOR SUBMISSION.** ✅

---

**Audited by:** Analyst @ Axiom  
**Report Generated:** 2026-02-02T16:15:00Z
