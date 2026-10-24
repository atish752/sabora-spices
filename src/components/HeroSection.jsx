import React, { useState, useRef, useEffect } from 'react';
import { 
  Leaf, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  ShieldCheck,
  MapPin,
  Package
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HeroSection({ onScrollToSection, onOpenQuoteModal, onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  // Synchronize playback & audio across desktop/mobile video elements
  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    [desktopVideoRef.current, mobileVideoRef.current].forEach(v => {
      if (!v) return;
      if (nextState) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    [desktopVideoRef.current, mobileVideoRef.current].forEach(v => {
      if (v) v.muted = nextMuted;
    });
  };

  // Ensure autoplay starts smoothly when component mounts
  useEffect(() => {
    const playPromises = [
      desktopVideoRef.current?.play(),
      mobileVideoRef.current?.play()
    ].filter(Boolean);

    Promise.all(playPromises).catch(() => {
      // Browsers restrict unmuted autoplay, muted is safe
    });
  }, []);

  const handleCtaClick = (link) => {
    if (!link) return;
    if (link === 'whatsapp') {
      SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I am interested in sourcing whole spices and makhana.");
      return;
    }
    if (link === '#contact' || link === '/contact' || link === 'contact') {
      if (onOpenQuoteModal) onOpenQuoteModal();
      else if (onNavigate) onNavigate('contact');
      else if (onScrollToSection) onScrollToSection('contact');
      return;
    }
    if (link.startsWith('/') || link.startsWith('#')) {
      const clean = link.replace(/^[/#]+/, '');
      const [route, search] = clean.split('?');
      const params = {};
      if (search) {
        const sp = new URLSearchParams(search);
        for (const [k, v] of sp.entries()) {
          params[k] = v;
        }
      }
      if (onNavigate) onNavigate(route || 'home', params);
      else if (onScrollToSection) onScrollToSection(route || 'home');
      return;
    }
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onNavigate) onNavigate(link);
    else if (onScrollToSection) onScrollToSection(link);
  };

  return (
    <section 
      id="hero"
      aria-label="Sabora Spices Hero Video Showcase"
      className="relative w-full bg-[#041A12] overflow-hidden select-none"
    >
      {/* 
        ── Responsive Video Hero Container ──
        Permanent video showcase:
        - Mobile screens (< 768px): 9:16 Portrait video (/videos/Portrait.mp4)
        - Desktop screens (>= 768px): 16:9 Landscape video (/videos/Landscape.mp4)
      */}
      <div className="relative w-full min-h-[580px] sm:min-h-[620px] md:h-[660px] lg:h-[720px] xl:h-[780px] flex items-center overflow-hidden">
        
        {/* 1. Desktop 16:9 Landscape Video */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster="/images/hero-sabora-master.jpg"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/videos/Landscape.mp4" type="video/mp4" />
        </video>

        {/* 2. Mobile 9:16 Portrait Video */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster="/images/hero-sabora-pouches.jpg"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/videos/Portrait.mp4" type="video/mp4" />
        </video>

        {/* 3. Atmospheric Dark Imperial Overlays for Flawless Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020F0A]/95 via-[#020F0A]/55 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020F0A]/95 via-[#020F0A]/70 md:via-[#020F0A]/45 to-transparent pointer-events-none" />

        {/* 4. Hero Content Layer */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-12 sm:py-16">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
            
            {/* Cute Artisanal Badge (Replaced generic AI Sparkles with natural Leaf & origin info) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>DIRECT ORIGIN HARVEST • DELHI HUB</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-medium backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Whole Agricultural Spices</span>
              </span>
            </div>

            {/* Headline with Cute Warm Handwritten Touch */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4.5xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-md">
                Whole Spices & Makhana.<br />
                <span className="text-gold-gradient font-normal italic">Sourced with Purpose.</span>
              </h1>
              <p className="font-hand text-lg sm:text-xl text-amber-200/95 tracking-wide">
                ~ Hand-sorted whole cardamom, pure Bihar makhana pops & golden turmeric fingers ~
              </p>
            </div>

            {/* Subtitle / Descriptive Copy */}
            <p className="text-xs sm:text-sm md:text-base text-stone-200/90 font-normal leading-relaxed max-w-2xl drop-shadow">
              We connect India's premier agricultural growing belts with domestic wholesalers, retail brands, food businesses, and overseas importers. Direct origin procurement with batch laboratory analysis and food-grade barrier pouch packaging.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCtaClick('/contact')}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300/50"
              >
                <span>Request Wholesale Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCtaClick('/products')}
                className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/25 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Products & Sizing</span>
              </button>

              <button
                onClick={() => handleCtaClick('whatsapp')}
                className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#0F3D2E]/90 hover:bg-[#0F3D2E] text-emerald-300 hover:text-white text-xs sm:text-sm font-semibold border border-emerald-500/40 backdrop-blur-md shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span className="hidden xs:inline">WhatsApp Desk</span>
                <span className="xs:hidden">WhatsApp</span>
              </button>
            </div>

            {/* Key Trust Highlights Chips */}
            <div className="pt-3 sm:pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl text-[11px] sm:text-xs text-stone-300">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">FSSAI & ISO Aligned</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Kerala & Bihar Belts</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                <Package className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Barrier Pouch & Bulk</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">NABL Lab Verification</span>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Floating Video Player Controls (Bottom-Right Corner) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
            className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 cursor-pointer shadow-lg"
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
            className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 cursor-pointer shadow-lg"
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
          </button>
        </div>

      </div>
    </section>
  );
}
