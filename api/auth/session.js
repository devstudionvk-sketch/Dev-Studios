import { verifySession } from '../_lib/session.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const session = verifySession(request.headers.cookie);
  if (!session) return response.status(401).json({ authenticated: false });
  return response.status(200).json({ authenticated: true });
}
