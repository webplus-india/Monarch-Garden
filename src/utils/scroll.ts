import React from 'react';

/**
 * Unified premium smooth scroll helper with custom offset calculations
 * to prevent headers and sticky bars from overlapping target sections.
 */
export const smoothScrollTo = (
  e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
  href: string,
  headerOffset = 90
) => {
  e.preventDefault();
  const targetElement = document.querySelector(href);
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
