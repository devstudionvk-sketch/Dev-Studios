import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const pad = (n: number) => String(n).padStart(2, '0');
const toValue = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const startOfWeek = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// value is a local "YYYY-MM-DD" string.
export const DatePicker: React.FC<{ value: string; onChange: (value: string) => void; className: string }> = ({ value, onChange, className }) => {
  const parsed = new Date(`${value}T00:00`);
  const valid = !Number.isNaN(parsed.getTime());
  const base = valid ? parsed : new Date();

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date(base.getFullYear(), base.getMonth(), 1));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const pick = (date: Date) => { onChange(toValue(date)); setOpen(false); };

  const days = Array.from({ length: 42 }, (_, i) => {
    const first = startOfWeek(month);
    return new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
  });
  const today = new Date();
  const label = valid ? parsed.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select a date';

  return (
    <div ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${className} flex items-center justify-between gap-3 text-left`}
      >
        <span>{label}</span>
        <CalendarDays className="h-4 w-4 shrink-0 text-paper-faint" />
      </button>

      {open && (
        <div role="dialog" aria-label="Pick a date" className="absolute left-0 z-30 mt-2 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border-2 border-white/15 bg-black p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-full p-1.5 text-paper-dim hover:bg-white/10 hover:text-paper"><ChevronLeft className="h-4 w-4" /></button>
            <span className="font-display text-sm font-bold">{month.toLocaleDateString([], { month: 'long', year: 'numeric' })}</span>
            <button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-full p-1.5 text-paper-dim hover:bg-white/10 hover:text-paper"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((weekday, i) => <span key={i} className="pb-1 font-mono text-[10px] uppercase text-paper-faint">{weekday}</span>)}
            {days.map((day) => {
              const selectedDay = valid && day.toDateString() === parsed.toDateString();
              const isToday = day.toDateString() === today.toDateString();
              return (
                <button
                  key={day.toDateString()}
                  type="button"
                  onClick={() => pick(day)}
                  className={`h-9 rounded-full text-xs transition-colors ${selectedDay ? 'bg-lime font-bold text-ink-950' : `hover:bg-white/10 ${day.getMonth() === month.getMonth() ? 'text-paper' : 'text-paper-faint/50'} ${isToday ? 'ring-1 ring-lime' : ''}`}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-3 border-t border-white/10 pt-3">
            <button type="button" onClick={() => pick(today)} className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper-faint transition-colors hover:text-paper">Today</button>
          </div>
        </div>
      )}
    </div>
  );
};
