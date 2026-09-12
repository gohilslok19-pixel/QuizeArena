import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500">
                <span className="text-base">🧠</span>
              </div>
              <span className="text-lg font-bold text-white">
                AI Quiz <span className="text-purple-400">Arena</span>
              </span>
            </Link>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed">
              Challenge your brain with quick, fun, and competitive quizzes across
              science, technology, AI, geography, and sports. Designed for instant
              learning and zero-distraction play.
            </p>
            <p className="text-xs text-slate-500">
              Personal learning platform. Results stored privately in your browser.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/quizzes" className="hover:text-purple-300 transition-colors">
                  All Quizzes
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-purple-300 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/daily" className="hover:text-purple-300 transition-colors">
                  Daily Challenge
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-purple-300 transition-colors">
                  Personal Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-300 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-purple-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-purple-300 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-purple-300 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Fast, static-first web architecture &bull; Zero external cookies required
          </p>
        </div>
      </div>
    </footer>
  );
}
