import React from 'react';
import { Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function TopBanner({ announcementConfig, onOpenGeneralWhatsApp }) {
  if (announcementConfig && announcementConfig.enabled === false) {
    return null;
  }

  const badge = announcementConfig?.badge || 'EXPORT NOTICE';
  const text = announcementConfig?.text || 'Harvest 2025/26 Single-Estate Lots • EU Reg. (EC) 396/2005 Compliant • CIF Rotterdam, Hamburg & Genoa Ports • Non-ETO Steam Sterilized • 1-Click WhatsApp Direct Desk';

  const handleDirectGeneralWhatsApp = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <div className="w-full bg-[#041A12] text-slate-100 text-[11px] sm:text-xs py-2.5 px-4 sm:px-8 lg:px-12 border-b border-emerald-900/40 tracking-wide font-sans select-none relative z-30 shadow-xs">
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Left: Continuous European Trade Marquee Ribbon */}
        <div className="flex-1 overflow-hidden relative marquee-container flex items-center">
          <div className="flex items-center gap-2 shrink-0 pr-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-emerald-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-widest border border-amber-400/50 font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>{badge}</span>
            </span>
          </div>

          <div className="marquee-content animate-marquee text-slate-200 font-medium">
            <span className="flex items-center gap-4">
              <span>{text}</span>
              <span className="text-amber-400 font-serif">✦</span>
              <span className="text-amber-300 font-semibold">Direct Origin Shipments via Cochin & Tuticorin</span>
              <span className="text-amber-400 font-serif">✦</span>
              <span>ISO 22000 / FSSC 22000 Aligned Laboratory Quality Dossiers</span>
              <span className="text-amber-400 font-serif">✦</span>
            </span>
          </div>
          <div className="marquee-content animate-marquee text-slate-200 font-medium" aria-hidden="true">
            <span className="flex items-center gap-4">
              <span>{text}</span>
              <span className="text-amber-400 font-serif">✦</span>
              <span className="text-amber-300 font-semibold">Direct Origin Shipments via Cochin & Tuticorin</span>
              <span className="text-amber-400 font-serif">✦</span>
              <span>ISO 22000 / FSSC 22000 Aligned Laboratory Quality Dossiers</span>
              <span className="text-amber-400 font-serif">✦</span>
            </span>
          </div>
        </div>

        {/* Right: Instagram & 1-Click WhatsApp Quick Desk */}
        <div className="hidden md:flex items-center gap-4 text-[11px] sm:text-xs shrink-0 pl-4 border-l border-emerald-900/50">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
            title="Follow Sabora Spices on Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium tracking-wide">{SITE_CONFIG.instagramHandle}</span>
          </a>
          <span className="text-emerald-900/80">|</span>
          <button
            onClick={handleDirectGeneralWhatsApp}
            className="flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold transition-colors cursor-pointer group"
            title="Open WhatsApp RFQ desk with 1 click"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">WhatsApp RFQ Desk (1-Click)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
