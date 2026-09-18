import React from 'react';
import { CursorGlow } from './CursorGlow';
import { ScrollProgress } from './ScrollProgress';
import { Nav } from './Nav';
import { Footer } from './Footer';

interface PageShellProps {
  onNavigate: (id: string) => void;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ onNavigate, children }) => (
  <div className="min-h-screen bg-ink-950 text-paper selection:bg-lime selection:text-ink-950">
    <div className="grain-overlay" />
    <CursorGlow />
    <ScrollProgress />
    <Nav onNavigate={onNavigate} />
    <main className="relative z-10">{children}</main>
    <Footer onNavigate={onNavigate} />
  </div>
);
