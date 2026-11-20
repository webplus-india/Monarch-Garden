import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useVenue } from '../context/VenueContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { navigateTo } from '../utils/router';

interface PrivacyPolicyPageProps {
  onOpenEnquiry: () => void;
}

export default function PrivacyPolicyPage({ onOpenEnquiry }: PrivacyPolicyPageProps) {
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
        activeSection="privacy-policy" 
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
              <span className="text-[#1B4332] font-semibold" style={{ color: primaryBurgundy }}>PRIVACY POLICY</span>
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
              PRIVACY POLICY
            </span>

            <h1 className="font-serif-editorial text-[32px] sm:text-[38px] md:text-[44px] text-[#292B27] font-medium leading-[1.12] tracking-wide">
              Your Privacy Matters
            </h1>

            <div className="w-16 h-[2px] bg-[#1B4332] my-3" style={{ backgroundColor: primaryBurgundy }} />

            <p className="text-[16px] text-[#292B27]/85 font-sans-premium leading-[1.7] max-w-3xl">
              We respect your privacy and are committed to handling your personal information responsibly when you visit our website or contact us about {venue.venueName}.
            </p>

            <div className="pt-2 text-xs sm:text-[13px] uppercase tracking-[0.16em] text-[#292B27]/60 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1B4332]" style={{ color: primaryBurgundy }} />
              <span>Last Updated: October 31, 2026</span>
            </div>
          </motion.div>
        </section>

        {/* POLICY CONTENT DOCUMENT */}
        <article className="max-w-[940px] mx-auto px-5 sm:px-8 md:px-10 space-y-9 md:space-y-11">

          {/* 1. INTRODUCTION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              1. Introduction
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              This Privacy Policy describes how <strong>{venue.venueName} – {venue.city}</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, stores, and protects personal information submitted through our official website (<a href={venue.website} className="text-[#1B4332] hover:underline transition-colors font-medium" style={{ color: primaryBurgundy }}>{venue.website.replace('https://', '')}</a>) and related digital booking or resort enquiry channels.
            </p>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              By using our website, submitting an enquiry, or requesting a resort visit, you agree to the collection and use of information in accordance with this policy.
            </p>
          </motion.section>

          {/* 2. INFORMATION WE COLLECT */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              2. Information We Collect
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              We only collect personal information that you voluntarily provide to us when filling out forms on our website or communicating with our team. This may include:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-[#1B4332] text-[16px] text-[#292B27]/85 leading-[1.72]">
              <li><strong>Full Name</strong> provided during enquiry or visit booking</li>
              <li><strong>Mobile / Contact Phone Number</strong> for follow-up and ledger verification</li>
              <li><strong>Email Address</strong> for digital communication and proposal sending</li>
              <li><strong>Event Date</strong> and preferred resort timing</li>
              <li><strong>Event Type</strong> (such as Wedding, Reception, Engagement, Birthday, Anniversary, Private Celebration, or Corporate Event)</li>
              <li><strong>Expected Number of Guests</strong> to assist in selecting suitable lawns or banquet halls</li>
              <li><strong>Preferred Resort Visit Date &amp; Time</strong> for guided resort tours</li>
              <li><strong>Message &amp; Enquiry Details</strong> voluntarily shared in our contact forms</li>
            </ul>
            <div className="bg-[#FAF9F6] p-4 border-l-2 border-[#1B4332]/40 rounded-r-md my-2">
              <p className="text-[14px] sm:text-[14.5px] text-[#292B27]/75 italic leading-[1.65]">
                Note: Our website does not request, collect, or store sensitive financial data, payment card credentials, or official government identification numbers.
              </p>
            </div>
          </motion.section>

          {/* 3. HOW WE USE YOUR INFORMATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              3. How We Use Your Information
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              Information submitted through {venue.venueName}&apos;s website is used exclusively for legitimate hospitality management, guest service, and resort operation purposes:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-[#1B4332] text-[16px] text-[#292B27]/85 leading-[1.72]">
              <li>To respond promptly to your availability enquiries and event proposals</li>
              <li>To process and schedule guided resort visits and in-person walkthroughs</li>
              <li>To check resort availability across our lawn and banquet spaces</li>
              <li>To communicate important updates regarding your event or booking consultation</li>
              <li>To provide tailored pricing, menu options, and capacity recommendations</li>
              <li>To improve our website functionality, navigation, and guest service experience</li>
              <li>To maintain website security and protect against spam or unauthorized submissions</li>
              <li>To comply with applicable legal, accounting, and regulatory obligations</li>
            </ul>
          </motion.section>

          {/* 4. HOW WE SHARE INFORMATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              4. How We Share Information
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
            </p>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              Your information is accessible only to authorized {venue.venueName} guest relationship management staff. We may share details with trusted technology service providers, hosting infrastructure, or communications platforms strictly as necessary to deliver website functionality, deliver email confirmations, or process enquiry messages. These providers are obligated to handle data confidentially and solely on our behalf.
            </p>
          </motion.section>

          {/* 5. WHATSAPP COMMUNICATION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              5. WhatsApp Communication
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              Our website provides direct WhatsApp interaction buttons allowing you to initiate conversations with our sales and hospitality team. When you choose to contact {venue.venueName} via WhatsApp, messages and media shared within those chats are governed by WhatsApp&apos;s Terms of Service and Privacy Policy as well as our internal guest communication guidelines.
            </p>
          </motion.section>

          {/* 6. COOKIES & LOCAL STORAGE */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              6. Cookies &amp; Local Preferences
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              We use minimal essential session storage and local preferences (such as remembering UI preferences or form state) to ensure smooth site navigation and optimal display across desktop and mobile devices. We do not use aggressive cross-site tracking pixels or invasive advertising surveillance tools.
            </p>
          </motion.section>

          {/* 7. DATA RETENTION */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              7. Data Retention
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              We retain personal enquiry information only for as long as reasonably necessary to fulfill the purpose for which it was collected, assist with ongoing event planning consultations, maintain resort booking records, or comply with legal and accounting requirements.
            </p>
          </motion.section>

          {/* 8. DATA SECURITY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              8. Data Security
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              We employ reasonable technical and organizational safeguards—including encrypted HTTPS web transfer and restricted administrative access—to protect your submitted personal information against unauthorized access, loss, misuse, or alteration. While we implement standard industry protections, please note that no electronic transmission over the internet can be guaranteed as completely immune to all potential security threats.
            </p>
          </motion.section>

          {/* 9. YOUR RIGHTS & CHOICES */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              9. Your Rights &amp; Choices
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              You maintain full control over the information you share with us. Depending on applicable regulations, you have the right to:
            </p>
            <ul className="space-y-3 pl-6 list-disc marker:text-[#1B4332] text-[16px] text-[#292B27]/85 leading-[1.72]">
              <li>Request information regarding the personal data we hold about you</li>
              <li>Request correction or updating of inaccurate contact details</li>
              <li>Request the removal or deletion of your enquiry records where applicable</li>
              <li>Withdraw consent for follow-up communications at any time</li>
            </ul>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72] pt-1">
              To exercise any of these rights, simply email us at <a href={`mailto:${venue.email}`} className="text-[#1B4332] hover:underline transition-colors font-medium" style={{ color: primaryBurgundy }}>{venue.email}</a>.
            </p>
          </motion.section>

          {/* 10. THIRD-PARTY LINKS */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              10. External &amp; Third-Party Links
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              Our website contains links to external platforms such as Google Maps for resort navigation and social media pages (Instagram, Facebook). {venue.venueName} is not responsible for the privacy practices, content, or data collection policies of third-party websites. We encourage you to review their respective privacy notices when leaving our site.
            </p>
          </motion.section>

          {/* 11. CHILDREN'S PRIVACY */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              11. Children&apos;s Privacy
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              Our website is intended for general adult audiences planning wedding and event celebrations. We do not knowingly collect personal information from individuals under the age of 18.
            </p>
          </motion.section>

          {/* 12. POLICY UPDATES */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 border-t border-[#E7E5DD]/50 pt-9 md:pt-11"
          >
            <h2 className="font-serif-editorial text-[20px] sm:text-[22px] md:text-[24px] text-[#1B4332] font-medium tracking-wide" style={{ color: primaryBurgundy }}>
              12. Updates to This Policy
            </h2>
            <p className="text-[16px] text-[#292B27]/85 leading-[1.72]">
              We may update this Privacy Policy from time to time to reflect operational or regulatory changes. Any modifications will be published on this page with an updated &quot;Last Updated&quot; date at the top of the document.
            </p>
          </motion.section>

          {/* 13. REFINED BOTTOM PRIVACY CONTACT CARD */}
          <motion.section 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="border border-[#E7E5DD]/80 my-8 sm:my-10 bg-[#FFFFFF] py-5 px-6 sm:py-6 sm:px-8 md:py-6 md:px-10 rounded-[16px] text-left space-y-4 sm:space-y-5 shadow-2xs"
          >
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C9A227]" style={{ color: champagneGold }}>
                GET IN TOUCH
              </span>
              <h3 className="font-serif-editorial text-[24px] sm:text-[28px] md:text-[32px] text-[#1B4332] font-medium" style={{ color: primaryBurgundy }}>
                Questions About Your Privacy?
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#292B27]/85 leading-relaxed pt-0.5">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.45fr_0.85fr] gap-4 md:gap-6 pt-1 text-sm text-[#292B27]/90">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#292B27]/60 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0" style={{ color: champagneGold }} />
                  <span>RESORT LOCATION</span>
                </span>
                <p className="font-semibold text-[#292B27]">{venue.venueName} – {venue.city}</p>
                <p className="text-xs text-[#292B27]/75 leading-relaxed">{venue.fullAddress}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#292B27]/60 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#1B4332] shrink-0" style={{ color: primaryBurgundy }} />
                  <span>EMAIL INQUIRIES</span>
                </span>
                <a 
                  href={`mailto:${venue.email}`} 
                  className="font-semibold text-[#1B4332] hover:underline block whitespace-nowrap text-xs sm:text-[13.5px] md:text-sm" 
                  style={{ color: primaryBurgundy }}
                  title={venue.email}
                >
                  {venue.email}
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#292B27]/60 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#1B4332] shrink-0" style={{ color: primaryBurgundy }} />
                  <span>CONTACT NO.</span>
                </span>
                <a 
                  href={`tel:${(venue.phone || '').replace(/[^+\d]/g, '')}`} 
                  className="font-semibold text-[#1B4332] hover:underline block whitespace-nowrap text-xs sm:text-[13.5px] md:text-sm" 
                  style={{ color: primaryBurgundy }}
                >
                  {venue.phone}
                </a>
                {venue.phone2 && venue.phone2.trim() && venue.phone2.trim() !== venue.phone.trim() && (
                  <a 
                    href={`tel:${venue.phone2.replace(/[^+\d]/g, '')}`} 
                    className="font-semibold text-[#1B4332] hover:underline block whitespace-nowrap text-xs sm:text-[13.5px] md:text-sm" 
                    style={{ color: primaryBurgundy }}
                  >
                    {venue.phone2}
                  </a>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E5DD]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                {/* Primary Action: EMAIL US */}
                <a
                  href={`mailto:${venue.email}`}
                  className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#153426] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-[10px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  style={{ backgroundColor: primaryBurgundy }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL US</span>
                </a>

                {/* Secondary Action: CHECK RESORT AVAILABILITY */}
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-2.5 border border-[#1B4332]/70 hover:border-[#1B4332] text-[#1B4332] hover:bg-[#FAF9F6] text-xs font-semibold uppercase tracking-[0.16em] rounded-[10px] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
                  style={{ color: primaryBurgundy, borderColor: primaryBurgundy }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>CHECK RESORT AVAILABILITY</span>
                </button>
              </div>

              <button
                onClick={() => navigateTo('/')}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1B4332] hover:underline transition-colors cursor-pointer self-start sm:self-center"
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
