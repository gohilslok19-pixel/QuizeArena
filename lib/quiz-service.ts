import { Quiz, CategoryInfo, Difficulty } from '@/types/quiz';
import { CATEGORIES } from '@/data/categories';

// Import all 20 static quiz JSON files
import generalKnowledgeChallenge from '@/data/quizzes/general-knowledge-challenge.json';
import worldKnowledgeQuiz from '@/data/quizzes/world-knowledge-quiz.json';
import basicScienceQuiz from '@/data/quizzes/basic-science-quiz.json';
import physicsChallenge from '@/data/quizzes/physics-challenge.json';
import technologyBasics from '@/data/quizzes/technology-basics.json';
import internetTechnologyQuiz from '@/data/quizzes/internet-technology-quiz.json';
import computerScienceBasics from '@/data/quizzes/computer-science-basics.json';
import programmingFundamentals from '@/data/quizzes/programming-fundamentals.json';
import artificialIntelligenceBasics from '@/data/quizzes/artificial-intelligence-basics.json';
import machineLearningFundamentals from '@/data/quizzes/machine-learning-fundamentals.json';
import spaceChallenge from '@/data/quizzes/space-challenge.json';
import solarSystemQuiz from '@/data/quizzes/solar-system-quiz.json';
import worldGeography from '@/data/quizzes/world-geography.json';
import countriesAndCapitals from '@/data/quizzes/countries-and-capitals.json';
import indiaGeneralKnowledge from '@/data/quizzes/india-general-knowledge.json';
import indianGeography from '@/data/quizzes/indian-geography.json';
import quickMathChallenge from '@/data/quizzes/quick-math-challenge.json';
import mathematicsBasics from '@/data/quizzes/mathematics-basics.json';
import worldHistoryFacts from '@/data/quizzes/world-history-facts.json';
import sportsTriviaChampionship from '@/data/quizzes/sports-trivia-championship.json';

const ALL_QUIZZES: Quiz[] = [
  generalKnowledgeChallenge as Quiz,
  worldKnowledgeQuiz as Quiz,
  basicScienceQuiz as Quiz,
  physicsChallenge as Quiz,
  technologyBasics as Quiz,
  internetTechnologyQuiz as Quiz,
  computerScienceBasics as Quiz,
  programmingFundamentals as Quiz,
  artificialIntelligenceBasics as Quiz,
  machineLearningFundamentals as Quiz,
  spaceChallenge as Quiz,
  solarSystemQuiz as Quiz,
  worldGeography as Quiz,
  countriesAndCapitals as Quiz,
  indiaGeneralKnowledge as Quiz,
  indianGeography as Quiz,
  quickMathChallenge as Quiz,
  mathematicsBasics as Quiz,
  worldHistoryFacts as Quiz,
  sportsTriviaChampionship as Quiz,
];

export function getAllQuizzes(): Quiz[] {
  return ALL_QUIZZES;
}

export function getQuizBySlug(slug: string): Quiz | undefined {
  return ALL_QUIZZES.find((quiz) => quiz.slug === slug);
}

export function getQuizzesByCategory(categorySlug: string): Quiz[] {
  return ALL_QUIZZES.filter((quiz) => quiz.categorySlug === categorySlug);
}

export function getFeaturedQuizzes(): Quiz[] {
  return ALL_QUIZZES.filter((quiz) => quiz.featured);
}

export function getPopularQuizzes(): Quiz[] {
  return ALL_QUIZZES.filter((quiz) => quiz.popular);
}

export function getRelatedQuizzes(currentQuiz: Quiz, limit = 4): Quiz[] {
  // First prioritize same category quizzes, excluding current
  const sameCategory = ALL_QUIZZES.filter(
    (q) => q.categorySlug === currentQuiz.categorySlug && q.slug !== currentQuiz.slug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fallback to other popular quizzes to fill up to limit
  const others = ALL_QUIZZES.filter(
    (q) => q.categorySlug !== currentQuiz.categorySlug && q.slug !== currentQuiz.slug
  );

  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Deterministic Daily Challenge logic:
 * Day-of-year mod totalQuizzes guarantees every user worldwide
 * sees the exact same daily challenge quiz on any given date.
 */
export function getDailyQuiz(referenceDate: Date = new Date()): Quiz {
  const startOfYear = new Date(referenceDate.getFullYear(), 0, 0);
  const diff = referenceDate.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = Math.abs(dayOfYear) % ALL_QUIZZES.length;
  return ALL_QUIZZES[index];
}

export function getCategoriesWithCounts(): CategoryInfo[] {
  return CATEGORIES.map((cat) => {
    const count = ALL_QUIZZES.filter((q) => q.categorySlug === cat.slug).length;
    return {
      ...cat,
      quizCount: count,
    };
  });
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return undefined;
  const count = ALL_QUIZZES.filter((q) => q.categorySlug === cat.slug).length;
  return {
    ...cat,
    quizCount: count,
  };
}

export function searchQuizzes(
  query: string,
  categoryFilter = 'all',
  difficultyFilter = 'all'
): Quiz[] {
  const normalizedQuery = query.toLowerCase().trim();

  return ALL_QUIZZES.filter((quiz) => {
    // Filter by Category
    if (categoryFilter !== 'all' && quiz.categorySlug !== categoryFilter) {
      return false;
    }

    // Filter by Difficulty
    if (difficultyFilter !== 'all' && quiz.difficulty !== difficultyFilter) {
      return false;
    }

    // Filter by Query
    if (!normalizedQuery) return true;

    const matchesTitle = quiz.title.toLowerCase().includes(normalizedQuery);
    const matchesDescription = quiz.description.toLowerCase().includes(normalizedQuery);
    const matchesCategory = quiz.category.toLowerCase().includes(normalizedQuery);
    const matchesKeywords = quiz.keywords.some((k) =>
      k.toLowerCase().includes(normalizedQuery)
    );

    return matchesTitle || matchesDescription || matchesCategory || matchesKeywords;
  });
}
