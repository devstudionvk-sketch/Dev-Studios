import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackToHome: React.FC = () => (
  <Link
    to="/"
    className="reveal-item inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
  >
    <ArrowLeft className="h-3.5 w-3.5" /> Back to homepage
  </Link>
);
