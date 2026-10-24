import React from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Lock, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function FooterSection({ onScrollToSection, onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#03150E] text-stone-300 border-t border-emerald-950/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/10 p-1 flex items-center justify-center border border-amber-400/40">
                <img src="/images/logo.png" alt="Sabora Spices" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  SABORA SPICES
                </span>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                  Whole Spices & Makhana
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md font-normal">
              India-based sourcing and supply for domestic and international buyers. We specialise in whole green cardamom, whole turmeric fingers, and Makhana (Fox Nuts), with additional whole spices available according to buyer requirements.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/50 text-[11px] text-emerald-300 font-medium">
                FSSAI Regulated
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/50 text-[11px] text-emerald-300 font-medium">
                ISO 9001/22000 Principles
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/50 text-[11px] text-emerald-300 font-medium">
                FoSCoS Linked
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              <li>
                <button onClick={() => onScrollToSection('hero')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('about')} className="hover:text-amber-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-amber-400 transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('sourcing')} className="hover:text-amber-400 transition-colors">
                  Sourcing & Origin
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('why-sabora')} className="hover:text-amber-400 transition-colors">
                  Why Sabora
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('quality')} className="hover:text-amber-400 transition-colors">
                  Quality & Safety
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('lab-testing')} className="hover:text-amber-400 transition-colors">
                  Lab Testing
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('compliance')} className="hover:text-amber-400 transition-colors">
                  Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('export')} className="hover:text-amber-400 transition-colors">
                  Export Supply
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('faq')} className="hover:text-amber-400 transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Products (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Products
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              <li>
                <button onClick={() => onScrollToSection('products', 'cardamom')} className="hover:text-amber-400 transition-colors">
                  Whole Green Cardamom
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products', 'makhana')} className="hover:text-amber-400 transition-colors">
                  Makhana (Fox Nuts)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products', 'turmeric')} className="hover:text-amber-400 transition-colors">
                  Whole Turmeric Fingers
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products', 'other')} className="hover:text-amber-400 transition-colors">
                  Whole Cloves (Laung)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products', 'other')} className="hover:text-amber-400 transition-colors">
                  Whole Black Pepper
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-amber-300/80 italic block">
                  100% Whole Spices Only
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Delhi Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Contact Desk
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Jahangirpuri, Delhi – 110033, India</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={`tel:${SITE_CONFIG.primaryPhoneRaw}`} className="hover:text-amber-400 transition-colors">
                    +91 78809 06610
                  </a>
                  <a href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`} className="hover:text-amber-400 transition-colors">
                    +91 95327 01582
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-stone-400 shrink-0" />
                <span>www.saboraspices.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I am contacting you from your website.")}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-700/40 hover:bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-300 text-emerald-300" />
                  <span>WhatsApp Commercial Desk</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Legal & Admin Link */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {currentYear} <strong className="text-stone-200">SABORA SPICES</strong>. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-400">
            <span className="hover:text-stone-200 cursor-pointer">Privacy & Policy</span>
            <span>•</span>
            <span className="hover:text-stone-200 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-stone-200 cursor-pointer">Customer Grievance</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-500 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
