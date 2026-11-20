import React from 'react';
import { VENUE_SPACES } from '../types';
import { Users, Maximize2, ArrowRight } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { motion } from 'motion/react';
import LazyImage from './LazyImage';

interface SpacesSectionProps {
  onSelectSpace: (spaceName: string) => void;
}

export default function SpacesSection({ onSelectSpace }: SpacesSectionProps) {
  const { venue } = useVenue();

  return (
    <section id="spaces" className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E7E5DD]">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        
        {/* Editorial Section Header */}
        <motion.div 
          className="mb-10 sm:mb-12 lg:mb-[68px] text-center max-w-3xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span 
            className="site-section-eyebrow block mb-3 font-sans-premium" 
            style={{ color: venue.themeChampagneGold || '#C9A227' }}
          >
            THE SPACES
          </span>
          <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4">
            Spaces Designed for Every Celebration
          </h2>
          <div 
            className="w-16 h-[2px] mx-auto mb-5" 
            style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} 
          />
          <p className="site-section-description text-[#292B27]/85 leading-relaxed max-w-2xl mx-auto px-1 sm:px-0">
            From open-air gatherings to indoor celebrations, explore spaces suited to different moments of your event.
          </p>
        </motion.div>

        {/* Spaces Showcase with Alternating Layouts */}
        <div className="space-y-16 sm:space-y-20 md:space-y-28">
          {VENUE_SPACES.map((space, index) => {
            const isEven = index % 2 === 0;
            const displayNum = (index + 1).toString().padStart(2, '0');

            return (
              <div 
                key={space.id}
                className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
                id={`venue-space-${space.id}`}
              >
                {/* Space Image Area with Champagne Border & Subtle Zoom */}
                <motion.div 
                  className="w-full lg:w-[55%] relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="aspect-[3/2] border border-[#C9A227]/20 p-2 md:p-2.5 lg:p-2.5 bg-transparent shadow-[0_16px_48px_rgba(41,43,39,0.02)] relative overflow-hidden">
                    <LazyImage
                      src={space.image}
                      alt={space.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover scale-100 transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                    />
                  </div>
                  {/* Subtle offset frame lines to enhance catalog feel */}
                  <div className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 lg:-bottom-2.5 lg:-right-2.5 w-12 sm:w-16 h-12 sm:h-16 border-b border-r border-[#C9A227]/20 pointer-events-none" />
                </motion.div>

                {/* Space Text Block (Vertically Centered, Editorial) */}
                <motion.div 
                  className="w-full lg:w-[45%] text-left flex flex-col justify-center space-y-3.5 sm:space-y-4 md:space-y-5 lg:px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  {/* Small Editorial Number/Label */}
                  <span 
                    className="font-serif-editorial text-sm md:text-[15px] italic font-normal tracking-wider block"
                    style={{ color: venue.themeChampagneGold || '#C9A227' }}
                  >
                    Space {displayNum}
                  </span>
                  
                  {/* Space Name */}
                  <h3 className="font-serif-editorial celebration-title-fluid text-[#292B27] font-medium tracking-wide text-2xl sm:text-[28px] md:text-[34px] lg:text-[38px] xl:text-[40px] leading-tight md:leading-[1.18]">
                    {space.name}
                  </h3>

                  {/* Clean, Minimal Metadata with Refined Icons */}
                  <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-8 gap-y-2.5 pt-0.5 pb-0.5">
                    {/* Dimensions */}
                    {space.dimensions && (
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DD]">
                          <Maximize2 className="w-3.5 h-3.5" style={{ color: venue.themeChampagneGold || '#C9A227' }} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#C9A227] font-sans-premium space-meta-label md:text-[12.5px] lg:text-[12.5px] md:tracking-[0.12em]">
                            AREA
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-[#292B27] font-sans-premium space-meta-value md:text-[16.5px] lg:text-[16.5px]">
                            {space.dimensions}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Capacity */}
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DD]">
                        <Users className="w-3.5 h-3.5" style={{ color: venue.themeChampagneGold || '#C9A227' }} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#C9A227] font-sans-premium space-meta-label md:text-[12.5px] lg:text-[12.5px] md:tracking-[0.12em]">
                          CAPACITY
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-[#292B27] font-sans-premium space-meta-value md:text-[16.5px] lg:text-[16.5px]">
                          {space.capacity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* One Short Natural Description */}
                  <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium md:text-[16.5px] md:leading-[1.55] lg:text-[16px] lg:leading-[1.6]">
                    {space.description}
                  </p>

                  {/* Refined BOOK A VENUE VISIT CTA */}
                  <div className="pt-1 sm:pt-2 font-sans-premium">
                    <button
                      onClick={() => onSelectSpace(space.name)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold group transition-colors duration-300 text-[#292B27] cursor-pointer"
                      onMouseEnter={(e) => { e.currentTarget.style.color = venue.themePrimaryColor || '#1B4332'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#292B27'; }}
                    >
                      <span>BOOK A RESORT VISIT</span>
                      <ArrowRight 
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 shrink-0"
                        style={{ color: venue.themeChampagneGold || '#C9A227' }}
                        strokeWidth={2.4}
                      />
                    </button>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
