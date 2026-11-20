import React from 'react';
import { BookOpen } from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '../types';
import LazyImage from './LazyImage';
import { navigateTo } from '../utils/router';
import { useVenue } from '../context/VenueContext';
import { formatArticleTextWithVenue } from '../utils/articleBranding';

interface RecommendedArticlesWidgetProps {
  currentArticleId: string;
  limit?: number;
}

/**
 * RecommendedArticlesWidget for Wedding Journal article sidebar / discovery area.
 * Displays up to 3 contextually relevant articles from the approved 7-article collection,
 * strictly excluding the current active article.
 */
export default function RecommendedArticlesWidget({ currentArticleId, limit = 3 }: RecommendedArticlesWidgetProps) {
  const { venue } = useVenue();
  // Find current active article to identify category context
  const currentArticle = JOURNAL_ARTICLES.find(a => a.id === currentArticleId || a.slug === currentArticleId);
  const currentCategory = currentArticle ? currentArticle.category : '';

  // Filter out the active article
  const candidates = JOURNAL_ARTICLES.filter(a => a.id !== currentArticleId && a.slug !== currentArticleId);

  // Score relevance: Same category = 100 points, related categories = 50 points
  const getRelevanceScore = (article: JournalArticle) => {
    if (article.category === currentCategory) return 100;
    if (
      (currentCategory === 'Venue Guide' && (article.category === 'Decor & Ideas' || article.category === 'Wedding Planning')) ||
      (currentCategory === 'Budget & Booking' && (article.category === 'Venue Guide' || article.category === 'Wedding Planning')) ||
      (currentCategory === 'Wedding Planning' && (article.category === 'Venue Guide' || article.category === 'Budget & Booking'))
    ) {
      return 50;
    }
    return 10;
  };

  // Sort candidates by relevance score descending
  const sorted = [...candidates].sort((a, b) => getRelevanceScore(b) - getRelevanceScore(a));

  // Deduplicate and take top limit
  const recommended: JournalArticle[] = [];
  const seenIds = new Set<string>();

  for (const article of sorted) {
    if (recommended.length >= limit) break;
    if (!seenIds.has(article.id)) {
      seenIds.add(article.id);
      recommended.push(article);
    }
  }

  if (recommended.length === 0) return null;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-secondary-text)]/80 shadow-2xs space-y-4 font-sans-premium">
      <div className="flex items-center gap-2 border-b border-[var(--theme-secondary-text)]/60 pb-3">
        <BookOpen className="w-4 h-4 text-[var(--theme-gold)] shrink-0" aria-hidden="true" />
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--theme-primary)]">
          Recommended Articles
        </h3>
      </div>

      <div className="space-y-3.5">
        {recommended.map((item) => {
          const brandedTitle = formatArticleTextWithVenue(item.title, venue);
          return (
          <article 
            key={item.id}
            onClick={() => navigateTo(`/wedding-journal/${item.slug}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateTo(`/wedding-journal/${item.slug}`);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Read recommended article: ${brandedTitle}`}
            className="group flex items-start gap-3.5 cursor-pointer p-2.5 -mx-2.5 rounded-xl hover:bg-[var(--theme-card-bg)] focus:bg-[var(--theme-card-bg)] transition-all focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]/40"
          >
            {/* Fixed 80x80 Thumbnail */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-transparent border border-[var(--theme-secondary-text)]/60">
              <LazyImage 
                src={item.image} 
                alt={brandedTitle} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details: Category, Title with natural text wrapping, and read time */}
            <div className="flex-1 min-w-0 space-y-1 my-auto">
              <span className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--theme-gold)] block">
                {item.category}
              </span>
              <h4 className="font-serif-editorial text-[16px] sm:text-[17px] md:text-[18px] font-medium text-[var(--theme-primary)] leading-[1.4] group-hover:text-[var(--theme-dark)] transition-colors break-words">
                {brandedTitle}
              </h4>
              <p className="text-[11px] text-[var(--theme-charcoal)]/65 flex items-center gap-1.5 pt-0.5">
                <span>{item.readTime}</span>
              </p>
            </div>
          </article>
          );
        })}
      </div>
    </div>
  );
}
