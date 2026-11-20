import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../types';
import { useVenue } from '../context/VenueContext';
import LazyImage from './LazyImage';
import { navigateTo } from '../utils/router';

interface JournalSectionProps {
  onEnquire?: () => void;
}

export default function JournalSection({ onEnquire }: JournalSectionProps) {
  const { venue } = useVenue();

  return (
    <section className="pt-12 md:pt-16 pb-20 md:pb-28 bg-[var(--theme-bg)] relative overflow-hidden" id="journal">
      {/* Background Decorative Detail */}
      <div className="absolute left-0 top-0 w-32 h-32 border-t border-l border-[var(--theme-gold)]/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span 
            className="site-section-eyebrow text-[var(--theme-gold)] block mb-3 font-sans-premium"
            style={{ color: venue.themeChampagneGold || 'var(--theme-gold)' }}
          >
            WEDDING JOURNAL
          </span>
          <h2 className="font-serif-editorial celebration-section-title-fluid text-[var(--theme-charcoal)] font-medium tracking-wide mb-4">
            Insights & Resort Planning
          </h2>
          <div 
            className="w-16 h-[2px] mb-5" 
            style={{ backgroundColor: venue.themePrimaryColor || 'var(--theme-primary)' }} 
          />
          <p className="site-section-description text-[var(--theme-charcoal)]/80 leading-relaxed font-sans-premium max-w-xl">
            Explore wedding inspiration, expert planning tips and resort advice to help you plan your celebration with confidence.
          </p>
        </motion.div>

        {/* Article Cards Grid — Featured 3 Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {JOURNAL_ARTICLES.slice(0, 3).map((article, idx) => (
            <motion.article 
              key={article.id}
              onClick={() => navigateTo(`/wedding-journal/${article.slug}`)}
              className="group journal-card-hover bg-[var(--theme-card-bg)] border border-[var(--theme-secondary-text)] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between cursor-pointer h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                {/* Article Image Container */}
                <div className="relative w-full aspect-[16/10.5] bg-transparent overflow-hidden">
                  <LazyImage 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover journal-card-img"
                  />
                </div>

                {/* Article Content Area */}
                <div className="p-5 sm:p-6 space-y-3">
                  
                  {/* Compact Metadata Row — Date and Reading Time */}
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

                  {/* Title — Full title without line clamping */}
                  <h3 className="font-serif-editorial text-xl sm:text-[22px] lg:text-[23px] leading-[1.3] text-[var(--theme-charcoal)] font-medium journal-card-title">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm font-sans-premium text-[var(--theme-charcoal)]/75 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Link with Refined Circular Arrow Button */}
              <div className="px-6 sm:px-7 py-4 border-t border-[var(--theme-secondary-text)]/60 mt-auto flex items-center justify-between w-full">
                <span className="text-[var(--theme-primary)] font-semibold text-xs sm:text-[13px] tracking-wider uppercase font-sans-premium group-hover:text-[var(--theme-dark)] transition-colors">
                  READ ARTICLE
                </span>

                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--theme-alt-bg)] border border-[var(--theme-secondary-text)] flex items-center justify-center text-[var(--theme-primary)] journal-card-btn shadow-xs shrink-0"
                  aria-label={`Read article: ${article.title}`}
                >
                  <ArrowUpRight className="w-5 h-5 journal-card-arrow stroke-[2]" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom View All CTA — Compact Rectangular Outlined Button */}
        <div className="mt-12 md:mt-16 text-center">
          <button
            onClick={() => navigateTo('/wedding-journal')}
            className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 h-[38px] sm:h-[40px] md:h-[42px] border border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent hover:bg-[var(--theme-primary)]/10 rounded-[6px] sm:rounded-[8px] font-semibold text-xs sm:text-[13px] uppercase tracking-[0.2em] font-sans-premium transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-xs cursor-pointer"
          >
            <span>VIEW ALL ARTICLES</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--theme-primary)] group-hover:text-[var(--theme-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
}
