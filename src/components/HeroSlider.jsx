import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight, FileText, MapPin, ShieldCheck, Scale, Sparkles, Award } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import AnimatedCounter from './AnimatedCounter';

/**
 * HeroSlider — Grand European Luxury Spice House Centerpiece.
 *
 * Full-bleed expansive container (no narrow box trap), architectural hairline gridlines,
 * dynamic counting figures, 7-second slide progress bar, 1-click WhatsApp inquiry flow,
 * and solid royal obsidian emerald & metallic gold craftsmanship.
 */
export default function HeroSlider({ products, heroConfig, onScrollToSection }) {
  const featuredProducts = products.filter(p => p.featured);
  const slides = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideTimerKey, setSlideTimerKey] = useState(0);

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
      setSlideTimerKey(k => k + 1);
    }, 7000);
    return () => clearInterval(t);
  }, [paused, slides.length, idx]);

  const prev = () => {
    setIdx(i => (i === 0 ? slides.length - 1 : i - 1));
    setSlideTimerKey(k => k + 1);
  };
  const next = () => {
    setIdx(i => (i + 1) % slides.length);
    setSlideTimerKey(k => k + 1);
  };

  const current = slides[idx] ?? slides[0];
  if (!current) return null;

  const handleWhatsApp = () => {
    const msg = current.whatsappTemplate?.() ?? encodeURIComponent(
      `Hello Sabora Spices team,\n\nI am interested in *${current.name}* for commercial European B2B procurement.\n\nPlease share wholesale pricing, MOQ, and export delivery terms (CIF / FOB).\n\nThank you!`
    );
    SITE_CONFIG.openWhatsApp(msg);
  };

  const headline = heroConfig?.headline ?? 'Artisanal Single-Estate Spices,\nDirect From Origin';
  const subheading = heroConfig?.subheading ?? 'Direct plantation harvest for European blenders, tea ateliers & food purveyors. Optical sortex graded, EU MRL compliant & steam sterilized.';
  const ctaText = heroConfig?.ctaText ?? 'Inquire on WhatsApp (1-Click)';
  const secondaryCtaText = heroConfig?.secondaryCtaText ?? 'Explore Catalog & Lab COA';
  const stats = heroConfig?.stats || [
    { id: 1, value: '15+ Years', label: 'Heritage Terroir', desc: 'Generational estate cultivation' },
    { id: 2, value: '28+ Nations', label: 'Direct Export', desc: 'EU, UK & Swiss trade networks' },
    { id: 3, value: '99.8%', label: 'Sortex Purity', desc: 'Laser optical color-graded' },
    { id: 4, value: '2,500+ MT', label: 'Annual Volume', desc: 'Certified container freight' },
  ];

  return (
    <section
      className="relative w-full py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F6F3] border-b border-slate-200/90 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background ambient architectural glows */}
      <div className="pointer-events-none absolute -top-40 right-10 w-[46rem] h-[46rem] bg-emerald-500/[0.12] rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 w-[42rem] h-[42rem] bg-amber-400/[0.09] rounded-full blur-[130px]" />

      {/* Main Expansive Container — Spans full width gracefully */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">

        {/* ── Main Two-Column Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* LEFT — Editorial Storytelling & RFQ CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left reveal-init">

            {/* Terroir & Origin Tag in Solid Architectural Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs flex-wrap justify-center lg:justify-start">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-cinzel text-xs text-[#041A12] font-bold tracking-wider">
                EST. SINGLE-ORIGIN
              </span>
              <span className="text-slate-300 font-serif">•</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600">
                {current.batchCode || 'Crop Year 2025/26'}
              </span>
              {current.badge && (
                <>
                  <span className="text-slate-300 font-serif">•</span>
                  <span className="text-[10px] font-bold text-amber-900 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/60 uppercase tracking-wider font-mono">
                    {current.badge}
                  </span>
                </>
              )}
            </div>

            {/* Grand Headline (European Serifs, Config-driven) */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.06] tracking-tight whitespace-pre-line">
              {headline}
            </h1>

            {/* Sub-heading Narrative */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans font-normal">
              {subheading}
            </p>

            {/* Tactile Terroir & Commercial Specs Matrix (Architectural Boxes) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1 max-w-2xl mx-auto lg:mx-0">
              
              {/* Box 1: Origin */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400/80 hover:shadow-md transition-all text-left relative overflow-hidden group">
                <div className="corner-tick-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="corner-tick-br opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-1.5 text-emerald-800 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Terroir Origin</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {current.origin ? current.origin.split(',')[0] : 'South India'}
                </p>
                <p className="text-[11px] text-slate-500 truncate font-serif italic">
                  {current.terroir ? current.terroir.split('(')[0] : 'Estate Grown'}
                </p>
              </div>

              {/* Box 2: Quality & Potency */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400/80 hover:shadow-md transition-all text-left relative overflow-hidden group">
                <div className="corner-tick-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="corner-tick-br opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-1.5 text-amber-700 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Purity Standard</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  Non-ETO & Sortex
                </p>
                <p className="text-[11px] text-slate-500 truncate font-sans">
                  Reg. (EC) 396/2005
                </p>
              </div>

              {/* Box 3: Commercial MOQ */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400/80 hover:shadow-md transition-all text-left col-span-2 sm:col-span-1 relative overflow-hidden group">
                <div className="corner-tick-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="corner-tick-br opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-1.5 text-emerald-700 mb-1.5">
                  <Scale className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Wholesale MOQ</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {(current.moq || '50 Kg').split('(')[0].trim()}
                </p>
                <p className="text-[11px] text-slate-500 truncate font-sans">
                  Lab Samples from 1 Kg
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2 justify-center lg:justify-start">
              
              {/* WhatsApp 1-Click Inquiry */}
              <button
                onClick={handleWhatsApp}
                className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#041A12] via-[#083323] to-[#041A12] hover:brightness-110 active:scale-95 text-white border border-amber-400/60 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_12px_30px_-5px_rgba(4,26,18,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.4)] transition-all cursor-pointer group font-mono ring-2 ring-emerald-500/10"
              >
                <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform shrink-0 relative z-10" />
                <span className="tracking-wider relative z-10">{ctaText}</span>
              </button>

              {/* Secondary CTA: Jump to Catalog & Specs */}
              <button
                onClick={() => onScrollToSection('catalog')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-200 shadow-2xs hover:shadow transition-all cursor-pointer font-mono"
              >
                <FileText className="w-4 h-4 text-[#041A12]" />
                <span className="tracking-wider">{secondaryCtaText}</span>
              </button>

            </div>

            {/* Interactive Slide Selector with Animated Progress Bar */}
            <div className="pt-3 space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2 font-mono">
                  TERROIR LOTS:
                </span>
                {slides.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setIdx(i);
                      setSlideTimerKey(k => k + 1);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                      i === idx
                        ? 'bg-gradient-to-r from-[#041A12] to-[#082E20] text-white shadow-md border border-amber-400/60 ring-2 ring-amber-400/20'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${i === idx ? 'bg-amber-400 animate-pulse' : 'bg-slate-300'}`} />
                    <span className="font-mono text-[10px] opacity-75">№ 0{i + 1}</span>
                    <span className="font-serif font-bold">{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* 7-Second Visual Slide Progress Bar */}
              <div className="w-full max-w-md mx-auto lg:mx-0 h-[3px] bg-slate-200/80 overflow-hidden rounded-full">
                <div
                  key={slideTimerKey}
                  className="h-full w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500 transition-all animate-slide-progress origin-left"
                  style={{
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT — Luxury Architectural Pedestal Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center reveal-init delay-150">
            
            {/* Ambient radiant backlight behind the packaging pedestal */}
            <div className="absolute w-[26rem] h-[26rem] sm:w-[30rem] sm:h-[30rem] rounded-full bg-gradient-to-tr from-emerald-500/25 via-amber-400/20 to-emerald-400/25 blur-3xl pointer-events-none" />

            {/* Architectural Glowing Pedestal Frame */}
            <div className="relative w-80 h-80 sm:w-[26rem] sm:h-[26rem] md:w-[31rem] md:h-[31rem] rounded-full bg-gradient-to-b from-white via-slate-50/95 to-[#E0EFE8] p-8 shadow-[0_30px_70px_-10px_rgba(4,26,18,0.25),0_0_60px_rgba(16,185,129,0.2)] border border-emerald-900/20 flex items-center justify-center">
              
              {/* Outer decorative hairline rings with brass accents */}
              <div className="absolute inset-2.5 rounded-full border border-amber-400/50 pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-dashed border-emerald-600/35 pointer-events-none" />
              <div className="absolute inset-10 rounded-full bg-gradient-to-b from-white/60 to-emerald-50/40 pointer-events-none" />

              {/* Real packaging product image with gentle float */}
              <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  className="max-h-[88%] max-w-[88%] object-contain drop-shadow-[0_25px_30px_rgba(4,26,18,0.35)] transition-all duration-700 hover:scale-105"
                />
              </div>

              {/* Sensory Tasting Notes Badge: Top Right */}
              <div className="absolute -top-3 right-0 sm:-right-4 z-20 bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-xl shadow-xl border border-slate-200/90 max-w-[210px] text-left">
                <div className="flex items-center gap-1.5 text-amber-700 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Aroma Profile</span>
                </div>
                <p className="text-xs font-serif italic text-slate-900 leading-snug">
                  {current.aromaNotes ? current.aromaNotes.join(' • ') : 'Natural essential oils retained'}
                </p>
              </div>

              {/* Floating European Compliance Stamp: Bottom Left */}
              <div className="absolute -bottom-4 left-0 sm:-left-4 z-20 bg-gradient-to-r from-[#041A12] to-[#082E20] text-slate-100 p-3.5 sm:p-4 rounded-xl shadow-xl border border-amber-400/50 max-w-[220px] text-left">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 font-mono">EU Certified</span>
                </div>
                <p className="text-[11px] font-sans font-medium text-slate-200 leading-tight">
                  100% Sortex Cleaned & Non-ETO Steam Grade
                </p>
              </div>

              {/* Botanical Latin Taxonomy Watermark at bottom */}
              {current.botanicalName && (
                <div className="absolute bottom-5 z-10 text-center">
                  <span className="font-serif italic text-xs tracking-wider text-slate-700 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-200 shadow-2xs font-medium">
                    {current.botanicalName}
                  </span>
                </div>
              )}

            </div>

            {/* Slider navigation arrows */}
            {slides.length > 1 && (
              <div className="absolute -bottom-6 sm:bottom-2 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer hover:border-amber-400/60"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer hover:border-amber-400/60"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* ── Architectural Key Figures Strip (Config-Driven, 4 Solid Columns with Animated Counters) ── */}
        <div className="mt-16 pt-10 border-t border-slate-200/90 reveal-init delay-250">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/90">
            {stats.map((stat, i) => (
              <div key={stat.id || i} className={`pt-4 sm:pt-0 ${i !== 0 ? 'sm:pl-8' : ''}`}>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mt-1 font-mono">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-600 mt-0.5 font-sans leading-snug">
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
