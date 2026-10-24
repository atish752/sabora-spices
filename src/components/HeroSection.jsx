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

export default function HeroSection({ slides, onScrollToSection, onOpenQuoteModal }) {
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
    } else if (link === '#contact') {
      if (onOpenQuoteModal) onOpenQuoteModal();
      else onScrollToSection('contact');
    } else if (link.startsWith('#')) {
      onScrollToSection(link.replace('#', ''));
    } else {
      window.open(link, '_blank');
    }
  };

  if (activeSlides.length === 0) return null;

  return (
    <section 
      id="hero"
      aria-label="Sabora Spices Hero Showcase"
      className="relative w-full bg-[#0A1A12] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        ── Responsive Proportional Hero Container (Zero-Cropping Architecture) ──
        Optimized to fit desktop, tablet, and mobile screens seamlessly without cropping imagery,
        matching the smooth full-width banner behavior of shahifoodservices.com.
        Uses 16:9 widescreen ratio with responsive tablet/desktop ceiling and containment.
      */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/7.5] lg:aspect-[16/6.8] max-h-[82vh] flex items-center justify-center overflow-hidden">
        
        {/* Render Slides with Smooth Crossfade */}
        {activeSlides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          const isBannerMode = slide.displayMode === 'banner' || slide.showOverlayText === false;

          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Visual Layer */}
              <div 
                onClick={() => isBannerMode && handleCtaClick(slide.primaryCtaLink || '#contact')}
                className={`relative w-full h-full flex items-center justify-center ${
                  isBannerMode 
                    ? 'cursor-pointer bg-[#F7F4EE]' 
                    : 'bg-[#03150E]'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title ? slide.title.replace('\n', ' ') : 'Sabora Spices'}
                  className={`w-full h-full ${
                    isBannerMode || slide.fitMode === 'contain'
                      ? 'object-contain object-center'
                      : 'object-cover object-center'
                  } transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-[1.02]' : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Overlays: ONLY displayed for cinematic slides with text */}
                {!isBannerMode && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02100A] via-[#02100A]/50 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#02100A]/90 via-[#02100A]/60 to-transparent max-w-4xl" />
                  </>
                )}

                {/* Subtle Action Pill on Banner Mode (bottom right / desktop) */}
                {isBannerMode && slide.primaryCtaText && (
                  <div className="hidden sm:flex absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-20 items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCtaClick(slide.primaryCtaLink || '#contact');
                      }}
                      className="px-4 py-2 rounded-full bg-[#0F3D2E]/90 hover:bg-[#0F3D2E] text-amber-300 hover:text-white text-xs font-bold backdrop-blur-md shadow-lg border border-amber-400/40 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
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
                        className="px-3 py-2 rounded-full bg-white/90 hover:bg-white text-stone-800 text-xs font-bold shadow-md border border-stone-200 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>{slide.secondaryCtaText}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Text & Button Overlay Layer (For Cinematic Slides) */}
              {!isBannerMode && (
                <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-8 pointer-events-auto">
                    <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-2 sm:space-y-4">
                      
                      {/* Badge / Origin Pill */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-semibold tracking-wide">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>{slide.tag || "SABORA SPICES"}</span>
                        </span>
                        {slide.badge && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{slide.badge}</span>
                          </span>
                        )}
                      </div>

                      {/* Headline */}
                      <h1 className="font-serif text-lg sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md whitespace-pre-line">
                        {slide.title}
                      </h1>

                      {/* Subtitle / Descriptive Copy */}
                      <p className="text-[11px] sm:text-sm md:text-base text-stone-200/90 font-normal leading-relaxed max-w-xl drop-shadow line-clamp-2 sm:line-clamp-none">
                        {slide.subtitle}
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-1 sm:pt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                        {slide.primaryCtaText && (
                          <button
                            onClick={() => handleCtaClick(slide.primaryCtaLink || '#contact')}
                            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer border border-amber-300/40"
                          >
                            <span>{slide.primaryCtaText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {slide.secondaryCtaText && (
                          <button
                            onClick={() => handleCtaClick(slide.secondaryCtaLink || '#products')}
                            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                          >
                            {slide.secondaryCtaLink === 'whatsapp' ? (
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
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
