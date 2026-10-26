import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function MobileFloatingBar({ onOpenQuoteModal, onScrollToSection }) {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl px-3 py-2 flex items-center gap-2">
      
      {/* Call Button */}
      <a
        href={`tel:${SITE_CONFIG.primaryPhoneRaw}`}
        className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-2xs sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-stone-200 whitespace-nowrap active:scale-95"
      >
        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 shrink-0" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <button
        onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I am interested in sourcing whole spices and makhana.")}
        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-2xs sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
      >
        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
        <span>WhatsApp</span>
      </button>

      {/* Request Quote Button */}
      <button
        onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : onScrollToSection('contact')}
        className="flex-[1.2] py-2.5 px-2 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white text-2xs sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
      >
        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
        <span>Request Quote</span>
      </button>

    </div>
  );
}
