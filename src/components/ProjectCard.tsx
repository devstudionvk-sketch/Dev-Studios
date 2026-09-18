import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, featured }) => (
  <a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{ '--reveal-delay': `${(index % 6) * 70}ms` } as React.CSSProperties}
    className={`bento-card reveal-item group flex flex-col justify-between p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime ${featured ? 'sm:col-span-2 lg:row-span-2' : ''}`}
  >
    <span className="bento-card__image" style={{ backgroundImage: `url(${project.previewImage})` }} aria-hidden="true" />
    <span className="bento-card__scrim" aria-hidden="true" />
    <div className="relative z-10 flex items-start justify-between">
      <span className="font-mono text-[10px] text-lime">{project.num}</span>
      <span className="rounded-full border border-white/15 bg-ink-950/60 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-paper-dim backdrop-blur">{project.category}</span>
    </div>
    <div className="relative z-10">
      <h3 className={`font-display font-black leading-[0.95] tracking-tight text-paper transition-opacity group-hover:opacity-80 ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{project.name}</h3>
      <p className="mt-2 text-xs text-paper-faint">{project.builder}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-paper-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper">
        Open project <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </div>
  </a>
);
