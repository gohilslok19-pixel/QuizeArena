export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  difficulty: Difficulty;
  estimatedTime: string;
  questions: Question[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color?: string;
  quizCount?: number;
}

export interface QuizAttempt {
  quizId: string;
  quizSlug: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface LeaderboardEntry {
  quizSlug: string;
  quizTitle: string;
  category: string;
  bestScore: number;
  totalQuestions: number;
  bestPercentage: number;
  attempts: number;
  lastPlayedDate: string;
}

export interface UserStats {
  quizzesCompleted: number;
  bestScore: number;
  averageScore: number;
  currentStreak: number;
  lastStreakDate: string;
}
