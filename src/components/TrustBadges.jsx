import React from 'react';
import { Leaf, ShieldCheck, Anchor, Sparkles } from 'lucide-react';

export default function TrustBadges({ trustConfig, onScrollToReviews }) {
  const pillars = [
    {
      icon: Leaf,
      title: 'Single-Estate Provenance',
      desc: 'Traceable harvests from Idukki, Salem & Mithila estate clusters.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      icon: Sparkles,
      title: 'Laser Optical Sortex',
      desc: 'Calibrated 99.8% color purity, destoned and screened by millimeter size.',
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      icon: ShieldCheck,
      title: 'EU Compliance & COA',
      desc: 'Tested for pesticide MRLs under EC 396/2005. Non-ETO steam sterilized.',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200'
    },
    {
      icon: Anchor,
      title: 'CIF European Ports',
      desc: 'Direct maritime & air cargo freight to Rotterdam, Hamburg, and Genoa.',
      color: 'text-slate-700 bg-slate-50 border-slate-200'
    }
  ];

  return (
    <section className="w-full py-8 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-xs transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${p.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
