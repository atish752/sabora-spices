import React, { useState } from 'react';
import { ShieldCheck, MapPin, FlaskConical, PackageCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function TrustHighlightsBar({ onScrollToSection }) {
  const [isPaused, setIsPaused] = useState(false);

  const highlights = [
    {
      icon: ShieldCheck,
      iconBg: "bg-white text-emerald-800 border border-stone-200/90",
      customLogo: "/images/fssai-logo.png",
      secondaryLogo: "/images/iso-logo.svg",
      title: `FSSAI: ${SITE_CONFIG.fssaiNumber}`,
      subtitle: `ISO: ${SITE_CONFIG.isoNumber} • GST: ${SITE_CONFIG.gstin}`,
      target: "compliance"
    },
    {
      icon: MapPin,
      iconBg: "bg-amber-100 text-amber-800",
      title: "Direct Origin Harvest",
      subtitle: "Kerala & Bihar Growing Belts",
      target: "sourcing"
    },
    {
      icon: FlaskConical,
      iconBg: "bg-emerald-100 text-emerald-800",
      title: "NABL Batch Tested",
      subtitle: "Independent Lab CoA Records",
      target: "lab-testing"
    },
    {
      icon: PackageCheck,
      iconBg: "bg-stone-100 text-stone-800",
      title: "Barrier Pouch & Bulk",
      subtitle: "Aroma-Locked Food Grade Packs",
      target: "products"
    }
  ];

  // Duplicate items for continuous seamless infinite loop
  const marqueeItems = [...highlights, ...highlights];

  return (
    <section 
      aria-label="Trust Highlights & Operational Standards"
      className="relative z-20 bg-[#F9FBFA] border-b border-stone-200/80 py-3 sm:py-4.5 overflow-hidden w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Subtle edge fade gradients for smooth seamless entry & exit */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F9FBFA] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F9FBFA] to-transparent z-10 pointer-events-none" />

      {/* 
        Single Row Continuous Infinite Auto-Scroll from Right to Left
        Takes minimal vertical space on mobile screens while auto-scrolling horizontally in an infinite loop!
      */}
      <div className={`marquee-container flex overflow-hidden w-full ${isPaused ? 'is-paused' : ''}`}>
        
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-3.5 sm:gap-4.5 pr-3.5 sm:pr-4.5 animate-marquee">
          {marqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`t1-${idx}`}
                onClick={() => onScrollToSection && onScrollToSection(item.target)}
                className="w-[280px] xs:w-[300px] sm:w-[325px] shrink-0 bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200/90 shadow-[0_2px_8px_-2px_rgba(4,26,18,0.06)] hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 flex items-center gap-3 cursor-pointer group active:scale-[0.98]"
              >
                <div className={`p-2 sm:p-2.5 rounded-lg ${item.iconBg} shrink-0 group-hover:scale-105 transition-transform shadow-xs flex items-center justify-center`}>
                  {item.customLogo ? (
                    <div className="flex items-center gap-1.5">
                      <img src={item.customLogo} alt="FSSAI" className="h-5 w-auto object-contain" />
                      {item.secondaryLogo && (
                        <img src={item.secondaryLogo} alt="ISO 9001:2015" className="h-5 w-auto object-contain" />
                      )}
                    </div>
                  ) : (
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  )}
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors leading-snug truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Clone for 100% infinite seamless marquee loop - zero gap offset jump) */}
        <div aria-hidden="true" className="flex shrink-0 items-center gap-3.5 sm:gap-4.5 pr-3.5 sm:pr-4.5 animate-marquee">
          {marqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`t2-${idx}`}
                onClick={() => onScrollToSection && onScrollToSection(item.target)}
                className="w-[280px] xs:w-[300px] sm:w-[325px] shrink-0 bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200/90 shadow-[0_2px_8px_-2px_rgba(4,26,18,0.06)] hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 flex items-center gap-3 cursor-pointer group active:scale-[0.98]"
              >
                <div className={`p-2 sm:p-2.5 rounded-lg ${item.iconBg} shrink-0 group-hover:scale-105 transition-transform shadow-xs flex items-center justify-center`}>
                  {item.customLogo ? (
                    <div className="flex items-center gap-1.5">
                      <img src={item.customLogo} alt="FSSAI" className="h-5 w-auto object-contain" />
                      {item.secondaryLogo && (
                        <img src={item.secondaryLogo} alt="ISO 9001:2015" className="h-5 w-auto object-contain" />
                      )}
                    </div>
                  ) : (
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  )}
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors leading-snug truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
