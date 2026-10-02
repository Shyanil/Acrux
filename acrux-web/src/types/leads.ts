export type LeadStatus = 'new' | 'contacted' | 'visit_scheduled' | 'negotiation' | 'won' | 'lost';

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  residence: string;
  timeSlot?: string;
  sourceForm: 'inline_enquiry' | 'concierge_modal' | 'whatsapp_cta';
  status: LeadStatus;
  notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  ip?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LeadStats {
  totalLeads: number;
  todayLeads: number;
  scheduledVisits: number;
  topSource: string;
  topResidence: string;
  sourceCounts: Record<string, number>;
  statusCounts: Record<string, number>;
}
