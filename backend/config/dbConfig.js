// dbConfig.js

const sqlite3 = require("sqlite3").verbose();

// Initialize SQLite in-memory database
const db = new sqlite3.Database(":memory:");

// Create table for tasks
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, description TEXT, completed BOOLEAN)"
  );
});

module.exports = db;
