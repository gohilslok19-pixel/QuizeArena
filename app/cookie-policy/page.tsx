import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Card from '@/ui/Card';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `Cookie policy and client storage disclosures for ${siteConfig.name}.`,
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cookie Policy' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: January 2026</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that websites store on your computer or
            mobile device when you visit them. They allow websites to recognize
            your browser and remember your preferences over time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. How We Use Browser Storage</h2>
          <p>
            {siteConfig.name} is designed with a lightweight, static architecture.
            We do not use proprietary tracking cookies to record your identity.
            Instead, we rely on modern browser{' '}
            <code className="text-purple-300">localStorage</code> to remember:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Your personal best scores on each quiz</li>
            <li>Your total number of completed quiz attempts</li>
            <li>Your active consecutive daily challenge streak</li>
          </ul>
          <p className="mt-2 text-xs text-slate-400">
            Unlike cookies, data in localStorage is never automatically sent with
            every HTTP request to a server, keeping your network traffic lean and
            private.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Third-Party Advertising Cookies</h2>
          <p>
            When Google AdSense is enabled, Google may place cookies on your browser
            to serve relevant advertisements based on visits to this and other web
            destinations. You can manage or disable advertising cookies at any time
            through{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline"
            >
              Google Ads Preferences
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Managing Cookies in Your Browser</h2>
          <p>
            Most modern web browsers allow you to control cookie settings through
            their preferences menu. You can choose to block all cookies, accept only
            first-party cookies, or clear all stored cookies and local data upon
            closing the browser.
          </p>
        </section>
      </Card>
    </div>
  );
}
