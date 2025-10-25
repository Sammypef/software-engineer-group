import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
const { Pool } = pg;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const poolConfig = {
  user: process.env.SUPABASE_USER,
  host: process.env.SUPABASE_HOST,
  database: process.env.SUPABASE_DB,
  // Coerce common env values to the correct types and validate them.
  password: typeof process.env.SUPABASE_PASSWORD === 'undefined' ? undefined : String(process.env.SUPABASE_PASSWORD),
  port: process.env.SUPABASE_PORT ? parseInt(process.env.SUPABASE_PORT, 10) : undefined,
  // Allow disabling SSL for local/dev DBs that don't support it.
  // Set SUPABASE_DB_SSL=true to enable SSL when needed (e.g., production Supabase).
  ssl: (process.env.SUPABASE_DB_SSL || 'false').toLowerCase() === 'true' ? { rejectUnauthorized: false } : false,
};

// Basic validation with masked logging to help diagnose common env issues.
const masked = (s) => (typeof s === 'string' && s.length > 0 ? s[0] + '***' : String(s));
if (!poolConfig.user || !poolConfig.host || !poolConfig.database) {
  console.warn('Database connection appears incomplete. Check SUPABASE_USER, SUPABASE_HOST, SUPABASE_DB environment variables. Values:', {
    user: masked(poolConfig.user),
    host: masked(poolConfig.host),
    database: masked(poolConfig.database),
  });
}

if (typeof poolConfig.password === 'undefined' || poolConfig.password === '') {
  console.warn('Database password is missing or empty. Set SUPABASE_PASSWORD to a non-empty string.');
}

export const pool = new Pool(poolConfig);

let supabaseClient = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.warn('Supabase client not created: SUPABASE_URL or SUPABASE_KEY is missing.');
}

export const supabase = supabaseClient;
