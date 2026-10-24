import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import ContactRfqSection from '../components/ContactRfqSection';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Mail, Globe } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ContactPage({
  onNavigate,
  onOpenQuoteModal,
  onSubmitInquiry,
  preselectedProduct
}) {
  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="Wholesale Quotation Desk & Direct Inquiry"
        title="Request a Wholesale Quote & Contact Sabora Spices"
        subtitle="Connect with our Delhi sourcing desk. Inquire about current batch availability, custom millimeter grading, private-label barrier packaging, and export shipment terms."
        breadcrumbCurrent="Contact Us"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Main Interactive Contact & RFQ Desk Section */}
      <ContactRfqSection
        onSubmitInquiry={onSubmitInquiry}
        preselectedProduct={preselectedProduct}
      />

      {/* Delhi Headquarters Operational Information */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Delhi Sourcing & Supply Hub</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Headquarters & Commercial Coordination Desk
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Based in Jahangirpuri, Delhi, our central facility coordinates procurement across India, sorting, lab analysis, and domestic/international dispatches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Facility Address</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Jahangirpuri, Delhi – 110033, India
              </p>
              <div className="pt-2 text-[11px] text-stone-500">
                Central Northern India Logistics Hub
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Direct Phone Lines</h4>
              <div className="space-y-1 text-xs">
                <a href={`tel:${SITE_CONFIG.primaryPhoneRaw}`} className="block text-stone-700 hover:text-emerald-700 font-semibold">
                  +91 78809 06610
                </a>
                <a href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`} className="block text-stone-700 hover:text-emerald-700 font-semibold">
                  +91 95327 01582
                </a>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                Direct commercial sourcing desk
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-base">WhatsApp Desk</h4>
              <button
                onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to inquire about wholesale whole spices and makhana.")}
                className="text-xs text-emerald-700 font-bold hover:underline block text-left"
              >
                1-Click Instant Sourcing Chat
              </button>
              <div className="pt-2 text-[11px] text-stone-500">
                Average reply time: &lt; 30 minutes
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Operating Hours</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Monday to Saturday: 9:00 AM – 7:30 PM (IST)<br />
                Sunday: Closed (Inquiries queued)
              </p>
              <div className="pt-2 text-[11px] text-stone-500">
                SLA: Quotations within 4-8 hrs
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
