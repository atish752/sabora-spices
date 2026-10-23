/**
 * useProducts — localStorage-aware product data and comprehensive European Luxury Homepage configuration hook.
 *
 * Supports European botanical schema, live homepage customization, section visibility toggles,
 * hero statistics, announcement marquee, terroir manifesto text, and full accordion & service controls.
 */
import { useState, useCallback } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

const LS_PRODUCTS_KEY = 'sabora_products';
const LS_HOMEPAGE_KEY = 'sabora_homepage_config';
const LS_HERO_KEY = 'sabora_hero_config';

export const DEFAULT_HOMEPAGE_CONFIG = {
  announcement: {
    enabled: true,
    badge: 'HARVEST 2025/26',
    text: 'Single-Estate Harvests • CIF European Ports (Rotterdam, Hamburg, Genoa) • Non-ETO Purity',
  },
  hero: {
    headline: 'Artisanal Whole Spices,\nDirect From Origin.',
    subheading: 'Single-estate harvests curated for European blenders, tea ateliers, and gourmet purveyors. Laser sortex-graded with direct CIF port delivery.',
    badge: 'CROP 2025/26 DIRECT HARVEST',
    ctaText: 'Inquire on WhatsApp (1-Click)',
    secondaryCtaText: 'Explore Collection',
    theme: 'emerald',
    stats: [
      { id: 1, value: '15+ Yrs', label: 'Terroir Heritage', desc: 'Generational estate farming' },
      { id: 2, value: '99.8%', label: 'Sortex Purity', desc: 'Laser optical color-graded' },
      { id: 3, value: '28+ Nations', label: 'Global Trade', desc: 'European & global network' },
      { id: 4, value: 'CIF & Air', label: 'Direct Freight', desc: 'Rotterdam, Hamburg, Genoa' },
    ]
  },
  trustBadges: {
    rating: '4.95',
    ratingScale: '/ 5.0',
    reviewCount: '1,280+ European Importers',
    pillar1Title: 'Single-Estate Terroir',
    pillar1Desc: 'Idukki, Salem & Mithila origin lots',
    pillar2Title: 'EU MRL Compliant',
    pillar2Desc: 'Non-ETO • 99.8% Sortex purity',
    pillar3Title: 'CIF European Ports',
    pillar3Desc: 'Rotterdam, Hamburg, Genoa & Air',
  },
  story: {
    title: 'The Sabora Quality Standard',
    subtitle: 'Four non-negotiable principles guiding every harvest from plantation soil to European port.',
    manifestoQuote: 'Great gastronomy begins in the soil. We believe whole spices should arrive at European blending mills and artisanal tables exactly as harvested — fragrant, unadulterated, and vibrant.',
    paragraph: 'When contracting Green Cardamom, Salem Turmeric, or Jumbo Makhana with Sabora Spices, every container delivered CIF Rotterdam or Hamburg matches the precise volatile oil density and purity of your approved sample lot.',
    items: [
      {
        num: "01",
        title: "Direct Single-Estate Terroir Procurement",
        subtitle: "Bypassing intermediary trading layers for pure provenance",
        content: "We bypass multiple mandi trading tiers by working directly with generational farmer producer organizations (FPOs) and private estate clusters. Our green cardamom is nurtured at 1,100m elevation under the tropical rainforest canopy of Idukki, Kerala; our high-curcumin golden turmeric fingers from the black alluvial soil of Salem; and our jumbo fox nuts from pristine Mithila freshwater ponds. This preserves terroir authenticity, peak volatile terpenes, and fair farmer compensation."
      },
      {
        num: "02",
        title: "Optical Sortex Color-Grading & Calibrated Sizing",
        subtitle: "99.8% purity through laser sorting and vibratory destoners",
        content: "All incoming whole crop passes through multi-tier vibratory destoners, aspirators, and advanced Sortex optical laser sorters. We eliminate immature pods, pinheads, hollow berries, and foreign organic matter with 99.8% calibrated accuracy. Cardamom pods are sorted by millimeter screens (7.5mm, 8mm+ Extra Bold), while makhana undergoes meticulous double hand-sorting to deliver uniform 5-suta and 6-suta jumbo specimens."
      },
      {
        num: "03",
        title: "European Compliance (EC 396/2005) & Laboratory COA",
        subtitle: "Strict testing for pesticide MRLs, heavy metals, and active potency",
        content: "Every commercial export lot is analyzed by accredited independent laboratories (ISO/IEC 17025 accredited). We verify volatile essential oil yield (>8% for green cardamom), curcumin potency (>4.5% for turmeric via HPLC), moisture thresholds (<10%), and pesticide residue levels strictly conforming to EU Regulation (EC) No 396/2005 and European Spice Association (ESA) benchmarks. Comprehensive Certificate of Analysis (COA) dossiers are issued with every shipment."
      },
      {
        num: "04",
        title: "Non-ETO Steam Treatment & Aroma-Lock Nitrogen Packaging",
        subtitle: "Maximum terpene preservation without chemical residues",
        content: "We completely reject Ethylene Oxide (ETO) chemical treatment, employing advanced gentle steam sterilization upon buyer specification to eradicate microbial loads while safeguarding delicate aroma terpenes. Export shipments are hermetically packed in multi-wall kraft barrier sacks with food-grade poly liners or nitrogen-flushed barrier pouches to guarantee a 24-month aroma shelf life across sea and air freight."
      }
    ]
  },
  services: {
    title: 'Tailored B2B Solutions for European Trade',
    subtitle: 'From palletized retail-ready pouches for organic supermarket chains to multi-ton container loads delivered CIF Rotterdam, Sabora Spices provides end-to-end supply chain assurance.',
    items: [
      {
        num: "01",
        badge: "OEM & European Retail Brands",
        title: "Private Label & Retail Packaging",
        description: "Launch your own branded whole spices line. We sortex grade, nitrogen flush, and package in sustainable FSC-certified kraft zipper pouches or luxury glass jars with complete multilingual European labelling.",
        features: [
          "100g to 1kg recyclable barrier pouches & amber jars",
          "Nitrogen flush technology locking volatile terpenes for 24 months",
          "Multilingual EU compliant labelling (EN, DE, FR, NL) & barcoding",
          "Accessible MOQ trial batches for emerging European gourmet brands"
        ],
        whatsappPrompt: "Hello Sabora Spices team,\n\nI am interested in Private Label / OEM retail packaging for our European brand. Could you please share available packaging formats, minimum order quantities (MOQ), and pricing?\n\nThank you!"
      },
      {
        num: "02",
        badge: "European Commodity Importers",
        title: "Bulk Ocean & Air Freight (CIF / FOB)",
        description: "Direct origin bulk supply for international spice markets. We manage complete customs documentation, APEDA export clearance, phytosanitary certificates, and container stuffing to major European ports.",
        features: [
          "25 Kg & 50 Kg multiwall kraft paper sacks with food-grade PE barrier",
          "FCL (20ft / 40ft containers) & consolidated LCL palletized cargo",
          "CIF Rotterdam, Hamburg, Antwerp, Genoa & DAP door delivery",
          "Fumigation, Phytosanitary, and non-ETO certification included"
        ],
        whatsappPrompt: "Hello Sabora Spices team,\n\nI want to inquire about bulk container load export terms, phytosanitary clearance, and CIF European port pricing (Rotterdam / Hamburg) for whole spices.\n\nThank you!"
      },
      {
        num: "03",
        badge: "Industrial Blenders & HORECA",
        title: "Institutional Supply Contracts",
        description: "Reliable, round-the-year spice procurement contracts for commercial grinding mills, masala blending houses, tea ateliers, and luxury European gastronomy groups.",
        features: [
          "Consistent batch-to-batch volatile oil and curcumin levels",
          "Scheduled monthly dispatches & reserved buffer inventory",
          "Contract volume pricing with protection against market volatility",
          "Priority batch testing with accredited Certificate of Analysis (COA)"
        ],
        whatsappPrompt: "Hello Sabora Spices team,\n\nWe are looking for long-term institutional wholesale supply contracts for our blending / food manufacturing unit. Please connect with our commercial desk.\n\nThank you!"
      }
    ]
  },
  reviews: {
    title: 'Trusted by European spice mills, tea blenders & gourmet ateliers.',
    subtitle: 'From container loads arriving at Rotterdam, Hamburg, and Genoa to retail private-label superfood packs across European organic grocers, see why commercial wholesale buyers choose Sabora Spices.',
    score: '4.95',
    scale: '/ 5.0 Rating',
    items: [
      {
        date: "18-02-2026",
        rating: 5,
        quote: "We contracted 4 metric tons of Green Cardamom (8mm Bold) delivered CIF Rotterdam for our Dutch tea blending facility. Pod sizing was extraordinarily uniform, moisture was under 9.8%, and the volatile essential oils tested at 8.1% in our laboratory. Sabora Spices is now our primary direct-origin supplier in Asia.",
        author: "Sophie van den Berg",
        designation: "Head of Procurement & R&D",
        company: "De Botanische Specerij B.V.",
        location: "Amsterdam, Netherlands"
      },
      {
        date: "14-01-2026",
        rating: 5,
        quote: "As an industrial European spice importer supplying German butchery and seasoning houses, compliance with EU Regulation (EC) 396/2005 is paramount. Sabora's Salem Turmeric tested at 4.9% curcumin with zero chemical polish residue. The APEDA export paperwork and phytosanitary certificates arrived without a single discrepancy.",
        author: "Marcus Lindner",
        designation: "Global Sourcing Director",
        company: "EuroSpice Trading GmbH",
        location: "Hamburg, Germany"
      },
      {
        date: "28-12-2025",
        rating: 5,
        quote: "For our French gourmet condiment and mustard atelier, the whole black pepper and star anise quality must be flawless. Sabora's Tellicherry black pepper had dense liter weights of 575g/L and deep aromatic pungency. Their commercial team is exceptionally attentive on WhatsApp.",
        author: "Jean-Luc Moreau",
        designation: "Master Blender & Founder",
        company: "Comptoir Artisanal des Épices",
        location: "Lyon, France"
      },
      {
        date: "05-11-2025",
        rating: 5,
        quote: "We launched private-label roasted makhana superfood snack packs across Scandinavian organic supermarkets. Sabora supplied custom-printed nitrogen-flushed stand-up zip pouches directly to our Gothenburg warehouse. Pristine milky white fox nuts with zero burnt spots.",
        author: "Astrid Lindholm",
        designation: "Co-Founder & COO",
        company: "Nordic SuperFoods AB",
        location: "Stockholm, Sweden"
      },
      {
        date: "19-10-2025",
        rating: 5,
        quote: "We ordered 2 metric tons of Green Cardamom (8mm Bold) for our packaging facility in Dubai. The aroma and uniform pod size exceeded our expectations. The nitrogen-flushed packaging arrived in pristine condition. Excellent B2B partner for multi-ton orders.",
        author: "Tariq Al-Mansoor",
        designation: "Procurement Director",
        company: "Al-Barakah Food Industries",
        location: "Dubai, UAE"
      }
    ]
  },
  sections: {
    showTicker: true,
    showTrustBadges: true,
    showCatalog: true,
    showB2BServices: true,
    showStory: true,
    showReviews: true,
    showRFQ: true,
  }
};

