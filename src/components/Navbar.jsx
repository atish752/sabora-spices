import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  MessageCircle, 
  FileText, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Award
} from 'lucide-react';
import { PRODUCTS, GENERAL_WHATSAPP_MESSAGE } from '../data/products';
import { SITE_CONFIG } from '../config/siteConfig';

export default function Navbar({ onSelectProduct, onOpenWhatsAppDrawer, onScrollToSection, products = PRODUCTS }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_30px_rgba(4,26,18,0.06)] transition-all w-full">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-4">
          
          {/* Brand Logo & Name (European Spice Purveyor Style) */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onScrollToSection('hero')}
              className="flex items-center gap-3.5 group text-left cursor-pointer"
            >
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-lg overflow-hidden border border-amber-400/80 shadow-sm group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all bg-white shrink-0 p-0.5">
                <img 
                  src="/images/logo.jpg" 
                  alt="Sabora Spices Logo" 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#041A12] group-hover:text-amber-600 transition-colors">
                    SABORA SPICES
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 rounded shadow-xs hidden sm:inline-block font-mono">
                    EU EXPORT
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 tracking-wider uppercase font-semibold">
                  Single-Estate Terroir & Agro Purveyors
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar with Architectural Styling */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-4 relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search collection (Cardamom, Turmeric, Makhana)..."
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs font-sans"
              />
              <Search className="w-4 h-4 text-emerald-800 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 p-4 animate-in fade-in duration-150">
                {searchQuery.trim() === '' ? (
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 font-mono">
                      Active Export Lots
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {products.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleProductSelect(p)}
                          className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-[#041A12] hover:text-amber-200 text-slate-800 rounded-md transition-colors font-medium border border-slate-200 cursor-pointer"
                        >
                          {p.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleProductSelect(p)}
                        className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg transition-colors text-left cursor-pointer group"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-10 h-10 object-contain rounded-md bg-white p-1 border border-slate-200 shadow-2xs" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 truncate">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-500 italic truncate font-serif">
                            {p.botanicalName || p.subtitle}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          MOQ: {(p.moq || '50 Kg').split('(')[0].trim()}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No spices found matching "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs xl:text-sm font-semibold tracking-wider uppercase text-slate-700">
            <button 
              onClick={() => onScrollToSection('catalog')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer relative group font-sans"
            >
              The Collection
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500" />
            </button>
            <button 
              onClick={() => onScrollToSection('quality')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer relative group font-sans"
            >
              Terroir & Standards
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500" />
            </button>
            <button 
              onClick={() => onScrollToSection('b2b-services')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer relative group font-sans"
            >
              B2B & Private Label
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500" />
            </button>
            <button 
              onClick={() => onScrollToSection('reviews')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer relative group font-sans"
            >
              Client Endorsements
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500" />
            </button>
            <button 
              onClick={() => onScrollToSection('inquiry-form')} 
              className="hover:text-[#041A12] transition-colors py-1 cursor-pointer text-amber-700 font-bold relative group font-sans"
            >
              Direct RFQ
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500" />
            </button>
          </nav>

          {/* Right Action: 1-Click WhatsApp CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGeneralWhatsApp}
              className="relative overflow-hidden hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white border border-amber-400/50 font-bold text-xs shadow-sm hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer group ring-1 ring-emerald-500/20"
              title="Open WhatsApp RFQ desk with 1 click"
            >
              <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform relative z-10 shrink-0" />
              <span className="tracking-wide relative z-10">WhatsApp RFQ Desk (1-Click)</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search Cardamom, Turmeric, Makhana..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-emerald-800 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile search dropdown */}
          {searchFocused && searchQuery.trim() !== '' && (
            <div className="mt-2 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleProductSelect(p)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded text-left cursor-pointer"
                  >
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-500 italic font-serif">{p.botanicalName || p.subtitle}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 p-2 text-center">No matching spices</p>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl flex flex-col justify-between border-r border-slate-200">
            <div className="p-5 space-y-5">
              
              {/* Brand card */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3 shadow-2xs">
                <img 
                  src="/images/logo.jpg" 
                  alt="Sabora Spices" 
                  className="w-12 h-12 rounded-md border border-amber-400 object-cover" 
                />
                <div>
                  <h4 className="font-cinzel font-bold text-base text-slate-900 tracking-wider">SABORA SPICES</h4>
                  <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest font-mono">Artisanal Terroir • EU Export</p>
                </div>
              </div>

              {/* Navigation Menu List */}
              <div className="divide-y divide-slate-100 text-xs font-bold uppercase tracking-wider text-slate-800">
                
                {/* Spices with accordion */}
                <div className="py-2.5">
                  <button
                    onClick={() => setActiveMobileCategory(activeMobileCategory === 'spices' ? null : 'spices')}
                    className="w-full flex items-center justify-between py-2 text-slate-900 cursor-pointer"
                  >
                    <span>The Spice Collection</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileCategory === 'spices' ? 'rotate-180 text-emerald-800' : 'text-slate-400'}`} />
                  </button>
                  
                  {activeMobileCategory === 'spices' && (
                    <div className="pl-3 py-2 space-y-2 border-l-2 border-amber-500 ml-1">
                      {products.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleProductSelect(p)}
                          className="flex items-center justify-between w-full py-1 text-xs text-slate-700 hover:text-emerald-900 text-left cursor-pointer"
                        >
                          <span>{p.name}</span>
                          <span className="text-[10px] text-amber-700 font-bold font-mono">Specs (COA) →</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="py-2.5">
                  <button 
                    onClick={() => { onScrollToSection('quality'); setMobileMenuOpen(false); }}
                    className="w-full text-left py-2 hover:text-emerald-900 cursor-pointer"
                  >
                    Terroir & EU Standards
                  </button>
                </div>

                <div className="py-2.5">
                  <button 
                    onClick={() => { onScrollToSection('b2b-services'); setMobileMenuOpen(false); }}
                    className="w-full text-left py-2 hover:text-emerald-900 cursor-pointer"
                  >
                    B2B & Private Labeling
                  </button>
                </div>

                <div className="py-2.5">
                  <button 
                    onClick={() => { onScrollToSection('reviews'); setMobileMenuOpen(false); }}
                    className="w-full text-left py-2 hover:text-emerald-900 cursor-pointer"
                  >
                    Client Endorsements
                  </button>
                </div>

                <div className="py-2.5">
                  <button 
                    onClick={() => { onScrollToSection('inquiry-form'); setMobileMenuOpen(false); }}
                    className="w-full text-left py-2 hover:text-emerald-900 cursor-pointer text-amber-700"
                  >
                    Request Bulk Quotation (RFQ)
                  </button>
                </div>

              </div>

              {/* B2B Trust Points in Drawer */}
              <div className="p-3.5 bg-slate-50 rounded-lg space-y-2 text-xs text-slate-600 border border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>EU Reg. (EC) 396/2005 & APEDA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Sealed Sample Kits for Food Laboratories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Direct WhatsApp Commercial Desk 24/7</span>
                </div>
              </div>

            </div>

            {/* Bottom Drawer Actions */}
            <div className="p-4 border-t border-slate-200 bg-white space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGeneralWhatsApp();
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#041A12] to-[#082E20] hover:brightness-110 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer border border-amber-400/40 font-mono"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span>Open WhatsApp RFQ Desk (1-Click)</span>
              </button>
              
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Desk: {SITE_CONFIG.phone}</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
