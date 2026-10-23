import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { Sparkles, MessageCircle, Search } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductCatalog({ products = [], onSelectProduct, onOpenWhatsAppDrawer }) {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");

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
    const msg = `Hello Sabora Spices team,\n\nI would like to request an official wholesale evaluation sample kit (250g - 1kg) for laboratory COA testing before placing a commercial container order.\n\nPlease share your sample evaluation policy and dispatch timeline.\n\nThank you!`;
    SITE_CONFIG.openWhatsApp(encodeURIComponent(msg));
  };

  return (
    <section id="catalog" className="w-full py-16 sm:py-20 bg-slate-50/50 scroll-mt-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>European Commercial Assortment</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              The Wholesale Collection
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Laser sortex-graded whole spices and gourmet agro products. Order commercial lots or request evaluation samples.
            </p>
          </div>

          {/* Search & Category Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[200px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by name / origin..."
                className="w-full pl-8 pr-7 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-sans"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#041A12] text-white shadow-xs border border-emerald-600'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="font-serif text-lg font-bold text-slate-700">No products match your search.</p>
            <button
              onClick={() => { setSelectedCategory("All Products"); setSearchTerm(""); }}
              className="text-xs font-mono uppercase font-bold text-emerald-800 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Sample Kit Request Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Need to test pre-shipment lot quality?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-sans">
              Request a certified 250g - 1kg evaluation sample kit with full laboratory Certificate of Analysis (COA).
            </p>
          </div>
          <button
            onClick={handleSampleKitWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#041A12] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span>Request Sample Kit</span>
          </button>
        </div>

      </div>
    </section>
  );
}
