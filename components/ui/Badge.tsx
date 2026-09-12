import { Difficulty } from '@/types/quiz';
import { cn } from '@/lib/utils';

interface BadgeProps {
  difficulty?: Difficulty;
  variant?: 'easy' | 'medium' | 'hard' | 'category' | 'time' | 'default';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  difficulty,
  variant,
  children,
  className,
}: BadgeProps) {
  const activeVariant = difficulty || variant || 'default';

  const variantStyles = {
    easy: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    hard: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    category: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
    time: 'bg-slate-800 text-slate-300 border border-slate-700',
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[activeVariant],
        className
      )}
    >
      {difficulty === 'easy' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
      {difficulty === 'medium' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
      {difficulty === 'hard' && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
      {children}
    </span>
  );
}
