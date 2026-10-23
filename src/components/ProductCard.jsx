import React, { useState } from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, MapPin, Scale, ChevronRight, Sparkles, Package } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductCard({ product, onSelectProduct, onOpenWhatsAppDrawer }) {
  const [imgError, setImgError] = useState(false);
  
  // 1-Click direct WhatsApp inquiry
  const handleDirectWhatsAppClick = (e) => {
    e.stopPropagation();
    const encodedText = product.whatsappTemplate?.() ?? encodeURIComponent(
      `Hello Sabora Spices team,\n\nI am interested in *${product.name}* for commercial European B2B procurement.\n\nPlease share wholesale pricing, MOQ, and export delivery terms (CIF / FOB).\n\nThank you!`
    );
    SITE_CONFIG.openWhatsApp(encodedText);
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/90 p-6 sm:p-7 shadow-2xs hover:shadow-[0_20px_45px_-10px_rgba(4,26,18,0.2),0_0_25px_rgba(245,158,11,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer reveal-init overflow-hidden"
    >
      {/* Corner engraved ticks in gold on hover */}
      <div className="corner-tick-tl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="corner-tick-br opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Top row: Terroir origin & Export Grade Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-sans">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate max-w-[180px] font-medium tracking-wide">
              {product.origin ? product.origin.split(',')[0] : 'Origin Direct'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product.badge && (
              <span className="text-[10px] font-bold tracking-widest text-amber-900 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-400/60 px-2.5 py-0.5 rounded-full uppercase font-mono shadow-2xs">
                {product.badge}
              </span>
            )}
            <span className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-[#041A12] group-hover:text-amber-300 flex items-center justify-center transition-all text-slate-600 shadow-2xs border border-slate-200">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Product Packaging Image Inset (Architectural Plinth Frame with Ambient Backlight) */}
        <div className="w-full h-56 sm:h-60 relative flex items-center justify-center p-5 mb-5 rounded-xl bg-gradient-to-b from-slate-50 via-emerald-50/25 to-slate-100/80 overflow-hidden border border-slate-200 group-hover:border-emerald-300/80 transition-colors">
          
          {/* Subtle glowing ambient orb behind packaging */}
          <div className="pointer-events-none absolute w-36 h-36 rounded-full bg-emerald-400/20 blur-2xl group-hover:scale-125 transition-transform" />
          <div className="pointer-events-none absolute inset-x-8 bottom-3 h-8 bg-gradient-to-r from-emerald-500/20 via-amber-400/20 to-emerald-500/20 blur-md rounded-full" />

          {/* Subtle corner ticks */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-400/50 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-400/50 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-400/50 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-400/50 pointer-events-none" />

          {!imgError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-700 drop-shadow-[0_16px_22px_rgba(0,0,0,0.22)] relative z-10"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-2 shadow-xs">
                <Sparkles className="w-6 h-6 text-emerald-700" />
              </div>
              <p className="font-serif font-bold text-sm text-slate-800">{product.name.split(' ')[0]}</p>
              <p className="text-[10px] text-amber-700 font-mono mt-0.5 uppercase tracking-wider">{product.badge || 'Terroir Select'}</p>
            </div>
          )}

          {/* Discreet Batch Watermark */}
          {product.batchCode && (
            <span className="absolute bottom-2.5 right-3 text-[9px] uppercase tracking-widest font-mono text-slate-600 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded border border-slate-200 z-10 shadow-2xs">
              {product.batchCode}
            </span>
          )}
        </div>

        {/* Product Names & Editorial Subtitle */}
        <div className="space-y-1 mb-3.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#041A12] transition-colors leading-snug">
            {product.name}
          </h3>

          {product.botanicalName && (
            <p className="font-serif italic text-xs text-amber-700 tracking-wide font-medium">
              {product.botanicalName}
            </p>
          )}

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Sensory Tasting Notes (Architectural badges) */}
        {product.aromaNotes && product.aromaNotes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5 pt-2.5 border-t border-slate-100">
            {product.aromaNotes.map((note, idx) => (
              <span key={idx} className="text-[10px] font-sans text-slate-700 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
                {note}
              </span>
            ))}
          </div>
        )}

        {/* B2B Specs Row */}
        <div className="flex flex-wrap gap-2 my-3.5 pt-2.5 border-t border-slate-100">
          <span className="text-[11px] font-semibold bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1.5 font-sans">
            <Scale className="w-3 h-3 text-amber-600 shrink-0" />
            <span>MOQ: {(product.moq || '').split('(')[0].trim() || 'On Request'}</span>
          </span>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5 font-sans">
            <ShieldCheck className="w-3 h-3 text-emerald-700 shrink-0" />
            <span>Sortex 99.8%</span>
          </span>
        </div>

        {/* Pricing — only shown when admin enables it */}
        {product.pricingEnabled && (
          <div className="my-3 p-3 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 rounded-lg border border-amber-300/80 space-y-1.5 font-sans">
            {product.pricePerPiece?.visible && product.pricePerPiece?.value && (
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">{product.pricePerPiece.label || 'Unit Price'}</span>
                <span className="text-sm font-extrabold text-slate-900">{product.pricePerPiece.value}</span>
              </div>
            )}
            {product.bulkPrice?.visible && product.bulkPrice?.value && (
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">{product.bulkPrice.quantityLabel || 'Bulk Price'}</span>
                <span className="text-sm font-extrabold text-[#041A12]">{product.bulkPrice.value}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
        
        {/* 1-Click WhatsApp Inquiry Button */}
        <button
          onClick={handleDirectWhatsAppClick}
          className="relative overflow-hidden w-full py-3.5 px-4 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-98 text-white border border-amber-400/50 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:shadow-[0_6px_22px_rgba(245,158,11,0.4)] transition-all cursor-pointer group/btn uppercase tracking-wider font-mono ring-1 ring-emerald-500/20"
          title={`Inquire about ${product.name} directly on WhatsApp`}
        >
          <div className="absolute inset-0 shimmer-gold opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none" />
          <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400 group-hover/btn:scale-110 transition-transform shrink-0 relative z-10" />
          <span className="relative z-10">Inquire on WhatsApp (1-Click)</span>
        </button>

        {/* Technical Specs & Custom RFQ Links */}
        <div className="flex items-center justify-between text-xs pt-1 px-1 font-sans">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="text-[#041A12] hover:text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Dossier & COA</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenWhatsAppDrawer(product);
            }}
            className="text-amber-700 hover:text-amber-900 font-semibold hover:underline cursor-pointer"
          >
            Custom CIF Quote
          </button>
        </div>

      </div>

    </div>
  );
}
