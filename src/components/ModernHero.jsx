import React, { useState } from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  FileCheck2,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

const HERO_SPICES = [
  {
    id: 'cardamom',
    name: 'Green Cardamom (Elaichi)',
    botanical: 'Elettaria cardamomum',
    grade: '8mm+ Extra Bold Sortex',
    origin: 'Cardamom Hills, Idukki (1,100m)',
    keyMetric: '8.2% Volatile Oils',
    image: '/images/cardamom.png',
    accent: '#059669',
    badge: 'Export Grade #1',
    description: 'Harvested under the rainforest canopy of Idukki. Intense menthol-citrus terpenes with zero artificial color.',
    moq: '50 Kg (Samples from 1 Kg)',
    compliance: 'EU MRL (EC) 396/2005'
  },
  {
    id: 'turmeric',
    name: 'Turmeric Whole Fingers (Haldi)',
    botanical: 'Curcuma longa',
    grade: 'Salem Double Polished',
    origin: 'Salem Alluvial Plains, Tamil Nadu',
    keyMetric: '4.5%+ Curcumin HPLC',
    image: '/images/turmeric-whole.png',
    accent: '#D97706',
    badge: 'High Curcumin 4.5%+',
    description: 'Solar-cured golden finger select from certified farmer clusters. Dense core, heavy weight, and vibrant color.',
    moq: '500 Kg (FCL & LCL)',
    compliance: 'Heavy Metal & Residue Tested'
  },
  {
    id: 'makhana',
    name: 'Jumbo Makhana (Fox Nuts)',
    botanical: 'Euryale ferox',
    grade: '6-Suta Jumbo (>18mm)',
    origin: 'Mithila Wetlands, Bihar',
    keyMetric: '99.2% Unbroken / Non-Bleached',
    image: '/images/makhana-fox-nuts.png',
    accent: '#0D9488',
    badge: '100% Clean Superfood',
    description: 'Hand-sorted pristine milky white lotus pops. Zero chemical bleaching, extra crisp crunch, and rich plant protein.',
    moq: '100 Kg (Nitrogen Pouches)',
    compliance: 'EU Reg. (EC) 178/2002'
  }
];

