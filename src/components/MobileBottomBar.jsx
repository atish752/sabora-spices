import React from 'react';
import { MessageCircle, FileText, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function MobileBottomBar({ onOpenWhatsAppDrawer, onScrollToSection }) {
  
  // 1-Tap direct WhatsApp inquiry for mobile users
  const handleMobileWhatsAppClick = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2.5 sm:hidden shadow-2xl font-sans">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Quick Phone Call */}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 transition-colors shadow-xs"
          title="Direct Phone Call to Export Desk"
          aria-label="Direct Phone Call"
        >
          <PhoneCall className="w-4 h-4 text-emerald-950" />
        </a>

        {/* Scroll to Catalog */}
        <button
          onClick={() => onScrollToSection('catalog')}
          className="flex-1 py-3 px-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs uppercase tracking-wider font-mono"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-950" />
          <span>The Collection</span>
        </button>

        {/* 1-Tap WhatsApp Main Action Button */}
        <button
          onClick={handleMobileWhatsAppClick}
          className="flex-1 py-3 px-3 bg-gradient-to-r from-[#041A12] to-[#082E20] text-white border border-amber-400/50 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition-all cursor-pointer uppercase tracking-wider font-mono"
          title="Open WhatsApp with 1 tap"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400 shrink-0" />
          <span>WhatsApp RFQ</span>
        </button>

      </div>
    </div>
  );
}
