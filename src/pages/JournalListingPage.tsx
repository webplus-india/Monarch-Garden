import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Clock, Calendar, ArrowLeft, BookOpen, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '../types';
import { useVenue } from '../context/VenueContext';
import LazyImage from '../components/LazyImage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JournalCtaBanner from '../components/JournalCtaBanner';
import { navigateTo } from '../utils/router';
import { getBrandedArticle } from '../utils/articleBranding';

interface JournalListingPageProps {
  onOpenEnquiry: () => void;
}

const CANONICAL_CATEGORIES = [
  'ALL',
  'Venue Guide',
  'Wedding Planning',
  'Budget & Booking',
  'Decor & Ideas',
  'Wedding Inspiration'
] as const;

export default function JournalListingPage({ onOpenEnquiry }: JournalListingPageProps) {
  const { venue } = useVenue();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Parse category URL query parameter on load & URL change
  React.useEffect(() => {
    const parseCategoryFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const urlCat = params.get('category');
      if (urlCat) {
        const decodedCat = decodeURIComponent(urlCat).trim();
        const matchedCat = CANONICAL_CATEGORIES.find(c => c.toLowerCase() === decodedCat.toLowerCase());
        if (matchedCat) {
          setSelectedCategory(matchedCat);
        } else {
          setSelectedCategory('ALL');
        }
      } else {
        setSelectedCategory('ALL');
      }
    };

    parseCategoryFromUrl();

    window.addEventListener('popstate', parseCategoryFromUrl);
    window.addEventListener('route-change', parseCategoryFromUrl);
    return () => {
      window.removeEventListener('popstate', parseCategoryFromUrl);
      window.removeEventListener('route-change', parseCategoryFromUrl);
    };
  }, []);

  const brandedArticles = React.useMemo(
    () => JOURNAL_ARTICLES.map((article) => getBrandedArticle(article, venue)),
    [venue]
  );

  const featuredArticle = brandedArticles[0];

  // Exclude the featured spotlight article from the grid below so it does not appear twice on ALL view
  const gridArticles = brandedArticles.filter(a => a.id !== featuredArticle.id);

  const filteredArticles = selectedCategory === 'ALL' 
    ? gridArticles 
    : brandedArticles.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[var(--theme-charcoal)] selection:bg-[var(--theme-primary)] selection:text-[#FCFBF8]">
      {/* Header */}
      <Header 
        onOpenEnquiry={onOpenEnquiry}
        activeSection="journal"
        isScrolled={true}
      />

      {/* Main Content Area */}
      <main className="pt-[100px] md:pt-[120px] pb-24">
        
        {/* Breadcrumb Navigation & Top Return Link */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--theme-secondary-text)]/40 pb-4">
            <nav className="flex items-center gap-2 text-xs md:text-[13px] font-sans-premium text-[var(--theme-charcoal)]/70">
              <button 
                onClick={() => navigateTo('/')}
                className="hover:text-[var(--theme-primary)] transition-colors cursor-pointer"
              >
                Home
              </button>
              <span className="text-[var(--theme-charcoal)]/30 font-light">/</span>
              <span className="font-semibold text-[var(--theme-primary)]">Wedding Journal</span>
            </nav>

            <button 
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[var(--theme-primary)] hover:text-[var(--theme-dark)] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </button>
          </div>
        </div>

        {/* Page Hero Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <motion.div 
            className="max-w-3xl mx-auto text-center flex flex-col items-center"
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span 
              className="text-xs md:text-[13px] uppercase tracking-[0.22em] font-semibold block font-sans-premium mb-3"
              style={{ color: venue.themeChampagneGold || 'var(--theme-gold)' }}
            >
              WEDDING JOURNAL
            </span>
            
            <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--theme-charcoal)] font-medium tracking-wide mb-4 leading-[1.15]">
              Resort Guides & Celebration Insights
            </h1>

            <div 
              className="w-16 h-[2px] mb-5" 
              style={{ backgroundColor: venue.themePrimaryColor || 'var(--theme-primary)' }} 
            />

            <p className="text-base md:text-lg font-sans-premium text-[var(--theme-charcoal)]/80 leading-relaxed max-w-2xl">
              Expert resort selection advice, seasonal wedding planning guides and insider insights curated for memorable celebrations in {venue.city}.
            </p>
          </motion.div>
        </section>

        {/* Featured Spotlight Article Banner */}
        {featuredArticle && selectedCategory === 'ALL' && (
          <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <motion.article 
              onClick={() => navigateTo(`/wedding-journal/${featuredArticle.slug}`)}
              className="group journal-card-hover bg-[#FFFFFF] border border-[var(--theme-secondary-text)]/80 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 cursor-pointer items-stretch"
              initial={isMobile ? false : { opacity: 0, y: 25 }}
              animate={isMobile ? undefined : { opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lg:col-span-7 relative aspect-[16/10] w-full bg-transparent overflow-hidden lg:h-full lg:min-h-[340px] lg:max-h-[420px]">
                <LazyImage 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover journal-card-img"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-xs sm:text-[13px] text-[var(--theme-charcoal)]/65 font-sans-premium">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--theme-gold)] shrink-0" />
                      <span>{featuredArticle.date}</span>
                    </span>
                    <span className="text-[var(--theme-charcoal)]/40 font-light">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--theme-gold)] shrink-0" />
                      <span>{featuredArticle.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--theme-charcoal)] font-medium leading-[1.25] journal-card-title">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm sm:text-base font-sans-premium text-[var(--theme-charcoal)]/75 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--theme-secondary-text)]/40 flex items-center justify-between w-full mt-auto">
                  <span className="text-[var(--theme-primary)] font-semibold text-xs sm:text-[13px] tracking-wider uppercase font-sans-premium group-hover:text-[var(--theme-dark)] transition-colors">
                    READ FULL GUIDE
                  </span>

                  <div 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-transparent border border-[var(--theme-secondary-text)]/80 flex items-center justify-center text-[var(--theme-primary)] journal-card-btn shadow-sm shrink-0"
                    aria-label={`Read guide: ${featuredArticle.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5 journal-card-arrow stroke-[2]" />
                  </div>
                </div>
              </div>
            </motion.article>
          </section>
        )}

        {/* Category Interactive Filter Bar */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 overflow-x-auto scrollbar-none flex-nowrap md:justify-center border-b border-[var(--theme-secondary-text)]/40 pb-6 -mx-6 px-6 sm:mx-0">
            {CANONICAL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const url = new URL(window.location.href);
                    if (cat === 'ALL') {
                      url.searchParams.delete('category');
                    } else {
                      url.searchParams.set('category', cat);
                    }
                    window.history.pushState({}, '', url.toString());
                  }}
                  className={`px-3 sm:px-3.5 md:px-4 lg:px-4.5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-[12px] lg:text-[12.5px] font-sans-premium uppercase tracking-[0.1em] sm:tracking-[0.11em] md:tracking-[0.12em] font-medium transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'bg-[var(--theme-primary)] text-[#FCFBF8] shadow-md'
                      : 'bg-transparent text-[var(--theme-charcoal)]/70 hover:bg-[#FFFFFF] hover:text-[var(--theme-charcoal)]'
                  }`}
                >
                  {cat === 'ALL' ? 'ALL ARTICLES' : cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Article Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 px-6 bg-[#FFFFFF] rounded-2xl border border-[var(--theme-secondary-text)]/60 max-w-2xl mx-auto">
              <p className="font-serif-editorial text-lg text-[var(--theme-charcoal)] mb-2 font-medium">
                Looking for our Venue Guide?
              </p>
              <p className="text-sm text-[var(--theme-charcoal)]/75 font-sans-premium mb-5 leading-relaxed">
                Our primary guide on choosing a wedding resort in {venue.city} is highlighted in the featured spotlight section above.
              </p>
              <button
                onClick={() => setSelectedCategory('ALL')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-primary)] hover:text-[var(--theme-dark)] transition-colors cursor-pointer font-sans-premium"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredArticles.map((article, idx) => (
                <motion.article 
                  key={article.id}
                  onClick={() => navigateTo(`/wedding-journal/${article.slug}`)}
                  className="group journal-card-hover bg-[#FFFFFF] border border-[var(--theme-secondary-text)]/70 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between cursor-pointer h-full"
                  initial={isMobile ? false : { opacity: 0, y: 20 }}
                  animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col flex-grow">
                    {/* Article Image Container */}
                    <div className="relative w-full aspect-[16/10.5] bg-transparent overflow-hidden shrink-0">
                      <LazyImage 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover journal-card-img"
                      />
                    </div>

                    {/* Article Content Area */}
                    <div className="p-5 sm:p-6 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-3.5">
                        {/* Compact Metadata Row */}
                        <div className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-[var(--theme-charcoal)]/65 font-sans-premium">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[var(--theme-gold)] shrink-0" />
                            <span>{article.date}</span>
                          </span>
                          <span className="text-[var(--theme-charcoal)]/40 font-light">·</span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[var(--theme-gold)] shrink-0" />
                            <span>{article.readTime}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif-editorial text-xl sm:text-[22px] leading-[1.3] text-[var(--theme-charcoal)] font-medium journal-card-title">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm font-sans-premium text-[var(--theme-charcoal)]/75 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Link with Refined Circular Arrow Button */}
                  <div className="px-6 sm:px-7 py-4 border-t border-[var(--theme-secondary-text)]/40 mt-auto shrink-0 flex items-center justify-between w-full">
                    <span className="text-[var(--theme-primary)] font-semibold text-xs sm:text-[13px] tracking-wider uppercase font-sans-premium group-hover:text-[var(--theme-dark)] transition-colors">
                      READ ARTICLE
                    </span>

                    <div 
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FCFBF8] border border-[var(--theme-secondary-text)]/80 flex items-center justify-center text-[var(--theme-primary)] journal-card-btn shadow-sm shrink-0"
                      aria-label={`Read article: ${article.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 journal-card-arrow stroke-[2]" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Venue Consultation Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <JournalCtaBanner onOpenEnquiry={onOpenEnquiry} />
        </section>

      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
