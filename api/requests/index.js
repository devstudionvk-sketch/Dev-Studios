import { requireAuth } from '../_lib/session.js';
import { supabase } from '../_lib/db.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  if (!requireAuth(request, response)) return;

  const { data, error } = await supabase
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return response.status(500).json({ error: 'Could not load requests.' });
  return response.status(200).json({ requests: data });
}
