import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { JournalArticle } from '../types';
import WhatsAppIcon from './WhatsAppIcon';

interface SocialShareButtonsProps {
  article: JournalArticle;
  className?: string;
}

/**
 * Official Facebook SVG logomark
 */
function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/**
 * Official Instagram SVG logomark
 */
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/**
 * Official X (Twitter) SVG logomark
 */
function XTwitterIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * SocialShareButtons component for Royal Manor Wedding Journal articles.
 * Includes exactly four social share buttons in required order:
 * 1. WhatsApp
 * 2. Facebook
 * 3. Instagram
 * 4. X / Twitter
 * Styled strictly with Royal Manor's burgundy and ivory aesthetic.
 */
export default function SocialShareButtons({ article, className = '' }: SocialShareButtonsProps) {
  const [instagramCopied, setInstagramCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article.seoTitle || article.title;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;

  const handleInstagramShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setInstagramCopied(true);
        setTimeout(() => setInstagramCopied(false), 2500);
      }).catch(() => {});
    }
  };

  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-secondary-text)]/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-premium ${className}`}>
      {/* Eyebrow Label */}
      <div className="flex items-center gap-2.5">
        <Share2 className="w-4 h-4 text-[var(--theme-gold)] shrink-0" aria-hidden="true" />
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--theme-primary)]">
          Share This Article
        </span>
      </div>

      {/* Exactly 4 Branded Social Buttons in Required Order */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
        
        {/* 1. WhatsApp */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--theme-card-bg)] border border-[var(--theme-secondary-text)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-[var(--theme-bg)] text-[var(--theme-charcoal)]/85 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/40 min-h-[40px]"
          aria-label="Share article on WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 text-[var(--theme-primary)] group-hover:text-[var(--theme-bg)] transition-colors shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* 2. Facebook */}
        <a 
          href={facebookUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--theme-card-bg)] border border-[var(--theme-secondary-text)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-[var(--theme-bg)] text-[var(--theme-charcoal)]/85 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/40 min-h-[40px]"
          aria-label="Share article on Facebook"
        >
          <FacebookIcon className="w-4 h-4 text-[var(--theme-primary)] group-hover:text-[var(--theme-bg)] transition-colors shrink-0" />
          <span>Facebook</span>
        </a>

        {/* 3. Instagram */}
        <button
          onClick={handleInstagramShare}
          className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--theme-card-bg)] border border-[var(--theme-secondary-text)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-[var(--theme-bg)] text-[var(--theme-charcoal)]/85 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/40 cursor-pointer min-h-[40px]"
          aria-label="Copy link for Instagram sharing"
          title="Copies article link to clipboard for sharing on Instagram"
        >
          {instagramCopied ? (
            <>
              <Check className="w-4 h-4 text-[var(--theme-gold)] group-hover:text-[var(--theme-bg)] transition-colors shrink-0" />
              <span className="text-[var(--theme-primary)] group-hover:text-[var(--theme-bg)] font-bold">Link Copied!</span>
            </>
          ) : (
            <>
              <InstagramIcon className="w-4 h-4 text-[var(--theme-primary)] group-hover:text-[var(--theme-bg)] transition-colors shrink-0" />
              <span>Instagram</span>
            </>
          )}
        </button>

        {/* 4. X / Twitter */}
        <a 
          href={twitterUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--theme-card-bg)] border border-[var(--theme-secondary-text)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-[var(--theme-bg)] text-[var(--theme-charcoal)]/85 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/40 min-h-[40px]"
          aria-label="Share article on X / Twitter"
        >
          <XTwitterIcon className="w-3.5 h-3.5 text-[var(--theme-primary)] group-hover:text-[var(--theme-bg)] transition-colors shrink-0" />
          <span>X / Twitter</span>
        </a>

      </div>
    </div>
  );
}
