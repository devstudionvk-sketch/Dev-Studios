import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'studio', label: 'Studio' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

interface NavProps {
  onNavigate: (id: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${isScrolled ? 'border-white/10 bg-ink-950/85 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <nav aria-label="Primary" className="mx-auto flex h-[76px] max-w-[90rem] items-center justify-between px-6 lg:px-10">
        <button onClick={() => navigate('home')} className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
          <span className="font-display text-base font-extrabold tracking-tight text-paper">DEV STUDIOS</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className="text-[11px] font-mono uppercase tracking-widest text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => navigate('contact')} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <button onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} className="p-2 text-paper md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-ink-950 px-6 py-8 md:hidden">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)} className="text-left font-display text-3xl font-extrabold tracking-tight text-paper transition-opacity hover:opacity-70">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => navigate('contact')} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-paper px-5 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
