import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import TrustHighlightsBar from '../components/TrustHighlightsBar';
import { 
  Leaf, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Package,
  Mail,
  MessageCircle,
  Award,
  FileText
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HomePage({
  heroSlides,
  products,
  onNavigate,
  onSelectProduct,
  onOpenQuoteModal,
  onSubmitInquiry
}) {
  const [activeTab, setActiveTab] = useState('all');

  // Filter products for homepage showcase
  const featuredProducts = (products || []).filter(p => {
    if (activeTab === 'all') return true;
    return p.categoryKey === activeTab;
  }).slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. Permanent Responsive Video Hero (Landscape on Desktop, Portrait on Mobile) */}
      <HeroSection
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 2. Trust Highlights Bar (Single Row Infinite Continuous Auto-Scroll) */}
      <TrustHighlightsBar
        onScrollToSection={(target) => onNavigate && onNavigate(target)}
      />

      {/* 3. Featured Products Showcase */}
      <section className="py-12 sm:py-16 bg-[#F8FAF9] border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>Wholesale Portfolio</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-900 tracking-tight">
                Featured Whole Crops
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-normal">
                Direct origin procurement • Hand-sorted whole spices • Tested before dispatch
              </p>
            </div>

            {/* View Full Portfolio Link */}
            <div className="shrink-0">
              <button
                onClick={() => onNavigate && onNavigate('products')}
                className="px-5 py-2.5 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-amber-300 hover:text-white text-sm sm:text-base font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'cardamom', label: 'Green Cardamom' },
              { id: 'makhana', label: 'Makhana (Fox Nuts)' },
              { id: 'turmeric', label: 'Turmeric Fingers' },
              { id: 'other', label: 'Cloves & Pepper' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0F3D2E] text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-600 hover:text-[#0F3D2E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border-2 border-stone-200/90 hover:border-emerald-600/70 shadow-[0_4px_24px_rgba(4,26,18,0.06)] hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group relative"
              >
                {/* Visual Area */}
                <div 
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                  className="relative h-60 sm:h-68 w-full bg-gradient-to-b from-stone-100 via-stone-50 to-white overflow-hidden cursor-pointer flex items-center justify-center p-5 border-b border-stone-200/70"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-lg bg-[#041A12]/90 text-amber-300 text-xs font-bold backdrop-blur-sm shadow-sm">
                      {product.origin?.split(',')[0] || "India"}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {product.category || "Whole Agricultural Product"}
                    </div>
                    <h3 
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="font-serif text-xl sm:text-2xl font-black text-stone-900 group-hover:text-[#0F3D2E] transition-colors cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal line-clamp-2">
                      {product.tagline || product.subtitle}
                    </p>
                  </div>

                  {/* Clean Specs Dossier Box */}
                  <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-stone-200/80 space-y-2 text-xs sm:text-sm">
                    {product.gradesAvailable && (
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-stone-500 font-medium shrink-0">Grades:</span>
                        <span className="font-bold text-stone-800 text-right truncate">
                          {product.gradesAvailable.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    )}
                    {product.moq && (
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200/50">
                        <span className="text-stone-500 font-medium">Wholesale MOQ:</span>
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                          {product.moq}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-2.5 mt-auto">
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onSelectProduct && onSelectProduct(product)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-[#0F3D2E] bg-stone-50/70 hover:bg-white text-stone-800 hover:text-[#0F3D2E] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800 shrink-0" />
                        <span>Specifications</span>
                      </button>

                      <button
                        onClick={() => {
                          const text = SITE_CONFIG.getProductWhatsAppMessage(product);
                          SITE_CONFIG.openWhatsApp(text);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Direct WhatsApp Quote"
                      >
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 fill-emerald-600 shrink-0" />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenQuoteModal && onOpenQuoteModal(product)}
                      className="w-full py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Streamlined 3-Pillar Sourcing & Standards Overview */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Core Supply Pillars</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-900 tracking-tight">
              Direct Origin Purity & Testing
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-normal">
              Supplying food manufacturers, retail brands, and wholesale distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Sourcing */}
            <div 
              onClick={() => onNavigate && onNavigate('sourcing')}
              className="p-6 sm:p-7 rounded-2xl bg-stone-50 hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-500/40 transition-all cursor-pointer group space-y-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors">
                Direct Origin Belts
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Kerala Western Ghats cardamom and Mithila wetland fox nuts sourced straight from regional planter estates.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E]">
                <span>Explore Sourcing Belts</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2: Lab Testing */}
            <div 
              onClick={() => onNavigate && onNavigate('why-sabora')}
              className="p-6 sm:p-7 rounded-2xl bg-stone-50 hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-500/40 transition-all cursor-pointer group space-y-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors">
                Certified Standards
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                FSSAI aligned, ISO compliant, and tested through accredited NABL laboratories for moisture and active assays.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E]">
                <span>View Quality Standards</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 3: Wholesale Hub */}
            <div 
              onClick={() => onNavigate && onNavigate('about')}
              className="p-6 sm:p-7 rounded-2xl bg-stone-50 hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-500/40 transition-all cursor-pointer group space-y-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#0F3D2E] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors">
                Delhi Logistics Hub
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Aroma-locked barrier pouches and bulk sacks with fast dispatch across India and overseas export terminals.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E]">
                <span>About Sabora Operations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Clean Wholesale Sourcing Callout (Direct 1-Click CTA) */}
      <section className="py-16 sm:py-20 bg-[#041A12] text-white border-t border-emerald-900/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wholesale Sourcing Desk</span>
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-white tracking-tight">
              Ready to Source Direct Origin Spices?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-normal">
              Get wholesale pricing, custom packaging specifications, and CoA test reports from our Delhi hub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-amber-300/50"
            >
              <span>Request Wholesale Quote</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to inquire about wholesale whole spices and makhana.")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-emerald-300 hover:text-white font-semibold text-sm sm:text-base border border-emerald-500/40 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
              <span>WhatsApp Desk (+91 78809 06610)</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 max-w-lg mx-auto flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-stone-400">
            <span>Delhi Hub Dispatch</span>
            <span>•</span>
            <span>Mon–Sat: 9:00 AM – 7:30 PM IST</span>
            <span>•</span>
            <span>Response within 4 business hours</span>
          </div>
        </div>
      </section>
    </div>
  );
}
