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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

      {/* Main Interactive Quiz Engine */}
      <QuizEngine quiz={quiz} />

      {/* Related Quizzes Section to Maximize Engagement and Page Depth */}
      <div className="max-w-4xl mx-auto">
        <RelatedQuizzes quizzes={relatedQuizzes} />
      </div>
    </div>
  );
}
