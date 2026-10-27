import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import { 
  FileText, 
  Scale, 
  Truck, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  AlertTriangle,
  Building2
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function TermsPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const lastUpdated = "October 24, 2026";

  return (
    <div className="w-full bg-[#F8FAF9]">
      {/* 1. Header Banner */}
      <PageHeaderBanner
        badge="Institutional Framework"
        title="Terms & Conditions"
        subtitle="Standard commercial terms, grading covenants, delivery parameters, and international trade protocols governing SABORA SPICES transactions."
        breadcrumbCurrent="Terms & Conditions"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 2. Main Terms Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Table of Contents & Quick Summary (Left Col - 4 cols on lg) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm sticky top-24 space-y-5">
                <div className="space-y-1 pb-4 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
                    Commercial Code
                  </span>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    SABORA SPICES Trade Terms
                  </h2>
                  <p className="text-xs text-stone-500">
                    B2B Wholesale & Export Edition • {lastUpdated}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs mb-2">
                    Terms Navigation
                  </div>
                  {[
                    { label: "1. Scope & Nature of Transactions", id: "#scope" },
                    { label: "2. Grading & Quality Standards", id: "#quality" },
                    { label: "3. Quotations, Pricing & Validity", id: "#pricing" },
                    { label: "4. Purchase Orders & Invoicing", id: "#orders" },
                    { label: "5. Payment Terms & Settlement", id: "#payment" },
                    { label: "6. Shipping & Incoterms 2020", id: "#shipping" },
                    { label: "7. Inspection & Claims Policy", id: "#claims" },
                    { label: "8. Force Majeure & Limitation", id: "#limitation" },
                    { label: "9. Governing Law & Jurisdiction", id: "#jurisdiction" }
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.id}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(item.id);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          window.history.replaceState(null, '', item.id);
                        }
                      }}
                      className="block py-1.5 px-2 rounded-lg text-stone-600 hover:text-[#0F3D2E] hover:bg-emerald-50 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <Scale className="w-4 h-4 text-amber-700" />
                      <span>Commercial Wholesale Only</span>
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                      All contracts entered into by SABORA SPICES constitute business-to-business (B2B) commercial sales of agricultural commodities.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : onNavigate && onNavigate('contact')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D2E] hover:bg-[#165641] text-white text-xs sm:text-sm font-bold transition-all text-center cursor-pointer shadow-xs"
                  >
                    Request Contract Terms
                  </button>
                </div>
              </div>
            </div>

            {/* Comprehensive Legal Clauses (Right Col - 8 cols on lg) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-10 text-stone-800 text-sm sm:text-base leading-relaxed">
              
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0F3D2E] tracking-tight">
                  Standard Commercial Trading Terms
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                  Welcome to <strong>SABORA SPICES</strong>, headquartered at Jahangirpuri, Delhi – 110033, India. These Terms and Conditions govern all commercial quotations, sample dispatches, purchase orders, proforma invoices, supply agreements, and export shipments executed between SABORA SPICES ("Seller", "we", "our") and the procurement entity ("Buyer", "you").
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                  By requesting a quotation, issuing a Purchase Order, making an advance payment, or accepting delivery of whole spices or makhana consignments, the Buyer explicitly accepts and agrees to be bound by these commercial conditions.
                </p>
              </div>

              {/* Clause 1: Scope */}
              <div id="scope" className="space-y-3 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Clause 1</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  1. Scope & Nature of Transactions
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                  SABORA SPICES engages exclusively in commercial B2B procurement, processing, grading, packaging, and supply of whole agricultural commodities — principally <strong>Whole Green Cardamom</strong>, <strong>Makhana (Fox Nuts)</strong>, <strong>Whole Turmeric Fingers</strong>, and select whole spices. These terms apply to all transactions irrespective of whether the buyer is a domestic distributor in India or an international importer abroad.
                </p>
              </div>

              {/* Clause 2: Grading & Quality */}
              <div id="quality" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Clause 2</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  2. Grading, Specifications & Natural Crop Variations
                </h3>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>All consignments are supplied conforming to mutually agreed technical specifications, including:</p>
                  <ul className="space-y-2 list-disc list-inside pl-2">
                    <li><strong>Green Cardamom:</strong> Categorized by millimeter sieve grading (e.g., 6mm–7mm, 7mm–8mm, 8mm+ Bold), moisture percentage (&lt; 10–12%), and bulk density (g/L).</li>
                    <li><strong>Makhana (Fox Nuts):</strong> Categorized by traditional Indian sizing (4-Suta, 5-Suta, 6-Suta Handpicked), popping uniformity, moisture content (&lt; 9–10%), and absence of black hard seeds.</li>
                    <li><strong>Whole Turmeric Fingers:</strong> Certified by curcumin content percentage (3%–5%+), Salem/Nizamabad origin, bulb count, and cleanliness.</li>
                  </ul>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                    <strong>Agricultural Crop Notice:</strong> As naturally harvested agricultural crops, slight seasonal variations in pod coloration, natural aroma intensity, or seed size within internationally accepted tolerances (+/- 2–3%) do not constitute defective goods.
                  </div>
                </div>
              </div>

              {/* Clause 3: Pricing & Validity */}
              <div id="pricing" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Clause 3</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  3. Quotations, Pricing & Market Volatility
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  Agricultural spice auctions (such as Kerala cardamom auctions and Bihar makhana mandis) operate under fluctuating daily spot prices. Consequently:
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm text-stone-700 pl-2">
                  <li>Formal written quotations are valid for the period explicitly stated therein (typically <strong>24 to 72 hours</strong> from issuance).</li>
                  <li>Quotations reflect spot raw material prices, grading costs, and packaging formats specified.</li>
                  <li>Prices are quoted Ex-Works Delhi, FOB Indian Port, or CIF Destination Port as indicated on the quotation. Applicable GST (for domestic sales) or export duties/port charges are itemized transparently.</li>
                </ul>
              </div>

              {/* Clause 4: Purchase Orders */}
              <div id="orders" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Clause 4</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  4. Purchase Orders & Proforma Invoicing
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  A contract of sale becomes legally binding only upon the Seller issuing an official written <strong>Proforma Invoice (PI)</strong> or <strong>Sales Order Confirmation</strong> signed/stamped by an authorized representative of SABORA SPICES, following receipt of the Buyer's Purchase Order and agreed advance payment or Letter of Credit.
                </p>
              </div>

              {/* Clause 5: Payment Terms */}
              <div id="payment" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Clause 5</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  5. Payment Terms & Settlement Currencies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="font-bold text-[#0F3D2E]">Domestic Trade (India)</span>
                    <p className="text-stone-600">Settled in Indian Rupees (INR) via NEFT, RTGS, IMPS, or approved commercial banking instruments. Agreed advance percentage with balance payable against dispatch proof or lorry receipt (LR).</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="font-bold text-[#0F3D2E]">Export Trade (Global)</span>
                    <p className="text-stone-600">Settled in USD, EUR, or GBP via Telegraphic Transfer (TT / Wire Transfer) or Irrevocable, Confirmed Letter of Credit (LC) at sight payable against standard shipping documents (Bill of Lading, CoA, Phytosanitary, Packing List).</p>
                  </div>
                </div>
              </div>

              {/* Clause 6: Shipping & Logistics */}
              <div id="shipping" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Truck className="w-4 h-4" />
                  <span>Clause 6</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  6. Shipping, Delivery & Incoterms 2020
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  International sales are interpreted strictly in accordance with <strong>Incoterms® 2020</strong> as published by the International Chamber of Commerce (ICC):
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm text-stone-700 pl-2">
                  <li><strong>Ex-Works (EXW):</strong> Cargo made available at SABORA SPICES Delhi Logistics Hub; risk and freight responsibilities transfer upon handover.</li>
                  <li><strong>Free on Board (FOB):</strong> Delivery across ship's rail at Indian Ports (Nhava Sheva JNPT, Mundra, or Kochi). Export customs clearance in India handled by Seller.</li>
                  <li><strong>Cost, Insurance & Freight (CIF):</strong> Ocean freight and maritime cargo insurance paid to agreed destination port. Destination customs clearance, duties, and inland hauling remain Buyer's responsibility.</li>
                </ul>
              </div>

              {/* Clause 7: Inspection & Claims */}
              <div id="claims" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>Clause 7</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  7. Pre-Shipment Inspection, Quality Acceptance & Claims
                </h3>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>
                    All consignments undergo pre-dispatch quality verification and are accompanied by an official <strong>Certificate of Analysis (CoA)</strong> covering moisture, grade diameter, and microbial cleanliness.
                  </p>
                  <ul className="space-y-2 list-disc list-inside pl-2">
                    <li><strong>Pre-Shipment Samples:</strong> Buyers are encouraged to approve counter-samples prior to container loading.</li>
                    <li><strong>Inspection Window:</strong> The Buyer must inspect the cargo within <strong>7 calendar days</strong> of arrival at destination warehouse or discharge port.</li>
                    <li><strong>Grievance Procedure:</strong> Any formal claim regarding weight shortage or grade non-conformity must be supported by photographic evidence, batch numbers, and a report from an accredited independent surveyor (e.g., SGS, Bureau Veritas).</li>
                  </ul>
                </div>
              </div>

              {/* Clause 8: Force Majeure */}
              <div id="limitation" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Clause 8</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  8. Force Majeure & Limitation of Liability
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  Neither party shall be held liable for failure or delay in performance caused by circumstances beyond reasonable control, including natural catastrophic disasters, extreme agricultural crop failures, dock strikes, port congestions, armed conflicts, international sanctions, or sudden government export bans. In no event shall SABORA SPICES' total liability exceed the invoice value of the specific consignment in dispute.
                </p>
              </div>

              {/* Clause 9: Governing Law */}
              <div id="jurisdiction" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Clause 9</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  9. Governing Law & Dispute Resolution
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  These Terms and any commercial agreements shall be governed by and construed in accordance with the <strong>Laws of India</strong>. In the event of any commercial disagreement, both parties agree to first seek amicable settlement through mutual consultation. If unresolved within 30 days, disputes shall be subject to the exclusive jurisdiction of the competent courts of <strong>Delhi, India</strong>.
                </p>
                
                {/* Official Desk Box */}
                <div className="mt-6 p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs text-stone-800">
                  <div className="font-bold text-sm text-[#0F3D2E]">
                    SABORA SPICES — Commercial Contracts & Dispatch Desk
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Commercial Office: Jahangirpuri, Delhi – 110033, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Phones: +91 78809 06610 / +91 95327 01582</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Email: info@saboraspices.com / sales@saboraspices.com</span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-3xs text-stone-700">
                      <div><strong className="text-stone-900">GSTIN:</strong> {SITE_CONFIG.gstin}</div>
                      <div><strong className="text-stone-900">FSSAI Lic:</strong> {SITE_CONFIG.fssaiNumber}</div>
                      <div><strong className="text-stone-900">ISO 9001:2015:</strong> {SITE_CONFIG.isoNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
