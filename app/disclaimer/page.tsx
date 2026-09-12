import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Card from '@/ui/Card';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: `Disclaimer of liability and content accuracy for ${siteConfig.name}.`,
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Disclaimer' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Disclaimer
        </h1>
        <p className="text-xs text-slate-400">Last updated: January 2026</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. General Information</h2>
          <p>
            The information and questions provided on {siteConfig.name} ({siteConfig.url})
            are for general educational and entertainment purposes only. All
            information on the site is provided in good faith; however, we make no
            representation or warranty of any kind, express or implied, regarding
            the completeness, validity, reliability, or accuracy of any information
            on the site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. External Links</h2>
          <p>
            The site may contain links to other websites or third-party content. Such
            external links are not investigated, monitored, or checked for accuracy
            by us, and we do not warrant or assume responsibility for any
            third-party sites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Personal Entertainment Scores</h2>
          <p>
            Quiz scores, accuracy percentages, and streaks calculated on{' '}
            {siteConfig.name} are for self-improvement and personal enjoyment. They
            do not constitute official certifications, standardized test results,
            or formal academic assessments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Question Corrections</h2>
          <p>
            If you believe any question contains an error or ambiguity, please submit
            a note via our{' '}
            <a href="/contact" className="text-purple-400 underline">
              Contact Page
            </a>
            . We regularly review and refine questions based on user feedback.
          </p>
        </section>
      </Card>
    </div>
  );
}
