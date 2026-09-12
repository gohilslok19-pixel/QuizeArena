import Link from 'next/link';
import {
  getPopularQuizzes,
  getCategoriesWithCounts,
  getDailyQuiz,
} from '@/lib/quiz-service';
import Card from '@/ui/Card';
import Badge from '@/ui/Badge';
import Button from '@/ui/Button';
import AdSlot from '@/components/ads/AdSlot';
import {
  Play,
  Flame,
  Clock,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Trophy,
  Brain,
  Zap,
  Globe2,
} from 'lucide-react';

export default function HomePage() {
  const popularQuizzes = getPopularQuizzes().slice(0, 6);
  const categories = getCategoriesWithCounts().slice(0, 8);
  const dailyQuiz = getDailyQuiz();

  // FAQ Schema JSON-LD for rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are the quizzes on AI Quiz Arena completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, every quiz on AI Quiz Arena is 100% free to play. You do not need to register, subscribe, or create an account.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an account to track my quiz scores?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account is required. Your personal best scores, attempts, and daily streaks are automatically and privately stored right in your browser using localStorage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play AI Quiz Arena on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! AI Quiz Arena is designed mobile-first and works seamlessly on iOS and Android smartphones, tablets, and desktop computers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Daily Challenge work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each day, a new challenge is deterministically selected for all users worldwide. Test your knowledge once per day to build your consecutive daily streak.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I share my quiz scores with friends?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! After completing any quiz, click "Share My Score" to instantly share your score and challenge friends via WhatsApp, Twitter, or clipboard copy.',
        },
      },
    ],
  };

  return (
    <div className="w-full space-y-16 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-purple-600/15 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs font-semibold text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Fast &bull; Free &bull; No Login Required</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Test Your Brain.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                  Beat Your Score.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Quick, fun, and competitive quizzes across technology, artificial
                intelligence, science, space, geography, and sports.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/quizzes">
                  <Button variant="primary" size="lg" className="gap-2 px-6">
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play a Quiz</span>
                  </Button>
                </Link>

                <Link href="/daily">
                  <Button variant="secondary" size="lg" className="gap-2 px-6">
                    <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Daily Challenge</span>
                  </Button>
                </Link>

                <Link
                  href="/categories"
                  className="w-full sm:w-auto text-center text-sm font-semibold text-slate-400 hover:text-purple-300 transition-colors py-2"
                >
                  Explore Categories &rarr;
                </Link>
              </div>

              {/* Trust & Engagement micro-counters */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">20+</div>
                  <div className="text-xs text-slate-400">Curated Quizzes</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">200+</div>
                  <div className="text-xs text-slate-400">Verified Questions</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-400">0s</div>
                  <div className="text-xs text-slate-400">Signup Delay</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Mock Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-b from-slate-900 via-slate-900/90 to-purple-950/40 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        QUESTION 04 / 10
                      </span>
                    </div>
                    <Badge difficulty="easy">EASY</Badge>
                  </div>

                  {/* Question */}
                  <p className="text-base sm:text-lg font-semibold text-white mb-5 leading-snug">
                    Which planet is known as the Red Planet?
                  </p>

                  {/* Options List with active selection */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-400">
                      <span>A. Venus</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-emerald-500 bg-emerald-950/40 p-3 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-500/40">
                      <span>B. Mars</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-400">
                      <span>C. Jupiter</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-400">
                      <span>D. Saturn</span>
                    </div>
                  </div>

                  {/* Progress demo */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Progress</span>
                    <span className="font-semibold text-purple-400">40%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-[40%] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DAILY CHALLENGE SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-purple-950/30 p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                TODAY'S DAILY CHALLENGE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {dailyQuiz.title}
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Think you can beat today's score? 10 quick questions, instant
                results, and streak rewards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link href={`/quiz/${dailyQuiz.slug}`}>
                <Button variant="primary" size="lg" className="gap-2 px-7">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Challenge</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR QUIZZES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Popular Quizzes
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top trending brain challenges played this week
            </p>
          </div>
          <Link
            href="/quizzes"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
          >
            All Quizzes &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularQuizzes.map((quiz) => (
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
      </section>

      {/* AD SLOT BETWEEN MAJOR SECTIONS */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot type="homeTop" />
      </div>

      {/* 4. EXPLORE CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Quiz Categories
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore 12 diverse subjects tailored to your curiosity
            </p>
          </div>
          <Link
            href="/categories"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group block"
            >
              <Card hoverEffect className="p-5 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600/30 to-indigo-600/30 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {cat.quizCount || 0} Quizzes
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. SEO EXPLANATORY CONTENT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-12 space-y-8 backdrop-blur-sm">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What is AI Quiz Arena?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              AI Quiz Arena is a lightning-fast, privacy-first quiz platform
              crafted for lifelong learners, students, trivia enthusiasts, and tech
              professionals. Every quiz consists of exactly 10 hand-curated,
              factually verified questions that challenge your cognitive recall
              without intrusive sign-ups or ad walls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Instant Answers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive immediate feedback after every option selection, complete
                with clear conceptual explanations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Private Progress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your personal best scores, attempts, and streaks are securely saved
                in your browser with zero data harvesting.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Share & Challenge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Challenge colleagues and friends with one-click social share cards
                and challenge links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about playing on AI Quiz Arena
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Card className="p-5 space-y-2">
            <h3 className="text-base font-bold text-white">Are the quizzes free?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Yes, 100% free. You can play every single quiz on the site without
              paying anything or providing a credit card.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <h3 className="text-base font-bold text-white">Do I need an account to save scores?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No account or password required! Your scores and streaks are
              automatically remembered right on your device using localStorage.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <h3 className="text-base font-bold text-white">Can I replay quizzes?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Absolutely. You can replay any quiz as many times as you like to beat
              your personal best and master the subject matter.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <h3 className="text-base font-bold text-white">How is the Daily Challenge chosen?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The Daily Challenge is computed deterministically from our quiz library
              based on the calendar day, ensuring everyone around the world competes
              on the exact same topic on the same day.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
