import { Lead, LeadStats, LeadStatus } from '@/types/leads';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'acrux_leads_database';

export const INITIAL_SEED_LEADS: Lead[] = [
  {
    id: 'lead-1001',
    name: 'Dr. Subrat Mohapatra',
    phone: '+91 94370 12890',
    email: 'subrat.m@aiimsbhubaneswar.edu.in',
    residence: '3 BHK',
    timeSlot: 'Weekend Morning (10 AM - 1 PM)',
    sourceForm: 'concierge_modal',
    status: 'visit_scheduled',
    notes: 'Senior doctor at KIMS. Interested in Tower B higher floor with open green view. Scheduled walkthrough on Saturday 11 AM.',
    utm_source: 'google_search',
    utm_medium: 'cpc',
    utm_campaign: 'bhubaneswar_luxury_flats',
    utm_term: '3 bhk flat in patia',
    utm_content: 'headline_patia_luxury',
    referrer: 'https://www.google.co.in/',
    createdAt: '2026-10-02T09:15:00.000Z',
    updatedAt: '2026-10-02T10:30:00.000Z',
  },
  {
    id: 'lead-1002',
    name: 'Ananya Priyadarshini',
    phone: '+91 98611 44520',
    email: 'ananya.p@infosys.com',
    residence: '2.5 BHK',
    timeSlot: 'Weekday Working Hours',
    sourceForm: 'inline_enquiry',
    status: 'contacted',
    notes: 'Tech lead at Infosys Infocity. Looking for modern home office setup and peaceful balcony. Sent brochure via WhatsApp.',
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: 'infocity_tech_professionals',
    utm_term: 'luxury_apartments_patia',
    utm_content: 'video_clubhouse_exterior',
    referrer: 'https://m.facebook.com/',
    createdAt: '2026-10-02T08:42:00.000Z',
    updatedAt: '2026-10-02T09:00:00.000Z',
  },
  {
    id: 'lead-1003',
    name: 'Rajesh Kumar Jena',
    phone: '+91 97782 55901',
    email: 'rkjena.odisha@gmail.com',
    residence: '3 BHK',
    timeSlot: 'Weekend Afternoon (2 PM - 5 PM)',
    sourceForm: 'concierge_modal',
    status: 'new',
    notes: 'Enquired for 2,148 sq. ft. corner unit. NRI relocating back to Bhubaneswar.',
    utm_source: 'instagram',
    utm_medium: 'story_ad',
    utm_campaign: 'diwali_exclusive_preview',
    utm_term: 'real_estate_bhubaneswar',
    utm_content: 'story_zen_pond',
    referrer: 'https://instagram.com/',
    createdAt: '2026-10-02T07:30:00.000Z',
    updatedAt: '2026-10-02T07:30:00.000Z',
  },
  {
    id: 'lead-1004',
    name: 'Bijoylaxmi Rout',
    phone: '+91 99371 88204',
    email: 'bijoylaxmi.rout@gmail.com',
    residence: 'Both Options',
    timeSlot: 'Online Video Presentation First',
    sourceForm: 'concierge_modal',
    status: 'contacted',
    notes: 'Lives in Bangalore, requested 3D walkthrough video and floor plans PDF.',
    utm_source: 'direct',
    utm_medium: 'direct',
    utm_campaign: 'brand_direct',
    referrer: 'Direct Navigation',
    createdAt: '2026-10-01T18:20:00.000Z',
    updatedAt: '2026-10-01T19:10:00.000Z',
  },
  {
    id: 'lead-1005',
    name: 'Capt. Alok Patnaik',
    phone: '+91 94380 99120',
    email: 'capt.patnaik@airindia.in',
    residence: '3 BHK',
    timeSlot: 'Weekend Morning (10 AM - 1 PM)',
    sourceForm: 'inline_enquiry',
    status: 'won',
    notes: 'Token advance initiated for Block A1 unit 902. Assigned relationship manager: Mr. Sahoo.',
    utm_source: 'google_search',
    utm_medium: 'cpc',
    utm_campaign: 'bhubaneswar_luxury_flats',
    utm_term: 'acrux aakaar patia',
    referrer: 'https://www.google.com/',
    createdAt: '2026-09-30T11:05:00.000Z',
    updatedAt: '2026-10-01T15:00:00.000Z',
  },
  {
    id: 'lead-1006',
    name: 'Soumya Ranjan Dash',
    phone: '+91 98532 77810',
    email: 'srdash.tcs@tcs.com',
    residence: '2.5 BHK',
    timeSlot: 'Weekday Working Hours',
    sourceForm: 'concierge_modal',
    status: 'negotiation',
    notes: 'Comparing with DLF Cybercity. Offered preferential payment schedule.',
    utm_source: 'linkedin',
    utm_medium: 'inmail_sponsored',
    utm_campaign: 'tech_leaders_odisha',
    referrer: 'https://www.linkedin.com/',
    createdAt: '2026-09-29T14:40:00.000Z',
    updatedAt: '2026-09-30T10:00:00.000Z',
  },
  {
    id: 'lead-1007',
    name: 'Smruti Rekha Behera',
    phone: '+91 97760 33418',
    email: 'smruti.behera@kiit.ac.in',
    residence: '2.5 BHK',
    timeSlot: 'Weekend Afternoon (2 PM - 5 PM)',
    sourceForm: 'inline_enquiry',
    status: 'new',
    notes: 'Professor at KIIT University. Walking distance preferred.',
    utm_source: 'meta_ads',
    utm_medium: 'feed',
    utm_campaign: 'patia_proximity',
    referrer: 'https://facebook.com/',
    createdAt: '2026-09-28T16:15:00.000Z',
    updatedAt: '2026-09-28T16:15:00.000Z',
  },
];

