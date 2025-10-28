import sqlite3 from "sqlite3";
import { open } from "sqlite";

// initialize async DB connection
export const initDB = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};
