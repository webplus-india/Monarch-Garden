import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight, 
  ArrowLeft,
  Play, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  FlameKindling, 
  UtensilsCrossed, 
  Car, 
  Milestone, 
  Lightbulb, 
  Zap, 
  Instagram, 
  Facebook,
  Building2,
  ConciergeBell,
  CalendarCheck,
  Calendar,
  Music,
  Landmark,
  UserCheck,
  Camera,
  Crown,
  Flower2,
  Wand2
} from 'lucide-react';

// Import Types and Data
import { 
  WHY_ROYAL_MANOR_BENEFITS, 
  WEDDING_JOURNEY, 
  SERVICES, 
  TESTIMONIALS 
} from './types';

// Import Custom Modular Components
import Header from './components/Header';
import SpacesSection from './components/SpacesSection';
import GallerySection from './components/GallerySection';
import JournalSection from './components/JournalSection';
import FAQSection from './components/FAQSection';
import EnquiryAndLocation from './components/EnquiryAndLocation';
import { smoothScrollTo } from './utils/scroll';
import EnquiryModal from './components/EnquiryModal';
import VenueVisitModal from './components/VenueVisitModal';
import VideoModal from './components/VideoModal';
import BottomMobileBar from './components/BottomMobileBar';
import LazyImage from './components/LazyImage';
import WhatsAppIcon from './components/WhatsAppIcon';
import Footer from './components/Footer';
import JournalListingPage from './pages/JournalListingPage';
import JournalArticlePage from './pages/JournalArticlePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import { usePathname, getArticleBySlugOrId } from './utils/router';
import { useVenue } from './context/VenueContext';
import { useRef } from 'react';

const parseStat = (text: string) => {
  if (!text) return { num: 0, suffix: "" };
  const numOnly = text.replace(/[^0-9]/g, '');
  const suffixOnly = text.replace(/[0-9,]/g, '');
  return {
    num: parseInt(numOnly, 10) || 0,
    suffix: suffixOnly
  };
};

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  padZero?: boolean;
}

function RestrainedCountUp({ end, duration = 1.5, suffix = "", padZero = false }: CountUpProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  const formatNumber = (num: number) => {
    if (end >= 1000) {
      return num.toLocaleString();
    }
    if (padZero) {
      return num.toString().padStart(2, '0');
    }
    return num.toString();
  };

  return <span ref={nodeRef}>{formatNumber(count)}{suffix}</span>;
}

const CELEBRATION_SLIDES = [
  {
    id: "wedding",
    number: "01",
    eyebrow: "THE MAIN CELEBRATION",
    title: "WEDDINGS",
    description: "A beautiful setting for sacred rituals, joyful traditions and the beginning of a life together.",
    cta: "EXPLORE WEDDINGS →",
    href: "#wedding",
    image: "/assets/Celebrations/Wedding.jpg"
  },
  {
    id: "reception",
    number: "02",
    eyebrow: "AN EVENING TO REMEMBER",
    title: "RECEPTIONS",
    description: "An elegant evening of warm hospitality, beautiful décor and memorable moments together.",
    cta: "EXPLORE RECEPTIONS →",
    href: "#reception",
    image: "/assets/Celebrations/RECEPTIONS.jpg"
  },
  {
    id: "engagement",
    number: "03",
    eyebrow: "THE BEGINNING OF FOREVER",
    title: "ENGAGEMENTS",
    description: "Celebrate the first promise of forever in an intimate gathering with family and friends.",
    cta: "EXPLORE ENGAGEMENTS →",
    href: "#engagement",
    image: "/assets/Celebrations/ENGAGEMENTS.jpg"
  },
  {
    id: "haldi",
    number: "04",
    eyebrow: "THE MORNING OF JOY",
    title: "HALDI",
    description: "A vibrant setting for turmeric rituals, family laughter and joyful moments before the wedding.",
    cta: "EXPLORE HALDI →",
    href: "#haldi",
    image: "/assets/Celebrations/Haldi.jpg"
  },
  {
    id: "mehendi",
    number: "05",
    eyebrow: "AN EVENING OF TOGETHERNESS",
    title: "MEHENDI",
    description: "A relaxed celebration of intricate henna, music and treasured moments with loved ones.",
    cta: "EXPLORE MEHENDI →",
    href: "#mehendi",
    image: "/assets/Celebrations/Mehandi.jpg"
  },
  {
    id: "sangeet",
    number: "06",
    eyebrow: "MUSIC, MOVEMENT & CELEBRATION",
    title: "SANGEET",
    description: "An energetic evening of music, dance and performances shared with those who matter most.",
    cta: "EXPLORE SANGEET →",
    href: "#sangeet",
    image: "/assets/Celebrations/Sangeet.jpg"
  }
];

const MOBILE_CELEBRATIONS = [
  CELEBRATION_SLIDES.find(s => s.id === "wedding")!,
  CELEBRATION_SLIDES.find(s => s.id === "reception")!,
  CELEBRATION_SLIDES.find(s => s.id === "haldi")!,
  CELEBRATION_SLIDES.find(s => s.id === "mehendi")!,
  CELEBRATION_SLIDES.find(s => s.id === "sangeet")!,
  CELEBRATION_SLIDES.find(s => s.id === "engagement")!
];

