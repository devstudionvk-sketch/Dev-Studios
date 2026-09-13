import React, { useEffect } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface IntroOverlayProps {
  onComplete: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }
    const timer = window.setTimeout(onComplete, 1500);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="relative">
        <span className="intro-word font-display">DEV STUDIOS</span>
        <span className="intro-bar" />
      </div>
    </div>
  );
};
