import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import ProductsSection from '../components/ProductsSection';
import ContactRfqSection from '../components/ContactRfqSection';
import { Package, ShieldCheck, Leaf, Layers, ArrowRight, FileCheck, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductsPage({
  products,
  initialFilter = 'all',
  onSelectProduct,
  onOpenQuoteModal,
  onNavigate,
  onSubmitInquiry
}) {
  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <PageHeaderBanner
        badge="Sabora Whole Products Portfolio"
        title="Whole Spices & Makhana (Fox Nuts)"
        subtitle="100% whole agricultural products sourced with purpose. Detailed specifications, millimeter grading, moisture control, and flexible packaging options for business buyers."
        breadcrumbCurrent="Products"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Complete Products Portfolio Section */}
      <ProductsSection
        products={products}
        activeFilter={initialFilter}
        onSelectProduct={onSelectProduct}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Sizing & Grading Dossier Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <FileCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Standard Sizing & Grading Criteria</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Precision Grading & Acceptance Parameters
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              We eliminate ambiguity by establishing clear physical and chemical parameters for every grade before order confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cardamom Grades */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#0F3D2E]">Green Cardamom (Elaichi)</span>
                <span className="text-xs sm:text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold">Kerala</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 8mm+ Extra Bold (Jumbo)</span>
                  <span className="text-stone-500 text-right">Top tier, intense aroma, deep green</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 7.5mm - 8mm Bold</span>
                  <span className="text-stone-500 text-right">Premium commercial retail standard</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 7mm - 7.5mm Medium Bold</span>
                  <span className="text-stone-500 text-right">High-volume wholesale & packaging</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 6mm - 7mm Commercial</span>
                  <span className="text-stone-500 text-right">Food processing & culinary blends</span>
                </li>
              </ul>
              <div className="pt-2 text-xs sm:text-sm text-stone-500 border-t border-stone-200 font-medium">
                Moisture: &lt; 10-11% | Volatile Oil: &gt; 6.5-8.0% v/w
              </div>
            </div>

            {/* Makhana Grades */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="font-serif text-lg sm:text-xl font-bold text-amber-800">Makhana (Fox Nuts)</span>
                <span className="text-xs sm:text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono font-semibold">Bihar</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 6-Suta (Super Jumbo / Handpicked)</span>
                  <span className="text-stone-500 text-right">&gt; 19mm pop size, pristine white</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 5-Suta (Jumbo Premium)</span>
                  <span className="text-stone-500 text-right">16-19mm, uniform roundness</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• 4-Suta (Medium Standard)</span>
                  <span className="text-stone-500 text-right">13-16mm, ideal for snacking / roasting</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• Unbleached Natural Processing</span>
                  <span className="text-stone-500 text-right">Zero chemical whitening / bleaching</span>
                </li>
              </ul>
              <div className="pt-2 text-xs sm:text-sm text-stone-500 border-t border-stone-200 font-medium">
                Moisture: &lt; 8-9% | Crispness: Superior pop texture
              </div>
            </div>

            {/* Turmeric & Other Spices */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="font-serif text-lg sm:text-xl font-bold text-yellow-800">Whole Turmeric & Spices</span>
                <span className="text-xs sm:text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-mono font-semibold">Salem / Belts</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• Salem Whole Turmeric Fingers</span>
                  <span className="text-stone-500 text-right">High curcumin (3.5% - 5.2%+), hard</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• Double Polished Fingers</span>
                  <span className="text-stone-500 text-right">Smooth golden surface, intact tips</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• Whole Cloves (Laung)</span>
                  <span className="text-stone-500 text-right">Handpicked whole heads with crowns</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-stone-900">• Other Whole Spices on Demand</span>
                  <span className="text-stone-500 text-right">Subject to origin feasibility</span>
                </li>
              </ul>
              <div className="pt-2 text-xs sm:text-sm text-stone-500 border-t border-stone-200 font-medium">
                Strictly 100% whole form (zero powdered/ground adulteration)
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Packaging & Private Labeling Capability */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold uppercase tracking-wide">
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>Packaging & Private-Label Formats</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Flexible Packaging Formats & Private-Label Solutions
            </h2>
            <p className="font-hand text-base sm:text-lg text-amber-800 font-bold">
              ~ Custom printed retail pouches, bulk gunny sacks, or clean master cartons ~
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Whether you need retail shelf-ready barrier pouches or containerized bulk packaging, we configure solutions suited to your supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                1
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">Sabora-Branded Pouches</h4>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Premium multi-layer metallic barrier zip pouches (50g, 100g, 250g, 500g, 1kg) designed to preserve volatile aroma and shield against humidity.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                2
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">Buyer-Specific & Private-Label</h4>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Custom packaging with your brand artwork, barcodes, nutritional information, and packaging weights, subject to feasibility and agreement.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 font-bold">
                3
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">Bulk Commercial & Export Cartons</h4>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                10kg, 25kg, and 50kg bulk packaging in food-grade poly-lined gunny bags, HDPE woven sacks, and heavy-duty 5-ply export corrugated cartons.
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
