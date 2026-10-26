/**
 * Site Configuration for SABORA SPICES
 * Based on SABORA SPICES.txt and client specifications
 */
export const SITE_CONFIG = {
  name: "Sabora Spices",
  tagline: "Whole Spices & Makhana. Sourced with Purpose.",
  subTagline: "India-Based Sourcing and Supply for Domestic and International Buyers",
  
  // Official Contact Information from SABORA SPICES.txt
  address: "Jahangirpuri, Delhi – 110033, India",
  phones: [
    { display: "+91 78809 06610", raw: "917880906610", primary: true },
    { display: "+91 95327 01582", raw: "919532701582", primary: false }
  ],
  primaryPhone: "+91 78809 06610",
  secondaryPhone: "+91 95327 01582",
  primaryPhoneRaw: "917880906610",
  secondaryPhoneRaw: "919532701582",
  
  whatsappNumber: "917880906610",
  whatsappDisplayNumber: "+91 78809 06610",
  
  email: "info@saboraspices.com",
  inquiryEmail: "sales@saboraspices.com",
  website: "www.saboraspices.com",
  
  workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM IST (WhatsApp Desk Active 24/7)",
  
  // Key Core Categories
  coreCategories: [
    "Whole Green Cardamom",
    "Makhana (Fox Nuts)",
    "Whole Turmeric Fingers",
    "Whole Cumin Seeds (Jeera)",
    "Whole Cinnamon (Dalchini)",
    "Whole Black Pepper & Cloves"
  ],

  // Sourcing Origins
  origins: {
    cardamom: "Kerala & Western Ghats (Idukki District)",
    makhana: "Mithila Region, Bihar",
    turmeric: "Salem & Nizamabad, India"
  },

  // Compliance & Quality Highlights
  certifications: [
    { name: "FSSAI Compliant", desc: "Food Safety & Standards Authority of India", badge: "Mandatory Standard" },
    { name: "ISO 9001:2015 Principles", desc: "Quality Management Systems (QMS)", badge: "Quality Assured" },
    { name: "ISO 22000:2018 Principles", desc: "Food Safety Management Systems (FSMS)", badge: "Food Safety" },
    { name: "FoSCoS Reporting", desc: "Periodic laboratory test reports upload", badge: "Regulatory Portal" },
    { name: "Tested Before Dispatch", desc: "Approved Food Testing Laboratory COA", badge: "Release Control" }
  ],

  // Menu Items (matching screenshot: WhatsApp Image 2026-10-24 at 11.42.47.jpeg)
  menuItems: [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "about", label: "About Us", href: "#about" },
    { 
      id: "products", 
      label: "Products", 
      href: "#products",
      submenu: [
        { label: "Whole Green Cardamom", href: "#products", filter: "cardamom" },
        { label: "Makhana (Fox Nuts)", href: "#products", filter: "makhana" },
        { label: "Whole Turmeric Fingers", href: "#products", filter: "turmeric" },
        { label: "Cloves, Pepper, Cumin & Spices", href: "#products", filter: "other" }
      ]
    },
    { id: "sourcing", label: "Sourcing & Origin", href: "#sourcing" },
    { id: "why-sabora", label: "Why Sabora", href: "#why-sabora" },
    { id: "quality", label: "Quality & Food Safety", href: "#quality" },
    { id: "lab-testing", label: "Laboratory Testing", href: "#lab-testing" },
    { id: "compliance", label: "Regulatory Compliance", href: "#compliance" },
    { id: "export", label: "International & Export Supply", href: "#export" },
    { id: "faq", label: "FAQ", href: "#faq" },
    { id: "contact", label: "Contact Us", href: "#contact" }
  ],

  buildWhatsAppUrl: (message) => {
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  },

  openWhatsApp: (message) => {
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  },

  getProductWhatsAppMessage: (product, customDetails = "") => {
    if (!product) return "Hello SABORA SPICES, I am interested in sourcing whole spices and makhana.";
    let msg = `Hello SABORA SPICES team,\n\nI am requesting commercial supply terms and a quotation for *${product.name}*.\n\n`;
    if (customDetails) {
      msg += `*Requirement Details:*\n${customDetails}\n\n`;
    }
    if (product.gradesAvailable && product.gradesAvailable.length > 0) {
      msg += `*Preferred Grades:* ${product.gradesAvailable.slice(0, 2).join(', ')}\n`;
    }
    if (product.moq) {
      msg += `*Indicative MOQ:* ${product.moq}\n`;
    }
    msg += `\nPlease share:\n1. Current wholesale pricing & batch availability\n2. Available packaging formats\n3. Lab test COA & delivery schedule\n\nThank you!`;
    return msg;
  }
};

export default SITE_CONFIG;
