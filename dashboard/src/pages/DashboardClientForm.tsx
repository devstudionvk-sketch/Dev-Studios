import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleAlert, Save } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { SERVICES } from '../data/services';
import { formatLabel } from '../lib/format';
import type { ClientInput } from '../types/dashboard';

const STATUSES = ['lead', 'active', 'completed', 'on_hold', 'cancelled'];

type FormState = ClientInput;

const EMPTY_FORM: FormState = {
  organization_name: '',
  contact_info: '',
  project_description: '',
  amount_charged: '',
  website_url: '',
  github_url: '',
  status: 'lead',
  service: '',
  notes: ''
};

export const DashboardClientForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isEdit || !id) return;
    dataSource.getClient(id)
      .then((client) => {
        if (!client) throw new Error('Client not found.');
        setForm({
          organization_name: client.organization_name,
          contact_info: client.contact_info,
          project_description: client.project_description,
          amount_charged: client.amount_charged === null ? '' : String(client.amount_charged),
          website_url: client.website_url || '',
          github_url: client.github_url || '',
          status: client.status || 'lead',
          service: client.service || '',
          notes: client.notes || ''
        });
      })
      .catch((err) => setMessage(err instanceof Error ? err.message : 'Could not load client.'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const update = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');
    try {
      if (isEdit && id) {
        await dataSource.updateClient(id, form);
      } else {
        await dataSource.createClient(form);
      }
      navigate('/clients');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputClass = 'mt-2 w-full rounded-2xl border-2 border-white/15 bg-black px-5 py-3.5 text-sm text-paper outline-none transition-colors placeholder:text-paper-faint hover:border-white/25 focus:border-lime focus:ring-2 focus:ring-lime/20';
  const labelClass = 'text-sm font-medium text-paper-dim';

  if (loading) return <p className="text-sm text-paper-dim">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-black tracking-tighter">{isEdit ? 'Edit client' : 'Add client'}</h2>

      <form onSubmit={submit} className="mt-8 rounded-3xl border-2 border-white/15 bg-black p-6 sm:p-10" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>Organization name<input required value={form.organization_name} onChange={update('organization_name')} className={inputClass} placeholder="Acme Inc." /></label>
          <label className={labelClass}>Contact info<input required value={form.contact_info} onChange={update('contact_info')} className={inputClass} placeholder="Name, email, or phone" /></label>
        </div>

        <label className={`mt-5 block ${labelClass}`}>Project description<textarea required rows={4} value={form.project_description} onChange={update('project_description')} className={inputClass} placeholder="What did we build for them?" /></label>

        <div className={`${labelClass} mt-10 border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-widest text-paper-faint`}>Optional details</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>Amount charged (₹)<input type="number" step="0.01" min="0" value={form.amount_charged} onChange={update('amount_charged')} className={inputClass} placeholder="0.00" /></label>
          <label className={labelClass}>Status
            <select value={form.status} onChange={update('status')} className={inputClass}>
              {STATUSES.map((option) => <option key={option} value={option}>{formatLabel(option)}</option>)}
            </select>
          </label>
          <label className={labelClass}>Service
            <select value={form.service} onChange={update('service')} className={inputClass}>
              <option value="">Not specified</option>
              {SERVICES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className={labelClass}>Website link<input type="url" value={form.website_url} onChange={update('website_url')} className={inputClass} placeholder="https://" /></label>
          <label className={labelClass}>GitHub repo<input type="url" value={form.github_url} onChange={update('github_url')} className={inputClass} placeholder="https://github.com/…" /></label>
        </div>
        <label className={`mt-5 block ${labelClass}`}>Notes<textarea rows={4} value={form.notes} onChange={update('notes')} className={inputClass} placeholder="Anything else worth remembering." /></label>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-8">
          <button type="submit" disabled={status === 'saving'} className="inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
            {status === 'saving' ? 'Saving…' : 'Save client'} <Save className="h-4 w-4" />
          </button>
          {message && (
            <div role="alert" className="contact-feedback contact-feedback--error w-full">
              <span className="contact-feedback__icon" aria-hidden="true"><CircleAlert className="h-4 w-4" strokeWidth={2.5} /></span>
              <p className="text-sm leading-relaxed">{message}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
