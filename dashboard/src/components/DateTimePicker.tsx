import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const pad = (n: number) => String(n).padStart(2, '0');
const toValue = (date: Date, hour: number, minute: number) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(hour)}:${pad(minute)}`;
const startOfWeek = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// value is a local "YYYY-MM-DDTHH:mm" string, same shape as <input type="datetime-local">.
export const DateTimePicker: React.FC<{ value: string; onChange: (value: string) => void; className: string }> = ({ value, onChange, className }) => {
  const parsed = new Date(value);
  const valid = !Number.isNaN(parsed.getTime());
  const base = valid ? parsed : new Date();
  const hour = valid ? parsed.getHours() : 9;
  const minute = valid ? parsed.getMinutes() : 0;

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date(base.getFullYear(), base.getMonth(), 1));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', escape);
    rootRef.current?.querySelectorAll<HTMLElement>('[data-scroll-to]').forEach((el) => {
      const column = el.parentElement!;
      column.scrollTop = el.offsetTop - column.clientHeight / 2 + el.clientHeight / 2;
    });
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const days = Array.from({ length: 42 }, (_, i) => {
    const first = startOfWeek(month);
    return new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
  });
  const today = new Date();

  const label = valid
    ? parsed.toLocaleString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : 'Select date & time';

  const timeButton = (active: boolean, text: string, onClick: () => void) => (
    <button
      key={text}
      type="button"
      onClick={onClick}
      {...(active ? { 'data-scroll-to': true } : {})}
      className={`block w-full rounded-lg py-1.5 font-mono text-xs transition-colors ${active ? 'bg-lime font-bold text-ink-950' : 'text-paper-dim hover:bg-white/10 hover:text-paper'}`}
    >
      {text}
    </button>
  );

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
        <div role="dialog" aria-label="Pick date and time" className="absolute left-0 z-30 mt-2 w-[min(25rem,calc(100vw-3rem))] rounded-2xl border-2 border-white/15 bg-black p-4 shadow-2xl [color-scheme:dark]">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="min-w-0 flex-1">
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
                      onClick={() => onChange(toValue(day, hour, minute))}
                      className={`h-8 rounded-full text-xs transition-colors ${selectedDay ? 'bg-lime font-bold text-ink-950' : `hover:bg-white/10 ${day.getMonth() === month.getMonth() ? 'text-paper' : 'text-paper-faint/50'} ${isToday ? 'ring-1 ring-lime' : ''}`}`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-1.5">
              <div className="relative h-36 w-full overflow-y-auto sm:h-[17rem] sm:w-12">
                {HOURS.map((h) => timeButton(valid && h === hour, pad(h), () => onChange(toValue(base, h, minute))))}
              </div>
              <div className="relative h-36 w-full overflow-y-auto sm:h-[17rem] sm:w-12">
                {MINUTES.map((m) => timeButton(valid && m === minute, pad(m), () => onChange(toValue(base, hour, m))))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <button type="button" onClick={() => { const now = new Date(); setMonth(new Date(now.getFullYear(), now.getMonth(), 1)); onChange(toValue(now, hour, minute)); }} className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper-faint transition-colors hover:text-paper">Today</button>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-paper px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-950">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};
