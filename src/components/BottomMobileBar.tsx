import React, { useState, useEffect } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { motion, AnimatePresence } from 'motion/react';
import WhatsAppIcon from './WhatsAppIcon';

interface BottomMobileBarProps {
  onCheckDate?: () => void;
  onOpenEnquiry?: () => void;
  isModalOpen?: boolean;
}

export default function BottomMobileBar({ onCheckDate, onOpenEnquiry, isModalOpen = false }: BottomMobileBarProps) {
  const handleAction = onCheckDate || onOpenEnquiry || (() => {});
  const { venue } = useVenue();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const updateVisibilityAndScroll = () => {
      const currentScrollY = window.scrollY;
      const heroEl = document.getElementById('hero');
      const footerEl = document.getElementById('main-footer') || document.querySelector('footer');

      // Detect scroll direction with 6px threshold to prevent micro-jitter/flicker
      if (Math.abs(currentScrollY - lastScrollY.current) > 6) {
        if (currentScrollY < lastScrollY.current) {
          setIsScrollingUp(true);
        } else if (currentScrollY > lastScrollY.current) {
          setIsScrollingUp(false);
        }
        lastScrollY.current = currentScrollY;
      }

      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const heroInView = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        setIsHeroVisible(heroInView);
      } else {
        setIsHeroVisible(currentScrollY < 400);
      }

      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        const footerInView = footerRect.top < window.innerHeight && footerRect.bottom > 0;
        setIsFooterVisible(footerInView);
      } else {
        setIsFooterVisible(false);
      }
    };

    const heroEl = document.getElementById('hero');
    const footerEl = document.getElementById('main-footer') || document.querySelector('footer');

    // Primary IntersectionObserver detection
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (heroEl) heroObserver.observe(heroEl);
    if (footerEl) footerObserver.observe(footerEl);

    // Initial check on mount
    updateVisibilityAndScroll();

    // Passive scroll, resize, and popstate listeners for real-time fallback reactivity
    window.addEventListener('scroll', updateVisibilityAndScroll, { passive: true });
    window.addEventListener('resize', updateVisibilityAndScroll, { passive: true });
    window.addEventListener('popstate', updateVisibilityAndScroll);

    return () => {
      if (heroEl) heroObserver.unobserve(heroEl);
      if (footerEl) footerObserver.unobserve(footerEl);
      window.removeEventListener('scroll', updateVisibilityAndScroll);
      window.removeEventListener('resize', updateVisibilityAndScroll);
      window.removeEventListener('popstate', updateVisibilityAndScroll);
    };
  }, []);

  if (isModalOpen) return null;

  // Strip non-digits from the configured WhatsApp number
  const cleanPhone = (venue.whatsApp || venue.phone2 || venue.phone || '').replace(/\D/g, '');

  // Floating WhatsApp is visible in middle content sections (hidden in Hero and Footer)
  const isWhatsAppVisible = !isHeroVisible && !isFooterVisible;

  // Mobile sticky CTA bar is shown when scrolling up in middle content (hidden when scrolling down or in hero/footer)
  const isMobileBarVisible = !isHeroVisible && !isFooterVisible && isScrollingUp;

  return (
    <>
      {/* Floating WhatsApp Button - Hidden in Hero & Footer, Visible in Middle Content */}
      <AnimatePresence>
        {isWhatsAppVisible && (
          <motion.a 
            href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(venue.venueName)}%20${encodeURIComponent(venue.city)}%2C%20I%20would%20like%20to%20enquire%20about%20booking%20availability.`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className={`fixed right-4 lg:bottom-8 lg:right-8 z-[51] bg-[#1B4332] hover:bg-[#153426] text-white w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(27,67,50,0.38)] cursor-pointer transition-[bottom] duration-300 ${
              isMobileBarVisible ? 'bottom-[72px]' : 'bottom-3.5'
            }`}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Ultra Compact 58px Sticky Bottom Bar - Appears when scrolling down in main content, hides on scroll up & in hero/footer */}
      <AnimatePresence>
        {isMobileBarVisible && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7E5DD] px-4 pt-2.5 pb-2.5 h-[62px] lg:hidden shadow-[0_-8px_25px_rgba(41,43,39,0.03)] rounded-t-[16px] flex items-center justify-between gap-2.5 w-full font-sans-premium select-none pb-safe [transform:translate3d(0,0,0)] [will-change:transform,backdrop-filter]"
            id="mobile-action-bar"
          >
            {/* Outlined Call Now Button - Compact & Premium Tactile Animation */}
            <motion.a 
              href={`tel:${(venue.phone || '').replace(/[^+\d]/g, '')}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 h-[42px] rounded-[12px] border flex items-center justify-center gap-1.5 text-[13px] font-semibold tracking-[0.06em] text-center transition-all duration-200"
              style={{
                borderColor: `${venue.themePrimaryColor || '#1B4332'}33`, // 20% opacity border
                color: venue.themePrimaryColor || '#1B4332',
                backgroundColor: `${venue.themePrimaryColor || '#1B4332'}10`, // Subtle light green tint (approx 6% opacity)
              }}
              aria-label={`Call ${venue.venueName} Hospitality`}
            >
              <Phone className="w-3.5 h-3.5 stroke-[1.6]" />
              <span>Call Now</span>
            </motion.a>

            {/* Solid Check Availability Button - Compact & Premium Tactile Animation */}
            <motion.button 
              onClick={handleAction}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 h-[42px] rounded-[12px] border flex items-center justify-center gap-1.5 text-[13px] font-semibold tracking-[0.06em] text-center text-white transition-all duration-200 cursor-pointer shadow-sm hover:brightness-105 active:brightness-95"
              style={{ 
                backgroundColor: venue.themePrimaryColor || '#1B4332',
                borderColor: 'rgba(255, 255, 255, 0.2)' // 1px border with 20% opacity
              }}
              aria-label="Check Availability"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[1.6]" />
              <span>Check Availability</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
