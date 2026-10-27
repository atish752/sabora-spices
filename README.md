# SABORA SPICES — Whole Spices & Makhana. Sourced with Purpose.

A web platform for **SABORA SPICES**, inspired by the clean, minimal, yet powerful structure of **Shahi Food Services** (`https://shahifoodservices.com/`), tailored for domestic and international B2B buyers, wholesalers, food businesses, and private-label brands.

---

## 🌟 Key Features & Architecture

### 1. Structure & Navigation (11-Item Menu)
Directly structured from the client's specification and `SABORA SPICES.txt`:
1. **Home**: Master visual hero carousel and key sourcing overview.
2. **About Us (Section 002)**: Who We Are (Jahangirpuri, Delhi – 110033), Business Philosophy, 3 Core Principles, Who We Serve, Vision & Mission.
3. **Products (Section 003)**:
   - Whole Green Cardamom (Elaichi) — Kerala & Western Ghats
   - Makhana (Fox Nuts) — Bihar Origin
   - Whole Turmeric Fingers — Salem & Nizamabad
   - Whole Cloves (Laung) & Whole Black Pepper
   - *100% whole products only (no powdered or ground spices).*
4. **Sourcing & Origin (Section 004)**: Origin-based procurement, direct farmer sourcing, regional dealer networks, and 5-step sourcing workflow.
5. **Why Sabora (Section 005)**: All 14 distinct pillars and the Sabora Commitment.
6. **Quality & Food Safety (Section 006)**: Compliance with FSSAI regulations, ISO 9001:2015 QMS principles, and ISO 22000:2018 FSMS principles.
7. **Laboratory Testing (Section 007)**: "Tested for Quality. Verified Before Dispatch." FSSAI-notified lab testing, FoSCoS portal reporting, and 6-step batch release control.
8. **Regulatory Compliance (Section 008)**: Domestic statutory terms, export documentation, packaging & labelling declarations.
9. **International & Export Supply (Section 009)**: Multi-modal freight (ocean container & air cargo), documentation support (COA, Phytosanitary, Certificate of Origin).
10. **FAQ (Section 0010)**: All 25 questions and answers with category filters and instant live search.
11. **Contact Us & RFQ Desk**: Interactive quote builder, Jahangirpuri Delhi office details, phone numbers (+91 78809 06610 / +91 95327 01582), and 1-click WhatsApp transmission.

---

### 2. Responsive Hero Section (No Cropping)
- Engineered with proportional aspect ratios (`aspect-[4/3]` on mobile, `aspect-[16/9]` on tablet, `aspect-[21/8]` on desktop) so that **the entire hero visual fits seamlessly across desktop, tablet, and mobile screens without awkward image cropping**.
- Autoplay carousel with smooth crossfade, touch swipe gestures on mobile, pause-on-hover, previous/next controls, and slide indicators.
- Real high-resolution assets: Master Heritage visual (`hero-heritage.jpg`), traditional Kerala cardamom sorting (`hero-cardamom-sorting.jpg`), plantation harvest (`hero-cardamom-harvest.jpg`), and Bihar Makhana.
- Live editable via the Admin Panel.

---

### 3. Powerful Admin Panel (`?page=admin`)
- Accessible via the link in the footer or by visiting `?page=admin`.
- Protected by administrator password (`fj(h5H(*93h*Hjo`).
- **Hero Section Banner Manager**: Add new slides, edit headline/subtitles/tags/CTAs, upload new hero photos from your computer, toggle image fit mode (`cover` vs `contain`).
- **Products Catalog Manager**: Add products, upload photos, edit titles, grades, origins, technical specifications, and packaging options.
- **Inquiries & Quotes Inbox**: Review incoming quote requests in real time, filter by status, export to CSV, and 1-click reply to buyers via WhatsApp.
- **Cloud Sync & Settings**: Live synchronization with Firebase Firestore (`sabora-spices`) with local cache fallback.

---

### 4. Firebase Backend Integration
Configured with the client's Firebase credentials:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBwkC2tMAUGG485mulGXYYeecpTAOxx5NE",
  authDomain: "sabora-spices.firebaseapp.com",
  projectId: "sabora-spices",
  storageBucket: "sabora-spices.firebasestorage.app",
  messagingSenderId: "328447232293",
  appId: "1:328447232293:web:6def55bcad96e6d2e072cc"
};
```
- Real-time Firestore sync for collections: `sabora_products`, `sabora_hero_slides`, `sabora_inquiries`.
- Persistent local storage fallback ensures zero downtime and instant loading.

---

### 5. Vercel Hosting Ready
- `vercel.json` configured for SPA routing.
- Optimized bundle code-splitting via Rollup manual chunks in `vite.config.js`.
- Production build: `npm run build` generates clean assets in `dist/`.

---

### 6. Official Contact Information
- **Brand**: SABORA SPICES
- **Address**: Jahangirpuri, Delhi – 110033, India
- **Phones**: +91 78809 06610 | +91 95327 01582
- **WhatsApp**: +91 78809 06610
- **Website**: www.saboraspices.com
- **Email**: info@saboraspices.com
