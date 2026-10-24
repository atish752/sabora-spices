import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HeroSection({ slides, onScrollToSection, onOpenQuoteModal, onNavigate }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const activeSlides = (slides && slides.length > 0) ? slides : [];

  // Auto-advance slider every 6.0 seconds (pauses when user hovers or interacts)
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      goToNextSlide();
    } else if (distance < -50) {
      goToPrevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleCtaClick = (link) => {
    if (!link) return;
    if (link === 'whatsapp') {
      SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I am interested in sourcing whole spices and makhana.");
    } else if (link === '#contact' || link === '/contact') {
      if (onOpenQuoteModal) onOpenQuoteModal();
      else if (onNavigate) onNavigate('contact');
      else onScrollToSection('contact');
    } else if (link.startsWith('/')) {
      if (onNavigate) onNavigate(link.replace('/', ''));
    } else if (link.startsWith('#')) {
      if (onNavigate) onNavigate(link.replace('#', ''));
      else onScrollToSection(link.replace('#', ''));
    } else {
      window.open(link, '_blank');
    }
  };

  if (activeSlides.length === 0) return null;

  return (
    <section 
      id="hero"
      aria-label="Sabora Spices Hero Showcase"
      className="relative w-full bg-[#041A12] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        ── 100% Full-Width Responsive Hero Container (Edge-to-Edge, Zero Side Whitespace) ──
        Spans 100% viewport width across desktop, tablet, and mobile.
        Uses object-cover with smooth background gradients so imagery always fills the frame completely.
      */}
      <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[660px] xl:h-[720px] 2xl:h-[760px] overflow-hidden">
        
        {/* Render Slides with Smooth Crossfade */}
        {activeSlides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          const isBannerMode = slide.displayMode === 'banner' && slide.showOverlayText === false;

          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Visual Layer: 100% full-width edge-to-edge */}
              <div 
                onClick={() => isBannerMode && handleCtaClick(slide.primaryCtaLink || '/contact')}
                className={`relative w-full h-full overflow-hidden ${
                  isBannerMode ? 'cursor-pointer' : ''
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title ? slide.title.replace('\n', ' ') : 'Sabora Spices'}
                  className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-[1.03]' : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Overlays: Seamless dark imperial gradients to assure text contrast edge-to-edge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020F0A]/95 via-[#020F0A]/50 to-black/25 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020F0A]/90 via-[#020F0A]/60 md:via-[#020F0A]/35 to-transparent pointer-events-none" />

                {/* Subtle Action Pill on Banner Mode (bottom right / desktop) */}
                {isBannerMode && slide.primaryCtaText && (
                  <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-20 items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCtaClick(slide.primaryCtaLink || '/contact');
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#0F3D2E]/90 hover:bg-[#0F3D2E] text-amber-300 hover:text-white text-xs font-bold backdrop-blur-md shadow-xl border border-amber-400/40 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{slide.primaryCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                    {slide.secondaryCtaText && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCtaClick(slide.secondaryCtaLink || 'whatsapp');
                        }}
                        className="px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-stone-800 text-xs font-bold shadow-lg border border-stone-200 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>{slide.secondaryCtaText}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Text & Button Overlay Layer (Spans full container width with max-w-[1440px] interior) */}
              {(!isBannerMode || slide.showOverlayText !== false) && (
                <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
                  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-6 sm:py-10 pointer-events-auto">
                    <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4">
                      
                      {/* Badge / Origin Pill */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wide">
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>{slide.tag || "SABORA SPICES"}</span>
                        </span>
                        {slide.badge && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium backdrop-blur-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{slide.badge}</span>
                          </span>
                        )}
                      </div>

                      {/* Headline */}
                      <h1 className="font-serif text-2xl sm:text-3.5xl md:text-4.5xl lg:text-5xl xl:text-5.5xl font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-md whitespace-pre-line">
                        {slide.title}
                      </h1>

                      {/* Subtitle / Descriptive Copy */}
                      <p className="text-xs sm:text-sm md:text-base text-stone-200/90 font-normal leading-relaxed max-w-xl drop-shadow line-clamp-3 sm:line-clamp-none">
                        {slide.subtitle}
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                        {slide.primaryCtaText && (
                          <button
                            onClick={() => handleCtaClick(slide.primaryCtaLink || '/contact')}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300/40"
                          >
                            <span>{slide.primaryCtaText}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}

                        {slide.secondaryCtaText && (
                          <button
                            onClick={() => handleCtaClick(slide.secondaryCtaLink || '/products')}
                            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                          >
                            {slide.secondaryCtaLink === 'whatsapp' ? (
                              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                            ) : null}
                            <span>{slide.secondaryCtaText}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {/* ── Slider Navigation Controls (Chevrons & Dots) ── */}
        {activeSlides.length > 1 && (
          <>
            {/* Prev Chevron */}
            <button
              onClick={goToPrevSlide}
              aria-label="Previous Hero Slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Next Chevron */}
            <button
              onClick={goToNextSlide}
              aria-label="Next Hero Slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Pagination Dots & Slide Counter */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
              {activeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlideIndex(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    i === currentSlideIndex 
                      ? 'w-6 sm:w-7 h-1.5 sm:h-2 bg-amber-400 shadow-sm' 
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
              <span className="text-[10px] font-mono text-stone-300 pl-1">
                0{currentSlideIndex + 1} / 0{activeSlides.length}
              </span>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
