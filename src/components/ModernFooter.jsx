import React from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  ArrowUpRight, 
  Instagram,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function ModernFooter({ onScrollToSection, onOpenAdmin }) {
  const handleWhatsApp = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <footer className="bg-[#020C08] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden font-sans">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/80 p-0.5 bg-white shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Sabora Spices"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-[0.16em] text-white block">
                  SABORA SPICES
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  Artisanal Whole Spices • European Export Purveyors
                </span>
              </div>
            </div>

            <p className="font-sans text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Single-estate harvests curated for European tea ateliers, artisanal spice blenders, and organic brands. Laser Sortex-graded and delivered CIF Rotterdam, Hamburg, and Genoa.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold flex items-center gap-2 hover:bg-emerald-900 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Commercial WhatsApp Desk</span>
              </button>

              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* European Shipping Ports */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block">
              European Logistics
            </span>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Port of Rotterdam (Netherlands) - CIF</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Port of Hamburg (Germany) - CIF</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Port of Antwerp (Belgium) - CIF</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Port of Genoa (Italy) - CIF</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Air Freight Express (DAP Frankfurt / CDG)</span>
              </li>
            </ul>
          </div>

          {/* Direct Commercial Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block">
              Direct Export Desk
            </span>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mb-1.5">
                Accreditations & Law
              </span>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                EU Regulation (EC) 396/2005 • Spices Board India • APEDA • Non-ETO Cold Steam Ready • ISO 17025 COA
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Hairline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div>
            © {new Date().getFullYear()} Sabora Spices. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                onScrollToSection('collection');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Back to Top
            </button>

            {/* Discreet Staff Portal / Admin Panel trigger */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-stone-500 hover:text-amber-400 transition-colors cursor-pointer"
              title="Sabora Management Console"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
