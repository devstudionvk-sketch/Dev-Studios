import { requireAuth } from '../_lib/session.js';
import { supabase } from '../_lib/db.js';
import { applyCors } from '../_lib/cors.js';
import { parseMeeting } from '../_lib/meetings.js';

export default async function handler(request, response) {
  if (!applyCors(request, response)) return;
  if (!requireAuth(request, response)) return;

  const { id } = request.query;
  if (!id) return response.status(400).json({ error: 'Invalid request.' });

  if (request.method === 'PATCH') {
    const { values, error: invalid } = parseMeeting(request.body);
    if (invalid) return response.status(400).json({ error: invalid });

    const { data, error } = await supabase
      .from('meetings')
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) return response.status(500).json({ error: 'Could not update meeting.' });
    return response.status(200).json({ meeting: data });
  }

  if (request.method === 'DELETE') {
    const { error } = await supabase.from('meetings').delete().eq('id', id);
    if (error) return response.status(500).json({ error: 'Could not delete meeting.' });
    return response.status(200).json({ ok: true });
  }

  response.setHeader('Allow', 'PATCH, DELETE');
  return response.status(405).json({ error: 'Method not allowed.' });
}
