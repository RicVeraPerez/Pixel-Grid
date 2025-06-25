const path = require('path');
const Database = require('better-sqlite3');
const dbPath = path.join(__dirname, '../db/grid.db');
const db = new Database(dbPath);
let grid = [];

db.exec(`CREATE TABLE IF NOT EXISTS grid (
  x INT ,
  y INT ,
  color TEXT NOT NULL
)`);

const insert = db.prepare(`INSERT INTO grid (x, y, color)  VALUES(?, ?, ?)`);
const rowCount = db.prepare(`SELECT COUNT(*) AS count FROM grid`);
const result = rowCount.get().count;

if (result === 0) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      grid.push({
        x: i,
        y: j,
        color: "white",
      });
    }
  }
  const insertTransaction = db.transaction((grid) => {
    for (const obj of grid) {
      insert.run(obj.x, obj.y, obj.color);
    }
  });
  insertTransaction(grid);
}

module.exports = db;