import React, { useState } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Search,
  Filter
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ModernCollection({ products = [], onSelectProduct, onOpenWhatsAppDrawer }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Whole Spices', 'Gourmet & Healthy Agro'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = 
      (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.botanicalName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.origin || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppQuote = (e, product) => {
    e.stopPropagation();
    if (typeof product.whatsappTemplate === 'function') {
      SITE_CONFIG.openWhatsApp(product.whatsappTemplate());
    } else {
      const msg = encodeURIComponent(
        `Hello Sabora Spices export desk,\n\nI am requesting commercial wholesale terms and CIF European port rates for *${product.name}*.\n\n• Minimum Order Quantity (MOQ): ${(product.moq || '50 Kg').split('(')[0].trim()}\n• Origin: ${product.origin || 'Direct Origin'}\n\nPlease share latest COA specifications and available freight schedules.\n\nThank you!`
      );
      SITE_CONFIG.openWhatsApp(msg);
    }
  };

  return (
    <section id="collection" className="py-20 sm:py-28 bg-[#FAF8F5] scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Catalog 2025/26</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            The Single-Estate Collection
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Sortex-graded whole spices and gourmet agro harvested under sustainable canopy terroirs. Calibrated for European blending ateliers, tea houses, and retail packaging.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200/80">
          
          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spices, botanical, origin..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-stone-200/90 text-xs font-sans text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
            />
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const hasWholesalePrice = Boolean(product.bulkPrice?.visible && product.bulkPrice?.value);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct && onSelectProduct(product)}
                className="group rounded-3xl bg-white border border-stone-200/80 p-6 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                <div>
                  
                  {/* Top Meta: Origin Terroir & Grade Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate max-w-[160px] font-medium">
                        {product.origin ? product.origin.split(',')[0] : 'Origin Direct'}
                      </span>
                    </div>

                    {product.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50/90 border border-amber-200 px-2.5 py-0.5 rounded-full shrink-0">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Clean Product Visual Plinth */}
                  <div className="w-full h-56 relative flex items-center justify-center p-4 mb-5 rounded-2xl bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100/60 border border-stone-100 group-hover:border-emerald-200 transition-colors overflow-hidden">
                    <div className="absolute w-36 h-36 rounded-full bg-emerald-400/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_12px_20px_rgba(0,0,0,0.16)] relative z-10"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback image so card never appears broken or empty
                        e.target.onerror = null;
                        e.target.src = '/images/cardamom.png';
                      }}
                    />

                    {/* Batch Code Micro Tag */}
                    {product.batchCode && (
                      <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono uppercase tracking-widest text-stone-500 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-stone-200">
                        {product.batchCode}
                      </span>
                    )}
                  </div>

                  {/* Product Titles */}
                  <div className="space-y-1 mb-4">
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-stone-950 group-hover:text-emerald-950 transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {product.botanicalName && (
                      <p className="font-serif italic text-xs text-stone-500">
                        Taxonomy: {product.botanicalName}
                      </p>
                    )}

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-1 font-sans">
                      {product.subtitle || 'Sortex-cleaned single-estate whole harvest.'}
                    </p>
                  </div>

                  {/* Commercial Spec Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2.5 px-3 bg-stone-50 rounded-2xl border border-stone-100 mb-5">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block font-semibold">Min. Order</span>
                      <span className="font-bold text-stone-800 text-xs truncate block">
                        {(product.moq || '50 Kg').split('(')[0].trim()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase block font-semibold">Wholesale Terms</span>
                      <span className="font-bold text-emerald-800 text-xs truncate block">
                        {hasWholesalePrice ? product.bulkPrice.value : 'CIF European Port'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-1 border-t border-stone-100">
                  <button
                    onClick={(e) => handleWhatsAppQuote(e, product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#041A12] to-[#082E20] hover:brightness-110 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-400/40 shadow-xs cursor-pointer group/btn"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 group-hover/btn:scale-110 transition-transform" />
                    <span>WhatsApp Quote (1-Click)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct && onSelectProduct(product);
                    }}
                    className="w-full py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    <span>Full Specifications & COA</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
