import { requireAuth } from '../_lib/session.js';
import { supabase } from '../_lib/db.js';
import { applyCors } from '../_lib/cors.js';
import { parseMeeting } from '../_lib/meetings.js';

export default async function handler(request, response) {
  if (!applyCors(request, response)) return;
  if (!requireAuth(request, response)) return;

  if (request.method === 'GET') {
    const { data, error } = await supabase.from('meetings').select('*').order('meeting_at', { ascending: true });
    if (error) return response.status(500).json({ error: 'Could not load meetings.' });
    return response.status(200).json({ meetings: data });
  }

  if (request.method === 'POST') {
    const { values, error: invalid } = parseMeeting(request.body);
    if (invalid) return response.status(400).json({ error: invalid });

    const { data, error } = await supabase.from('meetings').insert(values).select().single();
    if (error) return response.status(500).json({ error: 'Could not save meeting.' });
    return response.status(200).json({ meeting: data });
  }

  response.setHeader('Allow', 'GET, POST');
  return response.status(405).json({ error: 'Method not allowed.' });
}
