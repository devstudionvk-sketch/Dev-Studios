import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pencil, Plus } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { StatusBadge } from '../components/StatusBadge';
import type { Meeting } from '../types/dashboard';

type View = 'day' | 'week' | 'month';
const VIEWS: View[] = ['day', 'week', 'month'];

const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const startOfWeek = (date: Date) => addDays(date, -((date.getDay() + 6) % 7));
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
const fmt = (date: Date, options: Intl.DateTimeFormatOptions) => date.toLocaleDateString([], options);

const MeetingChip: React.FC<{ meeting: Meeting; size: View }> = ({ meeting, size }) => {
  const inactive = meeting.stage === 'cancelled' || meeting.stage === 'no_show';
  return (
    <Link
      to={`/meetings/${meeting.id}/edit`}
      title="Edit meeting"
      className={`block rounded-xl border bg-black px-2.5 py-1.5 transition-colors hover:border-lime ${meeting.is_client ? 'border-lime/50' : 'border-white/15'} ${inactive ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-paper-faint">
        <span>{timeLabel(meeting.meeting_at)}{size !== 'month' && ` · ${meeting.duration_minutes}m`}</span>
        {size !== 'month' && <span className="inline-flex items-center gap-1 text-paper-dim"><Pencil className="h-3 w-3" />{size === 'day' && 'Edit'}</span>}
      </div>
      <p className={`truncate font-semibold ${size === 'day' ? 'text-base' : 'text-xs'}`}>{meeting.contact_name}</p>
      {size !== 'month' && meeting.organization && <p className="truncate text-xs text-paper-dim">{meeting.organization}</p>}
      {size !== 'month' && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <StatusBadge status={meeting.stage} />
          {meeting.is_client && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime">Client</span>}
        </div>
      )}
      {size === 'day' && (
        <div className="mt-2 space-y-1 text-sm text-paper-dim">
          {meeting.contact_info && <p>{meeting.contact_info}</p>}
          {meeting.notes && <p><span className="text-paper-faint">Notes:</span> {meeting.notes}</p>}
        </div>
      )}
    </Link>
  );
};

export const DashboardMeetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [error, setError] = useState('');
  const [view, setView] = useState<View>('week');
  const [cursor, setCursor] = useState(() => new Date());

  useEffect(() => {
    dataSource.listMeetings()
      .then(setMeetings)
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load meetings.'));
  }, []);

  const byDay = useMemo(() => {
    const map = new Map<string, Meeting[]>();
    [...(meetings ?? [])]
      .sort((a, b) => new Date(a.meeting_at).getTime() - new Date(b.meeting_at).getTime())
      .forEach((meeting) => {
        const key = new Date(meeting.meeting_at).toDateString();
        map.set(key, [...(map.get(key) ?? []), meeting]);
      });
    return map;
  }, [meetings]);

  const meetingsOn = (date: Date) => byDay.get(date.toDateString()) ?? [];

  const shift = (direction: number) => {
    if (view === 'day') setCursor(addDays(cursor, direction));
    else if (view === 'week') setCursor(addDays(cursor, 7 * direction));
    else setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + direction, 1));
  };

  const openDay = (date: Date) => { setCursor(date); setView('day'); };

  const weekStart = startOfWeek(cursor);
  const monthFirst = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const days = view === 'day' ? [cursor]
    : view === 'week' ? Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
    : Array.from({ length: 42 }, (_, i) => addDays(startOfWeek(monthFirst), i));

  const title = view === 'day' ? fmt(cursor, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : view === 'week' ? `${fmt(weekStart, { day: 'numeric', month: 'short' })} – ${fmt(addDays(weekStart, 6), { day: 'numeric', month: 'short', year: 'numeric' })}`
    : fmt(cursor, { month: 'long', year: 'numeric' });

  const today = new Date();
  const buttonClass = 'rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors hover:border-white/30';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tighter">Meetings</h2>
          <p className="mt-1 text-sm text-paper-dim">Schedule and track meetings booked from cold calls.</p>
        </div>
        <Link
          to="/meetings/new"
          className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" /> New meeting
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4">
        <div className="flex gap-2">
          {VIEWS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`${buttonClass} ${view === option ? 'border-lime text-lime' : 'text-paper-dim'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous" className={buttonClass}><ChevronLeft className="h-3.5 w-3.5" /></button>
          <span className="min-w-[10rem] text-center font-display text-sm font-bold">{title}</span>
          <button type="button" onClick={() => shift(1)} aria-label="Next" className={buttonClass}><ChevronRight className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => setCursor(new Date())} className={`${buttonClass} text-paper-dim`}>Today</button>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
      {!error && meetings === null && <p className="mt-6 text-sm text-paper-dim">Loading…</p>}

      {meetings && view === 'day' && (
        <div className="mt-6 space-y-3">
          {meetingsOn(cursor).length === 0 && <p className="text-sm text-paper-dim">No meetings this day.</p>}
          {meetingsOn(cursor).map((meeting) => <MeetingChip key={meeting.id} meeting={meeting} size="day" />)}
        </div>
      )}

      {meetings && view === 'week' && (
        <div className="mt-6 grid gap-3 md:grid-cols-4 xl:grid-cols-7">
          {days.map((day) => (
            <div key={day.toDateString()} className={`rounded-2xl border p-3 ${sameDay(day, today) ? 'border-lime/60' : 'border-white/10'}`}>
              <button type="button" onClick={() => openDay(day)} className="mb-3 block text-left font-mono text-[10px] uppercase tracking-widest text-paper-faint hover:text-paper">
                {fmt(day, { weekday: 'short', day: 'numeric' })}
              </button>
              <div className="space-y-2">
                {meetingsOn(day).map((meeting) => <MeetingChip key={meeting.id} meeting={meeting} size="week" />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {meetings && view === 'month' && (
        <div className="mt-6 overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-7 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {days.slice(0, 7).map((day) => (
              <div key={day.getDay()} className="bg-ink-950 px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-paper-faint">
                {fmt(day, { weekday: 'short' })}
              </div>
            ))}
            {days.map((day) => {
              const dayMeetings = meetingsOn(day);
              const outside = day.getMonth() !== cursor.getMonth();
              return (
                <div key={day.toDateString()} className={`min-h-[112px] bg-ink-950 p-2 ${outside ? 'opacity-40' : ''}`}>
                  <button
                    type="button"
                    onClick={() => openDay(day)}
                    className={`mb-1.5 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-1 text-xs font-semibold hover:bg-white/10 ${sameDay(day, today) ? 'bg-lime text-ink-950 hover:bg-lime' : ''}`}
                  >
                    {day.getDate()}
                  </button>
                  <div className="space-y-1">
                    {dayMeetings.slice(0, 3).map((meeting) => <MeetingChip key={meeting.id} meeting={meeting} size="month" />)}
                    {dayMeetings.length > 3 && (
                      <button type="button" onClick={() => openDay(day)} className="font-mono text-[10px] uppercase tracking-widest text-paper-faint hover:text-paper">
                        +{dayMeetings.length - 3} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
