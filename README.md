# 🧠 AI Quiz Arena

> **"Challenge Your Brain. Beat Your Score."**

A fast, engaging, mobile-first online quiz platform built with Next.js 14, TypeScript, and Tailwind CSS. Players can take short 10-question quizzes across multiple categories, receive instant explanations, retry quizzes, track personal streaks, and share their scores.

Designed specifically for **high organic Google traffic (SEO)**, **instant load speeds**, **zero backend infrastructure cost**, and **Google AdSense monetization readiness**.

---

## 🌟 Key Features

- **⚡ Lightning-Fast & Static-First**: Built with Next.js App Router and static generation. Zero database latency, zero heavy APIs.
- **📱 Mobile-First UX**: Responsive touch targets (min 44px), smooth animations, zero layout shifts, and keyboard navigation support (A-D, 1-4, Enter).
- **🧠 20 Pre-Built Quizzes (200 Questions)**: High-quality, verified factual questions across 12 categories (AI, Computer Science, Technology, Science, Space, Geography, History, Math, Sports, India, and more).
- **💡 Instant Question Explanations**: Answers reveal immediately upon selection with a concise explanation card to reinforce learning.
- **🔥 Deterministic Daily Challenge**: Synchronized worldwide challenge calculated deterministically via `dayOfYear % totalQuizzes` without requiring a database.
- **🏆 Private Personal Leaderboard & Streaks**: Automatically tracks personal bests, attempts, average accuracy, and consecutive day streaks locally via `localStorage`.
- **🚀 One-Click Social Sharing**: Uses the native Web Share API with an automatic fallback to formatted clipboard copying.
- **🔍 Instant Client-Side Search & Filters**: Filter quizzes dynamically by category, difficulty, or text keyword without page reloads.
- **📈 Comprehensive SEO & Structured Data**: Dynamic metadata, Open Graph cards, canonical URLs, `/sitemap.xml`, `/robots.txt`, and Schema.org JSON-LD (`WebSite`, `Organization`, `BreadcrumbList`, `Quiz`, `FAQPage`).
- **💰 Google AdSense Ready**: Centralized AdSense architecture with non-intrusive ad placement, responsive slots, and automatic development placeholder mode.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Storage**: React 18 hooks + Browser `localStorage`
- **Deployment**: [Vercel](https://vercel.com/) (Zero server maintenance)

---

## 📁 Project Structure

```
QuizeArena/
├── app/
│   ├── layout.tsx                # Root layout, Google Analytics & AdSense scripts, structured data
│   ├── page.tsx                  # Homepage (Hero, Daily Spotlight, Popular Quizzes, FAQ)
│   ├── not-found.tsx             # Custom gaming-style 404
│   ├── robots.ts                 # Search engine crawler directives (/robots.txt)
│   ├── sitemap.ts                # Auto-generated XML sitemap (/sitemap.xml)
│   ├── quizzes/page.tsx          # Browse all quizzes + client-side search & difficulty filters
│   ├── categories/page.tsx       # All 12 categories overview
│   ├── category/[slug]/page.tsx  # Category-specific quiz listing
│   ├── quiz/[slug]/page.tsx      # Individual quiz page with QuizEngine & Related Quizzes
│   ├── daily/page.tsx            # Deterministic Daily Challenge
│   ├── leaderboard/page.tsx      # Personal leaderboard, streaks, attempts, stats
│   ├── about/page.tsx            # About AI Quiz Arena
│   ├── contact/page.tsx          # Contact & support form
│   ├── privacy-policy/page.tsx   # AdSense-compliant Privacy Policy
│   ├── terms/page.tsx            # Terms and Conditions
│   ├── disclaimer/page.tsx       # Educational & content disclaimer
│   └── cookie-policy/page.tsx    # Cookie & client storage disclosure
├── components/
│   ├── ads/
│   │   ├── AdSlot.tsx            # Centralized AdSense unit (with subtle dev placeholder mode)
│   │   └── AdSenseScript.tsx     # Clean Google AdSense tag loader
│   ├── layout/
│   │   ├── Header.tsx            # Sticky dark navbar + mobile menu + streak indicator
│   │   ├── Footer.tsx            # Semantic footer with navigation and legal links
│   │   └── Breadcrumbs.tsx       # Breadcrumbs with Schema.org BreadcrumbList JSON-LD
│   ├── quiz/
│   │   ├── QuizEngine.tsx        # Single-question state machine, keyboard shortcuts, timer
│   │   ├── QuestionCard.tsx      # High-contrast question card & instant explanation display
│   │   ├── OptionButton.tsx      # Accessible large-hitbox options with correct/incorrect states
│   │   ├── ProgressBar.tsx       # Smooth animated progress indicator
│   │   ├── ResultCard.tsx        # Score card, tier badges (Brain Master, etc.), actions
│   │   ├── ShareButton.tsx       # Web Share API + fallback clipboard copy
│   │   └── RelatedQuizzes.tsx    # Quiz discovery recommendations to increase page depth
│   └── ui/
│       ├── Badge.tsx             # Consistent difficulty & category badges
│       ├── Button.tsx            # Reusable buttons with custom variants
│       ├── Card.tsx              # Glassmorphic dark cards with subtle glow
│       ├── SearchBar.tsx         # Client-side search input
│       └── FilterBar.tsx         # Category and difficulty filter chips
├── config/
│   ├── site.ts                   # Centralized site metadata, URL, name, and social links
│   └── ads.ts                    # Centralized AdSense publisher ID & slot configurations
├── data/
│   ├── categories.ts             # 12 core categories metadata & icon identifiers
│   └── quizzes/                  # 20 High-Quality Quizzes (10 factual questions each)
├── lib/
│   ├── quiz-service.ts           # Type-safe quiz loading, category filtering, search, and daily calculation
│   ├── storage.ts                # Safe localStorage wrapper for scores, streaks, and personal bests
│   ├── analytics.ts              # Custom analytics event dispatcher
│   └── utils.ts                  # Utility functions (cn, date formatting)
├── types/
│   └── quiz.ts                   # Quiz, Question, Category, Result, and Leaderboard types
├── .env.example                  # Documented environment variables
└── README.md
```

---

## 🚀 Quick Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env.local
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## ⚙️ Environment Variables

The project contains a documented `.env.example` file:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for SEO & social cards | `https://aiquizarena.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Your Google AdSense publisher ID | `ca-pub-XXXXXXXXXXXXXXX` |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` | Ad unit slot ID for Homepage | `1234567890` |
| `NEXT_PUBLIC_ADSENSE_SLOT_QUIZ` | Ad unit slot ID for Quiz Page | `2345678901` |
| `NEXT_PUBLIC_ADSENSE_SLOT_RESULT` | Ad unit slot ID for Result Page | `3456789012` |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Ad unit slot ID for Sidebars | `4567890123` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (Optional) | `G-XXXXXXXXXX` |

> **Note**: If `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is empty or left as the placeholder, the site will automatically run in development placeholder mode with zero broken ads.

---

## 📝 How to Add a New Quiz

Adding a quiz requires **zero changes to UI code or quiz engines**:

1. Create a new JSON file inside `data/quizzes/[your-quiz-slug].json`:
```json
{
  "id": "my-new-quiz",
  "slug": "my-new-quiz",
  "title": "My New Quiz Title",
  "description": "A concise description of what players will test.",
  "category": "Technology",
  "categorySlug": "technology",
  "difficulty": "medium",
  "estimatedTime": "3 min",
  "featured": false,
  "popular": true,
  "seoTitle": "My New Quiz – Test Your Tech Knowledge | AI Quiz Arena",
  "seoDescription": "Take this 10-question quiz to challenge your skills.",
  "keywords": ["quiz", "trivia", "technology"],
  "questions": [
    {
      "question": "Which protocol is used for secure web browsing?",
      "options": ["HTTP", "HTTPS", "FTP", "SMTP"],
      "correctAnswer": 1,
      "explanation": "HTTPS encrypts communications using TLS/SSL."
    }
  ]
}
```

2. Register the import in `lib/quiz-service.ts` inside the `ALL_QUIZZES` array.
3. Next.js will automatically generate the static route `/quiz/my-new-quiz`, include it in `/sitemap.xml`, and index it in the search catalog.

---

## 💰 Google AdSense Setup Guide

Follow these steps when preparing to monetize with Google AdSense:

1. **Deploy to Vercel**: Deploy the website using a custom top-level domain (e.g., `aiquizarena.com`).
2. **Verify Public Pages**: Ensure all 20+ quizzes, categories, About page, and Contact page are active.
3. **Confirm Legal Pages**: The required legal pages (`/privacy-policy`, `/terms`, `/disclaimer`, `/cookie-policy`) are already included in the footer.
4. **Apply for AdSense**:
   - Go to [Google AdSense](https://adsense.google.com/) and click **Get Started**.
   - Add your custom domain (`https://aiquizarena.com`).
   - Wait for Google's review and approval.
5. **Configure Publisher ID**:
   - Once approved, copy your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`).
   - Add `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX` in your Vercel Project Environment Variables.
6. **Create Ad Units**:
   - In AdSense Console, navigate to **Ads > By ad unit > Display ads**.
   - Create units for `home`, `quiz`, and `result`.
   - Copy the slot IDs and set them in your Vercel Environment Variables:
     - `NEXT_PUBLIC_ADSENSE_SLOT_HOME`
     - `NEXT_PUBLIC_ADSENSE_SLOT_QUIZ`
     - `NEXT_PUBLIC_ADSENSE_SLOT_RESULT`
7. **Redeploy**: Trigger a deployment in Vercel. Real AdSense ads will automatically begin serving!

### AdSense Policy Safety Built-In:
- Ads **never** cover or mimic quiz buttons.
- No misleading labels (strictly labeled "Advertisement").
- No intrusive interstitials between individual questions.
- Reserved container heights prevent Cumulative Layout Shift (CLS).

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AI Quiz Arena"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-quiz-arena.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the environment variable `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Click **Deploy**. Vercel will automatically build and deploy the application globally to edge CDNs.

---

## 📋 Production Verification Checklist

- [x] Homepage with interactive hero, daily challenge, and popular quizzes
- [x] 20 high-quality quizzes created (each with exactly 10 questions)
- [x] Zero backend dependencies (runs 100% in the browser)
- [x] Quiz engine with zero-reload transitions & instant explanations
- [x] Local storage for personal leaderboard, streaks, and best scores
- [x] Web Share API integration with clipboard fallback
- [x] Client-side keyword search & difficulty filters
- [x] SEO metadata, canonical links, and Open Graph tags
- [x] Schema.org structured data (`Quiz`, `FAQPage`, `BreadcrumbList`, `WebSite`, `Organization`)
- [x] Auto-generated `/sitemap.xml` and `/robots.txt`
- [x] Google AdSense integration with dev placeholder fallback
- [x] Fully compliant Legal pages (Privacy Policy, Terms, Disclaimer, Cookie Policy, Contact)
- [x] Custom gaming-style 404 page

---

## 📄 License

MIT License &copy; 2026 AI Quiz Arena.
