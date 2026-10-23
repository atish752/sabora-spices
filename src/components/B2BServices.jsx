import React from 'react';
import { Package, Factory, Anchor, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function B2BServices({ servicesConfig, onOpenWhatsAppDrawer }) {
  const defaultServices = [
    {
      num: "01",
      icon: Package,
      badge: "OEM & European Retail Brands",
      title: "Private Label & Retail Packaging",
      description: "Launch your own branded whole spices line. We sortex grade, nitrogen flush, and package in sustainable FSC-certified kraft zipper pouches or luxury glass jars with complete multilingual European labelling.",
      features: [
        "100g to 1kg recyclable barrier pouches & amber jars",
        "Nitrogen flush technology locking volatile terpenes for 24 months",
        "Multilingual EU compliant labelling (EN, DE, FR, NL) & barcoding",
        "Accessible MOQ trial batches for emerging European gourmet brands"
      ],
      whatsappPrompt: "Hello Sabora Spices team,\n\nI am interested in Private Label / OEM retail packaging for our European brand. Could you please share available packaging formats, minimum order quantities (MOQ), and pricing?\n\nThank you!"
    },
    {
      num: "02",
      icon: Anchor,
      badge: "European Commodity Importers",
      title: "Bulk Ocean & Air Freight (CIF / FOB)",
      description: "Direct origin bulk supply for international spice markets. We manage complete customs documentation, APEDA export clearance, phytosanitary certificates, and container stuffing to major European ports.",
      features: [
        "25 Kg & 50 Kg multiwall kraft paper sacks with food-grade PE barrier",
        "FCL (20ft / 40ft containers) & consolidated LCL palletized cargo",
        "CIF Rotterdam, Hamburg, Antwerp, Genoa & DAP door delivery",
        "Fumigation, Phytosanitary, and non-ETO certification included"
      ],
      whatsappPrompt: "Hello Sabora Spices team,\n\nI want to inquire about bulk container load export terms, phytosanitary clearance, and CIF European port pricing (Rotterdam / Hamburg) for whole spices.\n\nThank you!"
    },
    {
      num: "03",
      icon: Factory,
      badge: "Industrial Blenders & HORECA",
      title: "Institutional Supply Contracts",
      description: "Reliable, round-the-year spice procurement contracts for commercial grinding mills, masala blending houses, tea ateliers, and luxury European gastronomy groups.",
      features: [
        "Consistent batch-to-batch volatile oil and curcumin levels",
        "Scheduled monthly dispatches & reserved buffer inventory",
        "Contract volume pricing with protection against market volatility",
        "Priority batch testing with accredited Certificate of Analysis (COA)"
      ],
      whatsappPrompt: "Hello Sabora Spices team,\n\nWe are looking for long-term institutional wholesale supply contracts for our blending / food manufacturing unit. Please connect with our commercial desk.\n\nThank you!"
    }
  ];

  const serviceItems = (servicesConfig?.items && servicesConfig.items.length > 0)
    ? servicesConfig.items.map((item, idx) => ({
        ...item,
        icon: idx === 0 ? Package : idx === 1 ? Anchor : Factory,
        features: item.features || defaultServices[idx]?.features || []
      }))
    : defaultServices;

  const handleServiceWhatsAppClick = (promptText) => {
    SITE_CONFIG.openWhatsApp(encodeURIComponent(promptText));
  };

  const title = servicesConfig?.title || "Tailored B2B Solutions for European Trade";
  const subtitle = servicesConfig?.subtitle || "From palletized retail-ready pouches for organic supermarket chains to multi-ton container loads delivered CIF Rotterdam, Sabora Spices provides end-to-end supply chain assurance.";

  return (
    <section 
      id="b2b-services" 
      className="w-full py-18 sm:py-26 bg-gradient-to-b from-[#020F0A] via-[#041D14] to-[#020F0A] text-slate-100 border-y border-emerald-900/60 scroll-mt-20 relative overflow-hidden"
    >
      {/* Radiant metallic gold hairline borders top and bottom */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      {/* Ambient glowing illumination orbs */}
      <div className="absolute -top-32 -left-32 w-[38rem] h-[38rem] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[38rem] h-[38rem] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-6 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/50 font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Commercial Wholesale & OEM Services</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.06]">
            {title}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Decorative Hairline Line */}
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-14 reveal-line" />

        {/* Services Grid (High-Contrast Frosted Glass Luxury Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((srv, index) => {
            const Icon = srv.icon || Package;
            return (
              <div 
                key={index}
                className="bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-2xl p-7 sm:p-9 border border-white/15 hover:border-amber-400/80 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 flex flex-col justify-between group reveal-init relative overflow-hidden"
              >
                <div className="corner-tick-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="corner-tick-br opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="font-mono text-xs font-bold text-amber-300 bg-white/10 border border-white/20 px-3 py-1 rounded-md tracking-widest">
                      SERVICE {srv.num || `0${index + 1}`}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600/30 to-amber-500/20 border border-amber-400/40 text-amber-300 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-yellow-500 group-hover:text-slate-950 flex items-center justify-center transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block mb-2 font-mono">
                    {srv.badge}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                    {srv.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-5">
                    {srv.features?.map((feat, fIndex) => (
                      <li key={fIndex} className="text-xs text-slate-200 flex items-start gap-2.5 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleServiceWhatsAppClick(srv.whatsappPrompt)}
                  className="relative overflow-hidden w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white border border-emerald-400/50 hover:border-amber-400/70 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-[0_8px_25px_rgba(4,26,18,0.5)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.45)] group/btn"
                >
                  <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <MessageCircle className="w-4 h-4 text-emerald-200 group-hover/btn:scale-110 transition-transform relative z-10 shrink-0" />
                  <span className="relative z-10">Inquire on WhatsApp (1-Click)</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
