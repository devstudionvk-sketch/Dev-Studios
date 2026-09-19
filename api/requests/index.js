import { requireAuth } from '../_lib/session.js';
import { supabase } from '../_lib/db.js';
import { applyCors } from '../_lib/cors.js';

const RESTORE_WINDOW_DAYS = 30;

export default async function handler(request, response) {
  if (!applyCors(request, response)) return;

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  if (!requireAuth(request, response)) return;

  // Closed requests are only restorable for 30 days; purge expired ones on every load.
  const cutoff = new Date(Date.now() - RESTORE_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  await supabase.from('contact_requests').delete().lt('archived_at', cutoff);

  const archived = request.query.archived === '1';
  const query = supabase.from('contact_requests').select('*');
  const { data, error } = await (archived
    ? query.not('archived_at', 'is', null).order('archived_at', { ascending: false })
    : query.is('archived_at', null).order('created_at', { ascending: false }));

  if (error) return response.status(500).json({ error: 'Could not load requests.' });
  return response.status(200).json({ requests: data });
}
