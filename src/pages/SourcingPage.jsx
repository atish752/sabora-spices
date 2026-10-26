import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import SourcingOriginSection from '../components/SourcingOriginSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { Calendar, CheckCircle2, ShieldCheck, MapPin, Sprout } from 'lucide-react';

export default function SourcingPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const seasons = [
    {
      product: "Whole Green Cardamom",
      region: "Kerala (Idukki & Western Ghats)",
      peakMonths: "August to February",
      notes: "First, second, and third round harvests. Higher oil content and freshest green pigmentation harvested during peak post-monsoon cycles."
    },
    {
      product: "Makhana (Fox Nuts)",
      region: "Bihar (Mithila / Darbhanga Belts)",
      peakMonths: "July to October",
      notes: "Wetland pond gathering, drying, manual grading, and wood-fired pan roasting & popping. New crop arrives with optimal moisture and whiteness."
    },
    {
      product: "Whole Turmeric Fingers",
      region: "Salem & Nizamabad Belts",
      peakMonths: "January to April",
      notes: "Rhizome digging, boiling, solar curing, and polishing. Fresh arrivals feature peak natural curcumin potency."
    },
    {
      product: "Whole Cumin Seeds (Jeera)",
      region: "Gujarat (Unjha) & Rajasthan Belts",
      peakMonths: "February to May",
      notes: "Arid post-winter harvest dried, machine-sortexed, and graded with minimum 2.5-3.5% volatile oil content."
    },
    {
      product: "Whole Black Pepper & Cinnamon",
      region: "Kerala & Western Ghats Foothills",
      peakMonths: "December to March",
      notes: "Sun-dried bold garbled peppercorns and hand-harvested aromatic cinnamon quills from coastal hillside estates."
    }
  ];

  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="Origin Belts & Farm Procurement"
        title="Direct Procurement from Recognized Production Regions"
        subtitle="Kerala Western Ghats for green cardamom, Bihar wetland clusters for Makhana, and Salem belts for whole turmeric. Identifying suitable product sources based on specifications, grade, and commercial viability."
        breadcrumbCurrent="Sourcing & Origin"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Sourcing & Origin Section */}
      <SourcingOriginSection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Seasonal Harvest Calendar */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs sm:text-sm font-bold uppercase tracking-wide">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Crop Harvest Cycles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Seasonal Procurement Timelines
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Understanding seasonal cycles enables business buyers to plan bulk procurement during peak harvest windows for favorable pricing and fresh crop quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasons.map((item, idx) => (
              <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg sm:text-xl font-bold text-stone-900">{item.product}</span>
                  <span className="text-xs sm:text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold">
                    {item.peakMonths}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-amber-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.region}</span>
                </div>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed pt-1 border-t border-stone-200">
                  {item.notes}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sourcing Inspection Checklist */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Due Diligence Protocol</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Pre-Dispatch Sourcing Inspection Checklist
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Every batch consolidated from regional growing belts undergoes rigorous pre-intake verification before transit to Delhi:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Physical Size Verification", desc: "Sieve analysis for millimeter grading and uniformity across bags." },
              { title: "Moisture Determination", desc: "Digital moisture meter checks ensuring levels remain strictly within FSSAI limits." },
              { title: "Visual & Aroma Assessment", desc: "Screening for natural vibrant color, absence of mold, and authentic pungent essential oil aroma." },
              { title: "Packaging Integrity Check", desc: "Inspection of inner food-grade liner seals and heavy-duty outer woven sacks." }
            ].map((check, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-serif font-bold text-stone-900 text-base sm:text-lg">{check.title}</h4>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">{check.desc}</p>
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
