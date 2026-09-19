import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, CornerDownRight, Pencil, Plus, Repeat } from 'lucide-react';
import { dataSource } from '../lib/dataSource';
import { StatusBadge } from '../components/StatusBadge';
import { meetingToInput } from '../types/dashboard';
import type { Meeting, MeetingFormState } from '../types/dashboard';

type View = 'day' | 'week' | 'month';
const VIEWS: View[] = ['day', 'week', 'month'];

const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const startOfWeek = (date: Date) => addDays(date, -((date.getDay() + 6) % 7));
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
const fmt = (date: Date, options: Intl.DateTimeFormatOptions) => date.toLocaleDateString([], options);
const showOrganization = (meeting: Meeting) =>
  meeting.organization && meeting.organization.trim().toLowerCase() !== meeting.contact_name.trim().toLowerCase();
const isDone = (meeting: Meeting) => meeting.stage === 'completed';
const isInactive = (meeting: Meeting) => meeting.stage === 'cancelled' || meeting.stage === 'no_show';

// A follow-up starts as a fresh meeting a week out at the same time of day; the user adjusts it in the form.
const followUpState = (meeting: Meeting): MeetingFormState => {
  const original = new Date(meeting.meeting_at);
  const next = new Date();
  next.setDate(next.getDate() + 7);
  next.setHours(original.getHours(), original.getMinutes(), 0, 0);
  return {
    banner: `Follow-up to your meeting with ${meeting.contact_name}.`,
    startsAt: next.toISOString(),
    prefill: {
      contact_name: meeting.contact_name,
      organization: meeting.organization ?? '',
      contact_info: meeting.contact_info ?? '',
      is_client: meeting.is_client,
      follow_up_of: meeting.id
    }
  };
};

type ItemProps = { meeting: Meeting; followUp?: Meeting; onToggleDone: (meeting: Meeting) => void };

const FollowUpTag: React.FC = () => (
  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-lime-soft"><Repeat className="h-3 w-3" /> Follow-up</span>
);

