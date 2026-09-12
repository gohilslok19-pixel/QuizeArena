import Link from 'next/link';
import { Quiz } from '@/types/quiz';
import Card from '@/ui/Card';
import Badge from '@/ui/Badge';
import { Clock, HelpCircle, ArrowRight } from 'lucide-react';

interface RelatedQuizzesProps {
  quizzes: Quiz[];
  title?: string;
}

export default function RelatedQuizzes({
  quizzes,
  title = 'You Might Also Like',
}: RelatedQuizzesProps) {
  if (!quizzes || quizzes.length === 0) return null;

  return (
    <section className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <Link
          href="/quizzes"
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.slug}
            href={`/quiz/${quiz.slug}`}
            className="group block"
          >
            <Card hoverEffect className="h-full flex flex-col justify-between p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge difficulty={quiz.difficulty}>
                    {quiz.difficulty.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {quiz.estimatedTime}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {quiz.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {quiz.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                  {quiz.questions.length} Questions
                </span>
                <span className="font-semibold text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Play <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
