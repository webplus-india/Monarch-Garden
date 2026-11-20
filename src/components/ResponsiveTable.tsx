import React from 'react';
import { ArticleTable } from '../types';

interface ResponsiveTableProps {
  table: ArticleTable;
  FormattedTextComponent?: React.ComponentType<{ text: string }>;
}

/**
 * ResponsiveTable component for Royal Manor Wedding Journal articles.
 * Wraps comparison tables and budget worksheets in a touch-friendly, 
 * horizontally scrollable container with mobile scroll indicators, 
 * ensuring content never breaks layout or gets clipped on small viewports.
 */
export default function ResponsiveTable({ table, FormattedTextComponent }: ResponsiveTableProps) {
  if (!table || !table.headers || !table.rows) return null;

  const renderText = (text: string) => {
    if (FormattedTextComponent) {
      return <FormattedTextComponent text={text} />;
    }
    return text;
  };

  return (
    <div className="my-8 rounded-xl sm:rounded-2xl border border-[var(--theme-secondary-text)]/80 bg-[#FFFFFF] shadow-2xs overflow-hidden">
      {/* Mobile Horizontal Scroll Helper Banner */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#FCFBF8] border-b border-[var(--theme-secondary-text)]/60 text-[11px] sm:text-xs font-sans-premium text-[var(--theme-primary)] md:hidden">
        <span className="font-medium tracking-wide">Comparison Table</span>
        <span className="inline-flex items-center gap-1 text-[var(--theme-gold)] font-semibold">
          Scroll horizontally &rarr;
        </span>
      </div>

      {/* Horizontally Scrollable Container */}
      <div className="overflow-x-auto w-full touch-pan-x scrollbar-thin scrollbar-thumb-[var(--theme-gold)]/30 scrollbar-track-[var(--theme-bg)]">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px] sm:min-w-[640px]">
          <thead>
            <tr className="bg-[var(--theme-alt-bg)] border-b border-[var(--theme-secondary-text)]">
              {table.headers.map((header, hIdx) => (
                <th 
                  key={hIdx} 
                  className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif-editorial text-xs sm:text-sm md:text-base text-[var(--theme-primary)] font-semibold tracking-wider uppercase border-r border-[var(--theme-secondary-text)]/40 last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--theme-secondary-text)]/40 font-sans-premium">
            {table.rows.map((row, rIdx) => (
              <tr 
                key={rIdx} 
                className={rIdx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FCFBF8] hover:bg-[var(--theme-alt-bg)] transition-colors'}
              >
                {row.map((cell, cIdx) => (
                  <td 
                    key={cIdx} 
                    className={`px-4 sm:px-6 py-3.5 sm:py-4 leading-relaxed text-[var(--theme-charcoal)]/90 border-r border-[var(--theme-secondary-text)]/30 last:border-r-0 ${
                      cIdx === 0 ? 'font-semibold text-[var(--theme-charcoal)]' : ''
                    }`}
                  >
                    {renderText(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
