import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Scale, 
  MapPin, 
  Package, 
  Check, 
  FileCheck2,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Anchor
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ProductModal({ product, onClose }) {
  const [selectedQuantity, setSelectedQuantity] = useState("500 Kg (Commercial Lot)");
  const [packagingPreference, setPackagingPreference] = useState("Multiwall Kraft Paper Valve Bags (25/50kg)");
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
      `Hello Sabora Spices team,\n\nI am interested in *${product.name}* for commercial European B2B procurement.\n\n${customText}\n\nPlease share wholesale pricing, MOQ, and export delivery terms.\n\nThank you!`
    );
  };

  // Immediate 1-click launch WhatsApp
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-4 max-h-[94vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-slate-200/80 bg-white/95 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-brass-700 bg-brass-50 px-2.5 py-1 rounded-md border border-brass-300 font-mono">
              {product.category}
            </span>
            {product.badge && (
              <span className="text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
                {product.badge}
              </span>
            )}
            {product.botanicalName && (
              <span className="font-serif italic text-xs text-slate-500 hidden sm:inline-block">
                Taxonomy: {product.botanicalName}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1 pb-24 sm:pb-8 font-sans">
          
          {/* Top Section: Photo + Overview + 1-CLICK WHATSAPP BUTTON */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Product Image Showcase with Glowing Pedestal */}
            <div className="md:col-span-5 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100/70 rounded-xl p-6 border border-slate-200/80 flex flex-col items-center justify-center relative group shadow-sm overflow-hidden">
              <div className="absolute w-48 h-48 rounded-full bg-emerald-400/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-72 w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10" 
              />
              <div className="w-32 h-2.5 rounded-full bg-slate-300/40 blur-xs mt-1" />
              <div className="mt-4 flex items-center gap-2 bg-white/95 px-3.5 py-1.5 rounded-full border border-slate-200/80 text-[10px] font-bold text-slate-900 shadow-xs font-mono uppercase relative z-10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>99.8% Optical Sortex Grade</span>
              </div>
            </div>

            {/* Product Meta & Top 1-Click WhatsApp CTA */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight">
                  {product.name}
                </h2>
                
                {product.botanicalName && (
                  <p className="font-serif italic text-sm text-brass-700 font-medium mt-1">
                    {product.botanicalName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {product.tagline || product.subtitle}
                </p>
              </div>

              {/* Instant 1-Click WhatsApp Action Button */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200/80 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    <span>WhatsApp Export Desk (1-Click)</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono uppercase">
                    Active Desk
                  </span>
                </div>
                
                <button
                  onClick={handleLaunchWhatsApp}
                  className="relative overflow-hidden w-full py-4 px-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white rounded-lg font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/25 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer group uppercase tracking-wider font-mono border border-emerald-400/40 ring-2 ring-emerald-500/10"
                  title="Open WhatsApp with formal inquiry"
                >
                  <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <MessageCircle className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Send Commercial Inquiry on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 relative z-10" />
                </button>

                <p className="text-[11px] text-slate-500 text-center font-sans">
                  Pre-fills formal commercial pretext for this {product.name.split(' ')[0]} lot.
                </p>
              </div>

              {/* Quick specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Terroir & Origin</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brass-600 shrink-0" />
                    <span className="truncate">{product.origin || 'Direct Estate'}</span>
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Commercial MOQ</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-brass-600 shrink-0" />
                    <span className="truncate">{product.moq || '50 Kg'}</span>
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Incoterms</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-brass-600 shrink-0" />
                    <span className="truncate">{product.incoterms ? product.incoterms.split('|')[0].trim() : 'CIF European Ports'}</span>
                  </p>
                </div>
              </div>

              {/* Terroir & EU Standards Strip */}
              {(product.terroir || product.euCompliance) && (
                <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1">
                  {product.terroir && (
                    <p className="text-[11px] text-slate-700 font-sans">
                      <strong className="text-slate-900">Terroir:</strong> {product.terroir}
                    </p>
                  )}
                  {product.euCompliance && (
                    <p className="text-[11px] text-emerald-950 font-semibold flex items-center gap-1.5 font-sans">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{product.euCompliance}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Grades available */}
              {product.gradesAvailable && product.gradesAvailable.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                    Available Export Calibrations:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.gradesAvailable.map((g, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 bg-white text-slate-800 rounded-md border border-slate-200 font-medium font-sans shadow-2xs">
                        ✓ {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Section 2: Technical & Chemical Specifications Table (COA) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-brass-600" />
                <span>Technical Dossier & Chemical Analysis (COA)</span>
              </h3>
              <span className="text-xs text-brass-800 font-bold bg-brass-50 px-2.5 py-1 rounded-md border border-brass-300 font-mono uppercase">
                EU Compliant
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px] tracking-wider font-mono">
                    <tr>
                      <th className="py-3 px-4">Analytical Parameter</th>
                      <th className="py-3 px-4">Certified Laboratory Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 text-slate-800 font-sans">
                    {(product.specifications && product.specifications.length > 0) ? (
                      product.specifications.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                          <td className="py-2.5 px-4 font-semibold text-slate-700">{spec.label}</td>
                          <td className="py-2.5 px-4 text-slate-950 font-bold">{spec.value}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-4 px-4 text-center text-slate-500 italic">
                          Official batch HPLC analysis, moisture, and volatile oil Certificate of Analysis (COA) dispatched with commercial evaluation samples.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3: Bulk Packaging & Target European Blenders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Packaging options */}
            <div className="p-5 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3 shadow-2xs">
              <h4 className="font-cinzel font-bold text-base text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-brass-600" />
                <span>Export Packaging Specifications</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-sans">
                {(product.packagingOptions && product.packagingOptions.length > 0 ? product.packagingOptions : [
                  "25 Kg / 50 Kg Multiwall Kraft Paper Bags with PE Liner",
                  "Vacuum Sealed Nitrogen Barrier Pouches",
                  "Custom Private Label Stand-Up Pouches with Multilingual EU Labeling",
                  "Palletized Container Shipments for Sea & Air Freight"
                ]).map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target industries */}
            <div className="p-5 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3 shadow-2xs">
              <h4 className="font-cinzel font-bold text-base text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brass-600" />
                <span>Ideal Industry Applications in Europe</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-sans">
                {(product.b2bIdealFor && product.b2bIdealFor.length > 0 ? product.b2bIdealFor : [
                  "European Spice Blenders & Tea Houses",
                  "Bio & Organic Supermarket Chains in DACH & Benelux",
                  "Gourmet Bakery & Confectionery Producers",
                  "Overseas Importers & Global Commodity Distributors"
                ]).map((ind, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-brass-600 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Section 4: Interactive WhatsApp RFQ Customizer */}
          <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                  <span>Configure Your Commercial RFQ</span>
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 font-sans">
                  Select your quantity and European discharge port. The message below updates in real-time.
                </p>
              </div>

              <span className="text-[10px] font-bold text-emerald-950 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 shrink-0 font-mono uppercase">
                Direct to Export Desk
              </span>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
              
              {/* Estimated Volume */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 tracking-wider font-mono">
                  Volume Required
                </label>
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
                >
                  <option value="50 Kg (Trial Batch)">50 Kg (Trial Batch)</option>
                  <option value="100 Kg">100 Kg</option>
                  <option value="500 Kg (Commercial Lot)">500 Kg (Commercial Lot)</option>
                  <option value="1 Metric Ton (1,000 Kg)">1 Metric Ton (1,000 Kg)</option>
                  <option value="5+ Metric Tons (FCL Cargo)">5+ Metric Tons (FCL Cargo)</option>
                  <option value="Sample Pack (250g - 1 Kg)">Sample Pack (250g - 1 Kg)</option>
                </select>
              </div>

              {/* Packaging */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 tracking-wider font-mono">
                  Packaging Type
                </label>
                <select
                  value={packagingPreference}
                  onChange={(e) => setPackagingPreference(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
                >
                  <option value="Multiwall Kraft Paper Valve Bags (25/50kg)">Multiwall Kraft Paper Bags (25/50kg)</option>
                  <option value="Vacuum Sealed Nitrogen Bricks">Vacuum Sealed Nitrogen Bricks</option>
                  <option value="Custom Private Label Pouches (Our Brand)">Custom Private Label Pouches</option>
                  <option value="Export Master Corrugated Boxes">Export Master Corrugated Boxes</option>
                </select>
              </div>

              {/* Destination Port / City */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 tracking-wider font-mono">
                  Discharge Port (CIF / FOB)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rotterdam, Hamburg, Genoa, London"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
                />
              </div>

            </div>

            {/* Live Message Preview Box */}
            <div className="relative bg-white rounded-lg border border-slate-200 p-4 shadow-2xs font-sans">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Pre-filled WhatsApp Message Preview:
                </span>
                <button
                  onClick={handleCopyMessage}
                  className="text-xs text-brass-700 hover:text-brass-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotice ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>
              <p className="text-xs text-slate-800 font-mono whitespace-pre-line bg-slate-50 p-3 rounded-md border border-slate-200/80 max-h-36 overflow-y-auto">
                {decodeURIComponent(generateFormalMessage())}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleLaunchWhatsApp}
                className="relative overflow-hidden flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white rounded-lg font-bold text-sm shadow-md shadow-emerald-950/25 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 cursor-pointer group uppercase tracking-wider font-mono border border-emerald-400/40 ring-2 ring-emerald-500/10"
              >
                <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <MessageCircle className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Launch WhatsApp RFQ (1-Click)</span>
                <ExternalLink className="w-4 h-4 relative z-10" />
              </button>

              <button
                onClick={onClose}
                className="py-3.5 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-xs cursor-pointer uppercase tracking-wider font-mono transition-colors"
              >
                Close & Return
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Sticky Bottom Inquiry Trigger */}
        <div className="sm:hidden absolute bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg">
          <button
            onClick={handleLaunchWhatsApp}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer border border-emerald-400/30 uppercase tracking-wider font-mono"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>Send Inquiry on WhatsApp (1-Click)</span>
          </button>
        </div>

      </div>

    </div>
  );
}