export default function ModernHero({ heroConfig, onScrollToSection, onSelectProduct, products = [] }) {
  const [activeSpiceIndex, setActiveSpiceIndex] = useState(0);
  const activeSpice = HERO_SPICES[activeSpiceIndex];

  const headline = heroConfig?.headline || 'Artisanal Whole Spices.\nDirect From Origin.';
  const subheading = heroConfig?.subheading || 'Single-estate harvests curated for European spice blenders, tea ateliers, and organic brands. Laser sortex-graded with direct CIF port delivery.';

  const handleGeneralWhatsApp = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  const handleSpiceWhatsApp = (spice) => {
    const matchingProduct = products.find(p => p.id?.includes(spice.id));
    if (matchingProduct && typeof matchingProduct.whatsappTemplate === 'function') {
      SITE_CONFIG.openWhatsApp(matchingProduct.whatsappTemplate());
    } else {
      const msg = encodeURIComponent(
        `Hello Sabora Spices team,\n\nI am requesting wholesale terms and CIF European port rates for *${spice.name}* (${spice.grade}).\n\nCould you please share the latest COA and MOQ details?\n\nThank you!`
      );
      SITE_CONFIG.openWhatsApp(msg);
    }
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-stone-50">
      
      {/* Modern Ambient Mesh Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0 opacity-70">
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-emerald-300/15 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-amber-300/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Badges & European Compliance Pill */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8 sm:mb-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-xs hover:border-emerald-500/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Harvest 2025/26 Single-Estate Lots
            </span>
            <span className="text-stone-300">|</span>
            <span className="font-mono text-[11px] sm:text-xs text-emerald-800 font-bold">
              CIF Rotterdam & Hamburg
            </span>
          </div>

          {/* Bold Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-950 max-w-4xl leading-[1.08] sm:leading-[1.06]">
            {headline.split('\n').map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Understated Modern Subheading */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed pt-2 font-normal">
            {subheading}
          </p>

          {/* High-Converting CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 sm:pt-4">
            <button
              onClick={handleGeneralWhatsApp}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] text-white font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border border-amber-400/50 shadow-xl shadow-stone-950/15 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Request Wholesale Terms (1-Click)</span>
            </button>

            <button
              onClick={() => onScrollToSection('rfq-desk')}
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white text-stone-800 font-sans text-xs sm:text-sm font-semibold border border-stone-300 hover:border-stone-400 hover:bg-stone-50 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Build Quick RFQ</span>
              <ArrowRight className="w-4 h-4 text-stone-500" />
            </button>
          </div>
        </div>

        {/* ── Interactive Spice Showcase Stage ── */}
        <div className="mt-6 sm:mt-10 max-w-5xl mx-auto">
          
          {/* Minimalist Spice Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 bg-stone-100/90 backdrop-blur-md rounded-full max-w-xl mx-auto mb-8 border border-stone-200/80 shadow-xs">
            {HERO_SPICES.map((spice, idx) => {
              const isActive = activeSpiceIndex === idx;
              return (
                <button
                  key={spice.id}
                  onClick={() => setActiveSpiceIndex(idx)}
                  className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-950 shadow-md border border-stone-200/80 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <span className="truncate">{spice.name.split(' ')[0]} {spice.name.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          {/* Active Product Showcase Display Card */}
          <div className="relative rounded-3xl bg-white border border-stone-200/90 shadow-2xl p-6 sm:p-10 transition-all duration-500 overflow-hidden">
            
            {/* Soft Ambient Radial Background for Product */}
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none transition-colors duration-700"
              style={{
                background: `radial-gradient(circle at 60% 50%, ${activeSpice.accent}15 0%, transparent 70%)`
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Product Details */}
              <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
                    {activeSpice.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-stone-600 bg-stone-100">
                    {activeSpice.compliance}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 leading-tight">
                    {activeSpice.name}
                  </h2>
                  <p className="font-serif italic text-sm text-stone-500 mt-1">
                    Taxonomy: {activeSpice.botanical}
                  </p>
                </div>

                <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed">
                  {activeSpice.description}
                </p>

                {/* Micro Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Origin Terroir</span>
                    <span className="font-bold text-stone-800 text-xs truncate block">{activeSpice.origin}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Key Lab Metric</span>
                    <span className="font-bold text-emerald-800 text-xs block">{activeSpice.keyMetric}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Calibrated Grading</span>
                    <span className="font-bold text-stone-800 text-xs truncate block">{activeSpice.grade}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Export MOQ</span>
                    <span className="font-bold text-stone-800 text-xs block">{activeSpice.moq}</span>
                  </div>
                </div>

                {/* 1-Click WhatsApp Trigger for this specific spice */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleSpiceWhatsApp(activeSpice)}
                    className="px-5 py-3 rounded-full bg-[#041A12] hover:bg-[#082E20] text-white font-mono text-xs font-bold tracking-wider uppercase border border-amber-400/40 shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>Inquire {activeSpice.name.split(' ')[0]} (1-Click)</span>
                  </button>

                  <button
                    onClick={() => {
                      const matched = products.find(p => p.id?.includes(activeSpice.id));
                      if (matched && onSelectProduct) onSelectProduct(matched);
                    }}
                    className="px-4 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    View COA & Lab Specs
                  </button>
                </div>
              </div>

              {/* Right Column: High-Res Real Product Pack Showcase */}
              <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2 py-4">
                
                {/* Visual Plinth & Glow */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-60 transition-all duration-700"
                    style={{ background: activeSpice.accent }}
                  />

                  <img
                    key={activeSpice.id}
                    src={activeSpice.image}
                    alt={activeSpice.name}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] relative z-10 transition-all duration-500 hover:scale-105"
                  />

                  {/* Floating Micro-Badge */}
                  <div className="absolute -bottom-2 right-4 z-20 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg flex items-center gap-1.5 font-mono text-[10px] text-stone-800 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sortex 99.8% Purity</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom Metric Strip ── */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-stone-200/80 pt-8 sm:pt-10">
          <div className="text-center sm:text-left space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 block">15+ Yrs</span>
            <span className="font-sans text-xs text-stone-500 font-medium">Terroir Estate Farming</span>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800 block">99.8%</span>
            <span className="font-sans text-xs text-stone-500 font-medium">Laser Sortex Purity</span>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 block">28+ Nations</span>
            <span className="font-sans text-xs text-stone-500 font-medium">European & Global Reach</span>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-800 block">CIF & Air</span>
            <span className="font-sans text-xs text-stone-500 font-medium">Rotterdam, Hamburg, Genoa</span>
          </div>
        </div>

      </div>
    </section>
  );
}
