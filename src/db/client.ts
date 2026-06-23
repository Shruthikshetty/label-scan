import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

//Open (or create) the local SQLite database file
const expoDb = openDatabaseSync("labelscan.db");

//Self-contained migration: Ensure the scans table exists on startup
expoDb.execSync(`
  CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    product_name TEXT NOT NULL,
    total_score REAL NOT NULL,
    final_status TEXT NOT NULL,
    verdict TEXT NOT NULL,
    num_of_ingredients_audited INTEGER NOT NULL,
    total_red_flags INTEGER NOT NULL,
    hack TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    macros TEXT NOT NULL,
    per_100g TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

//Initialize Drizzle client
export const db = drizzle(expoDb, { schema });
export default db;
