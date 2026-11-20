import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin,
  Calendar, 
  Users, 
  CheckCircle2,
  User,
  Ticket,
  MessageSquare,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import { motion, AnimatePresence } from 'motion/react';
import WhatsAppIcon from './WhatsAppIcon';

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

export default function EnquiryAndLocation() {
  const { venue } = useVenue();
  const todayISO = getTodayISO();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    eventType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const eventCategories = [
    "Wedding",
    "Reception",
    "Engagement",
    "Birthday",
    "Anniversary",
    "Private Celebration",
    "Corporate Event",
    "Other"
  ];

  const whatsAppNumber = (venue.phone2 || venue.whatsApp || venue.phone || '').trim();
  const cleanWhatsApp = whatsAppNumber.replace(/\D/g, '');
  const whatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hello ${venue.venueName} ${venue.city}! I would like to enquire about booking availability for my upcoming celebration.`)}`;
  const mapQuery = encodeURIComponent(venue.fullAddress || `${venue.venueName} ${venue.city}`);
  const mapsDirectionsUrl = (venue.googleMapsDirectionsUrl || venue.googleMaps || '').trim() || `https://maps.google.com/?q=${mapQuery}`;
  const mapsEmbedUrl = (venue.googleMapsEmbedUrl || '').trim() || `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="bg-[#FAF7F2] text-[#292B27] relative overflow-hidden border-t border-b border-[#E7E5DD]" id="enquiry">
      <div className="py-12 md:py-24 max-w-[1580px] mx-auto px-[20px] md:px-12 relative z-10 space-y-12 md:space-y-16">
        
        {/* TOP CONTENT: Centered Editorial Introduction */}
        <motion.div 
          className="text-center max-w-2xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="site-section-eyebrow text-[#C9A227] block font-sans-premium mb-3">
            INITIATE YOUR JOURNEY
          </span>
          <h2 className="font-serif-editorial celebration-section-title-fluid text-[#292B27] font-medium tracking-wide mb-4">
            Planning Your Celebration?
          </h2>
          <div className="w-16 h-[2px] bg-[#1B4332] mx-auto mb-5" style={{ backgroundColor: venue.themePrimaryColor || '#1B4332' }} />
          <p className="site-section-description text-[#292B27]/85 leading-relaxed">
            Tell us a little about your celebration and what you have in mind. Our team will help you explore the right spaces and arrangements for your event.
          </p>
        </motion.div>

        {/* TWO-COLUMN LAYOUT: Left Contact Info Panel + Right Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* LEFT COLUMN: Contact Information Panel */}
          <div className="bg-[#FFFFFF] border border-[#E7E5DD] rounded-[18px] px-[28px] py-6 sm:p-8 md:p-10 flex flex-col h-full text-left">
            <div>
              <h3 className="font-serif-editorial text-2xl font-medium tracking-wide mb-6 md:mb-8 text-[#292B27]">
                CONTACT DETAILS
              </h3>
              
              <div className="divide-y divide-[#E7E5DD]">
                
                {/* 1. PHONE */}
                <div className="flex flex-row items-center justify-between py-[14px] md:py-5 first:pt-0 border-[#E7E5DD]">
                  <div className="flex items-start gap-[20px] md:gap-5">
                    <div className="w-14 h-14 md:w-[72px] md:h-[72px] shrink-0 bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] rounded-full">
                      <Phone className="w-5 h-5 md:w-[28px] md:h-[28px]" strokeWidth={2.25} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#8A8580] block font-sans-premium">
                        PHONE
                      </span>
                      <a 
                        href={`tel:${(venue.phone || '').replace(/[^+\d]/g, '')}`} 
                        className="text-sm sm:text-base font-semibold text-[#292B27] hover:text-[#1B4332] transition-colors font-sans-premium block"
                      >
                        {venue.phone}
                      </a>
                      {venue.phone2 && venue.phone2.trim() && venue.phone2.trim() !== venue.phone.trim() && (
                        <a 
                          href={`tel:${venue.phone2.replace(/[^+\d]/g, '')}`} 
                          className="text-sm sm:text-base font-semibold text-[#292B27] hover:text-[#1B4332] transition-colors font-sans-premium block"
                        >
                          {venue.phone2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. WHATSAPP */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 py-[14px] md:py-5 border-[#E7E5DD]">
                  <div className="flex items-start gap-[20px] md:gap-5">
                    <div className="w-14 h-14 md:w-[72px] md:h-[72px] shrink-0 bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] rounded-full">
                      <WhatsAppIcon className="w-5 h-5 md:w-[28px] md:h-[28px] text-[#1B4332]" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#8A8580] block font-sans-premium">
                        WHATSAPP
                      </span>
                      <div className="text-sm sm:text-base font-semibold text-[#292B27] font-sans-premium">
                        {whatsAppNumber}
                      </div>
                    </div>
                  </div>
                  <div className="sm:self-center self-start pl-[84px] sm:pl-0 shrink-0">
                    <a 
                      href={whatsAppUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold py-2 px-4 md:py-2.5 md:px-5 bg-[#1B4332] text-[#FFFFFF] rounded-[12px] hover:bg-[#153426] transition-colors duration-300 font-sans-premium whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      <span>CHAT NOW</span>
                    </a>
                  </div>
                </div>

                {/* 3. EMAIL */}
                <div className="flex flex-row items-center justify-between py-[16px] md:py-6 border-[#E7E5DD]">
                  <div className="flex items-start gap-[20px] md:gap-5">
                    <div className="w-16 h-16 shrink-0 bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] rounded-full">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.25} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#8A8580] block font-sans-premium">
                        EMAIL
                      </span>
                      <a 
                        href={`mailto:${venue.email}`} 
                        className="text-sm sm:text-base font-semibold text-[#292B27] hover:text-[#1B4332] transition-colors break-all font-sans-premium block"
                      >
                        {venue.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. ADDRESS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 py-[16px] md:py-6 last:pb-0 border-[#E7E5DD]">
                  <div className="flex items-start gap-[20px] md:gap-5">
                    <div className="w-16 h-16 shrink-0 bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] rounded-full">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.25} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#8A8580] block font-sans-premium">
                        ADDRESS
                      </span>
                      <div className="text-sm sm:text-base font-semibold text-[#292B27] leading-relaxed max-w-[240px] sm:max-w-xs font-sans-premium">
                        {venue.fullAddress}
                      </div>
                    </div>
                  </div>
                  <div className="sm:self-center self-start pl-[84px] sm:pl-0 shrink-0">
                    <a 
                      href={mapsDirectionsUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold py-2 px-4 md:py-2.5 md:px-5 bg-[#1B4332] text-[#FFFFFF] rounded-[12px] hover:bg-[#153426] transition-colors duration-300 font-sans-premium whitespace-nowrap"
                    >
                      <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" strokeWidth={2.25} />
                      <span>GET DIRECTIONS</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Enquiry Form Panel */}
          <div className="bg-[#FFFFFF] border border-[#E7E5DD] rounded-[18px] px-[28px] py-6 sm:p-8 md:p-10 flex flex-col h-full text-left" id="enquiry-form-wrapper">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <div className="space-y-4 md:space-y-5">
                  <h3 className="font-serif-editorial text-2xl font-medium tracking-wide text-[#292B27] mb-4 md:mb-5">
                    ENQUIRE WITH US
                  </h3>
                  
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-3.5 md:space-y-4.5"
                  >
                    {/* Row 1: FULL NAME * | PHONE NUMBER * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4.5">
                      <div>
                        <label htmlFor="fullname" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                          <User className="w-[18px] h-[18px] text-[#1B4332]" strokeWidth={1.8} />
                          <span>FULL NAME *</span>
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full h-[54px] md:h-[60px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984] transition-all rounded-[12px] font-sans-premium"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                          <Phone className="w-[18px] h-[18px] text-[#1B4332]" strokeWidth={1.8} />
                          <span>MOBILE NUMBER *</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
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
                          className="w-full h-[54px] md:h-[60px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984] transition-all rounded-[12px] font-sans-premium"
                          placeholder="Enter 10-digit mobile number"
                        />
                      </div>
                    </div>

                    {/* Row 2: EMAIL ADDRESS | EVENT DATE * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4.5">
                      <div>
                        <label htmlFor="email" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                          <Mail className="w-[18px] h-[18px] text-[#1B4332]" strokeWidth={1.8} />
                          <span>EMAIL ADDRESS <span className="text-[10px] text-[#292B27]/50 font-normal lowercase">(optional)</span></span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-[54px] md:h-[60px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984] transition-all rounded-[12px] font-sans-premium"
                          placeholder={isDesktop ? "Enter your email address" : "Enter your email address (optional)"}
                        />
                      </div>

                      <div>
                        <label htmlFor="eventdate" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                          <Calendar className="w-[18px] h-[18px] text-[#1B4332]" strokeWidth={1.8} />
                          <span>EVENT DATE *</span>
                        </label>
                        {/* Desktop Date Input */}
                        <div className="hidden md:block">
                          <input
                            type="date"
                            id="eventdate"
                            required={isDesktop}
                            min={todayISO}
                            value={formData.eventDate}
                            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                            className="w-full h-[54px] md:h-[60px] px-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] transition-all rounded-[12px] font-sans-premium"
                            placeholder="mm/dd/yyyy"
                          />
                        </div>

                        {/* Mobile Date Input (DD/MM/YYYY) */}
                        <div className="block md:hidden relative w-full h-[54px]">
                          <div className="w-full h-full px-4 bg-[#FFFFFF] border border-[#E7E5DD] rounded-[12px] font-sans-premium text-sm flex items-center justify-between pointer-events-none">
                            <span className={formData.eventDate ? "text-[#292B27]" : "text-[#8F8984]"}>
                              {formData.eventDate ? formatToDDMMYYYY(formData.eventDate) : "DD/MM/YYYY"}
                            </span>
                            <Calendar className="w-[18px] h-[18px] text-[#1B4332] shrink-0" strokeWidth={1.8} />
                          </div>
                          <input
                            type="date"
                            id="eventdate-mobile"
                            required={!isDesktop}
                            min={todayISO}
                            value={formData.eventDate}
                            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: EXPECTED GUESTS * | EVENT TYPE * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4.5">
                      <div>
                        <label htmlFor="guests" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                          <Users className="w-[18px] h-[18px] text-[#1B4332]" strokeWidth={1.8} />
                          <span>EXPECTED GUESTS *</span>
                        </label>
                        <div className="relative">
                          <select
                            id="guests"
                            required
                            value={formData.guestCount}
                            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                            className="w-full h-[54px] md:h-[60px] px-4 pr-10 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] appearance-none transition-all rounded-[12px] font-sans-premium"
                          >
                            <option value="">Select expected guest count</option>
                            <option value="50–100 Guests">50–100 Guests</option>
                            <option value="100–250 Guests">100–250 Guests</option>
                            <option value="250–500 Guests">250–500 Guests</option>
                            <option value="500–800 Guests">500–800 Guests</option>
                            <option value="800+ Guests">800+ Guests</option>
                            <option value="Not Decided Yet">Not Decided Yet</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#292B27]/40 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="category" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                          <svg 
                            className="w-[19px] h-[19px] text-[#1B4332] shrink-0" 
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
                            id="category"
                            required
                            value={formData.eventType}
                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                            className="w-full h-[54px] md:h-[60px] px-4 pr-10 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] appearance-none transition-all rounded-[12px] font-sans-premium"
                          >
                            <option value="">Select event type</option>
                            {eventCategories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#292B27]/40 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: TELL US ABOUT YOUR CELEBRATION */}
                    <div>
                      <label htmlFor="message" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#292B27] mb-1.5 font-sans-premium">
                        <MessageSquare className="w-[18px] h-[18px] text-[#1B4332]" strokeWidth={1.8} />
                        <span>TELL US ABOUT YOUR CELEBRATION</span>
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[110px] md:min-h-[140px] px-4 py-4 bg-[#FFFFFF] border border-[#E7E5DD] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]/20 text-sm text-[#292B27] placeholder-[#8F8984] transition-all rounded-[12px] font-sans-premium resize-none"
                        placeholder="Share your event details, preferred arrangements or any questions you have for our team."
                      />
                    </div>

                    {/* Form Buttons */}
                    <div className="pt-2 md:pt-2.5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full text-[#FFFFFF] uppercase tracking-widest md:tracking-[0.15em] text-xs md:text-[14.5px] font-bold md:font-semibold h-[56px] md:h-[60px] rounded-[12px] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 md:gap-3.5 cursor-pointer font-sans-premium"
                        style={{
                          backgroundColor: venue.themePrimaryColor || '#1B4332',
                          borderColor: venue.themePrimaryColor || '#1B4332'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = venue.themeDarkColor || '#153426';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = venue.themePrimaryColor || '#1B4332';
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-white shrink-0" strokeWidth={2.0} />
                            <span className="text-xs md:text-[14.5px] font-bold md:font-semibold tracking-widest md:tracking-[0.15em]">REQUEST AVAILABILITY</span>
                            <ArrowRight className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-white shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.0} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                </div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FFFFFF] p-8 text-center space-y-4 font-sans-premium flex flex-col justify-center items-center h-full min-h-[350px]"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1B4332]/10">
                    <CheckCircle2 className="w-6 h-6 text-[#1B4332]" />
                  </div>
                  <h3 className="font-serif-editorial text-2xl font-medium text-[#1B4332]">
                    Enquiry Logged
                  </h3>
                  <p className="text-sm text-[#292B27]/80 leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{formData.fullName.split(' ')[0]}</strong>. Your custom request has been recorded. Our guest relationship specialists will reach out shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs uppercase tracking-widest font-semibold pt-4 hover:underline text-[#1B4332]"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* FULL-WIDTH MAP: Google Maps Embed with Premium floating CTA */}
        <div className="w-full rounded-[16px] shadow-md overflow-hidden bg-[#FAF7F2] group h-[380px] sm:h-[450px] md:h-[500px] lg:h-[550px] relative">
          <iframe
            title={`${venue.venueName} ${venue.city} Resort Map`}
            src={mapsEmbedUrl}
            className="w-full h-full border-0 transition-opacity duration-500 absolute inset-0 opacity-100"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          
          {/* Native Map Navigation Prompt Action Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <a 
              href={mapsDirectionsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFFFFF] text-[#1B4332] uppercase tracking-widest text-[10.5px] font-bold py-2.5 px-5 border border-[#C9A227]/25 hover:border-[#1B4332] hover:bg-[#1B4332] hover:text-[#FFFFFF] shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap font-sans-premium rounded-[12px]"
              style={{
                color: venue.themePrimaryColor || '#1B4332',
                borderColor: 'rgba(201, 162, 39, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.borderColor = venue.themePrimaryColor || '#1B4332';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.25)';
                e.currentTarget.style.color = venue.themePrimaryColor || '#1B4332';
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-[#C9A227]" style={{ color: venue.themeChampagneGold || '#C9A227' }} />
              <span>GET DIRECTIONS ON GOOGLE MAPS</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
