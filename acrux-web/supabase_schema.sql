-- Run in Supabase Dashboard > SQL Editor for project ebdykrmnqjbfdhmcqlij.
-- Then create and confirm admin@acruxrealcon.in in Authentication > Users.
-- Use a unique password; the old website password is no longer accepted.

CREATE TABLE IF NOT EXISTS public.acrux_aakaar_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  residence TEXT NOT NULL,
  "timeSlot" TEXT,
  "sourceForm" TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT DEFAULT '',
  utm_source TEXT DEFAULT 'direct',
  utm_medium TEXT DEFAULT 'none',
  utm_campaign TEXT DEFAULT 'general',
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  ip TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_acrux_aakaar_leads_created_at ON public.acrux_aakaar_leads("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_acrux_aakaar_leads_utm_source ON public.acrux_aakaar_leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_acrux_aakaar_leads_status ON public.acrux_aakaar_leads(status);

ALTER TABLE public.acrux_aakaar_leads ENABLE ROW LEVEL SECURITY;

-- Recreate policies safely when this script is run again.
DROP POLICY IF EXISTS "Allow public form submissions" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Allow authenticated read and manage" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Allow anon read for admin" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Allow anon update for admin" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Public form submissions" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Admin can read leads" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Admin can update leads" ON public.acrux_aakaar_leads;
DROP POLICY IF EXISTS "Admin can delete leads" ON public.acrux_aakaar_leads;

REVOKE ALL ON public.acrux_aakaar_leads FROM anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.acrux_aakaar_leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.acrux_aakaar_leads TO authenticated;

CREATE POLICY "Public form submissions" ON public.acrux_aakaar_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new');

CREATE POLICY "Admin can read leads" ON public.acrux_aakaar_leads
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'email') = 'admin@acruxrealcon.in');

CREATE POLICY "Admin can update leads" ON public.acrux_aakaar_leads
  FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'admin@acruxrealcon.in')
  WITH CHECK ((auth.jwt() ->> 'email') = 'admin@acruxrealcon.in');

CREATE POLICY "Admin can delete leads" ON public.acrux_aakaar_leads
  FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'admin@acruxrealcon.in');
