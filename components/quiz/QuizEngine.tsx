'use client';

import { useState, useEffect, useCallback } from 'react';
import { Quiz } from '@/types/quiz';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import Badge from '@/ui/Badge';
import Button from '@/ui/Button';
import AdSlot from '@/components/ads/AdSlot';
import {
  saveQuizResult,
  getPersonalBestForQuiz,
} from '@/lib/storage';
import { trackEvent } from '@/lib/analytics';
import { Play, Clock, HelpCircle, Trophy } from 'lucide-react';

interface QuizEngineProps {
  quiz: Quiz;
}

type QuizState = 'intro' | 'playing' | 'completed';

export default function QuizEngine({ quiz }: QuizEngineProps) {
  const [gameState, setGameState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [isNewPersonalBest, setIsNewPersonalBest] = useState(false);
  const [streak, setStreak] = useState(0);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Load existing personal best on mount
  useEffect(() => {
    const existing = getPersonalBestForQuiz(quiz.slug);
    if (existing) {
      setPersonalBest(existing.bestScore);
    }
  }, [quiz.slug]);

  // Handle Start Quiz
  const handleStartQuiz = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsNewPersonalBest(false);
    trackEvent('quiz_started', {
      quiz_slug: quiz.slug,
      quiz_title: quiz.title,
      category: quiz.category,
    });
  };

  // Handle Option Select
  const handleSelectOption = useCallback(
    (index: number) => {
      if (selectedOption !== null || !currentQuestion) return; // Already picked

      setSelectedOption(index);
      const isCorrect = index === currentQuestion.correctAnswer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      trackEvent('question_answered', {
        quiz_slug: quiz.slug,
        question_index: currentQuestionIndex,
        is_correct: isCorrect,
      });
    },
    [selectedOption, currentQuestion, quiz.slug, currentQuestionIndex]
  );

  // Handle Next Question or Finish
  const handleNextQuestion = useCallback(() => {
    if (isLastQuestion) {
      // Complete quiz
      const finalScore = score;
      const percentage = Math.round((finalScore / totalQuestions) * 100);

      const result = saveQuizResult({
        quizId: quiz.id,
        quizSlug: quiz.slug,
        quizTitle: quiz.title,
        category: quiz.category,
        score: finalScore,
        totalQuestions,
        percentage,
      });

      setIsNewPersonalBest(result.isNewPersonalBest);
      setStreak(result.streak);
      setGameState('completed');

      trackEvent('quiz_completed', {
        quiz_slug: quiz.slug,
        score: finalScore,
        total: totalQuestions,
        percentage,
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  }, [isLastQuestion, score, totalQuestions, quiz]);

  // Keyboard navigation support
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If user hasn't selected an option yet: allow keys 1-4 and A-D
      if (selectedOption === null) {
        const key = e.key.toLowerCase();
        if (key === '1' || key === 'a') handleSelectOption(0);
        else if (key === '2' || key === 'b') handleSelectOption(1);
        else if (key === '3' || key === 'c') handleSelectOption(2);
        else if (key === '4' || key === 'd') handleSelectOption(3);
      } else {
        // If option is selected, pressing Enter or Space advances
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedOption, handleSelectOption, handleNextQuestion]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top Banner Ad Slot - safe and reserved */}
      <AdSlot type="quizTop" />

      {/* INTRO SCREEN */}
      {gameState === 'intro' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge difficulty={quiz.difficulty}>
              {quiz.difficulty.toUpperCase()}
            </Badge>
            <Badge variant="category">{quiz.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {quiz.estimatedTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {quiz.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {quiz.description}
          </p>

          {personalBest !== null && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/30 px-4 py-2 text-xs font-semibold text-purple-300">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>
                Your Personal Best: {personalBest} / {totalQuestions}
              </span>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-8 gap-2.5 text-base"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Start Quiz</span>
            </Button>
          </div>

          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4 max-w-xs mx-auto text-xs text-slate-400">
            <div className="flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>{totalQuestions} Questions</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Instant Answers</span>
            </div>
          </div>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && currentQuestion && (
        <div className="space-y-6">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
          />

          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
            isLastQuestion={isLastQuestion}
          />
        </div>
      )}

      {/* COMPLETED SCREEN */}
      {gameState === 'completed' && (
        <ResultCard
          quizTitle={quiz.title}
          quizSlug={quiz.slug}
          score={score}
          totalQuestions={totalQuestions}
          isNewPersonalBest={isNewPersonalBest}
          streak={streak}
          onRestart={handleStartQuiz}
        />
      )}
    </div>
  );
}
