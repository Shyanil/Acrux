import { NextRequest, NextResponse } from 'next/server';
import { getAllLeads, createLead, updateLead, deleteLead, computeStats } from '@/lib/leads-store';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Lead } from '@/types/leads';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get('search') || '').toLowerCase().trim();
    const utmSource = (searchParams.get('utm_source') || '').toLowerCase().trim();
    const residence = searchParams.get('residence') || '';
    const status = searchParams.get('status') || '';
    const dateRange = searchParams.get('dateRange') || 'all';

    let leads = await getAllLeads();
    const stats = await computeStats(leads);

    // Apply Filters
    if (search) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.phone.toLowerCase().includes(search) ||
          (l.email && l.email.toLowerCase().includes(search)) ||
          (l.notes && l.notes.toLowerCase().includes(search))
      );
    }

    if (utmSource && utmSource !== 'all') {
      leads = leads.filter((l) => (l.utm_source || '').toLowerCase() === utmSource);
    }

    if (residence && residence !== 'all') {
      leads = leads.filter((l) => l.residence === residence);
    }

    if (status && status !== 'all') {
      leads = leads.filter((l) => l.status === status);
    }

    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      leads = leads.filter((l) => {
        const leadDate = new Date(l.createdAt);
        const diffMs = now.getTime() - leadDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (dateRange === 'today') return diffDays <= 1;
        if (dateRange === 'week') return diffDays <= 7;
        if (dateRange === 'month') return diffDays <= 30;
        return true;
      });
    }

    return NextResponse.json({
      success: true,
      leads,
      stats,
      isSupabaseConnected: isSupabaseConfigured(),
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve leads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required fields' },
        { status: 400 }
      );
    }

    const leadData: Omit<Lead, 'id' | 'createdAt'> = {
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : undefined,
      residence: body.residence || '3 BHK',
      timeSlot: body.timeSlot || undefined,
      sourceForm: body.sourceForm || 'inline_enquiry',
      status: 'new',
      notes: body.notes || '',
      utm_source: body.utm_source ? String(body.utm_source).toLowerCase().trim() : 'direct',
      utm_medium: body.utm_medium ? String(body.utm_medium).toLowerCase().trim() : 'none',
      utm_campaign: body.utm_campaign ? String(body.utm_campaign).toLowerCase().trim() : 'general',
      utm_term: body.utm_term ? String(body.utm_term).trim() : undefined,
      utm_content: body.utm_content ? String(body.utm_content).trim() : undefined,
      referrer: body.referrer || req.headers.get('referer') || 'Direct',
    };

    const newLead = await createLead(leadData);

    return NextResponse.json({
      success: true,
      lead: newLead,
      message: 'Lead registered successfully',
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error saving lead' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead id is required' }, { status: 400 });
    }

    const updated = await updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead id is required' }, { status: 400 });
    }

    const deleted = await deleteLead(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
  }
}
