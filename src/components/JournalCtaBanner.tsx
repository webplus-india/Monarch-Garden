import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { navigateTo } from '../utils/router';
import { useVenue } from '../context/VenueContext';

interface JournalCtaBannerProps {
  onOpenEnquiry: () => void;
  className?: string;
}

export default function JournalCtaBanner({ onOpenEnquiry, className = "" }: JournalCtaBannerProps) {
  const { venue } = useVenue();
  return (
    <section className={`w-full ${className}`}>
      <div className="relative bg-[#FFFFFF] border border-[var(--theme-gold)]/30 rounded-2xl p-8 sm:p-12 lg:p-14 overflow-hidden shadow-xs">
        {/* Subtle decorative gold corner accent details */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--theme-gold)]/40 pointer-events-none rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[var(--theme-gold)]/40 pointer-events-none rounded-br-2xl" />

        <div className="flex flex-col space-y-5 sm:space-y-6 relative z-10 text-left max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[11px] sm:text-xs font-sans-premium uppercase tracking-[0.22em] font-bold text-[var(--theme-gold)] block shrink-0">
              YOUR CELEBRATION BEGINS HERE
            </span>
            <div className="h-[1px] w-12 sm:w-16 bg-[var(--theme-gold)]/40" />
          </div>

          {/* Heading */}
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] text-[var(--theme-primary)] font-medium leading-[1.18] tracking-tight">
            Find the Perfect Setting for Your Celebration
          </h2>

          {/* Description Paragraph */}
          <p className="font-sans-premium text-sm sm:text-base text-[var(--theme-charcoal)]/80 leading-relaxed max-w-3xl">
            From intimate gatherings to grand wedding celebrations, discover the spaces and thoughtful hospitality that make every occasion memorable at {venue.venueName}, {venue.city}.
          </p>

          {/* CTA Buttons Row - Positioned Below Description Paragraph */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 sm:gap-4 pt-2 sm:pt-3 w-full">
            {/* Primary Button */}
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto h-[52px] px-6 sm:px-7 bg-[var(--theme-primary)] hover:bg-[var(--theme-dark)] text-[#FFFFFF] font-sans-premium text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] rounded-[10px] transition-all duration-300 ease-out shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2.5 shrink-0 group border border-[var(--theme-primary)] hover:border-[var(--theme-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 focus:ring-offset-[#FFFFFF]"
            >
              <Calendar className="w-4 h-4 text-[#FFFFFF] shrink-0 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
              <span className="whitespace-nowrap">CHECK AVAILABILITY</span>
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => navigateTo('/#spaces')}
              className="w-full sm:w-auto h-[52px] px-6 sm:px-7 bg-transparent hover:bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-sans-premium text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] rounded-[10px] transition-all duration-300 ease-out border border-[var(--theme-primary)] hover:border-[var(--theme-dark)] shadow-none hover:shadow-xs cursor-pointer flex items-center justify-center gap-2.5 shrink-0 group focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 focus:ring-offset-[#FFFFFF]"
            >
              <span className="whitespace-nowrap">EXPLORE OUR SPACES</span>
              <ArrowRight className="w-4 h-4 text-[var(--theme-primary)] group-hover:text-[var(--theme-gold)] group-hover:translate-x-1 transition-all duration-300 ease-out shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


