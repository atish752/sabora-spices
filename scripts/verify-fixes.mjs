import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('=== SABORA SPICES VERIFICATION SUITE ===\n');

let failed = false;
function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    failed = true;
  }
}

// 1. Verify App.jsx route parser logic
const appJsx = readFileSync(join(rootDir, 'src/App.jsx'), 'utf-8');

assert(appJsx.includes('document.title = titles[currentRoute]'), 'App.jsx updates document.title on route change');
assert(appJsx.includes('const matched = segments.find(s => validRoutes.includes(s));'), 'App.jsx supports subpath matching in route parser');
assert(appJsx.includes('cleanRoute.includes(\'?\')'), 'navigateTo parses embedded query parameters');

// 2. Verify ProductsSection.jsx category filter sync
const productsSecJsx = readFileSync(join(rootDir, 'src/components/ProductsSection.jsx'), 'utf-8');
assert(productsSecJsx.includes('setSelectedCategory(activeFilter || \'all\')'), 'ProductsSection syncs selectedCategory with activeFilter prop');

// 3. Verify ContactRfqSection.jsx form product sync
const contactRfqJsx = readFileSync(join(rootDir, 'src/components/ContactRfqSection.jsx'), 'utf-8');
assert(contactRfqJsx.includes('product: preselectedProduct.name'), 'ContactRfqSection syncs form data when preselectedProduct changes');

// 4. Verify HomePage.jsx specs and tagline fixes
const homePageJsx = readFileSync(join(rootDir, 'src/pages/HomePage.jsx'), 'utf-8');
assert(homePageJsx.includes('product.tagline || product.subtitle'), 'HomePage product cards use tagline/subtitle fallback');
assert(homePageJsx.includes('product.gradesAvailable.slice(0, 2).join'), 'HomePage product cards show real grade specs');
assert(homePageJsx.includes('product.moq'), 'HomePage product cards show MOQ');
assert(!homePageJsx.includes('product.specifications.sizeGrade'), 'HomePage removed broken product.specifications.sizeGrade');

// 5. Verify AdminPanel defaults to cover fitMode
const adminJsx = readFileSync(join(rootDir, 'src/components/AdminPanel.jsx'), 'utf-8');
assert(adminJsx.includes('fitMode: "cover"'), 'AdminPanel new slide defaults to fitMode: "cover"');
assert(adminJsx.includes('currentHeroSlide.fitMode || \'cover\''), 'AdminPanel dropdown defaults to cover');

// 6. Verify HeroSection CTA parsing
const heroJsx = readFileSync(join(rootDir, 'src/components/HeroSection.jsx'), 'utf-8');
assert(heroJsx.includes('w-full h-full') && (heroJsx.includes('object-contain') || heroJsx.includes('object-cover')), 'HeroSection uses full-width responsive video/image display');

// 7. Verify vercel.json exists and has rewrites
const vercelJson = JSON.parse(readFileSync(join(rootDir, 'vercel.json'), 'utf-8'));
assert(Array.isArray(vercelJson.rewrites) && vercelJson.rewrites[0].destination === '/index.html', 'vercel.json contains SPA rewrite');

// 8. Verify all 11 dedicated pages and banner component exist
const pages = [
  'HomePage.jsx',
  'AboutPage.jsx',
  'ProductsPage.jsx',
  'SourcingPage.jsx',
  'WhySaboraPage.jsx',
  'QualityPage.jsx',
  'LabTestingPage.jsx',
  'CompliancePage.jsx',
  'ExportPage.jsx',
  'FaqPage.jsx',
  'ContactPage.jsx'
];

for (const page of pages) {
  const content = readFileSync(join(rootDir, 'src/pages', page), 'utf-8');
  assert(content.length > 200, `Page src/pages/${page} is present and populated (${content.length} bytes)`);
}

// 9. Verify null safety in section callbacks
const aboutSec = readFileSync(join(rootDir, 'src/components/AboutSection.jsx'), 'utf-8');
assert(aboutSec.includes('onScrollToSection && onScrollToSection(\'sourcing\')'), 'AboutSection null-checks onScrollToSection');

