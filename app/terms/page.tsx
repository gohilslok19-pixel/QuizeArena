import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Card from '@/ui/Card';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service and conditions for using ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Last updated: January 2026</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using {siteConfig.name} ({siteConfig.url}), you agree
            to be bound by these Terms of Service. If you do not agree to these
            terms, please refrain from using the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Educational & Entertainment Nature</h2>
          <p>
            The quiz questions, explanations, and scores provided on {siteConfig.name}{' '}
            are designed solely for educational, informational, and entertainment
            purposes. While we make every reasonable effort to verify the accuracy of
            our questions, we make no warranties regarding 100% error-free content.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
          <p>
            The website design, branding, custom code, and compilations are the
            intellectual property of {siteConfig.name}. You may freely share quiz links
            and scores on social media, but you may not scrape or duplicate our
            compiled question databases for commercial redistribution without
            written permission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
          <p>
            In no event shall {siteConfig.name} or its operators be liable for any
            indirect, consequential, or incidental damages resulting from your use of
            or inability to use our platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Governing Law & Updates</h2>
          <p>
            These terms may be revised occasionally. Continued use of the platform
            after modifications constitutes your acceptance of the updated terms.
          </p>
        </section>
      </Card>
    </div>
  );
}
