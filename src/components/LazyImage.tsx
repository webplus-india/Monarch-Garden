import React, { useState, useEffect, useRef } from 'react';
import { Crown } from 'lucide-react';
import { useVenue } from '../context/VenueContext';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  darkSkeleton?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoadCallback?: () => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  imgClassName = '',
  style, 
  referrerPolicy = 'no-referrer', 
  priority = false,
  loading = 'lazy',
  darkSkeleton = false,
  aspectRatio,
  objectFit = 'cover',
  onLoadCallback,
  onClick,
  ...props 
}: LazyImageProps) {
  const { venue } = useVenue();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // IntersectionObserver for optimized lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '500px 0px', // Pre-load 500px before reaching viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, loading]);

  // Reset loading state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Immediately set loaded if image is already cached by browser memory
  useEffect(() => {
    if (isInView && imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      if (onLoadCallback) onLoadCallback();
    }
  }, [isInView, src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoadCallback) onLoadCallback();
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const isDark = darkSkeleton || 
    className.includes('bg-[#241F20]') || 
    className.includes('bg-[#1B1617]') || 
    className.includes('bg-[#181415]') || 
    className.includes('bg-black');

  // Rich luxury ambient blur backdrop (no flat block colors)
  const wrapperBgClass = isDark
    ? 'bg-[#181415] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2D2527] via-[#1C1718] to-[#120E0F]'
    : 'bg-[#FAF7F2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F6F1E7] via-[#EFE8DC] to-[#E3D9C8]';

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${wrapperBgClass} ${className}`}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style
      }}
      onClick={onClick}
    >
      {/* Rich Glass & Ambient Shimmer Overlay during loading */}
      <div 
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        {/* Soft Ambient Blur Glow Mesh */}
        <div 
          className={`absolute -inset-4 filter blur-2xl opacity-70 transition-opacity duration-700 ${
            isDark 
              ? 'bg-gradient-to-tr from-[#C9A227]/25 via-[#1B4332]/15 to-transparent' 
              : 'bg-gradient-to-tr from-[#C9A227]/20 via-[#FFFDF9] to-[#E5DAC8]/60'
          }`} 
        />
        
        {/* Shimmer Sweep Animation */}
        <div className="w-full h-full relative overflow-hidden">
          <div className="animate-skeleton-shimmer" />
        </div>
      </div>

      {/* Progressive Blur-Up Lazy Image Reveal */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy={referrerPolicy}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-${objectFit} transition-all duration-800 cubic-bezier(0.16,1,0.3,1) transform ${
            isLoaded 
              ? 'opacity-100 scale-100 blur-0 saturate-100' 
              : 'opacity-40 scale-[1.04] blur-xl saturate-120'
          } ${imgClassName}`}
          {...props}
        />
      )}

      {/* Elegant Branded Fallback for Missing/Failed Images */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-[#F5F1EA] text-[#241F20]/70 text-center select-none backdrop-blur-md">
          <Crown className="w-8 h-8 mb-2 text-[#C9A227]/60" strokeWidth={1.5} />
          <span className="font-serif-editorial text-sm tracking-wide text-[#241F20]/80">{alt || `${venue.venueName} ${venue.city}`}</span>
        </div>
      )}
    </div>
  );
}
