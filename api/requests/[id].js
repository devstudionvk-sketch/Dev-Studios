import { requireAuth } from '../_lib/session.js';
import { supabase } from '../_lib/db.js';
import { applyCors } from '../_lib/cors.js';

const VALID_STATUSES = ['new', 'contacted', 'in_progress', 'closed'];

export default async function handler(request, response) {
  if (!applyCors(request, response)) return;

  if (request.method !== 'PATCH') {
    response.setHeader('Allow', 'PATCH');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  if (!requireAuth(request, response)) return;

  const { id } = request.query;
  const status = request.body?.status;
  if (!id || !VALID_STATUSES.includes(status)) {
    return response.status(400).json({ error: 'Invalid request.' });
  }

  const { error } = await supabase
    .from('contact_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return response.status(500).json({ error: 'Could not update request.' });
  return response.status(200).json({ ok: true });
}
