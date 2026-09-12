import { QuizAttempt, LeaderboardEntry, UserStats } from '@/types/quiz';

const STORAGE_KEYS = {
  ATTEMPTS: 'ai_quiz_arena_attempts',
  LEADERBOARD: 'ai_quiz_arena_leaderboard',
  STATS: 'ai_quiz_arena_stats',
};

function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function saveQuizResult(
  attempt: Omit<QuizAttempt, 'completedAt'>
): { isNewPersonalBest: boolean; streak: number } {
  if (!isStorageAvailable()) {
    return { isNewPersonalBest: false, streak: 0 };
  }

  const now = new Date();
  const completedAt = now.toISOString();
  const todayDateStr = now.toISOString().split('T')[0];

  const fullAttempt: QuizAttempt = {
    ...attempt,
    completedAt,
  };

  try {
    // 1. Save to attempts history
    const existingAttemptsJson = window.localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    const existingAttempts: QuizAttempt[] = existingAttemptsJson
      ? JSON.parse(existingAttemptsJson)
      : [];
    existingAttempts.unshift(fullAttempt);
    // Keep max 50 recent attempts
    if (existingAttempts.length > 50) {
      existingAttempts.length = 50;
    }
    window.localStorage.setItem(
      STORAGE_KEYS.ATTEMPTS,
      JSON.stringify(existingAttempts)
    );

    // 2. Update Leaderboard (personal bests per quiz)
    const existingLeaderboardJson = window.localStorage.getItem(
      STORAGE_KEYS.LEADERBOARD
    );
    const leaderboard: Record<string, LeaderboardEntry> = existingLeaderboardJson
      ? JSON.parse(existingLeaderboardJson)
      : {};

    const previousEntry = leaderboard[attempt.quizSlug];
    let isNewPersonalBest = false;

    if (!previousEntry) {
      isNewPersonalBest = true;
      leaderboard[attempt.quizSlug] = {
        quizSlug: attempt.quizSlug,
        quizTitle: attempt.quizTitle,
        category: attempt.category,
        bestScore: attempt.score,
        totalQuestions: attempt.totalQuestions,
        bestPercentage: attempt.percentage,
        attempts: 1,
        lastPlayedDate: completedAt,
      };
    } else {
      const attemptsCount = previousEntry.attempts + 1;
      if (attempt.percentage > previousEntry.bestPercentage) {
        isNewPersonalBest = true;
      }
      leaderboard[attempt.quizSlug] = {
        ...previousEntry,
        bestScore: Math.max(previousEntry.bestScore, attempt.score),
        bestPercentage: Math.max(previousEntry.bestPercentage, attempt.percentage),
        attempts: attemptsCount,
        lastPlayedDate: completedAt,
      };
    }
    window.localStorage.setItem(
      STORAGE_KEYS.LEADERBOARD,
      JSON.stringify(leaderboard)
    );

    // 3. Update Overall Stats and Streak
    const existingStatsJson = window.localStorage.getItem(STORAGE_KEYS.STATS);
    const currentStats: UserStats = existingStatsJson
      ? JSON.parse(existingStatsJson)
      : {
          quizzesCompleted: 0,
          bestScore: 0,
          averageScore: 0,
          currentStreak: 0,
          lastStreakDate: '',
        };

    // Calculate streak: consecutive calendar days
    let newStreak = currentStats.currentStreak;
    if (!currentStats.lastStreakDate) {
      newStreak = 1;
    } else if (currentStats.lastStreakDate === todayDateStr) {
      // Already completed a quiz today, streak stays the same
      newStreak = currentStats.currentStreak;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDateStr = yesterday.toISOString().split('T')[0];

      if (currentStats.lastStreakDate === yesterdayDateStr) {
        newStreak = currentStats.currentStreak + 1;
      } else {
        // Streak broken
        newStreak = 1;
      }
    }

    const updatedQuizzesCompleted = currentStats.quizzesCompleted + 1;
    const previousTotalSum =
      currentStats.averageScore * currentStats.quizzesCompleted;
    const newAverage = Math.round(
      (previousTotalSum + attempt.percentage) / updatedQuizzesCompleted
    );

    const updatedStats: UserStats = {
      quizzesCompleted: updatedQuizzesCompleted,
      bestScore: Math.max(currentStats.bestScore, attempt.percentage),
      averageScore: newAverage,
      currentStreak: newStreak,
      lastStreakDate: todayDateStr,
    };

    window.localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));

    return { isNewPersonalBest, streak: newStreak };
  } catch (err) {
    console.warn('Could not save quiz attempt to localStorage:', err);
    return { isNewPersonalBest: false, streak: 0 };
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (!isStorageAvailable()) return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!data) return [];
    const record: Record<string, LeaderboardEntry> = JSON.parse(data);
    return Object.values(record).sort(
      (a, b) => b.bestPercentage - a.bestPercentage
    );
  } catch {
    return [];
  }
}

export function getUserStats(): UserStats {
  const defaultStats: UserStats = {
    quizzesCompleted: 0,
    bestScore: 0,
    averageScore: 0,
    currentStreak: 0,
    lastStreakDate: '',
  };

  if (!isStorageAvailable()) return defaultStats;
  try {
    const data = window.localStorage.getItem(STORAGE_KEYS.STATS);
    if (!data) return defaultStats;
    return JSON.parse(data);
  } catch {
    return defaultStats;
  }
}

export function getRecentAttempts(): QuizAttempt[] {
  if (!isStorageAvailable()) return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getPersonalBestForQuiz(quizSlug: string): LeaderboardEntry | null {
  if (!isStorageAvailable()) return null;
  try {
    const data = window.localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!data) return null;
    const record: Record<string, LeaderboardEntry> = JSON.parse(data);
    return record[quizSlug] || null;
  } catch {
    return null;
  }
}
