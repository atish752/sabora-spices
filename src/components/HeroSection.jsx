import React, { useState, useRef, useEffect } from 'react';
import { 
  Leaf, 
  ArrowRight, 
  MessageCircle, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HeroSection({ onScrollToSection, onOpenQuoteModal, onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  // Ref to track latest play state inside event listeners
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Synchronize playback across desktop/mobile video elements
  const togglePlay = () => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const targetVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (!targetVideo) return;

    if (isPlaying) {
      targetVideo.pause();
      setIsPlaying(false);
    } else {
      const playPromise = targetVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
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

  // Safe initial autoplay on mount and responsive active video switching on resize
  useEffect(() => {
    const getActiveVideo = () => {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
      return {
        active: isDesktop ? desktopVideoRef.current : mobileVideoRef.current,
        inactive: isDesktop ? mobileVideoRef.current : desktopVideoRef.current
      };
    };

    const { active, inactive } = getActiveVideo();

    if (inactive) {
      try { inactive.pause(); } catch (e) {}
    }

    if (active) {
      active.muted = true;
      const playPromise = active.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser or mobile policy prevented auto-play; ready for user tap
            setIsPlaying(false);
          });
      }
    }

    const handleResize = () => {
      const { active: curActive, inactive: curInactive } = getActiveVideo();
      if (curInactive) {
        try { curInactive.pause(); } catch (e) {}
      }
      if (curActive && isPlayingRef.current) {
        curActive.play().catch(() => {});
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Run only once on mount

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
        ── Responsive Video Hero: 100% Fully Visible in Original Ratio ──
        - Desktop screens (>= 768px): 16:9 Landscape video (/videos/Landscape.mp4) in full 16:9 ratio
        - Mobile screens (< 768px): 9:16 Portrait video (/videos/Portrait.mp4) in full 9:16 ratio
        Nothing is cropped, clipped, or hidden behind the bottom section.
      */}
      
      {/* 1. Desktop 16:9 Landscape Video Showcase */}
      <div className="hidden md:block relative w-full bg-[#020D09]">
        <div className="max-w-[1440px] mx-auto relative aspect-video w-full overflow-hidden flex items-center justify-center">
          <video
            ref={desktopVideoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            webkit-playsinline="true"
            preload="auto"
            poster="/images/hero-sabora-master.jpg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain pointer-events-none"
          >
            <source src="/videos/Landscape.mp4" type="video/mp4" />
          </video>

          {/* Desktop Overlay Badge: Direct Origin Harvest */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-md">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Origin Harvest</span>
            </span>
          </div>

          {/* Floating Video Player Controls (Bottom-Right Corner) */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2">
            {!isPlaying ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/90 text-stone-950 text-xs sm:text-sm font-bold shadow-md animate-pulse">
                <Play className="w-3 h-3 fill-current" />
                <span>Tap to Play</span>
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-white/10">
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
      </div>

      {/* 2. Mobile 9:16 Portrait Video Showcase */}
      <div className="block md:hidden relative w-full bg-[#020D09] px-3 py-3">
        <div className="max-w-[420px] mx-auto relative aspect-[9/16] w-full max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl border border-emerald-900/40 bg-black flex items-center justify-center">
          <video
            ref={mobileVideoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            webkit-playsinline="true"
            preload="auto"
            poster="/images/hero-sabora-pouches.jpg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain pointer-events-none"
          >
            <source src="/videos/Portrait.mp4" type="video/mp4" />
          </video>

          {/* Mobile Overlay Badge */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-md">
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>Direct Origin Harvest</span>
            </span>
          </div>

          {/* Mobile Floating Video Player Controls */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
              className={`p-2 rounded-full backdrop-blur-md border transition-all active:scale-90 cursor-pointer shadow-lg flex items-center justify-center ${
                !isPlaying 
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-amber-500/30' 
                  : 'bg-black/50 hover:bg-black/75 text-white/90 hover:text-white border-white/20'
              }`}
              title={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
              className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 cursor-pointer shadow-lg"
              title={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* 
        ── Action Buttons & Information Bar (Strictly BELOW the video, never overlapping) ──
      */}
      <div className="relative z-20 bg-[#03140E] border-t border-emerald-900/60 py-6 sm:py-7 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          
          {/* Brand Heading & Concise Punchline (Cleanly below the video) */}
          <div className="space-y-1.5 text-center md:text-left">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-100 tracking-tight">
              Whole Spices & Makhana
            </h1>
            <p className="text-sm sm:text-base text-stone-300">
              Direct Origin Procurement • Delhi Logistics Hub • Wholesale Supply
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            <button
              onClick={() => handleCtaClick('/contact')}
              className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-sm sm:text-base font-bold shadow-lg hover:shadow-amber-500/25 transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300/50"
            >
              <span>Request Wholesale Quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => handleCtaClick('/products')}
              className="px-4.5 sm:px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white text-sm sm:text-base font-semibold border border-white/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Browse Products</span>
            </button>

            <button
              onClick={() => handleCtaClick('whatsapp')}
              className="px-4.5 sm:px-5 py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-emerald-300 hover:text-white text-sm sm:text-base font-semibold border border-emerald-500/40 shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Desk</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