export default function App() {
  const { venue } = useVenue();
  const pathname = usePathname();
  const sizeStat = parseStat(venue.sizeText ? venue.sizeText.split(' ')[0] : "40,000+");
  const capacityStat = parseStat(venue.capacityText ? venue.capacityText.split(' ')[0] : "800+");
  const spacesStat = parseStat(venue.eventSpacesCount ? venue.eventSpacesCount.split(' ')[0] : "3");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVenueVisitOpen, setIsVenueVisitOpen] = useState(false);
  const [selectedVisitSpace, setSelectedVisitSpace] = useState("The Grand Lawn");
  const [enquiryInitialDate, setEnquiryInitialDate] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeSlide, setActiveSlide] = useState(6);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const testimonialTouchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to target section when URL contains a hash (e.g., /#spaces)
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Seamless infinite loop boundary resetting
  useEffect(() => {
    const transitionDuration = 800; // matches transition duration
    if (activeSlide >= 12) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveSlide(6);
      }, transitionDuration);
      return () => clearTimeout(timer);
    } else if (activeSlide <= 5) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveSlide(11);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [activeSlide]);

  // Re-enable transition after silent warp reset
  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  // Testimonials Carousel Logic
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isHeroSecondaryHovered, setIsHeroSecondaryHovered] = useState(false);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTestimonialsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute total pages based on itemsPerPage
  const getPagesCount = () => {
    const poolLength = itemsPerPage === 2 && TESTIMONIALS.length % 2 !== 0 
      ? TESTIMONIALS.length + 1 
      : TESTIMONIALS.length;
    return Math.ceil(poolLength / itemsPerPage);
  };
  const totalTestimonialPages = getPagesCount();

  // Testimonial keyboard event navigation (when focused)
  const handleTestimonialKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setTestimonialIndex((prev) => (prev === 0 ? totalTestimonialPages - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setTestimonialIndex((prev) => (prev + 1) % totalTestimonialPages);
    }
  };

  // Testimonial touch event navigation (swiping)
  const handleTestimonialTouchStart = (e: React.TouchEvent) => {
    testimonialTouchStartX.current = e.touches[0].clientX;
  };

  const handleTestimonialTouchEnd = (e: React.TouchEvent) => {
    if (testimonialTouchStartX.current === null) return;
    const diffX = testimonialTouchStartX.current - e.changedTouches[0].clientX;
    testimonialTouchStartX.current = null;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left -> go to next page
        setTestimonialIndex((prev) => (prev + 1) % totalTestimonialPages);
      } else {
        // Swipe right -> go to previous page
        setTestimonialIndex((prev) => (prev === 0 ? totalTestimonialPages - 1 : prev - 1));
      }
    }
  };

  // Reset index to 0 if itemsPerPage changes and index is out of bounds
  useEffect(() => {
    if (testimonialIndex >= totalTestimonialPages) {
      setTestimonialIndex(0);
    }
  }, [itemsPerPage, totalTestimonialPages, testimonialIndex]);

  // Autoplay Effect
  useEffect(() => {
    if (!isTestimonialHovered && totalTestimonialPages > 1) {
      const interval = setInterval(() => {
        setTestimonialIndex((prev) => (prev + 1) % totalTestimonialPages);
      }, 5500); // 5.5-second interval
      return () => clearInterval(interval);
    }
  }, [isTestimonialHovered, totalTestimonialPages]);

  // Autoplay loop - advances approximately every 4s, paused on hover (except desktop)
  useEffect(() => {
    const shouldPauseOnHover = visibleCount !== 4;
    if (shouldPauseOnHover && isHovered) {
      return;
    }

    const duration = 4000;
    const step = 16;
    const increment = step / duration;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev + increment >= 1) {
          if (transitionEnabled) {
            setActiveSlide((current) => current + 1);
          }
          return 0;
        }
        return prev + increment;
      });
    }, step);

    return () => clearInterval(timer);
  }, [isHovered, visibleCount, transitionEnabled]);

  const handlePrevSlide = () => {
    if (!transitionEnabled) return;
    setSlideProgress(0);
    setActiveSlide((prev) => prev - 1);
  };

  const handleNextSlide = () => {
    if (!transitionEnabled) return;
    setSlideProgress(0);
    setActiveSlide((prev) => prev + 1);
  };

  // Keyboard navigation for active slider when visible
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (visibleCount === 4) return; // Disable manual navigation on desktop
      const celebrationsSection = document.getElementById("celebrations");
      if (!celebrationsSection) return;
      const rect = celebrationsSection.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInViewport) return;

      if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleCount, activeSlide, transitionEnabled]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diffX) > 50) {
      setSlideProgress(0);
      if (diffX > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
  };

  // Track scroll position to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "introduction", "why-us", "spaces", "celebrations", "gallery", "experiences", "faq", "journal", "enquiry"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openEnquiryWithDate = (dateString: string = "") => {
    setEnquiryInitialDate(dateString);
    setIsEnquiryOpen(true);
  };

  const handleOpenVenueVisit = (spaceName: string) => {
    setSelectedVisitSpace(spaceName);
    setIsVenueVisitOpen(true);
  };

  const handleCelebrationClick = (id: string) => {
    let targetId = "journey";
    if (id === "wedding") targetId = "journey-card-wedding";
    else if (id === "haldi") targetId = "journey-card-haldi";
    else if (id === "mehendi") targetId = "journey-card-mehendi";
    else if (id === "sangeet") targetId = "journey-card-sangeet";
    else if (id === "reception") targetId = "journey-card-wedding";
    else if (id === "engagement") targetId = "journey";

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Maps benefit titles to subtle elegant line icons so we avoid colorful SaaS graphics
  const getBenefitIcon = (title: string) => {
    switch(title) {
      case "GRAND EVENT SPACES":
        return <FlameKindling className="w-5 h-5 text-[#C9A227]" />;
      case "PREMIUM HOSPITALITY":
        return <Heart className="w-5 h-5 text-[#C9A227]" />;
      case "AMPLE PARKING":
        return <Car className="w-5 h-5 text-[#C9A227]" />;
      case "EXQUISITE CATERING":
      case "CATERING":
        return <UtensilsCrossed className="w-5 h-5 text-[#C9A227]" />;
      case "POWER BACKUP":
        return <Zap className="w-5 h-5 text-[#C9A227]" />;
      case "CENTRAL LOCATION":
        return <Milestone className="w-5 h-5 text-[#C9A227]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  const renderHeroHeadline = (text: string) => {
    if (!text) return null;
    
    // Check if it is the default headline or a close match to apply the precise 3-line editorial layout
    if (text.toLowerCase().replace(/\s+/g, ' ').trim().includes("where your most beautiful moments begin")) {
      return (
        <span className="block">
          Where Your Most<br />
          <span className="italic font-serif-editorial font-normal" style={{ color: venue.themeChampagneGold }}>Beautiful Moments</span><br />
          Begin
        </span>
      );
    }
    
    // Fallback split parser to inject italic/color to "Beautiful Moments" on any custom headline text
    const parts = text.split(/(Beautiful Moments)/i);
    return parts.map((part, index) => {
      if (part.toLowerCase() === "beautiful moments") {
        return (
          <span key={index} className="italic font-serif-editorial font-normal" style={{ color: venue.themeChampagneGold }}>
            Beautiful Moments
          </span>
        );
      }
      return part;
    });
  };

  // Route handling for standalone Wedding Journal pages
  if (pathname === '/wedding-journal' || pathname === '/wedding-journal/') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#292B27]">
        <JournalListingPage onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <BottomMobileBar onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <WhatsAppIcon />
        <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} initialDate={enquiryInitialDate} />
      </div>
    );
  }

  if (pathname.startsWith('/wedding-journal/')) {
    const slug = pathname.replace(/^\/wedding-journal\//, '').replace(/\/$/, '');
    const article = getArticleBySlugOrId(slug);
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#292B27]">
        {article ? (
          <JournalArticlePage article={article} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        ) : (
          <JournalListingPage onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        )}
        <BottomMobileBar onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <WhatsAppIcon />
        <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} initialDate={enquiryInitialDate} />
      </div>
    );
  }

  // Route handling for dedicated Privacy Policy page
  if (
    pathname === '/privacy-policy' || 
    pathname === '/privacy-policy/' ||
    pathname === '/privacy' ||
    pathname === '/privacy/'
  ) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#292B27]">
        <PrivacyPolicyPage onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <BottomMobileBar onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <WhatsAppIcon />
        <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} initialDate={enquiryInitialDate} />
      </div>
    );
  }

  // Route handling for dedicated Terms & Conditions page
  if (
    pathname === '/terms-and-conditions' || 
    pathname === '/terms-and-conditions/' ||
    pathname === '/terms' ||
    pathname === '/terms/' ||
    pathname === '/terms-conditions' ||
    pathname === '/terms-conditions/'
  ) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#292B27]">
        <TermsAndConditionsPage onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <BottomMobileBar onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <WhatsAppIcon />
        <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} initialDate={enquiryInitialDate} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="min-h-screen bg-[#FAF7F2] text-[#292B27] selection:text-[#FAF7F2]" 
      style={{ selectionBackgroundColor: venue.themePrimaryColor }}
    >
      {/* Hidden SEO Heading H1 for Premium Search Presence */}
      <h1 className="sr-only">Premium {venue.venueType} in {venue.city} | {venue.venueName}</h1>

      {/* Header component */}
      <Header 
        onOpenEnquiry={() => setIsEnquiryOpen(true)} 
        activeSection={activeSection}
        isScrolled={isScrolled}
      />

      {/* Cinematic Hero Section (AARANYA-inspired Editorial Left-Aligned Composition) */}
      <section 
        id="hero" 
        className="relative min-h-[640px] min-[390px]:min-h-[680px] min-[430px]:min-h-[700px] sm:min-h-[640px] md:min-h-0 md:h-[610px] lg:h-[670px] xl:h-[690px] flex items-center justify-start overflow-hidden bg-[#171717]"
      >
        {/* Full Screen Cinematic Image Background (Authentic Luxury Vibe) */}
        <div className="absolute inset-0 z-0">
          {/* Mobile Only: Direct eager loading image without any lazy loading delay */}
          <img 
            src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QVapRgcebgMjcmoZMvEAK9XtLPKMPPcV2mtXBM3r3ng7WJsmdF5nuJau1mrPNY71-7Gm_Sm5PopqXUG4mLIZocViZxToeaftMugQHQNE26iejAa91cgJuWS0tNPCIyz92OmrLPcA=s1360-w1360-h1020-rw" 
            alt={`${venue.venueName} Grand Wedding Hall lit beautifully with warm light`} 
            loading="eager"
            // @ts-ignore - fetchPriority prop in React JSX
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover block md:hidden ${
              venue.heroImagePosition === 'top' 
                ? 'object-top' 
                : venue.heroImagePosition === 'bottom' 
                ? 'object-bottom' 
                : 'object-[47%_42%]'
            }`}
          />

          {/* Desktop Only: LazyImage with progressive blur & skeleton shimmer */}
          <LazyImage 
            src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QVapRgcebgMjcmoZMvEAK9XtLPKMPPcV2mtXBM3r3ng7WJsmdF5nuJau1mrPNY71-7Gm_Sm5PopqXUG4mLIZocViZxToeaftMugQHQNE26iejAa91cgJuWS0tNPCIyz92OmrLPcA=s1360-w1360-h1020-rw" 
            alt={`${venue.venueName} Grand Wedding Hall lit beautifully with warm light`} 
            referrerPolicy="no-referrer"
            priority={true}
            darkSkeleton={true}
            className="hidden md:block w-full h-full"
            imgClassName={`w-full h-full object-cover opacity-100 transition-transform duration-1000 ${
              venue.heroImagePosition === 'top' 
                ? 'object-top' 
                : venue.heroImagePosition === 'bottom' 
                ? 'object-bottom' 
                : 'object-center'
            }`}
          />
          {/* Subtle Left-Aligned Dark Gradient scrim behind text for legibility while keeping stage & decor bright */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[75%] lg:w-[65%] bg-gradient-to-r from-[#141414]/70 via-[#171717]/45 via-55% to-transparent md:from-[#171717]/70 md:via-[#171717]/38 md:via-55% md:to-transparent pointer-events-none" />
          {/* Subtle Top Gradient for Header Contrast */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#171717]/24 md:from-[#171717]/32 to-transparent pointer-events-none" />
          {/* Desktop Only: Controlled Top-Right Gradient Shadow for Header Right-Side Text & Button Visibility */}
          <div className="hidden lg:block absolute top-0 right-0 w-[480px] h-28 bg-gradient-to-l from-[#171717]/45 via-[#171717]/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 min-[390px]:px-7 md:px-12 flex items-start h-full pt-[96px] min-[390px]:pt-[104px] md:pt-[100px] lg:pt-[115px] xl:pt-[120px] pb-[76px] md:pb-6 lg:pb-10">
          {/* Left aligned content block restricted to prevent text wrapping while preserving layout hierarchy */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-[70%] xl:max-w-[75%] text-left text-[#FAF7F2] flex flex-col"
          >
            
            {/* Eyebrow - Hidden on mobile, visible on desktop */}
            <span 
              className="hidden md:block text-xs sm:text-sm lg:text-[13.5px] uppercase tracking-[0.22em] font-semibold font-sans-premium mb-2.5 lg:mb-3"
              style={{ color: venue.themeChampagneGold || '#C9A227', textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}
            >
              A ROYAL WEDDING RESORT IN {(venue.city || "Lucknow").toUpperCase()}
            </span>

            {/* Headline - Increased size, bold and dominant presence on mobile */}
            <h2 
              className="font-serif-editorial text-[42px] min-[390px]:text-[46px] min-[430px]:text-[50px] md:text-[56px] lg:text-[64px] xl:text-[68px] 2xl:text-[72px] font-semibold md:font-medium leading-[1.05] md:leading-[1.04] lg:leading-[0.99] tracking-[0.01em] mb-4 min-[390px]:mb-5 md:mb-3 lg:mb-4 text-[#FAF7F2]"
              style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.75)' }}
            >
              {renderHeroHeadline(venue.heroHeadline || "Where Your Most Beautiful Moments Begin")}
            </h2>

            {/* Supporting Description */}
            <p 
              className="text-[16px] min-[390px]:text-[17.5px] md:text-base lg:text-[16.5px] xl:text-[17.5px] leading-[1.6] md:leading-[1.5] text-[#FFFFFF] font-sans-premium max-w-[350px] min-[390px]:max-w-[370px] md:max-w-[600px] mb-7 min-[390px]:mb-8 md:mb-5 lg:mb-[33px]"
              style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.85)' }}
            >
              Discover elegant spaces, exceptional hospitality and a memorable setting for weddings, receptions and life's special celebrations in Muzaffarpur.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col md:flex-row gap-[14px] md:gap-3 lg:gap-4 justify-start items-stretch md:items-center font-sans-premium w-full max-w-lg md:max-w-4xl">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full md:w-[220px] lg:w-[230px] h-[54px] min-[390px]:h-[56px] md:h-[48px] lg:h-[50px] text-[#FAF7F2] uppercase tracking-[0.16em] text-[13.5px] min-[390px]:text-[14px] md:text-[12px] lg:text-[13.5px] font-bold rounded-[14px] transition-all duration-[250ms] ease-out hover:brightness-110 hover:-translate-y-[1px] flex items-center justify-center cursor-pointer shadow-md"
                style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }}
                id="hero-primary-cta"
              >
                {venue.heroPrimaryCtaText || "PLAN YOUR WEDDING"}
              </button>
              
              <a
                href="#spaces"
                onClick={(e) => smoothScrollTo(e, "#spaces")}
                className="w-full md:w-[220px] lg:w-[230px] h-[54px] min-[390px]:h-[56px] md:h-[48px] lg:h-[50px] border-[1.5px] text-[#FAF7F2] hover:text-[#FAF7F2] uppercase tracking-[0.16em] text-[13.5px] min-[390px]:text-[14px] md:text-[12px] lg:text-[13.5px] font-bold rounded-[14px] transition-all duration-[250ms] ease-out hover:-translate-y-[1px] flex items-center justify-center group"
                style={{ 
                  borderColor: isHeroSecondaryHovered ? (venue.themeChampagneGold || '#C9A227') : 'rgba(250, 247, 242, 0.45)',
                  backgroundColor: isHeroSecondaryHovered ? 'rgba(201, 162, 39, 0.05)' : 'transparent',
                }}
                onMouseEnter={() => setIsHeroSecondaryHovered(true)}
                onMouseLeave={() => setIsHeroSecondaryHovered(false)}
                id="hero-secondary-cta"
              >
                <span>EXPLORE THE RESORT</span>
                <span 
                  className="ml-2 inline-block transition-all duration-[250ms] ease-out transform group-hover:translate-x-[4px] text-sm lg:text-[15px] font-semibold"
                  style={{ color: isHeroSecondaryHovered ? (venue.themeChampagneGold || '#C9A227') : '#FAF7F2' }}
                >
                  →
                </span>
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Premium "Signature Stats Rail" (Integrated Overlay with Bottom of Hero) */}
      <section 
        className="relative z-20 w-full max-w-6xl mx-auto px-3 min-[390px]:px-5 md:px-12 -mt-12 min-[390px]:-mt-14 md:-mt-14 lg:-mt-16 overflow-visible"
      >
        <div 
          className="w-full py-4 min-[390px]:py-5 px-1.5 min-[390px]:px-3 sm:px-4 md:py-5 lg:py-7 rounded-[20px] md:rounded-none border border-[#FAF7F2]/15 md:border-x-0 md:border-t md:border-b md:border-[#FAF7F2]/10 shadow-xl md:shadow-lg"
          style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-[#FAF7F2]/20 items-center justify-center text-center">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center px-0.5 min-[390px]:px-1.5 md:px-4 lg:px-8">
                <span className="font-serif-editorial text-[28px] min-[390px]:text-[32px] min-[430px]:text-[36px] md:text-4xl lg:text-[46px] font-medium leading-none" style={{ color: venue.themeChampagneGold || '#C9A227' }}>
                  <RestrainedCountUp end={sizeStat.num} suffix={sizeStat.suffix} duration={1.3} />
                </span>
                <span className="text-[10.5px] min-[390px]:text-[12px] md:text-[11px] lg:text-[13px] font-sans-premium uppercase tracking-[0.08em] md:tracking-[0.2em] font-bold text-[#FAF7F2] mt-2 md:mt-2.5 leading-tight">
                  SQ. FT.
                </span>
                <span className="text-[8.5px] min-[390px]:text-[9.5px] md:text-[10px] lg:text-[11px] font-sans-premium uppercase tracking-[0.04em] md:tracking-[0.12em] font-semibold md:font-medium text-[#FAF7F2]/85 md:text-[#FAF7F2]/80 mt-1 md:mt-1.5">
                  EXCLUSIVE AREA
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center px-0.5 min-[390px]:px-1.5 md:px-4 lg:px-8">
                <span className="font-serif-editorial text-[28px] min-[390px]:text-[32px] min-[430px]:text-[36px] md:text-4xl lg:text-[46px] font-medium leading-none" style={{ color: venue.themeChampagneGold || '#C9A227' }}>
                  <RestrainedCountUp end={capacityStat.num} suffix={capacityStat.suffix} duration={1.3} />
                </span>
                <span className="text-[10.5px] min-[390px]:text-[12px] md:text-[11px] lg:text-[13px] font-sans-premium uppercase tracking-[0.08em] md:tracking-[0.2em] font-bold text-[#FAF7F2] mt-2 md:mt-2.5 leading-tight">
                  GUESTS
                </span>
                <span className="text-[8.5px] min-[390px]:text-[9.5px] md:text-[10px] lg:text-[11px] font-sans-premium uppercase tracking-[0.04em] md:tracking-[0.12em] font-semibold md:font-medium text-[#FAF7F2]/85 md:text-[#FAF7F2]/80 mt-1 md:mt-1.5">
                  GRAND CAPACITY
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center px-0.5 min-[390px]:px-1.5 md:px-4 lg:px-8">
                <span className="font-serif-editorial text-[28px] min-[390px]:text-[32px] min-[430px]:text-[36px] md:text-4xl lg:text-[46px] font-medium leading-none" style={{ color: venue.themeChampagneGold || '#C9A227' }}>
                  <RestrainedCountUp end={spacesStat.num || 3} padZero={true} duration={1.3} />
                </span>
                <span className="text-[10.5px] min-[390px]:text-[12px] md:text-[11px] lg:text-[13px] font-sans-premium uppercase tracking-[0.08em] md:tracking-[0.2em] font-bold text-[#FAF7F2] mt-2 md:mt-2.5 leading-tight">
                  <span className="md:hidden">SPACES</span>
                  <span className="hidden md:inline">SIGNATURE SPACES</span>
                </span>
                <span className="text-[8.5px] min-[390px]:text-[9.5px] md:text-[10px] lg:text-[11px] font-sans-premium uppercase tracking-[0.04em] md:tracking-[0.12em] font-semibold md:font-medium text-[#FAF7F2]/85 md:text-[#FAF7F2]/80 mt-1 md:mt-1.5">
                  FOR EVERY CELEBRATION
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 01 — The Venue (Combined Storytelling and Core Advantages) */}
      <section id="introduction" className="pt-16 md:pt-20 lg:pt-[72px] pb-20 md:pb-28 lg:pb-32 bg-[#FCFBF8] overflow-hidden border-t border-[#E7E5DD]/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
            
            {/* Left Column: Portrait Venue Image (matched to Spaces section image frame) */}
            <motion.div 
              className="lg:col-span-5 relative group" 
              id="intro-image-frame"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/5] border border-[#E7E5DD] p-2.5 lg:p-3 bg-[#FFFFFF] shadow-[0_16px_48px_rgba(37,35,33,0.02)] relative overflow-hidden">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S4ESne-MvFwkdtbf3bsXDl1C7Tdkk5oVNcgcX_LGU7oWXhfsWZlRRbEtcsaZmWLYfZXj76t2SDrX8HQR3Zvr6NwNMuccOoEP_PeJWLTaxK58Mse_luUau8jrbZnA7ZFeTslawFKrW8vGM3=s1360-w1360-h1020-rw" 
                  alt={`Grand Wedding Architecture and Atmosphere of ${venue.venueName || "Royal Manor"}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-100 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                />
              </div>
              {/* Subtle offset corner detail matching Spaces section */}
              <div className="absolute -bottom-2.5 -right-2.5 lg:-bottom-3 lg:-right-3 w-12 lg:w-16 h-12 lg:h-16 border-b border-r border-[#C9A227]/20 pointer-events-none" />
            </motion.div>

            {/* Right Column: Editorial Copywriting */}
            <motion.div 
              className="lg:col-span-7 text-left lg:pl-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.2em] font-semibold block font-sans-premium mb-3" style={{ color: venue.themeChampagneGold || '#C9A227' }}>
                THE RESORT
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[45px] xl:text-[47px] text-[#292B27] font-medium tracking-[0.01em] leading-[1.12] mb-4">
                Designed for Celebrations<br />Built for Memories
              </h2>
              
              {/* Refined Primary Accent Line */}
              <div className="w-14 h-[2px] mb-6" style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} />

              <div className="space-y-6 lg:space-y-[26px] text-[#292B27]/85 font-sans-premium text-[16px] md:text-[17px] leading-relaxed lg:leading-[1.6] max-w-xl lg:max-w-[680px] mb-8 lg:mb-[36px]">
                <p>
                  {venue.venueName} is a spacious wedding resort in {venue.city}, designed to bring celebrations, family and hospitality together in one place. From intimate ceremonies to large wedding receptions, the resort offers flexible spaces for every part of the occasion.
                </p>
                <p>
                  With well-planned event spaces, attentive service, convenient parking and in-house catering, everything is thoughtfully arranged to make the day easier for you and your guests.
                </p>
              </div>

              <div className="font-sans-premium">
                <a 
                  href="#spaces"
                  onClick={(e) => smoothScrollTo(e, "#spaces")}
                  className="inline-flex items-center gap-2.5 text-xs md:text-[13px] uppercase tracking-[0.18em] font-semibold group transition-colors duration-300"
                  style={{ color: venue.themePrimaryColor || '#1B4332' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = venue.themeDarkColor || '#153426'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = venue.themePrimaryColor || '#1B4332'; }}
                >
                  <span>EXPLORE EVENT SPACES</span>
                  <ArrowRight 
                    className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 shrink-0"
                    style={{ color: venue.themeChampagneGold || '#C9A227' }}
                    strokeWidth={2.4}
                  />
                </a>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Section 03 — Venue Spaces (Interactive alternating component) */}
      <SpacesSection onSelectSpace={handleOpenVenueVisit} />

      {/* Celebrations We Host Section (Premium Editorial Wedding-Venue Experience) */}
      <section id="celebrations" className="py-20 md:py-28 bg-[#FCFBF8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Intro */}
          <motion.div 
            className="mb-10 md:mb-12 text-center max-w-4xl mx-auto flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span 
              className="site-section-eyebrow block font-sans-premium mb-3"
              style={{ color: venue.themeChampagneGold || '#C9A227' }}
            >
              THE CELEBRATIONS
            </span>
            <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4">
              Celebrations We Host
            </h2>
            <div className="w-16 h-[2px] bg-[#1B4332] mx-auto mb-4" style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} />
            
            {/* Category Tags Line — Hidden on Mobile, Visible on Desktop */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-xs sm:text-sm md:text-[13px] uppercase tracking-[0.18em] font-semibold font-sans-premium text-[#C9A227] mb-4 text-center px-2">
              <span>WEDDINGS</span>
              <span className="text-[#C9A227]/45 font-light">·</span>
              <span>RECEPTIONS</span>
              <span className="text-[#C9A227]/45 font-light">·</span>
              <span>ENGAGEMENTS</span>
              <span className="text-[#C9A227]/45 font-light">·</span>
              <span>HALDI</span>
              <span className="text-[#C9A227]/45 font-light">·</span>
              <span>MEHENDI</span>
              <span className="text-[#C9A227]/45 font-light">·</span>
              <span>SANGEET</span>
            </div>
            
            <p className="site-section-description text-[#292B27]/85 leading-relaxed font-sans-premium max-w-2xl mx-auto px-1 sm:px-0">
              From intimate pre-wedding rituals to grand celebrations, discover the perfect setting for every occasion.
            </p>
          </motion.div>

          {/* Mobile-Only Vertical Stacked Editorial Layout (< 768px) */}
          <div className="block md:hidden space-y-12">
            {MOBILE_CELEBRATIONS.map((slide, idx) => (
              <motion.div 
                key={`mobile-celebration-${slide.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleCelebrationClick(slide.id)}
                className="flex flex-col text-left group cursor-pointer"
              >
                {/* Celebration Image */}
                <div className="aspect-[3/4.2] w-full overflow-hidden relative border border-[#C9A227]/15 bg-[#FAF9F6] shadow-xs mb-3.5">
                  <LazyImage 
                    src={slide.image} 
                    alt={`${slide.title} at ${venue.venueName}`} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#153426]/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Block */}
                <div className="flex flex-col space-y-1.5">
                  <span 
                    className="text-[11px] uppercase tracking-[0.2em] font-semibold block font-sans-premium"
                    style={{ color: venue.themeChampagneGold || '#C9A227' }}
                  >
                    {slide.eyebrow}
                  </span>

                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#292B27] font-medium tracking-wide">
                    {slide.title}
                  </h3>

                  <p className="celebration-desc-fluid text-[#292B27]/80 font-sans-premium leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Celebration Card Showcase (Horizontal Slider >= 768px) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block relative" 
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => { if (visibleCount !== 4) setIsHovered(true); }}
            onMouseLeave={() => { if (visibleCount !== 4) setIsHovered(false); }}
            id="celebration-cards-slider"
          >
            <div className="overflow-hidden relative -mx-4 px-4">
              <div 
                className="flex"
                style={{ 
                  transform: `translateX(-${activeSlide * (100 / 18)}%)`,
                  width: `${(18 / visibleCount) * 100}%`,
                  transition: transitionEnabled ? 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
              >
                {[...CELEBRATION_SLIDES, ...CELEBRATION_SLIDES, ...CELEBRATION_SLIDES].map((slide, index) => (
                  <motion.div 
                    key={`${slide.id}-track-${index}`}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (index % 6) * 0.12, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="w-full flex-shrink-0 px-3 md:px-4"
                    style={{ width: `${100 / 18}%` }}
                    onClick={() => handleCelebrationClick(slide.id)}
                  >
                    <div className="flex flex-col text-left group cursor-pointer space-y-3 sm:space-y-4 bg-transparent h-full">
                      
                      {/* Image Block: dominant tall editorial portrait-style aspect ratio */}
                      <div className="aspect-[3/4.2] w-full overflow-hidden relative border border-[#C9A227]/10 group-hover:border-[#C9A227]/30 bg-[#FAF9F6] rounded-none shadow-xs group-hover:shadow-md transition-all duration-500 ease-out">
                        <LazyImage 
                          src={slide.image} 
                          alt={`${slide.title} at ${venue.venueName}`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                        {/* Refined gradient dark overlay at the bottom for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#153426]/40 via-[#153426]/10 to-transparent transition-opacity duration-300" />
                        {/* Interactive subtle darkening overlay on hover: preserved on tablet, removed on desktop */}
                        <div className="absolute inset-0 bg-[#153426]/25 opacity-0 md:max-lg:group-hover:opacity-100 lg:hidden transition-opacity duration-500 ease-out pointer-events-none" />
                      </div>

                      {/* Content block below the image with robust elements */}
                      <div className="flex flex-col flex-grow space-y-1 sm:space-y-1.5">
                        {/* Eyebrow */}
                        <span className="celebration-eyebrow-fluid uppercase font-semibold text-[#C9A227] block lg:tracking-[0.14em] lg:whitespace-nowrap">{slide.eyebrow}</span>

                        {/* Title */}
                        <h3 className="font-serif-editorial celebration-title-fluid text-[#292B27] group-hover:text-[#1B4332] font-medium tracking-wide transition-colors duration-300">
                          {slide.title}
                        </h3>

                        {/* Description */}
                        <p className="celebration-desc-fluid text-[#292B27]/80 font-sans-premium">
                          {slide.description}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Understated minimal slider controls */}
            <div className="mt-10 flex items-center justify-between border-t border-[#C9A227]/10 pt-6 lg:hidden">
              
              {/* Editorial progress: e.g. 01 / 06 */}
              <div className="flex items-center gap-3">
                <span className="font-serif-editorial text-lg text-[#292B27]">
                  {String((activeSlide % 6) + 1).padStart(2, '0')}
                </span>
                <span className="text-[#C9A227]/30 text-xs">/</span>
                <span className="font-sans-premium text-[11px] tracking-widest text-[#292B27]/40 uppercase">
                  06
                </span>
              </div>

              {/* Progress bar line indicator with dynamic real-time progress */}
              <div className="flex-1 max-w-md mx-8 h-[1px] bg-[#C9A227]/15 relative hidden sm:block">
                <div 
                  className="absolute left-0 top-0 h-full transition-all duration-[16ms] ease-linear"
                  style={{ 
                    backgroundColor: venue.themePrimaryColor || '#1B4332',
                    width: `${visibleCount === 1 ? (((activeSlide % 6) + 1) / 6) * 100 : (((activeSlide % 6) + slideProgress) / 6) * 100}%`
                  }}
                />
              </div>

              {/* Understated arrow button circles */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                  className="w-9 h-9 border border-[#C9A227]/20 rounded-full flex items-center justify-center text-[#292B27] hover:bg-[#292B27]/5 hover:border-[#C9A227]/40 transition-colors duration-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                  className="w-9 h-9 border border-[#C9A227]/20 rounded-full flex items-center justify-center text-[#292B27] hover:bg-[#292B27]/5 hover:border-[#C9A227]/40 transition-colors duration-300"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>

          {/* Chapter 02 — Beyond The Wedding */}
          <div className="mt-24 md:mt-28 pt-8" id="secondary-celebrations">
            
            {/* Header */}
            <motion.div 
              className="text-center max-w-3xl mx-auto flex flex-col items-center mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span 
                className="site-section-eyebrow block font-sans-premium mb-3 md:text-[12.5px] md:tracking-[0.12em]"
                style={{ color: venue.themeChampagneGold || '#C9A227' }}
              >
                MORE REASONS TO CELEBRATE
              </span>
              <h2 className="font-serif-editorial site-section-heading celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4 md:text-[46px] lg:text-[48px] md:leading-[1.15]">
                More Than Just Weddings
              </h2>
              <div className="w-16 h-[2px] bg-[#1B4332] mx-auto mb-5 shrink-0 block" style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} />
              <p className="site-section-description text-[#292B27]/85 leading-relaxed font-sans-premium max-w-2xl mx-auto md:text-[18px] md:leading-[1.6] lg:text-[16px] lg:leading-[1.6]">
                From birthdays and anniversaries to private family gatherings and corporate events, celebrate every occasion at {venue.venueName}.
              </p>
            </motion.div>

            {/* Refined compact visual grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-6 lg:gap-8">
              
              {/* 1. Birthdays */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col text-left space-y-3 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden border border-[#C9A227]/10 group-hover:border-[#C9A227]/30 bg-[#FAF9F6] relative rounded-none shadow-xs group-hover:shadow-md transition-all duration-500 ease-out">
                  <LazyImage 
                    src="/assets/Beyond%20The%20Wedding/Birthday%20Celebration.jpg" 
                    alt={`Birthdays at ${venue.venueName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col flex-grow pt-1">
                  <span className="celebration-eyebrow-fluid uppercase font-semibold text-[#C9A227] block mb-2 lg:tracking-[0.14em] lg:whitespace-nowrap">THE MILESTONE</span>
                  <h4 className="font-serif-editorial celebration-title-fluid text-[#292B27] group-hover:text-[#1B4332] font-medium tracking-wide mb-2.5 transition-colors duration-300">
                    Birthdays
                  </h4>
                  <p className="celebration-desc-fluid text-[#292B27]/85 font-sans-premium leading-relaxed">
                    Make every birthday memorable with joyful celebrations and moments shared with loved ones.
                  </p>
                </div>
              </motion.div>

              {/* 2. Anniversaries */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col text-left space-y-3 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden border border-[#C9A227]/10 group-hover:border-[#C9A227]/30 bg-[#FAF9F6] relative rounded-none shadow-xs group-hover:shadow-md transition-all duration-500 ease-out">
                  <LazyImage 
                    src="/assets/Beyond%20The%20Wedding/Anniversary.jpeg" 
                    alt={`Anniversaries at ${venue.venueName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col flex-grow pt-1">
                  <span className="celebration-eyebrow-fluid uppercase font-semibold text-[#C9A227] block mb-2 lg:tracking-[0.14em] lg:whitespace-nowrap">THE YEARS TOGETHER</span>
                  <h4 className="font-serif-editorial celebration-title-fluid text-[#292B27] group-hover:text-[#1B4332] font-medium tracking-wide mb-2.5 transition-colors duration-300">
                    Anniversaries
                  </h4>
                  <p className="celebration-desc-fluid text-[#292B27]/85 font-sans-premium leading-relaxed">
                    Honour the years, memories and milestones you have built together in a setting made for celebrating.
                  </p>
                </div>
              </motion.div>

              {/* 3. Private Celebrations */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col text-left space-y-3 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden border border-[#C9A227]/10 group-hover:border-[#C9A227]/30 bg-[#FAF9F6] relative rounded-none shadow-xs group-hover:shadow-md transition-all duration-500 ease-out">
                  <LazyImage 
                    src="/assets/Beyond%20The%20Wedding/Private%20Celebration.jpg" 
                    alt={`Private Celebrations at ${venue.venueName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col flex-grow pt-1">
                  <span className="celebration-eyebrow-fluid uppercase font-semibold text-[#C9A227] block mb-2 lg:tracking-[0.14em] lg:whitespace-nowrap">THE SPECIAL MOMENTS</span>
                  <h4 className="font-serif-editorial celebration-title-fluid text-[#292B27] group-hover:text-[#1B4332] font-medium tracking-wide mb-2.5 transition-colors duration-300">
                    Private Celebrations
                  </h4>
                  <p className="celebration-desc-fluid text-[#292B27]/85 font-sans-premium leading-relaxed">
                    From intimate family gatherings to special occasions, celebrate meaningful moments together.
                  </p>
                </div>
              </motion.div>

              {/* 4. Corporate Events */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col text-left space-y-3 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden border border-[#C9A227]/10 group-hover:border-[#C9A227]/30 bg-[#FAF9F6] relative rounded-none shadow-xs group-hover:shadow-md transition-all duration-500 ease-out">
                  <LazyImage 
                    src="/assets/Beyond%20The%20Wedding/Corporate%20Events.webp" 
                    alt={`Corporate Events at ${venue.venueName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col flex-grow pt-1">
                  <span className="celebration-eyebrow-fluid uppercase font-semibold text-[#C9A227] block mb-2 lg:tracking-[0.14em] lg:whitespace-nowrap">TIME WELL SPENT</span>
                  <h4 className="font-serif-editorial celebration-title-fluid text-[#292B27] group-hover:text-[#1B4332] font-medium tracking-wide mb-2.5 transition-colors duration-300">
                    Corporate Events
                  </h4>
                  <p className="celebration-desc-fluid text-[#292B27]/85 font-sans-premium leading-relaxed">
                    From business meetings to team gatherings, create memorable experiences for every occasion.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>



      {/* Section 05 - Royal Manor Experience */}
      <section id="experiences" className="py-24 md:py-32 bg-[#FCFBF8] text-[#292B27] relative overflow-hidden border-t border-[#E7E5DD]/60">
        {/* Subtle decorative framing */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#292B27]/5 pointer-events-none" />

        <div className="max-w-[1920px] mx-auto relative z-10">
          {/* Desktop specific layout matching exactly at 1920px (2xl:), but gracefully fluid for standard laptops (xl:) */}
          <div className="hidden xl:grid xl:grid-cols-[450px_1fr] 2xl:grid-cols-[625px_1fr] gap-[40px] 2xl:gap-[66px] items-start pl-8 pr-8 2xl:pl-[52px] 2xl:pr-[52px] w-full overflow-hidden">
            
             {/* Left Column: Premium 3-Image Editorial Collage */}
            <div className="relative xl:w-[450px] xl:h-[580px] 2xl:w-[625px] 2xl:h-[780px] mt-[60px] flex-shrink-0" id="experiences-image-frame-desktop">
              
              {/* Image 1: Dominant Main Image (Venue Architecture) */}
              <div className="absolute w-[82%] h-[74%] top-0 left-[9%] rounded-[20px] shadow-lg overflow-hidden group bg-[#FAF9F6] border border-[#E7E5DD]/20 z-10">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TA5kYOedjW-CujbNEadrmNrZmFppiEtoBVY2ZatSoYBYZCxWAYo6dNYBE3IeR62OGtkyB6xUF4b00lAsbY3fP3GoKiatCK3KCGor1wFHDWfbwk3kFTRRKU2cdxbu5-RD3OwdOhF_QdvTyp=s1360-w1360-h1020-rw" 
                  alt="Elegant grand wedding resort architecture and bespoke design decoration" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-[20px] overflow-hidden object-cover scale-100 transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Image 2: Smaller Overlapping Left Image (Wedding Mandap / Décor) */}
              <div className="absolute w-[42%] h-[38%] bottom-[6%] left-[calc(9%-16px)] rounded-[20px] shadow-2xl overflow-hidden border-[4px] border-[#FAF7F2] group bg-[#FAF9F6] z-20">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TjZSI1GVST2V55rU9uziw6vRzdYws8M_8zaBQU277XaXLfbj5fHIFBb7x68Xb-mZz_Ka-spImJ8n3UXzADfE_fNDJuBPsIOmbKe-tS3mRv_PxENYVgu0nZhctHcl5OMe8_-CIf=s1360-w1360-h1020-rw" 
                  alt={`Spectacular festival lighting and ambient setup at ${venue.venueName}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-[20px] overflow-hidden object-cover scale-100 transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Image 3: Smaller Overlapping Right Image (Ambience / Event Dining Space) */}
              <div className="absolute w-[46%] h-[40%] bottom-0 right-[calc(9%-16px)] rounded-[20px] shadow-2xl overflow-hidden border-[4px] border-[#FAF7F2] group bg-[#FAF9F6] z-20">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TJCBJ9DNnjH9posu1AMcH1TTdddsz1_LTVJm8bkoEg2Gmnbc1EAyy43BOP_wqEXgbHNJn7-lf7mS2fPe5xoddKXnc01tsJxl9dfzcyZPLzRLeEvP3wGhoypg9yHSOT-lwR65Q=s1360-w1360-h1020-rw" 
                  alt={`Exquisite dining and catering presentation at ${venue.venueName}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-[20px] overflow-hidden object-cover scale-100 transition-transform duration-700 group-hover:scale-102"
                />
              </div>

            </div>

            {/* Right Column: Content & 6 Experience Points */}
            <div className="text-left w-full xl:max-w-[700px] 2xl:max-w-[1065px] pt-0">
              <motion.div 
                className="flex flex-col items-start mb-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="site-section-eyebrow block font-sans-premium mb-3" style={{ color: venue.themeChampagneGold }}>
                  THE {venue.venueName.toUpperCase()} EXPERIENCE
                </span>
                <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4">
                  Built Around Your Celebration
                </h2>
                {/* Elegant green line below the heading */}
                <div className="w-16 h-[2px] mb-5" style={{ backgroundColor: venue.themePrimaryColor }} />
                <p className="site-section-description text-[#292B27]/85 leading-relaxed max-w-3xl">
                  From elegant spaces to seamless coordination, every detail comes together to make your celebration unforgettable.
                </p>
              </motion.div>

              {/* Thin horizontal divider below the intro area */}
              <div className="h-[1px] bg-[#E7E5DD]/40 w-full mt-6" />

              {/* Six Experience Points Grid with Horizontal Dividers - Compact, Grouped Rows */}
              <div className="relative" id="experiences-features-grid-desktop">
                {/* Row 1 */}
                <motion.div 
                  className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 2xl:gap-x-14 py-5 items-start"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
 
                  {/* Row 1 — Left (0): VENUE & SPACES */}
                  <div className="flex items-start gap-[18px] group w-full" id="experience-point-0-desktop">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)]"
                    >
                      <Landmark 
                        className="w-5 h-5 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                        style={{ color: venue.themePrimaryColor }}
                        strokeWidth={2.0}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[280px]">
                      <h3 
                        className="text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2.5px] group-hover:opacity-90" 
                        style={{ color: venue.themePrimaryColor }}
                      >
                        RESORT & SPACES
                      </h3>
                      <p className="text-sm md:text-base text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1.5px]">
                        Beautifully prepared spaces for ceremonies, receptions and celebrations, with options suited to different gatherings.
                      </p>
                    </div>
                  </div>
 
                  {/* Row 1 — Right (1): PERSONALISED SERVICE */}
                  <div className="flex items-start gap-[18px] group w-full" id="experience-point-1-desktop">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)]"
                    >
                      <UserCheck 
                        className="w-5 h-5 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                        style={{ color: venue.themePrimaryColor }}
                        strokeWidth={2.0}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[280px]">
                      <h3 
                        className="text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2.5px] group-hover:opacity-90" 
                        style={{ color: venue.themePrimaryColor }}
                      >
                        PERSONALISED SERVICE
                      </h3>
                      <p className="text-sm md:text-base text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1.5px]">
                        A dedicated team on hand throughout your event, helping coordinate the details and keeping the day well organised.
                      </p>
                    </div>
                  </div>
                </motion.div>
 
                {/* Subtle horizontal divider split into 2 columns (aligned with grid layout) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 2xl:gap-x-14 w-full" id="experiences-divider-1">
                  <div className="pl-[66px] w-full">
                    <div className="h-[1px] bg-[#E7E5DD]/40 w-full" />
                  </div>
                  <div className="pl-[66px] w-full hidden xl:block">
                    <div className="h-[1px] bg-[#E7E5DD]/40 w-full" />
                  </div>
                </div>
 
                {/* Row 2 */}
                <motion.div 
                  className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 2xl:gap-x-14 py-5 items-start"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
 
                  {/* Row 2 — Left (2): EVENT COORDINATION */}
                  <div className="flex items-start gap-[18px] group w-full" id="experience-point-2-desktop">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)]"
                    >
                      <CalendarCheck 
                        className="w-5 h-5 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                        style={{ color: venue.themePrimaryColor }}
                        strokeWidth={2.0}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[280px]">
                      <h3 
                        className="text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2.5px] group-hover:opacity-90" 
                        style={{ color: venue.themePrimaryColor }}
                      >
                        EVENT COORDINATION
                      </h3>
                      <p className="text-sm md:text-base text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1.5px]">
                        From setup and timings to working with vendors on the day, our team helps keep the arrangements moving smoothly.
                      </p>
                    </div>
                  </div>
 
                  {/* Row 2 — Right (3): MULTI-CUISINE CATERING */}
                  <div className="flex items-start gap-[18px] group w-full" id="experience-point-3-desktop">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)]"
                    >
                      <UtensilsCrossed 
                        className="w-5 h-5 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                        style={{ color: venue.themePrimaryColor }}
                        strokeWidth={2.0}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[280px]">
                      <h3 
                        className="text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2.5px] group-hover:opacity-90" 
                        style={{ color: venue.themePrimaryColor }}
                      >
                        MULTI-CUISINE CATERING
                      </h3>
                      <p className="text-sm md:text-base text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1.5px]">
                        Thoughtfully planned menus for your celebration, from familiar Indian favourites to dishes suited to larger wedding gatherings.
                      </p>
                    </div>
                  </div>
                </motion.div>
 
                {/* Subtle horizontal divider split into 2 columns (aligned with grid layout) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 2xl:gap-x-14 w-full" id="experiences-divider-2">
                  <div className="pl-[66px] w-full">
                    <div className="h-[1px] bg-[#E7E5DD]/40 w-full" />
                  </div>
                  <div className="pl-[66px] w-full hidden xl:block">
                    <div className="h-[1px] bg-[#E7E5DD]/40 w-full" />
                  </div>
                </div>
 
                {/* Row 3 */}
                <motion.div 
                  className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 2xl:gap-x-14 py-5 items-start"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
 
                  {/* Row 3 — Left (4): LIGHTING, SOUND & EVENT SUPPORT */}
                  <div className="flex items-start gap-[18px] group w-full" id="experience-point-4-desktop">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)]"
                    >
                      <Music 
                        className="w-5 h-5 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                        style={{ color: venue.themePrimaryColor }}
                        strokeWidth={2.0}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[280px]">
                      <h3 
                        className="text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2.5px] group-hover:opacity-90 md:whitespace-nowrap" 
                        style={{ color: venue.themePrimaryColor }}
                      >
                        LIGHTING, SOUND & EVENT SUPPORT
                      </h3>
                      <p className="text-sm md:text-base text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1.5px]">
                        Reliable event infrastructure and on-site support to help lighting, sound and essential arrangements run as planned.
                      </p>
                    </div>
                  </div>
 
                  {/* Row 3 — Right (5): PARKING & ARRIVAL */}
                  <div className="flex items-start gap-[18px] group w-full" id="experience-point-5-desktop">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)]"
                    >
                      <Car 
                        className="w-5 h-5 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                        style={{ color: venue.themePrimaryColor }}
                        strokeWidth={2.0}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-[280px]">
                      <h3 
                        className="text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2.5px] group-hover:opacity-90" 
                        style={{ color: venue.themePrimaryColor }}
                      >
                        PARKING & ARRIVAL
                      </h3>
                      <p className="text-sm md:text-base text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1.5px]">
                        Convenient access, professional valet support and ample parking to make arrival easy for you and your guests.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>

          </div>

          {/* Mobile/Tablet Responsive Layout */}
          <div className="xl:hidden flex flex-col items-center gap-10 md:gap-12 lg:gap-14 px-6 md:px-10 lg:px-16 max-w-3xl lg:max-w-4xl mx-auto w-full">
            
            {/* Mobile/Tablet: Centered 3-Image Editorial Collage */}
            <div className="relative w-full aspect-[4/5.2] max-w-[420px] md:max-w-[480px] lg:max-w-[520px] mx-auto select-none shrink-0" id="experiences-image-frame-mobile">
              
              {/* Image 1: Main Image */}
              <div className="absolute w-[82%] h-[74%] top-0 left-[9%] rounded-[20px] shadow-lg overflow-hidden group bg-[#FAF9F6] border border-[#E7E5DD]/20 z-10">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TA5kYOedjW-CujbNEadrmNrZmFppiEtoBVY2ZatSoYBYZCxWAYo6dNYBE3IeR62OGtkyB6xUF4b00lAsbY3fP3GoKiatCK3KCGor1wFHDWfbwk3kFTRRKU2cdxbu5-RD3OwdOhF_QdvTyp=s1360-w1360-h1020-rw" 
                  alt="Elegant grand wedding resort architecture and bespoke design decoration" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-[20px] overflow-hidden object-cover scale-100 transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Image 2: Smaller Left Overlapping Image */}
              <div className="absolute w-[42%] h-[38%] bottom-[6%] left-[calc(9%-12px)] rounded-[20px] shadow-2xl overflow-hidden border-[4px] border-[#FAF7F2] group bg-[#FAF9F6] z-20">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TjZSI1GVST2V55rU9uziw6vRzdYws8M_8zaBQU277XaXLfbj5fHIFBb7x68Xb-mZz_Ka-spImJ8n3UXzADfE_fNDJuBPsIOmbKe-tS3mRv_PxENYVgu0nZhctHcl5OMe8_-CIf=s1360-w1360-h1020-rw" 
                  alt={`Spectacular festival lighting and ambient setup at ${venue.venueName}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-[20px] overflow-hidden object-cover scale-100 transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Image 3: Smaller Right Overlapping Image */}
              <div className="absolute w-[46%] h-[40%] bottom-0 right-[calc(9%-12px)] rounded-[20px] shadow-2xl overflow-hidden border-[4px] border-[#FAF7F2] group bg-[#FAF9F6] z-20">
                <LazyImage 
                  src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TJCBJ9DNnjH9posu1AMcH1TTdddsz1_LTVJm8bkoEg2Gmnbc1EAyy43BOP_wqEXgbHNJn7-lf7mS2fPe5xoddKXnc01tsJxl9dfzcyZPLzRLeEvP3wGhoypg9yHSOT-lwR65Q=s1360-w1360-h1020-rw" 
                  alt={`Exquisite dining and catering presentation at ${venue.venueName}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-[20px] overflow-hidden object-cover scale-100 transition-transform duration-700 group-hover:scale-102"
                />
              </div>

            </div>

            {/* Content & Feature Rows */}
            <div className="text-center md:text-center space-y-6 w-full max-w-2xl lg:max-w-3xl mx-auto">
              <motion.div 
                className="flex flex-col items-center text-center mb-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="site-section-eyebrow block font-sans-premium mb-3" style={{ color: venue.themeChampagneGold }}>
                  THE {venue.venueName.toUpperCase()} EXPERIENCE
                </span>
                <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4">
                  Built Around Your Celebration
                </h2>
                <div className="w-16 h-[2px] mb-5 mx-auto" style={{ backgroundColor: venue.themePrimaryColor }} />
                <p className="site-section-description text-[#292B27]/85 leading-relaxed text-center max-w-xl lg:max-w-2xl mx-auto font-sans-premium">
                  From elegant spaces to seamless coordination, every detail comes together to make your celebration unforgettable.
                </p>
              </motion.div>

              {/* Editorial Vertical List */}
              <div className="relative pt-6 border-t border-[#E7E5DD]/40 space-y-7 w-full">
                
                {/* 1. Venue & Spaces */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-0-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <Landmark 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      RESORT & SPACES
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Beautifully prepared spaces for ceremonies, receptions and celebrations, with options suited to different gatherings.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 2. Personalised Service */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-1-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <UserCheck 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      PERSONALISED SERVICE
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      A dedicated team on hand throughout your event, helping coordinate the details and keeping the day well organised.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 3. Event Coordination */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-2-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <CalendarCheck 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      EVENT COORDINATION
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      From setup and timings to working with vendors on the day, our team helps keep the arrangements moving smoothly.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 4. Multi-Cuisine Catering */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-3-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <UtensilsCrossed 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      MULTI-CUISINE CATERING
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Thoughtfully planned menus for your celebration, from familiar Indian favourites to dishes suited to larger wedding gatherings.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 5. Stage & Décor Setup */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-4-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <Flower2 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      STAGE & DÉCOR SETUP
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Beautifully planned décor and professional setup to create an elegant setting for every celebration.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 6. Lighting, Sound & Event Support */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-5-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <Music 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90 md:whitespace-nowrap" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      LIGHTING, SOUND & EVENT SUPPORT
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Reliable event infrastructure and on-site support to help lighting, sound and essential arrangements run as planned.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 7. Photography-Friendly Spaces */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-6-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <Camera 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      PHOTOGRAPHY-FRIENDLY SPACES
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Beautifully composed spaces for portraits, candid moments and memorable celebrations throughout the day.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 8. Bridal Suite */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-7-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <svg 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      {/* Elegant oval vanity mirror frame */}
                      <rect x="7" y="3" width="10" height="13" rx="5" />
                      {/* Support stand column and foot pedestal */}
                      <path d="M12 16v5" />
                      <path d="M8 21h8" />
                      {/* Subtle diagonal reflection light-ray lines inside the glass */}
                      <path d="M10 7l4 4" opacity="0.6" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      BRIDAL SUITE
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      A private space where the bride can prepare, pause and enjoy a few peaceful moments before the celebration begins.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 9. Power Backup */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-8-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <Zap 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      POWER BACKUP
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Reliable power support to help keep lighting, sound and essential event arrangements running smoothly.
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-[#E7E5DD]/40 mx-auto my-[21px] md:mx-0 md:w-full" />

                {/* 10. Parking & Arrival */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left group w-full" id="experience-point-9-mobile">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ease-out bg-transparent border-[#C9A227]/40 group-hover:scale-[1.04] group-hover:bg-[var(--theme-primary)] group-hover:border-[var(--theme-gold)] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] mb-[18px] md:mb-0 md:mr-4.5"
                  >
                    <Car 
                      className="w-6 h-6 transition-all duration-300 ease-out group-hover:!text-[#FAF7F2]" 
                      style={{ color: venue.themePrimaryColor }} 
                    />
                  </div>
                  <div className="space-y-2 max-w-[290px] mx-auto md:mx-0 md:max-w-none md:flex-1">
                    <h3 
                      className="text-xs sm:text-sm uppercase tracking-[0.14em] font-bold font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:opacity-90" 
                      style={{ color: venue.themePrimaryColor }}
                    >
                      PARKING & ARRIVAL
                    </h3>
                    <p className="celebration-desc-fluid text-[#292B27]/85 leading-relaxed font-sans-premium transition-all duration-300 ease-out group-hover:-translate-y-[1px]">
                      Convenient access, professional valet support and ample parking to make arrival easy for you and your guests.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 06 — Gallery Section */}
      <GallerySection />

      {/* Section 08 — Cinematic Video Section */}
      <section className="relative py-28 md:py-36 bg-[#1B1617] overflow-hidden text-[#FAF7F2]" id="venue-film">
        <div className="absolute inset-0 z-0">
          <LazyImage 
            src="/assets/Others/Venue%20Film.jpg" 
            alt="Cinematic Evening Mandap Setup Backdrop" 
            referrerPolicy="no-referrer"
            darkSkeleton={true}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover opacity-[0.90] object-center transition-opacity duration-300"
          />
          {/* Soft black gradient overlay: ~20-25% lighter overall, allowing evening mandap lighting & architecture to shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/26 via-50% to-black/42 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.24)_0%,transparent_75%)] pointer-events-none" />
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* Eyebrow */}
          <span 
            className="text-xs sm:text-[13px] lg:text-[14px] uppercase tracking-[0.2em] font-bold block mb-3.5 font-sans-premium" 
            style={{ 
              color: '#C9A227',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.75)'
            }}
          >
            THE {venue.venueName.toUpperCase()} FILM
          </span>

          {/* Heading */}
          <h2 
            className="font-serif-editorial text-3xl sm:text-4xl lg:text-[52px] leading-[1.14] text-[#FAF7F2] font-medium tracking-wide mb-4 lg:mb-5 max-w-2xl lg:max-w-3xl mx-auto text-center"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.65)' }}
          >
            A Glimpse Into {venue.venueName}
          </h2>

          {/* Supporting Copy */}
          <p 
            className="text-base sm:text-lg lg:text-[19px] leading-relaxed lg:leading-[1.55] text-[#FAF7F2]/95 max-w-xl sm:max-w-2xl lg:max-w-[780px] mx-auto text-center mb-8 lg:mb-10 font-sans-premium"
            style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)' }}
          >
            Discover our elegant spaces, grand celebrations and the experience that makes {venue.venueName} special.
          </p>

          {/* Refined Minimal Play Button & Label */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-[76px] h-[76px] lg:w-[92px] lg:h-[92px] bg-[#FAF7F2] rounded-full flex items-center justify-center transition-all duration-[220ms] ease-out hover:scale-[1.03] hover:ring-4 hover:ring-white/20 active:scale-100 focus:outline-none cursor-pointer shadow-xl"
              style={{ color: venue.themePrimaryColor }}
              id="play-video-trigger"
              aria-label={`Play ${venue.venueName} resort film`}
            >
              <Play className="w-5 h-5 lg:w-6 lg:h-6 fill-current ml-1" />
            </button>
            <span 
              className="text-[11px] sm:text-xs lg:text-[13.5px] uppercase tracking-[0.18em] font-bold mt-1.5 lg:mt-2 font-sans-premium" 
              style={{ 
                color: '#C9A227',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.75)'
              }}
            >
              WATCH THE RESORT FILM
            </span>
          </div>

        </motion.div>
      </section>

      {/* Venue Film In-Person Visit CTA Block */}
      <div className="bg-[#FAF7F2] py-8 sm:py-10 md:py-12 border-t border-b border-[#E7E5DD] text-[#292B27] relative overflow-hidden" id="venue-film-visit-cta-container">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center font-sans-premium"
          >
            <button
              onClick={() => setIsVenueVisitOpen(true)}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold group transition-colors duration-300 cursor-pointer"
              style={{ color: venue.themePrimaryColor || '#1B4332' }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.color = venue.themeDarkColor || '#153426'; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.color = venue.themePrimaryColor || '#1B4332'; 
              }}
              id="venue-film-book-visit-btn"
              aria-label={`Book a resort visit to ${venue.venueName}`}
            >
              <span>BOOK A RESORT VISIT</span>
              <ArrowRight 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 shrink-0"
                style={{ color: venue.themeChampagneGold || '#C9A227' }}
                strokeWidth={2.4}
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Section 09 — Testimonials */}
      <section className="py-18 md:py-24 bg-[#FAF9F6] relative overflow-hidden" id="testimonials">
        {/* Subtle decorative background detail */}
        <div className="absolute right-0 top-0 w-32 h-32 border-t border-r border-[#C9A227]/10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
          
          {/* Header */}
          <motion.div 
            className="max-w-4xl mx-auto text-center flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span 
              className="site-section-eyebrow text-[#C9A227] block mb-3 font-sans-premium"
              style={{ color: venue.themeChampagneGold }}
            >
              WHAT OUR HOSTS SAY
            </span>
            <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4">
              Words From Those Who Celebrated Here
            </h2>
            <div 
              className="w-16 h-[2px] mb-5" 
              style={{ backgroundColor: venue.themePrimaryColor }} 
            />
          </motion.div>

          {/* Testimonial editorial grid */}
          {isTestimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left w-full mb-6" id="testimonials-skeleton">
              {Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={index} 
                  className="bg-transparent border border-[#E7E5DD]/40 rounded-[12px] p-8 space-y-6 animate-pulse w-full flex flex-col justify-between"
                  style={{ minHeight: '260px' }}
                >
                  <div className="space-y-5">
                    <div className="w-10 h-10 bg-[#E7E5DD] rounded-full" />
                    <div className="space-y-3">
                      <div className="h-3.5 bg-[#E7E5DD] rounded-full w-full" />
                      <div className="h-3.5 bg-[#E7E5DD] rounded-full w-5/6" />
                      <div className="h-3.5 bg-[#E7E5DD] rounded-full w-4/5" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#E7E5DD]/30 flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 bg-[#E7E5DD] rounded-full" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3.5 bg-[#E7E5DD] rounded-full w-1/3" />
                      <div className="h-2.5 bg-[#E7E5DD] rounded-full w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div 
            className={`relative text-left animate-once overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A227]/30 rounded-[10px] ${isTestimonialsLoading ? 'hidden' : 'block'}`} 
            id="testimonials-grid-container"
            tabIndex={0}
            onKeyDown={handleTestimonialKeyDown}
            onTouchStart={handleTestimonialTouchStart}
            onTouchEnd={handleTestimonialTouchEnd}
            aria-label="Testimonials carousel. Use Left and Right arrow keys or swipe to navigate."
          >
            {/* Viewport container */}
            <div 
              className="w-full overflow-hidden" 
              id="testimonials-carousel-viewport"
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
            >
              {/* Slider Track with computed translate offset based on current page index */}
              <div 
                className="flex w-full"
                style={{ 
                  transform: `translateX(-${testimonialIndex * 100}%)`,
                  transition: 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {(() => {
                  const pages = [];
                  const pool = [...TESTIMONIALS];
                  if (itemsPerPage === 2 && pool.length % 2 !== 0) {
                    pool.push(pool[0]);
                  }
                  for (let i = 0; i < pool.length; i += itemsPerPage) {
                    pages.push(pool.slice(i, i + itemsPerPage));
                  }
                  return pages;
                })().map((page, pageIdx) => (
                  <div 
                    key={pageIdx}
                    className="w-full flex-shrink-0 flex flex-row items-stretch"
                    style={{ width: '100%' }}
                  >
                    {page.map((test, colIdx) => (
                      <div 
                        key={`${test.name}-${colIdx}`}
                        className={`w-full md:w-1/2 lg:w-[33.33%] flex-shrink-0 px-6 sm:px-8 lg:px-10 py-1 flex flex-col justify-between h-full bg-transparent min-h-[310px] lg:min-h-[270px] select-none ${
                          colIdx < page.length - 1 ? 'border-r border-[#C9A227]/20' : ''
                        }`}
                      >
                        <div>
                          {/* Quotation Mark: Refined warm gold quotation mark */}
                          <span 
                            className="font-serif-editorial text-[58px] sm:text-[66px] lg:text-[72px] leading-none block mb-0.5 select-none font-light" 
                            style={{ color: venue.themeChampagneGold || '#C9A227' }}
                          >
                            “
                          </span>
                          {/* Testimonial Text */}
                          <p className="font-serif-editorial text-[19px] sm:text-[20px] lg:text-[22px] leading-[1.58] text-[#292B27] italic tracking-wide mb-6 sm:mb-8">
                            {test.quote.replace(/Royal Manor/g, venue.venueName).replace(/Lucknow/g, venue.city)}
                          </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-[#C9A227]/15">
                          {/* Guest Name: uppercase, deep forest green */}
                          <h4 
                            className="text-xs sm:text-[12.5px] uppercase tracking-[0.18em] font-bold mb-1 font-sans-premium"
                            style={{ color: venue.themePrimaryColor || '#1B4332' }}
                          >
                            {test.name.toUpperCase()}
                          </h4>
                          {/* Event info: uppercase, earthy gold */}
                          <p 
                            className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-sans-premium font-semibold"
                            style={{ color: venue.themeChampagneGold || '#C9A227' }}
                          >
                            {test.eventType.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium, Subtle Navigation & Pagination Row */}
            {totalTestimonialPages > 1 && (
              <div className={`flex justify-center items-center gap-6 mt-12 ${isTestimonialsLoading ? 'hidden' : 'flex'}`} id="testimonials-controls-row">
                {/* Left Arrow Button */}
                <button
                  onClick={() => {
                    setTestimonialIndex((prev) => (prev === 0 ? totalTestimonialPages - 1 : prev - 1));
                  }}
                  className="w-9 h-9 rounded-full border border-[#C9A227]/25 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227]/10 hover:border-[#C9A227] transition-all duration-300 focus:outline-none cursor-pointer"
                  aria-label="Previous testimonials page"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2]" />
                </button>

                {/* Subtly animated dot pagination indicators */}
                <div className="flex items-center gap-2.5">
                  {Array.from({ length: totalTestimonialPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === testimonialIndex 
                          ? 'w-6 bg-[#C9A227]' 
                          : 'w-1.5 bg-[#C9A227]/30 hover:bg-[#C9A227]/60'
                      }`}
                      aria-label={`Go to testimonials page ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={() => {
                    setTestimonialIndex((prev) => (prev + 1) % totalTestimonialPages);
                  }}
                  className="w-9 h-9 rounded-full border border-[#C9A227]/25 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227]/10 hover:border-[#C9A227] transition-all duration-300 focus:outline-none cursor-pointer"
                  aria-label="Next testimonials page"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            )}
          </div>

          {/* Subtle Google review trust signal below the testimonials */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-[#292B27]/80 font-sans-premium tracking-wide mt-12 sm:mt-14 select-none">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A227]/20 bg-[#FAF7F2]/80 backdrop-blur-xs shadow-2xs">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-semibold text-[#292B27]">4.8</span>
              <span className="text-[#C9A227]">★</span>
              <span className="text-[#C9A227]/30 font-light">·</span>
              <span>Google Reviews</span>
              <span className="text-[#C9A227]/30 font-light">·</span>
              <span className="text-[#292B27]/75">120+ Verified Reviews</span>
            </div>
          </div>

        </div>
      </section>

      {/* Section 10 — FAQ Section */}
      <FAQSection />

      {/* Section 11 — Wedding Journal Section */}
      <JournalSection onEnquire={() => setIsEnquiryOpen(true)} />

      {/* Section 12 — Enquiry & Location Unified Section */}
      <EnquiryAndLocation />

      {/* Final CTA Section */}
      <section className="relative py-24 md:py-32 bg-[#1B1617] overflow-hidden text-[#FAF7F2]">
        {/* Background image & soft dark charcoal overlay (reduced intensity by 20–25% for brighter, vibrant photography) */}
        <div className="absolute inset-0 z-0">
          <LazyImage 
            src="/assets/Others/Final%20CTA.jpg" 
            alt="Traditional Indian Wedding Couple Silhouette Portrait" 
            referrerPolicy="no-referrer"
            darkSkeleton={true}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover opacity-[0.90] object-center transition-opacity duration-300"
          />
          {/* Soft black gradient overlay: lighter overall, naturally vibrant details while preserving central readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 via-50% to-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22)_0%,transparent_75%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
          
          {/* Eyebrow */}
          <span 
            className="site-section-eyebrow block font-sans-premium mb-4" 
            style={{ 
              color: venue.themeChampagneGold || '#C9A227',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' 
            }}
          >
            YOUR CELEBRATION AWAITS
          </span>

          {/* Heading */}
          <h2 
            className="font-serif-editorial text-[#FAF7F2] font-medium tracking-wide text-3xl sm:text-4xl lg:text-[54px] leading-[1.15] lg:leading-[1.12] max-w-3xl mb-[26px] mx-auto text-center"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.65)' }}
          >
            <span className="inline sm:inline lg:block">Let’s Plan Something</span>{" "}
            <span className="inline sm:inline lg:block">Worth Remembering</span>
          </h2>

          {/* Supporting Copy */}
          <p 
            className="site-section-description text-[#FAF7F2]/95 text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[1.55] max-w-xl lg:max-w-[670px] mx-auto text-center"
            style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)' }}
          >
            Tell us what you’re planning, and our team will help you find the right space and arrangements for your celebration.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 lg:gap-5 justify-center items-center mt-8 sm:mt-9 w-full sm:w-auto font-sans-premium">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="w-full sm:w-auto text-[#FAF7F2] uppercase tracking-[0.15em] text-xs sm:text-[13px] lg:text-[13.5px] font-semibold h-[46px] sm:h-[50px] lg:h-[52px] py-0 px-6 sm:px-7 lg:px-8 transition-all duration-300 rounded-xl flex items-center justify-center gap-2.5 cursor-pointer hover:-translate-y-[1.5px] active:translate-y-0 leading-none"
              style={{ 
                backgroundColor: venue.themePrimaryColor || '#1B4332', 
                borderColor: venue.themePrimaryColor || '#1B4332' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = venue.themeDarkColor || '#153426';
                e.currentTarget.style.borderColor = venue.themeDarkColor || '#153426';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.borderColor = venue.themePrimaryColor || '#1B4332';
              }}
              id="final-cta-btn"
            >
              <Calendar className="w-4 h-4 shrink-0 text-white" />
              <span>CHECK AVAILABILITY</span>
            </button>
            
            <button
              onClick={() => setIsVenueVisitOpen(true)}
              className="w-full sm:w-auto bg-[#FAF7F2] uppercase tracking-[0.15em] text-xs sm:text-[13px] lg:text-[13.5px] font-semibold h-[46px] sm:h-[50px] lg:h-[52px] py-0 px-6 sm:px-7 lg:px-8 border border-[#1B4332] transition-all duration-300 ease-out flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl cursor-pointer leading-none group focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#1B1617]"
              style={{
                color: venue.themePrimaryColor || '#1B4332',
                borderColor: venue.themePrimaryColor || '#1B4332',
                backgroundColor: '#FAF7F2'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.borderColor = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.backgroundColor = '#FAF9F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.borderColor = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.backgroundColor = '#FAF7F2';
              }}
              id="final-cta-venue-visit-btn"
            >
              <span>BOOK A RESORT VISIT</span>
              <ArrowRight 
                className="w-4 h-4 transition-all duration-300 ease-out group-hover:translate-x-1.5 shrink-0 text-[#1B4332] group-hover:text-[#C9A227]"
                strokeWidth={2.4}
              />
            </button>
          </div>

        </div>
      </section>

      {/* Footer component */}
      <Footer />

      {/* Mobile Sticky CTA Bar Component */}
      <BottomMobileBar onCheckDate={() => setIsEnquiryOpen(true)} isModalOpen={isEnquiryOpen || isVenueVisitOpen} />

      {/* Global Interactive Lightboxes and Modals */}
      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
        initialDate={enquiryInitialDate}
      />

      <VenueVisitModal
        isOpen={isVenueVisitOpen}
        onClose={() => setIsVenueVisitOpen(false)}
        spaceName={selectedVisitSpace}
      />

      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />

      

    </motion.div>
  );
}
