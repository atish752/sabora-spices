import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import ComplianceSection from '../components/ComplianceSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { ShieldCheck, FileCheck, Landmark, CheckCircle2, Lock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function CompliancePage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const complianceBodies = [
    {
      name: "Food Safety and Standards Authority of India (FSSAI)",
      role: "Statutory Food Authority of India",
      desc: `Central / State License No. ${SITE_CONFIG.fssaiNumber}. Mandatory food business registration ensuring all whole green cardamom, whole turmeric fingers, and Makhana meet statutory purity standards, FoSCoS test logging, and packaging declarations.`,
      badge: `Lic. #${SITE_CONFIG.fssaiNumber}`,
      logo: "/images/fssai-logo.png"
    },
    {
      name: "ISO 9001:2015 Quality Management",
      role: "Certificate of Compliance (QMS)",
      desc: `Certificate No. ${SITE_CONFIG.isoNumber}. International quality management framework guiding clear product specifications, systematic grower evaluation, sieve-calibrated grading, and zero-defect dispatch controls.`,
      badge: `Cert. #${SITE_CONFIG.isoNumber}`
    },
    {
      name: "Goods and Services Tax Network (GSTIN)",
      role: "Department of Revenue, Ministry of Finance, India",
      desc: `Registered GSTIN: ${SITE_CONFIG.gstin}. Legitimate commercial invoicing, valid transit e-way bills, transparent tax accounting, and verified lot tracking across all Indian wholesale transactions.`,
      badge: `GSTIN: ${SITE_CONFIG.gstin}`
    },
    {
      name: "Spices Board & Export Framework",
      role: "Ministry of Commerce and Industry",
      desc: "Regulatory alignment for commercial export promotion, registration (CRES), phytosanitary inspections, and laboratory analysis for destination-market MRL compliance.",
      badge: "Export Standard"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs sm:text-sm font-bold uppercase tracking-wide">
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              <span>Statutory Alignment</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Regulatory Frameworks Guiding Our Operations
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Compliance is not merely a formality at SABORA SPICES; it is the cornerstone of how we protect our buyers' business reputations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {complianceBodies.map((body, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {body.logo && (
                      <img src={body.logo} alt="FSSAI Logo" className="h-6 w-auto object-contain shrink-0" />
                    )}
                    <span className="font-serif text-lg sm:text-xl font-bold text-stone-900">{body.name}</span>
                  </div>
                  <span className="text-xs sm:text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold whitespace-nowrap shrink-0">
                    {body.badge}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-amber-700">{body.role}</div>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
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
