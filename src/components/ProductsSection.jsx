import React, { useState } from 'react';
import { 
  Leaf, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  FileText, 
  Layers, 
  Package, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductsSection({ 
  products, 
  activeFilter = 'all', 
  onSelectProduct, 
  onOpenQuoteModal 
}) {
  const [selectedCategory, setSelectedCategory] = useState(activeFilter);

  // Synchronize category filter whenever activeFilter prop changes (e.g. from header submenu)
  React.useEffect(() => {
    setSelectedCategory(activeFilter || 'all');
  }, [activeFilter]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'cardamom', label: 'Whole Green Cardamom' },
    { id: 'makhana', label: 'Makhana (Fox Nuts)' },
    { id: 'turmeric', label: 'Whole Turmeric Fingers' },
    { id: 'other', label: 'Cloves & Other Whole Spices' }
  ];

  const filteredProducts = (products || []).filter(p => {
    if (selectedCategory === 'all') return true;
    return p.categoryKey === selectedCategory;
  });

  const handleProductWhatsApp = (product) => {
    const text = SITE_CONFIG.getProductWhatsAppMessage(product);
    SITE_CONFIG.openWhatsApp(text);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#F4F6F4] border-b border-stone-200/90 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sabora Product Portfolio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Whole Spices & Makhana (Fox Nuts)
          </h2>

          <p className="font-hand text-base sm:text-lg text-emerald-800 font-bold">
            ~ 100% whole harvest guarantee • Zero powders, zero fillers, zero polishing chemicals ~
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, our product offering focuses strictly on whole, unground agricultural products. We specialise in whole green cardamom, whole turmeric fingers, and whole Makhana, with additional whole spices available according to buyer requirements.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4.5 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F3D2E] text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-600 hover:text-[#0F3D2E]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border-2 border-stone-200/90 hover:border-emerald-600/70 shadow-[0_4px_24px_rgba(4,26,18,0.06)] hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group relative"
            >
              {/* Product Visual Area */}
              <div 
                onClick={() => onSelectProduct && onSelectProduct(product)}
                className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-stone-100 via-stone-50 to-white overflow-hidden cursor-pointer flex items-center justify-center p-5 border-b border-stone-200/70"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  loading="lazy"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                  <span className="px-3 py-1 rounded-lg bg-[#041A12]/90 backdrop-blur-md text-amber-300 text-xs font-bold shadow-sm">
                    {product.badge || product.category}
                  </span>
                  {product.netWeight && (
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                      {product.netWeight}
                    </span>
                  )}
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-stone-800 text-xs font-semibold border border-stone-200 shadow-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{product.origin?.split(',')[0]}</span>
                  </span>
                </div>

                <div className="absolute inset-0 bg-[#0F3D2E]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-white/95 text-[#0F3D2E] text-xs sm:text-sm font-bold shadow-lg">
                    Click to View Full Specs
                  </span>
                </div>
              </div>

              {/* Product Info Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.botanicalName && (
                      <span className="text-xs italic font-serif text-stone-500 truncate">
                        {product.botanicalName}
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="font-serif text-xl sm:text-2xl font-black text-stone-900 group-hover:text-[#0F3D2E] transition-colors cursor-pointer leading-snug"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal line-clamp-2">
                    {product.tagline || product.subtitle}
                  </p>
                </div>

                {/* Key Specification Structured Dossier Box */}
                <div className="bg-[#FAFBF9] rounded-2xl p-4 border border-stone-200/80 space-y-2.5 text-xs sm:text-sm">
                  {product.gradesAvailable && (
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-stone-500 font-medium shrink-0">Grades:</span>
                      <span className="font-bold text-stone-800 text-right">
                        {product.gradesAvailable.slice(0, 2).join(', ')}
                        {product.gradesAvailable.length > 2 && '...'}
                      </span>
                    </div>
                  )}
                  {product.moq && (
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200/50">
                      <span className="text-stone-500 font-medium">Wholesale MOQ:</span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                        {product.moq}
                      </span>
                    </div>
                  )}
                  {product.origin && (
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-stone-200/50">
                      <span className="text-stone-500 font-medium shrink-0">Direct Origin:</span>
                      <span className="font-semibold text-stone-800 text-right">{product.origin}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5 mt-auto">
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-[#0F3D2E] bg-stone-50/70 hover:bg-white text-stone-800 hover:text-[#0F3D2E] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800 shrink-0" />
                      <span>Specifications</span>
                    </button>

                    <button
                      onClick={() => handleProductWhatsApp(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Direct WhatsApp Quote"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 fill-emerald-600 shrink-0" />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal ? onOpenQuoteModal(product) : null}
                    className="w-full py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Request Product Quote</span>
                    <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bulk Sourcing & Private-Label Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Need Sabora-Branded or Private-Label Packaging?
            </h3>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
              We discuss bulk quantities, Sabora-branded food-grade pouches, and buyer-specific private-label packaging with custom artwork, barcodes, and regulatory declarations.
            </p>
          </div>
          <button
            onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : null}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm sm:text-base shadow hover:shadow-md transition-all shrink-0 cursor-pointer"
          >
            Discuss Packaging Options
          </button>
        </div>

      </div>
    </section>
  );
}
