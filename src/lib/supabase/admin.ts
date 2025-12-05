import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for admin operations
// This bypasses Row Level Security and should ONLY be used in secure server-side code
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase service role credentials. Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file'
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
