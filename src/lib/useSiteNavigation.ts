import { useCallback } from 'react';
import type { RefObject } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type Lenis from 'lenis';

export function useSiteNavigation(lenisRef: RefObject<Lenis | null>) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      lenisRef.current?.scrollTo(0, { duration: 0.65 });
      return;
    }
    const target = document.getElementById(sectionId);
    const lenis = lenisRef.current;
    if (!target || !lenis) return;
    lenis.scrollTo(target, { duration: 0.65, offset: -88 });
  }, [lenisRef]);

  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === 'work') {
      navigate('/work');
      return;
    }
    if (sectionId !== 'home' && document.getElementById(sectionId)) {
      scrollToSection(sectionId);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    scrollToSection(sectionId);
  }, [location.pathname, navigate, scrollToSection]);

  return { handleNavigate, scrollToSection };
}