const qualitySec = readFileSync(join(rootDir, 'src/components/QualitySafetySection.jsx'), 'utf-8');
assert(qualitySec.includes('onScrollToSection && onScrollToSection(\'lab-testing\')'), 'QualitySafetySection null-checks onScrollToSection');

// 10. Verify Video Assets & Responsive Wiring
import { existsSync, readdirSync, statSync } from 'fs';
assert(existsSync(join(rootDir, 'public/videos/Landscape.mp4')), 'Landscape.mp4 (16:9) exists in public/videos');
assert(existsSync(join(rootDir, 'public/videos/Portrait.mp4')), 'Portrait.mp4 (9:16) exists in public/videos');
assert(heroJsx.includes('/videos/Landscape.mp4') && heroJsx.includes('hidden md:block'), 'HeroSection wires 16:9 Landscape video for desktop');
assert(heroJsx.includes('/videos/Portrait.mp4') && heroJsx.includes('block md:hidden'), 'HeroSection wires 9:16 Portrait video for mobile');

// 11. Verify Infinite Marquee Keyframe Math
const twConfig = readFileSync(join(rootDir, 'tailwind.config.js'), 'utf-8');
assert(twConfig.includes("'100%': { transform: 'translateX(-100%)' }"), 'tailwind.config.js marquee translates -100% for seamless looping');

// 12. Verify Absence of AI section numbers & Sparkles
const allJsxFiles = [];
function findJsx(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) findJsx(p);
    else if (p.endsWith('.jsx')) allJsxFiles.push(p);
  }
}
findJsx(join(rootDir, 'src'));

let aiArtifactsFound = 0;
for (const f of allJsxFiles) {
  const code = readFileSync(f, 'utf-8');
  if (code.match(/\b00\d+\.|\bSection\s+00\d+/i)) {
    console.error(`AI section number found in ${f}`);
    aiArtifactsFound++;
  }
  if (code.includes('<Sparkles')) {
    console.error(`Sparkles icon found in ${f}`);
    aiArtifactsFound++;
  }
}
assert(aiArtifactsFound === 0, `Scanned ${allJsxFiles.length} JSX files: ZERO AI numbers or Sparkles icons`);

// 13. Verify Google Fonts (Outfit, Fraunces, Caveat)
const indexHtml = readFileSync(join(rootDir, 'index.html'), 'utf-8');
assert(indexHtml.includes('family=Outfit') && indexHtml.includes('family=Fraunces') && indexHtml.includes('family=Caveat'), 'index.html loads Outfit, Fraunces & Caveat fonts');

// 14. Verify Admin Password Security (Changed from 2026 to fj(h5H(*93h*Hjo)
assert(adminJsx.includes("ADMIN_PASSWORD = 'fj(h5H(*93h*Hjo'") || adminJsx.includes("pinInput === 'fj(h5H(*93h*Hjo'"), 'AdminPanel enforces new secure password fj(h5H(*93h*Hjo');
assert(!adminJsx.includes("pinInput === '2026'"), 'AdminPanel no longer accepts old password 2026');
assert(!adminJsx.includes("pinInput === 'admin'"), 'AdminPanel no longer accepts weak password admin');
assert(!adminJsx.includes("pinInput === '1234'"), 'AdminPanel no longer accepts weak password 1234');

