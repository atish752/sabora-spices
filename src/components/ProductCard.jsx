import React, { useState } from 'react';
import { MessageCircle, ArrowRight, MapPin, Sparkles, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductCard({ product, onSelectProduct, onOpenWhatsAppDrawer }) {
  const [imgError, setImgError] = useState(false);
  
  // 1-Click direct WhatsApp inquiry
  const handleDirectWhatsAppClick = (e) => {
    e.stopPropagation();
    const encodedText = typeof product.whatsappTemplate === 'function'
      ? product.whatsappTemplate()
      : encodeURIComponent(
          `Hello Sabora Spices team,\n\nI am interested in *${product.name}* for European wholesale supply.\n\nPlease share wholesale pricing, MOQ, and export delivery terms (CIF / FOB).\n\nThank you!`
        );
    SITE_CONFIG.openWhatsApp(encodedText);
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-600/60 p-5 sm:p-6 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      <div>
        {/* Top Meta: Origin & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate max-w-[170px] font-medium">
              {product.origin ? product.origin.split(',')[0] : 'Origin Direct'}
            </span>
          </div>

          {product.badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Image on Clean Tactile Plinth */}
        <div className="w-full h-52 sm:h-56 relative flex items-center justify-center p-4 mb-4 rounded-2xl bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100/60 border border-slate-100 group-hover:border-emerald-200 transition-colors overflow-hidden">
          <div className="absolute w-32 h-32 rounded-full bg-emerald-400/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          
          {!imgError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_12px_18px_rgba(0,0,0,0.18)] relative z-10"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <Sparkles className="w-6 h-6 text-emerald-700 mb-1" />
              <p className="font-serif font-bold text-sm text-slate-800">{product.name.split(' ')[0]}</p>
            </div>
          )}

          {/* Discreet Batch Tag */}
          {product.batchCode && (
            <span className="absolute bottom-2 right-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200">
              {product.batchCode}
            </span>
          )}
        </div>

        {/* Titles */}
        <div className="space-y-1 mb-3">
          <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors leading-snug">
            {product.name}
          </h3>

          {product.botanicalName && (
            <p className="font-serif italic text-xs text-amber-800">
              {product.botanicalName}
            </p>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-0.5 font-sans">
            {product.subtitle || 'Optical sortex-cleaned single-origin harvest lot.'}
          </p>
        </div>

        {/* Commercial Meta Row: MOQ & Price */}
        <div className="flex items-center justify-between text-xs font-mono py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Min. Order</span>
            <span className="font-bold text-slate-700">{(product.moq || '50 Kg').split('(')[0].trim()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block">Wholesale Rate</span>
            <span className="font-bold text-emerald-800">
              {product.bulkPrice?.visible && product.bulkPrice?.value ? product.bulkPrice.value : 'Inquire CIF'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={handleDirectWhatsAppClick}
          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#041A12] to-[#082E20] hover:brightness-110 active:scale-95 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs"
          title="Direct 1-Click WhatsApp Inquiry"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 shrink-0" />
          <span>Inquire</span>
        </button>

        <button
          onClick={() => onSelectProduct(product)}
          className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
          title="View Technical Dossier & Laboratory COA"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Dossier</span>
        </button>
      </div>
    </div>
  );
}
