import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Target, 
  Eye, 
  ArrowRight, 
  FileCheck, 
  MessageSquare, 
  Workflow 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function AboutSection({ onScrollToSection, onOpenQuoteModal }) {
  const principles = [
    {
      num: "01",
      icon: FileCheck,
      title: "Product Understanding",
      desc: "Knowing the buyer's requirements in detail and discussing relevant product specifications (capsule size, grade, appearance, moisture, aroma) before an order is confirmed."
    },
    {
      num: "02",
      icon: MessageSquare,
      title: "Clear Communication",
      desc: "Providing clarity on product availability, harvest seasons, quantities, packaging options, pricing discussions, and agreed commercial terms without unsupported promises."
    },
    {
      num: "03",
      icon: Workflow,
      title: "Business-Focused Coordination",
      desc: "Working proactively to align sourcing, careful product preparation, food-grade packaging, laboratory testing, and delivery arrangements with the exact requirements of each order."
    }
  ];

  const whoWeServe = [
    { title: "Wholesalers & Distributors", desc: "Seeking whole spices and Makhana for domestic resale & distribution." },
    { title: "Retail Businesses & Modern Trade", desc: "Looking for premium products, shelf-ready pouches, and consistent supply." },
    { title: "Food Businesses & Processing", desc: "Requiring consistent whole ingredients according to strict culinary specifications." },
    { title: "Importers & International Buyers", desc: "Exploring dependable, compliant sourcing opportunities from India." },
    { title: "Private-Label Brands", desc: "Seeking custom packaging arrangements, branding, and food-grade barrier pouches." },
    { title: "Commodity Trading Businesses", desc: "Looking for reliable supply options matching their commercial terms." }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-stone-100 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Top Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0F3D2E] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Our Heritage & Values</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 leading-[1.2] tracking-tight">
              Connecting Quality Products with Business Opportunities
            </h2>

            <p className="font-hand text-base sm:text-lg text-emerald-800 font-bold">
              ~ Direct from generational planters to our central Delhi logistics hub ~
            </p>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              <p>
                <strong className="text-stone-900 font-semibold">SABORA SPICES</strong> is an India-based sourcing and supply business specialising in whole spices and Makhana (Fox Nuts) for domestic and international business buyers.
              </p>
              <p>
                Based in <span className="font-semibold text-stone-900">Jahangirpuri, Delhi, India</span>, we aim to provide practical sourcing and supply solutions for wholesalers, distributors, retailers, food businesses, importers, and private-label brands.
              </p>
              <p>
                Our business is built around two core product categories: <span className="font-semibold text-emerald-800">Whole Spices</span> (specialising in whole green cardamom and whole turmeric fingers) and <span className="font-semibold text-amber-800">Makhana (Fox Nuts)</span>. We focus exclusively on whole, unadulterated products rather than powdered or ground spices.
              </p>
              <p className="border-l-4 border-amber-500 pl-4 py-1 text-stone-700 italic bg-amber-50/40 rounded-r">
                "We understand that successful business relationships depend on more than product availability. Buyers need clear specifications, suitable packaging, consistent communication, transparent order terms, and dependable coordination."
              </p>
            </div>

            {/* Quick Sabora Stats / Credentials */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-3 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <div className="text-lg sm:text-2xl font-extrabold font-serif text-[#0F3D2E]">2 Core</div>
                <div className="text-2xs sm:text-sm text-stone-600 font-medium">Spices & Makhana</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <div className="text-lg sm:text-2xl font-extrabold font-serif text-amber-600">100%</div>
                <div className="text-2xs sm:text-sm text-stone-600 font-medium">Whole Crops Only</div>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 text-center flex flex-col items-center justify-center">
                <img src="/images/fssai-logo.png" alt="FSSAI Logo" className="h-5 sm:h-6 w-auto object-contain mb-1" />
                <div className="text-2xs sm:text-xs font-mono font-bold text-[#0B2568]">{SITE_CONFIG.fssaiNumber}</div>
                <div className="text-3xs sm:text-2xs text-stone-500 font-medium">Licensed & Aligned</div>
              </div>
            </div>

            {/* Official Statutory Badges Row in About */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-2xs text-stone-700">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                <strong className="text-stone-900">ISO 9001:2015:</strong> {SITE_CONFIG.isoNumber}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                <strong className="text-stone-900">GSTIN:</strong> {SITE_CONFIG.gstin}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : (onScrollToSection && onScrollToSection('contact'))}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white text-sm sm:text-base font-semibold shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
              </button>
              <button
                onClick={() => onScrollToSection && onScrollToSection('sourcing')}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm sm:text-base font-semibold transition-all cursor-pointer text-center"
              >
                Explore Sourcing & Origin
              </button>
            </div>

          </div>

          {/* Right Image Showcase: Full Brand Master Packaging Visual */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-amber-200/80 shadow-2xl bg-[#041A12] group flex items-center justify-center">
              <img 
                src="/images/hero-sabora-master.jpg" 
                alt="Sabora Spices Pure Heritage Master Packaging" 
                className="w-full h-auto max-h-[500px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Sabora Insignia Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#0F3D2E] text-white flex items-center gap-4 shadow-md border border-amber-400/30">
              <div className="w-14 h-14 rounded-full bg-white/10 p-1 shrink-0 flex items-center justify-center border border-amber-400/40">
                <img src="/images/logo.png" alt="Sabora Logo" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-0.5">
                <div className="font-serif font-bold text-lg text-amber-300">SABORA SPICES</div>
                <div className="text-xs sm:text-sm text-stone-200">Jahangirpuri, Delhi – 110033, India</div>
                <div className="text-xs text-emerald-300 font-mono">+91 78809 06610 | +91 95327 01582</div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Business Philosophy: Three Principles ── */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Our Core Foundation</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Our Business Philosophy
            </h3>
            <p className="text-sm sm:text-base text-stone-600">
              Rather than assuming one solution suits every customer, we work to understand the buyer's exact requirements before discussing sourcing options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className="bg-stone-50 hover:bg-emerald-50/50 p-6 rounded-2xl border border-stone-200/90 hover:border-emerald-500/40 transition-all duration-300 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-600 bg-amber-100/70 px-2.5 py-1 rounded">
                      Principle {p.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white shadow-xs text-[#0F3D2E] group-hover:bg-[#0F3D2E] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Who We Serve Grid ── */}
        <div className="bg-gradient-to-br from-stone-900 to-[#041A12] text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">B2B Partnerships</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Who We Serve
            </h3>
            <p className="text-sm sm:text-base text-stone-300">
              Our business is structured to support diverse B2B buyers across domestic and export markets with transparent terms and dependable fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whoWeServe.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h4 className="text-base font-bold text-white font-serif">{item.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Vision & Mission Banner */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider font-mono">
                <Eye className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                To develop SABORA SPICES into a recognized and dependable sourcing and supply partner for whole spices and Makhana, building long-term business relationships through product understanding, professional communication, and responsible coordination.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider font-mono">
                <Target className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                To connect business buyers with suitable whole-spice and Makhana supply options while prioritizing transparency, buyer requirements, and professional business practices, making the sourcing process clear from initial inquiry through dispatch.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
