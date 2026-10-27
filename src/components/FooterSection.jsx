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

export default function FooterSection({ onNavigate, onScrollToSection, onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (route, filter = null) => {
    if (onNavigate) {
      if (filter) onNavigate('products', { category: filter });
      else if (route === 'hero') onNavigate('home');
      else onNavigate(route);
    } else if (onScrollToSection) {
      onScrollToSection(route, filter);
    }
  };

  return (
    <footer className="bg-[#03150E] text-stone-300 border-t border-emerald-950/80 pt-16 pb-24 sm:pb-12 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img src="/images/logo.png" alt="Sabora Spices Logo" className="w-full h-full object-contain drop-shadow" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
                  SABORA SPICES
                </span>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                  Whole Spices & Makhana
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-md font-normal">
              India-based sourcing and supply for domestic and international buyers. We specialise in whole green cardamom, whole turmeric fingers, and Makhana (Fox Nuts), with additional whole spices available according to buyer requirements.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-stone-900 border border-stone-200/90 shadow-2xs"
                  title={`FSSAI Central / State License No: ${SITE_CONFIG.fssaiNumber}`}
                >
                  <img src="/images/fssai-logo.png" alt="FSSAI" className="h-4 w-auto object-contain shrink-0" />
                  <span className="font-mono text-2xs font-bold text-[#0B2568]">Lic. {SITE_CONFIG.fssaiNumber}</span>
                </div>
                <div 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-stone-900 border border-stone-200/90 shadow-2xs"
                  title={`ISO 9001:2015 Certificate of Compliance: ${SITE_CONFIG.isoNumber}`}
                >
                  <img src="/images/iso-logo.svg" alt="ISO 9001:2015" className="h-4 w-auto object-contain shrink-0" />
                  <span className="font-mono text-2xs font-bold text-stone-900">ISO {SITE_CONFIG.isoNumber}</span>
                </div>
                <span 
                  className="px-2.5 py-1 rounded-md bg-stone-900/90 border border-stone-700/70 text-2xs text-stone-300 font-mono font-medium"
                  title={`GSTIN: ${SITE_CONFIG.gstin}`}
                >
                  GSTIN: {SITE_CONFIG.gstin}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-2xs text-stone-400">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-900/60 text-emerald-400">FoSCoS Reporting</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-900/60 text-emerald-400">Tested Before Dispatch</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Pages
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('products')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('sourcing')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sourcing & Origin
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('why-sabora')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Why Sabora
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('quality')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Quality & Safety
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('lab-testing')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Lab Testing
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('compliance')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Compliance
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('export')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Export Supply
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('faq')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Products (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button onClick={() => handleLinkClick('products', 'cardamom')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Whole Green Cardamom
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('products', 'makhana')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Makhana (Fox Nuts)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('products', 'turmeric')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Whole Turmeric Fingers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('products', 'other')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Whole Cloves (Laung)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('products', 'other')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Whole Black Pepper
                </button>
              </li>
              <li className="pt-2">
                <span className="text-xs text-amber-300/80 italic block">
                  100% Whole Spices Only
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Delhi Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Contact Desk
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Jahangirpuri, Delhi – 110033, India</span>
              </div>
              <div className="flex items-start gap-2.5">
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
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-stone-400 shrink-0" />
                <span>www.saboraspices.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1 text-xs">
                  <a href="mailto:info@saboraspices.com" className="hover:text-amber-400 transition-colors">
                    <span className="text-stone-400">General:</span> info@saboraspices.com
                  </a>
                  <a href="mailto:sales@saboraspices.com" className="hover:text-amber-400 transition-colors">
                    <span className="text-stone-400">Sales:</span> sales@saboraspices.com
                  </a>
                  <a href="mailto:contact@saboraspices.com" className="hover:text-amber-400 transition-colors">
                    <span className="text-stone-400">Desk:</span> contact@saboraspices.com
                  </a>
                  <a href="mailto:support@saboraspices.com" className="hover:text-amber-400 transition-colors">
                    <span className="text-stone-400">Support:</span> support@saboraspices.com
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I am contacting you from your website.")}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-700/40 hover:bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-300 text-emerald-300" />
                  <span>WhatsApp Commercial Desk</span>
                </button>
              </div>

              {/* Statutory Registration Summary */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-2xs font-mono text-stone-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src="/images/fssai-logo.png" alt="FSSAI" className="h-3 w-auto object-contain bg-white px-1 py-0.5 rounded shrink-0" />
                    <span className="text-stone-400">FSSAI Lic. No:</span>
                  </div>
                  <span className="text-amber-400 font-bold">{SITE_CONFIG.fssaiNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src="/images/iso-logo.svg" alt="ISO 9001:2015" className="h-3 w-auto object-contain bg-white px-1 py-0.5 rounded shrink-0" />
                    <span className="text-stone-400">ISO 9001:2015:</span>
                  </div>
                  <span className="text-emerald-300 font-semibold">{SITE_CONFIG.isoNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">GSTIN:</span>
                  <span className="text-stone-200 font-semibold">{SITE_CONFIG.gstin}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Credibility & Statutory Compliance Boost Strip */}
        <div className="pt-6 border-t border-emerald-950/80">
          <div className="bg-[#052117]/80 rounded-2xl p-4 sm:p-5 border border-emerald-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-5">
              {/* FSSAI Credential Boost Badge */}
              <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-xl shadow-xs">
                <img src="/images/fssai-logo.png" alt="FSSAI Logo" className="h-6 sm:h-7 w-auto object-contain" />
                <div className="flex flex-col text-left">
                  <span className="text-3xs uppercase font-extrabold tracking-wider text-stone-500">Food Safety Authority of India</span>
                  <span className="text-xs font-mono font-bold text-[#0B2568]">Lic. #{SITE_CONFIG.fssaiNumber}</span>
                </div>
              </div>

              {/* ISO 9001:2015 Credential Boost Badge */}
              <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-xl shadow-xs">
                <img src="/images/iso-logo.svg" alt="ISO 9001:2015 Logo" className="h-6 sm:h-7 w-auto object-contain" />
                <div className="flex flex-col text-left">
                  <span className="text-3xs uppercase font-extrabold tracking-wider text-stone-500">ISO 9001:2015 Certified QMS</span>
                  <span className="text-xs font-mono font-bold text-[#003366]">Cert. #{SITE_CONFIG.isoNumber}</span>
                </div>
              </div>

              {/* GSTIN Badge */}
              <div className="hidden lg:flex items-center gap-2 bg-emerald-950/80 px-3.5 py-2 rounded-xl border border-emerald-800/60 text-stone-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-3xs uppercase font-extrabold tracking-wider text-emerald-400">GSTIN Registered</span>
                  <span className="text-xs font-mono font-bold text-stone-200">{SITE_CONFIG.gstin}</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right text-xs text-stone-300 max-w-sm">
              <span className="text-emerald-300 font-semibold block">Statutory Export & Food Safety Alignment</span>
              Full compliance with Indian food regulations, FoSCoS portal reporting, and accredited lab test parameters.
            </div>
          </div>
        </div>

        {/* Bottom Strip: Legal & Admin Link */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-400">
          <div>
            © {currentYear} <strong className="text-stone-200">SABORA SPICES</strong>. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-400">
            <button 
              onClick={() => handleLinkClick('privacy')} 
              className="hover:text-amber-400 transition-colors cursor-pointer text-xs sm:text-sm"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => handleLinkClick('terms')} 
              className="hover:text-amber-400 transition-colors cursor-pointer text-xs sm:text-sm"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to contact your customer grievance desk.")}
              className="hover:text-stone-200 transition-colors cursor-pointer text-xs sm:text-sm"
            >
              Customer Grievance
            </button>
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
