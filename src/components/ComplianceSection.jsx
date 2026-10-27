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
import { SITE_CONFIG } from '../config/siteConfig';

export default function ComplianceSection({ onOpenQuoteModal, onScrollToSection }) {
  const complianceAreas = [
    {
      title: "Indian Food Regulations (FSSAI)",
      desc: `Operating under FSSAI License No. ${SITE_CONFIG.fssaiNumber}. Complete statutory adherence to Indian food safety standards, FoSCoS portal logging, hygienic storage parameters, and mandatory lot traceability.`
    },
    {
      title: "ISO 9001:2015 Quality Systems",
      desc: `Certificate of Compliance No: ${SITE_CONFIG.isoNumber}. Standardized Quality Management Systems (QMS) ensuring documented testing protocols, systematic supplier audits, and zero-defect dispatch controls.`
    },
    {
      title: "Domestic Supply & GSTIN Statutory Terms",
      desc: `Registered under GSTIN: ${SITE_CONFIG.gstin}. Transparent commercial invoicing, e-way bills, clean batch accounting, and verified transit documentation across Indian supply chains.`
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
            <span>Statutory Compliance & Standards</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Responsible Sourcing. Regulatory Awareness. Market-Specific Requirements.
          </h2>

          <p className="font-hand text-base sm:text-lg text-emerald-800 font-bold">
            ~ Full FSSAI alignment, FoSCoS portal logging, and authentic commercial tax invoices ~
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, we recognize that regulatory compliance is an essential part of responsible food sourcing, packaging, and supply. Our approach is to identify and address the relevant regulatory requirements for each product and transaction before dispatch.
          </p>
        </div>

        {/* Verified Statutory Registrations Showcase */}
        <div className="bg-gradient-to-br from-[#041A12] via-[#0F3D2E] to-[#041A12] text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/40 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Official Government Registrations & Certifications
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Statutory Enterprise Credentials
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-semibold w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified & Active Regulatory Records
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FSSAI Credential */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 text-stone-900 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <img src="/images/fssai-logo.png" alt="FSSAI" className="h-7 w-auto object-contain" />
                <span className="text-2xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Mandatory Standard
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                  FSSAI License Number
                </div>
                <div className="text-lg font-mono font-bold text-[#0B2568] tracking-wider select-all">
                  {SITE_CONFIG.fssaiNumber}
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1 border-t border-stone-100">
                Food Safety and Standards Authority of India Central / State license covering whole spices and makhana sourcing, handling & supply.
              </p>
            </div>

            {/* ISO 9001:2015 Credential */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 text-white space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-emerald-300">ISO 9001:2015</span>
                <span className="text-2xs font-mono font-bold bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded border border-emerald-400/30">
                  Quality Management
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-stone-300 font-semibold uppercase tracking-wider">
                  Certificate of Compliance No.
                </div>
                <div className="text-lg font-mono font-bold text-amber-300 tracking-wider select-all">
                  {SITE_CONFIG.isoNumber}
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed pt-1 border-t border-white/10">
                Adherence to Quality Management Systems (QMS) principles: standardized grading, supplier audits, batch documentation, and dispatch controls.
              </p>
            </div>

            {/* GSTIN Credential */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 text-white space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-amber-300">GSTIN Registered</span>
                <span className="text-2xs font-mono font-bold bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30">
                  Tax Invoiced
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-stone-300 font-semibold uppercase tracking-wider">
                  Goods & Services Tax ID
                </div>
                <div className="text-lg font-mono font-bold text-emerald-300 tracking-wider select-all">
                  {SITE_CONFIG.gstin}
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed pt-1 border-t border-white/10">
                Registered commercial business entity in Delhi, India providing legitimate GST tax invoices and compliant e-way bills for domestic and international orders.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceAreas.map((area, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all duration-300 space-y-3 shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F3D2E] flex items-center justify-center font-bold text-xs sm:text-sm font-mono">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                {area.title}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Export & Buyer-Specific Compliance Box */}
        <div className="bg-[#041A12] text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl border border-emerald-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider font-mono">
                Documented Assurance
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                Regulatory Review Prior to Dispatch
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                Where specific regulatory documents, laboratory results, approvals, or certificates are mandatory for a particular order, their status is reviewed before proceeding with shipment. This reduces the risk of documentation gaps, avoidable customs delays, and non-compliance.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : (onScrollToSection && onScrollToSection('contact'))}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base shadow transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Discuss Your Compliance Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                <span>Export & Compliance Checklist:</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-stone-200">
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
