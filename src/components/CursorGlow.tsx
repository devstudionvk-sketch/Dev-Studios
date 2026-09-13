import React, { useEffect, useRef } from 'react';
import { isTouchDevice, prefersReducedMotion } from '../lib/motion';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    const glow = glowRef.current;
    if (!glow) return;

    const handleMove = (event: MouseEvent) => {
      glow.style.setProperty('--glow-x', `${event.clientX}px`);
      glow.style.setProperty('--glow-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (prefersReducedMotion() || isTouchDevice()) return null;

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
};
