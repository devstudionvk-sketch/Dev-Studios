import { supabase } from './_lib/db.js';
import { SERVICES } from './_lib/services.js';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RECIPIENT = 'devstudionvk@gmail.com';

const clean = (value, maxLength) => typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const name = clean(request.body?.name, 120);
  const email = clean(request.body?.email, 254);
  const contactMethod = clean(request.body?.contactMethod, 30);
  const contactDetail = clean(request.body?.contactDetail, 120);
  const service = clean(request.body?.service, 80);
  const serviceNotes = clean(request.body?.serviceNotes, 2000);
  const notes = clean(request.body?.notes, 2000);
  const validMethods = ['Email', 'Phone', 'WhatsApp'];

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !validMethods.includes(contactMethod) || !SERVICES.includes(service)) {
    return response.status(400).json({ error: 'Please complete the required fields.' });
  }

  if (contactMethod !== 'Email' && !contactDetail) {
    return response.status(400).json({ error: 'Please add your preferred contact detail.' });
  }

  if (service === 'Other' && !serviceNotes) {
    return response.status(400).json({ error: 'Please tell us what you need help with.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    return response.status(500).json({ error: 'Contact delivery has not been configured yet.' });
  }

  const { data: savedRequest, error: insertError } = await supabase
    .from('contact_requests')
    .insert({
      name,
      email,
      contact_method: contactMethod,
      contact_detail: contactMethod === 'Email' ? null : contactDetail,
      service,
      service_notes: serviceNotes || null,
      notes: notes || null
    })
    .select()
    .single();

  if (insertError) {
    return response.status(500).json({ error: 'We could not save your enquiry. Please try again shortly.' });
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Preferred contact method', contactMethod],
    ['Preferred contact detail', contactMethod === 'Email' ? email : contactDetail],
    ['Service', service],
    ['Service notes', serviceNotes || '—'],
    ['Additional notes', notes || '—']
  ].map(([label, value]) => `<tr><td style="padding:8px 16px 8px 0;color:#667085;font-weight:600">${escapeHtml(label)}</td><td style="padding:8px 0;color:#101828">${escapeHtml(value)}</td></tr>`).join('');

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to: [RECIPIENT],
      reply_to: email,
      subject: `New DEV STUDIOS enquiry — ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px"><h1 style="font-size:20px">New project enquiry</h1><table style="border-collapse:collapse">${rows}</table></div>`
    })
  });

  await supabase.from('contact_requests').update({ email_sent: resendResponse.ok }).eq('id', savedRequest.id);

  if (!resendResponse.ok) {
    return response.status(502).json({ error: 'We could not send your enquiry. Please try again shortly.' });
  }

  return response.status(200).json({ ok: true });
}
