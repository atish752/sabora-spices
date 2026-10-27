import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Leaf, 
  ArrowRight
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
    quantity: ''
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
    const message = `Hello SABORA SPICES, I am visiting your website and would like an instant quotation for whole spices / makhana. Please share current mandi rates and grade availability.`;
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
          notes: 'Quick 10-Second Lead Desk Submission',
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
      }, 2500);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-md max-h-[90vh] flex flex-col bg-gradient-to-b from-[#052117] via-[#082E20] to-[#041A12] text-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-amber-400/40 overflow-hidden animate-scaleUp cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Ambient Corner Glows */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-emerald-500/15 rounded-full blur-xl pointer-events-none" />

        {/* Prominent High-Contrast Close Button ("Cut") on Top Right */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-30 inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-900/90 hover:bg-rose-600 text-stone-100 hover:text-white transition-all duration-200 border-2 border-stone-600 hover:border-rose-400 shadow-xl cursor-pointer group active:scale-90 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Close popup (Cut)"
          title="Close (Esc)"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Modal Interior (Scrollable container in case of very short screens) */}
        <div className="overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-3 sm:space-y-3.5 flex-1">
          
          {/* Header */}
          <div className="space-y-1 pr-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Wholesale Desk</span>
            </div>
            
            <h2 id="modal-headline" className="font-serif text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
              Looking for Wholesale Spices or Makhana?
            </h2>
            
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Get direct mandi rates & lab CoA for Cardamom, Makhana & Turmeric.
            </p>
          </div>

          {/* WhatsApp 1-Click Direct Button (Instant Option) */}
          <div>
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md border border-emerald-400/40 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp (+91 78809 06610)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-0.5">
            <div className="border-t border-white/15 w-full" />
            <span className="bg-[#082E20] px-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 whitespace-nowrap">
              or Send Quick RFQ Form
            </span>
          </div>

          {/* Lead Form */}
          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="font-serif text-base font-bold text-white">
                Inquiry Received!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Our sourcing manager will contact you on WhatsApp / Phone shortly with current mandi pricing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Firm *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm placeholder-stone-400"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm placeholder-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm"
                  >
                    <option value="Green Cardamom" className="bg-stone-900">Green Cardamom (Kerala)</option>
                    <option value="Makhana" className="bg-stone-900">Makhana / Fox Nuts (Bihar)</option>
                    <option value="Turmeric" className="bg-stone-900">Turmeric Fingers (Salem)</option>
                    <option value="Black Pepper" className="bg-stone-900">Whole Black Pepper (Kali Mirch)</option>
                    <option value="Cumin" className="bg-stone-900">Whole Cumin Seeds / Jeera</option>
                    <option value="Cinnamon" className="bg-stone-900">Whole Cinnamon / Dalchini</option>
                    <option value="Cloves & Other Spices" className="bg-stone-900">Cloves & Other Whole Spices</option>
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Approx Qty (e.g. 500 kg)"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-800/60 focus:border-amber-400 focus:outline-none text-white text-xs sm:text-sm placeholder-stone-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Inquiry...' : 'Submit Wholesale Inquiry'}</span>
              </button>
            </form>
          )}

          {/* Prominent Dismiss Button ("No thanks / No times") */}
          <div className="pt-0.5">
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 px-3 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 border border-white/10"
            >
              <span>✕ No thanks, continue browsing</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
