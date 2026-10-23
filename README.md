# Sabora Spices - Premium B2B Wholesale Web Platform

A website engineered for **Sabora Spices**, inspired by the structure, aesthetics, typography, and responsive ergonomics of **Natural Spices (Hyvä / Tailwind CSS architecture)**, tailored for **B2B Bulk Supply, Wholesale & Export Trade**.

---

## 🌟 Key Highlights & Implementation Details

### 1. Deep Analysis & Parity with Natural Spices (`naturalspices.com`)
- **Theme & Colors:** Clean, light luxury palette (`#FFFFFF`, `#FAFAF7`, `#F3F7F4`) with packaging-matched Emerald Forest Green (`#0D3B2E` / `#1B6B56`) and radiant Spice Gold accents (`#D4AF37`), avoiding dark themes as requested.
- **Typography:** Geometric, modern sans-serif typography (`Plus Jakarta Sans`) combined with elegant serif titles (`Playfair Display`).
- **Hyvä-Style Interactive Elements:**
  - Fast search with auto-complete suggestions.
  - Smooth mobile slide-out navigation drawer with category accordions.
  - Two-column heritage & quality section with collapsible accordions.
  - Review slider with 5 golden stars, quotes, author names, and verified buyer locations.
  - Certification trust badges (FSSAI, APEDA, Spice Board of India, ISO 22000).

### 2. Sabora Spices Products (Real Packaging Assets)
- **Green Cardamom (Elaichi - Whole):** Bold 7.5mm - 8mm+ pods, 8.2% volatile aroma oil, vacuum & nitrogen packed.
- **Turmeric Whole (Haldi):** Double polished fingers & bulbs, lab-verified 4.5%+ curcumin potency.
- **Makhana (Fox Nuts / Phool Makhana):** Jumbo 5-suta and 6-suta+ hand-sorted crisp white pops, unbleached.
- **Supplementary Line:** Tellicherry Black Pepper, Lal Pari Cloves, Whole Star Anise.

### 3. B2B Focus (Commercial Wholesale & Export)
- Designed specifically for **B2B buyers, spice blenders, food manufacturers, export houses, and supermarket chains**.
- **Minimum Order Quantity (MOQ)** indicators on every product.
- **Bulk Packaging Formats:** 25kg/50kg jute & PP bags, 5kg/10kg master cartons, and custom private-label retail stand-up zip pouches.
- **Commercial Sample Kits:** Free evaluation sample requests for verified commercial laboratories.

### 4. 1-Click WhatsApp B2B Inquiry Feature
- **Product-Specific Inquiries:** When browsing any product (e.g. Cardamom), clicking the WhatsApp button opens WhatsApp with a pre-filled, formal commercial message:
  ```text
  *Bulk Inquiry: Green Cardamom (Elaichi)*
  Hello Sabora Spices team,
  I am interested in procuring Green Cardamom for wholesale / B2B supply.
  • Estimated Order Volume: 500 Kg
  • Preferred Packaging: Bulk Standard 25/50kg Bags
  • Delivery Destination / Port: Dubai
  Could you please share:
  1. Current wholesale rate per Kg
  2. Minimum Order Quantity (MOQ) & sample policy
  3. Delivery timeline & FOB/CIF terms
  Thank you!
  ```
- **Customizable Inquiries:** Modal & Drawer allow buyers to select required volume, packaging type, and destination port before launching WhatsApp.
- **General Inquiry Desk:** Instant RFQ calculator and floating WhatsApp desk.
- **Configurable Phone Number:** Easily updated in `src/config/siteConfig.js` (`whatsappNumber: "919876543210"`).

### 5. Mobile-First Optimization
- **Sticky Bottom Action Bar** on smartphones for instant 1-tap WhatsApp quotes and catalog navigation.
- **Touch-Friendly Tap Targets** (min 48px), responsive font sizes, and horizontal swipe carousels.
- **Slide-Out Drawer Menu** with zero horizontal overflow or page shift.

---

## 🚀 Running the Project

The server is currently running live on localhost:
- **Local:** [http://localhost:5173/](http://localhost:5173/)
- **Network (Mobile Testing):** `http://<your-local-ip>:5173/`

### Commands
- Start dev server: `npm run dev`
- Build production files: `npm run build`
- Preview production build: `npm run preview`
