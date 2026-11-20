const fs = require('fs');

const typesHeader = `export interface VenueSpace {
  id: string;
  name: string;
  capacity: string;
  dimensions?: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
}

export interface WeddingCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  benefit: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  eventType: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  title: string;
  date: string;
}

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: "lawn",
    name: "The Grand Lawn",
    capacity: "300–800 GUESTS",
    dimensions: "25,000 SQ. FT.",
    description: "An open-air setting for wedding ceremonies, receptions and larger gatherings, with room for guests to come together and celebrate.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkUZqTN-G_2O-jRyRQIauXaQdHG2ajfB6uYcQpbwxx2QRbv1EUOHgKbwZcAyNSxBfGgw6kmLchdAesfzDKNDlw34yM85emCwQkGpq0gw-ulqLLgTvpg4a7RAuLCGzK7PWqR7_2r=s1360-w1360-h1020-rw",
    alt: "The Grand Lawn at Royal Manor decorated for a luxury evening wedding",
    features: []
  },
  {
    id: "banquet",
    name: "The Royal Banquet",
    capacity: "200–400 GUESTS",
    dimensions: "8,000 SQ. FT.",
    description: "An indoor space for wedding ceremonies, receptions and family celebrations, with a setting designed to bring guests together.",
    image: "https://content.jdmagicbox.com/comp/pune/r2/020pxx20.xx20.210715155158.i9r2/catalogue/veer-banquet-s-ac-hall-dhayari-pune-banquet-halls-rafwje36as.jpg",
    alt: "The Royal Banquet hall with grand chandeliers and gold accents",
    features: []
  },
  {
    id: "courtyard",
    name: "The Courtyard",
    capacity: "100–200 GUESTS",
    dimensions: "4,000 SQ. FT.",
    description: "An open-air courtyard for Haldi, Mehendi and smaller family ceremonies, offering a relaxed setting for daytime gatherings.",
    image: "https://images.unsplash.com/photo-1590075865003-e48277faa558?q=80&w=1200",
    alt: "The Courtyard with traditional marigold garlands and brick architecture",
    features: []
  }
];

export const WHY_ROYAL_MANOR_BENEFITS: Benefit[] = [
  {
    title: "GRAND EVENT SPACES",
    description: "Flexible settings for intimate and grand celebrations, styled with symmetry and sophistication."
  },
  {
    title: "PREMIUM HOSPITALITY",
    description: "A dedicated team focused on a seamless, respectful, and high-end guest experience."
  },
  {
    title: "AMPLE PARKING",
    description: "Convenient, safe arrival with organized valet assistance and extensive on-site guest parking."
  },
  {
    title: "EXQUISITE CATERING",
    description: "Thoughtfully planned multi-cuisine culinary menus curated for every specific celebration."
  },
  {
    title: "POWER BACKUP",
    description: "Completely redundant, reliable high-capacity infrastructure for continuous, uninterrupted events."
  },
  {
    title: "CENTRAL LOCATION",
    description: "Nestled in Lucknow with easy, seamless access for local and out-of-town families."
  }
];

export const WEDDING_JOURNEY: WeddingCategory[] = [
  {
    id: "haldi",
    title: "HALDI",
    subtitle: "THE MORNING OF JOY",
    description: "A vibrant daytime celebration filled with colour, laughter and cherished family traditions.",
    image: "/Celebrations/Haldi.jpg"
  },
  {
    id: "mehendi",
    title: "MEHENDI",
    subtitle: "AN EVENING OF TOGETHERNESS",
    description: "An intimate setting for intricate details, music, laughter and cherished family moments.",
    image: "/Celebrations/Mehandi.jpg"
  },
  {
    id: "sangeet",
    title: "SANGEET",
    subtitle: "MUSIC, MOVEMENT & CELEBRATION",
    description: "A lively evening of performances, music and unforgettable moments with everyone you love.",
    image: "/Celebrations/Sangeet.jpg"
  },
  {
    id: "wedding",
    title: "WEDDING & RECEPTION",
    subtitle: "THE MAIN CELEBRATION",
    description: "A grand setting for sacred rituals, the wedding ceremony and an elegant evening reception.",
    image: "/Celebrations/Wedding.jpg"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "lawn-serv",
    num: "01",
    title: "VENUE & LAWN",
    benefit: "Symmetric Architectural Splendor",
    description: "Access to the manicured lawn, grand courtyard, and banquet hall configured for your specific gathering numbers."
  },
  {
    id: "coord-serv",
    num: "02",
    title: "EVENT COORDINATION",
    benefit: "Seamless Single-Point Support",
    description: "A dedicated senior manager coordinates all on-site deliveries, timelines, and logistical coordination seamlessly."
  },
  {
    id: "decor-serv",
    num: "03",
    title: "DECOR & SETUP SUPPORT",
    benefit: "Tailored Aesthetic Design",
    description: "Seamless coordination with top-tier decorators to assemble royal mandaps, floral pathways, and pristine seating."
  },
  {
    id: "cater-serv",
    num: "04",
    title: "FINE DINING & CATERING",
    benefit: "Masterful Culinary Journeys",
    description: "Collaborative menu engineering presenting exquisite Awadhi, Pan-Indian, and global culinary masterpieces."
  },
  {
    id: "sound-serv",
    num: "05",
    title: "LIGHTING & SOUND",
    benefit: "Atmospheric Acoustic Perfection",
    description: "State-of-the-art ambient illuminations and concert-grade sound arrays mapped carefully to avoid echoes."
  },
  {
    id: "photo-serv",
    num: "06",
    title: "PHOTOGRAPHY COMPATIBILITY",
    benefit: "Cinematic Frame Angles",
    description: "Perfect natural light corridors and symmetry optimized specifically for drone photography and bridal portraits."
  },
  {
    id: "ent-serv",
    num: "07",
    title: "LIVE ENTERTAINMENT",
    benefit: "Captivating Musical Acts",
    description: "Coordination support for Sufi artists, traditional instrumentalists, or contemporary DJs on the main sangeet stage."
  },
  {
    id: "hosp-serv",
    num: "08",
    title: "GUEST HOSPITALITY",
    benefit: "Warm Courteous Service",
    description: "Sophisticated welcoming team, dedicated concierge desks, and guest coordination throughout multi-day rituals."
  },
  {
    id: "sec-serv",
    num: "09",
    title: "PARKING & SECURITY",
    benefit: "Reassuring Safe Arrival",
    description: "Professional valet personnel, large signages, robust surveillance, and secure entry management for VIP guests."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Everything from the venue setup to the hospitality was beautifully managed. Our family and guests were genuinely impressed, and the whole celebration felt easy from start to finish.",
    name: "Aayush Saxena",
    eventType: "Wedding & Reception · December 2025"
  },
  {
    quote: "We hosted our daughter’s Sangeet and wedding at Royal Manor, and the entire experience was wonderfully organised. The catering was excellent, and the team made sure we could enjoy the celebrations without worrying about the details.",
    name: "Meera Kapoor",
    eventType: "Sangeet & Wedding · January 2026"
  },
  {
    quote: "The location made things especially convenient for our guests, and the team was professional throughout. Everything was handled smoothly, from the arrangements to the reception itself.",
    name: "Dr. Rajesh Srivastava",
    eventType: "Family Reunion & Reception · February 2026"
  },
  {
    quote: "The open lawn was absolutely perfect for our winter wedding reception. The lighting arrangements, spacious staging, and the traditional Awadhi cuisine left a lasting impression on all our relatives. We couldn't have asked for a more dignified venue in Lucknow.",
    name: "Sandeep Rastogi",
    eventType: "Wedding Reception · November 2025"
  },
  {
    quote: "We booked the Heritage Courtyard for our morning Haldi ceremony and it was incredibly picturesque. The sunlit brick arches, flower arrangements, and the warm hospitality made it feel like a private family courtyard.",
    name: "Priyanka Mishra",
    eventType: "Haldi Ceremony · February 2026"
  },
  {
    quote: "From the valet parking setup to the elaborate dinner buffet, the team at Royal Manor showed immense respect and organization. Our guests who travelled from outside Lucknow were highly comfortable with the accessibility.",
    name: "Amit Khanna",
    eventType: "Sangeet & Wedding · December 2025"
  },
  {
    quote: "The indoor banquet hall has a grand yet serene feel to it. We hosted our daughter's ring ceremony there, and the acoustics, dining service, and general coordination were highly professional. Our sincere thanks to the event coordinator.",
    name: "Sunita Verma",
    eventType: "Engagement Ceremony · October 2025"
  },
  {
    quote: "A highly professional venue for corporate dinners as well. We hosted our annual partner gala here. The presentation arrangements, valet coordination, and multi-cuisine catering were handled with exceptional care and punctuality.",
    name: "Rajiv Malhotra",
    eventType: "Corporate Dinner · November 2025"
  },
  {
    quote: "Royal Manor is exceptional in its hospitality. We had our family reunion and silver anniversary celebrations here. The staff made everyone feel like royalty, and the serene, unhurried atmosphere allowed us to reconnect beautifully.",
    name: "Shalini Bajpai",
    eventType: "Silver Anniversary · January 2026"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What celebrations can we host at Royal Manor?",
    answer: "We welcome weddings, receptions, Haldi, Mehendi, Sangeet, engagements and other private celebrations, with spaces suited to different parts of the occasion."
  },
  {
    question: "How many guests can the venue accommodate?",
    answer: "Our flexible event spaces cater to gatherings of various scales. The Grand Lawn comfortably hosts 300 to 800 guests, the Royal Banquet suits 200 to 400 guests, and the Courtyard is ideal for intimate rituals of 100 to 200 guests. You can also combine spaces for larger celebrations."
  },
  {
    question: "Which spaces are available for weddings and receptions?",
    answer: "We offer three distinctive spaces: the Grand Lawn for grand outdoor assemblies, the elegant indoor Royal Banquet hall, and the open-air Heritage Courtyard for traditional ceremonies."
  },
  {
    question: "Is catering provided by Royal Manor?",
    answer: "We provide customized catering options with menus featuring classic Awadhi, Pan-Indian, and select global cuisines prepared by our culinary team. We can also accommodate custom catering arrangements to suit specific community preferences."
  },
  {
    question: "Can we bring our own decorators and vendors?",
    answer: "Yes, you are welcome to bring certified external decorators and wedding planners to personalize the venue. We also maintain a panel of recommended top-tier floral and lighting designers who are familiar with our venue spaces."
  },
  {
    question: "Is parking and valet service available for guests?",
    answer: "Yes, we offer secure on-site parking for over 150 vehicles, alongside professional valet services and a dedicated arrival corridor to ensure smooth guest transition."
  },
  {
    question: "How far in advance should we reserve our date?",
    answer: "We recommend booking 6 to 12 months in advance, particularly for peak weekend dates and traditional wedding seasons, to guarantee your preferred reservation."
  },
  {
    question: "Is the venue available for wedding photography and pre-wedding shoots?",
    answer: "Yes, clients with a confirmed booking have access to the architecture, lawns, and courtyards for pre-wedding portrait sessions and cinematic films."
  },
  {
    question: "Can we visit the venue before booking?",
    answer: "Contact the venue team to ask about arranging a visit, explore the available spaces and discuss your event requirements."
  },
  {
    question: "How can we check availability and get a quote?",
    answer: "Share your preferred event date, celebration type and approximate guest count through the enquiry form. The venue team can guide you on availability, pricing and suitable spaces."
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
    category: "WEDDINGS",
    title: "Timeless Mandap Setting",
    date: "Dec 2025"
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1200",
    category: "WEDDINGS",
    title: "Sacred Promises Ceremony",
    date: "Nov 2025"
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200",
    category: "DECOR",
    title: "Grand Lawn At Golden Hour",
    date: "Jan 2026"
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=1200",
    category: "EVENTS",
    title: "Vibrant Haldi Festivity",
    date: "Feb 2026"
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200",
    category: "DECOR",
    title: "Ornate Mehendi Floral Backdrop",
    date: "Dec 2025"
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    category: "VENUE",
    title: "The Banquet Chandeliers",
    date: "Mar 2026"
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200",
    category: "EVENTS",
    title: "Lively Sangeet Celebration",
    date: "Jan 2026"
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200",
    category: "WEDDINGS",
    title: "Candid Couple Portrait",
    date: "Feb 2026"
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200",
    category: "DINING",
    title: "Floral Tablescapes & Setup",
    date: "Dec 2025"
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1590075865003-e48277faa558?q=80&w=1200",
    category: "VENUE",
    title: "The Heritage Courtyard",
    date: "Jan 2026"
  }
];

export interface ArticleTable {
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  heading?: string;
  subheading?: string;
  content?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  numberedPoints?: string[];
  table?: ArticleTable;
  quote?: string;
  keyTakeaways?: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  altSlugs?: string[];
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  author?: string;
  intro: string;
  introParagraphs?: string[];
  sections: ArticleSection[];
  conclusion?: string;
}
`;

console.log("Types header prepared.");
