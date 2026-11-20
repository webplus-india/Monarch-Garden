import React from 'react';
import { JournalArticle } from '../types';

interface ArticleIntroBoxProps {
  article: JournalArticle;
  FormattedTextComponent?: React.ComponentType<{ text: string }>;
}

/**
 * Reusable Lead Introduction Box for Royal Manor Wedding Journal Articles.
 * Features a warm ivory background, subtle burgundy left accent border, and 
 * refined editorial typography. Keeps the opening lead in the highlighted box 
 * and renders any remaining intro paragraphs seamlessly in the standard body flow.
 */
export default function ArticleIntroBox({ article, FormattedTextComponent }: ArticleIntroBoxProps) {
  const introParagraphs = article.introParagraphs && article.introParagraphs.length > 0 
    ? article.introParagraphs 
    : [article.intro || article.excerpt];

  // Lead opening paragraph for the highlighted box
  const openingLead = introParagraphs[0];
  
  // Remaining intro paragraphs to be rendered in standard article body flow directly below the box
  const remainingParagraphs = introParagraphs.slice(1);

  const renderText = (text: string) => {
    if (FormattedTextComponent) {
      return <FormattedTextComponent text={text} />;
    }
    return text;
  };

  return (
    <div className="space-y-6">
      {/* Standardized Royal Manor Lead Highlighted Box */}
      <div className="p-6 sm:p-7 md:p-8 rounded-xl bg-[#FFFFFF] border border-[var(--theme-secondary-text)]/40 border-l-4 border-l-[var(--theme-primary)] text-[var(--theme-charcoal)]/90 font-serif-editorial italic text-[17px] sm:text-[18px] md:text-[19px] leading-[1.75] sm:leading-[1.8] shadow-2xs">
        <p className="leading-relaxed">
          {renderText(openingLead)}
        </p>
      </div>

      {/* Remaining Approved Introductory Paragraphs in Normal Article Flow */}
      {remainingParagraphs.length > 0 && (
        <div className="space-y-4 text-[16px] sm:text-[17px] md:text-[17px] leading-[1.78] text-[var(--theme-charcoal)]/85 font-sans-premium">
          {remainingParagraphs.map((para, pIdx) => (
            <p key={pIdx} className="leading-relaxed">
              {renderText(para)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
