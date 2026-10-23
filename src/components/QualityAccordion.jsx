import React from 'react';
import { Award, ShieldCheck, Sparkles, Wind, CheckCircle2 } from 'lucide-react';

export default function QualityAccordion({ storyConfig }) {
  const title = storyConfig?.title || "The Sabora Quality Standard";
  const subtitle = storyConfig?.subtitle || "Four non-negotiable pillars guiding every harvest from plantation soil to European port.";

  const pillars = [
    {
      num: "01",
      title: "Direct Terroir Provenance",
      tagline: "Single-Estate Sourcing",
      description: "Direct partnerships with generational estate clusters in Idukki, Salem, and Mithila. Bypassing intermediary trading tiers to protect volatile terpenes and guarantee pure origin.",
      highlight: "100% Origin Traced"
    },
    {
      num: "02",
      title: "Laser Optical Sortex Grading",
      tagline: "Calibrated Purity",
      description: "Multi-tier vibratory destoners, aspirators, and laser sortex sorters eliminate pinheads, hollow pods, and foreign matter with 99.8% calibrated accuracy.",
      highlight: "99.8% Purity"
    },
    {
      num: "03",
      title: "European Compliance (EC 396/2005)",
      tagline: "Certified Lab COA",
      description: "Independent ISO 17025 accredited laboratory testing for pesticide MRLs, heavy metals, volatile oil yield, and HPLC curcumin potency. Full technical dossiers issued per lot.",
      highlight: "EU MRL Compliant"
    },
    {
      num: "04",
      title: "Non-ETO Steam & Nitrogen Lock",
      tagline: "Terpene Preservation",
      description: "Zero chemical Ethylene Oxide (ETO). Gentle steam treatment combined with hermetic multiwall kraft and nitrogen-flushed barrier bags ensure a 24-month fresh aroma shelf life.",
      highlight: "24-Month Freshness"
    }
  ];

  return (
    <section id="quality" className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Terroir & Traceability</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 4 Modern Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-600/50 p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300 space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-amber-600">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.highlight}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {item.tagline}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-950 transition-colors mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
