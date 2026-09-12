import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getCategoryBySlug,
  getQuizzesByCategory,
  getCategoriesWithCounts,
} from '@/lib/quiz-service';
import Card from '@/ui/Card';
import Badge from '@/ui/Badge';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdSlot from '@/components/ads/AdSlot';
import { Clock, HelpCircle, ArrowRight, Brain } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = getCategoriesWithCounts();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Quizzes – Test Your Knowledge`,
    description: `Explore free 10-question quizzes in ${category.name}. ${category.description}`,
    openGraph: {
      title: `${category.name} Quizzes – AI Quiz Arena`,
      description: category.description,
      url: `${siteConfig.url}/category/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const quizzes = getQuizzesByCategory(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Category Header */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-slate-900 to-slate-950 p-6 sm:p-10 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
              <Brain className="w-4 h-4" />
              <span>Category</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center">
            <div className="text-2xl font-black text-purple-400">
              {quizzes.length}
            </div>
            <div className="text-xs text-slate-400">
              {quizzes.length === 1 ? 'Available Quiz' : 'Available Quizzes'}
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Available {category.name} Quizzes
          </h2>
        </div>

        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.slug}
                href={`/quiz/${quiz.slug}`}
                className="group block"
              >
                <Card hoverEffect className="h-full flex flex-col justify-between p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge difficulty={quiz.difficulty}>
                        {quiz.difficulty.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {quiz.estimatedTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
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
                      Play Quiz <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-3">
            <p className="text-sm text-slate-400">
              New quizzes are continually being added to this category.
            </p>
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Browse All Available Quizzes &rarr;
            </Link>
          </div>
        )}
      </div>

      <AdSlot type="inContent" />
    </div>
  );
}
