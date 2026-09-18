import React, { useEffect, useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { StatusBadge } from '../components/dashboard/StatusBadge';
import { formatLabel } from '../lib/format';
import type { ContactRequest } from '../types/dashboard';

const STATUSES = ['new', 'contacted', 'in_progress', 'closed'];
const METHOD_ICON: Record<string, React.ComponentType<{ className?: string }>> = { Email: Mail, Phone: Phone, WhatsApp: MessageCircle };

export const DashboardRequests: React.FC = () => {
  const [requests, setRequests] = useState<ContactRequest[] | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    dataSource.listRequests()
      .then(setRequests)
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load requests.'));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    setRequests((current) => current?.map((request) => request.id === id ? { ...request, status } : request) ?? current);
    try {
      await dataSource.updateRequestStatus(id, status);
    } catch {
      load();
    }
  };

  const selectClass = 'rounded-full border border-white/15 bg-black px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-paper outline-none focus:border-lime';

  return (
    <div>
      <h2 className="font-display text-2xl font-black tracking-tighter">Incoming requests</h2>
      <p className="mt-1 text-sm text-paper-dim">Contact form submissions from the public site.</p>

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
      {!error && requests === null && <p className="mt-6 text-sm text-paper-dim">Loading…</p>}
      {requests?.length === 0 && <p className="mt-6 text-sm text-paper-dim">No requests yet.</p>}

      <div className="mt-6 space-y-4">
        {requests?.map((request) => {
          const Icon = METHOD_ICON[request.contact_method] || Mail;
          return (
            <div key={request.id} className="rounded-3xl border-2 border-white/15 bg-black p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold">{request.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-paper-dim">
                    <Icon className="h-3.5 w-3.5" /> {request.contact_method === 'Email' ? request.email : request.contact_detail}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {!request.email_sent && <span className="font-mono text-[10px] uppercase tracking-widest text-red-300">Email not sent</span>}
                  <select
                    value={request.status}
                    onChange={(event) => updateStatus(request.id, event.target.value)}
                    className={selectClass}
                  >
                    {STATUSES.map((status) => <option key={status} value={status}>{formatLabel(status)}</option>)}
                  </select>
                  <StatusBadge status={request.status} />
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-sm text-paper-dim sm:grid-cols-2">
                <p><span className="text-paper-faint">Service:</span> {request.service}</p>
                <p><span className="text-paper-faint">Received:</span> {new Date(request.created_at).toLocaleString()}</p>
              </div>
              {request.service_notes && <p className="mt-3 text-sm text-paper-dim"><span className="text-paper-faint">Details:</span> {request.service_notes}</p>}
              {request.notes && <p className="mt-2 text-sm text-paper-dim"><span className="text-paper-faint">Notes:</span> {request.notes}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
