import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, Mail, MessageCircle, Phone, RotateCcw, X } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { StatusBadge } from '../components/StatusBadge';
import { formatLabel } from '../lib/format';
import type { ContactRequest, MeetingFormState } from '../types/dashboard';

const STATUSES = ['new', 'contacted', 'in_progress'];
const METHOD_ICON: Record<string, React.ComponentType<{ className?: string }>> = { Email: Mail, Phone: Phone, WhatsApp: MessageCircle };
const RESTORE_WINDOW_DAYS = 30;
const UNDO_MS = 8000;

const daysLeft = (archivedAt: string) =>
  Math.max(0, RESTORE_WINDOW_DAYS - Math.floor((Date.now() - new Date(archivedAt).getTime()) / 86400000));

const meetingState = (request: ContactRequest): MeetingFormState => ({
  banner: `Organizing a meeting from ${request.name}'s request.`,
  requestId: request.id,
  prefill: {
    contact_name: request.name,
    contact_info: [request.email, request.contact_method !== 'Email' ? request.contact_detail : null].filter(Boolean).join(' · '),
    notes: [`Service: ${request.service}`, request.service_notes, request.notes].filter(Boolean).join('\n')
  }
});

const byNewest = (a: ContactRequest, b: ContactRequest) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

export const DashboardRequests: React.FC = () => {
  const [open, setOpen] = useState<ContactRequest[] | null>(null);
  const [closed, setClosed] = useState<ContactRequest[] | null>(null);
  const [tab, setTab] = useState<'open' | 'closed'>('open');
  const [error, setError] = useState('');
  const [undo, setUndo] = useState<ContactRequest | null>(null);
  const undoTimer = useRef<ReturnType<typeof setTimeout>>();

  const load = () => {
    Promise.all([dataSource.listRequests(false), dataSource.listRequests(true)])
      .then(([openRequests, closedRequests]) => { setOpen(openRequests); setClosed(closedRequests); })
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load requests.'));
  };

  useEffect(load, []);
  useEffect(() => () => clearTimeout(undoTimer.current), []);

  const updateStatus = async (id: string, status: string) => {
    setOpen((current) => current?.map((request) => request.id === id ? { ...request, status } : request) ?? current);
    try {
      await dataSource.updateRequestStatus(id, status);
    } catch {
      load();
    }
  };

  const close = async (request: ContactRequest) => {
    const archived = { ...request, archived_at: new Date().toISOString(), archived_reason: 'closed' };
    setOpen((current) => current?.filter((item) => item.id !== request.id) ?? current);
    setClosed((current) => [archived, ...(current ?? [])]);
    setUndo(archived);
    clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setUndo(null), UNDO_MS);
    try {
      await dataSource.archiveRequest(request.id, 'closed');
    } catch {
      setUndo(null);
      load();
    }
  };

  const restore = async (request: ContactRequest) => {
    setClosed((current) => current?.filter((item) => item.id !== request.id) ?? current);
    setOpen((current) => [{ ...request, archived_at: null, archived_reason: null }, ...(current ?? [])].sort(byNewest));
    setUndo((current) => current?.id === request.id ? null : current);
    try {
      await dataSource.restoreRequest(request.id);
    } catch {
      load();
    }
  };

  const selectClass = 'rounded-full border border-white/15 bg-black px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-paper outline-none [color-scheme:dark] focus:border-lime';
  const tabClass = (active: boolean) => `rounded-full border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors ${active ? 'border-lime text-lime' : 'border-white/15 text-paper-dim hover:border-white/30'}`;
  const actionClass = 'inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-paper-dim transition-colors hover:border-lime hover:text-lime';
  const list = tab === 'open' ? open : closed;

  return (
    <div>
      <h2 className="font-display text-2xl font-black tracking-tighter">Incoming requests</h2>
      <p className="mt-1 text-sm text-paper-dim">Contact form submissions from the public site.</p>

      <div className="mt-6 flex gap-2">
        <button type="button" onClick={() => setTab('open')} className={tabClass(tab === 'open')}>Open{open ? ` (${open.length})` : ''}</button>
        <button type="button" onClick={() => setTab('closed')} className={tabClass(tab === 'closed')}>Recently closed{closed ? ` (${closed.length})` : ''}</button>
      </div>
      {tab === 'closed' && <p className="mt-3 text-sm text-paper-faint">Closed requests can be restored for {RESTORE_WINDOW_DAYS} days, then they are deleted permanently.</p>}

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
      {!error && list === null && <p className="mt-6 text-sm text-paper-dim">Loading…</p>}
      {list?.length === 0 && <p className="mt-6 text-sm text-paper-dim">{tab === 'open' ? 'No open requests.' : 'Nothing closed in the last 30 days.'}</p>}

      <div className="mt-6 space-y-4">
        {list?.map((request) => {
          const Icon = METHOD_ICON[request.contact_method] || Mail;
          const isClosed = tab === 'closed';
          return (
            <div key={request.id} className={`rounded-3xl border-2 border-white/15 bg-black p-6 ${isClosed ? 'opacity-70' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold">{request.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-paper-dim">
                    <Icon className="h-3.5 w-3.5" /> {request.contact_method === 'Email' ? request.email : request.contact_detail}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {!request.email_sent && <span className="font-mono text-[10px] uppercase tracking-widest text-red-300">Email not sent</span>}
                  {isClosed ? (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">
                      {request.archived_reason === 'meeting' ? 'Meeting organized' : 'Closed'}
                      {request.archived_at && ` · ${daysLeft(request.archived_at)}d left to restore`}
                    </span>
                  ) : (
                    <>
                      <select value={request.status} onChange={(event) => updateStatus(request.id, event.target.value)} className={selectClass}>
                        {STATUSES.map((status) => <option key={status} value={status}>{formatLabel(status)}</option>)}
                      </select>
                      <StatusBadge status={request.status} />
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-sm text-paper-dim sm:grid-cols-2">
                <p><span className="text-paper-faint">Service:</span> {request.service}</p>
                <p><span className="text-paper-faint">Received:</span> {new Date(request.created_at).toLocaleString()}</p>
              </div>
              {request.service_notes && <p className="mt-3 text-sm text-paper-dim"><span className="text-paper-faint">Details:</span> {request.service_notes}</p>}
              {request.notes && <p className="mt-2 text-sm text-paper-dim"><span className="text-paper-faint">Notes:</span> {request.notes}</p>}

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                {isClosed ? (
                  <button type="button" onClick={() => restore(request)} className={actionClass}><RotateCcw className="h-3.5 w-3.5" /> Restore</button>
                ) : (
                  <>
                    <Link to="/meetings/new" state={meetingState(request)} className={actionClass}><CalendarPlus className="h-3.5 w-3.5" /> Organize meeting</Link>
                    <button type="button" onClick={() => close(request)} className={`${actionClass} hover:border-red-300 hover:text-red-300`}><X className="h-3.5 w-3.5" /> Close request</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {undo && (
        <div role="status" className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full border-2 border-white/15 bg-black py-3 pl-6 pr-3 shadow-2xl">
          <span className="text-sm text-paper-dim">Closed request from {undo.name}.</span>
          <button type="button" onClick={() => restore(undo)} className="rounded-full bg-paper px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-950">Undo</button>
          <button type="button" onClick={() => setUndo(null)} aria-label="Dismiss" className="rounded-full p-1.5 text-paper-faint hover:text-paper"><X className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  );
};
