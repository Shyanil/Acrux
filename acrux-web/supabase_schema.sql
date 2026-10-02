-- ==============================================================================
-- ACRUX AAKAAR — SUPABASE LEADS DATABASE SCHEMA
-- Execute this script in your Supabase Project: Dashboard -> SQL Editor -> New Query
-- ==============================================================================

-- 1. Create the Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  residence TEXT NOT NULL DEFAULT '3 BHK',
  "timeSlot" TEXT,
  "sourceForm" TEXT NOT NULL DEFAULT 'inline_enquiry',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT DEFAULT '',
  utm_source TEXT DEFAULT 'direct',
  utm_medium TEXT DEFAULT 'none',
  utm_campaign TEXT DEFAULT 'general',
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  ip TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Performance Indexes for Filter & Search
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_residence ON public.leads(residence);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);

-- 3. Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts from website landing page forms
CREATE POLICY "Allow public form submissions" 
  ON public.leads 
  FOR INSERT 
  TO anon, authenticated, service_role 
  WITH CHECK (true);

-- Allow authenticated users / service_role full read and update access
CREATE POLICY "Allow authenticated read and manage" 
  ON public.leads 
  FOR ALL 
  TO service_role, authenticated 
  USING (true) 
  WITH CHECK (true);

-- Allow anon select for admin dashboard if using client anon key
CREATE POLICY "Allow anon read for admin" 
  ON public.leads 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY "Allow anon update for admin" 
  ON public.leads 
  FOR UPDATE 
  TO anon 
  USING (true) 
  WITH CHECK (true);
