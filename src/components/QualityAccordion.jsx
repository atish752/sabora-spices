import React, { useState } from 'react';
import { ChevronDown, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function QualityAccordion({ storyConfig }) {
  const [openIndex, setOpenIndex] = useState(0);

  const defaultAccordionItems = [
    {
      num: "01",
      title: "Direct Single-Estate Terroir Procurement",
      subtitle: "Bypassing intermediary trading layers for pure provenance",
      content: "We bypass multiple mandi trading tiers by working directly with generational farmer producer organizations (FPOs) and private estate clusters. Our green cardamom is nurtured at 1,100m elevation under the tropical rainforest canopy of Idukki, Kerala; our high-curcumin golden turmeric fingers from the black alluvial soil of Salem; and our jumbo fox nuts from pristine Mithila freshwater ponds. This preserves terroir authenticity, peak volatile terpenes, and fair farmer compensation."
    },
    {
      num: "02",
      title: "Optical Sortex Color-Grading & Calibrated Sizing",
      subtitle: "99.8% purity through laser sorting and vibratory destoners",
      content: "All incoming whole crop passes through multi-tier vibratory destoners, aspirators, and advanced Sortex optical laser sorters. We eliminate immature pods, pinheads, hollow berries, and foreign organic matter with 99.8% calibrated accuracy. Cardamom pods are sorted by millimeter screens (7.5mm, 8mm+ Extra Bold), while makhana undergoes meticulous double hand-sorting to deliver uniform 5-suta and 6-suta jumbo specimens."
    },
    {
      num: "03",
      title: "European Compliance (EC 396/2005) & Laboratory COA",
      subtitle: "Strict testing for pesticide MRLs, heavy metals, and active potency",
      content: "Every commercial export lot is analyzed by accredited independent laboratories (ISO/IEC 17025 accredited). We verify volatile essential oil yield (>8% for green cardamom), curcumin potency (>4.5% for turmeric via HPLC), moisture thresholds (<10%), and pesticide residue levels strictly conforming to EU Regulation (EC) No 396/2005 and European Spice Association (ESA) benchmarks. Comprehensive Certificate of Analysis (COA) dossiers are issued with every shipment."
    },
    {
      num: "04",
      title: "Non-ETO Steam Treatment & Aroma-Lock Nitrogen Packaging",
      subtitle: "Maximum terpene preservation without chemical residues",
      content: "We completely reject Ethylene Oxide (ETO) chemical treatment, employing advanced gentle steam sterilization upon buyer specification to eradicate microbial loads while safeguarding delicate aroma terpenes. Export shipments are hermetically packed in multi-wall kraft barrier sacks with food-grade poly liners or nitrogen-flushed barrier pouches to guarantee a 24-month aroma shelf life across sea and air freight."
    }
  ];

  const accordionItems = (storyConfig?.items && storyConfig.items.length > 0)
    ? storyConfig.items
    : defaultAccordionItems;

  const title = storyConfig?.title || "Crafted by ancient terroirs, certified by European standards.";
  const subtitle = storyConfig?.subtitle || "Uncompromising provenance, botanical purity, and scientific verification for discerning European culinary blenders and commercial importers.";
  const manifestoQuote = storyConfig?.manifestoQuote || "Great gastronomy begins in the soil. We believe whole spices should arrive at European blending mills and artisanal tables exactly as harvested — unadulterated, fragrant, and vibrant with natural essential oils.";
  const paragraph = storyConfig?.paragraph || "When contracting Green Cardamom, Salem Turmeric, or Jumbo Makhana with Sabora Spices, every container delivered CIF Rotterdam or Hamburg matches the precise essential oil density, color vibrancy, and laboratory purity of your approved pre-shipment sample lot.";

  return (
    <section id="quality" className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F6F3] border-b border-slate-200/90 scroll-mt-20 relative">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 reveal-init">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-900 bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-emerald-500/15 px-3.5 py-1 rounded-full border border-amber-400/50 mb-3 font-mono shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>The Sabora Terroir & Quality Manifesto</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.06]">
            {title}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Decorative Hairline Line */}
        <div className="w-full h-[1.5px] bg-gradient-to-r from-amber-500 via-emerald-500/40 to-transparent mb-12 reveal-line" />

        {/* 2-Column Grid: Left Story & Guarantees + Right Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Terroir Story & EU Guarantees */}
          <div className="lg:col-span-5 space-y-7 reveal-init">
            <blockquote className="text-base sm:text-xl text-slate-900 leading-relaxed font-serif italic border-l-2 border-amber-500 pl-4 py-1">
              "{manifestoQuote}"
            </blockquote>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {paragraph}
            </p>

            {/* European Quality Guarantee Card — Solid Architectural Frame */}
            <div className="p-6 sm:p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
              <div className="corner-tick-tl opacity-0 hover:opacity-100 transition-opacity" />
              <div className="corner-tick-br opacity-0 hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  Guarantees to European Commercial Buyers:
                </h4>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-sans">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>EU MRL (EC) 396/2005:</strong> Tested for pesticide residues & zero prohibited chemical dyes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Non-ETO & Steam Ready:</strong> Pure steam-sterilization without chemical carcinogen fumigation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Batch Traceability:</strong> Documented farmer cluster origins with harvest lot numbers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Accredited COA:</strong> Lab verified volatile oil & curcumin potency with every cargo.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-4 reveal-init delay-150">
            {accordionItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-white border-amber-400/90 shadow-md ring-1 ring-amber-400/20' 
                      : 'bg-white/90 hover:bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-amber-800 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md mt-0.5">
                        {item.num || `0${index + 1}`}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 font-sans">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 transition-transform duration-300 border border-slate-200 ${
                      isOpen ? 'rotate-180 bg-[#041A12] text-amber-300 border-transparent' : 'text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth unfolding content */}
                  <div
                    className={`transition-all duration-400 ease-in-out px-6 ${
                      isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden pointer-events-none'
                    }`}
                  >
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                        {item.content}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
