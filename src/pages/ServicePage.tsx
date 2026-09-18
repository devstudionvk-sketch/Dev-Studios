import React, { useEffect } from 'react';
import type { RefObject } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import type Lenis from 'lenis';
import { ArrowUpRight, Code2, Layers, Palette, Smartphone, Workflow } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { BackToHome } from '../components/BackToHome';
import { Contact } from '../components/Contact';
import { useInView } from '../lib/useInView';
import { useLenis } from '../lib/useLenis';
import { useSiteNavigation } from '../lib/useSiteNavigation';
import { getServiceDetail, SERVICE_DETAILS, ServiceDetail } from '../data/serviceDetails';

const ICONS = { code: Code2, smartphone: Smartphone, workflow: Workflow, layers: Layers, palette: Palette };

const OTHER_SERVICES_LABEL = 'Explore more services';

export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceDetail(slug);
  const lenisRef = useLenis();
  const { handleNavigate } = useSiteNavigation(lenisRef);

  if (!service) return <Navigate to="/" replace />;

  return (
    <PageShell onNavigate={handleNavigate}>
      <ServiceDetailBody key={service.slug} service={service} lenisRef={lenisRef} handleNavigate={handleNavigate} />
    </PageShell>
  );
};

interface ServiceDetailBodyProps {
  service: ServiceDetail;
  lenisRef: RefObject<Lenis | null>;
  handleNavigate: (id: string) => void;
}

const ServiceDetailBody: React.FC<ServiceDetailBodyProps> = ({ service, lenisRef, handleNavigate }) => {
  const hero = useInView<HTMLElement>(0.05);
  const capabilities = useInView<HTMLElement>(0.15);
  const process = useInView<HTMLElement>(0.15);
  const details = useInView<HTMLElement>(0.15);
  const faqs = useInView<HTMLElement>(0.15);
  const related = useInView<HTMLElement>(0.15);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [lenisRef]);

  const Icon = ICONS[service.icon];
  const otherServices = SERVICE_DETAILS.filter((item) => item.slug !== service.slug);

  return (
    <>
      <section ref={hero.ref} className={`reveal-group scroll-mt-24 border-b border-white/10 px-6 pb-16 pt-36 sm:pt-44 lg:px-10 lg:pb-20 ${hero.inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto max-w-[90rem]">
          <BackToHome />
          <div className="reveal-item mt-8 flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink-700 text-lime">
              <Icon className="h-6 w-6" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Service {service.number}</span>
          </div>
          <h1 className="reveal-item mt-8 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[1.02] tracking-tight text-paper">
            {service.title}
          </h1>
          <p className="reveal-item mt-6 max-w-2xl text-base leading-relaxed text-paper-dim sm:text-lg">{service.overview}</p>
          <div className="reveal-item mt-8 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-ink-900 px-3 py-1 text-[10px] font-mono uppercase tracking-wide text-paper-faint">{tag}</span>
            ))}
          </div>
          <div className="reveal-item mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={() => handleNavigate('contact')} className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              Start a project <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => handleNavigate('work')} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-wider text-paper transition-colors hover:border-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              View our work
            </button>
          </div>
        </div>
      </section>

      <section ref={capabilities.ref} className={`reveal-group scroll-mt-24 border-b border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${capabilities.inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto max-w-[90rem]">
          <div className="reveal-item mb-14 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">What's included</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.96] tracking-tighter text-paper sm:text-5xl">Capabilities within this service.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.capabilities.map((capability, index) => (
              <article
                key={capability.title}
                style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
                className="reveal-item rounded-2xl border border-white/10 bg-black p-7 transition-colors duration-300 hover:border-lime/50"
              >
                <span className="font-mono text-[10px] tracking-widest text-lime">0{index + 1}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold leading-[1.02] tracking-tight text-paper">{capability.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper-dim">{capability.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={process.ref} className={`reveal-group scroll-mt-24 border-b border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${process.inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto max-w-[90rem]">
          <div className="reveal-item mb-14 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">How we work</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.96] tracking-tighter text-paper sm:text-5xl">Our process for {service.title.toLowerCase()}.</h2>
          </div>
          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div aria-hidden="true" className="process-line absolute left-0 right-0 top-[2.35rem] hidden h-px lg:block">
              <div className="process-line-fill h-full" />
            </div>
            {service.process.map((step, index) => (
              <div key={step.title} style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties} className="reveal-item relative">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ink-800 font-mono text-sm text-lime">0{index + 1}</div>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-paper">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-dim">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={details.ref} className={`reveal-group scroll-mt-24 border-b border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${details.inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal-item">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Tools & stack</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.02] tracking-tighter text-paper sm:text-4xl">Technology we reach for.</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-ink-900 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wide text-paper-dim">{item}</span>
              ))}
            </div>
          </div>
          <div className="reveal-item">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">You'll walk away with</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.02] tracking-tighter text-paper sm:text-4xl">Deliverables.</h2>
            <ul className="mt-8 flex flex-col gap-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-paper-dim">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section ref={faqs.ref} className={`reveal-group scroll-mt-24 border-b border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${faqs.inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto max-w-[90rem]">
          <div className="reveal-item mb-14 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Questions</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.96] tracking-tighter text-paper sm:text-5xl">Common questions.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {service.faqs.map((faq, index) => (
              <div
                key={faq.question}
                style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
                className="reveal-item rounded-2xl border border-white/10 bg-black p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-paper">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-dim">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={related.ref} className={`reveal-group scroll-mt-24 border-b border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${related.inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto max-w-[90rem]">
          <p className="reveal-item font-mono text-[10px] uppercase tracking-[0.28em] text-lime">{OTHER_SERVICES_LABEL}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((item, index) => {
              const OtherIcon = ICONS[item.icon];
              return (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
                  className="reveal-item group flex flex-col justify-between rounded-2xl border border-white/10 bg-black p-6 transition-colors duration-300 hover:border-lime/50 focus-visible:border-lime/50 focus-visible:outline-none"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-700 text-lime transition-colors group-hover:bg-paper group-hover:text-ink-950">
                    <OtherIcon className="h-4 w-4" />
                  </span>
                  <div className="mt-8 flex items-center justify-between">
                    <h3 className="font-display text-base font-bold tracking-tight text-paper">{item.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-paper-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};
