import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { smoothScrollTo } from '../utils/scroll';
import { navigateTo } from '../utils/router';

export default function Footer() {
  const { venue } = useVenue();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
      smoothScrollTo(e, href);
    }
  };

  return (
    <footer className="w-full bg-[#153426] text-[#FAF7F2] pt-16 md:pt-20 pb-0 relative overflow-hidden" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-12 lg:mb-16">
        
        {/* COLUMN 1: BRAND IDENTITY */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4 space-y-4 md:space-y-6 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 
              className="font-serif-editorial text-[#FAF7F2] tracking-[0.05em] uppercase"
              style={{ fontSize: '24px', lineHeight: '26px', fontWeight: 'bold' }}
            >
              {venue.venueName.replace(/^the\s+/i, '')}
            </h3>
            <span 
              className="uppercase tracking-[0.25em] text-[#C9A227] block"
              style={{ fontSize: '12px', lineHeight: '16.5px', fontWeight: 'bold' }}
            >
              {venue.city}
            </span>
          </div>

          <p className="text-[15px] text-[#E7E5DD] leading-relaxed max-w-sm font-sans-premium">
            A royal wedding resort in {venue.city}, offering spacious lawns, banquet halls, and dedicated hospitality for life's most cherished celebrations.
          </p>

          {(venue.instagram?.trim() || venue.facebook?.trim() || venue.youtube?.trim() || venue.linkedin?.trim()) && (
            <div className="flex items-center gap-3 pt-2">
              {venue.instagram?.trim() && (
                <a 
                  href={venue.instagram.trim()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group w-[40px] h-[40px] rounded-full border border-[#C9A227]/55 hover:border-[#C9A227] bg-[#1B4332]/20 hover:bg-[#1B4332] text-[#C9A227] hover:text-[#FAF7F2] flex items-center justify-center transition-all duration-[250ms] ease-out hover:-translate-y-[1px] cursor-pointer"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-[17px] h-[17px] fill-none stroke-[#C9A227] group-hover:stroke-[#FAF7F2] transition-all duration-[250ms] ease-out" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {venue.facebook?.trim() && (
                <a 
                  href={venue.facebook.trim()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group w-[40px] h-[40px] rounded-full border border-[#C9A227]/55 hover:border-[#C9A227] bg-[#1B4332]/20 hover:bg-[#1B4332] text-[#C9A227] hover:text-[#FAF7F2] flex items-center justify-center transition-all duration-[250ms] ease-out hover:-translate-y-[1px] cursor-pointer"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-[17px] h-[17px] fill-[#C9A227] group-hover:fill-[#FAF7F2] transition-all duration-[250ms] ease-out" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {venue.youtube?.trim() && (
                <a 
                  href={venue.youtube.trim()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group w-[40px] h-[40px] rounded-full border border-[#C9A227]/55 hover:border-[#C9A227] bg-[#1B4332]/20 hover:bg-[#1B4332] text-[#C9A227] hover:text-[#FAF7F2] flex items-center justify-center transition-all duration-[250ms] ease-out hover:-translate-y-[1px] cursor-pointer"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <svg className="w-[17px] h-[17px] fill-[#C9A227] group-hover:fill-[#FAF7F2] transition-all duration-[250ms] ease-out" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.53 12 3.53 12 3.53s-7.53 0-9.388.525a3.003 3.003 0 0 0-2.11 2.108C0 8.02 0 12 0 12s0 3.98.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.525 9.388.525 9.388.525s7.53 0 9.388-.525a3.003 3.003 0 0 0 2.11-2.108C24 15.98 24 12 24 12s0-3.98-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {venue.linkedin?.trim() && (
                <a 
                  href={venue.linkedin.trim()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group w-[40px] h-[40px] rounded-full border border-[#C9A227]/55 hover:border-[#C9A227] bg-[#1B4332]/20 hover:bg-[#1B4332] text-[#C9A227] hover:text-[#FAF7F2] flex items-center justify-center transition-all duration-[250ms] ease-out hover:-translate-y-[1px] cursor-pointer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="w-[16px] h-[16px] fill-[#C9A227] group-hover:fill-[#FAF7F2] transition-all duration-[250ms] ease-out" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* COLUMN 2: EXPLORE */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-2 space-y-3 md:space-y-5 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h4 
            className="text-[15px] uppercase tracking-[0.2em] font-semibold text-[#C9A227]"
            style={{ color: venue.themeChampagneGold || '#C9A227' }}
          >
            EXPLORE
          </h4>
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-2.5 text-[15px] font-medium font-sans-premium">
            {[
              { label: "The Resort", href: "#introduction" },
              { label: "Spaces", href: "#spaces" },
              { label: "Celebrations", href: "#celebrations" },
              { label: "Experience", href: "#experiences" },
              { label: "Gallery", href: "#gallery" },
              { label: "FAQ", href: "#faq" },
              { label: "Journal", href: "/wedding-journal", isRoute: true },
              { label: "Contact", href: "#enquiry" }
            ].map((link) => (
              link.isRoute ? (
                <button
                  key={link.label}
                  onClick={() => navigateTo(link.href)}
                  className="group flex items-center gap-2 text-[#E7E5DD] hover:text-[#FAF7F2] transition-colors duration-[250ms] ease-out cursor-pointer"
                >
                  <span className="w-0 h-[1.2px] bg-[#C9A227] group-hover:w-3.5 transition-all duration-[250ms] ease-out shrink-0" />
                  <span className="transform group-hover:translate-x-[5px] transition-transform duration-[250ms] ease-out">{link.label}</span>
                </button>
              ) : (
                <a 
                  key={link.label}
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)} 
                  className="group flex items-center gap-2 text-[#E7E5DD] hover:text-[#FAF7F2] transition-colors duration-[250ms] ease-out"
                >
                  <span className="w-0 h-[1.2px] bg-[#C9A227] group-hover:w-3.5 transition-all duration-[250ms] ease-out shrink-0" />
                  <span className="transform group-hover:translate-x-[5px] transition-transform duration-[250ms] ease-out">{link.label}</span>
                </a>
              )
            ))}
          </div>
        </motion.div>

        {/* COLUMN 3: CELEBRATIONS */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3 space-y-3 md:space-y-5 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h4 
            className="text-[15px] uppercase tracking-[0.2em] font-semibold text-[#C9A227]"
            style={{ color: venue.themeChampagneGold || '#C9A227' }}
          >
            CELEBRATIONS
          </h4>
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-2.5 text-[15px] font-medium font-sans-premium">
            {[
              { label: "Weddings", href: "#celebrations" },
              { label: "Receptions", href: "#celebrations" },
              { label: "Engagements", href: "#celebrations" },
              { label: "Birthdays", href: "#celebrations" },
              { label: "Anniversaries", href: "#celebrations" },
              { label: "Private Celebrations", href: "#celebrations" },
              { label: "Corporate Events", href: "#celebrations" }
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)} 
                className="group flex items-center gap-2 text-[#E7E5DD] hover:text-[#FAF7F2] transition-colors duration-[250ms] ease-out"
              >
                <span className="w-0 h-[1.2px] bg-[#C9A227] group-hover:w-3.5 transition-all duration-[250ms] ease-out shrink-0" />
                <span className="transform group-hover:translate-x-[5px] transition-transform duration-[250ms] ease-out">{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* COLUMN 4: CONTACT */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-3 space-y-3 md:space-y-5 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h4 
            className="text-[15px] uppercase tracking-[0.2em] font-semibold text-[#C9A227]"
            style={{ color: venue.themeChampagneGold || '#C9A227' }}
          >
            CONTACT
          </h4>
          
          <div className="w-full max-w-[280px] sm:max-w-none mx-auto md:mx-0 flex flex-col items-start text-left space-y-3.5 font-sans-premium text-[15px] text-[#E7E5DD]">
            <div className="flex flex-row items-start gap-2.5 md:gap-3 text-left w-full">
              <MapPin className="w-[18px] h-[18px] text-[#C9A227] mt-0.5 shrink-0" strokeWidth={1.8} />
              <div className="space-y-0.5 text-left">
                <p className="leading-relaxed">
                  {venue.fullAddress}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-start gap-2.5 md:gap-3 text-left w-full">
              <Phone className="w-[18px] h-[18px] text-[#C9A227] mt-0.5 shrink-0" strokeWidth={1.8} />
              <div className="space-y-1 text-left">
                <a 
                  href={`tel:${(venue.phone || '').replace(/[^+\d]/g, '')}`} 
                  className="text-[#E7E5DD] hover:text-[#FAF7F2] transition-colors duration-250 tracking-wider block"
                >
                  {venue.phone}
                </a>
                {venue.phone2 && venue.phone2.trim() && venue.phone2.trim() !== venue.phone.trim() && (
                  <a 
                    href={`tel:${venue.phone2.replace(/[^+\d]/g, '')}`} 
                    className="text-[#E7E5DD] hover:text-[#FAF7F2] transition-colors duration-250 tracking-wider block"
                  >
                    {venue.phone2}
                  </a>
                )}
              </div>
            </div>

            <a 
              href={`mailto:${venue.email}`} 
              className="group flex flex-row items-start gap-2.5 md:gap-3 text-[#E7E5DD] hover:text-[#FAF7F2] transition-colors duration-250 text-left w-full"
            >
              <Mail className="w-[18px] h-[18px] text-[#C9A227] mt-0.5 group-hover:text-[#FAF7F2] group-hover:translate-x-0.5 transition-all duration-250 shrink-0" strokeWidth={1.8} />
              <div className="space-y-0.5 text-left min-w-0">
                <span className="block md:whitespace-nowrap [word-break:break-word]">{venue.email}</span>
              </div>
            </a>
          </div>
        </motion.div>

      </div>

      {/* Bottom Legal Disclaimer Area */}
      <div className="w-full bg-[#1B4332] mt-10 md:mt-12 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 py-3 sm:py-3.5 md:py-0 font-sans-premium">
          
          {/* Mobile Bottom Layout (< md) */}
          <div className="flex md:hidden flex-col gap-1.5">
            <div className="text-[12px] text-[#E7E5DD]/85 font-medium tracking-[0.01em] normal-case text-left">
              <span>© 2026 {venue.venueName}. All rights reserved.</span>
            </div>

            <div className="flex items-center justify-between gap-3 text-[12px] text-[#E7E5DD]/75 font-medium normal-case pt-0.5">
              <div className="flex items-center gap-4 sm:gap-5 whitespace-nowrap text-left">
                <button onClick={() => navigateTo('/privacy-policy')} className="hover:text-[#C9A227] transition-colors hover:underline cursor-pointer">Privacy Policy</button>
                <button onClick={() => navigateTo('/terms-and-conditions')} className="hover:text-[#C9A227] transition-colors hover:underline cursor-pointer">Terms &amp; Conditions</button>
              </div>

              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group w-9 h-9 rounded-full border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#153426] hover:border-[#C9A227] transition-all duration-300 shrink-0 ml-2 cursor-pointer bg-transparent"
                title="Back to Top"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current transition-transform duration-300 ease-out group-hover:-translate-y-[2px]" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Bottom Layout (>= md) */}
          <div className="hidden md:flex md:h-[56px] items-center justify-between gap-4 text-[13px] text-[#E7E5DD]/85 font-medium">
            <div>
              <span>© 2026 {venue.venueName}. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => navigateTo('/privacy-policy')} className="hover:text-[#C9A227] transition-colors hover:underline cursor-pointer">Privacy Policy</button>
              <button onClick={() => navigateTo('/terms-and-conditions')} className="hover:text-[#C9A227] transition-colors hover:underline cursor-pointer">Terms &amp; Conditions</button>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group w-9 h-9 rounded-full border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#153426] hover:border-[#C9A227] transition-all duration-300 shrink-0 ml-2 cursor-pointer bg-transparent"
                title="Back to Top"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current transition-transform duration-300 ease-out group-hover:-translate-y-[2px]" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
