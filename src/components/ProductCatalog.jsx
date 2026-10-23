import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { Sparkles, MessageCircle, FileCheck2, Search } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductCatalog({ products = [], onSelectProduct, onOpenWhatsAppDrawer }) {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");

  // Build categories dynamically from the current products list
  const dynamicCategories = ["All Products", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  const CATEGORIES = dynamicCategories.length > 1 ? dynamicCategories : DEFAULT_CATEGORIES;

  const filtered = products.filter(p => {
    const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
    const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.botanicalName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.origin || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSampleKitWhatsApp = () => {
    const msg = `Hello Sabora Spices team,\n\nI am interested in requesting an official laboratory evaluation sample kit (250g - 1kg) for whole spices testing and European COA verification before placing a commercial order.\n\nCould you please share your sample dispatch procedure and lead time?\n\nThank you!`;
    SITE_CONFIG.openWhatsApp(encodeURIComponent(msg));
  };

  return (
    <section id="catalog" className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF] scroll-mt-20 border-b border-slate-200/90">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header (Editorial European Spice House layout) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6 pb-6 reveal-init">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-900 bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-emerald-500/15 px-3.5 py-1 rounded-full border border-amber-400/50 font-mono shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Certified European Wholesale Assortment</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.06]">
              Artisanal Whole Spices & Terroir Botanicals
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
              Direct estate harvests, calibrated by optical sortex color-grading and tested for essential volatile oil retention. Explore technical dossiers or initiate a 1-click WhatsApp inquiry for commercial container and pallet loads.
            </p>
          </div>

          {/* Category Tabs & Filter Pills & Live Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search lot / botanical / origin..."
                className="w-full pl-8 pr-7 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 shadow-2xs font-sans"
              />
              <Search className="w-3.5 h-3.5 text-emerald-800 absolute left-2.5 top-3" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer font-mono ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#041A12] to-[#082E20] text-white shadow-md border border-amber-400/50'
                      : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Hairline Line that expands across viewport */}
        <div className="w-full h-[1.5px] bg-gradient-to-r from-amber-500 via-emerald-500/40 to-transparent mb-12 reveal-line" />

        {/* Product Cards Grid — Fluid 4 to 5 Columns on large displays */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 min-[2200px]:grid-cols-5 gap-6 sm:gap-8">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onOpenWhatsAppDrawer={onOpenWhatsAppDrawer}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-white rounded-xl border border-slate-200 my-6 shadow-sm">
            <p className="font-serif text-xl text-slate-800">No spices found matching your search parameters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All Products'); }}
              className="mt-4 px-5 py-2.5 bg-[#041A12] text-white rounded-lg text-xs font-bold hover:bg-[#062419] transition-colors uppercase tracking-wider font-mono border border-amber-400/40"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Commercial Lab Evaluation Sample Kit Banner — Solid Architectural Emerald */}
        <div className="mt-16 p-8 sm:p-12 bg-gradient-to-r from-[#02120C] via-[#042418] to-[#02120C] rounded-2xl text-slate-100 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-400/40 relative overflow-hidden reveal-init">
          
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />

          <div className="space-y-3 text-center md:text-left relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20 uppercase tracking-widest font-mono">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Commercial Laboratory Privilege</span>
            </div>
            
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Request a Sealed Sample Kit for European Quality Verification
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              We provide sealed 250g to 1kg evaluation samples accompanied by accredited Certificate of Analysis (COA) for verified European food processors, masala blenders, and import houses before contract execution.
            </p>
          </div>

          <button
            onClick={handleSampleKitWhatsApp}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 active:scale-95 text-slate-950 rounded-xl font-bold text-xs sm:text-sm shadow-[0_4px_25px_rgba(245,158,11,0.45)] transition-all shrink-0 flex items-center gap-3 cursor-pointer relative z-10 uppercase tracking-wider font-mono"
            title="Request sample kit on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Request Sample Kit on WhatsApp (1-Click)</span>
          </button>
        </div>

      </div>
    </section>
  );
}
