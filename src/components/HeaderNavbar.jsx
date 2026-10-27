import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  FileText,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HeaderNavbar({ currentRoute = 'home', onNavigate, onScrollToSection, onOpenQuoteModal, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const headerRef = React.useRef(null);
  const [headerHeight, setHeaderHeight] = useState(136);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [scrolled]);

  const handleNavClick = (route, filter = null) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    if (onNavigate) {
      if (filter) onNavigate('products', { category: filter });
      else if (route === 'hero') onNavigate('home');
      else onNavigate(route);
    } else if (onScrollToSection) {
      onScrollToSection(route, filter);
    }
  };

  const isActive = (route) => {
    if (route === 'home' || route === 'hero') return currentRoute === 'home' || currentRoute === '';
    return currentRoute === route;
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ── Top Announcement & Contact Bar (Inspired by Shahi Food Services) ── */}
      <div className="bg-[#041A12] text-stone-200 text-xs border-b border-emerald-900/40 w-full">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Left: Location & Phones */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-xs font-medium w-full sm:w-auto">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Jahangirpuri, Delhi – 110033, India</span>
            </span>
            {/* Mobile Statutory Badges Row (< sm) */}
            <div className="flex sm:hidden items-center justify-center gap-1.5 flex-wrap text-2xs w-full">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-stone-200/90 shadow-2xs text-3xs font-mono font-bold text-[#0B2568]" title={`FSSAI Central / State License No: ${SITE_CONFIG.fssaiNumber}`}>
                <img src="/images/fssai-logo.png" alt="FSSAI" className="h-3 w-auto object-contain" />
                <span>Lic. {SITE_CONFIG.fssaiNumber}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-700/60 text-3xs text-emerald-300 font-mono font-semibold" title={`ISO 9001:2015 Certificate: ${SITE_CONFIG.isoNumber}`}>
                <ShieldCheck className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span>ISO: {SITE_CONFIG.isoNumber}</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-stone-900/90 border border-stone-700/60 text-3xs text-stone-300 font-mono" title={`GSTIN: ${SITE_CONFIG.gstin}`}>
                <span>GST: {SITE_CONFIG.gstin}</span>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 border-l border-emerald-800/60 pl-3">
              <a 
                href={`tel:${SITE_CONFIG.primaryPhoneRaw}`} 
                className="flex items-center gap-1.5 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 78809 06610</span>
              </a>
              <span className="text-stone-500">|</span>
              <a 
                href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`} 
                className="text-stone-300 hover:text-amber-400 transition-colors"
              >
                +91 95327 01582
              </a>
            </div>
          </div>

          {/* Right: Statutory Badges, WhatsApp Desk and Request Quote */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-2.5">
            {/* Official Statutory Badges: FSSAI, ISO 9001:2015 & GSTIN */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-stone-200/90 shadow-2xs text-2xs font-mono font-bold text-[#0B2568]" title={`FSSAI Central / State License No: ${SITE_CONFIG.fssaiNumber}`}>
                <img src="/images/fssai-logo.png" alt="FSSAI" className="h-3.5 w-auto object-contain" />
                <span>Lic. {SITE_CONFIG.fssaiNumber}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-950/90 border border-emerald-700/60 text-2xs text-emerald-300 font-mono font-semibold" title={`ISO 9001:2015 Certificate of Compliance: ${SITE_CONFIG.isoNumber}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ISO: {SITE_CONFIG.isoNumber}</span>
              </span>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-stone-900/90 border border-stone-700/60 text-2xs text-stone-300 font-mono" title={`GSTIN: ${SITE_CONFIG.gstin}`}>
                <span>GST: {SITE_CONFIG.gstin}</span>
              </span>
            </div>
            
            <div className="hidden md:flex lg:hidden items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-stone-200 text-2xs font-mono font-bold text-[#0B2568]" title={`FSSAI Central / State License No: ${SITE_CONFIG.fssaiNumber}`}>
              <img src="/images/fssai-logo.png" alt="FSSAI" className="h-3.5 w-auto object-contain" />
              <span>{SITE_CONFIG.fssaiNumber}</span>
            </div>
            
            <button
              onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to inquire about wholesale whole spices and makhana.")}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-2xs sm:text-xs text-emerald-200 hover:text-white transition-all font-semibold cursor-pointer shadow-2xs whitespace-nowrap active:scale-95"
              title="Direct 1-Click WhatsApp Sourcing Desk"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 shrink-0" />
              <span className="text-amber-300">WhatsApp Desk</span>
            </button>

            <button
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : handleNavClick('contact')}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-2xs sm:text-xs font-bold transition-all cursor-pointer shadow-2xs whitespace-nowrap border border-amber-300/40 active:scale-95"
              title="Request Instant Wholesale Quote"
            >
              <FileText className="w-3.5 h-3.5 text-stone-950 shrink-0" />
              <span>Request Quote</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-2xs sm:text-xs font-medium transition-colors cursor-pointer"
                title="Admin Management Portal"
              >
                <span>Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── Main Sticky Header (Spans full width with max-w-[1440px] interior) ── */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-stone-200' 
          : 'bg-white py-3 border-b border-stone-100'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          
          {/* Logo & Brand Identity: Cleanly separated, never overlapping */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              className="relative flex items-center justify-center shrink-0 group focus:outline-none"
              title="Sabora Spices Home"
            >
              <img 
                src="/images/logo.png" 
                alt="Sabora Spices Logo" 
                className="h-8 sm:h-9 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
              />
            </a>

            <div className="flex flex-col">
              <a 
                href="/" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                className="font-serif text-base sm:text-lg md:text-xl font-black tracking-tight text-[#0F3D2E] hover:text-amber-700 transition-colors whitespace-nowrap focus:outline-none leading-tight"
              >
                SABORA SPICES
              </a>
              <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-amber-700 uppercase leading-none mt-0.5">
                whole spices & makhana
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (All 11 Dedicated Pages) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-sm 2xl:text-base font-semibold text-stone-700 whitespace-nowrap">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`px-2.5 2xl:px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('home')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Home
            </button>

            <button 
              onClick={() => handleNavClick('about')} 
              className={`px-2.5 2xl:px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('about')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              About Us
            </button>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNavClick('products')}
                className={`px-2.5 2xl:px-3 py-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  isActive('products')
                    ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                    : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
                }`}
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2.5 z-50 animate-fadeIn">
                  <div className="px-3.5 py-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider border-b border-stone-100 mb-1 flex items-center justify-between">
                    <span>Products Submenu</span>
                    <button 
                      onClick={() => handleNavClick('products')}
                      className="text-xs text-emerald-700 hover:underline normal-case font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <button
                    onClick={() => handleNavClick('products', 'cardamom')}
                    className="w-full text-left px-3.5 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Whole Green Cardamom</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">Kerala</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('products', 'makhana')}
                    className="w-full text-left px-3.5 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Makhana (Fox Nuts)</span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">Bihar</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('products', 'turmeric')}
                    className="w-full text-left px-3.5 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Whole Turmeric Fingers</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-mono">Salem</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('products', 'other')}
                    className="w-full text-left px-3.5 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Cloves, Pepper, Cumin & Spices</span>
                    <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono">Handpicked</span>
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavClick('sourcing')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('sourcing')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Sourcing & Origin
            </button>

            <button 
              onClick={() => handleNavClick('why-sabora')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('why-sabora')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Why Sabora
            </button>

            <button 
              onClick={() => handleNavClick('quality')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('quality')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Quality & Safety
            </button>

            <button 
              onClick={() => handleNavClick('lab-testing')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('lab-testing')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Lab Testing
            </button>

            <button 
              onClick={() => handleNavClick('compliance')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('compliance')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Compliance
            </button>

            <button 
              onClick={() => handleNavClick('export')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('export')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Export Supply
            </button>

            <button 
              onClick={() => handleNavClick('contact')} 
              className={`px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-md transition-all cursor-pointer ${
                isActive('contact')
                  ? 'bg-emerald-50 text-[#0F3D2E] font-bold shadow-xs border-b-2 border-emerald-700'
                  : 'hover:text-[#0F3D2E] hover:bg-emerald-50/70'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action: Mobile Hamburger Button (WhatsApp Desk already present at very top announcement bar beside Request Quote) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 sm:p-2.5 rounded-xl text-[#0F3D2E] hover:text-[#041A12] bg-stone-50 hover:bg-stone-100 border border-stone-200/90 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div 
          style={{ top: `${headerHeight}px` }}
          className="xl:hidden fixed inset-x-0 bottom-0 z-40 bg-black/60 backdrop-blur-sm animate-fadeIn" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}
            className="bg-white w-full overflow-y-auto border-b border-stone-200 shadow-2xl p-5 space-y-4" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Sabora Brand Quick Bar */}
            <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
              <div>
                <div className="font-serif font-bold text-xl text-[#0F3D2E]">SABORA SPICES</div>
                <div className="text-xs sm:text-sm text-amber-700 font-medium">Whole Spices & Makhana Sourcing</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Delhi, India
              </span>
            </div>

            {/* Official Statutory Badges in Mobile Drawer */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5">
              <div className="text-3xs font-mono font-bold text-amber-700 uppercase tracking-wider">
                Official Statutory Registrations
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-stone-200 shadow-2xs font-mono text-2xs font-bold text-[#0B2568]">
                  <img src="/images/fssai-logo.png" alt="FSSAI" className="h-3.5 w-auto object-contain" />
                  <span>Lic. {SITE_CONFIG.fssaiNumber}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-2xs font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>ISO: {SITE_CONFIG.isoNumber}</span>
                </span>
                <span className="px-2 py-1 rounded-md bg-stone-200 text-stone-800 text-2xs font-mono">
                  GST: {SITE_CONFIG.gstin}
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 gap-1 text-base font-medium text-stone-800">
              <button 
                onClick={() => handleNavClick('hero')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                1. Home
              </button>
              <button 
                onClick={() => handleNavClick('about')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                2. About Us
              </button>
              
              {/* Products Submenu Accordion */}
              <div className="bg-stone-50 rounded-xl p-3 my-1">
                <button 
                  onClick={() => handleNavClick('products')}
                  className="w-full text-left font-bold text-[#0F3D2E] text-base pb-1.5 flex items-center justify-between"
                >
                  <span>3. Products & Submenu</span>
                  <span className="text-xs text-stone-500 font-normal">View All</span>
                </button>
                <div className="pl-3 space-y-2 pt-1 text-sm text-stone-700">
                  <button 
                    onClick={() => handleNavClick('products', 'cardamom')}
                    className="w-full text-left py-1 hover:text-emerald-700 flex items-center justify-between"
                  >
                    <span>• Whole Green Cardamom (Elaichi)</span>
                    <span className="text-xs text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-mono">Kerala</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('products', 'makhana')}
                    className="w-full text-left py-1 hover:text-amber-700 flex items-center justify-between"
                  >
                    <span>• Makhana (Fox Nuts)</span>
                    <span className="text-xs text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono">Bihar</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('products', 'turmeric')}
                    className="w-full text-left py-1 hover:text-yellow-700 flex items-center justify-between"
                  >
                    <span>• Whole Turmeric Fingers</span>
                    <span className="text-xs text-yellow-800 bg-yellow-100 px-1.5 py-0.5 rounded font-mono">Salem</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('products', 'other')}
                    className="w-full text-left py-1 hover:text-stone-700 flex items-center justify-between"
                  >
                    <span>• Cloves, Pepper, Cumin & Spices</span>
                    <span className="text-xs text-stone-600 bg-stone-200 px-1.5 py-0.5 rounded font-mono">Handpicked</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleNavClick('sourcing')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                4. Sourcing & Origin
              </button>
              <button 
                onClick={() => handleNavClick('why-sabora')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                5. Why Sabora
              </button>
              <button 
                onClick={() => handleNavClick('quality')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                6. Quality & Food Safety
              </button>
              <button 
                onClick={() => handleNavClick('lab-testing')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                7. Laboratory Testing
              </button>
              <button 
                onClick={() => handleNavClick('compliance')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                8. Regulatory Compliance
              </button>
              <button 
                onClick={() => handleNavClick('export')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                9. International & Export Supply
              </button>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                10. Contact Us
              </button>
              <button 
                onClick={() => handleNavClick('privacy')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors text-stone-600"
              >
                11. Privacy Policy
              </button>
              <button 
                onClick={() => handleNavClick('terms')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors text-stone-600"
              >
                12. Terms & Conditions
              </button>
            </div>

            {/* Direct Contact Actions in Mobile Drawer */}
            <div className="pt-3 border-t border-stone-200 space-y-2">
              <a 
                href={`tel:${SITE_CONFIG.primaryPhoneRaw}`}
                className="w-full py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Us: +91 78809 06610</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to inquire about wholesale whole spices and makhana.");
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (1-Click)</span>
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Admin Management Portal</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
