import React, { createContext, useContext, useState, useEffect } from 'react';

export interface VenueData {
  venueName: string;
  venueType: string;
  city: string;
  state: string;
  country: string;
  tagline: string;
  phone: string;
  phone2: string;
  whatsApp: string;
  email: string;
  fullAddress: string;
  landmark: string;
  googleMaps: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  website: string;
  themePreset: string;
  themePrimaryColor: string;
  themeDarkColor: string;
  themeChampagneGold: string;
  themeBgColor: string;
  capacityText: string;
  sizeText: string;
  eventSpacesCount: string;
  heroImage: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  heroImagePosition: string;
  headerCtaText: string;
}

export interface VenueContextType {
  venue: VenueData;
  updateVenue: (data: Partial<VenueData>) => void;
  resetToDefault: () => void;
}

const DEFAULT_FULL_ADDRESS = "The Monarch Garden, Bypass Road, Muzaffarpur, Bihar 842001";

const buildGoogleMapsUrl = (fullAddress?: string, venueName?: string, city?: string) => {
  const query = (fullAddress || '').trim() || `${venueName || "The Monarch Garden"} ${city || "Muzaffarpur"}`.trim();
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
};

const buildGoogleMapsEmbedUrl = (fullAddress?: string, venueName?: string, city?: string) => {
  const query = (fullAddress || '').trim() || `${venueName || "The Monarch Garden"} ${city || "Muzaffarpur"}`.trim();
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
};

const extractIframeSrc = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.toLowerCase().includes('<iframe')) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) return match[1].trim();
  }
  return trimmed;
};

export const defaultVenue: VenueData = {
  venueName: "The Monarch Garden",
  venueType: "Wedding Resort & Lawn",
  city: "Muzaffarpur",
  state: "Bihar",
  country: "India",
  tagline: "A CELEBRATION WORTH REMEMBERING",
  phone: "+91 99999 99999",
  phone2: "+91 99999 99999",
  whatsApp: "+91 99999 99999",
  email: "enquiries@themonarchgarden.com",
  fullAddress: DEFAULT_FULL_ADDRESS,
  landmark: "Opposite premium residential corridors, 2 minutes from Bypass Interchange",
  googleMaps: buildGoogleMapsUrl(DEFAULT_FULL_ADDRESS, "The Monarch Garden", "Muzaffarpur"),
  googleMapsEmbedUrl: buildGoogleMapsEmbedUrl(DEFAULT_FULL_ADDRESS, "The Monarch Garden", "Muzaffarpur"),
  googleMapsDirectionsUrl: buildGoogleMapsUrl(DEFAULT_FULL_ADDRESS, "The Monarch Garden", "Muzaffarpur"),
  instagram: "https://www.instagram.com/themonarchgarden",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "",
  website: "https://themonarchgarden.com",
  themePreset: "burgundy",
  themePrimaryColor: "#1B4332",
  themeDarkColor: "#153426",
  themeChampagneGold: "#C9A227",
  themeBgColor: "#FAF7F2",
  capacityText: "800+ GUESTS CAPACITY",
  sizeText: "40,000+ SQ. FT.",
  eventSpacesCount: "3 EVENT SPACES",
  heroImage: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QVapRgcebgMjcmoZMvEAK9XtLPKMPPcV2mtXBM3r3ng7WJsmdF5nuJau1mrPNY71-7Gm_Sm5PopqXUG4mLIZocViZxToeaftMugQHQNE26iejAa91cgJuWS0tNPCIyz92OmrLPcA=s1360-w1360-h1020-rw",
  heroEyebrow: "A ROYAL WEDDING RESORT IN MUZAFFARPUR",
  heroHeadline: "Where Your Most Beautiful Moments Begin",
  heroDescription: "Discover elegant spaces, exceptional hospitality and a memorable setting for weddings, receptions and life's special celebrations in Muzaffarpur.",
  heroPrimaryCtaText: "PLAN YOUR WEDDING",
  heroSecondaryCtaText: "EXPLORE THE RESORT",
  heroImagePosition: "center",
  headerCtaText: "CHECK AVAILABILITY",
};

