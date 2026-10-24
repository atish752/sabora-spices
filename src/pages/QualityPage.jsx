import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import QualitySafetySection from '../components/QualitySafetySection';
import ContactRfqSection from '../components/ContactRfqSection';
import { ShieldCheck, Thermometer, Eye, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function QualityPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="Food Safety & Quality Protocols"
        title="Food Safety Standards & Quality Assurance"
        subtitle="Adherence to FSSAI regulations, ISO 9001/22000 quality principles, controlled humidity storage, and multi-stage manual & mechanical sorting to ensure food-grade purity."
        breadcrumbCurrent="Quality & Safety"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Main Section 006 Component */}
      <QualitySafetySection
        onScrollToSection={(sectionId) => onNavigate && onNavigate(sectionId)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Storage & Warehouse Hygiene Protocols */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <Thermometer className="w-3.5 h-3.5 text-amber-600" />
              <span>Controlled Environment</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Warehouse Storage & Environmental Controls
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Whole green cardamom and makhana are highly sensitive to moisture and light. Our Delhi storage hub implements strict Good Warehousing Practices (GWP):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                <Thermometer className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">Moisture & Humidity Controls</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cardamom is maintained in cool, dark, dry storage below 60% relative humidity. Makhana is sealed in barrier packaging to prevent moisture uptake and loss of crispness.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">Pest & Rodent Protection</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Regular non-toxic pest monitoring and professional sanitation. Products are stored on elevated food-grade plastic or heat-treated pallets away from floor and walls.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">Batch Segregation & FIFO</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Strict First-In, First-Out (FIFO) stock rotation. Each intake lot is assigned a traceable internal identifier linking origin, moisture check, and packing date.
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
