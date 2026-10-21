import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ebdykrmnqjbfdhmcqlij.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZHlrcm1ucWpiZmRobWNxbGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1Mzc1NzgsImV4cCI6MjEwODExMzU3OH0.wWd8VPAk_euHnvlNliVzx-sJmkKnNP6ei8h2tlrQCog';
export const LEADS_TABLE = 'acrux_aakaar_leads';

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return cachedClient;
}
