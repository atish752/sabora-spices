import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import ComplianceSection from '../components/ComplianceSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { ShieldCheck, FileCheck, Landmark, CheckCircle2, Lock } from 'lucide-react';

export default function CompliancePage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const complianceBodies = [
    {
      name: "Food Safety and Standards Authority of India (FSSAI)",
      role: "Statutory Food Authority of India",
      desc: "Mandatory licensing ensuring whole spices and makhana meet national standards for purity, absence of harmful chemicals, and proper labeling.",
      badge: "FSSAI Standards"
    },
    {
      name: "Spices Board of India",
      role: "Ministry of Commerce and Industry",
      desc: "Regulatory authority overseeing the export promotion, registration (CRES), and quality evaluation of Indian whole spices.",
      badge: "Spices Board Registered"
    },
    {
      name: "APEDA",
      role: "Agricultural & Processed Food Products Export Development Authority",
      desc: "Apex body regulating the export of scheduled agricultural products including whole Makhana (Fox Nuts) and specialty produce.",
      badge: "Export Promotion"
    },
    {
      name: "Directorate General of Foreign Trade (DGFT)",
      role: "Ministry of Commerce and Industry",
      desc: "Issuing authority for Import Export Code (IEC) enabling legal commercial exports through Indian maritime ports and airports.",
      badge: "IEC Verified"
    }
  ];

  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="FSSAI & Regulatory Alignment"
        title="Food Safety Licenses & Legal Framework"
        subtitle="Operating with complete statutory compliance under Indian food safety laws and trade regulations. Transparent documentation, FoSCoS portal alignment, and clean commercial invoices."
        breadcrumbCurrent="Compliance"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Core Compliance Section Component */}
      <ComplianceSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Regulatory Bodies Overview */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              <span>Statutory Alignment</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Regulatory Frameworks Guiding Our Operations
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Compliance is not merely a formality at SABORA SPICES; it is the cornerstone of how we protect our buyers' business reputations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {complianceBodies.map((body, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-stone-900">{body.name}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold">
                    {body.badge}
                  </span>
                </div>
                <div className="text-xs font-semibold text-amber-700">{body.role}</div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                  {body.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RFQ Desk */}
      <ContactRfqSection
        onSubmitInquiry={onSubmitInquiry}
      />
    </div>
  );
}
