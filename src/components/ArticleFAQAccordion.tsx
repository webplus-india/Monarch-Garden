import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ArticleFAQAccordionProps {
  faqs?: FAQItem[];
  FormattedTextComponent?: React.ComponentType<{ text: string }>;
}

/**
 * ArticleFAQAccordion component for Royal Manor Wedding Journal articles.
 * Accessible, keyboard-friendly accordion for article-specific FAQs grounded strictly
 * in approved article advice and venue guide content. Refined for typography, natural height,
 * aligned chevrons, and smooth expand/collapse interaction.
 */
export default function ArticleFAQAccordion({ faqs, FormattedTextComponent }: ArticleFAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First FAQ open by default for immediate engagement

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index: number) => {
    setOpenIndexes(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const renderText = (text: string) => {
    if (FormattedTextComponent) {
      return <FormattedTextComponent text={text} />;
    }
    return text;
  };

  return (
    <section className="my-12 pt-8 border-t border-[var(--theme-secondary-text)]/60 space-y-6" aria-label="Frequently Asked Questions">
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <HelpCircle className="w-5 h-5 text-[var(--theme-gold)] shrink-0" aria-hidden="true" />
        <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--theme-charcoal)] font-medium leading-snug">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5 font-sans-premium">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          const buttonId = `faq-btn-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div 
              key={idx}
              className="rounded-xl border border-[var(--theme-secondary-text)]/80 bg-[#FFFFFF] overflow-hidden transition-all shadow-2xs"
            >
              {/* Question Row Control */}
              <button
                id={buttonId}
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FCFBF8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 min-h-[48px]"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-serif-editorial text-[16px] sm:text-[18px] md:text-[18px] font-medium text-[var(--theme-charcoal)] leading-[1.35] pr-1">
                  Q{idx + 1}. {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[var(--theme-primary)] shrink-0 mt-0.5 transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Expanded Answer Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div 
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
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
                    className="overflow-hidden border-t border-[var(--theme-secondary-text)]/40 bg-[#FCFBF8]/70"
                  >
                    <div className="px-4 sm:px-5.5 pb-5 pt-3.5 text-sm sm:text-base font-sans-premium text-[var(--theme-charcoal)]/85 leading-[1.7]">
                      <p className="break-words">
                        {renderText(faq.answer)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
