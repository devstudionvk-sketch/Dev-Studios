const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const request = async (method: string, path: string, body?: unknown) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Unexpected response from the server.');
  }

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Something went wrong.');
  return result;
};

export const api = {
  get: (path: string) => request('GET', path),
  post: (path: string, body?: unknown) => request('POST', path, body ?? {}),
  patch: (path: string, body?: unknown) => request('PATCH', path, body ?? {}),
  del: (path: string) => request('DELETE', path)
};
