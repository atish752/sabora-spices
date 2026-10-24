import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Globe2, 
  Package, 
  Scale, 
  ShieldCheck, 
  ArrowRight,
  ClipboardCheck
} from 'lucide-react';

export default function ComplianceSection({ onOpenQuoteModal, onScrollToSection }) {
  const complianceAreas = [
    {
      title: "Indian Food Regulations (FSSAI)",
      desc: "We consider applicable food business licensing, product standards, food safety requirements, hygienic handling, storage parameters, and mandatory statutory records."
    },
    {
      title: "Packaging & Labelling Mandates",
      desc: "Mandatory declarations including product name, net quantity, batch or lot identification, manufacturing & expiry dates, business address, and food-grade packaging compliance."
    },
    {
      title: "Domestic Supply Statutory Terms",
      desc: "Statutory tax invoicing, GST compliance, traceable transport e-way bills, and verified lot tracking across Indian wholesale and distribution channels."
    },
    {
      title: "International Trade & Export Mandates",
      desc: "Phytosanitary clearances, Certificates of Origin, destination country MRL limits, customs export filings, and destination-specific labelling adaptations."
    }
  ];

  const exportChecklist = [
    "Commercial Invoices & Comprehensive Packing Lists",
    "Certificate of Origin (Issued by authorized chambers/agencies)",
    "Accredited Food Laboratory Analysis & COA Dossier",
    "Phytosanitary Inspection Certificates where mandated",
    "Destination-specific labelling & multilingual packaging declarations",
    "Customs clearance documentation & shipping bill verification"
  ];

  return (
    <section id="compliance" className="py-16 sm:py-24 bg-white border-b border-stone-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
            <Scale className="w-3.5 h-3.5 text-amber-700" />
            <span>008. Regulatory Compliance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Responsible Sourcing. Regulatory Awareness. Market-Specific Requirements.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, we recognize that regulatory compliance is an essential part of responsible food sourcing, packaging, and supply. Our approach is to identify and address the relevant regulatory requirements for each product and transaction before dispatch.
          </p>
        </div>

        {/* 4 Pillars of Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceAreas.map((area, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all duration-300 space-y-3 shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F3D2E] flex items-center justify-center font-bold text-xs font-mono">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                {area.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Export & Buyer-Specific Compliance Box */}
        <div className="bg-[#041A12] text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl border border-emerald-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Documented Assurance
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                Regulatory Review Prior to Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                Where specific regulatory documents, laboratory results, approvals, or certificates are mandatory for a particular order, their status is reviewed before proceeding with shipment. This reduces the risk of documentation gaps, avoidable customs delays, and non-compliance.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : (onScrollToSection && onScrollToSection('contact'))}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Discuss Your Compliance Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                <span>Export & Compliance Checklist:</span>
              </div>
              <div className="space-y-2 text-xs text-stone-200">
                {exportChecklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
