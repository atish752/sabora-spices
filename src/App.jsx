import React, { useState, useEffect } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import HeroSection from './components/HeroSection';
import TrustHighlightsBar from './components/TrustHighlightsBar';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import SourcingOriginSection from './components/SourcingOriginSection';
import WhySaboraSection from './components/WhySaboraSection';
import QualitySafetySection from './components/QualitySafetySection';
import LabTestingSection from './components/LabTestingSection';
import ComplianceSection from './components/ComplianceSection';
import InternationalExportSection from './components/InternationalExportSection';
import FaqSection from './components/FaqSection';
import ContactRfqSection from './components/ContactRfqSection';
import FooterSection from './components/FooterSection';
import ProductDetailModal from './components/ProductDetailModal';
import MobileFloatingBar from './components/MobileFloatingBar';
import AdminPanel from './components/AdminPanel';

import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import { useProducts } from './hooks/useProducts';

function isAdminRoute() {
  return (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('page') === 'admin'
  );
}

export default function App() {
  const {
    products,
    heroSlides,
    inquiries,
    firebaseStatus,
    saveProducts,
    saveHeroSlides,
    submitInquiry,
    updateInquiryStatus,
    deleteInquiry,
    resetAllToDefaults
  } = useProducts();

  const [showAdmin, setShowAdmin] = useState(isAdminRoute);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeProductFilter, setActiveProductFilter] = useState('all');
  const [preselectedQuoteProduct, setPreselectedQuoteProduct] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hairline scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId, filter = null) => {
    if (filter) {
      setActiveProductFilter(filter);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = (product = null) => {
    if (product) {
      setPreselectedQuoteProduct(product);
    }
    handleScrollToSection('contact');
  };

  // ── Admin Mode View ───────────────────────────────────────────────────────
  if (showAdmin) {
    return (
      <AdminPanel
        products={products}
        heroSlides={heroSlides}
        inquiries={inquiries}
        firebaseStatus={firebaseStatus}
        onSaveProducts={saveProducts}
        onSaveHeroSlides={saveHeroSlides}
        onUpdateInquiryStatus={updateInquiryStatus}
        onDeleteInquiry={deleteInquiry}
        onResetAll={resetAllToDefaults}
        onClose={() => {
          setShowAdmin(false);
          if (window.location.search.includes('page=admin')) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    );
  }

  // ── Public Sabora Spices Website ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAF9] text-stone-900 flex flex-col font-sans antialiased selection:bg-[#041A12] selection:text-amber-300 relative overflow-x-hidden">
      
      {/* Hairline Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400 z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Sticky Header with Top Announcement & 11-Item Menu */}
      <HeaderNavbar
        onScrollToSection={handleScrollToSection}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Main Content Blueprint */}
      <main className="flex-1 w-full relative z-10">
        
        {/* 1. Hero Section (Responsive Aspect Ratio - Fits Desktop, Tablet, Mobile without cropping) */}
        <HeroSection
          slides={heroSlides}
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 2. Trust Highlights Bar (4 Feature Cards matching Shahi Food Services) */}
        <TrustHighlightsBar
          onScrollToSection={handleScrollToSection}
        />

        {/* 3. About Us (Section 002 of SABORA SPICES.txt) */}
        <AboutSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 4. Products Portfolio & Submenu (Section 003 of SABORA SPICES.txt) */}
        <ProductsSection
          products={products}
          activeFilter={activeProductFilter}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 5. Sourcing & Origin (Section 004 of SABORA SPICES.txt) */}
        <SourcingOriginSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 6. Why Sabora (Section 005 of SABORA SPICES.txt: All 14 Pillars) */}
        <WhySaboraSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 7. Quality & Food Safety (Section 006 of SABORA SPICES.txt) */}
        <QualitySafetySection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 8. Laboratory Testing & Verification (Section 007 of SABORA SPICES.txt) */}
        <LabTestingSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 9. Regulatory Compliance (Section 008 of SABORA SPICES.txt) */}
        <ComplianceSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 10. International & Export Supply (Section 009 of SABORA SPICES.txt) */}
        <InternationalExportSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 11. Frequently Asked Questions (Section 0010 of SABORA SPICES.txt: All 25 FAQs) */}
        <FaqSection
          onScrollToSection={handleScrollToSection}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 12. Contact Us & Request a Quote Desk */}
        <ContactRfqSection
          onSubmitInquiry={submitInquiry}
          preselectedProduct={preselectedQuoteProduct}
        />

      </main>

      {/* Footer Section with Complete Menu, Policies, and Admin Link */}
      <FooterSection
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Sticky Mobile Bottom Floating Action Bar */}
      <MobileFloatingBar
        onOpenQuoteModal={handleOpenQuoteModal}
        onScrollToSection={handleScrollToSection}
      />

      {/* Desktop Floating WhatsApp Button */}
      <aside aria-label="WhatsApp quick chat" className="hidden sm:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I am interested in sourcing whole spices and makhana.")}
          className="p-3.5 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white rounded-full shadow-[0_12px_35px_rgba(4,26,18,0.35)] hover:shadow-[0_16px_45px_rgba(4,26,18,0.45)] hover:scale-105 transition-all flex items-center justify-center group cursor-pointer border border-amber-400/50"
          aria-label="Direct 1-Click WhatsApp Sourcing Desk"
          title="Direct 1-Click WhatsApp Sourcing Desk"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 pointer-events-none" />
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2.5 text-amber-200 uppercase tracking-wider font-mono">
            WhatsApp Sourcing Desk
          </span>
        </button>
      </aside>

      {/* Product Detail Dossier Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenQuoteModal={(p) => {
            setSelectedProduct(null);
            handleOpenQuoteModal(p);
          }}
        />
      )}

    </div>
  );
}