const STORAGE_KEY = 'venue_custom_config';

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export const VenueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venue, setVenue] = useState<VenueData>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const resolvedAddress =
          parsed.fullAddress === "Royal Manor, Shaheed Path Bypass Road, Lucknow, Uttar Pradesh, PIN 226002"
            ? defaultVenue.fullAddress
            : (parsed.fullAddress ?? defaultVenue.fullAddress);

        const resolvedName = parsed.venueName ?? defaultVenue.venueName;
        const resolvedCity = parsed.city ?? defaultVenue.city;

        const fallbackEmbedUrl = buildGoogleMapsEmbedUrl(resolvedAddress, resolvedName, resolvedCity);
        const fallbackDirectionsUrl = buildGoogleMapsUrl(resolvedAddress, resolvedName, resolvedCity);

        const resolvedDirectionsUrl =
          typeof parsed.googleMapsDirectionsUrl === 'string' && parsed.googleMapsDirectionsUrl.trim()
            ? parsed.googleMapsDirectionsUrl.trim()
            : (typeof parsed.googleMaps === 'string' && parsed.googleMaps.trim()
              ? parsed.googleMaps.trim()
              : fallbackDirectionsUrl);

        const resolvedEmbedUrl =
          typeof parsed.googleMapsEmbedUrl === 'string' && parsed.googleMapsEmbedUrl.trim()
            ? extractIframeSrc(parsed.googleMapsEmbedUrl)
            : fallbackEmbedUrl;

        const merged: VenueData = {
          ...defaultVenue,
          ...parsed,
          fullAddress: resolvedAddress,
          themePrimaryColor: defaultVenue.themePrimaryColor,
          themeDarkColor: defaultVenue.themeDarkColor,
          themeChampagneGold: defaultVenue.themeChampagneGold,
          themeBgColor: defaultVenue.themeBgColor,
          phone2: parsed.phone2 || parsed.whatsApp || defaultVenue.phone2,
          whatsApp: parsed.phone2 || parsed.whatsApp || defaultVenue.whatsApp,
          instagram: parsed.instagram !== undefined ? parsed.instagram : defaultVenue.instagram,
          facebook: parsed.facebook !== undefined ? parsed.facebook : defaultVenue.facebook,
          youtube: parsed.youtube !== undefined ? parsed.youtube : defaultVenue.youtube,
          linkedin: parsed.linkedin !== undefined ? parsed.linkedin : defaultVenue.linkedin,
          googleMapsEmbedUrl: resolvedEmbedUrl,
          googleMapsDirectionsUrl: resolvedDirectionsUrl,
          googleMaps: resolvedDirectionsUrl,
        };
        return merged;
      } catch {
        return defaultVenue;
      }
    }
    return defaultVenue;
  });

  const updateVenue = (data: Partial<VenueData>) => {
    setVenue((prev) => {
      const nextPhone2 = data.phone2 !== undefined ? data.phone2 : (data.whatsApp !== undefined ? data.whatsApp : prev.phone2);
      const nextAddress = data.fullAddress !== undefined ? data.fullAddress : prev.fullAddress;
      const nextName = data.venueName !== undefined ? data.venueName : prev.venueName;
      const nextCity = data.city !== undefined ? data.city : prev.city;

      const prevAutoEmbed = buildGoogleMapsEmbedUrl(prev.fullAddress, prev.venueName, prev.city);
      const prevAutoDirections = buildGoogleMapsUrl(prev.fullAddress, prev.venueName, prev.city);

      const addressOrIdentityChanged =
        nextAddress !== prev.fullAddress || nextName !== prev.venueName || nextCity !== prev.city;

      let nextEmbedUrl = prev.googleMapsEmbedUrl;
      if (data.googleMapsEmbedUrl !== undefined) {
        const cleanedEmbed = extractIframeSrc(data.googleMapsEmbedUrl);
        if (!cleanedEmbed) {
          nextEmbedUrl = buildGoogleMapsEmbedUrl(nextAddress, nextName, nextCity);
        } else if (addressOrIdentityChanged && cleanedEmbed === prev.googleMapsEmbedUrl && prev.googleMapsEmbedUrl === prevAutoEmbed) {
          nextEmbedUrl = buildGoogleMapsEmbedUrl(nextAddress, nextName, nextCity);
        } else {
          nextEmbedUrl = cleanedEmbed;
        }
      } else if (addressOrIdentityChanged && prev.googleMapsEmbedUrl === prevAutoEmbed) {
        nextEmbedUrl = buildGoogleMapsEmbedUrl(nextAddress, nextName, nextCity);
      }

      let nextDirectionsUrl = prev.googleMapsDirectionsUrl;
      const incomingDirections = data.googleMapsDirectionsUrl !== undefined ? data.googleMapsDirectionsUrl : data.googleMaps;
      if (incomingDirections !== undefined) {
        const cleanedDirections = incomingDirections.trim();
        if (!cleanedDirections) {
          nextDirectionsUrl = buildGoogleMapsUrl(nextAddress, nextName, nextCity);
        } else if (addressOrIdentityChanged && cleanedDirections === prev.googleMapsDirectionsUrl && prev.googleMapsDirectionsUrl === prevAutoDirections) {
          nextDirectionsUrl = buildGoogleMapsUrl(nextAddress, nextName, nextCity);
        } else {
          nextDirectionsUrl = cleanedDirections;
        }
      } else if (addressOrIdentityChanged && prev.googleMapsDirectionsUrl === prevAutoDirections) {
        nextDirectionsUrl = buildGoogleMapsUrl(nextAddress, nextName, nextCity);
      }

      const updated: VenueData = {
        ...prev,
        ...data,
        phone2: nextPhone2,
        whatsApp: nextPhone2,
        googleMapsEmbedUrl: nextEmbedUrl,
        googleMapsDirectionsUrl: nextDirectionsUrl,
        googleMaps: nextDirectionsUrl,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        venueName: updated.venueName,
        city: updated.city,
        phone: updated.phone,
        phone2: updated.phone2,
        whatsApp: updated.whatsApp,
        email: updated.email,
        fullAddress: updated.fullAddress,
        instagram: updated.instagram,
        facebook: updated.facebook,
        youtube: updated.youtube,
        linkedin: updated.linkedin,
        googleMapsEmbedUrl: updated.googleMapsEmbedUrl,
        googleMapsDirectionsUrl: updated.googleMapsDirectionsUrl,
        googleMaps: updated.googleMaps,
      }));
      return updated;
    });
  };

  const resetToDefault = () => {
    setVenue(defaultVenue);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', venue.themePrimaryColor || '#1B4332');
    root.style.setProperty('--theme-dark', venue.themeDarkColor || '#153426');
    root.style.setProperty('--theme-gold', venue.themeChampagneGold || '#C9A227');
    root.style.setProperty('--theme-bg', venue.themeBgColor || '#FAF7F2');
    root.style.setProperty('--theme-alt-bg', '#FAF9F6');
    root.style.setProperty('--theme-card-bg', '#FFFFFF');
    root.style.setProperty('--theme-terracotta', '#1B4332');
    root.style.setProperty('--theme-blush', '#FAF9F6');
    root.style.setProperty('--theme-charcoal', '#292B27');
    root.style.setProperty('--theme-secondary-text', '#E7E5DD');
    root.style.setProperty('--theme-footer-divider', '#52695B');

    const titleText = `${venue.venueName} | Wedding Resort in ${venue.city}`;
    const descText = `Discover ${venue.venueName}, a wedding resort in ${venue.city} offering elegant spaces, beautiful celebrations and exceptional hospitality for weddings, receptions and special occasions.`;
    const ogTitleText = `${venue.venueName} | A Wedding Resort in ${venue.city}`;
    const ogDescText = `Celebrate weddings and special occasions at ${venue.venueName}, ${venue.city}. Discover elegant spaces, beautiful celebrations and warm hospitality.`;

    const updateMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const syncHomepageMeta = () => {
      const currentPath = window.location.pathname;
      const isJournalArticleRoute =
        currentPath.startsWith('/wedding-journal/') &&
        currentPath.replace(/^\/wedding-journal\//, '').replace(/\/$/, '').length > 0;

      if (isJournalArticleRoute) {
        return;
      }

      const shareImageUrl = `${window.location.origin}/og-image.jpg`;
      const pageUrl = `${window.location.origin}${window.location.pathname}`;

      document.title = titleText;
      updateMeta('meta[name="description"]', 'name', 'description', descText);
      updateMeta('meta[property="og:title"]', 'property', 'og:title', ogTitleText);
      updateMeta('meta[property="og:description"]', 'property', 'og:description', ogDescText);
      updateMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);
      updateMeta('meta[property="og:image"]', 'property', 'og:image', shareImageUrl);
      updateMeta('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', shareImageUrl);
      updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitleText);
      updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', ogDescText);
      updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', shareImageUrl);
    };

    syncHomepageMeta();
    window.addEventListener('popstate', syncHomepageMeta);
    window.addEventListener('route-change', syncHomepageMeta);
    return () => {
      window.removeEventListener('popstate', syncHomepageMeta);
      window.removeEventListener('route-change', syncHomepageMeta);
    };
  }, [venue]);

  return (
    <VenueContext.Provider value={{ venue, updateVenue, resetToDefault }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenue = () => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error("useVenue must be used within a VenueProvider");
  }
  return context;
};
