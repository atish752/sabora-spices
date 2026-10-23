import React from 'react';
import { Anchor, Package, Factory, MessageCircle, Check } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function B2BServices({ servicesConfig, onOpenWhatsAppDrawer }) {
  const defaultServices = [
    {
      num: "01",
      icon: Anchor,
      badge: "Ocean & Air Cargo",
      title: "Bulk Container Freight (CIF / FOB)",
      description: "Direct origin shipping to European ports with complete phytosanitary clearance, APEDA documentation, and container stuffing.",
      bullets: [
        "FCL (20ft / 40ft) & consolidated LCL pallet cargo",
        "CIF Rotterdam, Hamburg, Antwerp & Genoa",
        "Full phytosanitary & non-ETO certification included"
      ],
      whatsappPrompt: "Hello Sabora Spices team,\n\nI want to inquire about bulk container load export terms, phytosanitary clearance, and CIF European port pricing (Rotterdam / Hamburg).\n\nThank you!"
    },
    {
      num: "02",
      icon: Package,
      badge: "European Gourmet Brands",
      title: "Private Label & OEM Packaging",
      description: "Launch your branded whole spice assortment. We sortex-grade, nitrogen-flush, and pack in retail-ready recyclable pouches or glass jars.",
      bullets: [
        "100g to 1kg recyclable barrier pouches & amber jars",
        "Nitrogen flush locking essential oils for 24 months",
        "Multilingual European labeling (EN, DE, FR, NL) & EAN barcoding"
      ],
      whatsappPrompt: "Hello Sabora Spices team,\n\nI am interested in Private Label / OEM packaging for our brand. Please share available formats, MOQs, and pricing.\n\nThank you!"
    },
    {
      num: "03",
      icon: Factory,
      badge: "Blenders & Food Ateliers",
      title: "Institutional Supply Contracts",
      description: "Consistent harvest agreements for spice mills, tea ateliers, and gastronomy houses with price protection and scheduled dispatches.",
      bullets: [
        "Consistent batch-to-batch volatile oil and curcumin levels",
        "Scheduled monthly dispatches with reserved buffer stock",
        "Contract volume pricing with protection against market swings"
      ],
      whatsappPrompt: "Hello Sabora Spices team,\n\nWe are looking for long-term wholesale supply contracts for our blending / food manufacturing unit. Please connect with our commercial desk.\n\nThank you!"
    }
  ];

  const handleServiceWhatsAppClick = (promptText) => {
    SITE_CONFIG.openWhatsApp(encodeURIComponent(promptText));
  };

  return (
    <section id="b2b-services" className="w-full py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
            <Anchor className="w-3.5 h-3.5 text-amber-600" />
            <span>Commercial Supply Chains</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Wholesale & Export Solutions
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            From palletized private-label retail pouches to multi-ton container loads delivered CIF to European terminals.
          </p>
        </div>

        {/* 3 Modern Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {defaultServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-600/50 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-300 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#041A12] text-amber-400 flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {service.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={() => handleServiceWhatsAppClick(service.whatsappPrompt)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#041A12] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
