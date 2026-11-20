import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, FileText, MapPin, Phone, Calendar } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { navigateTo } from '../utils/router';

interface TermsAndConditionsPageProps {
  onOpenEnquiry: () => void;
}

export default function TermsAndConditionsPage({ onOpenEnquiry }: TermsAndConditionsPageProps) {
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
      <main className="pt-[105px] sm:pt-[118px] md:pt-[128px] pb-20 md:pb-28">
        
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

        {/* HERO / HEADER SECTION */}
        <section className="max-w-[940px] mx-auto px-5 sm:px-8 md:px-10 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left space-y-4"
          >
            <span 
              className="site-section-eyebrow block font-sans-premium uppercase tracking-[0.24em] text-xs sm:text-[12.5px] font-semibold"
              style={{ color: champagneGold }}
            >
              TERMS &amp; CONDITIONS
            </span>

            <h1 className="font-serif-editorial text-[34px] sm:text-[40px] md:text-[46px] text-[#241F20] font-medium leading-[1.12] tracking-wide">
              Terms of Use
            </h1>

            <div className="w-16 h-[2px] bg-[#7A2027] my-3.5" style={{ backgroundColor: primaryBurgundy }} />

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
        <article className="max-w-[940px] mx-auto px-5 sm:px-8 md:px-10 space-y-10 md:space-y-12">

          {/* 1. INTRODUCTION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              1. Introduction
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              These Terms &amp; Conditions govern the use of the official <strong>{venue.venueName} – {venue.city}</strong> website (<a href={venue.website} className="text-[#7A2027] hover:underline transition-colors font-medium" style={{ color: primaryBurgundy }}>{venue.website.replace('https://', '')}</a>) and our online enquiry, resort visit scheduling, and availability request services.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              By accessing, browsing, or using this website, or by submitting any form or request through our platform, you acknowledge that you have read, understood, and agreed to comply with these terms. If you do not agree with any part of these terms, we advise refraining from using our website services.
            </p>
          </motion.section>

          {/* 2. USE OF THIS WEBSITE */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              2. Use of This Website
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              This website is provided for informational, resort exploration, event enquiry, and related hospitality planning purposes. When interacting with our website, you agree to:
            </p>
            <ul className="space-y-2.5 sm:space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Provide accurate, current, and truthful information when submitting forms or contacting our team.</li>
              <li>Use the website lawfully and solely for legitimate event enquiries or resort consultation.</li>
              <li>Not misuse website functionality, attempt automated form submissions, or transmit malicious code.</li>
              <li>Not attempt to gain unauthorized access to website infrastructure, servers, or administrative channels.</li>
            </ul>
          </motion.section>

          {/* 3. RESORT INFORMATION & AVAILABILITY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              3. Resort Information &amp; Availability
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Resort descriptions, lawn and banquet hall capacities, photography, layouts, facility highlights, and availability shown on this website are presented for general informational guidance.
            </p>
            <ul className="space-y-2.5 sm:space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Resort space availability is always subject to final written or verbal confirmation by {venue.venueName} management.</li>
              <li>Submitting an enquiry or availability request form does not automatically reserve, block, or guarantee resort availability for any date.</li>
              <li>Resort dates remain open to other prospective hosts until a formal reservation process is completed.</li>
              <li>Final event arrangements, hall/lawn allocation, setup timing, and inclusions are confirmed directly with our sales team.</li>
            </ul>
          </motion.section>

          {/* 4. ENQUIRIES & RESORT VISIT REQUESTS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              4. Enquiries &amp; Resort Visit Requests
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Interactive website tools such as <strong>Check Availability</strong>, <strong>Book a Resort Visit</strong>, and <strong>Enquire With Us</strong> serve as preliminary request and communication mechanisms.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Submitting an enquiry indicates your interest in hosting an event or visiting our resort. It does not constitute a binding booking agreement or guarantee:
            </p>
            <ul className="space-y-2.5 sm:space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Instant resort date blocking or reservation</li>
              <li>Automatic appointment confirmation for resort tours</li>
              <li>Fixed pricing lock or package guarantee</li>
              <li>Automatic acceptance of specific event requirements</li>
            </ul>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72] pt-1">
              All appointments, visit schedules, and booking confirmations will be communicated directly by a {venue.venueName} representative via phone, email, or official message.
            </p>
          </motion.section>

          {/* 5. PRICING, QUOTATIONS & BOOKINGS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              5. Pricing, Quotations &amp; Bookings
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Any pricing, package estimates, or fee quotes discussed or referenced are subject to final written confirmation based on specific event details, including:
            </p>
            <ul className="space-y-2.5 sm:space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Type of celebration (Wedding, Reception, Engagement, Corporate Event, etc.)</li>
              <li>Requested event date and season</li>
              <li>Expected guest count and seating layout</li>
              <li>Selection of lawn or indoor banquet spaces</li>
              <li>Catering options, decor specifications, and vendor arrangements</li>
            </ul>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72] pt-1">
              Official event pricing, payment schedules, security deposits, and inclusions are finalized and agreed upon directly through official documentation with {venue.venueName}.
            </p>
          </motion.section>

          {/* 6. EVENT CHANGES, CANCELLATIONS & AMENDMENTS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              6. Event Changes, Cancellations &amp; Amendments
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Any requested modifications, date shifts, postponements, or cancellations of confirmed resort bookings are governed strictly by the specific booking agreement executed between the client and {venue.venueName}.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Clients should refer to their confirmed reservation contract or contact our guest relations team directly to discuss any required adjustments or applicable terms.
            </p>
          </motion.section>

          {/* 7. USER-SUBMITTED INFORMATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              7. User-Submitted Information
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              When submitting contact details through our forms—such as your full name, phone number, email address, event date, guest estimate, and personal notes—you are responsible for ensuring that the information provided is accurate and complete.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              All user-submitted information is processed responsibly in accordance with our <button onClick={() => navigateTo('/privacy-policy')} className="text-[#7A2027] hover:underline font-semibold cursor-pointer" style={{ color: primaryBurgundy }}>Privacy Policy</button>.
            </p>
          </motion.section>

          {/* 8. WHATSAPP & THIRD-PARTY COMMUNICATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              8. WhatsApp &amp; Third-Party Communication
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Our website provides options to connect with our team via WhatsApp or third-party messaging channels. By choosing to initiate contact through third-party platforms, you understand and acknowledge that conversations take place subject to those platforms&apos; respective terms of service and privacy policies.
            </p>
          </motion.section>

          {/* 9. INTELLECTUAL PROPERTY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              9. Intellectual Property
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              All content featured on this website—including website text, resort photography, brand logos, graphic elements, typography layouts, and visual media—is owned by or licensed to {venue.venueName}.
            </p>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Website visitors are granted a limited license to view and share website pages for personal, non-commercial event planning. You may not copy, reproduce, republish, distribute, or commercially exploit any website content without prior written consent from {venue.venueName}.
            </p>
          </motion.section>

          {/* 10. THIRD-PARTY LINKS & SERVICES */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              10. Third-Party Links &amp; External Services
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              This website may incorporate links or embeds for external services such as Google Maps for directions or social media channels (Instagram, Facebook, YouTube). {venue.venueName} does not control and is not responsible for the content, privacy practices, or operational reliability of external third-party websites.
            </p>
          </motion.section>

          {/* 11. WEBSITE AVAILABILITY & ACCURACY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              11. Website Availability &amp; Accuracy
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              While we strive to maintain accurate, up-to-date, and continuous website operations, {venue.venueName} does not warrant that:
            </p>
            <ul className="space-y-2.5 sm:space-y-3 pl-6 list-disc marker:text-[#7A2027] text-[16px] text-[#241F20]/85 leading-[1.72]">
              <li>Website access will be uninterrupted or completely error-free at all times.</li>
              <li>All website photography or descriptions reflect transient or temporary seasonal decor variations.</li>
              <li>Digital forms will always transmit instantly during technical network disruptions.</li>
            </ul>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72] pt-1">
              Important event planning specifications or capacity queries should be verified directly with our team.
            </p>
          </motion.section>

          {/* 12. LIMITATION OF LIABILITY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              12. Limitation of Liability
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              {venue.venueName} and its management shall not be held liable for any direct, indirect, or incidental inconvenience or loss resulting solely from reliance on general website information where final event details, quotes, or reservations have not been confirmed through official written agreements with our management team.
            </p>
          </motion.section>

          {/* 13. PRIVACY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              13. Privacy
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              Your use of this website may involve the collection and processing of personal information. Please review our{' '}
              <button
                onClick={() => navigateTo('/privacy-policy')}
                className="text-[#7A2027] hover:underline font-semibold cursor-pointer"
                style={{ color: primaryBurgundy }}
              >
                Privacy Policy
              </button>{' '}
              to understand how your information is handled.
            </p>
          </motion.section>

          {/* 14. CHANGES TO THESE TERMS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              14. Changes to These Terms
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              {venue.venueName} reserves the right to revise or update these Terms &amp; Conditions periodically to reflect changes in our website features, operational practices, or regulatory requirements. Updated versions will be published on this page with a revised &quot;LAST UPDATED&quot; date at the top of the document.
            </p>
          </motion.section>

          {/* 15. CONTACT US */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 border-t border-[#DED6C9]/60 pt-10 md:pt-12"
          >
            <h2 className="font-serif-editorial text-[21px] sm:text-[23px] md:text-[25px] text-[#7A2027] font-medium tracking-tight leading-snug" style={{ color: primaryBurgundy }}>
              15. Contact Us
            </h2>
            <p className="text-[16px] text-[#241F20]/85 leading-[1.72]">
              If you have any questions or require clarification regarding these Terms &amp; Conditions or our website policies, please reach out to our team:
            </p>
            <ul className="space-y-2.5 pl-6 list-none text-[16px] text-[#241F20]/85 leading-[1.72] pt-1">
              <li><strong>Resort Name:</strong> {venue.venueName} – {venue.city}</li>
              <li><strong>Address:</strong> {venue.fullAddress}</li>
              <li><strong>Email:</strong> <a href={`mailto:${venue.email}`} className="text-[#7A2027] hover:underline font-medium" style={{ color: primaryBurgundy }}>{venue.email}</a></li>
              <li><strong>Phone:</strong> <a href={`tel:${(venue.phone || '').replace(/[^+\d]/g, '')}`} className="text-[#7A2027] hover:underline font-medium" style={{ color: primaryBurgundy }}>{venue.phone}</a>{venue.phone2 && venue.phone2.trim() && venue.phone2.trim() !== venue.phone.trim() ? (<> / <a href={`tel:${venue.phone2.replace(/[^+\d]/g, '')}`} className="text-[#7A2027] hover:underline font-medium" style={{ color: primaryBurgundy }}>{venue.phone2}</a></>) : null}</li>
            </ul>
          </motion.section>

          {/* BOTTOM TERMS CONTACT CARD */}
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
                  className="px-6 py-2.5 border border-[#7A2027]/70 hover:border-[#7A2027] text-[#7A2027] hover:bg-[#F3E8E8] text-xs font-semibold uppercase tracking-[0.16em] rounded-[10px] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
                  style={{ color: primaryBurgundy, borderColor: primaryBurgundy }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>CHECK RESORT AVAILABILITY</span>
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
