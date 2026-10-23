import React, { useState } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ChevronDown, 
  ArrowUp,
  Sparkles,
  Award
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GENERAL_WHATSAPP_MESSAGE } from '../data/products';

export default function Footer({ onScrollToSection, onOpenWhatsAppDrawer, onOpenAdmin }) {
  const [mobileLinksOpen, setMobileLinksOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterWhatsAppClick = () => {
    const encoded = GENERAL_WHATSAPP_MESSAGE();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  return (
    <footer className="w-full bg-[#020C08] text-slate-300 text-xs sm:text-sm pt-16 pb-24 sm:pb-14 border-t border-emerald-900/60 font-sans relative overflow-hidden">
      {/* Top radiant metallic gold hairline */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brass-500/70 to-transparent" />
      
      {/* Ambient emerald & gold lighting glow in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-32 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brass-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Main Footer 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-emerald-900/40">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-brass-400/80 bg-white shadow-md shadow-emerald-950/50 shrink-0 p-0.5">
                <img 
                  src="/images/logo.jpg" 
                  alt="Sabora Spices Logo" 
                  className="w-full h-full object-cover rounded-md" 
                />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold tracking-[0.18em] text-white">SABORA SPICES</h3>
                <p className="text-[10px] text-brass-400 font-bold tracking-widest uppercase font-mono flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-brass-400" />
                  <span>European Export Purveyors</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Artisanal single-estate supplier of optical sortex-cleaned Green Cardamom, high-curcumin Turmeric Whole, and hand-sorted Jumbo Phool Makhana. Directly from Indian agro plantations to European food blenders.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-brass-500 hover:text-slate-950 text-slate-300 hover:border-brass-400 flex items-center justify-center transition-all shadow-sm border border-white/10"
                title="Follow Sabora Spices on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={handleFooterWhatsAppClick}
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center transition-all shadow-md shadow-emerald-950/40 cursor-pointer border border-emerald-400/40"
                title="Direct 1-Click WhatsApp Inquiry"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>

          {/* Column 2: Commercial Catalog Links */}
          <div className="space-y-3.5">
            <div 
              className="flex items-center justify-between font-bold text-white uppercase tracking-wider text-xs cursor-pointer lg:cursor-default font-mono"
              onClick={() => setMobileLinksOpen(!mobileLinksOpen)}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
                <span>The Collection</span>
              </span>
              <ChevronDown className={`w-4 h-4 lg:hidden transition-transform ${mobileLinksOpen ? 'rotate-180 text-brass-400' : ''}`} />
            </div>

            <div className={`${mobileLinksOpen ? 'block' : 'hidden'} lg:block space-y-2.5 text-slate-400 text-xs`}>
              <p>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Green Cardamom (Elettaria cardamomum 8mm+)
                </button>
              </p>
              <p>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Turmeric Whole (Curcuma longa Salem 4.5%+ Curcumin)
                </button>
              </p>
              <p>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Jumbo Phool Makhana (Euryale ferox 6-Suta)
                </button>
              </p>
              <p>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Malabar Black Pepper (Piper nigrum 570g/L)
                </button>
              </p>
              <p>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Lal Pari Cloves & Star Anise Florets
                </button>
              </p>
              <p className="pt-1.5">
                <button onClick={() => onScrollToSection('catalog')} className="text-brass-400 hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>View Full Assortment Dossier</span>
                  <span>→</span>
                </button>
              </p>
            </div>
          </div>

          {/* Column 3: European Standards & Services */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>European Standards & Services</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              <li>
                <button onClick={() => onScrollToSection('b2b-services')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Private Label OEM Stand-Up Pouches
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('b2b-services')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  CIF Rotterdam / Hamburg / Genoa Cargo
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('quality')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  EU Reg. (EC) 396/2005 MRL Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('quality')} className="hover:text-brass-300 hover:translate-x-0.5 transition-all text-left cursor-pointer">
                  Non-ETO Gentle Steam Sterilization
                </button>
              </li>
              <li className="pt-1.5">
                <button onClick={handleFooterWhatsAppClick} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>Request Commercial Sample Kit</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & WhatsApp Desk */}
          <div className="space-y-3.5">
            <div 
              className="flex items-center justify-between font-bold text-white uppercase tracking-wider text-xs cursor-pointer lg:cursor-default font-mono"
              onClick={() => setMobileContactOpen(!mobileContactOpen)}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
                <span>Export Desk Contact</span>
              </span>
              <ChevronDown className={`w-4 h-4 lg:hidden transition-transform ${mobileContactOpen ? 'rotate-180 text-brass-400' : ''}`} />
            </div>

            <div className={`${mobileContactOpen ? 'block' : 'hidden'} lg:block space-y-3 text-slate-400 text-xs`}>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                <span>Spice Processing & Export Terminal, Cochin / Tuticorin, India</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brass-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brass-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFooterWhatsAppClick}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/40 border border-emerald-400/30 uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Fast Desk (1-Click)</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Certification & Compliance Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="font-bold text-white font-mono text-[11px] mr-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
              <span>Accreditations:</span>
            </span>
            <span className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 font-mono text-[10px] text-slate-300 uppercase transition-colors">
              EU MRL (EC 396/2005)
            </span>
            <span className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 font-mono text-[10px] text-slate-300 uppercase transition-colors">
              APEDA Registered Exporter
            </span>
            <span className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 font-mono text-[10px] text-slate-300 uppercase transition-colors">
              Spice Board India Certified
            </span>
            <span className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 font-mono text-[10px] text-slate-300 uppercase transition-colors">
              ISO 22000:2018 / FSSC
            </span>
            <span className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 font-mono text-[10px] text-slate-300 uppercase transition-colors">
              Non-ETO & Steam Ready
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-slate-400">© {new Date().getFullYear()} Sabora Spices. All Rights Reserved.</p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-500 hover:text-brass-400 transition-colors cursor-pointer font-mono uppercase"
                title="Admin Panel"
              >
                [Admin]
              </button>
            )}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-brass-500 hover:text-slate-950 text-slate-300 transition-all cursor-pointer border border-white/10 hover:border-brass-400"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
