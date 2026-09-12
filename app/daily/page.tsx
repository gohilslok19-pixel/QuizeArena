import { Metadata } from 'next';
import { getDailyQuiz } from '@/lib/quiz-service';
import QuizEngine from '@/components/quiz/QuizEngine';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Flame, Calendar, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Today's Daily Challenge – Beat Today's Score",
  description:
    'Play today’s curated 10-question challenge. Test your speed and accuracy, build your daily streak, and beat your personal best.',
};

export default function DailyChallengePage() {
  const dailyQuiz = getDailyQuiz();
  const todayFormatted = formatDate(new Date().toISOString());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Daily Challenge' },
        ]}
      />

      {/* Daily Banner */}
      <div className="max-w-3xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-purple-950/30 p-6 sm:p-8 backdrop-blur-md text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-300">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>DAILY BRAIN CHALLENGE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Today's Challenge
        </h1>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{todayFormatted}</span>
          <span>&bull;</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Synchronized Worldwide</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Every day a new quiz is selected. Complete today's challenge to maintain
          your streak and test your trivia memory. Come back tomorrow for a new topic!
        </p>
      </div>

      {/* Embedded Quiz Engine */}
      <QuizEngine quiz={dailyQuiz} />
    </div>
  );
}