export const DEFAULT_HERO_CONFIG = DEFAULT_HOMEPAGE_CONFIG.hero;

function normalizeProduct(p, defaultMatch) {
  return {
    ...p,
    botanicalName: p.botanicalName || defaultMatch?.botanicalName || '',
    terroir: p.terroir || defaultMatch?.terroir || '',
    aromaNotes: Array.isArray(p.aromaNotes) && p.aromaNotes.length > 0 ? p.aromaNotes : (defaultMatch?.aromaNotes || []),
    euCompliance: p.euCompliance || defaultMatch?.euCompliance || 'EU MRL (EC) 396/2005 Compliant • Non-ETO',
    incoterms: p.incoterms || defaultMatch?.incoterms || 'CIF Rotterdam / Hamburg / Genoa | FOB Cochin',
    batchCode: p.batchCode || defaultMatch?.batchCode || 'SB-EXP-2025/26',
    gradesAvailable: Array.isArray(p.gradesAvailable) ? p.gradesAvailable : (defaultMatch?.gradesAvailable || []),
    specifications: Array.isArray(p.specifications) ? p.specifications : (defaultMatch?.specifications || []),
    packagingOptions: Array.isArray(p.packagingOptions) ? p.packagingOptions : (defaultMatch?.packagingOptions || []),
    b2bIdealFor: Array.isArray(p.b2bIdealFor) ? p.b2bIdealFor : (defaultMatch?.b2bIdealFor || []),
    pricingEnabled: Boolean(p.pricingEnabled),
    pricePerPiece: p.pricePerPiece || { value: '', label: 'Per Piece', visible: false },
    bulkPrice: p.bulkPrice || { value: '', quantityLabel: 'Per 50 Kg', visible: false },
    whatsappTemplate: (customDetails = '') => {
      if (defaultMatch?.whatsappTemplate && !customDetails) {
        return defaultMatch.whatsappTemplate();
      }
      let msg = `Hello Sabora Spices export team,\n\nI am requesting commercial wholesale terms and an official quotation for *${p.name}*${p.botanicalName ? ` (${p.botanicalName})` : ''}.\n\n`;
      if (customDetails) msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      msg += `Could you please share current wholesale pricing (CIF / FOB), MOQ, and COA specifications?\n\nThank you!`;
      return encodeURIComponent(msg);
    },
  };
}

