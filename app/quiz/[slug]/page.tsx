import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllQuizzes,
  getQuizBySlug,
  getRelatedQuizzes,
} from '@/lib/quiz-service';
import QuizEngine from '@/components/quiz/QuizEngine';
import RelatedQuizzes from '@/components/quiz/RelatedQuizzes';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Badge from '@/ui/Badge';
import { siteConfig } from '@/config/site';

interface QuizPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((q) => ({
    slug: q.slug,
  }));
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const quiz = getQuizBySlug(params.slug);
  if (!quiz) return { title: 'Quiz Not Found' };

  const canonicalUrl = `${siteConfig.url}/quiz/${quiz.slug}`;

  return {
    title: quiz.seoTitle,
    description: quiz.seoDescription,
    keywords: quiz.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${quiz.title} – AI Quiz Arena`,
      description: quiz.description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${quiz.title} – AI Quiz Arena`,
      description: quiz.description,
    },
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const quiz = getQuizBySlug(params.slug);
  if (!quiz) {
    notFound();
  }

  const relatedQuizzes = getRelatedQuizzes(quiz, 3);

  // Schema.org Quiz structured data for SEO rich snippets
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: quiz.title,
    description: quiz.description,
    educationalLevel: quiz.difficulty,
    hasPart: quiz.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      suggestedAnswer: q.options.map((opt, i) => ({
        '@type': 'Answer',
        text: opt,
        position: i + 1,
      })),
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.options[q.correctAnswer],
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Quizzes', href: '/quizzes' },
          { label: quiz.category, href: `/category/${quiz.categorySlug}` },
          { label: quiz.title },
        ]}
      />

      {/* Static SEO Introduction Block: Indexable text for Google AdSense and search bots */}
      <header className="mx-auto max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge difficulty={quiz.difficulty}>
            {quiz.difficulty.toUpperCase()}
          </Badge>
          <span className="rounded-full bg-purple-950/60 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300">
            {quiz.category}
          </span>
          <span className="text-xs text-slate-400">
            &bull; {quiz.questions.length} Questions &bull; {quiz.estimatedTime}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {quiz.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {quiz.introText}
        </p>
      </header>

      {/* Main Interactive Quiz Engine */}
      <QuizEngine quiz={quiz} />

      {/* Educational Indexable Overview for Search Bots & AdSense Verification */}
      <section className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-4 backdrop-blur-sm">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          About the {quiz.title} Challenge
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {quiz.description} Every question in this challenge has been vetted to test real conceptual understanding rather than simple memorization. With instant explanations for each answer, you can quickly spot knowledge gaps and master the material.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {quiz.keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-400 border border-slate-700/50"
            >
              #{kw}
            </span>
          ))}
        </div>
      </section>

      {/* Related Quizzes Section to Maximize Engagement and Page Depth */}
      <div className="max-w-4xl mx-auto">
        <RelatedQuizzes quizzes={relatedQuizzes} />
      </div>
    </div>
  );
}
