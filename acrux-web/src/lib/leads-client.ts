import { Lead, LeadStats, LeadStatus } from '@/types/leads';
import { getSupabaseClient, LEADS_TABLE } from './supabase';

export function computeLeadStats(leads: Lead[]): LeadStats {
  const today = new Date().toISOString().slice(0, 10);
  const sourceCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};
  const residenceCounts: Record<string, number> = {};
  for (const lead of leads) {
    const source = (lead.utm_source || 'direct').toLowerCase();
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
    residenceCounts[lead.residence] = (residenceCounts[lead.residence] || 0) + 1;
  }
  const top = (counts: Record<string, number>, fallback: string) =>
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || fallback;
  return {
    totalLeads: leads.length,
    todayLeads: leads.filter((lead) => lead.createdAt.startsWith(today)).length,
    scheduledVisits: leads.filter((lead) => lead.status === 'visit_scheduled').length,
    topSource: top(sourceCounts, 'direct'),
    topResidence: top(residenceCounts, 'Undecided'),
    sourceCounts,
    statusCounts,
  };
}

function requireClient() {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase is not configured.');
  return client;
}

export async function fetchLeadsClient(): Promise<{
  leads: Lead[];
  stats: LeadStats;
  isSupabaseConnected: boolean;
}> {
  const { data, error } = await requireClient()
    .from(LEADS_TABLE).select('*').order('createdAt', { ascending: false });
  if (error) throw error;
  const leads = (data || []) as Lead[];
  return { leads, stats: computeLeadStats(leads), isSupabaseConnected: true };
}

export async function submitLeadClient(
  data: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }
): Promise<{ success: boolean; lead: Lead }> {
  const now = new Date().toISOString();
  const lead: Lead = {
    ...data,
    id: crypto.randomUUID(),
    status: 'new',
    utm_source: data.utm_source || 'direct',
    utm_medium: data.utm_medium || 'none',
    utm_campaign: data.utm_campaign || 'general',
    createdAt: now,
    updatedAt: now,
  };
  // Public visitors can insert, but cannot read back customer data.
  const { error } = await requireClient().from(LEADS_TABLE).insert(lead);
  if (error) throw error;
  return { success: true, lead };
}

export async function updateLeadStatusClient(
  id: string,
  updates: Partial<Lead>
): Promise<{ success: boolean; lead: Lead | null }> {
  const permitted: Partial<Lead> = { updatedAt: new Date().toISOString() };
  if (updates.status) permitted.status = updates.status;
  if (updates.notes !== undefined) permitted.notes = updates.notes;
  const { data, error } = await requireClient()
    .from(LEADS_TABLE).update(permitted).eq('id', id).select().single();
  if (error) throw error;
  return { success: true, lead: data as Lead };
}

export async function deleteLeadClient(id: string): Promise<{ success: boolean }> {
  const { error } = await requireClient().from(LEADS_TABLE).delete().eq('id', id);
  if (error) throw error;
  return { success: true };
}

export function downloadLeadsCsvClient(leads: Lead[]): void {
  const escapeCsv = (val: unknown) => {
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
