import React, { useState } from 'react';
import { Send, ShieldCheck, Clock, Anchor, Sparkles } from 'lucide-react';
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
    let msg = `Hello Sabora Spices export team,\n\nWe would like to request an official European wholesale quotation (RFQ) with the following parameters:\n\n`;
    msg += `• *Buyer Name:* ${formData.name || 'Not specified'}\n`;
    msg += `• *Company / Firm:* ${formData.company || 'Not specified'}\n`;
    msg += `• *WhatsApp / Phone:* ${formData.phone || 'Not specified'}\n`;
    if (formData.email) msg += `• *Email:* ${formData.email}\n`;
    msg += `• *Product of Interest:* ${formData.product}\n`;
    msg += `• *Estimated Volume:* ${formData.volume}\n`;
    if (formData.destination) msg += `• *Delivery Port / City:* ${formData.destination}\n`;
    if (formData.notes) msg += `• *Specific Grades / Packaging:* ${formData.notes}\n`;
    msg += `\nPlease provide your formal price quotation (CIF / FOB), COA specifications, and container dispatch lead time.\n\nThank you!`;

    const encoded = encodeURIComponent(msg);
    SITE_CONFIG.openWhatsApp(encoded);
    setSubmitted(true);
  };

  return (
    <section id="inquiry-form" className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF] border-b border-slate-200/90 scroll-mt-20 relative overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute -top-32 right-10 w-[42rem] h-[42rem] bg-emerald-500/[0.08] rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 w-[38rem] h-[38rem] bg-amber-400/[0.07] rounded-full blur-[130px]" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6 reveal-init">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-emerald-500/15 text-amber-900 text-xs font-bold uppercase tracking-widest border border-amber-400/50 font-mono shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>European & Global Export Desk</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.06]">
              Request an Official Commercial Quotation (RFQ)
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Provide your required metric volume and discharge port. Submitting immediately forwards your formal RFQ to our export directors on WhatsApp for rapid turnaround.
            </p>

            <div className="space-y-4 pt-2 font-sans">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Rapid Turnaround</h4>
                  <p className="text-xs text-slate-600">Official price quotes and packing specs dispatched promptly via WhatsApp commercial desk.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Accredited Laboratory Dossier</h4>
                  <p className="text-xs text-slate-600">Batch COA reports, volatile oil analysis, and EU MRL pesticide clearance included.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Anchor className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">CIF European Ports</h4>
                  <p className="text-xs text-slate-600">Direct ocean freight to Rotterdam, Hamburg, Antwerp, Genoa, or air cargo dispatch.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Card — Solid Architectural Frame */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-12 shadow-[0_10px_35px_-5px_rgba(4,26,18,0.1)] border border-slate-200/90 reveal-init delay-150 relative overflow-hidden">
            <div className="corner-tick-tl" />
            <div className="corner-tick-tr" />
            <div className="corner-tick-bl" />
            <div className="corner-tick-br" />

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Contact / Buyer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jean Dupont"
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. EuroSpice Trading B.V."
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +31 20 123 4567"
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Product Lot of Interest</label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Multi-Product Assorted Container">Multi-Product Assorted Container</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Estimated Order Volume</label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  >
                    <option value="Evaluation Sample (1 Kg - 5 Kg)">Evaluation Sample (1 Kg - 5 Kg)</option>
                    <option value="Trial Pallet (100 Kg - 500 Kg)">Trial Pallet (100 Kg - 500 Kg)</option>
                    <option value="Commercial Lot (1 MT - 5 MT)">Commercial Lot (1 MT - 5 MT)</option>
                    <option value="Full Container Load (FCL 20ft / 40ft)">Full Container Load (FCL 20ft / 40ft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Discharge Port / Delivery City</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g. CIF Rotterdam Port, Netherlands"
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">Specific Grading & Packaging Specifications</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Require 8mm+ Extra Bold Cardamom pods in 10kg corrugated cases, non-ETO certified with COA..."
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="relative overflow-hidden w-full py-4.5 px-6 bg-gradient-to-r from-[#041A12] via-[#082E20] to-[#041A12] hover:brightness-110 active:scale-98 text-white border border-amber-400/50 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-3 cursor-pointer font-mono group ring-2 ring-emerald-500/10"
              >
                <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <Send className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform relative z-10" />
                <span className="relative z-10">Submit RFQ to Export Desk via WhatsApp (1-Click)</span>
              </button>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs text-center font-medium">
                  Your RFQ has been prepared and opened in WhatsApp. Our export managers will respond shortly!
                </div>
              )}

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

