import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { PRODUCTS, GENERAL_WHATSAPP_MESSAGE } from '../data/products';
import { SITE_CONFIG } from '../config/siteConfig';

export default function Navbar({ onSelectProduct, onOpenWhatsAppDrawer, onScrollToSection, products = PRODUCTS }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  
  const searchRef = useRef(null);

  // Filtered search results
  const filteredProducts = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.botanicalName && p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.origin && p.origin.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const handleProductSelect = (product) => {
    onSelectProduct(product);
    setSearchFocused(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const handleGeneralWhatsApp = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_25px_rgba(4,26,18,0.04)] transition-all w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onScrollToSection('hero')}
              className="flex items-center gap-3.5 group text-left cursor-pointer"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-amber-400/80 shadow-xs group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all bg-white shrink-0 p-0.5">
                <img 
                  src="/images/logo.jpg" 
                  alt="Sabora Spices" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-[0.12em] sm:tracking-[0.16em] text-[#041A12] group-hover:text-amber-700 transition-colors">
                    SABORA SPICES
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-900 border border-amber-400/60 rounded hidden sm:inline-block font-mono">
                    EU EXPORT
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-sans text-slate-500 tracking-wider uppercase font-semibold">
                  Artisanal Terroir Spices
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-4 relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search cardamom, turmeric, makhana..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all font-sans"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 p-4 animate-in fade-in duration-150">
                {searchQuery.trim() === '' ? (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                      Featured Harvest Lots
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {products.slice(0, 4).map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleProductSelect(p)}
                          className="text-xs px-2.5 py-1 bg-slate-50 hover:bg-[#041A12] hover:text-amber-300 text-slate-700 rounded-lg transition-colors font-medium border border-slate-200"
                        >
                          {p.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {filteredProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleProductSelect(p)}
                        className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-9 h-9 object-contain rounded-lg bg-slate-50 p-1 border border-slate-200" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-500 italic truncate font-serif">
                            {p.subtitle || p.origin}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                          MOQ: {(p.moq || '50 Kg').split('(')[0].trim()}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-slate-500">
                    No products found matching "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase text-slate-600 font-sans">
            <button 
              onClick={() => onScrollToSection('catalog')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer"
            >
              Collection
            </button>
            <button 
              onClick={() => onScrollToSection('quality')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer"
            >
              Standards
            </button>
            <button 
              onClick={() => onScrollToSection('b2b-services')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer"
            >
              B2B Supply
            </button>
            <button 
              onClick={() => onScrollToSection('reviews')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => onScrollToSection('inquiry-form')} 
              className="hover:text-amber-700 transition-colors py-1 cursor-pointer font-bold text-amber-800"
            >
              RFQ Desk
            </button>
          </nav>

          {/* Right Action: WhatsApp CTA Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleGeneralWhatsApp}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white border border-amber-400/50 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer font-mono"
              title="Open WhatsApp RFQ desk with 1 click"
            >
              <div className="relative flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 relative" />
              </div>
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline tracking-wide">Inquire (1-Click)</span>
              <span className="sm:hidden tracking-wide text-[11px]">Inquire</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-5 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 font-serif text-lg font-bold text-slate-800">
            <button
              onClick={() => {
                onScrollToSection('catalog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-emerald-800 transition-colors flex items-center justify-between border-b border-slate-100"
            >
              <span>The Collection</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                onScrollToSection('quality');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-emerald-800 transition-colors flex items-center justify-between border-b border-slate-100"
            >
              <span>Terroir & Quality Standards</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                onScrollToSection('b2b-services');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-emerald-800 transition-colors flex items-center justify-between border-b border-slate-100"
            >
              <span>B2B Wholesale & Private Label</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                onScrollToSection('reviews');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-emerald-800 transition-colors flex items-center justify-between border-b border-slate-100"
            >
              <span>European Client Reviews</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                onScrollToSection('inquiry-form');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-amber-700 hover:text-amber-800 transition-colors flex items-center justify-between"
            >
              <span>Request Wholesale Quotation (RFQ)</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                handleGeneralWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#041A12] to-[#082E20] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-400/40 shadow-md font-mono"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>Connect on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
