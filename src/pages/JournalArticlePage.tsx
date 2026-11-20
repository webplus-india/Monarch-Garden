import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight,
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  CheckCircle2,
  Check
} from 'lucide-react';
import { JournalArticle, JOURNAL_ARTICLES, ArticleTable } from '../types';
import { useVenue } from '../context/VenueContext';
import LazyImage from '../components/LazyImage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleIntroBox from '../components/ArticleIntroBox';
import ResponsiveTable from '../components/ResponsiveTable';
import ReadingProgressBar from '../components/ReadingProgressBar';
import ArticleShareBar from '../components/ArticleShareBar';
import TableOfContents from '../components/TableOfContents';
import ArticleFAQAccordion from '../components/ArticleFAQAccordion';
import RecommendedArticlesWidget from '../components/RecommendedArticlesWidget';
import BrowseByCategoryWidget from '../components/BrowseByCategoryWidget';
import JournalCtaBanner from '../components/JournalCtaBanner';
import { navigateTo } from '../utils/router';
import { getBrandedArticle, formatArticleTextWithVenue } from '../utils/articleBranding';

interface JournalArticlePageProps {
  article: JournalArticle;
  onOpenEnquiry: () => void;
}

// Helper component to convert bracketed article references like [Title] or [Title](slug) into interactive internal links
function FormattedText({ text }: { text: string }) {
  const { venue } = useVenue();
  if (!text) return null;

  // Match bracketed links like [Article Title] or [Article Title](slug)
  const parts = text.split(/(\[[^\]]+\](?:\([^\)]+\))?)/g);

  return (
    <>
      {parts.map((part, index) => {
        const bracketMatch = part.match(/^\[([^\]]+)\](?:\(([^\)]+)\))?$/);
        if (bracketMatch) {
          const linkTitle = bracketMatch[1];
          const customSlug = bracketMatch[2];
          const normalizedLinkTitle = linkTitle.toLowerCase().trim();

          // Find corresponding article by original or branded title or slug
          const matchedArticle = JOURNAL_ARTICLES.find(a => {
            const brandedTitle = formatArticleTextWithVenue(a.title, venue).toLowerCase().trim();
            const brandedSeoTitle = a.seoTitle ? formatArticleTextWithVenue(a.seoTitle, venue).toLowerCase().trim() : '';
            return (
              a.title.toLowerCase().trim() === normalizedLinkTitle ||
              brandedTitle === normalizedLinkTitle ||
              (a.seoTitle && a.seoTitle.toLowerCase().trim() === normalizedLinkTitle) ||
              brandedSeoTitle === normalizedLinkTitle ||
              a.slug === customSlug ||
              a.id === customSlug
            );
          });

          const targetSlug = matchedArticle ? matchedArticle.slug : (customSlug || 'how-to-choose-the-perfect-wedding-venue');

          return (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/wedding-journal/${targetSlug}`);
              }}
              className="text-[var(--theme-primary)] font-semibold no-underline hover:underline hover:decoration-[var(--theme-primary)]/70 underline-offset-4 hover:text-[var(--theme-primary)] focus:underline focus:decoration-[var(--theme-primary)]/70 focus:text-[var(--theme-primary)] focus:outline-none transition-all duration-200 cursor-pointer inline-baseline px-0.5"
            >
              {linkTitle}
            </button>
          );
        }
        return part;
      })}
    </>
  );
}

export default function JournalArticlePage({ article, onOpenEnquiry }: JournalArticlePageProps) {
  const { venue } = useVenue();
  const brandedArticle = React.useMemo(() => getBrandedArticle(article, venue), [article, venue]);

  // Scroll to top when switching articles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [article.id, article.slug]);

  // Update Page Title and Meta Description whenever article or venue details change
  useEffect(() => {
    const syncHeadMeta = () => {
      const displayTitle = brandedArticle.seoTitle || brandedArticle.title;
      document.title = `${displayTitle} | ${venue.venueName}`;

      if (brandedArticle.metaDescription) {
        let metaDescEl = document.querySelector('meta[name="description"]');
        if (!metaDescEl) {
          metaDescEl = document.createElement('meta');
          metaDescEl.setAttribute('name', 'description');
          document.head.appendChild(metaDescEl);
        }
        metaDescEl.setAttribute('content', brandedArticle.metaDescription);
      }
    };

    syncHeadMeta();
    const frameId = window.requestAnimationFrame(syncHeadMeta);
    return () => window.cancelAnimationFrame(frameId);
  }, [brandedArticle, venue.venueName]);

  // Find contextually relevant related articles strictly excluding the current active article
  const relatedArticles = React.useMemo(() => JOURNAL_ARTICLES
    .filter(a => a.id !== article.id && a.slug !== article.slug)
    .sort((a, b) => {
      const scoreA = a.category === article.category ? 100 : 10;
      const scoreB = b.category === article.category ? 100 : 10;
      return scoreB - scoreA;
    })
    .slice(0, 2)
    .map(rel => getBrandedArticle(rel, venue)), [article.id, article.slug, article.category, venue]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: brandedArticle.seoTitle || brandedArticle.title,
        text: brandedArticle.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-charcoal)] selection:bg-[var(--theme-primary)] selection:text-[var(--theme-bg)]">
      {/* Header */}
      <Header 
        onOpenEnquiry={onOpenEnquiry}
        activeSection="journal"
        isScrolled={true}
      />

      {/* Scroll-Based Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Main Content Area */}
      <main className="pt-[100px] md:pt-[120px] pb-24">
        
        {/* Top Breadcrumbs Bar & Return Navigation */}
        <div className="max-w-4xl mx-auto px-6 md:px-8 mb-8 md:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--theme-secondary-text)]/40 pb-4">
            <nav className="flex flex-wrap items-center gap-2 text-xs md:text-[13.5px] font-sans-premium text-[var(--theme-charcoal)]/75" aria-label="Breadcrumb">
              <button 
                onClick={() => navigateTo('/')}
                className="hover:text-[var(--theme-primary)] transition-colors cursor-pointer"
              >
                Home
              </button>
              <span className="text-[var(--theme-charcoal)]/30 font-light">/</span>
              <button 
                onClick={() => navigateTo('/wedding-journal')}
                className="hover:text-[var(--theme-primary)] transition-colors cursor-pointer"
              >
                Wedding Journal
              </button>
              <span className="text-[var(--theme-charcoal)]/30 font-light">/</span>
              <span className="font-semibold text-[var(--theme-primary)] truncate max-w-[200px] sm:max-w-[320px]">
                {brandedArticle.title}
              </span>
            </nav>

            <button 
              onClick={() => navigateTo('/wedding-journal')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[var(--theme-primary)] hover:text-[var(--theme-dark)] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </button>
          </div>
        </div>

        {/* Main Article Workspace */}
        <article className="max-w-4xl mx-auto px-6 md:px-8 space-y-10">
          
          <header className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.22em] font-bold font-sans-premium px-3.5 py-1.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20">
                {brandedArticle.category}
              </span>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-semibold text-[var(--theme-charcoal)]/70 hover:text-[var(--theme-primary)] transition-colors cursor-pointer"
                title="Share Article"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] text-[var(--theme-charcoal)] font-medium leading-[1.18] tracking-tight">
              {brandedArticle.title}
            </h1>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[var(--theme-charcoal)]/75 font-sans-premium border-y border-[var(--theme-secondary-text)]/40 py-4">
              <span className="font-semibold text-[var(--theme-primary)]">
                {brandedArticle.author || `${venue.venueName} Editorial Team`}
              </span>
              <span className="text-[var(--theme-charcoal)]/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[var(--theme-gold)]" />
                <span>{brandedArticle.date}</span>
              </span>
              <span className="text-[var(--theme-charcoal)]/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--theme-gold)]" />
                <span>{brandedArticle.readTime}</span>
              </span>
            </div>
          </header>

          {/* Standardized Lead Introduction Box */}
          <ArticleIntroBox article={brandedArticle} FormattedTextComponent={FormattedText} />

          {/* Large Hero Cover Image - Untouched asset */}
          <div className="relative w-full aspect-[16/9.5] rounded-2xl overflow-hidden shadow-lg border border-[var(--theme-secondary-text)]/60">
            <LazyImage 
              src={brandedArticle.image} 
              alt={brandedArticle.title} 
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>

          {/* Dynamic Table of Contents */}
          <TableOfContents sections={brandedArticle.sections} />

          {/* Article Main Body Sections — 16px mobile, 17px tablet, 17px desktop */}
          <div className="space-y-12 text-[16px] sm:text-[17px] md:text-[17px] leading-[1.78] text-[var(--theme-charcoal)]/85 font-sans-premium pt-2">
            {brandedArticle.sections.map((section, idx) => {
              const sectionId = `section-${idx + 1}`;
              return (
                <section key={idx} className="space-y-5">
                  
                  {/* H2 Heading */}
                  {section.heading && (
                    <h2 
                      id={sectionId}
                      className="font-serif-editorial text-2xl sm:text-3xl md:text-[32px] text-[var(--theme-charcoal)] font-medium pt-8 border-t border-[var(--theme-secondary-text)]/40 leading-snug scroll-mt-28"
                    >
                      {section.heading}
                    </h2>
                  )}

                  {/* Section Subheading (H3) */}
                  {section.subheading && (
                    <h3 
                      id={`${sectionId}-sub`}
                      className="font-serif-editorial text-xl sm:text-2xl text-[var(--theme-primary)] font-medium pt-3 scroll-mt-28"
                    >
                      {section.subheading}
                    </h3>
                  )}

                  {/* Main Section Paragraphs */}
                  {section.content && (
                    <p className="leading-relaxed">
                      <FormattedText text={section.content} />
                    </p>
                  )}

                  {section.paragraphs && section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      <FormattedText text={para} />
                    </p>
                  ))}

                  {/* Subheadings Array (H3) */}
                  {section.subheadings && section.subheadings.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-3 pt-4">
                      <h3 
                        id={`${sectionId}-sub-${sIdx + 1}`}
                        className="font-serif-editorial text-xl sm:text-2xl text-[var(--theme-primary)] font-medium scroll-mt-28"
                      >
                        {sub.subheading}
                      </h3>
                      {sub.paragraphs.map((sPara, spIdx) => (
                        <p key={spIdx} className="leading-relaxed">
                          <FormattedText text={sPara} />
                        </p>
                      ))}
                    </div>
                  ))}

                {/* Paragraphs After Subheading */}
                {section.paragraphsAfterSubheading && section.paragraphsAfterSubheading.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    <FormattedText text={para} />
                  </p>
                ))}

                {/* Refined Bespoke Editorial Checklist Box */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="p-5 sm:p-7 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-secondary-text)]/70 my-7 shadow-2xs">
                    <ul className="divide-y divide-[var(--theme-secondary-text)]/50 font-sans-premium">
                      {section.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 sm:gap-3.5 py-3 first:pt-0 last:pb-0 text-[var(--theme-charcoal)]/90 text-sm sm:text-base leading-[1.65]">
                          <Check className="w-4 h-4 text-[var(--theme-gold)] shrink-0 mt-[3px] stroke-[2.25]" aria-hidden="true" />
                          <span className="flex-1 min-w-0 break-words"><FormattedText text={point} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Refined Numbered Points Box */}
                {section.numberedPoints && section.numberedPoints.length > 0 && (
                  <div className="p-5 sm:p-7 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-secondary-text)]/70 my-7 shadow-2xs">
                    <ol className="divide-y divide-[var(--theme-secondary-text)]/50 font-sans-premium">
                      {section.numberedPoints.map((numPoint, npIdx) => (
                        <li key={npIdx} className="flex items-start gap-3 sm:gap-3.5 py-3 first:pt-0 last:pb-0 text-[var(--theme-charcoal)]/90 text-sm sm:text-base leading-[1.65]">
                          <span className="w-5 h-5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-bold text-[10.5px] flex items-center justify-center shrink-0 mt-[2px] border border-[var(--theme-primary)]/20">
                            {npIdx + 1}
                          </span>
                          <span className="flex-1 min-w-0 break-words"><FormattedText text={numPoint} /></span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Section Quote */}
                {section.quote && (
                  <blockquote className="p-5 sm:p-7 rounded-xl bg-[var(--theme-bg)] border-l-4 border-[var(--theme-gold)] my-6 font-serif-editorial italic text-lg sm:text-xl text-[var(--theme-charcoal)]/90 leading-relaxed shadow-2xs">
                    <FormattedText text={section.quote} />
                  </blockquote>
                )}

                {/* Section Key Takeaways */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="p-5 sm:p-7 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-gold)]/40 my-6 space-y-3 shadow-2xs font-sans-premium">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--theme-gold)] block">
                      KEY TAKEAWAYS
                    </span>
                    <ul className="space-y-2.5">
                      {section.keyTakeaways.map((kt, ktIdx) => (
                        <li key={ktIdx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--theme-charcoal)]/90 leading-[1.6]">
                          <span className="text-[var(--theme-gold)] font-bold shrink-0 mt-[1px]">•</span>
                          <span className="flex-1 min-w-0 break-words"><FormattedText text={kt} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Paragraphs After Bullets */}
                {section.paragraphsAfterBullets && section.paragraphsAfterBullets.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    <FormattedText text={para} />
                  </p>
                ))}

                {/* Standardized Responsive Table & Worksheet Area */}
                {section.table && (
                  <ResponsiveTable table={section.table} FormattedTextComponent={FormattedText} />
                )}

                {/* Paragraphs After Table */}
                {section.paragraphsAfterTable && section.paragraphsAfterTable.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    <FormattedText text={para} />
                  </p>
                ))}

              </section>
            );
          })}

            {/* Article Conclusion / Key Takeaways Box */}
            {brandedArticle.conclusion && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[var(--theme-card-bg)] border border-[var(--theme-gold)]/50 my-8 shadow-2xs space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--theme-gold)] block font-sans-premium">
                  KEY TAKEAWAY & FINAL VERDICT
                </span>
                <p className="text-base sm:text-lg text-[var(--theme-charcoal)]/90 leading-relaxed font-serif-editorial italic">
                  <FormattedText text={brandedArticle.conclusion} />
                </p>
              </div>
            )}

            {/* Article Specific Frequently Asked Questions */}
            <ArticleFAQAccordion faqs={brandedArticle.faqs} FormattedTextComponent={FormattedText} />

            {/* Minimal Social Share Buttons */}
            <ArticleShareBar article={brandedArticle} />

              {/* Content Discovery: Recommended Articles & Browse by Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--theme-secondary-text)]/60 items-stretch">
                <RecommendedArticlesWidget currentArticleId={brandedArticle.id} limit={3} />
                <BrowseByCategoryWidget />
              </div>
            </div>

          </article>

          {/* Standardized Venue Availability & Enquiry CTA Box — Formatted for article page max-w-4xl width */}
          <section className="max-w-4xl mx-auto px-6 md:px-8 mt-16 md:mt-20">
            <JournalCtaBanner onOpenEnquiry={onOpenEnquiry} />
          </section>

        {/* More From The Wedding Journal — Standardized Cards Grid */}
        {relatedArticles.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 md:px-8 mt-20 pt-16 border-t border-[var(--theme-secondary-text)]/50">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[var(--theme-gold)] block font-sans-premium mb-2">
                CONTINUE READING
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--theme-charcoal)] font-medium">
                More From The Wedding Journal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedArticles.map((relArticle) => (
                <article
                  key={relArticle.id}
                  onClick={() => navigateTo(`/wedding-journal/${relArticle.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateTo(`/wedding-journal/${relArticle.slug}`);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read article: ${relArticle.title}`}
                  className="group journal-card-hover bg-[var(--theme-card-bg)] border border-[var(--theme-secondary-text)]/70 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between cursor-pointer h-full focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/40"
                >
                  <div>
                    <div className="relative w-full aspect-[16/10] bg-transparent overflow-hidden">
                      <LazyImage 
                        src={relArticle.image} 
                        alt={relArticle.title}
                        className="w-full h-full object-cover journal-card-img"
                      />
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-[var(--theme-charcoal)]/60 font-sans-premium">
                        <span>{relArticle.date}</span>
                        <span>·</span>
                        <span>{relArticle.readTime}</span>
                      </div>

                      <h3 className="font-serif-editorial text-xl leading-snug text-[var(--theme-charcoal)] font-medium journal-card-title">
                        {relArticle.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-sans-premium text-[var(--theme-charcoal)]/75 line-clamp-2">
                        {relArticle.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Link with Circular Arrow Button */}
                  <div className="px-6 py-4 border-t border-[var(--theme-secondary-text)]/40 mt-auto flex items-center justify-between w-full">
                    <span className="text-[var(--theme-primary)] font-semibold text-xs tracking-wider uppercase font-sans-premium group-hover:text-[var(--theme-dark)] transition-colors">
                      READ ARTICLE
                    </span>

                    <div 
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--theme-alt-bg)] border border-[var(--theme-secondary-text)]/80 flex items-center justify-center text-[var(--theme-primary)] journal-card-btn shadow-sm shrink-0"
                      aria-label={`Read article: ${relArticle.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 journal-card-arrow stroke-[2]" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
