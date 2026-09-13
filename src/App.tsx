import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

import { PROJECTS } from './data/projects';
import { Nav } from './components/Nav';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Philosophy } from './components/Philosophy';
import { Team } from './components/Team';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { IntroOverlay } from './components/IntroOverlay';
import { CursorGlow } from './components/CursorGlow';

export const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false
    });

    lenisRef.current = lenis;

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      lenisRef.current?.scrollTo(0, { duration: 0.65 });
      return;
    }
    const target = document.getElementById(sectionId);
    const lenis = lenisRef.current;
    if (!target || !lenis) return;

    lenis.scrollTo(target, { duration: 0.65, offset: -88 });
  };

  return (
    <div className="min-h-screen bg-ink-950 text-paper selection:bg-lime selection:text-ink-950">
      {!isIntroComplete && <IntroOverlay onComplete={() => setIsIntroComplete(true)} />}
      <div className="grain-overlay" />
      <CursorGlow />
      <ScrollProgress />
      <Nav onNavigate={handleNavigate} />

      <main className="relative z-10">
        <Hero isReady={isIntroComplete} />
        <Services />
        <Process />
        <Philosophy />
        <Team />
        <Projects projects={PROJECTS} />
        <Contact />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
