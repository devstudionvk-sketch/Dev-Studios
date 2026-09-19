import { api } from './api';
import { DEMO_REQUESTS, DEMO_CLIENTS, DEMO_MEETINGS } from './demoData';
import type { Client, ClientInput, ContactRequest, Meeting, MeetingInput } from '../types/dashboard';

export const isDemo = import.meta.env.VITE_DEMO_MODE === 'true';

let demoRequests = DEMO_REQUESTS.map((request) => ({ ...request }));
let demoClients = DEMO_CLIENTS.map((client) => ({ ...client }));
let demoMeetings = DEMO_MEETINGS.map((meeting) => ({ ...meeting }));

const toMeetingRecord = (id: string, input: MeetingInput, createdAt: string): Meeting => ({
  ...input,
  id,
  organization: input.organization.trim() || null,
  contact_info: input.contact_info.trim() || null,
  notes: input.notes.trim() || null,
  created_at: createdAt
});

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

  listRequests: async (archived = false): Promise<ContactRequest[]> => {
    if (isDemo) return demoRequests.filter((request) => Boolean(request.archived_at) === archived);
    const result = await api.get(`/api/requests${archived ? '?archived=1' : ''}`);
    return result.requests;
  },

  archiveRequest: async (id: string, reason: 'closed' | 'meeting'): Promise<void> => {
    if (isDemo) {
      demoRequests = demoRequests.map((request) => request.id === id ? { ...request, archived_at: new Date().toISOString(), archived_reason: reason } : request);
      return;
    }
    await api.patch(`/api/requests/${id}`, { archived: true, reason });
  },

  restoreRequest: async (id: string): Promise<void> => {
    if (isDemo) {
      demoRequests = demoRequests.map((request) => request.id === id ? { ...request, archived_at: null, archived_reason: null } : request);
      return;
    }
    await api.patch(`/api/requests/${id}`, { archived: false });
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

  updateClientStatus: async (id: string, status: string): Promise<void> => {
    if (isDemo) {
      demoClients = demoClients.map((client) => client.id === id ? { ...client, status } : client);
      return;
    }
    await api.patch(`/api/clients/${id}`, { status });
  },

  deleteClient: async (id: string): Promise<void> => {
    if (isDemo) {
      demoClients = demoClients.filter((client) => client.id !== id);
      return;
    }
    await api.del(`/api/clients/${id}`);
  },

  listMeetings: async (): Promise<Meeting[]> => {
    if (isDemo) return demoMeetings;
    const result = await api.get('/api/meetings');
    return result.meetings;
  },

  createMeeting: async (input: MeetingInput): Promise<void> => {
    if (isDemo) {
      demoMeetings = [...demoMeetings, toMeetingRecord(crypto.randomUUID(), input, new Date().toISOString())];
      return;
    }
    await api.post('/api/meetings', input);
  },

  updateMeeting: async (id: string, input: MeetingInput): Promise<void> => {
    if (isDemo) {
      demoMeetings = demoMeetings.map((meeting) => meeting.id === id ? toMeetingRecord(id, input, meeting.created_at) : meeting);
      return;
    }
    await api.patch(`/api/meetings/${id}`, input);
  },

  deleteMeeting: async (id: string): Promise<void> => {
    if (isDemo) {
      demoMeetings = demoMeetings.filter((meeting) => meeting.id !== id);
      return;
    }
    await api.del(`/api/meetings/${id}`);
  }
};
