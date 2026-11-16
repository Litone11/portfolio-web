import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Only the publishable key ships to the browser; RLS decides what each session can see.
// null when the env vars are missing, so the portal can say so instead of crashing.
export const supabase = url && key ? createClient(url, key) : null;
