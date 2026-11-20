import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useVenue } from '../context/VenueContext';
import LazyImage from './LazyImage';

interface VenueVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceName?: string;
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

export default function VenueVisitModal({ isOpen, onClose, spaceName = "The Royal Banquet" }: VenueVisitModalProps) {
  const { venue } = useVenue();
  const todayISO = getTodayISO();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    visitDate: "",
    timeSlot: "",
    visitorCount: "",
    message: ""
  });
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
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

  // Body scroll locking when modal is active
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

  // Reset scroll position and form state when opening
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setHasSubmitted(false);
      setNameError("");
      setPhoneError("");
      setDateError("");
      setSlotError("");
      const timer = setTimeout(() => {
        const scrollArea = document.getElementById('visit-modal-scroll-area');
        if (scrollArea) {
          scrollArea.scrollTop = 0;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, spaceName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    let hasError = false;
    const today = getTodayISO();

    // 1. Full Name Validation
    if (!formData.fullName.trim()) {
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

    // 3. Visit Date Validation: Not in the past
    if (!formData.visitDate) {
      setDateError("Please select a preferred visit date.");
      hasError = true;
    } else if (formData.visitDate < today) {
      setDateError("Past dates cannot be selected. Please choose today or a future date.");
      hasError = true;
    } else {
      setDateError("");
    }

    // 4. Preferred Time Slot Validation
    if (!formData.timeSlot) {
      setSlotError("Please select a preferred time slot.");
      hasError = true;
    } else {
      setSlotError("");
    }

    if (hasError) return;

    setIsSubmitting(true);
    
    // Simulate venue visit booking submission
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        (document.activeElement as HTMLElement)?.blur();
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        const target = e.target;
        const scrollArea = document.getElementById('visit-modal-scroll-area');
        if (target && scrollArea) {
          const targetRect = target.getBoundingClientRect();
          const scrollRect = scrollArea.getBoundingClientRect();
          const targetTop = targetRect.top - scrollRect.top + scrollArea.scrollTop;
          const containerHeight = scrollRect.height;
          const elementHeight = targetRect.height;
          const targetScrollTop = targetTop - (containerHeight / 2) + (elementHeight / 2);
          
          scrollArea.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  const timeSlots = [
    "10:00 AM – 12:00 PM",
    "12:00 PM – 2:00 PM",
    "2:00 PM – 4:00 PM",
    "4:00 PM – 6:00 PM",
    "6:00 PM – 8:00 PM"
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }
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
      y: shouldReduceMotion ? 0 : (isDesktop ? 0 : 10)
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : (isDesktop ? 0.25 : 0.28),
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 w-full h-full h-[100dvh] z-50 flex ${isSubmitted ? 'items-center justify-center p-4 pt-10 pb-6 sm:p-6' : 'items-end md:items-center justify-center p-0 md:p-6'} overflow-y-auto`} id="visit-modal-overlay">
          {/* Backdrop */}
          <motion.div 
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-[#153426]/80 backdrop-blur-sm" 
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full ${isSubmitted ? 'max-w-md md:max-w-xl rounded-[20px] h-auto max-h-[calc(100dvh-3.5rem)] my-auto' : 'md:max-w-4xl rounded-t-[20px] rounded-b-none md:rounded-[20px] h-[calc(100dvh-10px)] h-[calc(100vh-10px)] md:h-auto md:max-h-[88vh]'} bg-[#FFFFFF] text-[#292B27] flex flex-col shadow-2xl overflow-hidden font-sans-premium border-0`}
            id="visit-modal-container"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 md:w-10 md:h-10 rounded-full border border-[#E7E5DD] md:hover:border-[#1B4332] flex items-center justify-center text-[#292B27]/60 md:hover:text-[#1B4332] bg-[#FFFFFF] md:hover:bg-[#FFFFFF] transition-colors duration-200 cursor-pointer z-40 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              aria-label="Close Resort Visit Modal"
              id="close-visit-modal"
            >
              <X className="w-4 h-4" strokeWidth={1.8} />
            </button>

            {!isSubmitted ? (
              <div className="w-full h-full flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Left Column: Venue Image (Desktop Only) - Completely Borderless & Flush */}
                <div className="hidden md:block md:w-5/12 relative overflow-hidden shrink-0 rounded-l-[20px] border-0 outline-none">
                  <LazyImage 
                    src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S4ESne-MvFwkdtbf3bsXDl1C7Tdkk5oVNcgcX_LGU7oWXhfsWZlRRbEtcsaZmWLYfZXj76t2SDrX8HQR3Zvr6NwNMuccOoEP_PeJWLTaxK58Mse_luUau8jrbZnA7ZFeTslawFKrW8vGM3=s1360-w1360-h1020-rw" 
                    alt={`${venue.venueName} Property Tour`} 
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
                    id="visit-modal-scroll-area"
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    <style dangerouslySetInnerHTML={{__html: `
                      #visit-modal-scroll-area {
                        scrollbar-width: thin;
                        scrollbar-color: #C9A227 transparent;
                        -webkit-overflow-scrolling: touch;
                      }
                      #visit-modal-scroll-area::-webkit-scrollbar {
                        width: 4px;
                        display: block;
                      }
                      #visit-modal-scroll-area::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      #visit-modal-scroll-area::-webkit-scrollbar-thumb {
                        background: #C9A227;
                        border-radius: 4px;
                        transition: background-color 0.3s ease, opacity 0.3s ease;
                      }
                      #visit-modal-scroll-area::-webkit-scrollbar-thumb:hover {
                        background: #A6841E;
                      }
                      #visit-modal-scroll-area::-webkit-scrollbar-button {
                        display: none !important;
                        width: 0 !important;
                        height: 0 !important;
                      }
                      @media (max-width: 767px) {
                        #visit-modal-overlay {
                          position: fixed !important;
                          top: 0 !important;
                          left: 0 !important;
                          right: 0 !important;
                          bottom: 0 !important;
                          height: 100vh !important;
                          height: 100dvh !important;
                          overflow: hidden !important;
                        }
                        #visit-modal-container {
                          height: calc(100vh - 10px) !important;
                          height: calc(100dvh - 10px) !important;
                          max-height: calc(100vh - 10px) !important;
                          max-height: calc(100dvh - 10px) !important;
                        }
                      }
                    `}} />

                    {/* Header */}
                    <div className="text-left pr-12 md:pr-10 mb-4 md:mb-5 pt-4 md:pt-0 font-sans-premium">
                      <span className="hidden md:block text-[#C9A227] text-[11px] uppercase tracking-[0.2em] font-bold mb-1 font-sans-premium">
                        {venue.venueName.toUpperCase()} – {venue.city.toUpperCase()}
                      </span>
                      <h3 className="font-serif-editorial text-xl md:text-2xl lg:text-[26px] text-[#1B4332] font-semibold leading-tight tracking-wide uppercase">
                        BOOK A RESORT VISIT
                      </h3>
                      <div className="w-[60px] h-[1px] bg-[#1B4332] mt-1.5 md:mt-2 mb-2.5" />
                      <p className="text-xs sm:text-sm text-[#292B27]/80 leading-relaxed">
                        Choose a convenient time to visit the resort and explore our spaces.
                      </p>
                    </div>

                    {/* Form */}
                    <form id="visit-modal-form" onSubmit={handleSubmit} className="space-y-3 md:space-y-3.5 text-left font-sans-premium">
                      
                      {/* Full Name & Mobile Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3.5">
                        {/* FULL NAME * */}
                        <div>
                          <label htmlFor="visit-fullname" className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-bold text-[#292B27] mb-1">
                            <User className="w-3.5 h-3.5 text-[#1B4332]" strokeWidth={1.8} />
                            <span>FULL NAME *</span>
                          </label>
                          <input
                            type="text"
                            id="visit-fullname"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            onFocus={handleFocus}
                            className="w-full h-[46px] px-3.5 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/60 transition-colors duration-200 rounded-[10px] outline-none font-sans-premium"
                            placeholder="Enter your full name"
                          />
                        </div>

                        {/* MOBILE NUMBER * */}
                        <div>
                          <label htmlFor="visit-phone" className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-bold text-[#292B27] mb-1">
                            <Phone className="w-3.5 h-3.5 text-[#1B4332]" strokeWidth={1.8} />
                            <span>MOBILE NUMBER *</span>
                          </label>
                          <input
                            type="tel"
                            id="visit-phone"
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
                            className="w-full h-[46px] px-3.5 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/60 transition-colors duration-200 rounded-[10px] outline-none font-sans-premium"
                            placeholder="Enter 10-digit mobile number"
                          />
                        </div>
                      </div>

                      {/* Preferred Visit Date & Preferred Time Slot */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3.5">
                        {/* PREFERRED VISIT DATE * */}
                        <div>
                          <label htmlFor="visit-date" className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-bold text-[#292B27] mb-1">
                            <Calendar className="w-3.5 h-3.5 text-[#1B4332]" strokeWidth={1.8} />
                            <span>PREFERRED VISIT DATE *</span>
                          </label>
                          {/* Desktop Date Input */}
                          <div className="hidden md:block">
                            <input
                              type="date"
                              id="visit-date"
                              required={isDesktop}
                              min={todayISO}
                              value={formData.visitDate}
                              onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                              onFocus={handleFocus}
                              className="w-full h-[46px] px-3.5 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] transition-colors duration-200 rounded-[10px] outline-none font-sans-premium"
                              placeholder="mm/dd/yyyy"
                            />
                          </div>

                          {/* Mobile Date Input */}
                          <div className="block md:hidden relative w-full h-[46px]">
                            <div className="w-full h-full px-3.5 bg-[#FFFFFF] border border-[#E7E5DD] rounded-[10px] text-sm flex items-center justify-between pointer-events-none font-sans-premium">
                              <span className={formData.visitDate ? "text-[#292B27]" : "text-[#8F8984]/60"}>
                                {formData.visitDate ? formatToDDMMYYYY(formData.visitDate) : "DD/MM/YYYY"}
                              </span>
                              <Calendar className="w-3.5 h-3.5 text-[#1B4332] shrink-0" strokeWidth={1.8} />
                            </div>
                            <input
                              type="date"
                              id="visit-date-mobile"
                              required={!isDesktop}
                              min={todayISO}
                              value={formData.visitDate}
                              onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                              onFocus={handleFocus}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                          </div>
                        </div>

                        {/* PREFERRED TIME SLOT * */}
                        <div>
                          <label htmlFor="visit-timeslot" className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-bold text-[#292B27] mb-1">
                            <Clock className="w-3.5 h-3.5 text-[#1B4332]" strokeWidth={1.8} />
                            <span>PREFERRED TIME SLOT *</span>
                          </label>
                          <div className="relative">
                            <select
                              id="visit-timeslot"
                              required
                              value={formData.timeSlot}
                              onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                              onFocus={handleFocus}
                              className="w-full h-[46px] px-3.5 pr-9 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] appearance-none transition-colors duration-200 rounded-[10px] outline-none font-sans-premium"
                            >
                              <option value="">Select time slot</option>
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
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

                      {/* NUMBER OF VISITORS */}
                      <div>
                        <label htmlFor="visit-visitors" className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-bold text-[#292B27] mb-1">
                          <Users className="w-3.5 h-3.5 text-[#1B4332]" strokeWidth={1.8} />
                          <span>NUMBER OF VISITORS</span>
                        </label>
                        <div className="relative">
                          <select
                            id="visit-visitors"
                            value={formData.visitorCount}
                            onChange={(e) => setFormData({ ...formData, visitorCount: e.target.value })}
                            onFocus={handleFocus}
                            className="w-full h-[46px] px-3.5 pr-9 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] appearance-none transition-colors duration-200 rounded-[10px] outline-none font-sans-premium"
                          >
                            <option value="">Select number of visitors</option>
                            <option value="1 Person">1 Person</option>
                            <option value="2 People">2 People</option>
                            <option value="3 People">3 People</option>
                            <option value="4 People">4 People</option>
                            <option value="5+ People">5+ People</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#292B27]/40">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* MESSAGE */}
                      <div>
                        <label htmlFor="visit-message" className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-bold text-[#292B27] mb-1">
                          <MessageSquare className="w-3.5 h-3.5 text-[#1B4332]" strokeWidth={1.8} />
                          <span>MESSAGE</span>
                        </label>
                        <textarea
                          id="visit-message"
                          rows={2}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={handleFocus}
                          className="w-full p-3.5 min-h-[70px] md:min-h-[72px] bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984]/60 transition-colors duration-200 rounded-[10px] outline-none resize-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden font-sans-premium"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                          placeholder="Anything you’d like us to know before your visit?"
                        />
                      </div>

                      {/* Minimal Spacer below Message Box */}
                      <div className="h-1 md:h-1 !mt-1" />
                    </form>
                  </div>

                  {/* Fixed Bottom Action Bar */}
                  <div className="w-full bg-[#FFFFFF] border-t border-[#E7E5DD]/60 px-5 sm:px-6 md:px-7 py-3 z-20 flex justify-center shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-b-none md:rounded-b-[20px]">
                    <button
                      type="submit"
                      form="visit-modal-form"
                      disabled={isSubmitting}
                      className="w-full text-[#FFFFFF] uppercase tracking-widest md:tracking-[0.14em] text-xs sm:text-[13px] md:text-[13px] font-semibold h-[52px] md:h-[46px] rounded-[10px] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer font-sans-premium shadow-sm hover:brightness-105 active:scale-[0.99]"
                      style={{
                        backgroundColor: venue.themePrimaryColor || '#1B4332'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>BOOKING YOUR VISIT...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-white shrink-0" strokeWidth={2.0} />
                          <span>BOOK MY RESORT VISIT</span>
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
                id="visit-modal-scroll-area"
              >
                {/* Clear Success Icon */}
                <div className="w-14 h-14 bg-[#1B4332]/10 text-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1B4332]/20 shadow-sm">
                  <CheckCircle2 className="w-7 h-7 text-[#1B4332]" strokeWidth={2} />
                </div>

                <span className="text-[#C9A227] text-[11px] uppercase tracking-[0.2em] font-bold block mb-1 font-sans-premium">
                  REQUEST RECEIVED
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1B4332] font-semibold mb-3">
                  Visit Request Submitted!
                </h3>
                <p className="text-[#292B27] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed font-sans-premium">
                  Thank you for your interest in {venue.venueName}. Our resort relations team will contact you shortly to confirm your preferred visit date and time.
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
