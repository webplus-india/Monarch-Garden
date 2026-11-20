import React, { useEffect } from 'react';
import { X, Calendar, Clock, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { JournalArticle } from '../types';
import { useVenue } from '../context/VenueContext';
import LazyImage from './LazyImage';

interface ArticleModalProps {
  article: JournalArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: () => void;
}

export default function ArticleModal({ article, isOpen, onClose, onEnquire }: ArticleModalProps) {
  const { venue } = useVenue();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#141414]/75 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[var(--theme-bg)] text-[var(--theme-charcoal)] rounded-2xl shadow-2xl my-auto overflow-hidden border border-[var(--theme-secondary-text)]/60 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[var(--theme-bg)]/95 backdrop-blur-md border-b border-[var(--theme-secondary-text)]/40">
          <div className="flex items-center gap-3">
            <span 
              className="text-[11px] uppercase tracking-[0.2em] font-semibold font-sans-premium px-2.5 py-1 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
            >
              {article.category}
            </span>
            <span className="text-xs text-[var(--theme-charcoal)]/50 font-sans-premium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--theme-gold)]" />
              {article.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--theme-charcoal)]/60 hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8 font-sans-premium text-[var(--theme-charcoal)]">
          
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[var(--theme-charcoal)] font-medium leading-[1.25]">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs text-[var(--theme-charcoal)]/60 border-b border-[var(--theme-secondary-text)]/40 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--theme-gold)]" />
                Published {article.date}
              </span>
              <span>·</span>
              <span>By {venue.venueName} Editorial Team</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md">
            <LazyImage 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Excerpt Box */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--theme-alt-bg)] border-l-4 border-l-[var(--theme-primary)] text-base leading-relaxed text-[var(--theme-charcoal)]/90 font-serif-editorial italic">
            "{article.excerpt}"
          </div>

          {/* Article Main Sections */}
          <div className="space-y-6 text-base leading-relaxed text-[var(--theme-charcoal)]/85 font-sans-premium">
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                {section.heading && (
                  <h2 className="font-serif-editorial text-xl sm:text-2xl text-[var(--theme-charcoal)] font-medium pt-2">
                    {section.heading}
                  </h2>
                )}
                <p className="leading-relaxed">
                  {section.content}
                </p>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pl-5 pt-1 list-disc marker:text-[var(--theme-gold)]">
                    {section.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="text-[var(--theme-charcoal)]/85">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--theme-primary)] text-[var(--theme-bg)] space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--theme-gold)] block">
                PLANNING YOUR CELEBRATION?
              </span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#FFFFFF]">
                Explore Resort Availability
              </h3>
              <p className="text-xs sm:text-sm text-[#FFFFFF]/80 max-w-md">
                Connect with our team to arrange a personal visit or discuss suitable spaces for your date.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onEnquire();
              }}
              className="px-6 py-3 bg-[#FFFFFF] text-[var(--theme-primary)] hover:bg-[var(--theme-bg)] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