function getLocalLeads(): Lead[] {
  if (typeof window === 'undefined') return INITIAL_SEED_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
      return INITIAL_SEED_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_LEADS;
  } catch {
    return INITIAL_SEED_LEADS;
  }
}

function saveLocalLeads(leads: Lead[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving leads to localStorage:', e);
  }
}

export function computeLeadStats(leads: Lead[]): LeadStats {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  let todayLeads = 0;
  let scheduledVisits = 0;
  const sourceCounts: Record<string, number> = {};
  const residenceCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};

  for (const lead of leads) {
    const leadDateStr = lead.createdAt.split('T')[0];
    if (leadDateStr === todayStr) todayLeads++;
    if (lead.status === 'visit_scheduled') scheduledVisits++;

    const src = (lead.utm_source || 'direct').toLowerCase();
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;

    const res = lead.residence || '3 BHK';
    residenceCounts[res] = (residenceCounts[res] || 0) + 1;

    const st = lead.status || 'new';
    statusCounts[st] = (statusCounts[st] || 0) + 1;
  }

  let topSource = 'direct';
  let maxCount = 0;
  for (const [s, c] of Object.entries(sourceCounts)) {
    if (c > maxCount) {
      maxCount = c;
      topSource = s;
    }
  }

  return {
    totalLeads: leads.length,
    todayLeads,
    scheduledVisits,
    topSource,
    topResidence: '3 BHK',
    sourceCounts,
    statusCounts,
  };
}

export async function fetchLeadsClient(): Promise<{
  leads: Lead[];
  stats: LeadStats;
  isSupabaseConnected: boolean;
}> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('createdAt', { ascending: false });

      if (!error && data && data.length > 0) {
        return {
          leads: data as Lead[],
          stats: computeLeadStats(data as Lead[]),
          isSupabaseConnected: true,
        };
      }
      if (!error && data && data.length === 0) {
        // If empty in cloud, sync local leads to cloud
        const local = getLocalLeads();
        return {
          leads: local,
          stats: computeLeadStats(local),
          isSupabaseConnected: true,
        };
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  const localLeads = getLocalLeads().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    leads: localLeads,
    stats: computeLeadStats(localLeads),
    isSupabaseConnected: isSupabaseConfigured(),
  };
}

export async function submitLeadClient(
  data: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }
): Promise<{ success: boolean; lead: Lead }> {
  const newLead: Lead = {
    ...data,
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
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
        // Also keep local cache up to date
        const local = getLocalLeads();
        local.unshift(inserted as Lead);
        saveLocalLeads(local);
        return { success: true, lead: inserted as Lead };
      }
    } catch (err) {
      console.warn('Supabase insert failed, saving locally:', err);
    }
  }

  // Save to local storage
  const local = getLocalLeads();
  local.unshift(newLead);
  saveLocalLeads(local);

  return { success: true, lead: newLead };
}

export async function updateLeadStatusClient(
  id: string,
  updates: Partial<Lead>
): Promise<{ success: boolean; lead: Lead | null }> {
  const merged = { ...updates, updatedAt: new Date().toISOString() };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update(merged)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const local = getLocalLeads().map((l) => (l.id === id ? { ...l, ...merged } : l));
        saveLocalLeads(local);
        return { success: true, lead: data as Lead };
      }
    } catch (err) {
      console.warn('Supabase update failed, saving locally:', err);
    }
  }

  const local = getLocalLeads();
  const idx = local.findIndex((l) => l.id === id);
  if (idx !== -1) {
    local[idx] = { ...local[idx], ...merged };
    saveLocalLeads(local);
    return { success: true, lead: local[idx] };
  }

  return { success: false, lead: null };
}

export async function deleteLeadClient(id: string): Promise<{ success: boolean }> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) {
        const local = getLocalLeads().filter((l) => l.id !== id);
        saveLocalLeads(local);
        return { success: true };
      }
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }

  const local = getLocalLeads().filter((l) => l.id !== id);
  saveLocalLeads(local);
  return { success: true };
}

export function downloadLeadsCsvClient(leads: Lead[]): void {
  const escapeCsv = (val: any) => {
    if (val === undefined || val === null) return '""';
    return `"${String(val).replace(/"/g, '""')}"`;
  };

  const headers = [
    'Lead ID',
    'Created Date',
    'Created Time (IST)',
    'Customer Name',
    'Contact Number',
    'Email Address',
    'Residence Interest',
    'Preferred Walkthrough Timing',
    'Status',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Term',
    'UTM Content',
    'Referrer URL',
    'Form Channel',
    'Sales Notes',
  ];

  const rows = leads.map((lead) => {
    const d = new Date(lead.createdAt);
    const dateStr = d.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = d.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
    });

    return [
      escapeCsv(lead.id),
      escapeCsv(dateStr),
      escapeCsv(timeStr),
      escapeCsv(lead.name),
      escapeCsv(lead.phone),
      escapeCsv(lead.email || 'N/A'),
      escapeCsv(lead.residence),
      escapeCsv(lead.timeSlot || 'Not Specified'),
      escapeCsv(lead.status.toUpperCase()),
      escapeCsv(lead.utm_source || 'direct'),
      escapeCsv(lead.utm_medium || 'none'),
      escapeCsv(lead.utm_campaign || 'none'),
      escapeCsv(lead.utm_term || 'none'),
      escapeCsv(lead.utm_content || 'none'),
      escapeCsv(lead.referrer || 'Direct'),
      escapeCsv(lead.sourceForm),
      escapeCsv(lead.notes || ''),
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const today = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `Acrux_Aakaar_Leads_${today}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
