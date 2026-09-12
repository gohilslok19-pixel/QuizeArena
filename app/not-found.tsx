import Link from 'next/link';
import Button from '@/ui/Button';
import { HelpCircle, Home, Play } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-950/40 text-purple-400 border border-purple-500/20 shadow-xl shadow-purple-900/20">
        <HelpCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Looks like this question doesn't exist!
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          The quiz or page you're searching for may have moved or doesn't exist.
          Choose a challenge below to get back in the arena!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/">
          <Button variant="secondary" size="md" className="gap-2">
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </Button>
        </Link>
        <Link href="/quizzes">
          <Button variant="primary" size="md" className="gap-2">
            <Play className="w-4 h-4 fill-current" />
            <span>Play a Quiz</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
