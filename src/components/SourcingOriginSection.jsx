import React from 'react';
import { 
  MapPin, 
  Compass, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Sprout, 
  Truck, 
  FileCheck, 
  Search 
} from 'lucide-react';

export default function SourcingOriginSection({ onOpenQuoteModal, onScrollToSection }) {
  const origins = [
    {
      region: "Kerala & the Western Ghats",
      subregion: "Idukki District & Surrounding Hills",
      product: "Whole Green Cardamom",
      badge: "Cardamom Capital",
      image: "/images/hero-cardamom-harvest.jpg",
      desc: "Kerala, particularly the Idukki district and surrounding cardamom-growing areas, is a recognized production region for Indian green cardamom. We explore sourcing options through growers, local dealers, and regional suppliers depending on capsule size (7mm, 7.5mm, 8mm+), grade, aroma, and moisture.",
      factors: ["Capsule size & deep green color", "Intense volatile essential oils", "Shade-grown rainforest canopy", "Careful solar & kiln curing"]
    },
    {
      region: "Mithila Region, Bihar",
      subregion: "Aquatic Freshwater Wetland Clusters",
      product: "Makhana (Fox Nuts)",
      badge: "GI Origin Belt",
      image: "/images/makhana-pouch.jpg",
      desc: "Bihar is the premier production region for Makhana in India. Its established cultivation and processing ecosystem makes it an indispensable origin when sourcing for business buyers. We evaluate product size (5-suta, 6-suta jumbo), appearance, natural unbleached color, condition, and crispness.",
      factors: ["Uniform 5-Suta & 6-Suta sizing", "Zero chemical bleaching agents", "Crunchy low-moisture popping", "Traditional farmer community harvesting"]
    },
    {
      region: "Selected Indian Belts",
      subregion: "Salem & Nizamabad Agricultural Plains",
      product: "Whole Turmeric Fingers & Spices",
      badge: "Prime Crop Belts",
      image: "/images/turmeric-pouch.jpg",
      desc: "For whole turmeric fingers and other whole spices requested by buyers, we identify appropriate producing and trading regions according to the particular crop. Sourcing locations are selected based on crop suitability, availability, active potency (curcumin/eugenol), and commercial feasibility.",
      factors: ["High natural curcumin content (3.5% - 5.2%+)", "Double polished intact fingers", "Unadulterated whole product form", "Traceable regional mandis"]
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Understand the Requirement",
      desc: "We identify the required product, specifications, grade, quantity, packaging preferences, and delivery destination."
    },
    {
      num: "02",
      title: "Identify Suitable Regions",
      desc: "We consider relevant growing areas, production centers, and established regional markets for the required crop."
    },
    {
      num: "03",
      title: "Explore Supply Options",
      desc: "Where feasible, we explore direct farmer or producer sourcing alongside suitable local dealers and regional suppliers."
    },
    {
      num: "04",
      title: "Review Product Suitability",
      desc: "Available products are assessed against agreed specifications. Additional inspection or laboratory testing is arranged where agreed."
    },
    {
      num: "05",
      title: "Coordinate Supply",
      desc: "Once quantity, pricing, packaging, and delivery terms are confirmed, we coordinate the supply arrangement for fulfillment."
    }
  ];

  return (
    <section id="sourcing" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wide uppercase">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>004. Sourcing & Origin Awareness</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Our Sourcing Approach & Product Origins in India
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            We believe sourcing should be guided by the product and its origin rather than relying on a single location for every requirement. Geographical origin alone is not treated as a guarantee of quality; we combine origin awareness with rigorous product inspection.
          </p>
        </div>

        {/* 3 Key Origins Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {origins.map((orig, idx) => (
            <div 
              key={idx}
              className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                  <img 
                    src={orig.image} 
                    alt={orig.product} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#0F3D2E] text-amber-300 text-[11px] font-bold">
                      {orig.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs text-amber-400 font-semibold uppercase font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{orig.region}</span>
                    </div>
                    <div className="font-serif text-lg font-bold">
                      {orig.product}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                    {orig.subregion}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {orig.desc}
                  </p>
                  
                  <div className="space-y-2 pt-2 border-t border-stone-200">
                    <div className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">
                      Key Quality Parameters:
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-stone-700">
                      {orig.factors.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal({ origin: orig.region, name: orig.product }) : null}
                  className="w-full py-2.5 rounded-lg border border-stone-300 hover:border-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white text-stone-800 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Inquire for {orig.product}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── 5-Step Sourcing Workflow ── */}
        <div className="bg-[#041A12] text-white rounded-3xl p-8 sm:p-12 space-y-10 shadow-xl border border-emerald-900/50">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Systematic Execution</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              How We Approach Sourcing (5-Step Framework)
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Clear milestone progression ensuring specification alignment, availability checks, and dependable supply coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative">
            {steps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono font-extrabold text-base flex items-center justify-center">
                    {st.num}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white leading-snug">
                    {st.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sourcing Philosophy Callout */}
          <div className="p-6 rounded-2xl bg-white/5 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                Our Sourcing Philosophy
              </div>
              <p className="text-xs sm:text-sm text-stone-200 max-w-3xl leading-relaxed">
                "We recognise that quality can vary between suppliers, harvests, batches, and handling conditions, even within the same region. We aim to combine origin awareness, suitable supplier selection, clear product specifications, and appropriate quality checks to support informed purchasing decisions."
              </p>
            </div>
            <button
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : onScrollToSection('contact')}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shrink-0 cursor-pointer shadow-md"
            >
              Discuss Your Origin Needs
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
