import React from 'react';

interface MarqueeProps {
  items: string[];
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, className = '' }) => {
  const doubled = [...items, ...items];

  return (
    <div className={`no-scrollbar overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-4 flex shrink-0 items-center gap-4 font-mono text-xs uppercase tracking-[0.22em] text-paper-faint">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
};
