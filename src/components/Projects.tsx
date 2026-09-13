import React, { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Project } from '../data/projects';
import { useInView } from '../lib/useInView';

interface ProjectsProps {
  projects: Project[];
}

const CATEGORIES = ['All', 'Aerospace & Simulation', 'AI & Systems', 'Design & Editorial', 'WebGL & 3D', 'Dev Tools & SaaS'] as const;
const HIGHLIGHT_IDS = ['buildit', 'library-assistant', 'mental-wellbeing'];

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView<HTMLElement>(0.1);

  const highlightProjects = useMemo(() => projects.filter((project) => HIGHLIGHT_IDS.includes(project.id)), [projects]);
  const remainingCount = projects.length - highlightProjects.length;
  const isHighlightView = activeCategory === 'All' && !showAll;

  const visible = useMemo(() => {
    if (activeCategory !== 'All') return projects.filter((project) => project.category === activeCategory);
    return showAll ? projects : highlightProjects;
  }, [projects, activeCategory, showAll, highlightProjects]);

  return (
    <section ref={ref} id="work" className={`reveal-group scroll-mt-24 border-t border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${inView ? 'is-in-view' : ''}`}>
      <div className="mx-auto max-w-[90rem]">
        <div className="reveal-item mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Selected work</p>
            <h2 className="mt-5 font-display text-4xl font-black leading-[0.96] tracking-tighter text-paper sm:text-5xl">{projects.length} projects, one collective.</h2>
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

        <div className={isHighlightView ? 'grid auto-rows-[22rem] grid-cols-1 gap-4 sm:grid-cols-3' : 'grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
          {visible.map((project, index) => {
            const isFeatured = !isHighlightView && project.featured && index % 5 === 0;
            return (
              <a
                key={project.id}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--reveal-delay': `${(index % 6) * 70}ms` } as React.CSSProperties}
                className={`bento-card reveal-item group flex flex-col justify-between p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime ${isFeatured ? 'sm:col-span-2 lg:row-span-2' : ''}`}
              >
                <span className="bento-card__image" style={{ backgroundImage: `url(${project.previewImage})` }} aria-hidden="true" />
                <span className="bento-card__scrim" aria-hidden="true" />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-[10px] text-lime">{project.num}</span>
                  <span className="rounded-full border border-white/15 bg-ink-950/60 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-paper-dim backdrop-blur">{project.category}</span>
                </div>
                <div className="relative z-10">
                  <h3 className={`font-display font-black leading-[0.95] tracking-tight text-paper transition-opacity group-hover:opacity-80 ${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{project.name}</h3>
                  <p className="mt-2 text-xs text-paper-faint">{project.builder}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-paper-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper">
                    Open project <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {activeCategory === 'All' && (
          <div className="mt-10 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              className="flex w-full items-center justify-between py-6 text-left transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              <span className="font-display text-xl font-bold tracking-tight text-paper">{showAll ? 'Show fewer projects' : `View ${remainingCount} more projects`}</span>
              <ChevronDown className={`h-5 w-5 text-paper-dim transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
