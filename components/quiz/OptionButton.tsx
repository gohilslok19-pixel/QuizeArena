'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean | null; // null if unrevealed
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function OptionButton({
  index,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled,
}: OptionButtonProps) {
  const letters = ['A', 'B', 'C', 'D'];
  const letter = letters[index] || String(index + 1);

  // Determine styling based on revelation status
  let stateClasses =
    'border-slate-800 bg-slate-900/90 text-slate-200 hover:border-purple-500/50 hover:bg-slate-850 hover:text-white';
  let badgeClasses = 'bg-slate-800 text-slate-400 border-slate-700';

  if (isRevealed) {
    if (isCorrect) {
      // This is the correct answer
      stateClasses =
        'border-emerald-500 bg-emerald-950/40 text-emerald-100 ring-1 ring-emerald-500/50';
      badgeClasses = 'bg-emerald-600 text-white border-emerald-400';
    } else if (isSelected && !isCorrect) {
      // User selected this incorrect option
      stateClasses =
        'border-rose-500 bg-rose-950/40 text-rose-100 ring-1 ring-rose-500/50';
      badgeClasses = 'bg-rose-600 text-white border-rose-400';
    } else {
      // Neutral unselected option after answer is revealed
      stateClasses = 'border-slate-800/60 bg-slate-900/40 text-slate-500 opacity-60';
      badgeClasses = 'bg-slate-800 text-slate-500 border-slate-800';
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative flex w-full items-center justify-between rounded-xl border p-4 sm:p-4.5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50',
        stateClasses
      )}
      aria-label={`Option ${letter}: ${text}`}
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        <span
          className={cn(
            'flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg border text-xs sm:text-sm font-semibold transition-colors',
            badgeClasses
          )}
        >
          {letter}
        </span>
        <span className="text-sm sm:text-base font-medium leading-snug">{text}</span>
      </div>

      {/* Trailing indicator icon */}
      {isRevealed && isCorrect && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      )}
      {isRevealed && isSelected && !isCorrect && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      )}
    </button>
  );
}
