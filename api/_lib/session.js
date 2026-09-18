import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'dashboard_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const base64url = (input) => Buffer.from(input).toString('base64url');

const sign = (payloadB64) => base64url(createHmac('sha256', process.env.SESSION_SECRET).update(payloadB64).digest());

export const signSession = () => {
  const payload = { role: 'admin', iat: Date.now(), exp: Date.now() + SESSION_TTL_MS };
  const payloadB64 = base64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
};

const parseCookies = (header) => {
  const cookies = {};
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    cookies[part.slice(0, index).trim()] = decodeURIComponent(part.slice(index + 1).trim());
  }
  return cookies;
};

export const verifySession = (cookieHeader) => {
  const token = parseCookies(cookieHeader)[COOKIE_NAME];
  if (!token) return null;
  const [payloadB64, signatureB64] = token.split('.');
  if (!payloadB64 || !signatureB64) return null;

  const expectedSignature = sign(payloadB64);
  const actual = Buffer.from(signatureB64);
  const expected = Buffer.from(expectedSignature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};

export const requireAuth = (request, response) => {
  const session = verifySession(request.headers.cookie);
  if (!session) {
    response.status(401).json({ error: 'Unauthorized.' });
    return null;
  }
  return session;
};

export const setSessionCookie = (response, token) => {
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`);
};

export const clearSessionCookie = (response) => {
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0`);
};
