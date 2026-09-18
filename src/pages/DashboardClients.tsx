import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Globe, Pencil, Plus, Trash2 } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { StatusBadge } from '../components/dashboard/StatusBadge';
import { SERVICES } from '../data/services';
import type { Client } from '../types/dashboard';

const DATE_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'none', label: 'Unsorted' }
];

const AMOUNT_OPTIONS = [
  { value: 'none', label: 'Unsorted' },
  { value: 'high', label: 'High to low' },
  { value: 'low', label: 'Low to high' }
];

export const DashboardClients: React.FC = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [dateSort, setDateSort] = useState<'newest' | 'oldest' | 'none'>('newest');
  const [amountSort, setAmountSort] = useState<'high' | 'low' | 'none'>('none');

  const applyDateSort = (value: 'newest' | 'oldest' | 'none') => {
    setDateSort(value);
    if (value !== 'none') setAmountSort('none');
  };

  const applyAmountSort = (value: 'high' | 'low' | 'none') => {
    setAmountSort(value);
    if (value !== 'none') setDateSort('none');
  };

  const load = () => {
    dataSource.listClients()
      .then(setClients)
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load clients.'));
  };

  useEffect(load, []);

  const remove = async (id: string, name: string) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await dataSource.deleteClient(id);
      setClients((current) => current?.filter((client) => client.id !== id) ?? current);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete client.');
    }
  };

  const visibleClients = useMemo(() => {
    if (!clients) return null;
    const filtered = serviceFilter ? clients.filter((client) => client.service === serviceFilter) : clients;
    if (amountSort !== 'none') {
      return [...filtered].sort((a, b) => amountSort === 'high'
        ? (b.amount_charged ?? -Infinity) - (a.amount_charged ?? -Infinity)
        : (a.amount_charged ?? Infinity) - (b.amount_charged ?? Infinity));
    }
    if (dateSort !== 'none') {
      return [...filtered].sort((a, b) => {
        const dateDiff = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return dateSort === 'oldest' ? -dateDiff : dateDiff;
      });
    }
    return filtered;
  }, [clients, serviceFilter, dateSort, amountSort]);

  const selectClass = 'rounded-full border border-white/15 bg-black px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-paper outline-none focus:border-lime';
  const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-paper-faint';
  const hasActiveFilter = serviceFilter !== '' || dateSort !== 'newest' || amountSort !== 'none';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tighter">Clients</h2>
          <p className="mt-1 text-sm text-paper-dim">Everyone you've worked with, on or off the books.</p>
        </div>
        <Link
          to="/dashboard/clients/new"
          className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" /> Add client
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-6 border-y border-white/10 py-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Service</span>
          <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)} className={selectClass}>
            <option value="">All services</option>
            {SERVICES.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Date signed</span>
          <select value={dateSort} onChange={(event) => applyDateSort(event.target.value as typeof dateSort)} className={selectClass}>
            {DATE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Amount charged</span>
          <select value={amountSort} onChange={(event) => applyAmountSort(event.target.value as typeof amountSort)} className={selectClass}>
            {AMOUNT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={() => { setServiceFilter(''); setDateSort('newest'); setAmountSort('none'); }}
            className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper-faint transition-colors hover:text-paper"
          >
            Clear filters
          </button>
        )}
        {clients && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-paper-faint">
            {visibleClients?.length} of {clients.length} clients
          </span>
        )}
      </div>

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
      {!error && clients === null && <p className="mt-6 text-sm text-paper-dim">Loading…</p>}
      {visibleClients?.length === 0 && <p className="mt-6 text-sm text-paper-dim">No clients match these filters.</p>}

      <div className="mt-6 space-y-4">
        {visibleClients?.map((client) => (
          <div key={client.id} className="rounded-3xl border-2 border-white/15 bg-black p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold">{client.organization_name}</p>
                <p className="mt-1 text-sm text-paper-dim">{client.contact_info}</p>
              </div>
              <div className="flex items-center gap-3">
                {client.status && <StatusBadge status={client.status} />}
                <Link to={`/dashboard/clients/${client.id}/edit`} className="text-paper-dim transition-colors hover:text-paper" aria-label={`Edit ${client.organization_name}`}>
                  <Pencil className="h-4 w-4" />
                </Link>
                <button type="button" onClick={() => remove(client.id, client.organization_name)} className="text-paper-dim transition-colors hover:text-red-300" aria-label={`Delete ${client.organization_name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-4 text-sm text-paper-dim">{client.project_description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-paper-dim">
              <span><span className="text-paper-faint">Signed:</span> {new Date(client.created_at).toLocaleDateString()}</span>
              {client.service && <span><span className="text-paper-faint">Service:</span> {client.service}</span>}
              {client.amount_charged !== null && <span><span className="text-paper-faint">Charged:</span> ${client.amount_charged.toLocaleString()}</span>}
              {client.website_url && (
                <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper">
                  <Globe className="h-3.5 w-3.5" /> Website
                </a>
              )}
              {client.github_url && (
                <a href={client.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
            </div>
            {client.notes && <p className="mt-3 text-sm text-paper-dim"><span className="text-paper-faint">Notes:</span> {client.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
