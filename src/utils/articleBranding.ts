import { JournalArticle, ArticleSection } from '../types';
import { VenueData, defaultVenue } from '../context/VenueContext';

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Replaces hardcoded default venue/business references in Wedding Journal article strings
 * with the live venue values from VenueContext using a single-pass regex
 * to avoid double-replacement collisions.
 */
export function formatArticleTextWithVenue(text: string, venue: VenueData): string {
  if (!text) return text;

  const venueName = (venue.venueName || defaultVenue.venueName).trim();
  const city = (venue.city || defaultVenue.city).trim();
  const state = (venue.state || defaultVenue.state).trim();
  const phone = (venue.phone || defaultVenue.phone).trim();
  const email = (venue.email || defaultVenue.email).trim();
  const fullAddress = (venue.fullAddress || defaultVenue.fullAddress).trim();

  const replacementRules: Array<{ pattern: string; getValue: () => string }> = [
    {
      pattern: escapeRegExp('Royal Manor, Shaheed Path Bypass Road, Lucknow, Uttar Pradesh, PIN 226002'),
      getValue: () => fullAddress,
    },
    {
      pattern: escapeRegExp(defaultVenue.fullAddress),
      getValue: () => fullAddress,
    },
    {
      pattern: escapeRegExp(defaultVenue.email),
      getValue: () => email,
    },
    {
      pattern: escapeRegExp(defaultVenue.phone),
      getValue: () => phone,
    },
    {
      pattern: 'Royal Manor,\\s*Lucknow',
      getValue: () => `${venueName}, ${city}`,
    },
    {
      pattern: 'Royal Manor\\s+Lucknow',
      getValue: () => `${venueName} ${city}`,
    },
    {
      pattern: '\\bRoyal Manor\\b',
      getValue: () => venueName,
    },
    {
      pattern: `\\b${escapeRegExp(defaultVenue.state)}\\b`,
      getValue: () => state,
    },
    {
      pattern: `\\b${escapeRegExp(defaultVenue.city)}\\b`,
      getValue: () => city,
    },
  ];

  const combinedRegex = new RegExp(
    replacementRules.map((rule) => `(${rule.pattern})`).join('|'),
    'gi'
  );

  return text.replace(combinedRegex, (...args) => {
    // Capture groups start at index 1 up to replacementRules.length
    for (let i = 0; i < replacementRules.length; i++) {
      if (args[i + 1] !== undefined) {
        return replacementRules[i].getValue();
      }
    }
    return args[0];
  });
}

function brandSection(section: ArticleSection, venue: VenueData): ArticleSection {
  const f = (value?: string) => (value ? formatArticleTextWithVenue(value, venue) : value);
  const fArr = (values?: string[]) =>
    values ? values.map((v) => formatArticleTextWithVenue(v, venue)) : values;

  return {
    ...section,
    heading: f(section.heading),
    subheading: f(section.subheading),
    content: formatArticleTextWithVenue(section.content, venue),
    paragraphs: fArr(section.paragraphs),
    paragraphsAfterSubheading: fArr(section.paragraphsAfterSubheading),
    paragraphsAfterBullets: fArr(section.paragraphsAfterBullets),
    paragraphsAfterTable: fArr(section.paragraphsAfterTable),
    bulletPoints: fArr(section.bulletPoints),
    numberedPoints: fArr(section.numberedPoints),
    quote: f(section.quote),
    keyTakeaways: fArr(section.keyTakeaways),
    subheadings: section.subheadings
      ? section.subheadings.map((sub) => ({
          subheading: formatArticleTextWithVenue(sub.subheading, venue),
          paragraphs: sub.paragraphs.map((p) => formatArticleTextWithVenue(p, venue)),
        }))
      : section.subheadings,
    table: section.table
      ? {
          headers: section.table.headers.map((h) => formatArticleTextWithVenue(h, venue)),
          rows: section.table.rows.map((row) =>
            row.map((cell) => formatArticleTextWithVenue(cell, venue))
          ),
        }
      : section.table,
  };
}

/**
 * Returns a copy of a JournalArticle with all displayed business details
 * dynamically synced to the VenueData, preserving slugs/IDs/images.
 */
export function getBrandedArticle(article: JournalArticle, venue: VenueData): JournalArticle {
  const venueName = (venue.venueName || defaultVenue.venueName).trim();

  return {
    ...article,
    title: formatArticleTextWithVenue(article.title, venue),
    seoTitle: article.seoTitle
      ? formatArticleTextWithVenue(article.seoTitle, venue)
      : article.seoTitle,
    metaDescription: article.metaDescription
      ? formatArticleTextWithVenue(article.metaDescription, venue)
      : article.metaDescription,
    excerpt: formatArticleTextWithVenue(article.excerpt, venue),
    author: article.author
      ? formatArticleTextWithVenue(article.author, venue)
      : `${venueName} Editorial Team`,
    intro: article.intro ? formatArticleTextWithVenue(article.intro, venue) : article.intro,
    introParagraphs: article.introParagraphs
      ? article.introParagraphs.map((p) => formatArticleTextWithVenue(p, venue))
      : article.introParagraphs,
    sections: article.sections.map((section) => brandSection(section, venue)),
    conclusion: article.conclusion
      ? formatArticleTextWithVenue(article.conclusion, venue)
      : article.conclusion,
    faqs: article.faqs
      ? article.faqs.map((faq) => ({
          question: formatArticleTextWithVenue(faq.question, venue),
          answer: formatArticleTextWithVenue(faq.answer, venue),
        }))
      : article.faqs,
  };
}
