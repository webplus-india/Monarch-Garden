import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useVenue } from '../context/VenueContext';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const { venue } = useVenue();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241F20]/95 backdrop-blur-md transition-all duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Video Container */}
      <div className="relative w-full max-w-5xl aspect-video bg-[#153426] border border-[#C9A227]/40 shadow-2xl z-10">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-[#FAF7F2]/80 hover:text-[#C9A227] transition-colors cursor-pointer"
          aria-label="Close video player"
        >
          <span className="text-xs uppercase tracking-widest font-semibold font-sans-premium">CLOSE FILM</span>
          <X className="w-5 h-5" />
        </button>

        {/* Elegant Embed of high-quality Indian wedding drone / venue showcase */}
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/SgTWe89B9oM?autoplay=1&mute=0" 
          title={`${venue.venueName} ${venue.city} — Premium Celebration & Wedding Resort Tour`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
