import React, { useState, useEffect } from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import ModernHero from './components/ModernHero';
import MarqueeTape from './components/MarqueeTape';
import ModernCollection from './components/ModernCollection';
import StandardsGrid from './components/StandardsGrid';
import ModernSolutions from './components/ModernSolutions';
import QuickRfqDesk from './components/QuickRfqDesk';
import EuropeanTrust from './components/EuropeanTrust';
import ModernFooter from './components/ModernFooter';
import MobileBottomBar from './components/MobileBottomBar';
import ProductModal from './components/ProductModal';
import WhatsAppDrawer from './components/WhatsAppDrawer';
import AdminPanel from './components/AdminPanel';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from './data/products';
import { useProducts } from './hooks/useProducts';

// Admin panel URL query parameter check
function isAdminRoute() {
  return (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('page') === 'admin'
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

  // Hairline scroll progress indicator
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
    const aliasMap = {
      catalog: 'collection',
      products: 'collection',
      quality: 'standards',
      'b2b-services': 'solutions',
      services: 'solutions',
      reviews: 'trust',
      testimonials: 'trust',
      'inquiry-form': 'rfq-desk',
      rfq: 'rfq-desk',
    };
    const targetId = aliasMap[sectionId] || sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFloatingWhatsAppClick = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  // ── Admin Mode View ───────────────────────────────────────────────────────
  if (showAdmin) {
    return (
      <AdminPanel
        products={products}
        heroConfig={homepageConfig?.hero || heroConfig}
        onSaveProducts={saveProducts}
        onSaveHeroConfig={saveHeroConfig}
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

  // ── Modern European Public Website ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans antialiased selection:bg-[#041A12] selection:text-amber-300 relative overflow-x-hidden">
      
      {/* Luxury Hairline Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400 z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Modern Glassmorphism Pill Navbar */}
      <FloatingNavbar
        products={products}
        onScrollToSection={handleScrollToSection}
        onOpenWhatsAppDrawer={() => handleOpenWhatsAppDrawer()}
      />

      {/* Main Content Blueprint */}
      <main className="flex-1 w-full relative z-10">
        
        {/* 1. Hero Section: Editorial Typography & Interactive Product Showcase */}
        <section id="hero" className="w-full">
          <ModernHero
            heroConfig={homepageConfig?.hero || heroConfig}
            products={products}
            onScrollToSection={handleScrollToSection}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        </section>

        {/* 2. Sleek Infinite Export Quality Tape */}
        <MarqueeTape />

        {/* 3. The 2026 Collection (Product Grid) */}
        <ModernCollection
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenWhatsAppDrawer={(product, note) => handleOpenWhatsAppDrawer(product, note)}
        />

        {/* 4. Why Sabora / European Regulatory Standards (NO Accordion) */}
        <StandardsGrid />

        {/* 5. Wholesale & Private Label Solutions */}
        <ModernSolutions />

        {/* 6. Interactive Quick RFQ Desk */}
        <QuickRfqDesk />

        {/* 7. Verified European Commercial Trust */}
        <EuropeanTrust />

      </main>

      {/* Modern Luxury Footer */}
      <ModernFooter
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileBottomBar
        onOpenWhatsAppDrawer={() => handleOpenWhatsAppDrawer()}
        onScrollToSection={handleScrollToSection}
      />

      {/* Desktop Floating WhatsApp Button */}
      <aside aria-label="WhatsApp quick chat" className="hidden sm:block fixed bottom-6 right-6 z-40">
        <button
          onClick={handleFloatingWhatsAppClick}
          className="p-3.5 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white rounded-full shadow-[0_12px_35px_rgba(4,26,18,0.35)] hover:shadow-[0_16px_45px_rgba(4,26,18,0.45)] hover:scale-105 transition-all flex items-center justify-center group cursor-pointer border border-amber-400/50"
          aria-label="Direct 1-Click WhatsApp Inquiry"
          title="Direct 1-Click WhatsApp Commercial Desk"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 pointer-events-none" />
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
