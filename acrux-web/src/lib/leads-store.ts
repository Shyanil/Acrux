import fs from 'fs';
import path from 'path';
import { Lead, LeadStats } from '@/types/leads';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';

const DATA_FILE_PATH = path.resolve(process.cwd(), 'src/data/leads.json');

function ensureDataDirectory() {
  const dir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readLocalLeads(): Lead[] {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(raw) as Lead[];
  } catch (err) {
    console.error('Error reading local leads.json:', err);
    return [];
  }
}

function writeLocalLeads(leads: Lead[]): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing local leads.json:', err);
  }
}

export async function getAllLeads(): Promise<Lead[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('createdAt', { ascending: false });

      if (!error && data) {
        return data as Lead[];
      }
      console.warn('Supabase query error (falling back to local):', error?.message);
    } catch (err) {
      console.warn('Supabase connection error (falling back to local):', err);
    }
  }

  const localLeads = readLocalLeads();
  return localLeads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createLead(data: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const newLead: Lead = {
    ...data,
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    status: data.status || 'new',
    utm_source: data.utm_source || 'direct',
    utm_medium: data.utm_medium || 'none',
    utm_campaign: data.utm_campaign || 'general',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select()
        .single();

      if (!error && inserted) {
        return inserted as Lead;
      }
      console.warn('Supabase insert failed, saving to local store:', error?.message);
    } catch (err) {
      console.warn('Supabase insert exception, saving to local store:', err);
    }
  }

  // Save to local store
  const localLeads = readLocalLeads();
  localLeads.unshift(newLead);
  writeLocalLeads(localLeads);
  return newLead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const updatedAt = new Date().toISOString();
  const mergedUpdates = { ...updates, updatedAt };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update(mergedUpdates)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return data as Lead;
      }
    } catch (err) {
      console.warn('Supabase update error:', err);
    }
  }

  const localLeads = readLocalLeads();
  const index = localLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  localLeads[index] = { ...localLeads[index], ...mergedUpdates };
  writeLocalLeads(localLeads);
  return localLeads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  const localLeads = readLocalLeads();
  const filtered = localLeads.filter((l) => l.id !== id);
  if (filtered.length === localLeads.length) return false;
  writeLocalLeads(filtered);
  return true;
}

export async function computeStats(leads: Lead[]): Promise<LeadStats> {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  let todayLeads = 0;
  let scheduledVisits = 0;
  const sourceCounts: Record<string, number> = {};
  const residenceCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};

  for (const lead of leads) {
    const leadDateStr = lead.createdAt.split('T')[0];
    if (leadDateStr === todayStr) {
      todayLeads++;
    }

    if (lead.status === 'visit_scheduled') {
      scheduledVisits++;
    }

    const src = (lead.utm_source || 'direct').toLowerCase();
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;

    const res = lead.residence || 'Undecided';
    residenceCounts[res] = (residenceCounts[res] || 0) + 1;

    const st = lead.status || 'new';
    statusCounts[st] = (statusCounts[st] || 0) + 1;
  }

  let topSource = 'direct';
  let maxSourceCount = 0;
  for (const [src, count] of Object.entries(sourceCounts)) {
    if (count > maxSourceCount) {
      maxSourceCount = count;
      topSource = src;
    }
  }

  let topResidence = '3 BHK';
  let maxResCount = 0;
  for (const [res, count] of Object.entries(residenceCounts)) {
    if (count > maxResCount) {
      maxResCount = count;
      topResidence = res;
    }
  }

  return {
    totalLeads: leads.length,
    todayLeads,
    scheduledVisits,
    topSource,
    topResidence,
    sourceCounts,
    statusCounts,
  };
}
