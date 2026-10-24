import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import TrustHighlightsBar from '../components/TrustHighlightsBar';
import ContactRfqSection from '../components/ContactRfqSection';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  FlaskConical, 
  Globe2, 
  HelpCircle, 
  FileText, 
  MessageCircle,
  Package,
  Layers,
  Award
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

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
      {/* 1. Full-Width Responsive Hero Showcase (Zero Side Whitespace) */}
      <HeroSection
        slides={heroSlides}
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 2. Trust Highlights Bar (4 Feature Cards matching Shahi Food Services) */}
      <TrustHighlightsBar
        onScrollToSection={(target) => onNavigate && onNavigate(target)}
      />

      {/* 3. Featured Products Showcase (Preview on Homepage as requested) */}
      <section className="py-16 sm:py-24 bg-[#F8FAF9] border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Core Sabora Product Lines</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
                Whole Spices & Makhana (Fox Nuts)
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Specialising strictly in whole, unground agricultural products. Direct procurement from recognized origins with batch laboratory testing and custom packaging.
              </p>
            </div>

            {/* View Full Portfolio Link */}
            <div className="shrink-0">
              <button
                onClick={() => onNavigate && onNavigate('products')}
                className="px-5 py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-amber-300 hover:text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-emerald-700/50"
              >
                <span>Browse All Products & Sizing</span>
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
                  className="relative h-60 sm:h-64 w-full bg-gradient-to-b from-stone-100 to-stone-50 overflow-hidden cursor-pointer flex items-center justify-center p-4"
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
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                      {product.category || "Whole Agricultural Product"}
                    </div>
                    <h3 
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
                      {product.tagline || product.subtitle || product.shortDescription || product.description}
                    </p>
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
                      <span>Technical Specs</span>
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
          <div className="bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/50 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Products Page Available</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Looking for Detailed Sizing, Lab Reports & Packaging Options?
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm max-w-2xl font-normal">
                Visit our dedicated Products page to filter by grading millimeter specs, explore private-label packaging options, and download CoA technical sheets.
              </p>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('products')}
              className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300/40"
            >
              <span>Explore Full Products Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. About Us Executive Spotlight */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0F3D2E] tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>002. Who We Are</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
                SABORA SPICES — Connecting Quality Products with Business Opportunities
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                <strong className="text-stone-900">SABORA SPICES</strong> is an India-based sourcing and supply enterprise based in <strong>Jahangirpuri, Delhi, India</strong>, providing dependable whole spices and Makhana (Fox Nuts) to wholesalers, distributors, retail brands, food businesses, and international importers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-serif text-lg font-bold text-[#0F3D2E]">Product Understanding</div>
                  <p className="text-xs text-stone-600 mt-1">Agreeing on capsule size, aroma, moisture, and grade before confirmation.</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-serif text-lg font-bold text-amber-700">Clear Communication</div>
                  <p className="text-xs text-stone-600 mt-1">Clarity on availability, quantities, pricing, and realistic delivery terms.</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-serif text-lg font-bold text-emerald-700">Delhi Hub Execution</div>
                  <p className="text-xs text-stone-600 mt-1">Aligning careful preparation, packaging, and dispatch from Delhi.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate && onNavigate('about')}
                  className="px-5 py-3 rounded-lg bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs sm:text-sm font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Read Full About Us & Business Story</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
                <img
                  src="/images/hero-cardamom-sorting.jpg"
                  alt="Sabora Spices Hand Sorting"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-mono text-amber-300 uppercase tracking-wider">Origin to Delhi Dispatch</span>
                    <h4 className="font-serif text-lg font-bold">100% Whole Agricultural Sourcing</h4>
                    <p className="text-xs text-stone-300">Pure, whole green cardamom and makhana hand-inspected for quality.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Sourcing & Origin Highlights */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>004. Recognized Production Regions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Direct Sourcing from India's Premier Spice & Makhana Belts
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              We align crop procurement directly with India's agricultural centers where climate and soil yield the finest botanical characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Kerala & Western Ghats</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Specialized sourcing in Idukki district for whole green cardamom with intense volatile oil content and deep natural coloration.
              </p>
              <button
                onClick={() => onNavigate && onNavigate('sourcing')}
                className="text-xs font-bold text-[#0F3D2E] flex items-center gap-1 hover:text-emerald-700 cursor-pointer pt-2"
              >
                <span>Explore Kerala Sourcing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Mithila Region, Bihar</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Premier freshwater wetland clusters for whole Makhana (Fox Nuts). 5-Suta and 6-Suta Jumbo grades with zero chemical bleaching.
              </p>
              <button
                onClick={() => onNavigate && onNavigate('sourcing')}
                className="text-xs font-bold text-amber-800 flex items-center gap-1 hover:text-amber-900 cursor-pointer pt-2"
              >
                <span>Explore Bihar Makhana</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Salem & Nizamabad</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Whole turmeric finger belts selected for high active curcumin potency (3.5% - 5.2%+), clean double polish, and whole integrity.
              </p>
              <button
                onClick={() => onNavigate && onNavigate('sourcing')}
                className="text-xs font-bold text-yellow-800 flex items-center gap-1 hover:text-yellow-900 cursor-pointer pt-2"
              >
                <span>Explore Turmeric Belts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate && onNavigate('sourcing')}
              className="px-6 py-3 rounded-lg bg-white border border-stone-300 hover:border-emerald-600 text-stone-800 hover:text-[#0F3D2E] text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View Complete 6-Step Sourcing Workflow & Origin Details</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Why Sabora & Quality Pillars Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wide">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>005. Trust & Reliability</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Why Business Buyers Partner with SABORA SPICES
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                A buyer-focused supply model eliminating the uncertainties of unorganized commodity trade.
              </p>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('why-sabora')}
              className="shrink-0 px-5 py-2.5 rounded-lg bg-[#0F3D2E] text-white text-xs sm:text-sm font-bold hover:bg-[#15543F] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>See All 14 Why Sabora Pillars</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <h4 className="font-serif font-bold text-stone-900 text-base">FSSAI & Regulatory Alignment</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Operating strictly within Indian food safety laws and ISO 9001/22000 quality principles.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <FlaskConical className="w-6 h-6 text-emerald-700" />
              <h4 className="font-serif font-bold text-stone-900 text-base">NABL Lab Testing</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Accredited testing for moisture, volatile oil assays, and pesticide residues with FoSCoS link.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <Package className="w-6 h-6 text-amber-700" />
              <h4 className="font-serif font-bold text-stone-900 text-base">Barrier Pouch Packaging</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Food-grade barrier pouches and seaworthy corrugated export cartons for maximum shelf-life.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <Globe2 className="w-6 h-6 text-[#0F3D2E]" />
              <h4 className="font-serif font-bold text-stone-900 text-base">International Supply</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Export supply with Phytosanitary certificates, Certificates of Origin, and FOB/CIF coordination.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Quick FAQ Preview */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold uppercase tracking-wide">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>0010. Common Queries</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('faq')}
              className="text-xs sm:text-sm font-bold text-[#0F3D2E] hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Browse All 25 FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                What products does SABORA SPICES specialise in?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our two core categories are whole spices and Makhana (Fox Nuts). We specialise in whole green cardamom, whole turmeric fingers, and Makhana, focusing strictly on whole products rather than powdered spices.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                What are your Minimum Order Quantities (MOQ)?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                MOQs are flexible and discussed according to the product type, packaging format, and buyer location. We accommodate both trial sample quantities and commercial container-load orders.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Can you arrange laboratory testing and Certificates of Analysis (CoA)?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Yes. Independent testing through NABL-accredited food laboratories can be arranged for moisture, volatile oil content, pesticide residues, and aflatoxins with FoSCoS portal verification.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Do you supply international and export buyers?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Yes. We welcome international enquiries and coordinate export packaging, phytosanitary certificates, certificates of origin, and freight dispatch through Nhava Sheva, Mundra, or ICD Delhi.
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
