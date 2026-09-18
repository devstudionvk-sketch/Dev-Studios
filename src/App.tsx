import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PageShell } from './components/PageShell';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Philosophy } from './components/Philosophy';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { IntroOverlay } from './components/IntroOverlay';
import { useLenis } from './lib/useLenis';
import { useSiteNavigation } from './lib/useSiteNavigation';

const INTRO_PLAYED_KEY = 'introPlayed';

export const App: React.FC = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_PLAYED_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const lenisRef = useLenis();
  const { handleNavigate, scrollToSection } = useSiteNavigation(lenisRef);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo && isIntroComplete) {
      const sectionId = state.scrollTo;
      requestAnimationFrame(() => scrollToSection(sectionId));
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [isIntroComplete, location, navigate, scrollToSection]);

  const completeIntro = () => {
    try {
      sessionStorage.setItem(INTRO_PLAYED_KEY, 'true');
    } catch {
      // ignore — worst case the intro replays if storage is unavailable
    }
    setIsIntroComplete(true);
  };

  return (
    <>
      {!isIntroComplete && <IntroOverlay onComplete={completeIntro} />}
      <PageShell onNavigate={handleNavigate}>
        <Hero isReady={isIntroComplete} />
        <Services />
        <Process />
        <Philosophy />
        <Team />
        <Contact />
      </PageShell>
    </>
  );
};

export default App;
