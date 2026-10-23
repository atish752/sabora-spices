import React, { useState, useEffect } from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import TrustBadges from './components/TrustBadges';
import ProductCatalog from './components/ProductCatalog';
import B2BServices from './components/B2BServices';
import QualityAccordion from './components/QualityAccordion';
import ReviewsSlider from './components/ReviewsSlider';
import BulkInquiryForm from './components/BulkInquiryForm';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import ProductModal from './components/ProductModal';
import WhatsAppDrawer from './components/WhatsAppDrawer';
import AdminPanel from './components/AdminPanel';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from './data/products';
import { useProducts } from './hooks/useProducts';
import { useScrollReveal } from './hooks/useScrollReveal';

// Admin panel is accessible via ?page=admin URL param
// or by clicking the hidden footer link (in Footer.jsx)
function isAdminRoute() {
  return (
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('page') === 'admin')
  );
}

export default function App() {
  const {
    products,
    homepageConfig,
    heroConfig,
    saveProducts,
    saveHomepageConfig,
    saveHeroConfig,
    resetAllToDefaults
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [whatsAppDrawerOpen, setWhatsAppDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [drawerNote, setDrawerNote] = useState('');
  const [showAdmin, setShowAdmin] = useState(isAdminRoute);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize scroll-triggered animations
  useScrollReveal(products);

  // Track window scroll progress for luxury hairline progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenWhatsAppDrawer = (product = null, note = '') => {
    setDrawerProduct(product);
    setDrawerNote(note);
    setWhatsAppDrawerOpen(true);
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFloatingWhatsAppClick = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  // Section visibility flags from admin config
  const sections = homepageConfig?.sections || {};
  const showTicker = sections.showTicker !== false;
  const showTrustBadges = sections.showTrustBadges !== false;
  const showCatalog = sections.showCatalog !== false;
  const showB2BServices = sections.showB2BServices !== false;
  const showStory = sections.showStory !== false;
  const showReviews = sections.showReviews !== false;
  const showRFQ = sections.showRFQ !== false;

  // ── Admin mode ──────────────────────────────────────────────────────────
  if (showAdmin) {
    return (
      <AdminPanel
        products={products}
        homepageConfig={homepageConfig}
        heroConfig={heroConfig}
        onSaveProducts={saveProducts}
        onSaveHomepageConfig={saveHomepageConfig}
        onSaveHeroConfig={saveHeroConfig}
        onResetAll={resetAllToDefaults}
        onClose={() => {
          setShowAdmin(false);
          // Clean up ?page=admin from URL so refresh doesn't reopen panel
          if (window.location.search.includes('page=admin')) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    );
  }

  // ── Public site ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9FBFA] flex flex-col antialiased selection:bg-[#041A12] selection:text-[#FDE68A] font-sans relative overflow-x-hidden">

      {/* Radiant 24K Gold & Emerald Luxury Hairline Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-300 to-emerald-400 z-50 pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.7)]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Modern Ambient Mesh Lighting in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[55rem] h-[55rem] bg-emerald-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[50rem] h-[50rem] bg-amber-400/[0.035] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 w-[45rem] h-[45rem] bg-emerald-600/[0.035] rounded-full blur-[140px]" />
      </div>

      {/* 1. Announcement / USP Top Bar */}
      {showTicker && (
        <TopBanner
          announcementConfig={homepageConfig?.announcement}
          onOpenGeneralWhatsApp={() => handleOpenWhatsAppDrawer()}
        />
      )}

      {/* 2. Main Header / Navigation */}
      <Navbar
        products={products}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenWhatsAppDrawer={() => handleOpenWhatsAppDrawer()}
        onScrollToSection={handleScrollToSection}
      />

      {/* 3. Main Content Areas */}
      <main className="flex-1 w-full relative z-10">
        {/* Hero Section — Editorial European Centerpiece */}
        <section id="hero" className="w-full">
          <HeroSlider
            products={products}
            heroConfig={homepageConfig?.hero || heroConfig}
            onScrollToSection={handleScrollToSection}
          />
        </section>

        {/* 4. Trust Badges & European Quality Assurance Strip */}
        {showTrustBadges && (
          <TrustBadges 
            trustConfig={homepageConfig?.trustBadges}
            onScrollToReviews={() => handleScrollToSection('reviews')} 
          />
        )}

        {/* 5. Wholesale Spices Catalog */}
        {showCatalog && (
          <ProductCatalog
            products={products}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onOpenWhatsAppDrawer={(product, note) => handleOpenWhatsAppDrawer(product, note)}
          />
        )}

        {/* 6. B2B Services & Contract Packaging */}
        {showB2BServices && (
          <B2BServices
            servicesConfig={homepageConfig?.services}
            onOpenWhatsAppDrawer={handleOpenWhatsAppDrawer}
          />
        )}

        {/* 7. Quality & Terroir Accordion */}
        {showStory && (
          <QualityAccordion storyConfig={homepageConfig?.story} />
        )}

        {/* 8. Verified European & Global B2B Reviews */}
        {showReviews && (
          <ReviewsSlider reviewsConfig={homepageConfig?.reviews} />
        )}

        {/* 9. Instant Bulk Quotation RFQ Form */}
        {showRFQ && (
          <BulkInquiryForm products={products} />
        )}
      </main>

      {/* 10. Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenWhatsAppDrawer={() => handleOpenWhatsAppDrawer()}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* 11. Mobile Sticky Bottom Action Bar */}
      <MobileBottomBar
        onOpenWhatsAppDrawer={() => handleOpenWhatsAppDrawer()}
        onScrollToSection={handleScrollToSection}
      />

      {/* Desktop Floating WhatsApp Button — Vibrant Jewel Obsidian Emerald with Gold Aura */}
      <aside aria-label="WhatsApp quick chat" className="hidden sm:block fixed bottom-6 right-6 z-40">
        <button
          onClick={handleFloatingWhatsAppClick}
          className="p-4 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white rounded-full shadow-[0_12px_35px_rgba(4,26,18,0.4),0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_16px_45px_rgba(4,26,18,0.5),0_0_28px_rgba(245,158,11,0.45)] hover:scale-105 transition-all flex items-center justify-center group cursor-pointer border border-amber-400/50 ring-4 ring-emerald-500/10"
          aria-label="Direct 1-Click WhatsApp Inquiry"
          title="Direct 1-Click WhatsApp Commercial Desk"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 pointer-events-none" />
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2.5 text-amber-200 uppercase tracking-wider font-mono">
            WhatsApp Desk (1-Click)
          </span>
        </button>
      </aside>

      {/* Product Deep Specification Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* WhatsApp Fast Desk Custom Drawer */}
      <WhatsAppDrawer
        isOpen={whatsAppDrawerOpen}
        onClose={() => setWhatsAppDrawerOpen(false)}
        initialProduct={drawerProduct}
        initialNote={drawerNote}
        products={products}
      />

    </div>
  );
}
