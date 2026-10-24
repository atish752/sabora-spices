import React from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Microscope, 
  Warehouse, 
  PackageCheck, 
  AlertTriangle, 
  TrendingUp 
} from 'lucide-react';

export default function QualitySafetySection({ onScrollToSection, onOpenQuoteModal }) {
  const frameworks = [
    {
      title: "FSSAI Compliance",
      code: "Food Safety & Standards Authority of India",
      desc: "We consider relevant requirements for food handling, storage, packaging, hygiene, labelling, and traceability as established by Indian food safety legislation."
    },
    {
      title: "ISO 9001:2015 Principles",
      code: "Quality Management Systems (QMS)",
      desc: "Internationally recognized framework guiding our clear product specifications, systematic supplier evaluation, batch inspection, and organized order coordination."
    },
    {
      title: "ISO 22000:2018 Principles",
      code: "Food Safety Management Systems (FSMS)",
      desc: "Guidance on identifying food safety hazards, prerequisite hygiene programmes, contamination prevention, and rigorous control measures across the handling chain."
    }
  ];

  const qualityPoints = [
    {
      icon: Layers,
      title: "Regular Product & Handling Inspections",
      desc: "Assessment of color, capsule size or grade, moisture levels, foreign matter, mold/pest inspection, and packaging integrity."
    },
    {
      icon: PackageCheck,
      title: "Food-Grade Packaging Materials",
      desc: "Appropriate food-grade pouches, poly liners, and moisture-barrier packaging certified for direct food contact application."
    },
    {
      icon: Sparkles,
      title: "Hygienic Handling & Protection",
      desc: "Clean product-contact surfaces, personal hygiene protocols, separation of products, and contamination-free packing zones."
    },
    {
      icon: Warehouse,
      title: "Appropriate Storage & Climate Care",
      desc: "Clean, dry storage with controlled ambient temperature and humidity to prevent moisture damage and preserve aroma terpenes."
    },
    {
      icon: FileCheck,
      title: "Traceability & Lot Documentation",
      desc: "Structured records linking supplier origin, lot numbers, inspection records, packaging details, and dispatch documentation."
    },
    {
      icon: Microscope,
      title: "Laboratory Testing Coordination",
      desc: "Independent accredited lab analysis for moisture, microbiological quality, pesticide residues, and active chemical potency."
    },
    {
      icon: AlertTriangle,
      title: "Non-Conforming Product Control",
      desc: "Strict protocol: any batch failing agreed specifications is segregated and held from dispatch until resolved."
    },
    {
      icon: TrendingUp,
      title: "Continuous Process Improvement",
      desc: "Systematic review of customer feedback, supplier performance, and regulatory updates to continually strengthen supply coordination."
    }
  ];

  return (
    <section id="quality" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>006. Quality & Food Safety</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Quality You Can Trust. Food Safety at Every Step.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, quality and food safety are fundamental to our approach to sourcing and supplying whole green cardamom, whole turmeric fingers, and Makhana (Fox Nuts). We look to established FSSAI requirements and ISO management principles to guide our operations.
          </p>
        </div>

        {/* 3 Regulatory Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map((f, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all duration-300 space-y-3 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {f.title}
                </h3>
              </div>
              <div className="text-xs font-semibold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block">
                {f.code}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 8 Operational Quality Points Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Our Core Quality & Safety Practices
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Applied rigorously throughout product evaluation, packing, and shipment coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 hover:border-emerald-500/40 hover:shadow-md transition-all space-y-3"
                >
                  <div className="p-2.5 rounded-xl bg-white text-[#0F3D2E] w-fit shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lab Testing Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-amber-400 font-mono font-bold uppercase">
              Release Control Protocol
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              No Product Released Without Approved Testing
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
              Under our testing-control policy, every batch is verified by an accredited laboratory for moisture, microbial limits, and pesticide residues prior to dispatch.
            </p>
          </div>
          <button
            onClick={() => onScrollToSection('lab-testing')}
            className="px-6 py-3 rounded-xl bg-white text-[#0F3D2E] hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            Explore Lab Testing Protocol
          </button>
        </div>

      </div>
    </section>
  );
}
