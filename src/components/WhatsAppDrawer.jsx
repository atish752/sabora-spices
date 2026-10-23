import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Sparkles, Building2, MapPin, Package, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRODUCTS, GENERAL_WHATSAPP_MESSAGE } from '../data/products';
import { SITE_CONFIG } from '../config/siteConfig';

export default function WhatsAppDrawer({ isOpen, onClose, initialProduct = null, initialNote = "", products = PRODUCTS }) {
  const [selectedProductId, setSelectedProductId] = useState(initialProduct?.id || "general");
  const [companyName, setCompanyName] = useState("");
  const [destination, setDestination] = useState("Rotterdam Port (Netherlands)");
  const [volume, setVolume] = useState("500 Kg (Commercial Lot)");
  const [packaging, setPackaging] = useState("Multiwall Kraft Paper Valve Bags (25/50kg)");
  const [customNotes, setCustomNotes] = useState(initialNote || "");

  // Update selected product if prop changes
  useEffect(() => {
    if (initialProduct) {
      setSelectedProductId(initialProduct.id);
    } else {
      setSelectedProductId("general");
    }
    if (initialNote) {
      setCustomNotes(initialNote);
    }
  }, [initialProduct, initialNote]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Selected product object
  const activeProduct = products.find(p => p.id === selectedProductId);

  // Generate pre-filled message
  const generateMessage = () => {
    if (selectedProductId === "general" || !activeProduct) {
      let custom = "";
      if (companyName.trim()) custom += `• Company / Firm: ${companyName.trim()}\n`;
      if (destination.trim()) custom += `• Destination Port (CIF / FOB): ${destination.trim()}\n`;
      custom += `• Estimated Volume: ${volume}\n`;
      custom += `• Packaging Format: ${packaging}\n`;
      if (customNotes.trim()) custom += `• Notes / Quality: ${customNotes.trim()}\n`;
      return GENERAL_WHATSAPP_MESSAGE(custom);
    } else {
      let custom = ``;
      if (companyName.trim()) custom += `• Company / Firm: ${companyName.trim()}\n`;
      custom += `• Required Volume: ${volume}\n`;
      custom += `• Packaging Format: ${packaging}\n`;
      if (destination.trim()) custom += `• Destination Port (CIF / FOB): ${destination.trim()}\n`;
      if (customNotes.trim()) custom += `• Special Notes: ${customNotes.trim()}\n`;
      if (typeof activeProduct.whatsappTemplate === 'function') {
        return activeProduct.whatsappTemplate(custom);
      }
      return encodeURIComponent(
        `Hello Sabora Spices export team,\n\nI am interested in *${activeProduct.name}*${activeProduct.botanicalName ? ` (${activeProduct.botanicalName})` : ''} for commercial European B2B procurement.\n\n${custom}\n\nPlease share wholesale pricing, MOQ, and export delivery terms (CIF / FOB).\n\nThank you!`
      );
    }
  };

  const handleSendWhatsApp = () => {
    const text = generateMessage();
    SITE_CONFIG.openWhatsApp(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150 font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F9FBFA] shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 bg-[#041A12] text-slate-100 flex items-center justify-between border-b border-emerald-900/60 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brass-500/70 to-transparent" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-base text-white tracking-wide">WhatsApp Commercial Desk</h3>
                <p className="text-[11px] text-brass-400 font-mono flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-brass-400" />
                  <span>Direct Wholesale RFQs</span>
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* Sabora Direct Guarantee */}
            <div className="p-3.5 bg-white rounded-lg border border-slate-200/90 text-xs text-slate-700 flex items-center gap-2.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct connection to European & Global export managers. Rapid turnaround.</span>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 tracking-wider font-mono">
                Product Lot Selected
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full text-xs font-semibold p-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
              >
                <option value="general">★ Complete Assortment & Price Dossier (All Spices)</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.botanicalName ? `(${p.botanicalName})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Company / Buyer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 tracking-wider font-mono">
                Company / Firm Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. EuroSpice Trading GmbH / BioSpices B.V."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs p-3 pl-9 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Quantity Required */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 tracking-wider font-mono">
                Estimated Order Volume
              </label>
              <select
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full text-xs font-semibold p-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
              >
                <option value="Sample Evaluation Pack (250g - 1 Kg)">Sample Evaluation Pack (250g - 1 Kg)</option>
                <option value="50 Kg (Trial Batch)">50 Kg (Trial Batch)</option>
                <option value="250 Kg to 500 Kg (Palletized Cargo)">250 Kg to 500 Kg (Palletized Cargo)</option>
                <option value="1 Metric Ton to 3 Metric Tons">1 MT to 3 MT</option>
                <option value="1 Full Container Load (20ft FCL)">1 Full Container Load (20ft FCL)</option>
                <option value="Annual Institutional Contract">Annual Institutional Contract</option>
              </select>
            </div>

            {/* Packaging */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 tracking-wider font-mono">
                Packaging Preference
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full text-xs font-semibold p-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
              >
                <option value="Multiwall Kraft Paper Valve Bags (25/50kg)">Multiwall Kraft Paper Bags (25/50kg)</option>
                <option value="Vacuum Sealed Nitrogen Flushed Pouches">Vacuum Sealed Nitrogen Pouches</option>
                <option value="Custom Private Label Pouches (Our Brand)">Custom Private Label Pouches</option>
                <option value="Export Master Corrugated Cases">Export Master Corrugated Cases</option>
              </select>
            </div>

            {/* Destination Port / City */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 tracking-wider font-mono">
                Discharge Port / Delivery City (CIF / FOB)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Rotterdam, Hamburg, Antwerp, Genoa, London"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs p-3 pl-9 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 tracking-wider font-mono">
                Specific Quality & Grade Requirements
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need 8mm bold green cardamom with COA or specific curcumin %..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 shadow-2xs"
              />
            </div>

            {/* Message Preview */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Pre-filled Message Preview:</p>
              <p className="text-xs text-slate-700 font-mono whitespace-pre-line bg-slate-50 p-2.5 rounded-md border border-slate-200/80 line-clamp-4">
                {decodeURIComponent(generateMessage())}
              </p>
            </div>

          </div>

          {/* Bottom Action */}
          <div className="p-5 border-t border-slate-200 bg-white space-y-2">
            <button
              onClick={handleSendWhatsApp}
              className="relative overflow-hidden w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-98 text-white border border-emerald-400/40 rounded-lg font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer group uppercase tracking-wider font-mono ring-2 ring-emerald-500/10"
            >
              <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <MessageCircle className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Send Commercial RFQ via WhatsApp (1-Click)</span>
              <ExternalLink className="w-4 h-4 relative z-10" />
            </button>
            <p className="text-[10px] text-slate-400 text-center font-mono">
              Active WhatsApp Desk: {SITE_CONFIG.whatsappDisplayNumber}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
