import React from 'react';
import { 
  Sprout, 
  ScanLine, 
  ShieldCheck, 
  Wind, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const PILLARS = [
  {
    num: '01',
    icon: Sprout,
    title: 'Single-Estate Terroir Provenance',
    badge: 'Direct Origin',
    summary: 'Direct FPO procurement bypassing multi-tiered mandi intermediaries.',
    detail: 'We work directly with generational planter clusters in the rainforest slopes of Idukki (1,100m elevation) and the alluvial black soil plains of Salem. By eliminating intermediate mandi tiers, we protect volatile terpenes, ensure fair grower compensation, and deliver 100% batch traceability.',
    highlight: '100% Origin Traceable'
  },
  {
    num: '02',
    icon: ScanLine,
    title: '99.8% Laser Sortex Calibration',
    badge: 'Optical Sorting',
    summary: 'Laser optical color sorters and calibrated millimeter screens.',
    detail: 'All whole spices undergo multi-stage vibratory destoning, aspiration, and high-speed Sortex optical laser sorting. We eliminate pinheads, hollow berries, and organic foreign matter to achieve an exact 99.8% purity benchmark with strict size grading.',
    highlight: '99.8% Purity Calibrated'
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'EU MRL (EC 396/2005) & Lab COA',
    badge: 'Regulatory Compliance',
    summary: 'Independent ISO 17025 accredited laboratory testing per export lot.',
    detail: 'Every commercial shipment is independently analyzed for pesticide residues strictly under European Regulation (EC) No 396/2005, heavy metals, volatile oil yield, and HPLC curcumin potency. Comprehensive laboratory Certificate of Analysis (COA) dossiers accompany each bill of lading.',
    highlight: 'Zero Compromise Purity'
  },
  {
    num: '04',
    icon: Wind,
    title: 'Non-ETO Steam Purity & Nitrogen Lock',
    badge: 'Terpene Preservation',
    summary: 'Zero chemical Ethylene Oxide. Advanced gentle steam and barrier packaging.',
    detail: 'We completely reject Ethylene Oxide (ETO) chemical fumigation. Gentle steam sterilization eradicates microbials while safeguarding natural aroma terpenes. Hermetically packed in multi-wall kraft barrier sacks and nitrogen-flushed retail pouches for 24-month aroma stability.',
    highlight: '24-Month Aroma Stability'
  }
];

export default function StandardsGrid() {
  return (
    <section id="standards" className="py-20 sm:py-28 bg-white border-y border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>The Sabora Protocol</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            Engineered for European Standards
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Four non-negotiable principles protecting volatile essential oils, food safety, and regulatory compliance from plantation soil to European port terminal.
          </p>
        </div>

        {/* 4 Modern Feature Cards (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group rounded-3xl bg-stone-50/70 hover:bg-white border border-stone-200/90 hover:border-emerald-600/40 p-8 sm:p-10 shadow-xs hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-300 group-hover:text-emerald-800 transition-colors">
                      {pillar.num}
                    </span>

                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white text-stone-700 border border-stone-200 shadow-2xs">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-emerald-800 shadow-2xs group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-emerald-800" />
                    </div>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-stone-950 group-hover:text-emerald-950 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Descriptions */}
                  <p className="font-sans text-xs sm:text-sm font-semibold text-stone-700 mb-2">
                    {pillar.summary}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {pillar.detail}
                  </p>

                </div>

                {/* Bottom Highlight Pill */}
                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pillar.highlight}</span>
                  </div>
                  <span className="text-stone-400 font-semibold group-hover:text-stone-700 transition-colors">
                    Sabora Standard
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
