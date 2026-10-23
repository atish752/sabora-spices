import React from 'react';
import { Star, Leaf, ShieldCheck, Anchor } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function TrustBadges({ trustConfig, onScrollToReviews }) {
  const rating = trustConfig?.rating || '4.95';
  const ratingScale = trustConfig?.ratingScale || '/ 5.0';
  const reviewCount = trustConfig?.reviewCount || '1,280+ Importers & Blenders';
  const p1Title = trustConfig?.pillar1Title || 'Single-Estate Terroir';
  const p1Desc = trustConfig?.pillar1Desc || 'Idukki, Salem & Mithila origin lots';
  const p2Title = trustConfig?.pillar2Title || 'EU MRL Compliant';
  const p2Desc = trustConfig?.pillar2Desc || 'Non-ETO • 99.8% Sortex purity';
  const p3Title = trustConfig?.pillar3Title || 'CIF European Ports';
  const p3Desc = trustConfig?.pillar3Desc || 'Rotterdam, Hamburg, Genoa & Air';

  return (
    <section className="w-full py-8 sm:py-10 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F6F3] border-b border-slate-200/90 relative z-20">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 reveal-init">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          
          {/* Pillar 1: Verified Commercial Reviews Widget */}
          <div 
            onClick={onScrollToReviews}
            className="flex items-center gap-4 cursor-pointer group p-4 bg-white/95 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400/80 hover:shadow-md transition-all"
            title="Click to view verified European & international commercial reviews"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#041A12] to-[#082E20] text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/50 shadow-xs group-hover:scale-105 transition-transform">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  <AnimatedCounter value={rating} />
                </span>
                <span className="text-xs text-slate-500 font-sans">{ratingScale}</span>
              </div>
              <span className="text-xs font-bold text-[#041A12] group-hover:text-amber-700 font-sans tracking-wide transition-colors">
                {reviewCount}
              </span>
            </div>
          </div>

          {/* Pillar 2: Single-Estate Origin & Terroir */}
          <div className="flex items-center gap-4 p-4 bg-white/95 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-400/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
              <Leaf className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">{p1Title}</h4>
              <p className="text-xs text-slate-600 leading-snug mt-0.5">{p1Desc}</p>
            </div>
          </div>

          {/* Pillar 3: EU MRL & Sortex Purity */}
          <div className="flex items-center gap-4 p-4 bg-white/95 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">{p2Title}</h4>
              <p className="text-xs text-slate-600 leading-snug mt-0.5">{p2Desc}</p>
            </div>
          </div>

          {/* Pillar 4: European Freight & Incoterms */}
          <div className="flex items-center gap-4 p-4 bg-white/95 rounded-xl border border-slate-200 shadow-2xs hover:border-teal-400/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-200 shadow-xs">
              <Anchor className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">{p3Title}</h4>
              <p className="text-xs text-slate-600 leading-snug mt-0.5">{p3Desc}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
