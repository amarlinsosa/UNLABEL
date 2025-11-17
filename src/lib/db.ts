// src/lib/db.ts
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;

if (!url) {
  // This will show up clearly in Amplify logs if the env var isn't set
  throw new Error("DATABASE_URL environment variable is not set");
}

// Reuse the pool across hot reloads in dev
let pool: mysql.Pool;

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool(url); // <-- pass the URL directly
}

pool = global._mysqlPool;

export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

export { pool };
