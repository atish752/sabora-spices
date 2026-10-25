import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Globe, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Building,
  Leaf
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ContactRfqSection({ onSubmitInquiry, preselectedProduct = null }) {
  const [formData, setFormData] = useState({
    product: preselectedProduct?.name || "Whole Green Cardamom (Elaichi)",
    quantity: "500 Kg",
    grade: "8mm+ Extra Bold",
    packaging: "Sabora-Branded Food-Grade Pouches",
    destination: "Delhi NCR, India",
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  // Synchronize product selection when user clicks Request Quote on a specific product card
  React.useEffect(() => {
    if (preselectedProduct?.name) {
      setFormData(prev => ({
        ...prev,
        product: preselectedProduct.name,
        grade: preselectedProduct.gradesAvailable?.[0] || prev.grade
      }));
    }
  }, [preselectedProduct]);

  const productOptions = [
    "Whole Green Cardamom (Elaichi)",
    "Makhana (Fox Nuts)",
    "Whole Turmeric Fingers (Haldi)",
    "Whole Cloves (Laung)",
    "Whole Black Pepper (Kali Mirch)",
    "Other Whole Spices (Custom Inquiry)"
  ];

  const packagingOptions = [
    "Sabora-Branded Food-Grade Pouches",
    "Bulk Sacks / Multiwall Paper Bags (25kg/50kg)",
    "Buyer-Specific & Private-Label Packaging",
    "Custom Packaging Specification"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmitInquiry) {
        await onSubmitInquiry(formData);
      }
      setLastSubmittedData(formData);
      setSubmitted(true);
    } catch (err) {
      console.warn("Inquiry submission error:", err);
      setLastSubmittedData(formData);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const d = lastSubmittedData || formData;
    const msg = `*Commercial RFQ — SABORA SPICES*\n\n` +
      `*Product:* ${d.product}\n` +
      `*Quantity:* ${d.quantity}\n` +
      `*Grade/Specs:* ${d.grade}\n` +
      `*Packaging:* ${d.packaging}\n` +
      `*Destination:* ${d.destination}\n` +
      `*Contact Name:* ${d.name}\n` +
      `*Company:* ${d.company || 'Not Specified'}\n` +
      `*Phone/WhatsApp:* ${d.phone}\n` +
      (d.email ? `*Email:* ${d.email}\n` : '') +
      (d.notes ? `*Notes:* ${d.notes}\n\n` : '\n') +
      `Please provide current availability, quotation, and delivery schedule. Thank you!`;

    SITE_CONFIG.openWhatsApp(msg);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <Mail className="w-3.5 h-3.5 text-emerald-700" />
            <span>Wholesale Sourcing Desk</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Request a Wholesale Quote
          </h2>

          <p className="text-sm text-stone-600 leading-relaxed font-normal">
            Tell us your product requirements, volume, and destination. Fast response from our Delhi logistics hub.
          </p>
        </div>

        {/* 2-Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#041A12] text-white p-8 rounded-3xl shadow-xl space-y-6 border border-emerald-900/50">
              
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/10 p-1 flex items-center justify-center border border-amber-400/40">
                  <img src="/images/logo.png" alt="Sabora Spices" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">SABORA SPICES</h3>
                  <p className="text-xs text-amber-300 font-medium">Whole Spices & Makhana Sourcing</p>
                </div>
              </div>

              {/* Contact List */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-200">
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Operating Address:</span>
                    <span>Jahangirpuri, Delhi – 110033, India</span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Direct Phone Lines:</span>
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <a href={`tel:${SITE_CONFIG.primaryPhoneRaw}`} className="text-stone-300 hover:text-amber-300 transition-colors">
                        +91 78809 06610 (Primary Desk)
                      </a>
                      <a href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`} className="text-stone-300 hover:text-amber-300 transition-colors">
                        +91 95327 01582
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600/30 text-emerald-300 shrink-0 mt-0.5 border border-emerald-500/30">
                    <MessageCircle className="w-4 h-4 fill-emerald-300 text-emerald-300" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Official WhatsApp Desk:</span>
                    <a 
                      href={SITE_CONFIG.buildWhatsAppUrl("Hello SABORA SPICES, I would like to inquire about wholesale spices.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:underline font-mono"
                    >
                      +91 78809 06610 (Instant 1-Click)
                    </a>
                  </div>
                </div>

                {/* Website & Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-stone-300 shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Website & Inquiries:</span>
                    <span className="text-stone-300 font-mono">www.saboraspices.com</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-stone-300 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Working Hours:</span>
                    <span className="text-stone-300">Mon – Sat: 9:00 AM – 7:30 PM IST</span>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="pt-2">
                <button
                  onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I would like to request an immediate product catalog and price quote.")}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>

            </div>

            {/* Response Guarantee Badge */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">Prompt Sourcing Evaluation</span>
                <span className="text-stone-600">All domestic and international trade enquiries are reviewed within 4 business hours.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive RFQ Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-md">
            
            {submitted ? (
              <div className="py-8 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-stone-900">{lastSubmittedData?.name}</strong>. Our sourcing desk is reviewing your requirements for <strong className="text-[#0F3D2E]">{lastSubmittedData?.product}</strong>.
                  </p>
                </div>

                {/* 1-Click WhatsApp Transmission Option */}
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 max-w-md mx-auto text-left">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F3D2E] uppercase font-mono">
                    <Leaf className="w-4 h-4 text-emerald-700" />
                    <span>Fast Track Sourcing Desk</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Want an instant quote? You can send all your submitted RFQ details directly to our WhatsApp sourcing manager with a single click.
                  </p>
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send RFQ to WhatsApp (+91 78809 06610)</span>
                  </button>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline font-medium"
                >
                  Submit another commercial inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    Request a Quotation & Sourcing Discussion
                  </h3>
                  <p className="text-sm text-stone-500">
                    Fill out the parameters below to receive our formal quotation and availability terms.
                  </p>
                </div>

                {/* Product Selection & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Product Required *</label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    >
                      {productOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Estimated Quantity *</label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 500 Kg / 2 Metric Tons"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Grade & Packaging */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Preferred Grade / Size</label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="e.g. 8mm+ Extra Bold, 6-Suta Jumbo"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Packaging Format</label>
                    <select
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    >
                      {packagingOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-700">Delivery Destination *</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, Bangalore / CIF Rotterdam, London, Dubai"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Contact Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contact Person Name"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Business / Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Royal Spices Ltd."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-stone-700">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-700">Additional Specifications / Requirements</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Specify any laboratory testing (COA), moisture limits, private label artwork requirements, or delivery schedule..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-sm sm:text-base text-stone-900 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>{isSubmitting ? "Submitting RFQ..." : "Submit Quotation Request"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const msg = `*Quick Sourcing Enquiry — SABORA SPICES*\n\n` +
                        `Product: ${formData.product}\n` +
                        `Quantity: ${formData.quantity}\n` +
                        `Destination: ${formData.destination}\n` +
                        `Contact: ${formData.name || 'Buyer'} (${formData.phone || 'N/A'})\n\n` +
                        `Please share current availability and rates.`;
                      SITE_CONFIG.openWhatsApp(msg);
                    }}
                    className="py-3 px-5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-800 font-bold text-sm sm:text-base border border-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>WhatsApp Directly</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
