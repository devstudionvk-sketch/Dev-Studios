import { requireAuth } from '../_lib/session.js';
import { supabase } from '../_lib/db.js';
import { SERVICES } from '../_lib/services.js';

const VALID_STATUSES = ['lead', 'active', 'completed', 'on_hold', 'cancelled'];
const clean = (value, maxLength) => typeof value === 'string' ? value.trim().slice(0, maxLength) || null : null;

export default async function handler(request, response) {
  if (!requireAuth(request, response)) return;

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return response.status(500).json({ error: 'Could not load clients.' });
    return response.status(200).json({ clients: data });
  }

  if (request.method === 'POST') {
    const organizationName = clean(request.body?.organization_name, 200);
    const contactInfo = clean(request.body?.contact_info, 300);
    const projectDescription = clean(request.body?.project_description, 4000);

    if (!organizationName || !contactInfo || !projectDescription) {
      return response.status(400).json({ error: 'Organization, contact info, and project description are required.' });
    }

    const amountRaw = request.body?.amount_charged;
    const amountCharged = amountRaw === '' || amountRaw === null || amountRaw === undefined ? null : Number(amountRaw);
    if (amountCharged !== null && !Number.isFinite(amountCharged)) {
      return response.status(400).json({ error: 'Amount charged must be a number.' });
    }

    const status = request.body?.status;
    if (status && !VALID_STATUSES.includes(status)) {
      return response.status(400).json({ error: 'Invalid status.' });
    }

    const service = request.body?.service;
    if (service && !SERVICES.includes(service)) {
      return response.status(400).json({ error: 'Invalid service.' });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert({
        organization_name: organizationName,
        contact_info: contactInfo,
        project_description: projectDescription,
        amount_charged: amountCharged,
        website_url: clean(request.body?.website_url, 500),
        github_url: clean(request.body?.github_url, 500),
        status: status || 'lead',
        service: service || null,
        notes: clean(request.body?.notes, 4000)
      })
      .select()
      .single();

    if (error) return response.status(500).json({ error: 'Could not save client.' });
    return response.status(200).json({ client: data });
  }

  response.setHeader('Allow', 'GET, POST');
  return response.status(405).json({ error: 'Method not allowed.' });
}