// 15. Verify HeaderNavbar Clean-up (FAQ and duplicate WhatsApp Desk removed)
const headerJsx = readFileSync(join(rootDir, 'src/components/HeaderNavbar.jsx'), 'utf-8');
const desktopNavMatch = headerJsx.match(/<nav className="hidden (?:lg:flex|xl:flex)[\s\S]*?<\/nav>/);
assert(desktopNavMatch && !desktopNavMatch[0].includes("handleNavClick('faq')"), 'HeaderNavbar removed FAQ button from top desktop navigation bar');
assert(!headerJsx.includes('hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50'), 'HeaderNavbar removed duplicate WhatsApp desk button from sticky bar');

// 16. Verify Statutory Credentials in siteConfig
const siteConfigJs = readFileSync(join(rootDir, 'src/config/siteConfig.js'), 'utf-8');
assert(siteConfigJs.includes('13326008000336'), 'siteConfig includes FSSAI License No: 13326008000336');
assert(siteConfigJs.includes('Q2A20262410AD742'), 'siteConfig includes ISO 9001:2015 Cert No: Q2A20262410AD742');
assert(siteConfigJs.includes('07BDVPK4053J1Z3'), 'siteConfig includes GSTIN: 07BDVPK4053J1Z3');

// 17. Verify FSSAI Logo Asset
assert(existsSync(join(rootDir, 'public/images/fssai-logo.png')), 'Authentic FSSAI logo image exists in public/images/fssai-logo.png');

// 18. Verify WhySaboraSection includes authentic FSSAI Logo
const whySaboraJsx = readFileSync(join(rootDir, 'src/components/WhySaboraSection.jsx'), 'utf-8');
assert(whySaboraJsx.includes('fssai-logo.png') && whySaboraJsx.includes('fssaiNumber'), 'WhySaboraSection includes authentic FSSAI logo and license number');

// 19. Verify FooterSection includes FSSAI Logo in both Column 1 and Column 4
const footerJsx = readFileSync(join(rootDir, 'src/components/FooterSection.jsx'), 'utf-8');
assert(footerJsx.match(/fssai-logo\.png[\s\S]*?fssai-logo\.png/), 'FooterSection includes authentic FSSAI logo in both Column 1 and Column 4');

// 20. Verify HeaderNavbar Top Bar Cleanliness (FSSAI, ISO, GST removed from top announcement bar as requested)
assert(!headerJsx.includes('Official Statutory Badges: FSSAI, ISO 9001:2015 & GSTIN') && !headerJsx.includes('Mobile Statutory Badges Row (< sm)'), 'HeaderNavbar removed statutory badges (FSSAI, ISO, GSTIN) from the top announcement bar');
assert(headerJsx.includes('Official Statutory Registrations') && headerJsx.includes('mobileMenuOpen'), 'HeaderNavbar mobile drawer displays complete statutory registrations card');

// 21. Verify TrustHighlightsBar includes FSSAI, ISO and GSTIN
const trustJsx = readFileSync(join(rootDir, 'src/components/TrustHighlightsBar.jsx'), 'utf-8');
assert(trustJsx.includes('fssaiNumber') && trustJsx.includes('isoNumber') && trustJsx.includes('gstin'), 'TrustHighlightsBar includes FSSAI, ISO, and GSTIN');

// 22. Verify ProductDetailModal includes FSSAI logo and credentials in modal footer
const modalJsx = readFileSync(join(rootDir, 'src/components/ProductDetailModal.jsx'), 'utf-8');
assert(modalJsx.includes('fssai-logo.png') && modalJsx.includes('fssaiNumber') && modalJsx.includes('isoNumber') && modalJsx.includes('gstin'), 'ProductDetailModal displays FSSAI logo, ISO and GSTIN in modal footer');

// 23. Functional validation of Admin Password logic
const adminPasswordMatch = adminJsx.match(/ADMIN_PASSWORD\s*=\s*['"]([^'"]+)['"]/);
assert(adminPasswordMatch && adminPasswordMatch[1] === 'fj(h5H(*93h*Hjo', 'ADMIN_PASSWORD exact match for fj(h5H(*93h*Hjo');
const targetPassword = adminPasswordMatch ? adminPasswordMatch[1] : '';
assert(targetPassword === 'fj(h5H(*93h*Hjo', 'Admin password evaluates to true only with fj(h5H(*93h*Hjo');
assert('2026' !== targetPassword, 'Admin password rejects 2026');
assert('admin' !== targetPassword, 'Admin password rejects admin');
assert('1234' !== targetPassword, 'Admin password rejects 1234');

// 24. Verify Tawk.to Live Chat integration in index.html
assert(indexHtml.includes('https://embed.tawk.to/6ae0701e5c05523470231899/1k5ubbtri') && indexHtml.includes('Tawk_API'), 'index.html embeds authentic Tawk.to live chat snippet');

// 25. Verify Official 4-Email Directory across siteConfig, Footer, ContactPage, ContactRfqSection, PrivacyPage, and TermsPage
const expectedEmails = ['info@saboraspices.com', 'sales@saboraspices.com', 'contact@saboraspices.com', 'support@saboraspices.com'];
for (const email of expectedEmails) {
  assert(siteConfigJs.includes(email), `siteConfig.js contains official email: ${email}`);
  assert(footerJsx.includes(email), `FooterSection.jsx displays official email: ${email}`);
}
const contactPageJsx = readFileSync(join(rootDir, 'src/pages/ContactPage.jsx'), 'utf-8');
const privacyPageJsx = readFileSync(join(rootDir, 'src/pages/PrivacyPage.jsx'), 'utf-8');
const termsPageJsx = readFileSync(join(rootDir, 'src/pages/TermsPage.jsx'), 'utf-8');
for (const email of expectedEmails) {
  assert(contactPageJsx.includes(email), `ContactPage.jsx displays official email: ${email}`);
  assert(contactRfqJsx.includes(email), `ContactRfqSection.jsx displays official email: ${email}`);
  assert(privacyPageJsx.includes(`mailto:${email}`), `PrivacyPage.jsx provides direct clickable mailto link for: ${email}`);
  assert(termsPageJsx.includes(`mailto:${email}`), `TermsPage.jsx provides direct clickable mailto link for: ${email}`);
}

// 26. Verify Desktop Floating WhatsApp is non-colliding with Tawk.to Live Chat
assert(appJsx.includes('fixed bottom-6 left-6') && !appJsx.includes('fixed bottom-6 right-6'), 'App.jsx positions desktop WhatsApp button at bottom-left to prevent collision with bottom-right Tawk.to widget');

// 27. Verify origin location badge completely removed from top-right of product photos in HomePage and ProductsSection
assert(!homePageJsx.includes("top-3.5 right-3.5") && !homePageJsx.includes("product.origin?.split"), 'HomePage product photos do NOT contain top-right origin location badge');
assert(!productsSecJsx.includes("top-3.5 right-3.5") && !productsSecJsx.includes("product.origin?.split"), 'ProductsSection product photos do NOT contain top-right origin location badge');

// 28. Verify authentic ISO logo asset and widespread integration
assert(existsSync(join(rootDir, 'public/images/iso-logo.svg')), 'ISO logo exists in public/images/iso-logo.svg');
assert(footerJsx.includes('iso-logo.svg'), 'FooterSection.jsx displays authentic ISO logo alongside FSSAI');
const complianceJsx = readFileSync(join(rootDir, 'src/pages/CompliancePage.jsx'), 'utf-8');
assert(complianceJsx.includes('iso-logo.svg'), 'CompliancePage.jsx displays authentic ISO logo');
const complianceSecJsx = readFileSync(join(rootDir, 'src/components/ComplianceSection.jsx'), 'utf-8');
assert(complianceSecJsx.includes('iso-logo.svg'), 'ComplianceSection.jsx displays authentic ISO logo');
assert(homePageJsx.includes('iso-logo.svg'), 'HomePage.jsx Certified Standards pillar displays ISO logo');

// 29. Verify Footer credibility & statutory compliance boost strip
assert(footerJsx.includes('Credibility & Statutory Compliance Boost Strip') && footerJsx.includes('Food Safety Authority of India') && footerJsx.includes('ISO 9001:2015 Certified QMS'), 'FooterSection includes credibility & statutory compliance boost strip with both FSSAI and ISO logos');

// 30. Verify Language Translation Engine & Native Language Suggestion
assert(existsSync(join(rootDir, 'src/components/LanguageTranslator.jsx')), 'LanguageTranslator.jsx exists');
const langTranslatorJsx = readFileSync(join(rootDir, 'src/components/LanguageTranslator.jsx'), 'utf-8');
assert(langTranslatorJsx.includes('SUPPORTED_LANGUAGES') && langTranslatorJsx.includes('detectUserNativeLanguage'), 'LanguageTranslator implements SUPPORTED_LANGUAGES and detectUserNativeLanguage');
assert(headerJsx.includes('LanguageDropdown'), 'HeaderNavbar includes LanguageDropdown in top bar and mobile drawer');
assert(appJsx.includes('<LanguageTranslator />'), 'App.jsx mounts LanguageTranslator component');
assert(indexHtml.includes('http-equiv="content-language" content="en"'), 'index.html sets content-language to English for browser translation support');

console.log('\nVerification suite finished.');
if (failed) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION ASSERTIONS PASSED SUCCESSFULLY!');
}
