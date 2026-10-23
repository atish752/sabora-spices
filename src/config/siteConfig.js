export const SITE_CONFIG = {
  name: "Sabora Spices",
  tagline: "Artisanal Whole Spices & European Export Purveyors",
  subTagline: "Single-Estate Terroir | Optical Sortex Cleaned | EU MRL Compliant | Private Label & Bulk Freight",
  instagramUrl: "https://www.instagram.com/saboraspices/",
  instagramHandle: "@saboraspices",
  
  // WhatsApp settings (Used for 1-click inquiries)
  whatsappNumber: "919876543210",
  whatsappDisplayNumber: "+91 98765 43210",
  
  phone: "+91 98765 43210",
  email: "exports@saboraspices.com",
  inquiryEmail: "orders@saboraspices.com",
  address: "Spice Processing & Export Terminal, Cochin / Tuticorin, India",
  
  businessHours: "Mon - Sat: 9:00 AM - 7:00 PM IST (European & Global WhatsApp Desk 24/7)",
  
  stats: {
    experience: "15+ Years",
    countriesExported: "28+ Nations (EU, UK, Middle East)",
    annualSupply: "2,500+ MT",
    purityRate: "99.8% Sortex Grade",
    clientSatisfaction: "4.95 / 5.0 Rating"
  },
  
  certifications: [
    { name: "EU MRL Compliant", code: "Reg. (EC) 396/2005", badge: "European Standard" },
    { name: "FSSC 22000 / ISO", code: "Food Safety Mgmt", badge: "International Standard" },
    { name: "Spice Board India", code: "Registered Exporter", badge: "Quality Assured" },
    { name: "APEDA Certified", code: "Export Grade Agro", badge: "Govt. of India" },
    { name: "Non-ETO & Steam Ready", code: "Zero Harmful Residues", badge: "Aroma Locked" }
  ],

  // Utility to generate a 1-click WhatsApp URL with pre-filled message
  buildWhatsAppUrl: (encodedMessage) => {
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
  },

  // Safe launcher that works reliably on desktop and mobile browsers
  openWhatsApp: (encodedMessage) => {
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
