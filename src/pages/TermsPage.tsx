import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, FileText, ArrowRight } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { navigateTo } from '../utils/router';

interface TermsPageProps {
  onOpenEnquiry: () => void;
}

export default function TermsPage({ onOpenEnquiry }: TermsPageProps) {
  const { venue } = useVenue();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const primaryBurgundy = venue.themePrimaryColor || '#1B4332';
  const champagneGold = venue.themeChampagneGold || '#C9A227';

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#292B27] font-sans-premium selection:bg-[#1B4332] selection:text-white">
      {/* Header */}
      <Header 
        onOpenEnquiry={onOpenEnquiry} 
        activeSection="terms-and-conditions" 
        isScrolled={true} 
      />

      {/* Main Content Area */}
      <main className="pt-[100px] sm:pt-[115px] md:pt-[125px] pb-20 md:pb-28">
        
        {/* TOP BREADCRUMB & BACK NAVIGATION */}
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 md:px-10 mb-8 md:mb-10">
          <div className="flex items-center justify-between gap-4 border-b border-[#E7E5DD]/60 pb-5">
            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1B4332] hover:text-[#153426] transition-colors cursor-pointer group"
              style={{ color: primaryBurgundy }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>RETURN TO HOME</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#292B27]/50 font-medium">
              <button onClick={() => navigateTo('/')} className="hover:text-[#1B4332] transition-colors cursor-pointer">HOME</button>
              <span>/</span>
              <span className="text-[#1B4332] font-semibold" style={{ color: primaryBurgundy }}>TERMS &amp; CONDITIONS</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="max-w-[940px] mx-auto px-5 sm:px-8 md:px-10 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left space-y-3.5"
          >
            <span 
              className="site-section-eyebrow block font-sans-premium uppercase tracking-[0.24em] text-xs sm:text-[12.5px] font-semibold"
              style={{ color: champagneGold }}
            >
              TERMS &amp; CONDITIONS
            </span>

            <h1 className="font-serif-editorial text-[32px] sm:text-[38px] md:text-[44px] text-[#241F20] font-medium leading-[1.12] tracking-wide">
              Terms of Use
            </h1>

            <div className="w-16 h-[2px] bg-[#7A2027] my-3" style={{ backgroundColor: primaryBurgundy }} />

            <p className="text-[16px] text-[#241F20]/85 font-sans-premium leading-[1.7] max-w-3xl">
              These terms explain the conditions that apply when you use the {venue.venueName} website, submit an enquiry, request resort availability, or interact with our online services.
            </p>

            <div className="pt-2 text-xs sm:text-[13px] uppercase tracking-[0.16em] text-[#241F20]/60 font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7A2027]" style={{ color: primaryBurgundy }} />
              <span>LAST UPDATED: OCTOBER 31, 2026</span>
            </div>
          </motion.div>
        </section>

        {/* TERMS CONTENT DOCUMENT */}
        <article className="max-w-[940px] mx-auto px-5 sm:px-8 md:px-10 space-y-9 md:space-y-11">

          {/* 1. INTRODUCTION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              1. Introduction
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              These Terms &amp; Conditions govern the access and use of the official website (<a href={venue.website} className="text-[#7A2027] hover:underline transition-colors font-medium" style={{ color: primaryBurgundy }}>{venue.website.replace('https://', '')}</a>) and digital booking services of <strong>{venue.venueName} – {venue.city}</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              By accessing, browsing, submitting form enquiries, or interacting with our website, visitors and prospective guests (&quot;you&quot; or &quot;user&quot;) acknowledge and agree to comply with these terms.
            </p>
          </motion.section>

          {/* 2. USE OF THIS WEBSITE */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              2. Use of This Website
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              This website is provided for informational, enquiry, resort exploration, and related hospitality service purposes. When interacting with our platform, you agree to:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Provide accurate, current, and complete information when filling out enquiry and visit booking forms</li>
              <li>Use the website strictly in a lawful manner for legitimate wedding and celebration planning</li>
              <li>Not misuse website functionality, attempt unauthorized access, or disrupt infrastructure operation</li>
              <li>Refrain from submitting automated spam, harmful code, or false availability requests</li>
            </ul>
          </motion.section>

          {/* 3. VENUE INFORMATION & AVAILABILITY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              3. Resort Information &amp; Availability
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Resort descriptions, property photography, space capacities, layout dimensions, facilities, and calendar indicators presented on the website are provided for general guidance and preliminary event planning.
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>All date availability is strictly subject to direct verification against our physical resort booking ledger</li>
              <li>Submitting an online availability request or enquiry form does not automatically reserve, hold, or confirm a resort date</li>
              <li>Lawn and hall availability status may change prior to formal booking confirmation</li>
              <li>Final space allocations, event setups, and arrangements are confirmed directly with {venue.venueName} management</li>
            </ul>
          </motion.section>

          {/* 4. ENQUIRIES & RESORT VISIT REQUESTS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              4. Enquiries &amp; Resort Visit Requests
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Interactive website forms—including <strong>Check Availability</strong>, <strong>Book a Resort Visit</strong>, and <strong>Enquire With Us</strong>—are preliminary request mechanisms designed to initiate communication with our Guest Relations team.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Submitting a form indicates a request for information or appointment scheduling. It does not automatically guarantee date availability, appointment walkthrough confirmation, locked pricing, or event acceptance. Official booking confirmations are issued directly by {venue.venueName} through formal documentation or direct representative communication.
            </p>
          </motion.section>

          {/* 5. PRICING, QUOTATIONS & BOOKINGS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              5. Pricing, Quotations &amp; Bookings
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Any pricing, package estimates, or tariff structures communicated via digital proposals or preliminary consultations are subject to confirmation based on:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Specific event type and season requirements</li>
              <li>Requested calendar dates and celebration duration</li>
              <li>Confirmed guest headcount and catering requirements</li>
              <li>Selected combination of lawn spaces, banquet halls, and ancillary facilities</li>
              <li>Custom decor, lighting, power backup, or hospitality arrangements</li>
            </ul>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Final pricing, included services, payment schedules, advance deposits, and booking terms are formalized directly through signed contract documentation issued by {venue.venueName}.
            </p>
          </motion.section>

          {/* 6. EVENT CHANGES, CANCELLATIONS & AMENDMENTS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              6. Event Changes, Cancellations &amp; Amendments
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Any requested changes to confirmed event dates, space allocations, guest counts, or booking cancellations are governed by the specific terms and conditions set forth in your individual confirmed booking contract.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              For details regarding amendment procedures or cancellation schedules applicable to your reservation, please consult your signed booking documentation or contact your designated resort manager at {venue.venueName}.
            </p>
          </motion.section>

          {/* 7. USER-SUBMITTED INFORMATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              7. User-Submitted Information
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Users are responsible for ensuring that all contact details (such as full name, phone number, and email address) and event parameters submitted through our online forms are accurate and current.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              All personal information collected during your interaction with the website is stored, handled, and protected in strict accordance with our <button onClick={() => navigateTo('/privacy-policy')} className="text-[#7A2027] hover:underline font-medium cursor-pointer" style={{ color: primaryBurgundy }}>Privacy Policy</button>.
            </p>
          </motion.section>

          {/* 8. WHATSAPP & THIRD-PARTY COMMUNICATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              8. WhatsApp &amp; Third-Party Communication
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Our website integrates direct links and action buttons allowing visitors to initiate enquiries through WhatsApp or other communication channels.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Visitors acknowledge that communications conducted on third-party messaging networks are subject to the terms of use and privacy policies enforced by those respective service providers in addition to {venue.venueName}&apos;s internal communication standards.
            </p>
          </motion.section>

          {/* 9. INTELLECTUAL PROPERTY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              9. Intellectual Property
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              All intellectual property rights in website materials—including descriptive text, resort photography, brand logos, graphic assets, interface layouts, and editorial content—are owned by or licensed to {venue.venueName}.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Website materials may not be copied, reproduced, redistributed, or commercially exploited without prior written authorization from {venue.venueName}.
            </p>
          </motion.section>

          {/* 10. THIRD-PARTY LINKS & SERVICES */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              10. Third-Party Links &amp; Services
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Our website may contain external links or embedded services (such as Google Maps for directions and social media profiles). {venue.venueName} does not control and is not responsible for the content, privacy practices, or availability of external third-party websites. Users access external links at their own discretion.
            </p>
          </motion.section>

          {/* 11. WEBSITE AVAILABILITY & ACCURACY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              11. Website Availability &amp; Accuracy
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              While we make every effort to maintain accurate, up-to-date information and continuous website operation, {venue.venueName} does not warrant that the website will operate completely uninterrupted or free from occasional technical errors.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              All critical booking requirements, layout specifications, and event schedules should be directly verified with our resort management team.
            </p>
          </motion.section>

          {/* 12. LIMITATION OF LIABILITY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              12. Limitation of Liability
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              To the extent permitted by applicable law, {venue.venueName} shall not be liable for any indirect or consequential damages arising solely from reliance on preliminary unconfirmed website information where final booking terms have not been directly established in writing.
            </p>
          </motion.section>

          {/* 13. PRIVACY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              13. Privacy
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Your use of this website involves the collection and processing of personal information submitted through forms and interactive enquiry controls. Please review our dedicated <button onClick={() => navigateTo('/privacy-policy')} className="text-[#7A2027] hover:underline font-medium cursor-pointer" style={{ color: primaryBurgundy }}>Privacy Policy</button> to understand how your information is handled.
            </p>
          </motion.section>

          {/* 14. CHANGES TO THESE TERMS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#DED6C9]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#7A2027] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              14. Changes to These Terms
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              {venue.venueName} reserves the right to update or modify these Terms &amp; Conditions periodically to reflect operational, operational, or legal requirements. Updated versions will be published on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </motion.section>

          {/* REFINED BOTTOM CONTACT CARD */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="border border-[#DED6C9]/80 my-8 sm:my-10 bg-[#FFFFFF] py-5 px-6 sm:py-6 sm:px-8 md:py-6 md:px-10 rounded-[16px] text-left space-y-4 sm:space-y-5 shadow-2xs"
          >
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C9A227]" style={{ color: champagneGold }}>
                GET IN TOUCH
              </span>
              <h3 className="font-serif-editorial text-[24px] sm:text-[28px] md:text-[32px] text-[#7A2027] font-medium" style={{ color: primaryBurgundy }}>
                Questions About These Terms?
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#241F20]/85 leading-relaxed pt-0.5">
                If you have questions about these Terms &amp; Conditions or need clarification regarding a resort enquiry, please contact our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.45fr_0.85fr] gap-4 md:gap-6 pt-1 text-sm text-[#241F20]/90">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#241F20]/60 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0" style={{ color: champagneGold }} />
                  <span>RESORT LOCATION</span>
                </span>
                <p className="font-semibold text-[#241F20]">{venue.venueName} – {venue.city}</p>
                <p className="text-xs text-[#241F20]/75 leading-relaxed">{venue.fullAddress}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#241F20]/60 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#7A2027] shrink-0" style={{ color: primaryBurgundy }} />
                  <span>EMAIL INQUIRIES</span>
                </span>
                <a 
                  href={`mailto:${venue.email}`} 
                  className="font-semibold text-[#7A2027] hover:underline block whitespace-nowrap text-xs sm:text-[13.5px] md:text-sm" 
                  style={{ color: primaryBurgundy }}
                  title={venue.email}
                >
                  {venue.email}
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#241F20]/60 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#7A2027] shrink-0" style={{ color: primaryBurgundy }} />
                  <span>CONTACT NO.</span>
                </span>
                <a 
                  href={`tel:${(venue.phone || '').replace(/[^+\d]/g, '')}`} 
                  className="font-semibold text-[#7A2027] hover:underline block whitespace-nowrap text-xs sm:text-[13.5px] md:text-sm" 
                  style={{ color: primaryBurgundy }}
                >
                  {venue.phone}
                </a>
                {venue.phone2 && venue.phone2.trim() && venue.phone2.trim() !== venue.phone.trim() && (
                  <a 
                    href={`tel:${venue.phone2.replace(/[^+\d]/g, '')}`} 
                    className="font-semibold text-[#7A2027] hover:underline block whitespace-nowrap text-xs sm:text-[13.5px] md:text-sm" 
                    style={{ color: primaryBurgundy }}
                  >
                    {venue.phone2}
                  </a>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#DED6C9]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                {/* Primary Action: EMAIL US */}
                <a
                  href={`mailto:${venue.email}`}
                  className="px-6 py-2.5 bg-[#7A2027] hover:bg-[#55151B] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-[10px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  style={{ backgroundColor: primaryBurgundy }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL US</span>
                </a>

                {/* Secondary Action: CHECK RESORT AVAILABILITY */}
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-2.5 border border-[#7A2027]/70 hover:border-[#7A2027] text-[#7A2027] hover:bg-[#F3E8E8] text-xs font-semibold uppercase tracking-[0.16em] rounded-[10px] transition-all duration-300 cursor-pointer"
                  style={{ color: primaryBurgundy, borderColor: primaryBurgundy }}
                >
                  CHECK RESORT AVAILABILITY
                </button>
              </div>

              <button
                onClick={() => navigateTo('/')}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A2027] hover:underline transition-colors cursor-pointer self-start sm:self-center"
                style={{ color: primaryBurgundy }}
              >
                RETURN TO HOMEPAGE →
              </button>
            </div>
          </motion.section>

        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