const MeetingChip: React.FC<ItemProps & { compact: boolean }> = ({ meeting, followUp, onToggleDone, compact }) => {
  const done = isDone(meeting);
  return (
    <div className={`relative ${done || isInactive(meeting) ? 'opacity-60' : ''}`}>
      <Link
        to={`/meetings/${meeting.id}/edit`}
        title="Edit meeting"
        className={`block rounded-xl border bg-black px-2.5 py-1.5 transition-colors hover:border-lime ${meeting.follow_up_of ? 'border-dashed' : ''} ${meeting.is_client ? 'border-lime/50' : 'border-white/15'} ${compact ? '' : 'pr-9'}`}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">{timeLabel(meeting.meeting_at)}</p>
        <p className={`truncate text-xs font-semibold ${done ? 'line-through' : ''}`}>{meeting.contact_name}</p>
        {!compact && showOrganization(meeting) && <p className={`truncate text-xs text-paper-dim ${done ? 'line-through' : ''}`}>{meeting.organization}</p>}
        {!compact && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={meeting.stage} />
            {meeting.is_client && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime">Client</span>}
            {meeting.follow_up_of && <FollowUpTag />}
          </div>
        )}
        {followUp && (
          <p className="mt-1 flex items-center gap-1 truncate font-mono text-[10px] uppercase tracking-widest text-lime-soft">
            <CornerDownRight className="h-3 w-3 shrink-0" />
            {fmt(new Date(followUp.meeting_at), { day: 'numeric', month: 'short' })}, {timeLabel(followUp.meeting_at)}
          </p>
        )}
      </Link>
      {!compact && (
        <button
          type="button"
          onClick={() => onToggleDone(meeting)}
          aria-pressed={done}
          aria-label={done ? 'Mark as not completed' : 'Mark as completed'}
          title={done ? 'Completed — click to undo' : 'Mark completed'}
          className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${done ? 'border-lime bg-lime text-ink-950' : 'border-white/25 text-transparent hover:border-lime hover:text-lime'}`}
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

const MeetingCard: React.FC<ItemProps> = ({ meeting, followUp, onToggleDone }) => {
  const done = isDone(meeting);
  const strike = done ? 'line-through' : '';
  return (
    <div className={`rounded-3xl border-2 bg-black p-5 sm:p-6 ${meeting.is_client ? 'border-lime/40' : 'border-white/15'} ${done || isInactive(meeting) ? 'opacity-60' : ''}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <div className="sm:w-28 sm:shrink-0">
          <p className={`font-display text-xl font-black tracking-tight ${strike}`}>{timeLabel(meeting.meeting_at)}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-faint">{meeting.duration_minutes} min</p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className={`font-display text-lg font-bold ${strike}`}>{meeting.contact_name}</p>
              {showOrganization(meeting) && <p className={`mt-0.5 text-sm text-paper-dim ${strike}`}>{meeting.organization}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {meeting.follow_up_of && <FollowUpTag />}
              <StatusBadge status={meeting.stage} />
              {meeting.is_client && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime">Client</span>}
              <Link
                to={`/meetings/${meeting.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-paper-dim transition-colors hover:border-lime hover:text-lime"
              >
                <Pencil className="h-3 w-3" /> Edit
              </Link>
            </div>
          </div>

          {(meeting.contact_info || meeting.notes) && (
            <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm text-paper-dim">
              {meeting.contact_info && <p>{meeting.contact_info}</p>}
              {meeting.notes && <p className="whitespace-pre-line text-paper-faint">{meeting.notes}</p>}
            </div>
          )}

          {followUp && (
            <Link to={`/meetings/${followUp.id}/edit`} className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-lime-soft/40 px-3 py-2 text-sm text-lime-soft transition-colors hover:border-lime-soft">
              <CornerDownRight className="h-4 w-4 shrink-0" />
              <span>Follow-up: {fmt(new Date(followUp.meeting_at), { weekday: 'short', day: 'numeric', month: 'short' })} · {timeLabel(followUp.meeting_at)}</span>
            </Link>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => onToggleDone(meeting)}
              aria-pressed={done}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${done ? 'border-lime bg-lime text-ink-950' : 'border-white/15 text-paper-dim hover:border-lime hover:text-lime'}`}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> {done ? 'Completed' : 'Mark completed'}
            </button>
            <Link
              to="/meetings/new"
              state={followUpState(meeting)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-paper-dim transition-colors hover:border-lime hover:text-lime"
            >
              <Repeat className="h-3.5 w-3.5" /> Follow up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardMeetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [error, setError] = useState('');
  const [view, setView] = useState<View>('week');
  const [cursor, setCursor] = useState(() => new Date());
  const [showCompleted, setShowCompleted] = useState(false);

  const load = () => {
    dataSource.listMeetings()
      .then(setMeetings)
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load meetings.'));
  };

  useEffect(load, []);

  const toggleDone = async (meeting: Meeting) => {
    const stage = isDone(meeting) ? 'scheduled' : 'completed';
    setMeetings((current) => current?.map((item) => item.id === meeting.id ? { ...item, stage } : item) ?? current);
    try {
      await dataSource.updateMeeting(meeting.id, meetingToInput({ ...meeting, stage }));
    } catch {
      load();
    }
  };

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const byDay = useMemo(() => {
    const map = new Map<string, Meeting[]>();
    // Completed meetings stay (struck through) for the rest of their day, then drop off.
    const visible = (meetings ?? []).filter((meeting) => showCompleted || !isDone(meeting) || new Date(meeting.meeting_at) >= startOfToday);
    visible
      .sort((a, b) => new Date(a.meeting_at).getTime() - new Date(b.meeting_at).getTime())
      .forEach((meeting) => {
        const key = new Date(meeting.meeting_at).toDateString();
        map.set(key, [...(map.get(key) ?? []), meeting]);
      });
    return map;
  }, [meetings, showCompleted, startOfToday.getTime()]);

  // Earliest not-yet-completed follow-up for each meeting, shown as a preview on the original.
  const followUps = useMemo(() => {
    const map = new Map<string, Meeting>();
    [...(meetings ?? [])]
      .filter((meeting) => meeting.follow_up_of && !isDone(meeting))
      .sort((a, b) => new Date(b.meeting_at).getTime() - new Date(a.meeting_at).getTime())
      .forEach((meeting) => map.set(meeting.follow_up_of as string, meeting));
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
        <div className="flex flex-wrap gap-2">
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
          <button
            type="button"
            onClick={() => setShowCompleted((current) => !current)}
            aria-pressed={showCompleted}
            className={`${buttonClass} ${showCompleted ? 'border-lime text-lime' : 'text-paper-faint'}`}
          >
            Past completed
          </button>
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
          {meetingsOn(cursor).map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} followUp={followUps.get(meeting.id)} onToggleDone={toggleDone} />)}
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
                {meetingsOn(day).map((meeting) => <MeetingChip key={meeting.id} meeting={meeting} followUp={followUps.get(meeting.id)} onToggleDone={toggleDone} compact={false} />)}
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
                    {dayMeetings.slice(0, 3).map((meeting) => <MeetingChip key={meeting.id} meeting={meeting} followUp={followUps.get(meeting.id)} onToggleDone={toggleDone} compact />)}
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
