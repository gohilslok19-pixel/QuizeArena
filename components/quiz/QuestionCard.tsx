'use client';

import { Question } from '@/types/quiz';
import OptionButton from './OptionButton';
import Button from '@/ui/Button';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  isLastQuestion,
}: QuestionCardProps) {
  const isRevealed = selectedOption !== null;

  return (
    <div className="w-full space-y-6">
      {/* Question Text */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-white">
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = isRevealed ? idx === question.correctAnswer : null;

          return (
            <OptionButton
              key={idx}
              index={idx}
              text={opt}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isRevealed={isRevealed}
              disabled={isRevealed}
              onClick={() => onSelectOption(idx)}
            />
          );
        })}
      </div>

      {/* Instant Explanation and Next Button */}
      {isRevealed && (
        <div className="animate-slide-up space-y-4 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 sm:p-6 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-600/30 text-purple-400 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Explanation
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={onNext}
              className="w-full sm:w-auto"
            >
              <span>{isLastQuestion ? 'See Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcut Hint for Desktop */}
      {!isRevealed && (
        <p className="hidden sm:block text-center text-xs text-slate-500">
          Tip: You can use keyboard keys <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">A</kbd>-<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">1</kbd>-<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">4</kbd> to answer.
        </p>
      )}
    </div>
  );
}
