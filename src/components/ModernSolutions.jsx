import React from 'react';
import { 
  Ship, 
  Package, 
  Factory, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const SOLUTIONS = [
  {
    id: 'freight',
    icon: Ship,
    badge: 'European Commodity Importers',
    title: 'Bulk Ocean & Air Freight (CIF / FOB)',
    description: 'Direct origin container-load supply for wholesale spice importers and mandi trading houses across Europe.',
    features: [
      'CIF Rotterdam, Hamburg, Genoa, Antwerp & Air DAP',
      '25 Kg & 50 Kg multiwall kraft paper barrier bags',
      'FCL (20ft / 40ft) & consolidated LCL palletized cargo',
      'Phytosanitary, APEDA & Non-ETO certificates included'
    ],
    whatsappPrompt: 'Hello Sabora Spices team,\n\nI want to inquire about bulk container-load export terms and CIF European port pricing (Rotterdam / Hamburg) for whole spices.\n\nThank you!'
  },
  {
    id: 'private-label',
    icon: Package,
    badge: 'OEM & European Retail Brands',
    title: 'Private Label & Retail Packaging',
    description: 'Launch your premium whole spices and snack range under your own brand with complete European compliance.',
    features: [
      '100g to 1kg recyclable barrier pouches & amber jars',
      'Nitrogen flush locking volatile terpenes for 24 months',
      'Multilingual EU compliant labelling (EN, DE, FR, NL)',
      'Flexible MOQ trial batches for emerging European brands'
    ],
    whatsappPrompt: 'Hello Sabora Spices team,\n\nI am interested in Private Label / OEM retail packaging for our European brand. Could you please share available packaging formats, MOQ, and sample dispatch terms?\n\nThank you!'
  },
  {
    id: 'institutional',
    icon: Factory,
    badge: 'Industrial Blenders & HORECA',
    title: 'Institutional Harvest Contracts',
    description: 'Reliable, round-the-year procurement contracts for commercial grinding mills, masala blending houses, and tea ateliers.',
    features: [
      'Consistent batch-to-batch volatile oil and curcumin levels',
      'Scheduled monthly dispatches & reserved buffer inventory',
      'Volume price protection against crop volatility',
      'Independent ISO 17025 accredited COA dossiers per run'
    ],
    whatsappPrompt: 'Hello Sabora Spices team,\n\nWe are looking for long-term institutional wholesale supply contracts for our blending / food manufacturing unit. Please connect with our commercial desk.\n\nThank you!'
  }
];

export default function ModernSolutions() {
  const handleLaunchWhatsApp = (promptText) => {
    SITE_CONFIG.openWhatsApp(encodeURIComponent(promptText));
  };

  return (
    <section id="solutions" className="py-20 sm:py-28 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Commercial Supply Channels</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            Wholesale & Private Label Solutions
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Tailored supply chain execution for European commodity buyers, organic consumer brands, and industrial culinary manufacturers.
          </p>
        </div>

        {/* 3 Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.id}
                className="group rounded-3xl bg-white border border-stone-200/90 p-8 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                      {sol.badge}
                    </span>

                    <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-800 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-emerald-800" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-stone-950 mb-3 group-hover:text-emerald-950 transition-colors">
                    {sol.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {sol.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {sol.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* 1-Click WhatsApp CTA */}
                <button
                  onClick={() => handleLaunchWhatsApp(sol.whatsappPrompt)}
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-[#041A12] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-stone-800 hover:border-amber-400/50 shadow-sm cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
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
