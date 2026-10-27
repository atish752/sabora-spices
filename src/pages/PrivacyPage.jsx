import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Cookie, 
  Globe2, 
  FileCheck, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function PrivacyPage({ onNavigate, onOpenQuoteModal, onSubmitInquiry }) {
  const lastUpdated = "October 24, 2026";

  return (
    <div className="w-full bg-[#F8FAF9]">
      {/* 1. Header Banner */}
      <PageHeaderBanner
        badge="Legal & Compliance"
        title="Privacy Policy"
        subtitle="Our institutional commitment to data privacy, commercial buyer confidentiality, international GDPR compliance, and transparent trade practices."
        breadcrumbCurrent="Privacy Policy"
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 2. Main Policy Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Table of Contents & Quick Summary (Left Col - 4 cols on lg) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm sticky top-24 space-y-5">
                <div className="space-y-1 pb-4 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
                    Official Document
                  </span>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    SABORA SPICES Privacy Policy
                  </h2>
                  <p className="text-xs text-stone-500">
                    Version 2.4 • Effective: {lastUpdated}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs mb-2">
                    Policy Navigation
                  </div>
                  {[
                    { label: "1. Scope & Applicability", id: "#scope" },
                    { label: "2. Information We Collect", id: "#collection" },
                    { label: "3. Purpose of Processing", id: "#purposes" },
                    { label: "4. Global & GDPR Compliance", id: "#gdpr" },
                    { label: "5. Cookie Policy & Preferences", id: "#cookies" },
                    { label: "6. Security & Confidentiality", id: "#security" },
                    { label: "7. Your Data Protection Rights", id: "#rights" },
                    { label: "8. Grievance Officer & Contact", id: "#grievance" }
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
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm text-[#0F3D2E] space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Commercial Confidentiality</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      All buyer inquiries, target volumes, custom packaging specifications, and price quotes remain strictly confidential.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : onNavigate && onNavigate('contact')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D2E] hover:bg-[#165641] text-white text-xs sm:text-sm font-bold transition-all text-center cursor-pointer shadow-xs"
                  >
                    Contact Privacy Desk
                  </button>
                </div>
              </div>
            </div>

            {/* Comprehensive Policy Clauses (Right Col - 8 cols on lg) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-10 text-stone-800 text-sm sm:text-base leading-relaxed">
              
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0F3D2E] tracking-tight">
                  Institutional Privacy Statement
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                  At <strong>SABORA SPICES</strong>, operated from Jahangirpuri, Delhi – 110033, India, we recognize the importance of commercial privacy and data security. Whether you are an Indian wholesale buyer, an international importer, a culinary distributor, or a food manufacturer, your trade inquiries, entity credentials, and transactional details are handled with institutional rigor and strict confidentiality.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                  This Privacy Policy delineates how we collect, process, maintain, and safeguard personal and commercial data when you visit our website (<strong>www.saboraspices.com</strong>), communicate via our WhatsApp desk, or submit formal Requests for Quotation (RFQs).
                </p>
              </div>

              {/* Clause 1: Scope */}
              <div id="scope" className="space-y-3 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>Section 1</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  1. Scope & Applicability
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                  This policy applies to all visitors, commercial prospective buyers, existing institutional clients, and supply chain partners globally. SABORA SPICES engages exclusively in wholesale agricultural sourcing and supply (Whole Green Cardamom, Makhana/Fox Nuts, Whole Turmeric, and associated whole spices) and does not engage in retail consumer profiling or unauthorized data commodification.
                </p>
              </div>

              {/* Clause 2: Data Collection */}
              <div id="collection" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Section 2</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  2. Information We Collect
                </h3>
                <div className="space-y-3 text-sm text-stone-700">
                  <p>We collect only the minimum necessary data required for lawful commercial trade, specifically:</p>
                  <ul className="space-y-2 list-disc list-inside text-stone-700 pl-2">
                    <li>
                      <strong>Entity Identity & Registration:</strong> Registered business name, trade category, GSTIN (for Indian buyers), VAT/Tax Identification Number, and Import Export Code (IEC) for international cross-border transactions.
                    </li>
                    <li>
                      <strong>Authorized Contact Credentials:</strong> Name, professional designation, official telephone number, WhatsApp business number, and corporate email address.
                    </li>
                    <li>
                      <strong>Trade & Sourcing Specifications:</strong> Product requirements (e.g., 7mm/8mm Cardamom, 4-Suta/5-Suta Makhana), estimated lot volume, target packaging format, destination port (FOB/CIF terms), and sample delivery coordinates.
                    </li>
                    <li>
                      <strong>Technical & Log Data:</strong> Device operating system, browser version, anonymized IP address, referring URL, and browsing timestamp to safeguard our infrastructure from denial-of-service attempts.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Clause 3: Purpose of Processing */}
              <div id="purposes" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Section 3</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  3. Legal Grounds & Purpose of Processing
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  We collect and process your commercial data exclusively under lawful commercial bases, including pre-contractual negotiation, contract execution, statutory compliance, and legitimate business interests:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="font-bold text-[#0F3D2E]">Quotation & Contract Execution</span>
                    <p className="text-stone-600">Generating spot quotations, proforma invoices, batch specifications, and dispatch agreements.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="font-bold text-[#0F3D2E]">Export & Statutory Compliance</span>
                    <p className="text-stone-600">Fulfilling FSSAI, Spices Board of India, customs clearance, and Certificate of Analysis (CoA) documentation.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="font-bold text-[#0F3D2E]">Logistics & Delivery Coordination</span>
                    <p className="text-stone-600">Sharing consignment details with accredited freight forwarders, container carriers, and courier partners.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="font-bold text-[#0F3D2E]">Commercial Relationship Support</span>
                    <p className="text-stone-600">Providing direct WhatsApp and telephonic trade updates regarding seasonal crop arrival and harvest grade pricing.</p>
                  </div>
                </div>
              </div>

              {/* Clause 4: International & GDPR Compliance */}
              <div id="gdpr" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Section 4</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  4. International Data Transfers & GDPR Compliance
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  As an international spice sourcing partner serving buyers across the European Union, United Kingdom, GCC, Southeast Asia, and the Americas, SABORA SPICES aligns its cross-border data handling with the principles of the <strong>General Data Protection Regulation (GDPR - EU 2016/679)</strong> and the <strong>Digital Personal Data Protection Act, 2023 (India)</strong>:
                </p>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Third-Party Commercialization:</strong> We never sell, rent, monetize, or barter trade client records with third-party advertisers.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Encrypted Cross-Border Data:</strong> Any international transfer of shipping instructions occurs over TLS 1.3 encrypted channels.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>EU/UK Buyer Safeguards:</strong> Importers based in Europe enjoy full rights to request confirmation of their stored business credentials and export audit files.</span>
                  </div>
                </div>
              </div>

              {/* Clause 5: Cookie Policy */}
              <div id="cookies" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Cookie className="w-4 h-4" />
                  <span>Section 5</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  5. Cookie Policy & Preferences
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  Our website uses cookies and local storage tokens strictly to maintain operational functionality, remember your consent preferences, and ensure seamless quote submissions.
                </p>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                    <div className="font-bold text-stone-900">A. Essential / Strictly Necessary Cookies</div>
                    <p className="text-stone-600">Required for website navigation, security verification, and RFQ submission state. These cannot be switched off.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                    <div className="font-bold text-stone-900">B. Functional & Preference Tokens</div>
                    <p className="text-stone-600">Used to remember your cookie consent decision (<code className="bg-stone-200 px-1 rounded text-stone-800">sabora_cookie_consent</code>) and one-time notification preferences.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                    <div className="font-bold text-stone-900">C. Aggregated Analytics</div>
                    <p className="text-stone-600">Anonymous metrics to monitor site performance, page load velocities across global geographies, and ensure high reliability for international buyers.</p>
                  </div>
                </div>
                <p className="text-xs text-stone-500">
                  You can modify your cookie preferences at any time through our on-site cookie banner or by adjusting your web browser settings to block or delete cookies.
                </p>
              </div>

              {/* Clause 6: Security Safeguards */}
              <div id="security" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>Section 6</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  6. Technical Security & Data Retention
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  We deploy industry-standard technical and organizational security controls to protect your data against unauthorized access, alteration, disclosure, or destruction:
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm text-stone-700 pl-2">
                  <li>256-bit TLS/SSL encryption for all data transmissions across our platform.</li>
                  <li>Role-based access controls limiting commercial quotation access strictly to authorized sourcing managers.</li>
                  <li>Inquiry records and commercial trade documentation are retained in accordance with Indian tax, GST, and international shipping audit regulations (typically 7 to 8 financial years).</li>
                </ul>
              </div>

              {/* Clause 7: Buyer Rights */}
              <div id="rights" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Section 7</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  7. Your Data Protection Rights
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  Regardless of your geographical location, you maintain explicit rights regarding your commercial contact information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <strong>Right to Access & Confirmation:</strong> Request a summary of your entity records on file.
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <strong>Right to Rectification:</strong> Promptly correct outdated contact or corporate tax information.
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <strong>Right to Erasure:</strong> Request deletion of non-statutory records where no ongoing trade contract exists.
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <strong>Right to Opt-Out:</strong> Unsubscribe immediately from wholesale price updates with one click or WhatsApp text.
                  </div>
                </div>
              </div>

              {/* Clause 8: Grievance Officer */}
              <div id="grievance" className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>Section 8</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  8. Grievance Redressal & Institutional Contact
                </h3>
                <p className="text-sm leading-relaxed text-stone-700">
                  For questions regarding this policy, data protection inquiries, or to exercise your privacy rights, please reach our designated Grievance & Compliance Desk:
                </p>
                
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs text-stone-800">
                  <div className="font-bold text-sm text-[#0F3D2E]">
                    SABORA SPICES — Legal & Privacy Compliance Cell
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Headquarters: Jahangirpuri, Delhi – 110033, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Phone: +91 78809 06610 / +91 95327 01582</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col space-y-0.5 text-xs">
                        <span className="font-semibold text-stone-900">Email Directory:</span>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-3xs sm:text-2xs">
                          <a href="mailto:info@saboraspices.com" className="text-stone-700 hover:text-emerald-700 transition-colors">
                            <span className="text-stone-400 font-sans">Info: </span>info@saboraspices.com
                          </a>
                          <a href="mailto:sales@saboraspices.com" className="text-stone-700 hover:text-emerald-700 transition-colors">
                            <span className="text-stone-400 font-sans">Sales: </span>sales@saboraspices.com
                          </a>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-3xs sm:text-2xs text-stone-600">
                          <a href="mailto:contact@saboraspices.com" className="text-stone-700 hover:text-emerald-700 transition-colors">
                            <span className="text-stone-400 font-sans">Desk: </span>contact@saboraspices.com
                          </a>
                          <a href="mailto:support@saboraspices.com" className="text-stone-700 hover:text-emerald-700 transition-colors">
                            <span className="text-stone-400 font-sans">Support: </span>support@saboraspices.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                      <span>Response SLA: Within 48 working hours</span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-3xs text-stone-700">
                      <div><strong className="text-stone-900">GSTIN:</strong> {SITE_CONFIG.gstin}</div>
                      <div className="flex items-center gap-1">
                        <img src="/images/fssai-logo.png" alt="FSSAI" className="h-3 w-auto object-contain" />
                        <span><strong className="text-stone-900">FSSAI Lic:</strong> {SITE_CONFIG.fssaiNumber}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src="/images/iso-logo.svg" alt="ISO 9001:2015" className="h-3 w-auto object-contain" />
                        <span><strong className="text-stone-900">ISO 9001:2015:</strong> {SITE_CONFIG.isoNumber}</span>
                      </div>
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
