import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSlider({ products = [], heroConfig, onScrollToSection }) {
  const featuredProducts = products.filter(p => p.featured);
  const slides = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const safeIdx = idx < slides.length ? idx : 0;
  const current = slides[safeIdx] ?? slides[0];
  if (!current) return null;

  const handleWhatsApp = () => {
    const msg = current.whatsappTemplate?.() ?? encodeURIComponent(
      `Hello Sabora Spices team,\n\nI am interested in *${current.name}* for commercial European B2B wholesale supply.\n\nPlease share current export rates, MOQ, and CIF port terms.\n\nThank you!`
    );
    SITE_CONFIG.openWhatsApp(msg);
  };

  const headline = heroConfig?.headline || 'Artisanal Whole Spices,\nDirect From Origin.';
  const subheading = heroConfig?.subheading || 'Single-estate harvests curated for European blenders, tea ateliers, and gourmet purveyors. Laser sortex-graded with direct CIF port delivery.';

  const stats = [
    { value: '15+ Yrs', label: 'Terroir Heritage', desc: 'Generational estate farming' },
    { value: '99.8%', label: 'Sortex Purity', desc: 'Laser optical color-graded' },
    { value: '28+ Nations', label: 'Global Trade', desc: 'European & global network' },
    { value: 'CIF & Air', label: 'Direct Freight', desc: 'Rotterdam, Hamburg, Genoa' },
  ];

  return (
    <section 
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50/60 to-emerald-50/20 border-b border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-10 w-[45rem] h-[45rem] bg-emerald-500/[0.08] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 w-[40rem] h-[40rem] bg-amber-400/[0.06] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Terroir Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Crop 2025/26 Direct Harvest
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                {current.origin ? current.origin.split(',')[0] : 'Single-Origin'}
              </span>
            </div>

            {/* Main Grand Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight whitespace-pre-line">
              {headline}
            </h1>

            {/* Subheading Narrative */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              {subheading}
            </p>

            {/* Dual Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white border border-amber-400/50 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer font-mono"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400 shrink-0" />
                <span>Inquire on WhatsApp (1-Click)</span>
              </button>

              <button
                onClick={() => onScrollToSection('catalog')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-200 shadow-2xs hover:shadow transition-all cursor-pointer font-mono"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {/* Interactive Terroir Lots Switcher */}
            <div className="pt-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                Select Lot Showcase
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                {slides.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setIdx(i)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                      i === safeIdx
                        ? 'bg-[#041A12] text-white shadow-sm border border-emerald-600'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${i === safeIdx ? 'bg-amber-400' : 'bg-slate-300'}`} />
                    <span className="font-serif font-bold">{p.name.split(' ').slice(0, 2).join(' ')}</span>
                    <span className="font-mono text-[10px] opacity-70">
                      {(p.moq || '50 Kg').split('(')[0].trim()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Tactile Pedestal Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4">
            
            {/* Ambient radiant light orb */}
            <div className="absolute w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-emerald-500/20 via-amber-400/15 to-emerald-400/20 blur-3xl pointer-events-none" />

            {/* Plinth Pedestal Circle */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-b from-white via-slate-50 to-emerald-50/40 p-6 shadow-2xl border border-slate-200/90 flex items-center justify-center">
              
              <div className="absolute inset-3 rounded-full border border-amber-400/40 pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-dashed border-emerald-500/20 pointer-events-none" />

              {/* Product Packaging Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_25px_rgba(4,26,18,0.25)] transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/images/cardamom.png';
                  }}
                />
              </div>

              {/* Floating Spec Pill: Top Right */}
              <div className="absolute top-0 right-0 sm:-top-2 sm:-right-2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-left">
                <div className="flex items-center gap-1.5 text-amber-700">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Lot Grade</span>
                </div>
                <p className="text-xs font-serif font-bold text-slate-900 mt-0.5">
                  {current.badge || 'Export Grade #1'}
                </p>
              </div>

              {/* Floating Compliance Pill: Bottom Left */}
              <div className="absolute bottom-0 left-0 sm:-bottom-2 sm:-left-2 z-20 bg-[#041A12] text-white px-3.5 py-2 rounded-xl shadow-lg border border-emerald-500/30 text-left">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">Purity</span>
                </div>
                <p className="text-[11px] font-mono text-slate-200 mt-0.5">
                  {current.euCompliance ? current.euCompliance.split('•')[0].trim() : 'Non-ETO'} • 99.8% Sortex
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Minimalist Figures Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 mt-0.5">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
