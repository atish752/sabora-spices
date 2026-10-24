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
assert(heroJsx.includes('URLSearchParams(search)'), 'HeroSection parses CTA query parameters');
assert(heroJsx.includes('w-full h-full object-cover object-center'), 'HeroSection uses full-width object-cover');

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

console.log('\nVerification suite finished.');
if (failed) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION ASSERTIONS PASSED SUCCESSFULLY!');
}
