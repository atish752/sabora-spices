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

export default function HeaderNavbar({ onScrollToSection, onOpenQuoteModal, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId, filter = null) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    onScrollToSection(sectionId, filter);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ── Top Announcement & Contact Bar (Inspired by Shahi Food Services) ── */}
      <div className="bg-[#041A12] text-stone-200 text-xs border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Location & Phones */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Jahangirpuri, Delhi – 110033, India</span>
            </span>
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

          {/* Right: Regulatory Badges & WhatsApp Quick Desk */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/40 text-[11px] text-emerald-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              FSSAI & ISO Standards Compliant
            </span>
            
            <button
              onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to inquire about wholesale whole spices and makhana.")}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-[11px] text-emerald-200 hover:text-white transition-all font-medium cursor-pointer"
              title="Direct 1-Click WhatsApp Sourcing Desk"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              <span className="font-semibold text-amber-300">WhatsApp Desk</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-[11px] font-medium transition-colors cursor-pointer"
                title="Admin Management Portal"
              >
                <span>Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── Main Sticky Header ── */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-stone-200' 
          : 'bg-white py-3 border-b border-stone-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-50 to-stone-100 p-1 border border-amber-200/80 shadow-sm group-hover:scale-105 transition-transform">
              <img 
                src="/images/logo.png" 
                alt="Sabora Spices Logo" 
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F3D2E] group-hover:text-amber-700 transition-colors">
                SABORA SPICES
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-amber-700 uppercase">
                Whole Spices & Makhana
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (All 11 Menu Items) */}
          <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2 text-[13px] font-medium text-stone-700">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Home
            </button>

            <button 
              onClick={() => handleNavClick('about')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
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
                className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-amber-700 uppercase tracking-wider border-b border-stone-100 mb-1">
                    Core Product Portfolio
                  </div>
                  <button
                    onClick={() => handleNavClick('products', 'cardamom')}
                    className="w-full text-left px-3 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Whole Green Cardamom</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Kerala</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('products', 'makhana')}
                    className="w-full text-left px-3 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Makhana (Fox Nuts)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">Bihar</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('products', 'turmeric')}
                    className="w-full text-left px-3 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Whole Turmeric Fingers</span>
                    <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-mono">Salem</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('products', 'other')}
                    className="w-full text-left px-3 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-[#0F3D2E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Cloves & Other Whole Spices</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-mono">Handpicked</span>
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavClick('sourcing')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Sourcing & Origin
            </button>

            <button 
              onClick={() => handleNavClick('why-sabora')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Why Sabora
            </button>

            <button 
              onClick={() => handleNavClick('quality')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Quality & Safety
            </button>

            <button 
              onClick={() => handleNavClick('lab-testing')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Lab Testing
            </button>

            <button 
              onClick={() => handleNavClick('compliance')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Compliance
            </button>

            <button 
              onClick={() => handleNavClick('export')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Export Supply
            </button>

            <button 
              onClick={() => handleNavClick('faq')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              FAQ
            </button>

            <button 
              onClick={() => handleNavClick('contact')} 
              className="px-2.5 py-1.5 rounded-md hover:text-[#0F3D2E] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action: Request a Quote CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : handleNavClick('contact')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0F3D2E] to-[#1B4D3E] hover:from-[#14533C] hover:to-[#236350] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer border border-emerald-700/30"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Request Quote</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[96px] z-40 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-h-[calc(100vh-96px)] overflow-y-auto border-b border-stone-200 shadow-2xl p-5 space-y-4">
            
            {/* Sabora Brand Quick Bar */}
            <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
              <div>
                <div className="font-serif font-bold text-lg text-[#0F3D2E]">SABORA SPICES</div>
                <div className="text-xs text-amber-700 font-medium">Whole Spices & Makhana Sourcing</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Delhi, India
              </span>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 gap-1 text-sm font-medium text-stone-800">
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
              <div className="bg-stone-50 rounded-lg p-2.5 my-1">
                <button 
                  onClick={() => handleNavClick('products')}
                  className="w-full text-left font-bold text-[#0F3D2E] pb-1.5 flex items-center justify-between"
                >
                  <span>3. Products & Submenu</span>
                  <span className="text-xs text-stone-500 font-normal">View All</span>
                </button>
                <div className="pl-3 space-y-1.5 pt-1 text-xs text-stone-700">
                  <button 
                    onClick={() => handleNavClick('products', 'cardamom')}
                    className="w-full text-left py-1 hover:text-emerald-700 flex items-center justify-between"
                  >
                    <span>• Whole Green Cardamom (Elaichi)</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1 rounded">Kerala</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('products', 'makhana')}
                    className="w-full text-left py-1 hover:text-amber-700 flex items-center justify-between"
                  >
                    <span>• Makhana (Fox Nuts)</span>
                    <span className="text-[10px] text-amber-800 bg-amber-100 px-1 rounded">Bihar</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('products', 'turmeric')}
                    className="w-full text-left py-1 hover:text-yellow-700 flex items-center justify-between"
                  >
                    <span>• Whole Turmeric Fingers</span>
                    <span className="text-[10px] text-yellow-800 bg-yellow-100 px-1 rounded">Salem</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('products', 'other')}
                    className="w-full text-left py-1 hover:text-stone-700 flex items-center justify-between"
                  >
                    <span>• Cloves & Other Whole Spices</span>
                    <span className="text-[10px] text-stone-600 bg-stone-200 px-1 rounded">Handpicked</span>
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
                onClick={() => handleNavClick('faq')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                10. FAQ
              </button>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-50 hover:text-[#0F3D2E] transition-colors"
              >
                11. Contact Us
              </button>
            </div>

            {/* Direct Contact Actions in Mobile Drawer */}
            <div className="pt-3 border-t border-stone-200 space-y-2">
              <a 
                href={`tel:${SITE_CONFIG.primaryPhoneRaw}`}
                className="w-full py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Us: +91 78809 06610</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to inquire about wholesale whole spices and makhana.");
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
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
                  className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
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
