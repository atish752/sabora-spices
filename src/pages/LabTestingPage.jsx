import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import LabTestingSection from '../components/LabTestingSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { FlaskConical, FileText, CheckCircle2, ShieldAlert, FileCheck } from 'lucide-react';

export default function LabTestingPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const testParameters = [
    {
      group: "Essential Physical & Chemical Parameters",
      tests: [
        { name: "Moisture Content", standard: "FSSAI / Spices Board", limit: "< 10-12% max", significance: "Prevents mold and bacterial deterioration" },
        { name: "Volatile Essential Oil", standard: "ISO 6571 / ASTA", limit: "> 6.5 - 8.5% v/w (Cardamom)", significance: "Validates aroma intensity and botanical freshness" },
        { name: "Curcumin Content", standard: "Spectrophotometric / HPLC", limit: "3.5% - 5.2%+ (Turmeric)", significance: "Measures natural active coloring and therapeutic potency" },
        { name: "Extraneous Matter", standard: "Visual & Gravimetric", limit: "< 1.0% max", significance: "Verifies cleaning, de-dusting, and sorting purity" }
      ]
    },
    {
      group: "Safety & Contaminant Residue Screening",
      tests: [
        { name: "Pesticide Residues (MRL)", standard: "LC-MS/MS & GC-MS/MS", limit: "Compliant with FSSAI & EU MRLs", significance: "Ensures safety from prohibited agricultural chemicals" },
        { name: "Aflatoxins (Total & B1)", standard: "HPLC / Fluorometric", limit: "< 10-15 ppb (as per destination)", significance: "Guarantees freedom from toxic fungal mycotoxins" },
        { name: "Heavy Metals (Pb, Cd, As)", standard: "ICP-MS Analytical", limit: "Strictly below regulatory ceilings", significance: "Prevents environmental contamination in food chain" },
        { name: "Microbiology (Salmonella/E.coli)", standard: "ISO / FDA BAM Protocols", limit: "Absent in 25g", significance: "Assures pathologically sterile whole food safety" }
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="NABL Laboratory Testing & CoA Verification"
        title="Accredited Laboratory Testing & Certificate of Analysis (CoA)"
        subtitle="Independent third-party analytical testing through NABL-accredited food laboratories. Verifying physical specifications, volatile oil potency, and freedom from harmful residues."
        breadcrumbCurrent="Lab Testing"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Main Lab Testing Section */}
      <LabTestingSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Detailed Analytical Parameters Reference Table */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
              <span>Testing Capabilities</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Standard Laboratory Testing Parameters
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Analytical testing arrangements can be customized according to buyer specifications or regulatory requirements of destination markets.
            </p>
          </div>

          <div className="space-y-8">
            {testParameters.map((group, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="bg-[#041A12] px-6 py-3.5 text-white font-serif font-bold text-base flex items-center justify-between">
                  <span>{group.group}</span>
                  <span className="text-xs text-amber-300 font-mono font-normal">NABL Methodologies</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                        <th className="py-3 px-6 font-semibold">Test Parameter</th>
                        <th className="py-3 px-6 font-semibold">Testing Method / Standard</th>
                        <th className="py-3 px-6 font-semibold">Target Specification</th>
                        <th className="py-3 px-6 font-semibold">Quality Significance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {group.tests.map((test, i) => (
                        <tr key={i} className="hover:bg-emerald-50/20 transition-colors">
                          <td className="py-3.5 px-6 font-bold text-stone-900">{test.name}</td>
                          <td className="py-3.5 px-6 font-mono text-xs text-stone-500">{test.standard}</td>
                          <td className="py-3.5 px-6 text-[#0F3D2E] font-semibold">{test.limit}</td>
                          <td className="py-3.5 px-6 text-stone-600 text-xs">{test.significance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
