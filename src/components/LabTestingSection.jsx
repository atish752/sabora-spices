import React from 'react';
import { 
  FlaskConical, 
  FileCheck2, 
  CheckCircle2, 
  ShieldAlert, 
  UploadCloud, 
  Lock, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export default function LabTestingSection({ onOpenQuoteModal, onScrollToSection }) {
  const testingPanels = [
    {
      product: "Green Cardamom (Elaichi)",
      badge: "Primary Crop Protocol",
      image: "/images/cardamom-pods.jpg",
      parameters: [
        { label: "Moisture Content", spec: "Max 10.0% (Moisture Controlled)" },
        { label: "Volatile Essential Oil", spec: "Min 7.0% - 8.5% v/w (Terpene Rich)" },
        { label: "Microbiological Parameters", spec: "TPC, Yeast & Mold, E.coli, Salmonella (Absent)" },
        { label: "Pesticide Residues", spec: "Screened against FSSAI & destination MRL limits" },
        { label: "Artificial Color Polish", spec: "Negative (100% Natural Green, No Malachite)" },
        { label: "Physical Sizing", spec: "7.0mm, 7.5mm, 8.0mm+ Calibrated screens" }
      ]
    },
    {
      product: "Makhana (Fox Nuts)",
      badge: "Superfood Protocol",
      image: "/images/makhana-pile.jpg",
      parameters: [
        { label: "Moisture Content", spec: "Max 5.0% (High Crispness Guarantee)" },
        { label: "Chemical Bleaching", spec: "Zero Chemical Bleach (Natural Milky White)" },
        { label: "Aflatoxin & Mycotoxins", spec: "Total B1, B2, G1, G2 within strict regulatory limits" },
        { label: "Heavy Metal Screen", spec: "Lead, Cadmium, Arsenic well below statutory limits" },
        { label: "Black Spot Defect Ratio", spec: "< 1.5% through precision sorting" },
        { label: "Protein Retention", spec: "Standard 9.7g / 100g nutritional profile" }
      ]
    }
  ];

  const releaseSteps = [
    { step: "01", title: "Product Identification", desc: "Isolate incoming harvest lot and assign unique batch tracking code." },
    { step: "02", title: "Sample Submission", desc: "Aseptic composite sampling and submission to accredited food testing lab." },
    { step: "03", title: "Laboratory Analysis", desc: "Analysis performed using validated chromatographic and microbiological methods." },
    { step: "04", title: "Report Review", desc: "Technical evaluation of Certificate of Analysis (COA) against buyer specifications." },
    { step: "05", title: "Release Decision", desc: "Formal quality release sign-off. Failed batches are strictly held and rejected." },
    { step: "06", title: "Dispatch Docs & FoSCoS", desc: "COA attached to shipment paperwork and linked via FoSCoS compliance portal." }
  ];

  return (
    <section id="lab-testing" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
            <span>Laboratory Testing & Quality Verification</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Tested for Quality. Verified Before Dispatch.
          </h2>

          <p className="font-hand text-base sm:text-lg text-emerald-800 font-bold">
            ~ Independent NABL laboratory analysis • Full Certificate of Analysis (COA) per lot ~
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, laboratory testing is an essential part of our commitment to product quality, food safety, and responsible supply. Quality does not rely on visual inspection alone; it is supported by empirical testing and documented release control.
          </p>

          <div className="p-3 bg-emerald-900 text-amber-300 rounded-xl text-xs sm:text-sm font-semibold max-w-xl mx-auto shadow-sm border border-emerald-700">
            🔒 Our Stated Principle: No product batch is dispatched under our testing-control policy until the required laboratory report has been received, reviewed, and approved for release.
          </div>
        </div>

        {/* Product Testing Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testingPanels.map((panel, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="p-6 bg-gradient-to-r from-stone-900 to-[#041A12] text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      {panel.badge}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                      {panel.product}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-white/10 p-1 shrink-0 overflow-hidden border border-white/20">
                    <img src={panel.image} alt={panel.product} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-emerald-600" />
                    <span>Verified Test Parameters:</span>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {panel.parameters.map((param, i) => (
                      <div key={i} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                        <span className="font-semibold text-stone-700 shrink-0">{param.label}</span>
                        <span className="text-stone-900 text-right font-medium">{param.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Tested via FSSAI-Notified Food Labs
                </span>
                <span className="font-mono text-stone-500">COA Provided with Batch</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 6-Step Batch Release Protocol ── */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Quality Assurance Workflow</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Batch Release & Dispatch Control Protocol
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              A systematic 6-step gated process ensuring full compliance before physical shipment leaves our facility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {releaseSteps.map((st, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all space-y-2"
              >
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  Step {st.step}
                </span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                  {st.title}
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* FoSCoS Regulatory Integration */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-stone-50 to-amber-50 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-bold text-[#0F3D2E] uppercase font-mono flex items-center justify-center md:justify-start gap-1.5">
                <UploadCloud className="w-4 h-4 text-emerald-700" />
                <span>FoSCoS Portal Regulatory Compliance</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 max-w-2xl">
                Where required for the relevant FSSAI licence category, applicable laboratory testing reports are uploaded or linked through the <strong>Food Safety Compliance System (FoSCoS)</strong> in accordance with statutory guidelines.
              </p>
            </div>
            <button
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : (onScrollToSection && onScrollToSection('contact'))}
              className="px-6 py-2.5 rounded-lg bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs sm:text-sm font-semibold shadow shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Request Sample & COA Dossier</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
