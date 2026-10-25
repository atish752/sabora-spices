import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Package, 
  ArrowRight,
  Phone
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const POPUP_STORAGE_KEY = 'sabora_lead_modal_dismissed';

export default function TenSecondLeadModal({ onSubmitInquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: 'Green Cardamom',
    quantity: '',
    requirement: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Trigger popup after exactly 10 seconds of remaining on the website
  useEffect(() => {
    try {
      const alreadyDismissed = sessionStorage.getItem(POPUP_STORAGE_KEY);
      if (alreadyDismissed) {
        return; // Don't annoy the visitor repeatedly in the same session
      }
    } catch (e) {}

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    try {
      sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
    } catch (e) {}
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDirectWhatsApp = () => {
    const message = `Hello SABORA SPICES, I am visiting your website and would like an instant quotation for whole spices / makhana. Please share current rates and grade availability.`;
    SITE_CONFIG.openWhatsApp(message);
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    try {
      if (onSubmitInquiry) {
        await onSubmitInquiry({
          name: formData.name,
          phone: formData.phone,
          product: formData.product,
          quantity: formData.quantity || 'Wholesale batch inquiry',
          notes: formData.requirement || 'Quick 10-Second Lead Desk Submission',
          source: '10s_lead_popup'
        });
      }
      setSubmitted(true);
      try {
        sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
      } catch (e) {}

      // Automatically close after a pleasant confirmation pause
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    } catch (err) {
      console.error("Popup inquiry submit error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-md max-h-[85vh] flex flex-col bg-gradient-to-b from-[#041A12] via-[#082E20] to-[#03140E] text-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-amber-400/40 overflow-hidden animate-scaleUp cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Ambient Glows */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Prominent High-Contrast Close Button ("Cut") on Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-30 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-rose-600 text-stone-200 hover:text-white transition-all duration-200 border border-white/20 hover:border-rose-400 shadow-lg cursor-pointer group active:scale-90 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Close inquiry popup"
          title="Close (Esc)"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Modal Interior (Scrollable container so it fits comfortably on any screen height) */}
        <div className="overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-4 flex-1">
          
          {/* Header */}
          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Wholesale Desk</span>
            </div>
            
            <h2 id="modal-headline" className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Looking for Wholesale Spices or Makhana?
            </h2>
            
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Get direct mandi rates, laboratory CoA details, and fast dispatch from our Delhi hub.
            </p>
          </div>

          {/* Quick Value Props Chips */}
          <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-semibold text-emerald-200">
            <div className="py-1.5 px-2 rounded-lg bg-emerald-950/70 border border-emerald-800/40 truncate">
              Kerala Cardamom
            </div>
            <div className="py-1.5 px-2 rounded-lg bg-emerald-950/70 border border-emerald-800/40 truncate">
              Mithila Makhana
            </div>
            <div className="py-1.5 px-2 rounded-lg bg-emerald-950/70 border border-emerald-800/40 truncate">
              Salem Turmeric
            </div>
          </div>

          {/* WhatsApp 1-Click Direct Button (Instant Option) */}
          <div className="space-y-1 pt-0.5">
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/40 border border-emerald-400/40 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp (+91 78809 06610)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-center text-[11px] sm:text-xs text-stone-400">
              Instant response • Live spot rates • Catalog on WhatsApp
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-white/15 w-full" />
            <span className="bg-[#062419] px-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 whitespace-nowrap">
              or Send Quick RFQ Form
            </span>
          </div>

          {/* Lead Form */}
          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-center space-y-2.5 animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="font-serif text-lg font-bold text-white">
                Inquiry Received!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Our sourcing manager will contact you via WhatsApp / Phone shortly with current pricing and batch details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-stone-300 font-medium text-xs">Your Name / Firm *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm placeholder-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-300 font-medium text-xs">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm placeholder-stone-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-stone-300 font-medium text-xs">Crop of Interest</label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm"
                  >
                    <option value="Green Cardamom" className="bg-stone-900">Green Cardamom (Kerala)</option>
                    <option value="Makhana" className="bg-stone-900">Makhana / Fox Nuts (Bihar)</option>
                    <option value="Turmeric" className="bg-stone-900">Turmeric Fingers (Salem)</option>
                    <option value="Cloves & Other Spices" className="bg-stone-900">Cloves & Other Whole Spices</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-300 font-medium text-xs">Approx. Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 kg / 2 Tons"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm placeholder-stone-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Inquiry...' : 'Submit Wholesale Inquiry'}</span>
              </button>
            </form>
          )}

          {/* Prominent Dismiss Button ("No thanks / Cut") */}
          <div className="pt-1 border-t border-white/10">
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 px-3 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 border border-white/10"
            >
              <span>✕ No thanks, continue browsing website</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
