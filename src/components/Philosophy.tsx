import React from 'react';
import { useInView } from '../lib/useInView';

const PRINCIPLES = [
  ['01', 'Clarity over noise'],
  ['02', 'Craft with purpose'],
  ['03', 'Built to last']
];

export const Philosophy: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.15);

  return (
    <section ref={ref} className={`reveal-group border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32 ${inView ? 'is-in-view' : ''}`}>
      <div className="mx-auto max-w-[90rem]">
        <div className="reveal-item flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-paper-faint">
          <span className="text-lime">02 / Brand philosophy</span>
          <span>DEV STUDIOS / 2026</span>
        </div>

        <div className="grid gap-12 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24 lg:py-20">
          <div className="reveal-item lg:pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">The principle</p>
            <p className="mt-6 max-w-md font-display text-4xl font-extrabold leading-[1.02] tracking-tighter text-paper sm:text-6xl">
              Make the useful feel inevitable.
            </p>
          </div>
          <div className="reveal-item max-w-3xl">
            <p className="font-display text-2xl font-medium leading-[1.2] tracking-tight text-paper-dim sm:text-4xl">
              We believe digital work earns its place when it is clear, considered, and durable. Our role is to understand the real problem, find its essential shape, and build it with care.
            </p>
          </div>
        </div>

        <div className="grid border-t border-white/10 sm:grid-cols-3">
          {PRINCIPLES.map(([number, principle], index) => (
            <div key={number} style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties} className="reveal-item group border-b border-white/10 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <p className="font-mono text-[10px] tracking-[0.24em] text-lime">{number}</p>
              <p className="mt-10 font-display text-2xl font-bold tracking-tight text-paper transition-opacity group-hover:opacity-70">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
