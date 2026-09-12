import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export default function Card({
  hoverEffect = false,
  glow = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-5 transition-all duration-300',
        hoverEffect &&
          'hover:border-purple-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1',
        glow && 'ring-1 ring-purple-500/30 shadow-lg shadow-purple-500/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
