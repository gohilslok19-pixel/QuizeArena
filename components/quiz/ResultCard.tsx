'use client';

import Link from 'next/link';
import { RotateCcw, Compass, ArrowRight, Trophy, Flame } from 'lucide-react';
import Button from '@/ui/Button';
import ShareButton from './ShareButton';
import AdSlot from '@/components/ads/AdSlot';

interface ResultCardProps {
  quizTitle: string;
  quizSlug: string;
  score: number;
  totalQuestions: number;
  isNewPersonalBest: boolean;
  streak: number;
  onRestart: () => void;
}

export default function ResultCard({
  quizTitle,
  quizSlug,
  score,
  totalQuestions,
  isNewPersonalBest,
  streak,
  onRestart,
}: ResultCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const incorrect = totalQuestions - score;

  // Tiered performance messaging
  let performanceTitle = '💪 Keep Practicing!';
  let performanceDesc = 'Every mistake is a chance to learn. Review the explanations and give it another shot!';
  let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';

  if (percentage >= 90) {
    performanceTitle = '🔥 Brain Master!';
    performanceDesc = 'Incredible accuracy! You have exceptional mastery in this subject.';
    badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  } else if (percentage >= 70) {
    performanceTitle = '🧠 Great Job!';
    performanceDesc = 'Well done! You demonstrated solid knowledge and quick problem solving.';
    badgeColor = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
  } else if (percentage >= 50) {
    performanceTitle = '👍 Good Attempt!';
    performanceDesc = 'Solid baseline knowledge! A quick replay could push you over 80%.';
    badgeColor = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
  }

  return (
    <div className="w-full space-y-8">
      {/* Result Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-b from-slate-900 via-slate-900/90 to-purple-950/30 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-md">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />

        {/* Badges for Best & Streak */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {isNewPersonalBest && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 animate-bounce">
              <Trophy className="w-3.5 h-3.5" />
              New Personal Best!
            </span>
          )}
          {streak > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-xs font-semibold text-orange-300">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              {streak} Day Streak!
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          🎉 Quiz Complete!
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          You finished <span className="text-slate-200 font-medium">{quizTitle}</span>
        </p>

        {/* Score Circle / Big Display */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              {score}
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-slate-400">
              / {totalQuestions}
            </span>
          </div>
          <div className="mt-2 text-xl font-bold text-purple-400">
            {percentage}%
          </div>
        </div>

        {/* Performance Feedback */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 max-w-md mx-auto">
          <div className="text-lg font-bold text-white mb-1">
            {performanceTitle}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {performanceDesc}
          </p>
        </div>

        {/* Correct / Incorrect Summary Breakdown */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
            <div className="text-xs font-medium text-emerald-400">Correct</div>
            <div className="text-2xl font-bold text-emerald-300">{score}</div>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3">
            <div className="text-xs font-medium text-rose-400">Incorrect</div>
            <div className="text-2xl font-bold text-rose-300">{incorrect}</div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="md" onClick={onRestart}>
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </Button>

          <ShareButton
            quizTitle={quizTitle}
            quizSlug={quizSlug}
            score={score}
            total={totalQuestions}
          />

          <Link href="/quizzes">
            <Button variant="secondary" size="md">
              <span>Try Another Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Ad slot below result */}
      <AdSlot type="resultBottom" />
    </div>
  );
}
