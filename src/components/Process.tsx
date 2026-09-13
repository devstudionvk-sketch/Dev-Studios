import React from 'react';
import { useInView } from '../lib/useInView';

const STEPS = [
  ['01', 'Discover', 'We start by understanding the real problem — the constraints, the users, and what success actually looks like.'],
  ['02', 'Design', 'We shape the essential structure first, then the interface — clear systems before decoration.'],
  ['03', 'Build', 'We ship in small, working increments, engineered to hold up under real use, not just a demo.'],
  ['04', 'Launch & grow', 'We hand off with the context you need, and stay close for the iterations that follow.']
];

export const Process: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.15);

  return (
    <section ref={ref} id="process" className={`reveal-group scroll-mt-24 border-t border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${inView ? 'is-in-view' : ''}`}>
      <div className="mx-auto max-w-[90rem]">
        <div className="reveal-item mb-14 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">How we work</p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.96] tracking-tighter text-paper sm:text-5xl">A process built for clarity, not ceremony.</h2>
        </div>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden="true" className="process-line absolute left-0 right-0 top-[2.35rem] hidden h-px lg:block">
            <div className="process-line-fill h-full" />
          </div>
          {STEPS.map(([number, title, copy], index) => (
            <div key={number} style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties} className="reveal-item relative">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ink-800 font-mono text-sm text-lime">{number}</div>
              <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-paper">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-dim">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
