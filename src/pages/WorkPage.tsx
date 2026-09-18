import React, { useMemo, useState } from 'react';
import { PROJECTS } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { PageShell } from '../components/PageShell';
import { BackToHome } from '../components/BackToHome';
import { Contact } from '../components/Contact';
import { useInView } from '../lib/useInView';
import { useLenis } from '../lib/useLenis';
import { useSiteNavigation } from '../lib/useSiteNavigation';

const CATEGORIES = ['All', 'Aerospace & Simulation', 'AI & Systems', 'Design & Editorial', 'WebGL & 3D', 'Dev Tools & SaaS'] as const;

export const WorkPage: React.FC = () => {
  const lenisRef = useLenis();
  const { handleNavigate } = useSiteNavigation(lenisRef);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const { ref, inView } = useInView<HTMLElement>(0.05);

  const visible = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageShell onNavigate={handleNavigate}>
      <section ref={ref} className={`reveal-group scroll-mt-24 px-6 pb-24 pt-36 sm:pt-44 lg:px-10 lg:pb-28 ${inView ? 'is-in-view' : ''}`}>
        <div className="mx-auto max-w-[90rem]">
          <BackToHome />
          <div className="reveal-item mb-10 mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">All work</p>
              <h1 className="mt-5 font-display text-4xl font-black leading-[0.96] tracking-tighter text-paper sm:text-6xl">{PROJECTS.length} projects, one collective.</h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">Products, tools, and experiments built across systems, interfaces, and the web — filter by discipline below.</p>
          </div>

          <div className="reveal-item mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full border px-4 py-2 text-[11px] font-mono uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime ${activeCategory === category ? 'border-paper bg-paper text-ink-950' : 'border-white/15 text-paper-dim hover:border-white/40 hover:text-paper'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured={activeCategory === 'All' && project.featured && index % 5 === 0} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="reveal-item py-16 text-center text-sm text-paper-dim">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <Contact />
    </PageShell>
  );
};
