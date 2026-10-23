import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  Package, 
  Check, 
  FileCheck2,
  Copy,
  ExternalLink,
  Sparkles,
  Anchor,
  Scale
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductModal({ product, onClose }) {
  const [selectedQuantity, setSelectedQuantity] = useState("500 Kg (Commercial Lot)");
  const [packagingPreference, setPackagingPreference] = useState("Multiwall Kraft Barrier Bags (25/50kg)");
  const [destinationCity, setDestinationCity] = useState("Rotterdam Port (Netherlands)");
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  // Build dynamic formal message based on buyer selections
  const generateFormalMessage = () => {
    let customText = `• Estimated Order Volume: ${selectedQuantity}\n• Preferred Packaging: ${packagingPreference}`;
    if (destinationCity.trim()) {
      customText += `\n• Delivery Destination / Port (CIF / FOB): ${destinationCity.trim()}`;
    }
    return product.whatsappTemplate?.(customText) ?? encodeURIComponent(
      `Hello Sabora Spices team,\n\nI am interested in *${product.name}* for European wholesale supply.\n\n${customText}\n\nPlease share current CIF export rates, MOQ, and laboratory COA specifications.\n\nThank you!`
    );
  };

  const handleLaunchWhatsApp = () => {
    const encoded = generateFormalMessage();
    SITE_CONFIG.openWhatsApp(encoded);
  };

  const handleCopyMessage = () => {
    const rawText = decodeURIComponent(generateFormalMessage());
    navigator.clipboard.writeText(rawText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden my-6 max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-stone-100 bg-white/95 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md font-mono">
              {product.category || 'Whole Spices'}
            </span>
            {product.badge && (
              <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80 font-mono uppercase">
                {product.badge}
              </span>
            )}
            {product.botanicalName && (
              <span className="font-serif italic text-xs text-stone-500 hidden sm:inline-block">
                Taxonomy: {product.botanicalName}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
            aria-label="Close Modal"
          >
            ×
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 font-sans">
          
          {/* Top Section: Photo + Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Product Image Showcase */}
            <div className="sm:col-span-5 bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100/60 rounded-2xl p-6 border border-stone-100 flex flex-col items-center justify-center relative group overflow-hidden">
              <div className="absolute w-36 h-36 rounded-full bg-emerald-400/10 blur-xl pointer-events-none" />
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-56 w-auto object-contain drop-shadow-lg relative z-10" 
              />
              <div className="mt-3 flex items-center gap-1.5 bg-white/95 px-3 py-1 rounded-full border border-stone-200 text-[10px] font-mono font-bold text-stone-700 shadow-2xs uppercase relative z-10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sortex 99.8% Calibrated</span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="sm:col-span-7 space-y-3">
              <div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
                  {product.name}
                </h2>
                
                {product.botanicalName && (
                  <p className="font-serif italic text-xs text-amber-800 mt-0.5">
                    {product.botanicalName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.subtitle || 'Laser sortex-cleaned single-origin harvest lot for European tea blenders and gourmet purveyors.'}
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 uppercase block">Single-Origin</span>
                  <span className="font-bold text-stone-800 truncate block">
                    {product.origin ? product.origin.split(',')[0] : 'Direct Estate'}
                  </span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 uppercase block">Minimum Order</span>
                  <span className="font-bold text-stone-800 truncate block">
                    {(product.moq || '50 Kg').split('(')[0].trim()}
                  </span>
                </div>
              </div>

              {/* 1-Click WhatsApp Button */}
              <button
                onClick={handleLaunchWhatsApp}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white border border-amber-400/50 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400 shrink-0" />
                <span>Inquire on WhatsApp (1-Click)</span>
              </button>
            </div>

          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
                <span>Technical Specifications & Analytical Benchmarks (COA)</span>
              </h3>
              <span className="text-[10px] text-emerald-900 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono uppercase">
                EU MRL Compliant
              </span>
            </div>

            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs divide-y divide-stone-100">
                <thead className="bg-stone-50 text-stone-700 font-bold uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="py-2.5 px-4">Parameter</th>
                    <th className="py-2.5 px-4">Certified Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800 font-sans">
                  {(product.specifications && product.specifications.length > 0 ? product.specifications : [
                    { label: 'Origin Terroir', value: product.origin || 'Direct Estate Harvest' },
                    { label: 'Optical Purity', value: '99.8% Laser Sortex' },
                    { label: 'EU Pesticide MRLs', value: 'Conforms to (EC) No 396/2005' },
                    { label: 'Shelf Life', value: '24 Months in Nitrogen Sealed Packaging' }
                  ]).map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                      <td className="py-2.5 px-4 font-semibold text-stone-600">{spec.label}</td>
                      <td className="py-2.5 px-4 text-stone-900 font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive RFQ Form Strip */}
          <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-200 space-y-4">
            <h4 className="font-sans text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
              <span>Configure Pre-Filled WhatsApp RFQ</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1 font-mono">
                  Order Volume
                </label>
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800"
                >
                  <option value="50 Kg (Trial Pallet Lot)">50 Kg (Trial Pallet Lot)</option>
                  <option value="250 Kg - 500 Kg (Commercial Lot)">250 Kg - 500 Kg (Commercial Lot)</option>
                  <option value="1 MT - 3 MT (LCL Container)">1 MT - 3 MT (LCL Container)</option>
                  <option value="Full Container Load (20ft FCL)">Full Container Load (20ft FCL)</option>
                  <option value="Evaluation Sample Kit (250g - 1 Kg)">Evaluation Sample Kit (250g - 1 Kg)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1 font-mono">
                  Discharge Port (CIF / FOB)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rotterdam, Hamburg, Genoa..."
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleCopyMessage}
                className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer font-mono"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedNotice ? "Copied to clipboard!" : "Copy inquiry text"}</span>
              </button>

              <button
                onClick={handleLaunchWhatsApp}
                className="px-5 py-2.5 bg-[#041A12] hover:bg-emerald-950 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                <span>Send on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
