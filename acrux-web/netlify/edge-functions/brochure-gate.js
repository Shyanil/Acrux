import buildSecret from './brochure-secret.js';

const cookieName = 'acrux_brochure_token';
const encoder = new TextEncoder();

async function signingKey() {
  return crypto.subtle.importKey('raw', encoder.encode(buildSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function base64url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function fromBase64url(value) {
  const encoded = value.replaceAll('-', '+').replaceAll('_', '/');
  return Uint8Array.from(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=')), (char) => char.charCodeAt(0));
}

async function createToken() {
  const expires = Date.now() + 24 * 60 * 60 * 1000;
  const nonce = base64url(crypto.getRandomValues(new Uint8Array(16)));
  const payload = `${expires}.${nonce}`;
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), encoder.encode(payload));
  return `${payload}.${base64url(signature)}`;
}

async function validToken(token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || !/^\d{13}$/.test(parts[0]) || Number(parts[0]) < Date.now()) return false;
  try {
    return await crypto.subtle.verify(
      'HMAC', await signingKey(), fromBase64url(parts[2]), encoder.encode(`${parts[0]}.${parts[1]}`),
    );
  } catch {
    return false;
  }
}

function reject(message, status) {
  return Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export default async (request, context) => {
  const path = new URL(request.url).pathname;
  if (path === '/api/brochure-access') {
    if (request.method !== 'POST') return reject('Method not allowed', 405);
    let lead;
    try {
      lead = await request.json();
    } catch {
      return reject('Invalid form data', 400);
    }
    const valid = typeof lead.name === 'string' && lead.name.trim().length >= 2 && lead.name.length <= 100
      && typeof lead.phone === 'string' && /^(?:\+91[ -]?)?[6-9][0-9]{9}$/.test(lead.phone.trim())
      && typeof lead.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())
      && ['3 BHK', '4.5 BHK'].includes(lead.residence)
      && lead.consent === true;
    if (!valid) return reject('Please complete the enquiry form', 400);
    const token = await createToken();
    return Response.json({ success: true }, {
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': `${cookieName}=${token}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') return reject('Method not allowed', 405);
  if (!await validToken(context.cookies.get(cookieName))) {
    return Response.redirect(new URL('/#enquire', request.url), 302);
  }
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'private, no-store');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: ['/api/brochure-access', '/brochure.pdf'] };
