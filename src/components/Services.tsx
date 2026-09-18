import React from 'react';
import { ArrowUpRight, Code2, Layers, Palette, Smartphone, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../lib/useInView';

const ICONS = { code: Code2, smartphone: Smartphone, workflow: Workflow, layers: Layers, palette: Palette };

const SERVICES = [
  { icon: 'code', slug: 'web-development', number: '01', title: 'Web Development', copy: 'High-performance websites and web applications shaped around how your business works.', tags: ['Responsive builds', 'API integrations', 'Performance tuning'] },
  { icon: 'smartphone', slug: 'mobile-apps', number: '02', title: 'Mobile Apps', copy: 'Reliable mobile applications that help your customers and teams get more done.', tags: ['iOS & Android', 'Offline-ready', 'Push notifications'] },
  { icon: 'workflow', slug: 'digital-transformation', number: '03', title: 'Digital Transformation', copy: 'Practical roadmaps that modernize operations, systems, and customer experiences.', tags: ['Process audits', 'Systems integration', 'Change rollout'] },
  { icon: 'layers', slug: 'custom-software', number: '04', title: 'Custom Software', copy: 'Purpose-built software designed to become the operating core of your business.', tags: ['Internal tools', 'Automation', 'Scalable architecture'] },
  { icon: 'palette', slug: 'ui-ux-design', number: '05', title: 'UI/UX Design', copy: 'Clear interface systems that make complex products easier to understand and use.', tags: ['Design systems', 'Prototyping', 'User research'] }
] as const;

export const Services: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.12);

  return (
    <section ref={ref} id="services" className={`reveal-group scroll-mt-24 px-6 py-24 lg:px-10 lg:py-28 ${inView ? 'is-in-view' : ''}`}>
      <div className="mx-auto max-w-[90rem]">
        <div className="reveal-item mb-14 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.6fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">What we do</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.96] tracking-tighter text-paper sm:text-5xl">
              Digital capabilities built for business growth.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-paper-dim sm:text-base lg:justify-self-end lg:text-right">
            From a focused product improvement to the systems that run your operations, we bring strategic clarity and dependable execution from start to finish.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <Link
                key={service.title}
                to={`/services/${service.slug}`}
                style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
                className="reveal-item group flex min-h-[19rem] flex-col justify-between rounded-2xl border border-white/10 bg-black p-7 transition-colors duration-300 hover:border-lime/50 focus-visible:border-lime/50 focus-visible:outline-none"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-700 text-lime transition-colors group-hover:bg-paper group-hover:text-ink-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span aria-hidden="true" className="text-paper-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-10">
                  <span className="font-mono text-[10px] tracking-widest text-lime">{service.number}</span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold leading-[1.02] tracking-tight text-paper">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-paper-dim">{service.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-ink-900 px-3 py-1 text-[10px] font-mono uppercase tracking-wide text-paper-faint">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
