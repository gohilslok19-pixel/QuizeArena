'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllQuizzes, searchQuizzes } from '@/lib/quiz-service';
import Card from '@/ui/Card';
import Badge from '@/ui/Badge';
import SearchBar from '@/ui/SearchBar';
import FilterBar from '@/ui/FilterBar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdSlot from '@/components/ads/AdSlot';
import { Clock, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredQuizzes = useMemo(() => {
    return searchQuizzes(searchQuery, selectedCategory, selectedDifficulty);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'All Quizzes' },
        ]}
      />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Explore All Quizzes
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Browse our full library of interactive quizzes. Filter by category,
          select your difficulty level, or search by keyword.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search 20+ quizzes (e.g. Python, Space, AI, Science, Geography)..."
        />
        <FilterBar
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onSelectCategory={setSelectedCategory}
          onSelectDifficulty={setSelectedDifficulty}
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-white">{filteredQuizzes.length}</strong> quizzes
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz, idx) => (
            <Link
              key={quiz.slug}
              href={`/quiz/${quiz.slug}`}
              className="group block"
            >
              <Card hoverEffect className="h-full flex flex-col justify-between p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge difficulty={quiz.difficulty}>
                      {quiz.difficulty.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {quiz.estimatedTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {quiz.title}
                  </h2>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                    {quiz.questions.length} Questions
                  </span>
                  <span className="font-semibold text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Play Quiz <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-950/40 text-purple-400 border border-purple-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No quizzes found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            We couldn't find any quiz matching your current search or filter
            criteria. Try clearing your filters or typing another keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Ad slot between listings */}
      <AdSlot type="inContent" />
    </div>
  );
}
