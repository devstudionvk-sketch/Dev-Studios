import React from 'react';
import { formatLabel } from '../lib/format';

const TONES: Record<string, string> = {
  new: 'bg-lime/20 text-lime',
  lead: 'bg-lime/20 text-lime',
  contacted: 'bg-paper/15 text-paper',
  active: 'bg-paper/15 text-paper',
  in_progress: 'bg-paper/15 text-paper',
  on_hold: 'bg-paper-faint/20 text-paper-faint',
  closed: 'bg-paper-faint/20 text-paper-faint',
  completed: 'bg-lime-soft/20 text-lime-soft',
  cancelled: 'bg-red-500/15 text-red-300',
  scheduled: 'bg-lime/20 text-lime',
  confirmed: 'bg-paper/15 text-paper',
  rescheduled: 'bg-lime-soft/20 text-lime-soft',
  follow_up: 'bg-lime-soft/20 text-lime-soft',
  no_show: 'bg-red-500/15 text-red-300'
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${TONES[status] || 'bg-paper/15 text-paper'}`}>
    {formatLabel(status)}
  </span>
);
