import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Card from '@/ui/Card';
import { siteConfig } from '@/config/site';
import { Brain, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About AI Quiz Arena – Fast, Educational Quizzes',
  description:
    'Learn about AI Quiz Arena, our mission to deliver fast, engaging, and privacy-respecting educational quizzes across multiple subjects.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About {siteConfig.name}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {siteConfig.tagline}
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p>
            AI Quiz Arena was built with a simple conviction: learning should be
            fast, frictionless, and enjoyable. Too many online trivia websites
            are bogged down by forced account registrations, intrusive popups,
            and sluggish interfaces.
          </p>
          <p>
            We designed AI Quiz Arena from the ground up as a static-first,
            mobile-optimized platform. You open a quiz, answer 10 curated
            questions, receive immediate explanations for every answer, and view
            your score in under 3 minutes.
          </p>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Instant Feedback</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every question includes a concise, factual explanation so you learn
              the underlying concept right away—not just whether you were right or
              wrong.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Privacy First</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No passwords, no profile setup, and no database tracking. Your scores,
              attempts, and daily streaks remain private on your device in local storage.
            </p>
          </Card>
        </div>

        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">Curated Content Quality</h2>
          <p>
            All questions across our 12 subject areas are carefully vetted for
            factual precision and clarity. Whether you're refreshing your knowledge of
            artificial intelligence architectures, reviewing classical mechanics, or
            exploring world capitals, every quiz is engineered for high educational
            value.
          </p>
        </Card>
      </div>
    </div>
  );
}
