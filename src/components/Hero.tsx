import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Marquee } from './Marquee';

interface HeroProps {
  isReady: boolean;
}

const CAPABILITIES = ['Web Development', 'Mobile Apps', 'Digital Transformation', 'Custom Software', 'UI/UX Design'];

export const Hero: React.FC<HeroProps> = ({ isReady }) => {
  return (
    <section id="home" className={`relative overflow-hidden px-6 pb-16 pt-36 sm:pt-44 lg:px-10 lg:pb-20 ${isReady ? 'hero-ready' : ''}`}>
      <div className="relative mx-auto max-w-[90rem]">
        <p className="hero-reveal hero-reveal--one font-mono text-[10px] uppercase tracking-[0.3em] text-lime">Independent digital studio</p>

        <h1 className="hero-reveal hero-reveal--two mt-6 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-tight text-paper">
          We build digital products that move businesses forward.
        </h1>

        <p className="hero-reveal hero-reveal--three mt-6 max-w-xl text-base leading-relaxed text-paper-dim">
          DEV STUDIOS designs and engineers digital products, business systems, and interactive experiences that create measurable value.
        </p>

        <div className="hero-reveal hero-reveal--four mt-9 flex flex-wrap gap-3">
          <Link to="/work" className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
            View the work <ArrowDownRight className="h-4 w-4" />
          </Link>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-wider text-paper transition-colors hover:border-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="hero-reveal hero-reveal--five mt-16 border-t border-white/10 pt-5">
          <Marquee items={CAPABILITIES} />
        </div>
      </div>
    </section>
  );
};
