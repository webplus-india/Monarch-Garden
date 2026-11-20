import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Calendar, Phone, MapPin } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { motion, AnimatePresence } from 'motion/react';
import { smoothScrollTo } from '../utils/scroll';
import { navigateTo } from '../utils/router';

interface HeaderProps {
  onOpenEnquiry: () => void;
  activeSection: string;
  isScrolled: boolean;
}

export default function Header({ onOpenEnquiry, activeSection, isScrolled }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const { venue } = useVenue();

  const navItems = [
    { label: "THE RESORT", href: "#introduction" },
    { label: "SPACES", href: "#spaces" },
    { label: "CELEBRATIONS", href: "#celebrations" },
    { label: "EXPERIENCE", href: "#experiences" },
    { label: "GALLERY", href: "#gallery" },
    { label: "CONTACT", href: "#enquiry" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      e.preventDefault();
      navigateTo('/' + href, { scrollToTop: false });
      setTimeout(() => {
        const sectionId = href.replace('#', '');
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      smoothScrollTo(e, href, 80);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigateTo('/');
    } else {
      smoothScrollTo(e, "#hero", 80);
    }
  };

  // Lock body scroll and listen for Escape key when mobile menu is open, restoring exact scroll position on close
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyTop = document.body.style.top;
      const originalBodyWidth = document.body.style.width;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.scrollTo(0, scrollY);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-[68px] md:h-[76px] flex items-center ${
          isScrolled 
            ? "bg-[#FCFBF8] border-b border-[rgba(27,67,50,0.10)] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)]" 
            : "bg-transparent border-b border-transparent"
        }`}
        id="main-app-header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
          
          {/* Typographic Logo Wordmark */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 group focus:outline-none cursor-pointer"
            id="brand-logo-link"
          >
            <div className="flex flex-col text-left">
              <span 
                className="font-serif-editorial tracking-[0.05em] transition-colors duration-300"
                style={{ color: isScrolled ? '#1B4332' : '#FAF7F2', fontSize: '22px', lineHeight: '22px', fontWeight: 'bold' }}
              >
                {venue.venueName.replace(/^the\s+/i, '').toUpperCase()}
              </span>
              <span 
                className={`uppercase tracking-[0.25em] font-sans-premium mt-1 transition-colors duration-300 ${
                  isScrolled ? "text-[#292524]/75" : "text-[#FAF7F2]/75"
                }`}
                style={{ fontSize: '11px', lineHeight: '14px', fontWeight: 'bold' }}
              >
                {venue.city.toUpperCase()}
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-[0.12em] font-medium font-sans-premium">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative py-1 text-[13px] font-medium tracking-[0.12em] uppercase inline-block transition-all duration-300 ease-out group focus:outline-none hover:scale-[1.05]"
                  style={{ 
                    color: isActive 
                      ? (isScrolled ? '#1B4332' : '#FFFFFF')
                      : (isScrolled ? '#292524' : '#FAF7F2'),
                    textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.75), 0 2px 8px rgba(0, 0, 0, 0.5)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isScrolled 
                      ? '#1B4332' 
                      : (venue.themeChampagneGold || '#C9A227');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive 
                      ? (isScrolled ? '#1B4332' : '#FFFFFF')
                      : (isScrolled ? '#292524' : '#FAF7F2');
                  }}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-[-2px] left-0 right-0 h-[1.5px] origin-left transition-transform duration-250 ease-out motion-reduce:transition-none ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    style={{ 
                      backgroundColor: isScrolled 
                        ? '#1B4332' 
                        : (venue.themeChampagneGold || '#C9A227') 
                    }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={onOpenEnquiry}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              className={`h-[43px] px-7 rounded-[12px] text-[12px] uppercase tracking-[0.15em] font-semibold font-sans-premium flex items-center justify-center gap-2 transition-all duration-300 ease-out cursor-pointer ${
                isScrolled 
                  ? "shadow-xs" 
                  : "border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-[2px]"
              }`}
              style={{
                backgroundColor: isScrolled 
                  ? (isCtaHovered ? (venue.themeDarkColor || '#153426') : (venue.themePrimaryColor || '#1B4332'))
                  : (isCtaHovered ? '#FAF7F2' : 'rgba(21, 52, 38, 0.35)'),
                color: isScrolled 
                  ? '#FAF7F2'
                  : (isCtaHovered ? (venue.themePrimaryColor || '#1B4332') : '#FAF7F2')
              }}
              id="header-cta-button"
            >
              <Calendar className="w-4 h-4 stroke-[1.8] shrink-0" />
              <span>{venue.headerCtaText || "CHECK AVAILABILITY"}</span>
            </button>
          </div>

          {/* Mobile Right Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-1.5 transition-colors focus:outline-none cursor-pointer ${isScrolled ? 'text-[#292524]' : 'text-[#FAF7F2]'}`}
              aria-label="Open mobile menu"
              id="mobile-menu-trigger"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                y: -8,
                transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
              }}
              transition={{ 
                duration: 0.28, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="fixed inset-0 z-[99999] w-full h-full bg-[#1B4332] text-[#FAF7F2] lg:hidden flex flex-col justify-between overflow-hidden overscroll-none select-none m-0 p-0 border-0 rounded-none shadow-none"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#1B4332',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box'
              }}
              id="mobile-nav-drawer"
            >
              {/* Inner Layout Wrapper - Continuous Full Viewport Flex Column */}
              <div className="flex flex-col h-full w-full justify-between bg-[#1B4332] overflow-hidden m-0 p-0 border-0 rounded-none">
                
                {/* Drawer Header - Fixed Top */}
                <div className="h-[64px] md:h-[72px] px-6 md:px-12 flex items-center justify-between border-b border-[#FAF7F2]/15 shrink-0 bg-[#1B4332] w-full">
                  <a 
                    href="/" 
                    onClick={handleLogoClick}
                    className="flex items-center gap-2 focus:outline-none cursor-pointer"
                    id="brand-logo-link-mobile"
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-serif-editorial text-[23px] md:text-[25px] tracking-[0.05em] font-medium leading-none text-[#FAF7F2]">
                        {venue.venueName.replace(/^the\s+/i, '').toUpperCase()}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-sans-premium font-semibold mt-1 text-[#FAF7F2]/75">
                        {venue.city.toUpperCase()}
                      </span>
                    </div>
                  </a>

                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: 0.15 }}
                    className="w-10 h-10 rounded-full border border-[#FAF7F2]/25 flex items-center justify-center text-[#FAF7F2] hover:bg-[#153426] focus:outline-none shrink-0 cursor-pointer"
                    aria-label="Close mobile menu"
                    id="mobile-menu-close"
                  >
                    <X className="w-5 h-5 stroke-[1.8]" />
                  </motion.button>
                </div>

                {/* Navigation Links Body - Full width flex-1 with subtle staggered fade-ins */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y px-6 md:px-12 flex flex-col w-full bg-[#1B4332]"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {/* Proportional top spacer - mobile only */}
                  <div style={{ flex: 3, minHeight: '8px' }} className="md:hidden" aria-hidden="true" />
                  {/* Tablet top spacer */}
                  <div className="hidden md:block md:h-8 shrink-0" aria-hidden="true" />

                  <nav className="flex flex-col w-full shrink-0">
                    {navItems.map((item, index) => {
                      const isActive = activeSection === item.href.substring(1);
                      const prefersReducedMotion = typeof window !== 'undefined' 
                        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                        : false;

                      return (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: prefersReducedMotion ? 0.2 : 0.35, 
                            delay: prefersReducedMotion ? 0 : 0.08 + index * 0.07, 
                            ease: [0.16, 1, 0.3, 1] 
                          }}
                          className={`hover:text-[#C9A227] transition-colors duration-300 flex items-center justify-between py-[7px] min-h-[48px] md:py-3 border-b border-[#FAF7F2]/15 group text-left ${
                            isActive ? 'text-[#C9A227]' : 'text-[#FAF7F2]'
                          }`}
                        >
                          <span className="font-serif-editorial text-[25px] md:text-[27px] tracking-[0.08em] font-medium group-hover:translate-x-1.5 transition-transform duration-300">
                            {item.label}
                          </span>
                          <span className={`text-base group-hover:text-[#C9A227] group-hover:translate-x-1 transition-all duration-300 font-sans-premium ${
                            isActive ? 'text-[#C9A227]' : 'text-[#FAF7F2]/70'
                          }`}>
                            →
                          </span>
                        </motion.a>
                      );
                    })}
                  </nav>

                  {/* Proportional bottom spacer */}
                  <div style={{ flex: 4, minHeight: '8px' }} className="md:hidden" aria-hidden="true" />
                  <div className="hidden md:block flex-1 min-h-6" aria-hidden="true" />
                </div>

                {/* Bottom Area: Contact Info + CTA - Full width pinned bottom */}
                <div className="shrink-0 flex flex-col bg-[#1B4332] border-t border-[#FAF7F2]/15 w-full px-6 md:px-12 pt-3.5 pb-4 md:pt-4 md:pb-5 pb-safe">
                  {/* Contact Information Area (Mobile & Tablet) */}
                  <div className="flex flex-col gap-2 md:gap-2.5 font-sans-premium font-medium text-[13.5px] md:text-[14.5px]">
                    <div className="flex flex-col gap-1">
                      <a
                        href={`tel:${(venue.phone || '+91 99349 26627').replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-2.5 text-[#FAF7F2]/85 hover:text-[#C9A227] transition-colors duration-250 py-0.5 group w-fit max-w-full"
                        aria-label={`Call ${venue.venueName}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C9A227] shrink-0 group-hover:scale-105 transition-transform duration-200" strokeWidth={1.8} />
                        <span className="tracking-wider">{venue.phone || "+91 99349 26627"}</span>
                      </a>
                      {venue.phone2 && venue.phone2.trim() && venue.phone2.trim() !== venue.phone.trim() && (
                        <a
                          href={`tel:${venue.phone2.replace(/[^+\d]/g, '')}`}
                          className="inline-flex items-center gap-2.5 text-[#FAF7F2]/85 hover:text-[#C9A227] transition-colors duration-250 py-0.5 group w-fit max-w-full"
                          aria-label={`Call ${venue.venueName} secondary number`}
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C9A227] shrink-0 group-hover:scale-105 transition-transform duration-200" strokeWidth={1.8} />
                          <span className="tracking-wider">{venue.phone2}</span>
                        </a>
                      )}
                    </div>

                    <a
                      href={venue.googleMapsDirectionsUrl || venue.googleMaps || `https://maps.google.com/?q=${encodeURIComponent(venue.fullAddress || `${venue.venueName} ${venue.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-[#FAF7F2]/80 hover:text-[#C9A227] transition-colors duration-250 py-0.5 group w-fit max-w-full text-left"
                      aria-label={`View ${venue.venueName} on Google Maps`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0 group-hover:scale-105 transition-transform duration-200" strokeWidth={1.8} />
                      <span className="tracking-wide leading-snug">{venue.fullAddress}</span>
                    </a>
                  </div>

                  {/* Subtle Divider between Contact Information and CTA */}
                  <div className="w-full h-[1px] bg-[#FAF7F2]/15 my-3 md:my-3.5 shrink-0" />

                  <motion.button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenEnquiry();
                    }}
                    whileTap={{ scale: 0.98, opacity: 0.92 }}
                    transition={{ duration: 0.15 }}
                    className="w-full text-[#FAF7F2] flex items-center justify-center gap-2.5 uppercase tracking-[0.18em] text-[16px] md:text-[17px] font-semibold font-sans-premium py-3.5 rounded-[12px] cursor-pointer shadow-lg hover:brightness-110"
                    style={{
                      backgroundColor: '#153426'
                    }}
                    id="mobile-menu-cta"
                  >
                    <Calendar className="w-4.5 h-4.5 stroke-[1.8] shrink-0 text-[#FAF7F2]" />
                    <span>{venue.headerCtaText || "CHECK AVAILABILITY"}</span>
                  </motion.button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

