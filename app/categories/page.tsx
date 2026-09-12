import { Metadata } from 'next';
import Link from 'next/link';
import { getCategoriesWithCounts } from '@/lib/quiz-service';
import Card from '@/ui/Card';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdSlot from '@/components/ads/AdSlot';
import { Brain, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quiz Categories – Explore All Topics',
  description:
    'Browse online quizzes by category: Technology, Computer Science, AI, General Knowledge, Geography, Science, and Sports.',
};

export default function CategoriesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Quiz Categories
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Choose a subject that sparks your interest. Every category contains
          carefully curated 10-question challenges designed to test and expand
          your knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group block"
          >
            <Card hoverEffect className="h-full flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-950/40 border border-purple-500/20 group-hover:scale-105 transition-transform text-purple-400">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {cat.quizCount || 0} {cat.quizCount === 1 ? 'Quiz' : 'Quizzes'}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                <span>Browse Quizzes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <AdSlot type="inContent" />
    </div>
  );
}
