import React from 'react';
import { Tag, ChevronRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../types';
import { navigateTo } from '../utils/router';

// Approved categories in canonical order
const APPROVED_CATEGORIES = [
  'Venue Guide',
  'Wedding Planning',
  'Budget & Booking',
  'Decor & Ideas',
  'Wedding Inspiration'
] as const;

/**
 * BrowseByCategoryWidget for Wedding Journal article discovery.
 * Dynamically computes category article counts from approved published records
 * and navigates to the category-filtered Wedding Journal listing page when clicked.
 */
export default function BrowseByCategoryWidget() {
  // Dynamically calculate published counts per category from JOURNAL_ARTICLES
  const categoryCounts = JOURNAL_ARTICLES.reduce<Record<string, number>>((acc, article) => {
    const cat = article.category;
    if (cat) {
      acc[cat] = (acc[cat] || 0) + 1;
    }
    return acc;
  }, {});

  // Include approved categories that have published articles
  const categoryList = APPROVED_CATEGORIES.filter(cat => (categoryCounts[cat] || 0) > 0);

  if (categoryList.length === 0) return null;

  const handleCategoryClick = (categoryName: string) => {
    navigateTo(`/wedding-journal?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[var(--theme-secondary-text)]/80 shadow-2xs space-y-4 font-sans-premium">
      <div className="flex items-center gap-2 border-b border-[var(--theme-secondary-text)]/60 pb-3">
        <Tag className="w-4 h-4 text-[var(--theme-gold)] shrink-0" aria-hidden="true" />
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--theme-primary)]">
          Browse By Category
        </h3>
      </div>

      <div className="space-y-1.5">
        {categoryList.map((cat) => {
          const count = categoryCounts[cat] || 0;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#FCFBF8] focus:bg-[#FCFBF8] active:bg-[#FCFBF8] text-left transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]/40 min-h-[44px]"
              aria-label={`Browse ${cat} category containing ${count} article${count === 1 ? '' : 's'}`}
            >
              <span className="font-sans-premium text-[15px] sm:text-[15px] font-semibold text-[var(--theme-charcoal)]/90 group-hover:text-[var(--theme-primary)] transition-colors">
                {cat}
              </span>
              
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-sans-premium font-bold px-2.5 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20">
                  {count}
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--theme-charcoal)]/40 group-hover:text-[var(--theme-primary)] group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
