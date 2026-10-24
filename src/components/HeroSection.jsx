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

  // Auto-advance slider every 5.5 seconds (pause when user hovers)
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 5500);
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

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  return (
    <section 
      id="hero"
      aria-label="Sabora Spices Hero Showcase"
      className="relative w-full bg-[#03150E] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        ── Responsive Aspect-Ratio & Proportional Height Container ──
        Specially optimized for Desktop, Tablet, and Mobile to fit without cropping!
        Mobile: aspect-[4/3] to aspect-[16/10], min-h-[380px] sm:min-h-[440px]
        Tablet: aspect-[16/9] to aspect-[16/8], min-h-[480px]
        Desktop: aspect-[21/9] to aspect-[16/7], min-h-[540px] lg:min-h-[620px] max-h-[85vh]
      */}
      <div className="relative w-full aspect-[4/3.2] sm:aspect-[16/9] md:aspect-[16/7.5] lg:aspect-[21/8.2] min-h-[400px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[600px] max-h-[85vh] flex items-center justify-center">
        
        {/* Render Slides with Smooth Crossfade */}
        {activeSlides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Visual: scaled to fit properly without ugly crops */}
              <div className="relative w-full h-full bg-[#02100A] flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title ? slide.title.replace('\n', ' ') : 'Sabora Spices'}
                  className={`w-full h-full ${
                    slide.fitMode === 'contain' 
                      ? 'object-contain object-center' 
                      : 'object-cover object-center sm:object-center'
                  } transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Soft Multilayer Gradient Overlays (preserves background artwork while providing 100% text readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02100A] via-[#02100A]/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#02100A]/90 via-[#02100A]/60 to-transparent max-w-4xl" />
              </div>

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
                  <div className="max-w-2xl sm:max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4">
                    
                    {/* Badge / Origin Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{slide.tag || "SABORA SPICES"}</span>
                      </span>
                      {slide.badge && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{slide.badge}</span>
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-md whitespace-pre-line">
                      {slide.title}
                    </h1>

                    {/* Subtitle / Descriptive Copy */}
                    <p className="text-xs sm:text-base md:text-lg text-stone-200/90 font-normal leading-relaxed max-w-xl drop-shadow line-clamp-3 sm:line-clamp-none">
                      {slide.subtitle}
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-4">
                      {slide.primaryCtaText && (
                        <button
                          onClick={() => handleCtaClick(slide.primaryCtaLink || '#contact')}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300/40"
                        >
                          <span>{slide.primaryCtaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      {slide.secondaryCtaText && (
                        <button
                          onClick={() => handleCtaClick(slide.secondaryCtaLink || '#products')}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
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
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Chevron */}
            <button
              onClick={goToNextSlide}
              aria-label="Next Hero Slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Pagination Dots & Slide Counter */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
              {activeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlideIndex(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    i === currentSlideIndex 
                      ? 'w-6 sm:w-8 h-2 bg-amber-400 shadow-sm' 
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
              <span className="text-[10px] sm:text-xs font-mono text-stone-300 pl-1">
                0{currentSlideIndex + 1} / 0{activeSlides.length}
              </span>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
