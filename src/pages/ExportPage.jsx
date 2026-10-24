import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import InternationalExportSection from '../components/InternationalExportSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { Globe2, Ship, Plane, FileCheck, CheckCircle2, ShieldCheck, Anchor } from 'lucide-react';

export default function ExportPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const exportDocs = [
    { title: "Phytosanitary Certificate", desc: "Issued by Plant Quarantine authorities in India certifying freedom from quarantine pests and plant diseases." },
    { title: "Certificate of Origin (COO)", desc: "Formal chamber of commerce certification authenticating Indian origin for preferential tariff compliance." },
    { title: "Certificate of Analysis (CoA)", desc: "Comprehensive NABL-accredited laboratory test report verifying moisture, pesticide residue, and volatile oils." },
    { title: "Commercial Invoice & Packing List", desc: "Detailed breakdown of gross/net weights, batch numbers, HS codes (090831 for Cardamom, 190410/080290 for Makhana)." },
    { title: "Bill of Lading / Airway Bill", desc: "Official ocean carrier or airline transit document confirming dispatch and title transfer." },
    { title: "Fumigation Certificate", desc: "Methyl Bromide (MB) or Aluminium Phosphide (ALP) treatment certificate for export container hygiene." }
  ];

  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="009. INTERNATIONAL & EXPORT SUPPLY"
        title="Global Export Supply & International Logistics"
        subtitle="End-to-end export coordination for overseas wholesalers, distributors, and food importers. Custom seaworthy packaging, international documentation, and container freight management."
        breadcrumbCurrent="Export Supply"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Main Section 009 Component */}
      <InternationalExportSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Export Documentation Dossier */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <FileCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Export Dossier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Standard International Export Documentation
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Every international consignment is accompanied by complete, authenticated trade documentation required for swift customs clearance:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportDocs.map((doc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-[#0F3D2E]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="font-serif font-bold text-base text-stone-900">{doc.title}</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dispatch Gateways & Container Freight */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wide">
              <Anchor className="w-3.5 h-3.5 text-amber-600" />
              <span>Dispatch Ports & Hubs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Indian Export Gateways & Incoterms
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              From our Delhi hub, consignments are routed through premier maritime and air cargo facilities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0F3D2E] font-bold text-lg font-serif">
                <Ship className="w-5 h-5 text-emerald-700" />
                <span>Nhava Sheva (JNPT) & Mundra</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct ocean freight gateways for 20ft (FCL) and 40ft High Cube containers to the Middle East, GCC, Europe, and Southeast Asia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0F3D2E] font-bold text-lg font-serif">
                <Anchor className="w-5 h-5 text-amber-700" />
                <span>ICD Delhi (Patparganj & Tughlakabad)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Inland Container Depots located in Delhi for seamless container stuffing, customs inspection, and direct rail movement to ocean terminals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0F3D2E] font-bold text-lg font-serif">
                <Plane className="w-5 h-5 text-emerald-700" />
                <span>Delhi Cargo Terminal (IGI Airport)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Air cargo dispatch for urgent high-value cardamom shipments and commercial product sampling with rapid international delivery.
              </p>
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
