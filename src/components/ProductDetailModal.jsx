import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  FileText, 
  Package, 
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductDetailModal({ product, onClose, onOpenQuoteModal }) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);

  const gallery = (product.gallery && product.gallery.length > 0) 
    ? product.gallery 
    : [product.image];

  const handleWhatsApp = () => {
    const text = SITE_CONFIG.getProductWhatsAppMessage(product);
    SITE_CONFIG.openWhatsApp(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Product Dossier"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          
          {/* Top Section: Visual Gallery & Key Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-stone-100 overflow-hidden border border-stone-200 flex items-center justify-center p-4">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-md transition-all duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0F3D2E] text-amber-300 text-[11px] font-bold">
                    {product.badge || product.category}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 rounded-lg bg-stone-50 border p-1 shrink-0 overflow-hidden cursor-pointer transition-all ${
                        activeImage === img 
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30' 
                          : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Summary Column (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.netWeight && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-stone-100 font-mono text-stone-700">
                      {product.netWeight}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {product.name}
                </h2>

                {product.botanicalName && (
                  <p className="text-xs italic font-serif text-stone-500">
                    Botanical Name: {product.botanicalName}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {product.tagline || product.subtitle}
              </p>

              {/* Quick Specs Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="block text-stone-500 text-[11px]">Primary Origin:</span>
                  <span className="font-bold text-stone-900">{product.origin}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="block text-stone-500 text-[11px]">Minimum Order (MOQ):</span>
                  <span className="font-bold text-stone-900">{product.moq}</span>
                </div>
              </div>

              {/* Grades Available */}
              {product.gradesAvailable && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-stone-800">Available Grades:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.gradesAvailable.map((g, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenQuoteModal) onOpenQuoteModal(product);
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white font-bold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Request Product Quote</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Quote</span>
                </button>
              </div>

            </div>

          </div>

          {/* Detailed Technical Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Technical Specifications Dossier</span>
              </h3>

              <div className="rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100 text-xs">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 p-3 gap-2 bg-stone-50/50 hover:bg-stone-50">
                    <span className="sm:col-span-5 font-bold text-stone-700">{spec.label}</span>
                    <span className="sm:col-span-7 font-medium text-stone-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packaging Options */}
          {product.packagingOptions && product.packagingOptions.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                <span>Available Packaging Arrangements</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.packagingOptions.map((pkg, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-stone-700 font-medium">{pkg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>SABORA SPICES • Jahangirpuri, Delhi – 110033</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-stone-300 hover:bg-white text-stone-700 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
