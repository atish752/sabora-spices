export const PRODUCTS = [
  {
    id: "cardamom-whole",
    name: "Green Cardamom (Elaichi)",
    subtitle: "Sortex Sorted 8mm+ Extra Bold Natural Green Pods",
    botanicalName: "Elettaria cardamomum",
    category: "Whole Spices",
    featured: true,
    badge: "Export Grade #1",
    tagline: "The Queen of Spices with intense natural aroma and high volatile oil content, harvested from high-altitude plantations.",
    image: "/images/cardamom.png",
    rating: 4.95,
    reviewsCount: 38,
    moq: "50 Kg (Sample from 1 Kg)",
    origin: "Idukki Hills, Kerala, India",
    terroir: "Cardamom Hills, Idukki (1,100m elevation, shade-grown rainforest canopy)",
    aromaNotes: ["Sweet Pine & Menthol", "Zesty Citrus Peel", "Warm Camphor Undertone"],
    euCompliance: "EU MRL (EC) 396/2005 Compliant • Non-ETO • Steam Sterilized",
    incoterms: "CIF Rotterdam / Hamburg / Genoa | FOB Cochin",
    batchCode: "SB-IDK-2025/26",
    leadTime: "3 - 5 Business Days",
    gradesAvailable: ["8mm+ Extra Bold", "7.5mm - 8mm Bold", "7mm Medium", "Split / Seeds"],
    specifications: [
      { label: "Botanical Name", value: "Elettaria cardamomum" },
      { label: "Size Grading", value: "7.0 mm to 8.5 mm+ Bold" },
      { label: "Moisture Content", value: "Max 10.5%" },
      { label: "Volatile Oil", value: "Min 7.5% - 8.2% v/w" },
      { label: "Color / Appearance", value: "Natural Deep Vibrant Green, No Artificial Color" },
      { label: "Extraneous Matter", value: "< 0.5% (Sortex Cleaned)" },
      { label: "EU Residue Limits", value: "Conforms to (EC) No 396/2005" },
      { label: "Crop Season", value: "Fresh New Crop (Aug - Jan)" },
      { label: "Shelf Life", value: "24 Months (in hermetic packaging)" },
    ],
    packagingOptions: [
      "1 Kg / 2 Kg Vacuum Sealed Nitrogen Pouches",
      "5 Kg Food-Grade Inner Poly + Master Carton",
      "10 Kg & 25 Kg Export Master Corrugated Cases",
      "Custom Private Label Stand-Up Pouches with Zipper"
    ],
    b2bIdealFor: [
      "European Spice Blenders & Tea Houses",
      "Gourmet Bakery & Nordic Pastry Producers",
      "HORECA (Luxury Hotels & Michelin Kitchens)",
      "Overseas Importers & Global Distributors"
    ],
    whatsappTemplate: (customDetails = "") => {
      let msg = `Hello Sabora Spices team,\n\nI am interested to know more about this cardamom spices (Green Cardamom / Elaichi) for commercial B2B procurement.\n\n`;
      if (customDetails) {
        msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      }
      msg += `Could you please share:\n`;
      msg += `1. Current wholesale price per Kg (for 7.5mm & 8mm+ bold pods)\n`;
      msg += `2. Minimum Order Quantity (MOQ) & sample evaluation policy\n`;
      msg += `3. Delivery timeline & dispatch terms (CIF / FOB)\n\n`;
      msg += `Looking forward to your formal quotation. Thank you!`;
      return encodeURIComponent(msg);
    }
  },
  {
    id: "turmeric-whole",
    name: "Turmeric Whole (Haldi)",
    subtitle: "High Curcumin (4.5%+) Double Polished Fingers & Bulbs",
    botanicalName: "Curcuma longa",
    category: "Whole Spices",
    featured: true,
    badge: "High Curcumin 4.5%+",
    tagline: "Sun-dried golden turmeric fingers sourced directly from certified farmer clusters with guaranteed natural curcumin potency.",
    image: "/images/turmeric-whole.png",
    rating: 4.92,
    reviewsCount: 46,
    moq: "500 Kg (1 Container for Export)",
    origin: "Salem & Nizamabad, India",
    terroir: "Salem & Nizamabad Black Alluvial Plains (Natural solar cured)",
    aromaNotes: ["Warm Earthy Musk", "Golden Ginger Warmth", "Subtle Peppery Bite"],
    euCompliance: "EU MRL (EC) 396/2005 Compliant • Non-ETO • Heavy Metal Tested",
    incoterms: "CIF Rotterdam / Antwerp / Hamburg | FOB Chennai",
    batchCode: "SB-SLM-2025/26",
    leadTime: "5 - 7 Business Days",
    gradesAvailable: ["Salem Double Polished Fingers", "Nizamabad Finger Select", "Gathha (Bulbs)", "Sortex Cleaned Whole"],
    specifications: [
      { label: "Botanical Name", value: "Curcuma longa" },
      { label: "Curcumin Content", value: "3.8% to 5.2%+ (Lab Verified)" },
      { label: "Moisture Content", value: "Max 9.5%" },
      { label: "Length of Fingers", value: "4 cm to 9 cm" },
      { label: "Color / Finish", value: "Bright Deep Orange-Yellow, Double Polished" },
      { label: "Total Ash", value: "< 6.5%" },
      { label: "Pesticide Residue", value: "Conforms to EU / USFDA norms" },
      { label: "Shelf Life", value: "24 Months" },
    ],
    packagingOptions: [
      "25 Kg / 50 Kg Multiwall Kraft Paper Bags with PE Liner",
      "25 Kg PP Bags with Heavy Duty Inner Liner",
      "500g & 1 Kg Nitrogen Flushed Retail Pouches",
      "Private Label Packaging Available"
    ],
    b2bIdealFor: [
      "European Spice Mills & Organic Curry Powder Grinders",
      "Pharma & Curcumin Extraction Units in Germany & France",
      "Wholesale Spice Merchants & Mandi Traders",
      "Export Houses shipping to Europe & Middle East"
    ],
    whatsappTemplate: (customDetails = "") => {
      let msg = `Hello Sabora Spices team,\n\nI am interested to know more about your Turmeric Whole (Haldi Fingers & Bulbs) for commercial B2B procurement.\n\n`;
      if (customDetails) {
        msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      }
      msg += `Could you please share:\n`;
      msg += `1. Current wholesale rates per metric ton / quintal (Salem / Nizamabad)\n`;
      msg += `2. Curcumin potency Certificate of Analysis (COA)\n`;
      msg += `3. Packaging options (multiwall paper/jute) and export lead time\n\n`;
      msg += `Looking forward to your formal quotation. Thank you!`;
      return encodeURIComponent(msg);
    }
  },
  {
    id: "makhana-fox-nuts",
    name: "Makhana (Fox Nuts)",
    subtitle: "Jumbo Crisp 5-Suta / 6-Suta Phool Makhana",
    botanicalName: "Euryale ferox",
    category: "Gourmet & Healthy Agro",
    featured: true,
    badge: "100% Natural Superfood",
    tagline: "Pure, crunchy lotus seed pops with zero chemical bleaching, uniform size, and natural pristine white color.",
    image: "/images/makhana-fox-nuts.png",
    rating: 4.97,
    reviewsCount: 29,
    moq: "100 Kg",
    origin: "Mithila Region, Bihar, India",
    terroir: "Mithila Wetland Ponds, Bihar (Clean freshwater traditional harvesting)",
    aromaNotes: ["Light Toasted Cereal", "Delicate Nutty Finish", "Milky Sweetness"],
    euCompliance: "EU Food Law Reg. (EC) 178/2002 Compliant • Non-Bleached • Allergen Controlled",
    incoterms: "CIF Hamburg / Rotterdam / London | FOB Kolkata",
    batchCode: "SB-MTH-2025/26",
    leadTime: "3 - 5 Business Days",
    gradesAvailable: ["6 Suta Jumbo (>18mm)", "5.5 Suta Handpicked", "5 Suta Premium", "Industrial Grade / Flakes"],
    specifications: [
      { label: "Botanical Name", value: "Euryale ferox" },
      { label: "Grade / Size", value: "5 Suta & 6 Suta+ Hand Sorted" },
      { label: "Moisture Content", value: "Max 5.0% (Extra Crisp)" },
      { label: "Black Spot Ratio", value: "< 1.5% (Rigorous Hand Sorting)" },
      { label: "Protein Content", value: "9.7 g / 100 g" },
      { label: "Processing", value: "Traditional roasting, nil artificial additives" },
      { label: "Color", value: "Natural Milky White, Unbleached" },
      { label: "Shelf Life", value: "12 Months in airtight nitrogen pack" },
    ],
    packagingOptions: [
      "5 Kg / 10 Kg Master Heavy Poly Bags in 5-ply Corrugated Box",
      "100g, 250g, 500g Nitrogen Flushed Foil Stand-Up Pouches",
      "Private Label Ready (Your Brand Logo & Barcode Printing)",
      "Bulk Palletized Shipments for Sea & Air Cargo"
    ],
    b2bIdealFor: [
      "European Healthy Snack Brands & Superfood Packers",
      "Bio & Organic Supermarket Chains in Benelux & DACH",
      "Modern Trade & FMCG Aggregators",
      "Ayurvedic, Diet & Nutrition Manufacturers"
    ],
    whatsappTemplate: (customDetails = "") => {
      let msg = `Hello Sabora Spices team,\n\nI am interested to know more about your Jumbo Makhana (Fox Nuts / Phool Makhana) for wholesale / private label supply.\n\n`;
      if (customDetails) {
        msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      }
      msg += `Could you please share:\n`;
      msg += `1. Current wholesale rates for 5-suta and 6-suta jumbo grades\n`;
      msg += `2. Private label packaging capabilities & sample dispatch process\n`;
      msg += `3. Minimum order quantity and payment terms\n\n`;
      msg += `Looking forward to your formal quotation. Thank you!`;
      return encodeURIComponent(msg);
    }
  },
  {
    id: "black-pepper-bold",
    name: "Black Pepper (Kali Mirch)",
    subtitle: "Tellicherry & Malabar Garbled Black Pepper",
    botanicalName: "Piper nigrum",
    category: "Whole Spices",
    featured: false,
    badge: "550g/l - 580g/l High Density",
    tagline: "Pungent, piperine-rich whole black pepper corns machine graded and free from pinheads.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 22,
    moq: "200 Kg",
    origin: "Wayanad, Kerala & Coorg, Karnataka",
    terroir: "Malabar Coast & Wayanad Highlands (Single-estate hillside vines)",
    aromaNotes: ["Deep Woody Pungency", "Sharp Black Terpenes", "Warm Lingering Heat"],
    euCompliance: "ESA Minimum Quality Guidelines • Non-ETO • Aflatoxin Tested",
    incoterms: "CIF Rotterdam / Hamburg / Genoa | FOB Cochin",
    batchCode: "SB-ML-2025/26",
    leadTime: "3 - 5 Business Days",
    gradesAvailable: ["TGSEB (Tellicherry Garbled Special Extra Bold)", "Malabar Garbled (MG-1)", "550g/L Regular Bold"],
    specifications: [
      { label: "Botanical Name", value: "Piper nigrum" },
      { label: "Density / Liter Weight", value: "550 g/L to 580 g/L" },
      { label: "Piperine Content", value: "4.5% to 5.8%" },
      { label: "Moisture Content", value: "Max 11.0%" },
      { label: "Pinheads / Light Berries", value: "< 1.5%" },
      { label: "Shelf Life", value: "24 Months" },
    ],
    packagingOptions: [
      "25 Kg / 50 Kg Multiwall Paper & Jute Bags",
      "Custom Vacuum Pouches 1 Kg to 5 Kg"
    ],
    b2bIdealFor: [
      "European Sauce & Charcuterie Makers",
      "Gourmet Seasoning Blenders in France & Italy",
      "International Export Commodity Traders"
    ],
    whatsappTemplate: (customDetails = "") => {
      let msg = `Hello Sabora Spices team,\n\nI am interested to know more about your Black Pepper (Tellicherry & Malabar Garbled) for commercial wholesale supply.\n\n`;
      if (customDetails) {
        msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      }
      msg += `Please share current bulk rates (550g/L - 580g/L), MOQ, and delivery terms.\n\nThank you!`;
      return encodeURIComponent(msg);
    }
  },
  {
    id: "cloves-lal-pari",
    name: "Cloves (Laung)",
    subtitle: "Handpicked Lal Pari Madagascar & Indian Grade",
    botanicalName: "Syzygium aromaticum",
    category: "Whole Spices",
    featured: false,
    badge: "High Eugenol >18%",
    tagline: "Intensely aromatic reddish-brown whole flower buds with intact full crowns.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    rating: 4.91,
    reviewsCount: 19,
    moq: "100 Kg",
    origin: "Tamil Nadu & Imported Select Lots",
    terroir: "Western Ghats Slopes & Select Island Estates",
    aromaNotes: ["Intense Warm Eugenol", "Sweet Floral Spice", "Penetrating Aroma"],
    euCompliance: "EU MRL Compliant • Full Crown Retention >92% • Steam Sterilized",
    incoterms: "CIF Rotterdam / Hamburg | FOB Tuticorin",
    batchCode: "SB-CLV-2025/26",
    leadTime: "3 - 5 Business Days",
    gradesAvailable: ["Lal Pari Handpicked", "Standard Bold", "Clove Stems / Grinding Grade"],
    specifications: [
      { label: "Botanical Name", value: "Syzygium aromaticum" },
      { label: "Head Intactness", value: "> 92%" },
      { label: "Eugenol Oil", value: "Min 17.5% - 19.0%" },
      { label: "Moisture Content", value: "Max 10.0%" },
    ],
    packagingOptions: ["10 Kg Corrugated Cartons", "25 Kg Heavy Bags"],
    b2bIdealFor: [
      "German & Scandinavian Glühwein / Bakery Producers",
      "Pharmaceutical & Oral Care Formulations",
      "Gourmet Spice Mix Brands"
    ],
    whatsappTemplate: (customDetails = "") => {
      let msg = `Hello Sabora Spices team,\n\nI am interested to know more about your Cloves (Lal Pari Whole Cloves) for commercial wholesale supply.\n\n`;
      if (customDetails) {
        msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      }
      msg += `Please share current bulk pricing per Kg, eugenol oil analysis, and MOQ.\n\nThank you!`;
      return encodeURIComponent(msg);
    }
  },
  {
    id: "star-anise",
    name: "Star Anise (Chakra Phool)",
    subtitle: "Autumn Crop Whole 8-Pointed Star Blossoms",
    botanicalName: "Illicium verum",
    category: "Whole Spices",
    featured: false,
    badge: "Full 8-Point Florets",
    tagline: "Vibrant mahogany blossoms with rich anethole aroma, perfect for premium culinary and blending blends.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    reviewsCount: 15,
    moq: "100 Kg",
    origin: "Arunachal Pradesh & Certified Global Partners",
    terroir: "Sub-Himalayan Foothills (Autumn sun-dried whole stars)",
    aromaNotes: ["Sweet Liquorice", "Warm Anethole", "Balsamic Herbal"],
    euCompliance: "100% True Illicium Verum • Nil Shikimi Toxicity • EU Reg. Compliant",
    incoterms: "CIF Rotterdam / Hamburg | FOB Kolkata",
    batchCode: "SB-STR-2025/26",
    leadTime: "4 - 6 Business Days",
    gradesAvailable: ["Hand Selected Whole 8-Horn", "Standard Whole", "Broken Pieces"],
    specifications: [
      { label: "Botanical Name", value: "Illicium verum" },
      { label: "Whole Broken Ratio", value: "> 85% Full Stars" },
      { label: "Moisture Content", value: "Max 9.5%" },
      { label: "Color", value: "Natural Chestnut Brown" },
    ],
    packagingOptions: ["10 Kg Master Cartons with Poly Barrier", "Custom Retail Packs"],
    b2bIdealFor: [
      "European Distilleries & Botanicals Producers",
      "Asian & Fusion Culinary Brands in Western Europe",
      "Artisan Tisane & Tea Blenders"
    ],
    whatsappTemplate: (customDetails = "") => {
      let msg = `Hello Sabora Spices team,\n\nI am interested to know more about your Star Anise (Chakra Phool Whole Blossoms) for commercial wholesale supply.\n\n`;
      if (customDetails) {
        msg += `*My Requirement Details:*\n${customDetails}\n\n`;
      }
      msg += `Please share current bulk pricing, whole star ratio guarantee, and MOQ.\n\nThank you!`;
      return encodeURIComponent(msg);
    }
  }
];

export const CATEGORIES = [
  "All Products",
  "Whole Spices",
  "Gourmet & Healthy Agro"
];

export const GENERAL_WHATSAPP_MESSAGE = (customDetails = "") => {
  let msg = `Hello Sabora Spices team,\n\nI am interested to know more about your whole spices products and commercial B2B supply for European & international trade.\n\n`;
  if (customDetails) {
    msg += `*My Inquiry:*\n${customDetails}\n\n`;
  }
  msg += `Could you please share your complete wholesale product catalog, latest price list, and export supply terms (CIF / FOB)?\n\nThank you!`;
  return encodeURIComponent(msg);
};
