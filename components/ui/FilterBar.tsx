'use client';

import { Difficulty } from '@/types/quiz';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  selectedCategory: string;
  selectedDifficulty: string;
  onSelectCategory: (categorySlug: string) => void;
  onSelectDifficulty: (difficulty: string) => void;
  className?: string;
}

export default function FilterBar({
  selectedCategory,
  selectedDifficulty,
  onSelectCategory,
  onSelectDifficulty,
  className,
}: FilterBarProps) {
  const difficulties: { label: string; value: string; color?: string }[] = [
    { label: 'All Difficulties', value: 'all' },
    { label: '🟢 Easy', value: 'easy' },
    { label: '🟡 Medium', value: 'medium' },
    { label: '🔴 Hard', value: 'hard' },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Difficulty Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-400 mr-1">Difficulty:</span>
        {difficulties.map((diff) => {
          const isSelected = selectedDifficulty === diff.value;
          return (
            <button
              key={diff.value}
              type="button"
              onClick={() => onSelectDifficulty(diff.value)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150',
                isSelected
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
              )}
            >
              {diff.label}
            </button>
          );
        })}
      </div>

      {/* Category Horizontal Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-xs font-medium text-slate-400 mr-1 shrink-0">Category:</span>
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={cn(
            'shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150',
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
          )}
        >
          All Categories
        </button>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={cn(
                'shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150',
                isSelected
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
