
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iiizzvvcjqldcopltqof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpaXp6dnZjanFsZGNvcGx0cW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNTM5MjcsImV4cCI6MjA1ODYyOTkyN30.uwYnRnh_yPTTgwY1YVwiriqRXSRwdX7b_FFtCFOCn1Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  }
);
