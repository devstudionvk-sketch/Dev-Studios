import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
