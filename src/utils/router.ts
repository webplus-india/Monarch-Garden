import { useState, useEffect } from 'react';
import { JOURNAL_ARTICLES, JournalArticle } from '../types';

export function navigateTo(url: string, options?: { scrollToTop?: boolean }) {
  // Scroll to top immediately before state transition to prevent IntersectionObserver layout race conditions
  if (options?.scrollToTop !== false) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }

  const currentUrl = window.location.pathname + window.location.search + window.location.hash;
  if (currentUrl !== url) {
    window.history.pushState({}, '', url);
  }

  // Dispatch custom route-change event alongside popstate to guarantee listener reactivity
  window.dispatchEvent(new Event('popstate'));
  window.dispatchEvent(new Event('route-change'));

  // Ensure scroll top is maintained after DOM update
  if (options?.scrollToTop !== false) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    });
  }
}

export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('route-change', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('route-change', handleRouteChange);
    };
  }, []);

  return pathname;
}

export function getArticleBySlugOrId(identifier: string): JournalArticle | undefined {
  // Remove leading /wedding-journal/ or /wedding-journal, strip query params, hashes and trailing slashes
  const pathWithoutPrefix = identifier.replace(/^\/wedding-journal\/?/, '');
  const cleanSlug = pathWithoutPrefix
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '')
    .trim();

  if (!cleanSlug) return undefined;

  return JOURNAL_ARTICLES.find(
    (article) => 
      article.slug === cleanSlug || 
      article.id === cleanSlug ||
      article.slug.toLowerCase() === cleanSlug.toLowerCase() ||
      article.id.toLowerCase() === cleanSlug.toLowerCase()
  );
}
