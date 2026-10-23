import React from 'react';
import { Instagram, MessageCircle, Phone, Mail, MapPin, Sparkles, Lock, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function Footer({ onScrollToSection, onOpenWhatsAppDrawer, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterWhatsAppClick = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <footer className="w-full bg-[#020C08] text-slate-300 text-xs pt-16 pb-20 sm:pb-12 border-t border-emerald-950/80 font-sans relative overflow-hidden">
      
      {/* Radiant ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Main Footer 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-950/80">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-400/80 bg-white p-0.5 shrink-0">
                <img 
                  src="/images/logo.jpg" 
                  alt="Sabora Spices" 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold tracking-[0.16em] text-white">
                  SABORA SPICES
                </h3>
                <p className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase">
                  European Export Purveyors
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Artisanal single-estate supplier of optical sortex-cleaned Green Cardamom, Salem Turmeric, and Jumbo Phool Makhana for European tea ateliers and food purveyors.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-amber-400 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={handleFooterWhatsAppClick}
                className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 hover:text-white transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Col 2: The Collection */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors">
                  Green Cardamom (8mm+ Extra Bold)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors">
                  Turmeric Whole (4.5%+ Curcumin)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors">
                  Jumbo Makhana Fox Nuts (6-Suta)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors">
                  Tellicherry Garbled Black Pepper
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors">
                  Lal Pari Handpicked Cloves
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Export Logistics */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              European Logistics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>CIF Rotterdam Port (Netherlands)</li>
              <li>CIF Hamburg Port (Germany)</li>
              <li>CIF Genoa Port (Italy)</li>
              <li>CIF Antwerp Port (Belgium)</li>
              <li>Air Cargo Hubs (FRA, AMS, CDG)</li>
              <li>Non-ETO Steam Sterilized Shipments</li>
            </ul>
          </div>

          {/* Col 4: Commercial Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              Commercial Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400 font-sans">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white">{SITE_CONFIG.whatsappDisplayNumber}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white">{SITE_CONFIG.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Export Terminal, Cochin & Tuticorin</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={handleFooterWhatsAppClick}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-700/60 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span>1-Click WhatsApp RFQ</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans">
          <p>
            © {new Date().getFullYear()} Sabora Spices. All rights reserved. Single-Estate Terroir & Agro Purveyors.
          </p>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors font-mono cursor-pointer"
              title="Access Admin Desk"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors font-mono cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
