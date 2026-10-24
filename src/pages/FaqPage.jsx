import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import FaqSection from '../components/FaqSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function FaqPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="Buyer Guidance & Frequently Asked Questions"
        title="Frequently Asked Questions & Sourcing Guide"
        subtitle="Detailed answers to the 25 most frequent business enquiries covering product specifications, minimum order quantities (MOQ), custom packaging, laboratory analysis, and export logistics."
        breadcrumbCurrent="FAQ"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Main Complete 25 FAQs Section */}
      <FaqSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Direct WhatsApp Callout */}
      <section className="py-12 bg-[#041A12] text-white border-b border-emerald-900/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold text-white">Have a specific question not covered here?</h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Connect directly with our Delhi sourcing desk on WhatsApp for immediate technical clarity.
            </p>
          </div>

          <button
            onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I reviewed your FAQ and have a question regarding wholesale sourcing.")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (1-Click)</span>
          </button>
        </div>
      </section>

      {/* RFQ Desk */}
      <ContactRfqSection
        onSubmitInquiry={onSubmitInquiry}
      />
    </div>
  );
}
