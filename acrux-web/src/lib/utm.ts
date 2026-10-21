import { UTMData } from '@/types/leads';

const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  for (const field of fields) {
    const value = params.get(field);
    if (value) sessionStorage.setItem(`acrux_${field}`, value.slice(0, 500));
  }
  if (document.referrer && !sessionStorage.getItem('acrux_referrer')) {
    sessionStorage.setItem('acrux_referrer', document.referrer.slice(0, 2000));
  }
}

export function getAttribution(): UTMData {
  if (typeof window === 'undefined') return {};
  captureAttribution();
  return {
    utm_source: sessionStorage.getItem('acrux_utm_source') || 'direct',
    utm_medium: sessionStorage.getItem('acrux_utm_medium') || 'none',
    utm_campaign: sessionStorage.getItem('acrux_utm_campaign') || 'general',
    utm_term: sessionStorage.getItem('acrux_utm_term') || undefined,
    utm_content: sessionStorage.getItem('acrux_utm_content') || undefined,
    referrer: sessionStorage.getItem('acrux_referrer') || document.referrer || 'Direct',
  };
}
