import React from 'react';
import { 
  Globe2, 
  Ship, 
  Plane, 
  FileText, 
  ShieldCheck, 
  Package, 
  ArrowRight,
  CheckCircle2,
  Anchor
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function InternationalExportSection({ onOpenQuoteModal, onScrollToSection }) {
  const exportSteps = [
    {
      num: "01",
      title: "Buyer Requirement Assessment",
      desc: "Reviewing required product, quantity, millimeter size or grade, packaging format, destination country, and intended market application."
    },
    {
      num: "02",
      title: "Origin-Based Sourcing",
      desc: "Exploring suitable Indian producing regions (Kerala for cardamom, Bihar for makhana, Salem for turmeric) through verified grower clusters."
    },
    {
      num: "03",
      title: "Quality & Lab Testing",
      desc: "Rigorous testing for moisture, microbiological purity, and pesticide MRL limits according to destination country regulations."
    },
    {
      num: "04",
      title: "Packaging & Labelling",
      desc: "Food-grade bulk sacks, Sabora pouches, or buyer-specific private-label packaging with compliant multilingual labelling."
    },
    {
      num: "05",
      title: "Export Documentation",
      desc: "Preparing commercial invoices, packing lists, Certificate of Origin, phytosanitary certificates, and laboratory COAs."
    },
    {
      num: "06",
      title: "Shipment Coordination",
      desc: "Coordinating freight terms (CIF, FOB, Air Cargo), container stuffing, customs clearance, and port dispatch tracking."
    }
  ];

  return (
    <section id="export" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Global Export & Port Shipments</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Connecting Indian Products with Global Business Opportunities
          </h2>

          <p className="font-hand text-base sm:text-lg text-emerald-800 font-bold">
            ~ Phytosanitary certified, seaworthy export cartons, CIF & FOB port coordination ~
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, we welcome enquiries from international importers, wholesalers, distributors, food manufacturers, and private-label brands seeking dependable whole spices and Makhana sourced directly from India.
          </p>
        </div>

        {/* 6-Step International Supply Workflow */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Our International Supply Approach
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              End-to-end export coordination from origin farm gates to global discharge ports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportSteps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Step {st.num}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Export Desk</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {st.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Freight & Documentation Callout */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 uppercase font-mono">
              <Anchor className="w-4 h-4 text-emerald-700" />
              <span>Multi-Modal Global Freight Desk</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Ocean Container Freight & Air Cargo Ready
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-2xl">
              We coordinate sea freight container shipments (20ft / 40ft FCL & LCL) via major Indian ports (Cochin, Tuticorin, Chennai, Nhava Sheva, Kolkata) and rapid air cargo freight for urgent samples and high-value cardamom shipments.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded bg-stone-100 text-stone-700 text-xs sm:text-sm font-semibold">
                FOB & CIF Port Pricing
              </span>
              <span className="px-3 py-1 rounded bg-stone-100 text-stone-700 text-xs sm:text-sm font-semibold">
                Palletized Cargo Loading
              </span>
              <span className="px-3 py-1 rounded bg-stone-100 text-stone-700 text-xs sm:text-sm font-semibold">
                Private-Label Artwork Integration
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-emerald-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-mono text-amber-300 font-bold uppercase">
                International Inquiries
              </div>
              <div className="font-serif text-lg sm:text-xl font-bold">
                Connect With Export Desk
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Direct WhatsApp and email consultation for destination country compliance, sample evaluation, and formal CIF quotes.
              </p>
            </div>

            <button
              onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES Export Desk, I would like to inquire about international export supply and CIF terms.")}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
