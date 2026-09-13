import React from 'react';
import { Github, Mail } from 'lucide-react';
import { useInView } from '../lib/useInView';

const NAV_LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'studio', label: 'Studio' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { ref, inView } = useInView<HTMLElement>(0.2);

  return (
    <footer ref={ref} className={`reveal-group relative z-10 border-t border-white/10 bg-ink-950 px-6 pt-16 lg:px-10 ${inView ? 'is-in-view' : ''}`}>
      <div className="mx-auto max-w-[90rem]">
        <div className="reveal-item grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight text-paper">DEV STUDIOS</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">An independent digital studio designing and engineering products, systems, and interactive experiences.</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">Navigate</p>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavigate(link.id)} className="text-sm text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">Connect</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href="mailto:devstudionvk@gmail.com" className="inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </li>
              <li>
                <a href="https://github.com/devstudionvk-sketch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="reveal-item flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">© 2026 DEV STUDIOS · Remote-first</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">Independent digital studio</span>
        </div>

        <div aria-hidden="true" className="reveal-item select-none overflow-hidden pb-4 pt-2 text-center">
          <span className="font-display font-black leading-none tracking-tighter text-paper" style={{ fontSize: 'clamp(3rem, 14vw, 11rem)', opacity: 0.05 }}>
            DEV STUDIOS
          </span>
        </div>
      </div>
    </footer>
  );
};
