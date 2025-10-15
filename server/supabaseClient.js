import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

export const pool = { user: process.env.SUPABASE_USER,
  host: process.env.SUPABASE_HOST,
  database: process.env.SUPABASE_DB,
  password: process.env.SUPABASE_PASSWORD,
  port: process.env.SUPABASE_PORT,
  ssl: { rejectUnauthorized: false } // important for Supabase
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
