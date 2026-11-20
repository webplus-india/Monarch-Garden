import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Phone, Mail, User, MessageSquare, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import LazyImage from './LazyImage';
import { useVenue } from '../context/VenueContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

const formatToDDMMYYYY = (isoDate: string) => {
  if (!isoDate) return "";
  const parts = isoDate.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    if (year && month && day) {
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
  }
  return isoDate;
};

const getTodayISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function EnquiryModal({ isOpen, onClose, initialDate = "" }: EnquiryModalProps) {
  const { venue } = useVenue();
  const todayISO = getTodayISO();
  const [formData, setFormData] = useState({
    firstName: "", // Holds the Full Name
    phone: "",
    email: "",
    eventDate: initialDate && initialDate >= todayISO ? initialDate : "",
    guestCount: "",
    eventType: "",
    message: ""
  });
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [guestsError, setGuestsError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Prevent background scrolling while the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Sync initial eventDate when initialDate prop updates
  useEffect(() => {
    if (initialDate) {
      const today = getTodayISO();
      if (initialDate >= today) {
        setFormData(prev => ({ ...prev, eventDate: initialDate }));
        setDateError("");
      } else {
        setFormData(prev => ({ ...prev, eventDate: today }));
        setDateError("");
      }
    }
  }, [initialDate]);

  // Reset scroll position and clear errors whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setHasSubmitted(false);
      setNameError("");
      setPhoneError("");
      setEmailError("");
      setDateError("");
      setGuestsError("");
      setTypeError("");
      const timer = setTimeout(() => {
        const scrollArea = document.getElementById('enquiry-modal-scroll-area');
        if (scrollArea) {
          scrollArea.scrollTop = 0;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    let hasError = false;
    const today = getTodayISO();

    // 1. Full Name Validation
    if (!formData.firstName.trim()) {
      setNameError("Please enter your full name.");
      hasError = true;
    } else {
      setNameError("");
    }

    // 2. Mobile Number Validation: Exactly 10 digits
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length !== 10 || !/^[6-9]\d{9}$/.test(digitsOnly)) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      hasError = true;
    } else {
      setPhoneError("");
    }

    // 3. Email Address (Optional): Only validate format if provided
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    // 4. Event Date Validation: Not in the past
    if (!formData.eventDate) {
      setDateError("Please select an event date.");
      hasError = true;
    } else if (formData.eventDate < today) {
      setDateError("Past dates cannot be selected. Please select today or a future date.");
      hasError = true;
    } else {
      setDateError("");
    }

    // 5. Expected Guests Validation
    if (!formData.guestCount) {
      setGuestsError("Please select expected guest count.");
      hasError = true;
    } else {
      setGuestsError("");
    }

    // 6. Event Type Validation
    if (!formData.eventType) {
      setTypeError("Please select event type.");
      hasError = true;
    } else {
      setTypeError("");
    }

    if (hasError) return;

    setIsSubmitting(true);
    
    // Simulate premium hospitality service submission
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        (document.activeElement as HTMLElement)?.blur();
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        const target = e.target;
        const scrollArea = document.getElementById('enquiry-modal-scroll-area');
        if (target && scrollArea) {
          const targetRect = target.getBoundingClientRect();
          const scrollRect = scrollArea.getBoundingClientRect();
          
          // Target's offset relative to the scroll container
          const targetTop = targetRect.top - scrollRect.top + scrollArea.scrollTop;
          
          // Center position within the visible scroll container
          const containerHeight = scrollRect.height;
          const elementHeight = targetRect.height;
          const targetScrollTop = targetTop - (containerHeight / 2) + (elementHeight / 2);
          
          scrollArea.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  const eventTypes = [
    "Wedding",
    "Reception",
    "Engagement",
    "Birthday",
    "Anniversary",
    "Private Celebration",
    "Corporate Event",
    "Other"
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: "easeIn" }
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : (isDesktop ? 0.98 : 1),
      y: shouldReduceMotion ? 0 : (isDesktop ? 0 : 10) // Gently slide upward by 10px on mobile
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : (isDesktop ? 0.25 : 0.28), // 250ms on desktop (range 220-280ms), 280ms on mobile (range 250-300ms)
        ease: [0.16, 1, 0.3, 1] // ultra-smooth premium custom easeOut cubic
      }
    },
    exit: {
      opacity: 0,
      // Very short, smooth fade-out transition on closing
      transition: {
        duration: shouldReduceMotion ? 0 : 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 w-full h-full h-[100dvh] z-50 flex ${isSubmitted ? 'items-center justify-center p-4 pt-10 pb-6 sm:p-6' : 'items-end md:items-center justify-center p-0 md:p-6'} overflow-y-auto`} id="enquiry-modal-overlay">
          {/* Backdrop: Dark translucent background with blur */}
          <motion.div 
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-[#153426]/80 backdrop-blur-sm" 
            onClick={onClose}
          />

          {/* Modal Container: Clean bottom sheet on mobile when form active, centered modal on success and desktop */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full ${isSubmitted ? 'max-w-md md:max-w-2xl rounded-[20px] h-auto max-h-[calc(100dvh-3.5rem)] my-auto' : 'md:max-w-4xl rounded-t-[20px] rounded-b-none md:rounded-[20px] h-[calc(100dvh-10px)] h-[calc(100vh-10px)] md:h-auto md:max-h-[88vh]'} bg-[#FFFFFF] text-[#292B27] flex flex-col shadow-2xl overflow-hidden border-0`}
            id="enquiry-modal-container"
          >
            {/* Close Button: Subtle, premium, understated close button - FIXED/STATIONARY at top right */}
            <button 
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#E7E5DD] md:hover:border-[#1B4332] flex items-center justify-center text-[#292B27]/60 md:hover:text-[#1B4332] bg-[#FFFFFF] md:hover:bg-[#FFFFFF] transition-colors duration-200 cursor-pointer z-40 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              aria-label="Close Enquiry Modal"
              id="close-enquiry-modal"
            >
              <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>

            {!isSubmitted ? (
              <div className="w-full h-full flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Left Column: Venue Image (Desktop Only) - Completely Borderless & Flush */}
                <div className="hidden md:block md:w-5/12 relative overflow-hidden shrink-0 rounded-l-[20px] border-0 outline-none">
                  <LazyImage 
                    src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QdR78NgbfxP29A1poIrFr63y-UPEHuPDwKnUGj1nytclLPB78G2jEjneVoJhxPsrkAgFpPB1c0xHg28sSWbLbir1JXwfrzdRajPmD2gmNt2HraNmtYxhbYhZAbN6WXTxZieIc=s1360-w1360-h1020-rw" 
                    alt={`${venue.venueName} ${venue.city} Resort`} 
                    priority={true}
                    className="w-full h-full rounded-l-[20px]"
                    imgClassName="w-full h-full object-cover rounded-l-[20px] border-none outline-none block"
                  />
                </div>

                {/* Right Column: Existing Form & Action Bar */}
                <div className="w-full md:w-7/12 flex flex-col flex-1 overflow-hidden relative">
                  {/* Scrollable Content Area */}
                  <div 
                    className="flex-1 w-full overflow-y-auto px-5 pt-4 pb-0 sm:px-6 sm:pt-4 sm:pb-0 md:px-7 md:pt-6 md:pb-0"
                    id="enquiry-modal-scroll-area"
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    {/* Styled Scrollbar Styles */}
                    <style dangerouslySetInnerHTML={{__html: `
                      #enquiry-modal-scroll-area {
                        scrollbar-width: thin;
                        scrollbar-color: #C9A227 transparent;
                        -webkit-overflow-scrolling: touch;
                      }
                      #enquiry-modal-scroll-area::-webkit-scrollbar {
                        width: 4px;
                        display: block;
                      }
                      #enquiry-modal-scroll-area::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      #enquiry-modal-scroll-area::-webkit-scrollbar-thumb {
                        background: #C9A227;
                        border-radius: 4px;
                        transition: background-color 0.3s ease, opacity 0.3s ease;
                      }
                      #enquiry-modal-scroll-area::-webkit-scrollbar-thumb:hover {
                        background: #A6841E;
                      }
                      #enquiry-modal-scroll-area::-webkit-scrollbar-button {
                        display: none !important;
                        width: 0 !important;
                        height: 0 !important;
                      }
                      @media (max-width: 767px) {
                        #enquiry-modal-overlay {
                          position: fixed !important;
                          top: 0 !important;
                          left: 0 !important;
                          right: 0 !important;
                          bottom: 0 !important;
                          height: 100vh !important;
                          height: 100dvh !important;
                          overflow: hidden !important;
                        }
                        #enquiry-modal-container {
                          height: calc(100vh - 10px) !important;
                          height: calc(100dvh - 10px) !important;
                          max-height: calc(100vh - 10px) !important;
                          max-height: calc(100dvh - 10px) !important;
                        }
                      }
                    `}} />

                    {/* Unified Header: Royal Manor luxury wedding aesthetic (Scrolls together with form) */}
                    <div className="text-left pr-12 md:pr-10 mb-4 md:mb-5 pt-4 md:pt-0 font-sans-premium">
                      <span className="hidden md:block text-[#C9A227] text-[11px] uppercase tracking-[0.2em] font-bold mb-1 font-sans-premium">
                        {venue.venueName.toUpperCase()} – {venue.city.toUpperCase()}
                      </span>
                      <h3 className="font-serif-editorial text-xl md:text-2xl text-[#1B4332] font-semibold leading-tight tracking-wide uppercase">
                        ENQUIRE WITH US
                      </h3>
                      <div className="w-[72px] h-[1px] bg-[#1B4332] mt-1.5 md:mt-2 mb-2.5" />
                      <p className="text-xs sm:text-sm text-[#292B27]/80 leading-relaxed">
                        Tell us about your celebration and our team will help you plan your perfect event.
                      </p>
                    </div>

                    <form id="enquiry-modal-form" onSubmit={handleSubmit} className="space-y-3 font-sans-premium text-left">
                      
                      {/* Responsive Form Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="modal-fullname" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                            <User className="w-[16px] h-[16px] text-[#1B4332]" strokeWidth={1.8} />
                            <span>FULL NAME *</span>
                          </label>
                          <input
                            type="text"
                            id="modal-fullname"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            onFocus={handleFocus}
                            className="w-full h-[48px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/50 transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
                            placeholder="Enter your full name"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label htmlFor="modal-phone" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                            <Phone className="w-[16px] h-[16px] text-[#1B4332]" strokeWidth={1.8} />
                            <span>MOBILE NUMBER *</span>
                          </label>
                          <input
                            type="tel"
                            id="modal-phone"
                            required
                            pattern="[6-9][0-9]{9}"
                            title="Please enter a valid 10-digit mobile number"
                            maxLength={10}
                            inputMode="numeric"
                            value={formData.phone}
                            onChange={(e) => {
                              const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData({ ...formData, phone: digitsOnly });
                            }}
                            onFocus={handleFocus}
                            className="w-full h-[48px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/50 transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
                            placeholder="Enter 10-digit mobile number"
                          />
                        </div>

                        {/* Email Address (OPTIONAL) - Hidden on mobile screens, visible on desktop */}
                        <div className="hidden md:block">
                          <label htmlFor="modal-email" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                            <Mail className="w-[16px] h-[16px] text-[#1B4332]" strokeWidth={1.8} />
                            <span>EMAIL ADDRESS <span className="text-[10px] text-[#292B27]/50 font-normal lowercase">(optional)</span></span>
                          </label>
                          <input
                            type="email"
                            id="modal-email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={handleFocus}
                            className="w-full h-[48px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/50 transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
                            placeholder="Enter your email address"
                          />
                        </div>

                        {/* Event Date */}
                        <div>
                          <label htmlFor="modal-date" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                            <Calendar className="w-[16px] h-[16px] text-[#1B4332]" strokeWidth={1.8} />
                            <span>EVENT DATE *</span>
                          </label>
                          {/* Desktop Date Input */}
                          <div className="hidden md:block">
                            <input
                              type="date"
                              id="modal-date"
                              required={isDesktop}
                              min={todayISO}
                              value={formData.eventDate}
                              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                              onFocus={handleFocus}
                              className="w-full h-[48px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
                              placeholder="mm/dd/yyyy"
                            />
                          </div>

                          {/* Mobile Date Input */}
                          <div className="block md:hidden relative w-full h-[48px]">
                            <div className="w-full h-full px-4 bg-[#FFFFFF] border border-[#E7E5DD] rounded-[10px] font-sans-premium text-sm flex items-center justify-between pointer-events-none">
                              <span className={formData.eventDate ? "text-[#292B27]" : "text-[#8F8984]/50"}>
                                {formData.eventDate ? formatToDDMMYYYY(formData.eventDate) : "DD/MM/YYYY"}
                              </span>
                              <Calendar className="w-[16px] h-[16px] text-[#1B4332] shrink-0" strokeWidth={1.8} />
                            </div>
                            <input
                              type="date"
                              id="modal-date-mobile"
                              required={!isDesktop}
                              min={todayISO}
                              value={formData.eventDate}
                              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                              onFocus={handleFocus}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                          </div>
                        </div>

                        {/* Expected Guests */}
                        <div>
                          <label htmlFor="modal-guests" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                            <Users className="w-[16px] h-[16px] text-[#1B4332]" strokeWidth={1.8} />
                            <span>EXPECTED GUESTS *</span>
                          </label>
                          <div className="relative">
                            <select
                              id="modal-guests"
                              required
                              value={formData.guestCount}
                              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                              onFocus={handleFocus}
                              className="w-full h-[48px] px-4 pr-10 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] appearance-none transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
                            >
                              <option value="">Select expected guest count</option>
                              <option value="50–100 Guests">50–100 Guests</option>
                              <option value="100–250 Guests">100–250 Guests</option>
                              <option value="250–500 Guests">250–500 Guests</option>
                              <option value="500–800 Guests">500–800 Guests</option>
                              <option value="800+ Guests">800+ Guests</option>
                              <option value="Not Decided Yet">Not Decided Yet</option>
                            </select>
                            {/* Clean arrow down */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#292B27]/40">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Event Type */}
                        <div>
                          <label htmlFor="modal-type" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                            <svg 
                              className="w-[16px] h-[16px] text-[#1B4332] shrink-0" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
                            </svg>
                            <span>EVENT TYPE *</span>
                          </label>
                          <div className="relative">
                            <select
                              id="modal-type"
                              required
                              value={formData.eventType}
                              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                              onFocus={handleFocus}
                              className="w-full h-[48px] px-4 pr-10 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] appearance-none transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
                            >
                              <option value="">Select event type</option>
                              {eventTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#292B27]/40">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="modal-message" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1 font-sans-premium">
                          <MessageSquare className="w-[16px] h-[16px] text-[#1B4332]" strokeWidth={1.8} />
                          <span>TELL US ABOUT YOUR CELEBRATION</span>
                        </label>
                        <textarea
                          id="modal-message"
                          rows={2}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={handleFocus}
                          className="w-full p-3 sm:p-3.5 min-h-[70px] md:min-h-[72px] bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/50 transition-colors duration-200 rounded-[10px] font-sans-premium outline-none resize-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                          placeholder="Share your event details, preferred arrangements or any questions you have for our team."
                        />
                      </div>

                      {/* Minimal Spacer below Message Box */}
                      <div className="h-1 md:h-1 !mt-1" />
                    </form>
                  </div>

                  {/* Fixed Bottom Action Bar */}
                  <div className="w-full bg-[#FFFFFF] border-t border-[#E7E5DD]/50 px-5 sm:px-6 md:px-7 py-3 z-20 flex justify-center shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-b-none md:rounded-b-[20px]">
                    <button
                      type="submit"
                      form="enquiry-modal-form"
                      disabled={isSubmitting}
                      className="group w-full h-[56px] md:h-[46px] bg-[#1B4332] md:hover:bg-[#153426] text-[#FFFFFF] uppercase tracking-wider md:tracking-[0.14em] text-[15px] md:text-[13px] font-semibold rounded-[12px] md:rounded-[10px] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm font-sans-premium"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>SUBMITTING ENQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-[18px] h-[18px] text-white shrink-0" strokeWidth={2.0} />
                          <span>REQUEST AVAILABILITY</span>
                          <ArrowRight 
                            className={`w-[18px] h-[18px] text-white shrink-0 ${shouldReduceMotion ? '' : 'transition-transform duration-300 md:group-hover:translate-x-[2.5px]'}`} 
                            strokeWidth={2.0} 
                          />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Submission Success State - Modern, responsive, brand-aligned */
              <div 
                className="w-full overflow-y-auto px-5 pt-12 pb-8 sm:px-8 sm:pt-14 sm:pb-10 text-center font-sans-premium my-auto"
                id="enquiry-modal-scroll-area"
              >
                {/* Clear Success Icon */}
                <div className="w-14 h-14 bg-[#1B4332]/10 text-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1B4332]/20 shadow-sm">
                  <CheckCircle2 className="w-7 h-7 text-[#1B4332]" strokeWidth={2} />
                </div>

                <span className="text-[#C9A227] text-[11px] uppercase tracking-[0.2em] font-bold block mb-1 font-sans-premium">
                  REQUEST RECEIVED
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1B4332] font-semibold mb-3">
                  Enquiry Received Successfully!
                </h3>
                <p className="text-[#292B27] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed font-sans-premium">
                  Thank you for your interest in {venue.venueName}. Our team will review your enquiry and contact you shortly to discuss your celebration.
                </p>

                {/* Return/Close Button */}
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 h-[48px] bg-[#1B4332] hover:bg-[#153426] text-[#FFFFFF] uppercase tracking-wider text-xs font-bold rounded-[10px] transition-colors duration-300 cursor-pointer shadow-sm font-sans-premium"
                >
                  CLOSE WINDOW
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
