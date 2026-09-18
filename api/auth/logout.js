import { clearSessionCookie } from '../_lib/session.js';
import { applyCors } from '../_lib/cors.js';

export default async function handler(request, response) {
  if (!applyCors(request, response)) return;

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  clearSessionCookie(response);
  return response.status(200).json({ ok: true });
}
