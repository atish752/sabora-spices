import React from 'react';
import { ShieldCheck, Sparkles, Award, CheckCircle2 } from 'lucide-react';

const MARQUEE_ITEMS = [
  'EU MRL (EC) 396/2005 COMPLIANT',
  'NON-ETO STEAM STERILIZATION',
  '99.8% OPTICAL SORTEX SORTED',
  'SINGLE-ESTATE IDUKKI & SALEM TERROIRS',
  'APEDA & SPICES BOARD INDIA ACCREDITED',
  'DIRECT CIF ROTTERDAM • HAMBURG • GENOA',
  'ISO 17025 ACCREDITED LABORATORY COA',
  'AROMA-LOCK NITROGEN FLUSHED PACKAGING'
];

export default function MarqueeTape() {
  return (
    <div className="w-full border-y border-stone-200/80 bg-white/60 backdrop-blur-sm py-3.5 overflow-hidden select-none">
      <div className="marquee-container flex items-center">
        <div className="marquee-content flex items-center gap-8 animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, index) => (
            <div key={`tape-1-${index}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-bold tracking-widest text-stone-700 uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="marquee-content flex items-center gap-8 animate-marquee whitespace-nowrap" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, index) => (
            <div key={`tape-2-${index}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-bold tracking-widest text-stone-700 uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