function getStoredProducts() {
  try {
    const raw = localStorage.getItem(LS_PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => {
          const defaultMatch = DEFAULT_PRODUCTS.find(d => d.id === p.id);
          const merged = defaultMatch ? { ...defaultMatch, ...p } : p;
          return normalizeProduct(merged, defaultMatch);
        });
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function getStoredHomepageConfig() {
  try {
    const raw = localStorage.getItem(LS_HOMEPAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_HOMEPAGE_CONFIG,
        ...parsed,
        announcement: { ...DEFAULT_HOMEPAGE_CONFIG.announcement, ...(parsed.announcement || {}) },
        hero: {
          ...DEFAULT_HOMEPAGE_CONFIG.hero,
          ...(parsed.hero || {}),
          stats: Array.isArray(parsed?.hero?.stats) && parsed.hero.stats.length > 0
            ? parsed.hero.stats
            : DEFAULT_HOMEPAGE_CONFIG.hero.stats
        },
        trustBadges: { ...DEFAULT_HOMEPAGE_CONFIG.trustBadges, ...(parsed.trustBadges || {}) },
        story: {
          ...DEFAULT_HOMEPAGE_CONFIG.story,
          ...(parsed.story || {}),
          items: Array.isArray(parsed?.story?.items) && parsed.story.items.length > 0
            ? parsed.story.items
            : DEFAULT_HOMEPAGE_CONFIG.story.items
        },
        services: {
          ...DEFAULT_HOMEPAGE_CONFIG.services,
          ...(parsed.services || {}),
          items: Array.isArray(parsed?.services?.items) && parsed.services.items.length > 0
            ? parsed.services.items
            : DEFAULT_HOMEPAGE_CONFIG.services.items
        },
        reviews: {
          ...DEFAULT_HOMEPAGE_CONFIG.reviews,
          ...(parsed.reviews || {}),
          items: Array.isArray(parsed?.reviews?.items) && parsed.reviews.items.length > 0
            ? parsed.reviews.items
            : DEFAULT_HOMEPAGE_CONFIG.reviews.items
        },
        sections: { ...DEFAULT_HOMEPAGE_CONFIG.sections, ...(parsed.sections || {}) },
      };
    }
    // Check legacy hero key
    const legacyHero = localStorage.getItem(LS_HERO_KEY);
    if (legacyHero) {
      const parsedHero = JSON.parse(legacyHero);
      return {
        ...DEFAULT_HOMEPAGE_CONFIG,
        hero: {
          ...DEFAULT_HOMEPAGE_CONFIG.hero,
          ...parsedHero,
          stats: Array.isArray(parsedHero?.stats) ? parsedHero.stats : DEFAULT_HOMEPAGE_CONFIG.hero.stats
        }
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_HOMEPAGE_CONFIG;
}

export function useProducts() {
  const [products, setProducts] = useState(() => getStoredProducts() ?? DEFAULT_PRODUCTS);
  const [homepageConfig, setHomepageConfig] = useState(getStoredHomepageConfig);

  // Persist products to localStorage (excluding function)
  const saveProducts = useCallback((newProducts) => {
    const serialisable = newProducts.map(({ whatsappTemplate, ...rest }) => rest);
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(serialisable));
    // Restore function references with safe fallbacks
    const withFns = newProducts.map(p => {
      const defaultMatch = DEFAULT_PRODUCTS.find(d => d.id === p.id);
      return normalizeProduct(p, defaultMatch);
    });
    setProducts(withFns);
  }, []);

  const saveHomepageConfig = useCallback((newConfig) => {
    localStorage.setItem(LS_HOMEPAGE_KEY, JSON.stringify(newConfig));
    if (newConfig?.hero) {
      localStorage.setItem(LS_HERO_KEY, JSON.stringify(newConfig.hero));
    }
    setHomepageConfig(newConfig);
  }, []);

  const saveHeroConfig = useCallback((newHero) => {
    setHomepageConfig((prev) => {
      const updated = { ...prev, hero: { ...prev.hero, ...newHero } };
      localStorage.setItem(LS_HOMEPAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(LS_HERO_KEY, JSON.stringify(updated.hero));
      return updated;
    });
  }, []);

  const resetAllToDefaults = useCallback(() => {
    localStorage.removeItem(LS_PRODUCTS_KEY);
    localStorage.removeItem(LS_HOMEPAGE_KEY);
    localStorage.removeItem(LS_HERO_KEY);
    setProducts(DEFAULT_PRODUCTS);
    setHomepageConfig(DEFAULT_HOMEPAGE_CONFIG);
  }, []);

  return {
    products,
    homepageConfig,
    heroConfig: homepageConfig.hero,
    saveProducts,
    saveHomepageConfig,
    saveHeroConfig,
    resetAllToDefaults
  };
}
