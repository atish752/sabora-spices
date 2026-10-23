import React, { useState } from 'react';
import { Send, MessageCircle, ShieldCheck, Clock, Anchor, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { SITE_CONFIG } from '../config/siteConfig';

export default function BulkInquiryForm({ products = PRODUCTS }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: products[0]?.name || 'Green Cardamom (Elaichi)',
    volume: '500 Kg (Commercial Lot)',
    destination: 'Rotterdam Port (Netherlands)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct formal European commercial quotation request
    let msg = `Hello Sabora Spices export team,\n\nWe would like to request an official wholesale quotation (RFQ) for European import:\n\n`;
    msg += `• *Buyer Name:* ${formData.name || 'Not specified'}\n`;
    msg += `• *Company / Firm:* ${formData.company || 'Not specified'}\n`;
    msg += `• *WhatsApp / Phone:* ${formData.phone || 'Not specified'}\n`;
    if (formData.email) msg += `• *Email:* ${formData.email}\n`;
    msg += `• *Product:* ${formData.product}\n`;
    msg += `• *Volume:* ${formData.volume}\n`;
    msg += `• *Destination Port:* ${formData.destination}\n`;
    if (formData.notes) msg += `• *Notes:* ${formData.notes}\n`;
    msg += `\nPlease share current CIF rates, COA specifications, and container dispatch timeline.\n\nThank you!`;

    const encoded = encodeURIComponent(msg);
    SITE_CONFIG.openWhatsApp(encoded);
    setSubmitted(true);
  };

  return (
    <section id="inquiry-form" className="w-full py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Direct Desk Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct Commercial Desk</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Request an Official Commercial Quotation
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Receive formal CIF European port rates, lab-verified Certificate of Analysis (COA) specifications, and container stuffing schedules.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-700 font-sans">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-emerald-700">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Fast response within 2 business hours</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 font-sans">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Direct origin pricing with zero mandi intermediaries</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 font-sans">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-emerald-700">
                  <Anchor className="w-4 h-4" />
                </div>
                <span>Full APEDA export documents & phytosanitary clearance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean RFQ Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sophie van den Berg"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Company / Trading House *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. De Botanische Specerij B.V."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +31 20 123 4567"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.eu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Product of Interest
                    </label>
                    <select
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Estimated Volume
                    </label>
                    <select
                      value={formData.volume}
                      onChange={e => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white font-mono"
                    >
                      <option value="1 Kg - 10 Kg (Laboratory Evaluation Sample)">1 Kg - 10 Kg (Lab Evaluation Sample)</option>
                      <option value="50 Kg - 200 Kg (Trial Pallet Lot)">50 Kg - 200 Kg (Trial Pallet Lot)</option>
                      <option value="500 Kg - 2 MT (Commercial LCL Cargo)">500 Kg - 2 MT (Commercial LCL Cargo)</option>
                      <option value="1 x 20ft FCL Container (Full Container Load)">1 x 20ft FCL Container</option>
                      <option value="1 x 40ft FCL Container (Multi-ton Contract)">1 x 40ft FCL Container</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Destination Port (CIF / FOB)
                  </label>
                  <select
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
                  >
                    <option value="Rotterdam Port (Netherlands)">Rotterdam Port (Netherlands)</option>
                    <option value="Hamburg Port (Germany)">Hamburg Port (Germany)</option>
                    <option value="Antwerp Port (Belgium)">Antwerp Port (Belgium)</option>
                    <option value="Genoa Port (Italy)">Genoa Port (Italy)</option>
                    <option value="FOB Cochin / Tuticorin Port (India)">FOB Cochin / Tuticorin (India)</option>
                    <option value="Air Cargo (Frankfurt / Schiphol / Paris CDG)">Air Cargo (European Hub)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specific pod mm grade, curcumin percentage, private label packaging, or target lead time..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-95 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md border border-amber-400/50 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>Submit RFQ on WhatsApp (1-Click)</span>
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
