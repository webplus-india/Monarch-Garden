import React, { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { ArticleSection } from '../types';

interface TocItem {
  id: string;
  label: string;
  level: 'h2' | 'h3';
}

interface TableOfContentsProps {
  sections: ArticleSection[];
}

/**
 * TableOfContents component for Royal Manor Wedding Journal articles.
 * Dynamically constructs navigation anchors from H2 section headings and H3 subheadings,
 * with active scroll highlight and smooth scroll offsets.
 */
export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  if (!sections || sections.length < 2) return null;

  // Extract H2 headings and H3 subheadings with matching section element anchor IDs
  const tocItems: TocItem[] = [];

  sections.forEach((section, idx) => {
    const sectionId = `section-${idx + 1}`;
    if (section.heading) {
      tocItems.push({
        id: sectionId,
        label: section.heading,
        level: 'h2'
      });
    }

    if (section.subheading) {
      tocItems.push({
        id: `${sectionId}-sub`,
        label: section.subheading,
        level: 'h3'
      });
    }

    if (section.subheadings && section.subheadings.length > 0) {
      section.subheadings.forEach((sub, sIdx) => {
        tocItems.push({
          id: `${sectionId}-sub-${sIdx + 1}`,
          label: sub.subheading,
          level: 'h3'
        });
      });
    }
  });

  if (tocItems.length === 0) return null;

  // Active heading scroll observer
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0.1
    });

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Initial scroll if URL contains hash
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveId(targetId);
        }, 150);
      }
    }
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpenMobile(false);
    setActiveId(id);
    
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const headerOffset = 100; // Fixed header offset to avoid covering heading
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav 
      aria-label="Table of Contents"
      className="my-8 rounded-2xl bg-[#FFFFFF] border border-[var(--theme-secondary-text)]/80 shadow-2xs overflow-hidden font-sans-premium"
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[var(--theme-secondary-text)]/60">
        <div className="flex items-center gap-2.5">
          <List className="w-4 h-4 text-[var(--theme-gold)] shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-[13px] uppercase tracking-[0.2em] font-bold text-[var(--theme-primary)]">
            In This Article (Table of Contents)
          </span>
        </div>

        {/* Mobile Expand / Collapse Toggle Button */}
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="md:hidden inline-flex items-center gap-1.5 text-xs text-[var(--theme-primary)] font-semibold cursor-pointer p-1 rounded hover:bg-[var(--theme-primary)]/5 transition-colors"
          aria-expanded={isOpenMobile}
          aria-label={isOpenMobile ? "Collapse Table of Contents" : "Expand Table of Contents"}
        >
          <span>{isOpenMobile ? 'Hide' : 'Show'}</span>
          {isOpenMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`p-4 sm:p-6 transition-all ${isOpenMobile ? 'block' : 'hidden md:block'}`}>
        <ul className="space-y-2 text-xs sm:text-sm font-sans-premium">
          {tocItems.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <li 
                key={`${item.id}-${index}`}
                className={item.level === 'h3' ? 'pl-4 sm:pl-5 border-l-2 border-[var(--theme-gold)]/40 my-1' : ''}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`inline-block leading-snug transition-colors cursor-pointer no-underline hover:no-underline focus:no-underline focus-visible:no-underline active:no-underline [text-decoration:none] ${
                    item.level === 'h2'
                      ? isActive
                        ? 'font-bold text-[var(--theme-primary)]'
                        : 'font-semibold text-[var(--theme-charcoal)] hover:text-[var(--theme-primary)]'
                      : isActive
                        ? 'font-medium text-[var(--theme-primary)]'
                        : 'text-[var(--theme-charcoal)]/75 hover:text-[var(--theme-primary)]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
