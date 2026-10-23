import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function FloatingNavbar({ onScrollToSection, onOpenWhatsAppDrawer, products = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  const navLinks = [
    { label: 'The Collection', id: 'collection' },
    { label: 'Quality Standards', id: 'standards' },
    { label: 'Wholesale & OEM', id: 'solutions' },
    { label: 'Quick RFQ', id: 'rfq-desk' },
  ];

  return (
    <>
      {/* Floating Glassmorphism Pill Container */}
      <header className="fixed top-4 sm:top-6 inset-x-0 mx-auto z-50 max-w-5xl px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.08)]'
              : 'bg-white/80 backdrop-blur-md border-stone-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => {
              onScrollToSection('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-amber-400/80 p-0.5 bg-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/images/logo.jpg"
                alt="Sabora Spices"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.14em] text-stone-900 group-hover:text-emerald-900 transition-colors">
                  SABORA
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 hidden xs:inline-block">
                  EU EXPORT
                </span>
              </div>
              <span className="text-[9px] font-sans text-stone-500 tracking-wider uppercase font-semibold hidden sm:inline">
                Single-Estate Terroirs
              </span>
            </div>
          </button>

          {/* Minimalist Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-950 hover:bg-stone-100/80 transition-all cursor-pointer font-sans"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action: WhatsApp RFQ Pill & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] text-white text-xs font-semibold tracking-wide border border-amber-400/40 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
              title="1-Click WhatsApp RFQ Desk"
            >
              <div className="relative">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="font-mono text-[11px] sm:text-xs">Instant RFQ</span>
              <ArrowUpRight className="w-3 h-3 text-amber-300/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform hidden sm:inline-block" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 mx-auto max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-stone-200 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onScrollToSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-2">
              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-2xl bg-[#041A12] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-2 border border-amber-400/50 shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>WhatsApp RFQ Desk (1-Click)</span>
              </button>

              <button
                onClick={() => {
                  onOpenWhatsAppDrawer();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-2xl bg-stone-100 text-stone-800 text-xs font-medium hover:bg-stone-200 transition-colors"
              >
                Custom Quotation Builder
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
