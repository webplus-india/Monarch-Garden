import React, { useState, useEffect } from 'react';

/**
 * ReadingProgressBar component for Wedding Journal articles.
 * Positioned cleanly below the sticky header (at top-17 / top-19), 
 * indicating article reading completion progress as the user scrolls.
 */
export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;

      if (totalScrollable > 0) {
        const currentProgress = Math.min(100, Math.max(0, (scrollY / totalScrollable) * 100));
        setScrollProgress(currentProgress);
      } else {
        setScrollProgress(0);
      }
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed top-[68px] md:top-[76px] left-0 right-0 z-50 h-[3px] bg-[var(--theme-secondary-text)]/40 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-[var(--theme-primary)] transition-all duration-100 ease-out rounded-r-full shadow-2xs"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
