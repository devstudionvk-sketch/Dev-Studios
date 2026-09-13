import React from 'react';
import { useInView } from '../lib/useInView';

const MEMBERS = ['Nithin Selvaraj', 'Kranti .P.A', 'Vivin .S'];

export const Team: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.25);

  return (
    <section ref={ref} id="studio" className={`reveal-group scroll-mt-24 border-y border-white/10 px-6 py-16 lg:px-10 lg:py-20 ${inView ? 'is-in-view' : ''}`} aria-label="The studio">
      <div className="mx-auto max-w-[90rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper-faint">The studio · Founders</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {MEMBERS.map((member, index) => (
            <div key={member} style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties} className="reveal-item flex items-center gap-4 rounded-2xl border border-white/10 bg-black px-5 py-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lime/30 font-mono text-[10px] text-lime">0{index + 1}</span>
              <p className="font-display text-lg font-bold tracking-tight text-paper sm:text-xl">{member}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
