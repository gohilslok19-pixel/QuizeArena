import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Card from '@/ui/Card';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.name}. Learn how we protect your privacy, handle browser storage, and work with advertising partners.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: January 2026</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Overview</h2>
          <p>
            Welcome to {siteConfig.name} ("we," "our," or "us"). We are committed
            to safeguarding your digital privacy. This policy outlines our
            practices concerning the collection, use, and disclosure of
            information when you access our website ({siteConfig.url}).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. No Account or Personal Data Harvesting</h2>
          <p>
            {siteConfig.name} operates on a static-first, registration-free model.
            We do not require you to create an account, register your email, or
            provide your name or financial credentials to play any of our quizzes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Local Device Storage (localStorage)</h2>
          <p>
            To enhance your gameplay experience, we utilize your web browser's
            native <code className="text-purple-300">localStorage</code>. This
            stores your personal best scores, attempts history, and daily challenge
            streaks directly on your device. This data is entirely client-side, is
            never transmitted to our servers, and can be cleared at any time via your
            browser settings or the reset button on our Leaderboard page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Advertising and Google AdSense</h2>
          <p>
            We may partner with third-party advertising vendors, including Google
            AdSense, to display ads on our website:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>
              Third-party vendors, including Google, use cookies to serve ads
              based on a user's prior visits to this website or other websites.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to
              serve ads to our users based on their visit to our sites and/or other
              sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline"
              >
                Google Ads Settings
              </a>{' '}
              or by visiting{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline"
              >
                www.aboutads.info
              </a>.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Web Analytics</h2>
          <p>
            We may use privacy-conscious analytics services (such as Google
            Analytics) to understand general aggregate trends, such as page views,
            popular quizzes, and bounce rates. These tools collect anonymous
            technical telemetry without associating it with identifiable personal
            records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">6. Children's Privacy</h2>
          <p>
            Our services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children. If
            you are a parent or guardian and believe your child has provided us with
            personal information, please contact us immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">7. Contact Information</h2>
          <p>
            For any questions regarding this Privacy Policy, please contact our team
            at{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-purple-400 underline"
            >
              {siteConfig.contactEmail}
            </a>.
          </p>
        </section>
      </Card>
    </div>
  );
}
