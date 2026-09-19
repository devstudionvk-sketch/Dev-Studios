import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CircleAlert, Save, Trash2 } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { formatLabel } from '../lib/format';
import { DatePicker } from '../components/DatePicker';
import { MEETING_STAGES } from '../types/dashboard';
import type { MeetingInput } from '../types/dashboard';

type FormState = Omit<MeetingInput, 'duration_minutes' | 'meeting_at'> & {
  duration_minutes: string;
  date: string;
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
};

const pad = (n: number) => String(n).padStart(2, '0');
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 12 }, (_, i) => pad(i * 5));

const splitDate = (date: Date) => ({
  date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
  hour: String(date.getHours() % 12 || 12),
  minute: pad(date.getMinutes()),
  period: (date.getHours() >= 12 ? 'PM' : 'AM') as 'AM' | 'PM'
});

const joinDate = (form: FormState) => {
  const hour24 = (Number(form.hour) % 12) + (form.period === 'PM' ? 12 : 0);
  return new Date(`${form.date}T${pad(hour24)}:${form.minute}`);
};

const nextHour = () => {
  const date = new Date();
  date.setHours(date.getHours() + 1, 0, 0, 0);
  return splitDate(date);
};

const emptyForm = (): FormState => ({
  contact_name: '',
  organization: '',
  contact_info: '',
  ...nextHour(),
  duration_minutes: '30',
  stage: 'scheduled',
  is_client: false,
  notes: ''
});

export const DashboardMeetingForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    dataSource.listMeetings()
      .then((meetings) => {
        const meeting = meetings.find((item) => item.id === id);
        if (!meeting) throw new Error('Meeting not found.');
        setForm({
          contact_name: meeting.contact_name,
          organization: meeting.organization || '',
          contact_info: meeting.contact_info || '',
          ...splitDate(new Date(meeting.meeting_at)),
          duration_minutes: String(meeting.duration_minutes),
          stage: meeting.stage,
          is_client: meeting.is_client,
          notes: meeting.notes || ''
        });
      })
      .catch((err) => setMessage(err instanceof Error ? err.message : 'Could not load meeting.'))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.contact_name.trim() || !form.date) {
      setMessage('Contact name and date are required.');
      return;
    }
    setSaving(true);
    setMessage('');
    const input: MeetingInput = {
      contact_name: form.contact_name,
      organization: form.organization,
      contact_info: form.contact_info,
      meeting_at: joinDate(form).toISOString(),
      duration_minutes: Number(form.duration_minutes),
      stage: form.stage,
      is_client: form.is_client,
      notes: form.notes
    };
    try {
      if (id) await dataSource.updateMeeting(id, input);
      else await dataSource.createMeeting(input);
      navigate('/meetings');
    } catch (err) {
      setSaving(false);
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const remove = async () => {
    if (!id || !window.confirm('Delete this meeting? This cannot be undone.')) return;
    try {
      await dataSource.deleteMeeting(id);
      navigate('/meetings');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not delete meeting.');
    }
  };

  const minuteOptions = MINUTES.includes(form.minute) ? MINUTES : [...MINUTES, form.minute].sort();
  const inputClass = '[color-scheme:dark] mt-2 w-full rounded-2xl border-2 border-white/15 bg-black px-5 py-3.5 text-sm text-paper outline-none transition-colors placeholder:text-paper-faint hover:border-white/25 focus:border-lime focus:ring-2 focus:ring-lime/20';
  const labelClass = 'text-sm font-medium text-paper-dim';
  const timeClass = inputClass.replace('px-5', 'px-3');

  if (loading) return <p className="text-sm text-paper-dim">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-black tracking-tighter">{isEdit ? 'Edit meeting' : 'New meeting'}</h2>

      <form onSubmit={submit} className="mt-8 rounded-3xl border-2 border-white/15 bg-black p-6 sm:p-10" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>Contact name<input required value={form.contact_name} onChange={update('contact_name')} className={inputClass} placeholder="Who are we meeting?" /></label>
          <label className={labelClass}>Organization<input value={form.organization} onChange={update('organization')} className={inputClass} placeholder="Acme Inc." /></label>
        </div>

        <label className={`mt-5 block ${labelClass}`}>Contact info<input value={form.contact_info} onChange={update('contact_info')} className={inputClass} placeholder="Phone, email, or meeting link" /></label>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className={`${labelClass} relative`}>
            Date
            <DatePicker value={form.date} onChange={(value) => setForm((current) => ({ ...current, date: value }))} className={inputClass} />
          </div>
          <div className={labelClass}>
            Time
            <div className="flex gap-2">
              <select aria-label="Hour" value={form.hour} onChange={update('hour')} className={timeClass}>
                {HOURS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <select aria-label="Minute" value={form.minute} onChange={update('minute')} className={timeClass}>
                {minuteOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <select aria-label="AM or PM" value={form.period} onChange={update('period')} className={timeClass}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <label className={labelClass}>Duration (minutes)<input required type="number" min="5" max="1440" step="5" value={form.duration_minutes} onChange={update('duration_minutes')} className={inputClass} /></label>
          <label className={labelClass}>Stage
            <select value={form.stage} onChange={update('stage')} className={inputClass}>
              {MEETING_STAGES.map((option) => <option key={option} value={option}>{formatLabel(option)}</option>)}
            </select>
          </label>
        </div>

        <label className={`${labelClass} mt-5 flex items-center gap-3`}>
          <input type="checkbox" checked={form.is_client} onChange={(event) => setForm((current) => ({ ...current, is_client: event.target.checked }))} className="h-5 w-5 accent-[#9CA85C]" />
          They are already our client
        </label>

        <label className={`mt-5 block ${labelClass}`}>Notes<textarea rows={4} value={form.notes} onChange={update('notes')} className={inputClass} placeholder="Call context, agenda, outcome…" /></label>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-8">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
            {saving ? 'Saving…' : 'Save meeting'} <Save className="h-4 w-4" />
          </button>
          <Link to="/meetings" className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper-faint transition-colors hover:text-paper">Cancel</Link>
          {isEdit && (
            <button type="button" onClick={remove} className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-paper-faint transition-colors hover:text-red-300">
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          )}
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
