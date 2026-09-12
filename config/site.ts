export const siteConfig = {
  name: 'AI Quiz Arena',
  tagline: 'Challenge Your Brain. Beat Your Score.',
  description:
    'Test your knowledge with fast, engaging quizzes across AI, technology, science, sports, geography, and general knowledge. Instant results, explanations, and local score tracking.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aiquizarena.com',
  ogImage: '/images/og-default.png',
  creator: 'AI Quiz Arena Team',
  contactEmail: 'contact@aiquizarena.com',
  links: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Quizzes', href: '/quizzes' },
    { label: 'Categories', href: '/categories' },
    { label: 'Daily Challenge', href: '/daily' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ],
  footerLegal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Contact', href: '/contact' },
  ],
};
