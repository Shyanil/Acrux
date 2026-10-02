import { NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/leads-store';

function escapeCsv(val: any): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  try {
    const leads = await getAllLeads();

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

    // Add UTF-8 BOM so Excel opens Hindi/special characters correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Acrux_Aakaar_Leads_${timestamp}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting leads CSV:', error);
    return NextResponse.json({ error: 'Failed to generate CSV' }, { status: 500 });
  }
}
