import { api } from './api';
import { DEMO_REQUESTS, DEMO_CLIENTS } from './demoData';
import type { Client, ClientInput, ContactRequest } from '../types/dashboard';

export const isDemo = import.meta.env.VITE_DEMO_MODE === 'true';

let demoRequests = DEMO_REQUESTS.map((request) => ({ ...request }));
let demoClients = DEMO_CLIENTS.map((client) => ({ ...client }));

const toClientRecord = (id: string, input: ClientInput, createdAt: string): Client => ({
  id,
  organization_name: input.organization_name.trim(),
  contact_info: input.contact_info.trim(),
  project_description: input.project_description.trim(),
  amount_charged: input.amount_charged === '' ? null : Number(input.amount_charged),
  website_url: input.website_url.trim() || null,
  github_url: input.github_url.trim() || null,
  status: input.status || 'lead',
  service: input.service || null,
  notes: input.notes.trim() || null,
  created_at: createdAt
});

export const dataSource = {
  isDemo,

  checkSession: async (): Promise<boolean> => {
    if (isDemo) return true;
    try {
      await api.get('/api/auth/session');
      return true;
    } catch {
      return false;
    }
  },

  login: async (password: string): Promise<void> => {
    if (isDemo) return;
    await api.post('/api/auth/login', { password });
  },

  logout: async (): Promise<void> => {
    if (isDemo) return;
    await api.post('/api/auth/logout');
  },

  listRequests: async (): Promise<ContactRequest[]> => {
    if (isDemo) return demoRequests;
    const result = await api.get('/api/requests');
    return result.requests;
  },

  updateRequestStatus: async (id: string, status: string): Promise<void> => {
    if (isDemo) {
      demoRequests = demoRequests.map((request) => request.id === id ? { ...request, status } : request);
      return;
    }
    await api.patch(`/api/requests/${id}`, { status });
  },

  listClients: async (): Promise<Client[]> => {
    if (isDemo) return demoClients;
    const result = await api.get('/api/clients');
    return result.clients;
  },

  getClient: async (id: string): Promise<Client | undefined> => {
    if (isDemo) return demoClients.find((client) => client.id === id);
    const result = await api.get('/api/clients');
    return result.clients.find((client: Client) => client.id === id);
  },

  createClient: async (input: ClientInput): Promise<Client> => {
    if (isDemo) {
      const client = toClientRecord(crypto.randomUUID(), input, new Date().toISOString());
      demoClients = [client, ...demoClients];
      return client;
    }
    const result = await api.post('/api/clients', input);
    return result.client;
  },

  updateClient: async (id: string, input: ClientInput): Promise<Client> => {
    if (isDemo) {
      const existing = demoClients.find((client) => client.id === id);
      const client = toClientRecord(id, input, existing?.created_at ?? new Date().toISOString());
      demoClients = demoClients.map((current) => current.id === id ? client : current);
      return client;
    }
    const result = await api.patch(`/api/clients/${id}`, input);
    return result.client;
  },

  deleteClient: async (id: string): Promise<void> => {
    if (isDemo) {
      demoClients = demoClients.filter((client) => client.id !== id);
      return;
    }
    await api.del(`/api/clients/${id}`);
  }
};
