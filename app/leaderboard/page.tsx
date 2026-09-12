'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getLeaderboard,
  getUserStats,
} from '@/lib/storage';
import { LeaderboardEntry, UserStats } from '@/types/quiz';
import Card from '@/ui/Card';
import Button from '@/ui/Button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdSlot from '@/components/ads/AdSlot';
import { formatDate } from '@/lib/utils';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Percent,
  Play,
  RotateCcw,
  Trash2,
} from 'lucide-react';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setLeaderboard(getLeaderboard());
    setStats(getUserStats());
  }, []);

  const handleClearHistory = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your personal scores and streak? This action cannot be undone.'
      )
    ) {
      window.localStorage.removeItem('ai_quiz_arena_attempts');
      window.localStorage.removeItem('ai_quiz_arena_leaderboard');
      window.localStorage.removeItem('ai_quiz_arena_stats');
      setLeaderboard([]);
      setStats({
        quizzesCompleted: 0,
        bestScore: 0,
        averageScore: 0,
        currentStreak: 0,
        lastStreakDate: '',
      });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Personal Leaderboard' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Best Scores
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Your personal leaderboard, attempts, and daily streak stored privately on this device.
          </p>
        </div>

        {isClient && leaderboard.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Personal Data</span>
          </button>
        )}
      </div>

      {/* Stats Summary Cards */}
      {isClient && stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {stats.quizzesCompleted}
              </div>
              <div className="text-xs text-slate-400">Quizzes Completed</div>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {stats.bestScore}%
              </div>
              <div className="text-xs text-slate-400">Best Score</div>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {stats.averageScore}%
              </div>
              <div className="text-xs text-slate-400">Average Score</div>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Flame className="w-5 h-5 fill-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-orange-400">
                {stats.currentStreak} Days
              </div>
              <div className="text-xs text-slate-400">Current Streak</div>
            </div>
          </Card>
        </div>
      )}

      {/* Leaderboard Table / Cards */}
      {isClient && leaderboard.length > 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Quiz</th>
                  <th className="px-6 py-4">Best Score</th>
                  <th className="px-6 py-4">Accuracy</th>
                  <th className="px-6 py-4">Attempts</th>
                  <th className="px-6 py-4">Last Played</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leaderboard.map((item) => (
                  <tr key={item.quizSlug} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      <Link
                        href={`/quiz/${item.quizSlug}`}
                        className="hover:text-purple-300 transition-colors"
                      >
                        {item.quizTitle}
                      </Link>
                      <div className="text-xs font-normal text-slate-400">
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-white">
                        {item.bestScore}
                      </span>{' '}
                      / {item.totalQuestions}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.bestPercentage >= 80
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : item.bestPercentage >= 50
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.bestPercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {item.attempts} {item.attempts === 1 ? 'play' : 'plays'}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {formatDate(item.lastPlayedDate)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/quiz/${item.quizSlug}`}>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry</span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-950/40 text-purple-400 border border-purple-500/20">
            <Trophy className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">No Quizzes Completed Yet</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Take your first 10-question challenge today. Your personal records,
            streaks, and high scores will appear here.
          </p>
          <Link href="/quizzes">
            <Button variant="primary" size="md" className="gap-2">
              <Play className="w-4 h-4 fill-current" />
              <span>Explore Quizzes</span>
            </Button>
          </Link>
        </div>
      )}

      <AdSlot type="inContent" />
    </div>
  );
}
