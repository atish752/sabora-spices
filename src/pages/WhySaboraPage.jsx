import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import WhySaboraSection from '../components/WhySaboraSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { Check, X, ShieldCheck, Award, Users } from 'lucide-react';

export default function WhySaboraPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const comparisonItems = [
    {
      criterion: "Product Form",
      sabora: "100% Whole agricultural products only (zero powders, zero fillers)",
      traders: "Often mixed, ground, or padded with inferior secondary grades"
    },
    {
      criterion: "Grading Transparency",
      sabora: "Precise millimeter sizing agreed in advance (e.g. 7.5mm, 8mm+ bold)",
      traders: "Vague commercial tags ('medium', 'bold') without sieve calibration"
    },
    {
      criterion: "Laboratory Verification",
      sabora: "NABL-accredited testing for moisture, volatile oil, and pesticides on demand",
      traders: "Visual estimate only; formal test reports rarely offered or verifiable"
    },
    {
      criterion: "FSSAI & Regulatory Alignment",
      sabora: "Full FSSAI license compliance, FoSCoS reporting, and annual filings",
      traders: "Often operating informally without batch traceability or documentation"
    },
    {
      criterion: "Packaging Quality",
      sabora: "Multi-layer food-grade barrier pouches and seaworthy 5-ply export cartons",
      traders: "Single-ply loose poly bags susceptible to humidity and puncture"
    },
    {
      criterion: "Private Label Capability",
      sabora: "Custom brand packaging, barcode integration, and contract packing",
      traders: "Unbranded bulk sacks only with no custom packaging support"
    },
    {
      criterion: "Commercial Transparency",
      sabora: "Detailed commercial proforma invoices with agreed terms and realistic schedules",
      traders: "Verbal promises with hidden brokerage margins and shifting delivery dates"
    },
    {
      criterion: "Communication SLA",
      sabora: "Direct WhatsApp sourcing desk and prompt responsiveness within 4-8 hours",
      traders: "Unreliable contact; difficult to reach once payment is advanced"
    }
  ];

  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="005. WHY SABORA SPICES"
        title="14 Core Pillars of Buyer Trust & Reliability"
        subtitle="A buyer-focused supply model eliminating the risks of unorganized open-market trade. Pure agricultural sourcing, verified specifications, food-grade packaging, and Delhi hub execution."
        breadcrumbCurrent="Why Sabora"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* All 14 Pillars Section */}
      <WhySaboraSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Comprehensive Comparison Matrix */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Commercial Advantage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              SABORA SPICES vs Unorganized Open-Market Traders
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Compare our structured, transparent enterprise approach with conventional open-market brokers.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#041A12] text-white">
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-xs">Evaluation Criterion</th>
                    <th className="py-4 px-6 font-semibold text-amber-300 uppercase tracking-wider text-xs bg-[#0F3D2E]">
                      SABORA SPICES Advantage
                    </th>
                    <th className="py-4 px-6 font-semibold text-stone-400 uppercase tracking-wider text-xs">
                      Unorganized Commodity Traders
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {comparisonItems.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}>
                      <td className="py-4 px-6 font-bold text-stone-900 whitespace-nowrap sm:whitespace-normal">
                        {item.criterion}
                      </td>
                      <td className="py-4 px-6 bg-emerald-50/40 text-[#0F3D2E] font-medium">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item.sabora}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-stone-600">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{item.traders}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
