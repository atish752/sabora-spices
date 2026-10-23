import React from 'react';
import { Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function TopBanner({ announcementConfig, onOpenGeneralWhatsApp }) {
  if (announcementConfig && announcementConfig.enabled === false) {
    return null;
  }

  const handleDirectGeneralWhatsApp = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <div className="w-full bg-[#041A12] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-emerald-900/50 font-sans relative z-30 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Concise, high-taste European trade announcement */}
        <div className="flex items-center gap-2.5 truncate">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-400/40 font-mono shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            HARVEST 2025/26
          </span>
          <p className="text-slate-300 text-[11px] sm:text-xs truncate font-medium">
            Single-Estate Harvests • CIF European Ports (Rotterdam, Hamburg, Genoa) • Non-ETO Purity
          </p>
        </div>

        {/* Right: Quick Links */}
        <div className="hidden md:flex items-center gap-4 text-xs shrink-0">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
            title="Follow Sabora Spices on Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">{SITE_CONFIG.instagramHandle}</span>
          </a>
          <span className="text-emerald-800">|</span>
          <button
            onClick={handleDirectGeneralWhatsApp}
            className="flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold transition-colors cursor-pointer group"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] tracking-wide font-mono uppercase">WhatsApp Commercial Desk</span>
          </button>
        </div>

      </div>
    </div>
  );
}
