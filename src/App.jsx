import React, { useState, useEffect, useCallback } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import FooterSection from './components/FooterSection';
import MobileFloatingBar from './components/MobileFloatingBar';
import ProductDetailModal from './components/ProductDetailModal';
import AdminPanel from './components/AdminPanel';

// Dedicated Separate Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import SourcingPage from './pages/SourcingPage';
import WhySaboraPage from './pages/WhySaboraPage';
import QualityPage from './pages/QualityPage';
import LabTestingPage from './pages/LabTestingPage';
import CompliancePage from './pages/CompliancePage';
import ExportPage from './pages/ExportPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from './config/siteConfig';
import { useProducts } from './hooks/useProducts';

/**
 * Route resolution helper supporting:
 * 1. Pathname: /about, /products, /sourcing, /why-sabora, /quality, /lab-testing, /compliance, /export, /faq, /contact, /admin
 * 2. Search query params fallback: ?page=about, ?page=admin
 * 3. Hash fallback: #/about, #about
 */
function parseCurrentRoute() {
  if (typeof window === 'undefined') {
    return { route: 'home', params: {} };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const queryPage = urlParams.get('page');
  const queryCategory = urlParams.get('category');
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

  const validRoutes = [
    'about',
    'products',
    'sourcing',
    'why-sabora',
    'quality',
    'lab-testing',
    'compliance',
    'export',
    'faq',
    'contact',
    'admin'
  ];

  let resolvedRoute = 'home';
  let params = {};

  if (queryCategory) {
    params.category = queryCategory;
  }

  // Check query parameter ?page=...
  if (queryPage && validRoutes.includes(queryPage)) {
    resolvedRoute = queryPage;
  }
  // Check pathname /... or subpaths
  else if (path) {
    const segments = path.split('/').filter(Boolean);
    const matched = segments.find(s => validRoutes.includes(s));
    if (matched) {
      resolvedRoute = matched;
    }
  }
  // Check hash #/...
  if (resolvedRoute === 'home' && hash) {
    const hashSegments = hash.split('?')[0].split('/').filter(Boolean);
    const matchedHash = hashSegments.find(s => validRoutes.includes(s));
    if (matchedHash) {
      resolvedRoute = matchedHash;
    }
  }

  return { route: resolvedRoute, params };
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

  const initialRouteInfo = parseCurrentRoute();
  const [currentRoute, setCurrentRoute] = useState(initialRouteInfo.route);
  const [routeParams, setRouteParams] = useState(initialRouteInfo.params);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [preselectedQuoteProduct, setPreselectedQuoteProduct] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize route with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentRoute();
      setCurrentRoute(parsed.route);
      setRouteParams(parsed.params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  // Update document title dynamically according to the dedicated page
  useEffect(() => {
    const titles = {
      home: "SABORA SPICES | Whole Spices & Makhana. Sourced with Purpose.",
      about: "About Us | SABORA SPICES — Connecting Quality Products with Business Opportunities",
      products: "Products & Grading Specifications | SABORA SPICES",
      sourcing: "Sourcing & Origin Belts | SABORA SPICES — Kerala, Bihar & Salem",
      'why-sabora': "Why Sabora | SABORA SPICES — 14 Core Pillars of Buyer Trust",
      quality: "Quality Assurance & Food Safety | SABORA SPICES",
      'lab-testing': "Accredited Laboratory Testing & CoA | SABORA SPICES",
      compliance: "Regulatory Compliance & FSSAI Standards | SABORA SPICES",
      export: "Global Export Supply & Logistics | SABORA SPICES",
      faq: "Frequently Asked Questions (FAQ) | SABORA SPICES",
      contact: "Contact Us & Request a Wholesale Quote | SABORA SPICES",
      admin: "Admin Management Portal | SABORA SPICES"
    };

    if (titles[currentRoute]) {
      document.title = titles[currentRoute];
    }
  }, [currentRoute]);

  /**
   * Universal navigation function to transition between separate dedicated pages
   */
  const navigateTo = useCallback((targetRoute, params = {}) => {
    let cleanRoute = (targetRoute || 'home').toLowerCase().trim();
    if (cleanRoute.startsWith('/')) cleanRoute = cleanRoute.slice(1);
    if (cleanRoute.startsWith('#')) cleanRoute = cleanRoute.slice(1);
    if (cleanRoute === 'hero') cleanRoute = 'home';

    let mergedParams = { ...params };
    if (cleanRoute.includes('?')) {
      const [r, q] = cleanRoute.split('?');
      cleanRoute = r;
      const sp = new URLSearchParams(q);
      for (const [k, v] of sp.entries()) {
        mergedParams[k] = v;
      }
    }

    setCurrentRoute(cleanRoute);
    setRouteParams(mergedParams);

    // Build standard URL
    let newPath = '/';
    if (cleanRoute !== 'home') {
      newPath = `/${cleanRoute}`;
    }

    if (mergedParams.category) {
      newPath += `?category=${encodeURIComponent(mergedParams.category)}`;
    }

    try {
      window.history.pushState({ route: cleanRoute, params: mergedParams }, '', newPath);
    } catch (e) {
      console.warn("History pushState exception:", e);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenQuoteModal = useCallback((product = null) => {
    if (product) {
      setPreselectedQuoteProduct(product);
    }
    navigateTo('contact');
  }, [navigateTo]);

  // ── Admin Panel View ───────────────────────────────────────────────────────
  if (currentRoute === 'admin') {
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
        onClose={() => navigateTo('home')}
      />
    );
  }

  // ── Public Sabora Spices Multi-Page Website ────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAF9] text-stone-900 flex flex-col font-sans antialiased selection:bg-[#041A12] selection:text-amber-300 relative overflow-x-hidden w-full">
      
      {/* Hairline Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400 z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Sticky Header with Top Announcement & 11-Item Navigation */}
      <HeaderNavbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Main Multi-Page Routed Content Blueprint */}
      <main className="flex-1 w-full relative z-10">
        
        {/* 1. Home Page */}
        {currentRoute === 'home' && (
          <HomePage
            heroSlides={heroSlides}
            products={products}
            onNavigate={navigateTo}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 2. Dedicated About Us Page */}
        {currentRoute === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 3. Dedicated Products Page & Submenu */}
        {currentRoute === 'products' && (
          <ProductsPage
            products={products}
            initialFilter={routeParams.category || 'all'}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigate={navigateTo}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 4. Dedicated Sourcing & Origin Page */}
        {currentRoute === 'sourcing' && (
          <SourcingPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 5. Dedicated Why Sabora Page (14 Pillars) */}
        {currentRoute === 'why-sabora' && (
          <WhySaboraPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 6. Dedicated Quality & Food Safety Page */}
        {currentRoute === 'quality' && (
          <QualityPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 7. Dedicated Laboratory Testing Page */}
        {currentRoute === 'lab-testing' && (
          <LabTestingPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 8. Dedicated Regulatory Compliance Page */}
        {currentRoute === 'compliance' && (
          <CompliancePage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 9. Dedicated International & Export Supply Page */}
        {currentRoute === 'export' && (
          <ExportPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 10. Dedicated Frequently Asked Questions Page (25 FAQs) */}
        {currentRoute === 'faq' && (
          <FaqPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
          />
        )}

        {/* 11. Dedicated Contact Us & RFQ Desk Page */}
        {currentRoute === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSubmitInquiry={submitInquiry}
            preselectedProduct={preselectedQuoteProduct}
          />
        )}

      </main>

      {/* Footer Section with Complete Menu, Policies, and Admin Link */}
      <FooterSection
        onNavigate={navigateTo}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Sticky Mobile Bottom Floating Action Bar */}
      <MobileFloatingBar
        onOpenQuoteModal={handleOpenQuoteModal}
        onScrollToSection={(sectionId) => navigateTo(sectionId)}
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

      {/* Product Detail Dossier Modal (Callable from any page) */}
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
