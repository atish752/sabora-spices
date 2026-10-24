import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import AboutSection from '../components/AboutSection';
import ContactRfqSection from '../components/ContactRfqSection';

export default function AboutPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="002. ABOUT SABORA SPICES"
        title="Connecting Quality Products with Business Opportunities"
        subtitle="India-based sourcing and supply enterprise specialising in whole green cardamom, whole turmeric fingers, and Makhana (Fox Nuts) for business buyers worldwide."
        breadcrumbCurrent="About Us"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Complete Section 002 Component */}
      <AboutSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Quick RFQ Desk */}
      <ContactRfqSection
        onSubmitInquiry={onSubmitInquiry}
      />
    </div>
  );
}
