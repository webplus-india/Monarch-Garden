import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../types';
import { ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { motion, AnimatePresence } from 'motion/react';
import LazyImage from './LazyImage';

export default function GallerySection() {
  const { venue } = useVenue();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const categories = ["ALL", "WEDDINGS", "DECOR", "DINING", "RESORT", "EVENTS"];

  const filteredImages = activeFilter === "ALL"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => {
    // Find the clicked image's index in filteredImages
    const clickedImg = filteredImages[index];
    // Set the index in GALLERY_IMAGES array
    const originalIndex = GALLERY_IMAGES.findIndex((img) => img.id === clickedImg.id);
    setSelectedImageIndex(originalIndex);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    let nextIndex = direction === 'next' ? selectedImageIndex + 1 : selectedImageIndex - 1;
    
    if (nextIndex < 0) {
      nextIndex = GALLERY_IMAGES.length - 1;
    } else if (nextIndex >= GALLERY_IMAGES.length) {
      nextIndex = 0;
    }
    
    setSelectedImageIndex(nextIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Mobile swipe navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateLightbox('next');
    } else if (isRightSwipe) {
      navigateLightbox('prev');
    }
    setTouchStart(null);
    setTouchEnd(null);
  };


  return (
    <section id="gallery" className="pt-16 md:pt-24 pb-12 md:pb-18 bg-[#FFFFFF] relative overflow-hidden border-t border-[#E7E5DD]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Headers and Categories */}
        <div className="flex flex-col items-center mb-0">
          <motion.div 
            className="text-center max-w-2xl flex flex-col items-center mb-0"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span 
              className="site-section-eyebrow block mb-3 font-sans-premium"
              style={{ color: venue.themeChampagneGold || '#C9A227' }}
            >
              MOMENTS WORTH REMEMBERING
            </span>
            <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide whitespace-normal md:whitespace-nowrap max-w-full md:max-w-none mx-auto mb-4">
              A World of Celebrations
            </h2>
            <div 
              className="w-16 h-[2px] mx-auto mb-5" 
              style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} 
            />
            <p className="site-section-description text-[#292B27]/85 leading-relaxed max-w-xl mx-auto">
              Discover the beautiful moments, grand celebrations and timeless memories captured at {venue.venueName}.
            </p>
          </motion.div>
 
          {/* Center-Aligned Minimalist Filter Navigation */}
          <div 
            id="gallery-category-container"
            className="w-full border-b border-[#E7E5DD]/35 mt-6 md:mt-7 mb-8 md:mb-[52px] flex justify-center overflow-hidden"
          >
            {/* Desktop Navigation Row (md and larger) - Premium Active Pill Navigation Style */}
            <div className="hidden md:flex flex-row justify-center items-center gap-4 md:gap-5 text-[11.5px] uppercase tracking-[0.22em] font-bold font-sans-premium pb-3">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="relative w-[120px] h-[40px] flex items-center justify-center transition-colors duration-300 focus:outline-none cursor-pointer rounded-full select-none"
                    style={{
                      color: isActive ? '#FFFFFF' : '#52695B'
                    }}
                  >
                    <span className="relative z-10">{cat}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="desktopActivePill"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Navigation Rows (wrapped centered premium pills, no horizontal scroll) */}
            <div className="flex md:hidden flex-wrap justify-center items-center gap-x-2.5 gap-y-2 text-xs uppercase tracking-[0.16em] font-bold font-sans-premium w-full max-w-[340px] sm:max-w-none mx-auto px-2 pb-2">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={`mobile-${cat}`}
                    onClick={() => setActiveFilter(cat)}
                    className="rounded-full px-4 py-2 text-center transition-all duration-300 focus:outline-none cursor-pointer border text-xs"
                    style={{
                      backgroundColor: isActive 
                        ? (venue.themePrimaryColor || '#1B4332') 
                        : '#FAF9F6',
                      color: isActive 
                        ? '#FFFFFF' 
                        : '#292B2799',
                      borderColor: isActive 
                        ? (venue.themePrimaryColor || '#1B4332') 
                        : '#E7E5DD80',
                    }}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Responsive Uniform Editorial Grid (1 col mobile, 2 col tablet, 3 col desktop - 4:3 Aspect Ratio) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-4 w-full" id="gallery-skeleton-grid">
            {Array.from({ length: Math.min(filteredImages.length, 6) }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-[#FAF9F6] rounded-[6px] sm:rounded-[8px] lg:rounded-[8px] aspect-[4/3] w-full relative overflow-hidden border border-[#E7E5DD]/20"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-4 w-full" id="gallery-grid-container">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[8px] border border-[#E7E5DD]/30 bg-[#FAF7F2] cursor-pointer shadow-xs"
                  id={`gallery-item-${img.id}`}
                >
                  <LazyImage
                    src={img.src}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    aspectRatio="4/3"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover gallery-hover-img"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Explore Full Gallery CTA */}
        <div className="mt-8 sm:mt-10 md:mt-11 text-center flex justify-center">
          <button
            type="button"
            id="explore-full-gallery-cta"
            onClick={() => {
              setActiveFilter("ALL");
              setSelectedImageIndex(0);
            }}
            className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 py-2 px-1 text-xs sm:text-[12.5px] uppercase tracking-[0.12em] font-bold font-sans-premium text-[#1B4332] hover:text-[#153426] transition-colors duration-300 bg-transparent border-0 shadow-none cursor-pointer"
          >
            <span>EXPLORE FULL GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 shrink-0 text-[#1B4332] group-hover:text-[#153426]" strokeWidth={2.25} />
          </button>
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#181415]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Overlay */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-3.5 right-3.5 md:top-6 md:right-6 w-11 h-11 md:w-12 md:h-12 bg-transparent md:bg-black/40 md:hover:bg-black/70 md:backdrop-blur-md border border-white/30 md:border-white/15 md:hover:border-white/35 shadow-none md:shadow-lg rounded-full flex items-center justify-center text-white/95 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 z-20 cursor-pointer focus:outline-none"
              aria-label="Close gallery lightbox"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] md:drop-shadow-none" strokeWidth={1.75} />
            </button>

            {/* Prev Navigation */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-transparent md:bg-black/40 md:hover:bg-black/75 md:backdrop-blur-md border-0 md:border md:border-white/15 md:hover:border-white/35 shadow-none md:shadow-xl rounded-full flex items-center justify-center text-white/95 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 z-20 cursor-pointer focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7 md:w-7 md:h-7 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] md:drop-shadow-none -ml-0.5" strokeWidth={1.75} />
            </button>

            {/* Image Box */}
            <motion.div 
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-w-5xl max-h-[78vh] overflow-hidden z-10 border border-[#DED6C9]/15 rounded-lg bg-[#181415] shadow-2xl"
            >
              <LazyImage
                src={GALLERY_IMAGES[selectedImageIndex].src}
                alt={`${venue.venueName} Gallery Image ${selectedImageIndex + 1}`}
                referrerPolicy="no-referrer"
                priority={true}
                darkSkeleton={true}
                objectFit="contain"
                className="w-full max-h-[78vh] bg-[#181415]"
                imgClassName="w-auto h-auto max-w-full max-h-[78vh] object-contain mx-auto"
              />
            </motion.div>

            {/* Next Navigation */}
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-transparent md:bg-black/40 md:hover:bg-black/75 md:backdrop-blur-md border-0 md:border md:border-white/15 md:hover:border-white/35 shadow-none md:shadow-xl rounded-full flex items-center justify-center text-white/95 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 z-20 cursor-pointer focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7 md:w-7 md:h-7 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] md:drop-shadow-none -mr-0.5" strokeWidth={1.75} />
            </button>

            {/* Counter Indicator */}
            <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[#FCFBF8]/90 text-xs font-sans-premium tracking-widest z-20 select-none shadow-md">
              <span>{selectedImageIndex + 1} / {GALLERY_IMAGES.length}</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
