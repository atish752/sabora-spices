import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import TrustHighlightsBar from '../components/TrustHighlightsBar';
import ContactRfqSection from '../components/ContactRfqSection';
import { 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  FlaskConical, 
  Globe2, 
  HelpCircle, 
  Package,
  Award
} from 'lucide-react';

export default function HomePage({
  heroSlides,
  products,
  onNavigate,
  onSelectProduct,
  onOpenQuoteModal,
  onSubmitInquiry
}) {
  const [activeTab, setActiveTab] = useState('all');

  // Filter products for homepage showcase
  const featuredProducts = (products || []).filter(p => {
    if (activeTab === 'all') return true;
    return p.categoryKey === activeTab;
  }).slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. Permanent Responsive Video Hero (Landscape on Desktop, Portrait on Mobile) */}
      <HeroSection
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 2. Trust Highlights Bar (Single Row Infinite Continuous Auto-Scroll) */}
      <TrustHighlightsBar
        onScrollToSection={(target) => onNavigate && onNavigate(target)}
      />

      {/* 3. Featured Products Showcase */}
      <section className="py-14 sm:py-20 bg-[#F8FAF9] border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>Featured Wholesale Crops</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Whole Spices & Makhana
              </h2>
              <p className="text-sm text-stone-600 font-normal">
                Direct origin procurement • Hand-sorted whole crops • Tested before dispatch
              </p>
            </div>

            {/* View Full Portfolio Link */}
            <div className="shrink-0">
              <button
                onClick={() => onNavigate && onNavigate('products')}
                className="px-5 py-2.5 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-amber-300 hover:text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'cardamom', label: 'Whole Green Cardamom' },
              { id: 'makhana', label: 'Makhana (Fox Nuts)' },
              { id: 'turmeric', label: 'Whole Turmeric Fingers' },
              { id: 'other', label: 'Cloves & Other Spices' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0F3D2E] text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-600 hover:text-[#0F3D2E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Visual Area */}
                <div 
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                  className="relative h-56 sm:h-60 w-full bg-gradient-to-b from-stone-100 to-stone-50 overflow-hidden cursor-pointer flex items-center justify-center p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#041A12]/85 text-amber-300 text-[11px] font-semibold backdrop-blur-sm">
                      {product.origin || "India"}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                      {product.category || "Whole Agricultural Product"}
                    </div>
                    <h3 
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Quick Specs Snippet */}
                  <div className="bg-stone-50 rounded-lg p-2.5 space-y-1.5 text-[11px] text-stone-600 border border-stone-100">
                    {product.gradesAvailable && product.gradesAvailable.length > 0 && (
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-stone-400 text-[10px] shrink-0">Grade / Sizing:</span>
                        <span className="font-semibold text-stone-800 text-right truncate">
                          {product.gradesAvailable.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    )}
                    {product.moq && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-stone-400 text-[10px] shrink-0">MOQ:</span>
                        <span className="font-semibold text-stone-800 text-right">{product.moq}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="text-xs font-semibold text-[#0F3D2E] hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal && onOpenQuoteModal(product)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F3D2E] text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Catalog Callout Banner */}
          <div className="bg-gradient-to-r from-[#041A12] to-[#082E20] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-800/40 shadow-md">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Need Millimeter Sizing & Technical CoA Sheets?
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-normal">
                Filter by grading millimeter specs, explore packaging options, and review lab parameters.
              </p>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('products')}
              className="shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>View Full Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. About Us Executive Spotlight */}
      <section className="py-14 sm:py-18 bg-white border-b border-stone-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0F3D2E] tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>About Sabora Spices</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-900 leading-tight">
                Direct Origin Sourcing & Wholesale Supply
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Based in Delhi, we supply whole spices and Fox Nuts (Makhana) directly to wholesalers, retail brands, and food manufacturers with complete origin transparency and batch testing.
              </p>

              {/* 3 Quick Value Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold text-stone-800">100% Whole Crops</span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold text-stone-800">Direct From Origins</span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F3D2E] shrink-0" />
                  <span className="text-xs font-bold text-stone-800">Delhi Dispatch Hub</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate && onNavigate('about')}
                  className="px-5 py-2.5 rounded-lg bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Read About Us</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Clean Imagery */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 group">
                <img
                  src="/images/hero-sabora-master.jpg"
                  alt="Sabora Spices Packaging"
                  className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    Whole Spices & Makhana Sourcing
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Sourcing & Origin Highlights */}
      <section className="py-14 sm:py-18 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct Sourcing Origins</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-900 tracking-tight">
              India's Benchmark Growing Belts
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-normal">
              Procuring directly from regional farmer clusters and planter estates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl p-5 border border-stone-200 space-y-2 hover:shadow-md transition-shadow">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Kerala • Western Ghats</div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Green Cardamom</h3>
              <p className="text-xs text-stone-600 leading-normal">
                Idukki estates, 7mm to 8.5mm+ bold capsules with rich essential oils.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-stone-200 space-y-2 hover:shadow-md transition-shadow">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">Mithila, Bihar</div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Makhana (Fox Nuts)</h3>
              <p className="text-xs text-stone-600 leading-normal">
                Fresh wetland harvest, 5-Suta & 6-Suta Jumbo with zero chemical bleach.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-stone-200 space-y-2 hover:shadow-md transition-shadow">
              <div className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Salem & Erode</div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Whole Turmeric Fingers</h3>
              <p className="text-xs text-stone-600 leading-normal">
                High active curcumin (3.5% - 5%+), double polished, unadulterated whole roots.
              </p>
            </div>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => onNavigate && onNavigate('sourcing')}
              className="px-5 py-2.5 rounded-lg bg-white border border-stone-300 hover:border-emerald-600 text-stone-800 hover:text-[#0F3D2E] text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Sourcing Process</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Why Sabora & Quality Pillars Banner */}
      <section className="py-14 sm:py-18 bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wide">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Supply Standards</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1.5">
                Why Buyers Partner With Us
              </h2>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('why-sabora')}
              className="shrink-0 px-4 py-2 rounded-lg bg-[#0F3D2E] text-white text-xs sm:text-sm font-semibold hover:bg-[#15543F] transition-all flex items-center gap-1.5 cursor-pointer w-fit"
            >
              <span>All 14 Standards</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h4 className="font-serif font-bold text-stone-900 text-sm">FSSAI & ISO</h4>
              <p className="text-xs text-stone-600">Full food safety & regulatory compliance</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <FlaskConical className="w-5 h-5 text-emerald-700" />
              <h4 className="font-serif font-bold text-stone-900 text-sm">NABL Tested</h4>
              <p className="text-xs text-stone-600">Accredited batch analysis & CoA records</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <Package className="w-5 h-5 text-amber-700" />
              <h4 className="font-serif font-bold text-stone-900 text-sm">Barrier Pouches</h4>
              <p className="text-xs text-stone-600">Food-grade aroma lock & bulk sacks</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <Globe2 className="w-5 h-5 text-[#0F3D2E]" />
              <h4 className="font-serif font-bold text-stone-900 text-sm">Global Export</h4>
              <p className="text-xs text-stone-600">Phytosanitary & FOB/CIF handling</p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Quick FAQ Preview */}
      <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Buyer Questions</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('faq')}
              className="text-xs sm:text-sm font-semibold text-[#0F3D2E] hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 25 FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4.5 rounded-xl border border-stone-200 space-y-1">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                What are your Minimum Order Quantities (MOQ)?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Flexible commercial MOQs tailored to your business, with trial batches and container loads available.
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-stone-200 space-y-1">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Do you provide lab CoA test reports?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Yes. Independent NABL-accredited test reports for moisture, volatile oil assays, and purity.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Contact & Request a Quote Desk */}
      <ContactRfqSection
        onSubmitInquiry={onSubmitInquiry}
      />
    </div>
  );
}
