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
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const targetVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (targetVideo) {
      if (nextState) {
        targetVideo.play().catch(() => setIsPlaying(false));
      } else {
        targetVideo.pause();
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    [desktopVideoRef.current, mobileVideoRef.current].forEach(v => {
      if (v) v.muted = nextMuted;
    });
  };

  // Safe autoplay for the active device video (conserves mobile bandwidth & battery)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    const inactiveVideo = isDesktop ? mobileVideoRef.current : desktopVideoRef.current;
    
    // Pause inactive video to conserve bandwidth, CPU and mobile battery
    if (inactiveVideo) {
      try { inactiveVideo.pause(); } catch (e) {}
    }

    if (activeVideo) {
      activeVideo.muted = true;
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay restricted by browser/low-power mode; ready for tap-to-play
            setIsPlaying(false);
          });
      }
    }

    const handleResize = () => {
      const desktopNow = window.innerWidth >= 768;
      const curActive = desktopNow ? desktopVideoRef.current : mobileVideoRef.current;
      const curInactive = desktopNow ? mobileVideoRef.current : desktopVideoRef.current;
      if (curInactive) {
        try { curInactive.pause(); } catch (e) {}
      }
      if (curActive && isPlaying) {
        curActive.play().catch(() => {});
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPlaying]);

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
      <div className="relative w-full min-h-[380px] sm:min-h-[440px] md:h-[500px] lg:h-[560px] xl:h-[600px] flex items-end overflow-hidden">
        
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

        {/* 3. Natural vibrant video: subtle bottom fade ONLY for text legibility, no dull dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* 4. Minimal Hero Text on Video */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full pb-6 sm:pb-8 pointer-events-none">
          <div className="max-w-xl space-y-1 sm:space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>Direct Origin Harvest</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4.5xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              Whole Spices & Makhana
            </h1>
            <p className="font-hand text-base sm:text-xl text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              ~ Pure whole harvest direct from Kerala & Bihar to Delhi hub ~
            </p>
          </div>
        </div>

        {/* 5. Floating Video Player Controls (Bottom-Right Corner) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 flex items-center gap-2">
          {!isPlaying ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/90 text-stone-950 text-[10px] sm:text-xs font-bold shadow-md animate-pulse">
              <Play className="w-3 h-3 fill-current" />
              <span>Tap to Play</span>
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-emerald-300 text-[10px] font-semibold border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>HARVEST FOOTAGE</span>
            </span>
          )}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
            className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md border transition-all active:scale-90 cursor-pointer shadow-lg flex items-center justify-center ${
              !isPlaying 
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-amber-500/30' 
                : 'bg-black/50 hover:bg-black/75 text-white/90 hover:text-white border-white/20'
            }`}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
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

      {/* 
        ── Action Buttons Bar (Below the Video, not on that) ──
      */}
      <div className="relative z-20 bg-[#03140E] border-t border-emerald-900/50 py-5 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
            <button
              onClick={() => handleCtaClick('/contact')}
              className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg hover:shadow-amber-500/25 transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300/50"
            >
              <span>Request Wholesale Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleCtaClick('/products')}
              className="px-4 sm:px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Browse Products</span>
            </button>

            <button
              onClick={() => handleCtaClick('whatsapp')}
              className="px-4 sm:px-5 py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-emerald-300 hover:text-white text-xs sm:text-sm font-semibold border border-emerald-500/40 shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Desk</span>
            </button>
          </div>

          {/* Clean Quick Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-[11px] sm:text-xs text-stone-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>FSSAI Aligned</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Kerala & Bihar Belts</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Package className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Barrier Pouch & Bulk</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
