import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Copy, 
  Check, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  Anchor,
  Clock
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const COMMODITIES = [
  { id: 'cardamom', name: 'Green Cardamom', grade: '8mm+ Bold Sortex', defaultMoq: '50 Kg' },
  { id: 'turmeric', name: 'Salem Turmeric Whole', grade: 'Curcumin 4.5%+', defaultMoq: '500 Kg' },
  { id: 'makhana', name: 'Jumbo Fox Nuts (Makhana)', grade: '6-Suta (>18mm)', defaultMoq: '100 Kg' },
  { id: 'pepper', name: 'Tellicherry Black Pepper', grade: '550-575g/L MG1', defaultMoq: '200 Kg' },
  { id: 'cloves', name: 'Lal Pari Cloves', grade: 'High Eugenol >18%', defaultMoq: '100 Kg' },
  { id: 'star-anise', name: 'Star Anise 8-Pointed', grade: 'Autumn Harvest', defaultMoq: '100 Kg' },
];

const VOLUMES = [
  '1-2 Kg Pre-Shipment Sample',
  '500 Kg Commercial Trial',
  '2 Metric Tons Consolidated LCL',
  '10 - 20 Metric Tons FCL Container'
];

const DESTINATIONS = [
  'CIF Rotterdam Port (Netherlands)',
  'CIF Hamburg Port (Germany)',
  'CIF Antwerp Port (Belgium)',
  'CIF Genoa Port (Italy)',
  'Air Cargo DAP (Major European Hub)',
  'FOB Cochin / Tuticorin Port (India)'
];

const PACKAGING_OPTIONS = [
  'Multiwall Kraft Paper Bags with PE Liner (25kg / 50kg)',
  'Nitrogen Flushed Foil Stand-Up Barrier Pouches (1kg / 2kg)',
  'Private Label Retail Branded Pouches (OEM)',
  'Standard Master Export Corrugated Boxes'
];

export default function QuickRfqDesk() {
  const [selectedCommodity, setSelectedCommodity] = useState(COMMODITIES[0]);
  const [selectedVolume, setSelectedVolume] = useState(VOLUMES[1]);
  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS[0]);
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [companyName, setCompanyName] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const compileMessage = () => {
    let msg = `Hello Sabora Spices Export Desk,\n\n`;
    msg += `I am submitting an official commercial wholesale inquiry from your European Quotation Desk:\n\n`;
    if (companyName.trim()) {
      msg += `• Company / Firm: ${companyName.trim()}\n`;
    }
    msg += `• Commodity: *${selectedCommodity.name}* (${selectedCommodity.grade})\n`;
    msg += `• Volume Required: ${selectedVolume}\n`;
    msg += `• Delivery Port / Incoterms: ${selectedDestination}\n`;
    msg += `• Packaging Format: ${selectedPackaging}\n`;
    if (specialNotes.trim()) {
      msg += `• Special Notes / Private Label: ${specialNotes.trim()}\n`;
    }
    msg += `\nPlease provide current CIF pricing, latest ISO 17025 COA specifications, and export shipping schedule.\n\nThank you!`;
    return msg;
  };

  const handleLaunchWhatsApp = () => {
    const raw = compileMessage();
    SITE_CONFIG.openWhatsApp(encodeURIComponent(raw));
  };

  const handleCopy = () => {
    const raw = compileMessage();
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="rfq-desk" className="py-20 sm:py-28 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant Quotation Desk</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-950">
            Interactive Quick RFQ
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Select your target commodity, volume tier, and European delivery port. Your quotation will be compiled automatically and dispatched via direct 1-click WhatsApp.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Select Commodity */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                1. Select Commodity *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COMMODITIES.map((c) => {
                  const isSelected = selectedCommodity.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCommodity(c)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#041A12] text-white border-amber-400/60 shadow-md'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200/90'
                      }`}
                    >
                      <span className="font-serif font-bold text-xs sm:text-sm block truncate">
                        {c.name}
                      </span>
                      <span className={`text-[10px] font-mono block truncate ${isSelected ? 'text-amber-300' : 'text-stone-500'}`}>
                        {c.grade}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Volume Tier */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                2. Target Volume Tier *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VOLUMES.map((vol) => {
                  const isSelected = selectedVolume === vol;
                  return (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-4 py-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950 text-white border-emerald-500 shadow-xs font-bold'
                          : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {vol}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Destination Port */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-2">
                3. European Port / Incoterms *
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm font-sans text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Packaging Preference */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-2">
                4. Packaging Preference
              </label>
              <select
                value={selectedPackaging}
                onChange={(e) => setSelectedPackaging(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm font-sans text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
              >
                {PACKAGING_OPTIONS.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Company Name & Custom Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. De Botanische Specerij B.V."
                  className="w-full px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-sans text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Special Notes / Quality Specs
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Non-ETO steam certificate required"
                  className="w-full px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-sans text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Live Quotation Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#041A12] via-[#082E20] to-[#041A12] text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block font-bold">
                    Official Quotation Dossier
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Live RFQ Preview
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Quotation Details */}
              <div className="space-y-3 font-mono text-xs">
                
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase block">Selected Commodity</span>
                  <span className="text-sm font-serif font-bold text-amber-200 block">
                    {selectedCommodity.name}
                  </span>
                  <span className="text-[11px] text-stone-300 block">
                    Grade: {selectedCommodity.grade}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block">Volume Tier</span>
                    <span className="font-bold text-white text-xs truncate block">{selectedVolume.split(' ')[0]} {selectedVolume.split(' ')[1] || ''}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block">Dispatch Lead</span>
                    <span className="font-bold text-emerald-400 text-xs block">3 - 5 Days</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-stone-400 uppercase block">Destination Port</span>
                  <span className="font-bold text-white text-xs block truncate">{selectedDestination}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-stone-400 uppercase block">Packaging</span>
                  <span className="font-medium text-stone-300 text-[11px] block truncate">{selectedPackaging}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={handleLaunchWhatsApp}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-[#041A12] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-[#041A12] text-[#041A12] group-hover:scale-110 transition-transform" />
                  <span>Send RFQ on WhatsApp (1-Click)</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Quotation Copied to Clipboard!' : 'Copy Quotation Text'}</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                  EU MRL (EC) 396/2005 & Lab COA Guaranteed
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
