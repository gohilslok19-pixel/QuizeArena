import { MetadataRoute } from 'next';
import { getAllQuizzes, getCategoriesWithCounts } from '@/lib/quiz-service';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  // Core main pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quizzes`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/daily`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Dynamic Quiz pages
  const quizPages: MetadataRoute.Sitemap = getAllQuizzes().map((quiz) => ({
    url: `${baseUrl}/quiz/${quiz.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Category pages
  const categoryPages: MetadataRoute.Sitemap = getCategoriesWithCounts().map(
    (cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    })
  );

  return [...staticPages, ...categoryPages, ...quizPages];
}
