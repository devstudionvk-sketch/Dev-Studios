import bcrypt from 'bcryptjs';
import { signSession, setSessionCookie } from '../_lib/session.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const password = typeof request.body?.password === 'string' ? request.body.password : '';

  if (!process.env.DASHBOARD_PASSWORD_HASH || !process.env.SESSION_SECRET) {
    return response.status(500).json({ error: 'Dashboard login has not been configured yet.' });
  }

  if (!password || !bcrypt.compareSync(password, process.env.DASHBOARD_PASSWORD_HASH)) {
    return response.status(401).json({ error: 'Invalid password.' });
  }

  setSessionCookie(response, signSession());
  return response.status(200).json({ ok: true });
}
