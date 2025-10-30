import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Read DB config from either DB_* (used in docker-compose) or PG_* / standard env vars.
const DB_HOST = process.env.DB_HOST || process.env.PG_HOST || process.env.PGHOST || 'postgres';
const DB_PORT = Number(process.env.DB_PORT || process.env.PG_PORT || process.env.PGPORT || 5432);
const DB_USER = process.env.DB_USER || process.env.PG_USER || process.env.PGUSER || 'challenge';
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.PG_PASSWORD || process.env.PGPASSWORD || 'challenge_2024';
const DB_NAME = process.env.DB_NAME || process.env.PG_DATABASE || process.env.PGDATABASE || 'challenge_db';

export const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
