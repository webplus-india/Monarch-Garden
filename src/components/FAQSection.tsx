import React, { useState } from 'react';
import { FAQ_ITEMS } from '../types';
import { Plus, Minus } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQSection() {
  const { venue } = useVenue();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatFaqText = (text: string) =>
    text.replace(/Royal Manor/g, venue.venueName).replace(/Lucknow/g, venue.city);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      "name": formatFaqText(faq.question),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": formatFaqText(faq.answer)
      }
    }))
  };

  return (
    <section id="faq" className="pt-20 md:pt-28 pb-12 md:pb-16 bg-[#FFFFFF] relative overflow-hidden border-t border-[#E7E5DD]/60">
      {/* Schema.org Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} 
      />
      {/* Container with premium editorial spacing */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 xl:gap-x-16 items-start">
          
          {/* LEFT COLUMN: 50% width on desktop */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="site-section-eyebrow block mb-3 font-sans-premium" style={{ color: venue.themeChampagneGold || '#C9A227' }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-[0.01em] sm:tracking-wide max-w-[480px] lg:max-w-none mb-4 leading-[1.18] lg:leading-tight">
              <span className="block lg:whitespace-nowrap">Everything You Need </span>
              <span className="block lg:whitespace-nowrap">To Know Before You </span>
              <span className="block lg:whitespace-nowrap">Celebrate</span>
            </h2>
            
            {/* Short horizontal divider */}
            <div className="w-16 h-[2px] mb-5" style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} />
            
            <p className="site-section-description text-[#292B27]/85 leading-relaxed max-w-sm">
              A few practical details to help you plan your celebration at {venue.venueName}.
            </p>
          </motion.div>

          {/* RIGHT COLUMN: 50% width on desktop for Accordion */}
          <div className="lg:col-span-6 font-sans-premium">
            <div className="border-t border-[#E7E5DD] divide-y divide-[#E7E5DD]">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openIndex === index;
                const isHovered = hoveredIndex === index;
                const qNumber = `Q${index + 1}.`;

                const primaryGreen = venue.themePrimaryColor || '#1B4332';
                const champagneGold = venue.themeChampagneGold || '#C9A227';

                // Number color: primary green when active or hovered; champagne gold when closed & idle
                const numberColor = (isOpen || isHovered) ? primaryGreen : champagneGold;

                // Question text color: primary green when active or hovered; dark neutral #292B27 when closed & idle
                const questionColor = (isOpen || isHovered) ? primaryGreen : '#292B27';

                // Plus/Minus icon color: primary green when active or hovered; refined dark neutral #292B27 when closed & idle
                const iconColor = (isOpen || isHovered) ? primaryGreen : '#292B27';

                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ 
                      duration: 0.65, 
                      delay: index * 0.07, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="py-2.5 sm:py-3 first:pt-0"
                    id={`faq-item-${index}`}
                  >
                    {/* Header Action Button */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="w-full flex items-start justify-between text-left group focus:outline-none py-1 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4 sm:gap-6 pr-4 flex-1">
                        {/* Number */}
                        <span 
                          className="text-xs sm:text-sm font-medium tracking-wider select-none pt-[3px] transition-colors duration-300 shrink-0"
                          style={{ color: numberColor }}
                        >
                          {qNumber}
                        </span>
                        {/* Question Text */}
                        <span 
                          className="text-base sm:text-[18px] font-medium leading-snug tracking-wide transition-colors duration-300"
                          style={{ color: questionColor }}
                        >
                          {formatFaqText(faq.question)}
                        </span>
                      </div>
                      
                      {/* Plus / Minus Icon */}
                      <div className="pt-1.5 flex-shrink-0">
                        {isOpen ? (
                          <Minus 
                            className="w-4 h-4 transition-colors duration-300" 
                            style={{ color: iconColor }}
                            strokeWidth={1.5}
                          />
                        ) : (
                          <Plus 
                            className="w-4 h-4 transition-colors duration-300" 
                            style={{ color: iconColor }}
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                    </button>

                    {/* Answer Collapsible Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`faq-content-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.28, delay: 0.05, ease: "easeOut" }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.18, ease: "easeIn" }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          {/* Inner container to hold padding and layout restrictions */}
                          <motion.div 
                            initial={{ y: -6 }}
                            animate={{ y: 0 }}
                            exit={{ y: -4 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="pl-8 sm:pl-11 pr-4 pt-3 pb-2 max-w-[90%] md:max-w-[80%]"
                          >
                            <p className="text-sm sm:text-[15px] text-[#292B27]/80 leading-relaxed font-sans-premium">
                              {formatFaqText(faq.answer)}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
