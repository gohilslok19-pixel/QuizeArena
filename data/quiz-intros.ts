import { Quiz } from '@/types/quiz';

/**
 * 2-Sentence Static Introductions for every Quiz.
 * Designed to provide rich indexable text for Google AdSense review crawlers and SEO bots
 * so quiz pages are never flagged as "empty" or "no content".
 */
export const QUIZ_INTROS: Record<string, string> = {
  'programming-fundamentals':
    'Welcome to the Programming Fundamentals Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of loops, variables, and clean coding concepts.',

  'computer-science-basics':
    'Welcome to the Computer Science Basics Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of data structures, binary logic, algorithms, and computational thinking.',

  'technology-basics':
    'Welcome to the Technology Basics Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of computer architecture, operating systems, hardware components, and essential digital technology.',

  'internet-technology-quiz':
    'Welcome to the Internet Technology Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of networking protocols, DNS routing, client-server models, and cybersecurity essentials.',

  'artificial-intelligence-basics':
    'Welcome to the Artificial Intelligence Basics Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of neural networks, natural language processing, computer vision, and machine ethics.',

  'machine-learning-fundamentals':
    'Welcome to the Machine Learning Fundamentals Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of supervised learning algorithms, loss functions, overfitting, and model evaluation metrics.',

  'basic-science-quiz':
    'Welcome to the Basic Science Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of foundational physics, chemistry principles, cellular biology, and the natural world.',

  'physics-challenge':
    'Welcome to the Physics Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of classical mechanics, thermodynamics, electromagnetism, and fundamental laws of motion.',

  'space-challenge':
    'Welcome to the Space Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of astrophysics, black holes, galactic structures, and deep-space exploration missions.',

  'solar-system-quiz':
    'Welcome to the Solar System Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of planetary orbits, moons, asteroids, and celestial bodies orbiting our Sun.',

  'general-knowledge-challenge':
    'Welcome to the General Knowledge Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of world trivia, historical breakthroughs, arts, and foundational scientific facts.',

  'world-knowledge-quiz':
    'Welcome to the World Knowledge Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of iconic global landmarks, international history, and remarkable human achievements.',

  'world-geography':
    'Welcome to the World Geography Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of continental landforms, major waterways, global climate zones, and international borders.',

  'countries-and-capitals':
    'Welcome to the Countries and Capitals Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of sovereign nation capitals, geopolitical territories, and world geography.',

  'india-general-knowledge':
    'Welcome to the India General Knowledge Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of Indian history, constitutional landmarks, cultural heritage, and national symbols.',

  'indian-geography':
    'Welcome to the Indian Geography Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of India\'s river systems, physiographic regions, mountain passes, and climate patterns.',

  'quick-math-challenge':
    'Welcome to the Quick Math Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of rapid mental arithmetic, numerical shortcuts, and quantitative problem-solving.',

  'mathematics-basics':
    'Welcome to the Mathematics Basics Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of foundational algebra, geometry principles, percentages, and fractions.',

  'world-history-facts':
    'Welcome to the World History Facts Challenge. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of ancient civilizations, monumental treaties, and transformative world events.',

  'sports-trivia-championship':
    'Welcome to the Sports Trivia Championship. This curated quiz features 10 verified multiple-choice questions designed to evaluate your understanding of championship athletics, Olympic history, world records, and legendary sports heroes.',
};

/**
 * Returns the 2-sentence static introduction for a quiz, falling back to a structured template
 * if a specific slug is not in the dictionary.
 */
export function getQuizIntroText(quiz: Quiz): string {
  if (QUIZ_INTROS[quiz.slug]) {
    return QUIZ_INTROS[quiz.slug];
  }
  const cleanDescription = quiz.description
    ? quiz.description.replace(/\.$/, '')
    : `core concepts in ${quiz.category}`;
  return `Welcome to the ${quiz.title} Challenge. This curated quiz features ${quiz.questions.length} verified multiple-choice questions designed to evaluate your understanding of ${cleanDescription.toLowerCase()}.`;
}
