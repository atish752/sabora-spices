import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Sparkles, Building2, MapPin, Package, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRODUCTS, GENERAL_WHATSAPP_MESSAGE } from '../data/products';
import { SITE_CONFIG } from '../config/siteConfig';

export default function WhatsAppDrawer({ isOpen, onClose, initialProduct = null, initialNote = "", products = PRODUCTS }) {
  const [selectedProductId, setSelectedProductId] = useState(initialProduct?.id || "general");
  const [companyName, setCompanyName] = useState("");
  const [destination, setDestination] = useState("Rotterdam Port (Netherlands)");
  const [volume, setVolume] = useState("500 Kg (Commercial Lot)");
  const [packaging, setPackaging] = useState("Multiwall Kraft Paper Bags (25/50kg)");
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
        `Hello Sabora Spices export team,\n\nI am interested in *${activeProduct.name}*${activeProduct.botanicalName ? ` (${activeProduct.botanicalName})` : ''} for European B2B procurement.\n\n${custom}\n\nPlease share wholesale pricing, MOQ, and export delivery terms (CIF / FOB).\n\nThank you!`
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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 bg-[#041A12] text-stone-100 flex items-center justify-between border-b border-emerald-900/60 relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-white tracking-wide">WhatsApp Commercial Desk</h3>
                <p className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>Direct European Wholesale RFQs</span>
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors flex items-center justify-center text-sm font-bold cursor-pointer relative z-10"
              aria-label="Close Drawer"
            >
              ×
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* Sabora Direct Guarantee */}
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-stone-700 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Direct connection to European export desk. Fast response within 2 hours.</span>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1 tracking-wider font-mono">
                Product Lot Selected
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800"
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
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1 tracking-wider font-mono">
                Company / Firm Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. EuroSpice Trading GmbH / BioSpices B.V."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs p-2.5 pl-8 rounded-xl border border-stone-200 bg-white text-stone-800"
                />
                <Building2 className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Quantity Required */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1 tracking-wider font-mono">
                Estimated Order Volume
              </label>
              <select
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-mono"
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
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1 tracking-wider font-mono">
                Packaging Preference
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800"
              >
                <option value="Multiwall Kraft Paper Bags (25/50kg)">Multiwall Kraft Paper Bags (25/50kg)</option>
                <option value="Vacuum Sealed Nitrogen Flushed Pouches">Vacuum Sealed Nitrogen Pouches</option>
                <option value="Custom Private Label Pouches (Our Brand)">Custom Private Label Pouches</option>
                <option value="Export Master Corrugated Cases">Export Master Corrugated Cases</option>
              </select>
            </div>

            {/* Destination Port / City */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1 tracking-wider font-mono">
                Discharge Port / Delivery City (CIF / FOB)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Rotterdam, Hamburg, Antwerp, Genoa..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs p-2.5 pl-8 rounded-xl border border-stone-200 bg-white text-stone-800"
                />
                <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1 tracking-wider font-mono">
                Specific Quality Requirements (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 8mm bold green cardamom, HPLC curcumin %, target shipment window..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800"
              />
            </div>

            {/* Message Preview */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider font-mono">Pre-filled Message Preview:</p>
              <p className="text-xs text-stone-700 font-mono whitespace-pre-line bg-white p-2.5 rounded-lg border border-stone-200 line-clamp-4">
                {decodeURIComponent(generateMessage())}
              </p>
            </div>

          </div>

          {/* Bottom Action */}
          <div className="p-5 border-t border-stone-100 bg-white space-y-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white border border-amber-400/50 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer font-mono"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>Send RFQ on WhatsApp (1-Click)</span>
            </button>
            <p className="text-[10px] text-stone-400 text-center font-mono">
              Active WhatsApp Desk: {SITE_CONFIG.whatsappDisplayNumber}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
