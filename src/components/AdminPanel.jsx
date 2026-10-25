import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Package, 
  Sliders, 
  Image as ImageIcon, 
  Eye, 
  MessageCircle, 
  Mail, 
  Download, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const compressImageFile = (file, maxWidth = 1600, quality = 0.85) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

export default function AdminPanel({
  products,
  heroSlides,
  inquiries,
  firebaseStatus,
  onSaveProducts,
  onSaveHeroSlides,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onResetAll,
  onClose
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sabora_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'products', 'inquiries', 'settings'
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Editable local state
  const [editableHeroSlides, setEditableHeroSlides] = useState(heroSlides || []);
  const [editableProducts, setEditableProducts] = useState(products || []);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  // Authentication check
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === '2026' || pinInput === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sabora_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sabora_admin_auth');
  };

  const triggerSaveNotification = (msg = 'Changes saved successfully!') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // ── Hero Slide Actions ──
  const handleHeroChange = (field, value) => {
    const updated = [...editableHeroSlides];
    updated[selectedSlideIndex] = {
      ...updated[selectedSlideIndex],
      [field]: value
    };
    setEditableHeroSlides(updated);
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageFile(file, 1920, 0.85);
      handleHeroChange('image', compressed);
      triggerSaveNotification('Hero image uploaded & optimized for preview!');
    } catch (err) {
      console.warn("Upload error:", err);
    }
  };

  const handleAddHeroSlide = () => {
    const newSlide = {
      id: "slide_" + Date.now(),
      tag: "NEW SOURCING HIGHLIGHT",
      title: "New Harvest Announcement\nDirect From Origin.",
      subtitle: "Add descriptive details about your new crop, harvest season, or sourcing region here.",
      image: "/images/hero-sabora-master.jpg",
      badge: "Crop 2026",
      primaryCtaText: "Request Wholesale Quote",
      primaryCtaLink: "/contact",
      secondaryCtaText: "Explore Products",
      secondaryCtaLink: "/products",
      displayMode: "cinematic",
      showOverlayText: true,
      fitMode: "cover"
    };
    const updated = [...editableHeroSlides, newSlide];
    setEditableHeroSlides(updated);
    setSelectedSlideIndex(updated.length - 1);
  };

  const handleDeleteHeroSlide = (index) => {
    if (editableHeroSlides.length <= 1) {
      alert("You must keep at least 1 hero banner slide.");
      return;
    }
    const updated = editableHeroSlides.filter((_, i) => i !== index);
    setEditableHeroSlides(updated);
    setSelectedSlideIndex(Math.max(0, index - 1));
  };

  const handleSaveHero = async () => {
    if (onSaveHeroSlides) {
      await onSaveHeroSlides(editableHeroSlides);
      triggerSaveNotification('Hero section slides saved & synced to cloud!');
    }
  };

  // ── Product Actions ──
  const handleProductChange = (field, value) => {
    const updated = [...editableProducts];
    updated[selectedProductIndex] = {
      ...updated[selectedProductIndex],
      [field]: value
    };
    setEditableProducts(updated);
  };

  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageFile(file, 1200, 0.85);
      handleProductChange('image', compressed);
      triggerSaveNotification('Product photo uploaded & optimized!');
    } catch (err) {
      console.warn("Product upload error:", err);
    }
  };

  const handleAddProduct = () => {
    const newProd = {
      id: "prod_" + Date.now(),
      name: "New Whole Spice Product",
      subtitle: "Sourced with Purpose — Direct Farm Origin",
      botanicalName: "Botanical specimen",
      category: "Whole Spices",
      categoryKey: "other",
      featured: true,
      badge: "Fresh Arrival",
      tagline: "Enter product overview and quality summary here.",
      image: "/images/cardamom-pouch.jpg",
      gallery: ["/images/cardamom-pouch.jpg"],
      rating: 4.9,
      reviewsCount: 10,
      moq: "100 Kg",
      origin: "Selected Indian Belts",
      netWeight: "Food-Grade Pouch & Bulk",
      gradesAvailable: ["Standard Grade", "Export Grade"],
      specifications: [
        { label: "Product Form", value: "100% Whole Agricultural Product" },
        { label: "Moisture Content", value: "Max 10.0%" }
      ],
      packagingOptions: [
        "Sabora-Branded Food-Grade Pouches",
        "Bulk Sacks / Corrugated Boxes"
      ]
    };
    const updated = [...editableProducts, newProd];
    setEditableProducts(updated);
    setSelectedProductIndex(updated.length - 1);
  };

  const handleDeleteProduct = (index) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = editableProducts.filter((_, i) => i !== index);
      setEditableProducts(updated);
      setSelectedProductIndex(Math.max(0, index - 1));
    }
  };

  const handleSaveProducts = async () => {
    if (onSaveProducts) {
      await onSaveProducts(editableProducts);
      triggerSaveNotification('Products catalog saved & synced to cloud!');
    }
  };

  // ── Inquiries Export ──
  const handleExportInquiriesCsv = () => {
    if (!inquiries || inquiries.length === 0) {
      alert("No inquiries to export.");
      return;
    }

    const headers = ["ID", "Date", "Status", "Name", "Company", "Phone", "Email", "Product", "Quantity", "Grade", "Packaging", "Destination", "Notes"];
    const rows = inquiries.map(inq => [
      inq.id || "",
      inq.createdAt || "",
      inq.status || "New",
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${(inq.company || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${(inq.product || '').replace(/"/g, '""')}"`,
      `"${(inq.quantity || '').replace(/"/g, '""')}"`,
      `"${(inq.grade || '').replace(/"/g, '""')}"`,
      `"${(inq.packaging || '').replace(/"/g, '""')}"`,
      `"${(inq.destination || '').replace(/"/g, '""')}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sabora_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              SABORA SPICES
            </h2>
            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">
              Management Portal
            </p>
            <p className="text-xs text-stone-500 pt-1">
              Enter admin passcode to manage hero banners, products, and incoming quotes.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 2026)"
                autoFocus
                className="w-full text-center tracking-widest text-lg font-mono py-3 px-4 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-[#0F3D2E] focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-medium pt-1.5">
                  Invalid passcode. Please use 2026 or contact admin.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white font-bold text-sm shadow transition-all cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <button
            onClick={onClose}
            className="text-xs text-stone-500 hover:text-stone-800 underline font-medium"
          >
            ← Return to public website
          </button>
        </div>
      </div>
    );
  }

  const currentHeroSlide = editableHeroSlides[selectedSlideIndex] || editableHeroSlides[0];
  const currentProduct = editableProducts[selectedProductIndex] || editableProducts[0];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans antialiased">
      
      {/* ── Admin Top Navigation Bar ── */}
      <header className="bg-[#03150E] text-white border-b border-emerald-950 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </button>

          <div className="h-5 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 p-0.5 border border-amber-400/40">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm sm:text-base block leading-none">SABORA SPICES</span>
              <span className="text-xs text-amber-400 uppercase font-mono block">Admin Management Desk</span>
            </div>
          </div>
        </div>

        {/* Status Badge & Logout */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-600/40 text-xs text-emerald-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{firebaseStatus?.message || "Firebase Connected"}</span>
          </span>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-rose-900/40 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Save Success Banner */}
      {saveSuccessMsg && (
        <div className="bg-emerald-600 text-white text-center py-2 px-4 text-xs font-bold animate-fadeIn flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* ── Main Tab Navigation ── */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3.5 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'hero' 
                ? 'border-[#0F3D2E] text-[#0F3D2E]' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Section Banner ({editableHeroSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'products' 
                ? 'border-[#0F3D2E] text-[#0F3D2E]' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({editableProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inquiries' 
                ? 'border-[#0F3D2E] text-[#0F3D2E]' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquiries & Quotes Inbox ({inquiries?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-[#0F3D2E] text-[#0F3D2E]' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Settings & Sync</span>
          </button>
        </div>
      </div>

      {/* ── Content Area ── */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        
        {/* ══════════════════════════════════════════════════════════
            TAB 1: HERO SECTION BANNER MANAGER
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Hero Section Banners & Carousel Slides
                </h2>
                <p className="text-xs text-stone-500">
                  Add, edit, change images, headlines, or adjust fit mode for each hero slide.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddHeroSlide}
                  className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Add New Slide</span>
                </button>

                <button
                  onClick={handleSaveHero}
                  className="px-4 py-2 rounded-lg bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save All Slides</span>
                </button>
              </div>
            </div>

            {/* Slide Selector Badges */}
            <div className="flex flex-wrap gap-2">
              {editableHeroSlides.map((slide, idx) => (
                <button
                  key={slide.id || idx}
                  onClick={() => setSelectedSlideIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    idx === selectedSlideIndex
                      ? 'bg-[#0F3D2E] text-white shadow'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span>Slide #{idx + 1}</span>
                  <span className="text-[10px] opacity-75 font-normal truncate max-w-[120px]">
                    {slide.tag || slide.title?.slice(0, 15)}
                  </span>
                </button>
              ))}
            </div>

            {/* Slide Editor Card */}
            {currentHeroSlide && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                
                {/* Visual Preview */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Live Banner Preview:
                  </span>
                  <div className="relative w-full aspect-[21/8] max-h-72 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 flex items-center justify-center">
                    <img
                      src={currentHeroSlide.image}
                      alt="Hero preview"
                      className={`w-full h-full ${
                        currentHeroSlide.fitMode === 'contain' ? 'object-contain' : 'object-cover'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <span className="text-[10px] bg-amber-500/80 text-black px-2 py-0.5 rounded font-bold uppercase font-mono">
                        {currentHeroSlide.tag}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold whitespace-pre-line leading-snug">
                        {currentHeroSlide.title}
                      </h3>
                      <p className="text-xs text-stone-300 line-clamp-2">
                        {currentHeroSlide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Photo Upload / URL */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                      <span>Hero Banner Image (File Upload or URL)</span>
                      <span className="text-[11px] text-stone-500">Supports JPG, PNG, WEBP</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={currentHeroSlide.image}
                        onChange={(e) => handleHeroChange('image', e.target.value)}
                        placeholder="Image URL (e.g. /images/hero-heritage.jpg or cloud URL)"
                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                      <label className="px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 border border-stone-300">
                        <Upload className="w-4 h-4 text-emerald-700" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Display Mode / Shahi Reference Style */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Slide Display Mode</label>
                    <select
                      value={currentHeroSlide.displayMode || (currentHeroSlide.showOverlayText === false ? 'banner' : 'cinematic')}
                      onChange={(e) => {
                        const mode = e.target.value;
                        handleHeroChange('displayMode', mode);
                        handleHeroChange('showOverlayText', mode === 'cinematic');
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    >
                      <option value="cinematic">Cinematic Photo with Overlay Text & Buttons (Full Width)</option>
                      <option value="banner">Panoramic Banner (Edge-to-Edge Full Width)</option>
                    </select>
                  </div>

                  {/* Fit Mode Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Image Fit Mode</label>
                    <select
                      value={currentHeroSlide.fitMode || 'cover'}
                      onChange={(e) => handleHeroChange('fitMode', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    >
                      <option value="cover">Cover (Fills Entire Banner Container - Zero Letterboxing)</option>
                      <option value="contain">Contain (Full Image - Letterbox Borders on Wide Screens)</option>
                    </select>
                  </div>

                  {/* Show Overlay Text Checkbox */}
                  <div className="flex items-center gap-2 pt-1 md:col-span-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
                    <input
                      type="checkbox"
                      id="showOverlayText"
                      checked={currentHeroSlide.showOverlayText !== false && currentHeroSlide.displayMode !== 'banner'}
                      onChange={(e) => {
                        handleHeroChange('showOverlayText', e.target.checked);
                        handleHeroChange('displayMode', e.target.checked ? 'cinematic' : 'banner');
                      }}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="showOverlayText" className="text-xs font-semibold text-stone-800 cursor-pointer">
                      Render headline text & action buttons over this image (Uncheck for banners like Shahi Food Services that already include text)
                    </label>
                  </div>

                  {/* Tag Pill */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Tag / Badge Label</label>
                    <input
                      type="text"
                      value={currentHeroSlide.tag}
                      onChange={(e) => handleHeroChange('tag', e.target.value)}
                      placeholder="e.g. INDIA-BASED SOURCING & SUPPLY"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Headline */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-stone-800">Headline (Use newline for line breaks)</label>
                    <textarea
                      rows={2}
                      value={currentHeroSlide.title}
                      onChange={(e) => handleHeroChange('title', e.target.value)}
                      placeholder="e.g. Whole Spices & Makhana.\nSourced with Purpose."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-stone-800">Subtitle / Description</label>
                    <textarea
                      rows={2}
                      value={currentHeroSlide.subtitle}
                      onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                      placeholder="Brief description of the sourcing, origin, or product..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Primary CTA */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Primary Button Text</label>
                    <input
                      type="text"
                      value={currentHeroSlide.primaryCtaText}
                      onChange={(e) => handleHeroChange('primaryCtaText', e.target.value)}
                      placeholder="e.g. Request Wholesale Quote"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Primary Button Target</label>
                    <input
                      type="text"
                      value={currentHeroSlide.primaryCtaLink}
                      onChange={(e) => handleHeroChange('primaryCtaLink', e.target.value)}
                      placeholder="#contact or #products or whatsapp"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Secondary CTA */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Secondary Button Text</label>
                    <input
                      type="text"
                      value={currentHeroSlide.secondaryCtaText}
                      onChange={(e) => handleHeroChange('secondaryCtaText', e.target.value)}
                      placeholder="e.g. Explore Products"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">Secondary Button Target</label>
                    <input
                      type="text"
                      value={currentHeroSlide.secondaryCtaLink}
                      onChange={(e) => handleHeroChange('secondaryCtaLink', e.target.value)}
                      placeholder="#products or whatsapp"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                </div>

                {/* Slide Bottom Bar */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <button
                    onClick={() => handleDeleteHeroSlide(selectedSlideIndex)}
                    className="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Slide #{selectedSlideIndex + 1}</span>
                  </button>

                  <button
                    onClick={handleSaveHero}
                    className="px-5 py-2.5 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs font-bold shadow transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Save Slide Changes</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 2: PRODUCTS CATALOG MANAGER
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Products Catalog & Specifications
                </h2>
                <p className="text-xs text-stone-500">
                  Edit product titles, photos, grades, origins, and specifications.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddProduct}
                  className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Add Product</span>
                </button>

                <button
                  onClick={handleSaveProducts}
                  className="px-4 py-2 rounded-lg bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save All Products</span>
                </button>
              </div>
            </div>

            {/* Product Selector Badges */}
            <div className="flex flex-wrap gap-2">
              {editableProducts.map((p, idx) => (
                <button
                  key={p.id || idx}
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    idx === selectedProductIndex
                      ? 'bg-[#0F3D2E] text-white shadow'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            {/* Product Editor Form */}
            {currentProduct && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Photo Preview & Upload (4 cols) */}
                  <div className="md:col-span-4 space-y-3">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                      Product Photo Preview
                    </span>
                    <div className="h-56 w-full rounded-2xl bg-stone-50 border border-stone-200 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <label className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-stone-300">
                      <Upload className="w-4 h-4 text-emerald-700" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Core Details (8 cols) */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-800">Product Name</label>
                      <input
                        type="text"
                        value={currentProduct.name}
                        onChange={(e) => handleProductChange('name', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800">Category Tag</label>
                      <input
                        type="text"
                        value={currentProduct.category}
                        onChange={(e) => handleProductChange('category', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800">Category Key (Filter)</label>
                      <select
                        value={currentProduct.categoryKey || 'other'}
                        onChange={(e) => handleProductChange('categoryKey', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      >
                        <option value="cardamom">Whole Green Cardamom</option>
                        <option value="makhana">Makhana (Fox Nuts)</option>
                        <option value="turmeric">Whole Turmeric Fingers</option>
                        <option value="other">Cloves & Other Whole Spices</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800">Primary Origin</label>
                      <input
                        type="text"
                        value={currentProduct.origin}
                        onChange={(e) => handleProductChange('origin', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800">Minimum Order (MOQ)</label>
                      <input
                        type="text"
                        value={currentProduct.moq}
                        onChange={(e) => handleProductChange('moq', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-800">Tagline / Overview</label>
                      <textarea
                        rows={2}
                        value={currentProduct.tagline || currentProduct.subtitle}
                        onChange={(e) => handleProductChange('tagline', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-800">Image Path / Cloud URL</label>
                      <input
                        type="text"
                        value={currentProduct.image}
                        onChange={(e) => handleProductChange('image', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Botanical Name & Packaging Form */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800">Botanical Name</label>
                      <input
                        type="text"
                        value={currentProduct.botanicalName || ''}
                        onChange={(e) => handleProductChange('botanicalName', e.target.value)}
                        placeholder="e.g. Elettaria cardamomum"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800">Net Weight / Packaging Unit</label>
                      <input
                        type="text"
                        value={currentProduct.netWeight || ''}
                        onChange={(e) => handleProductChange('netWeight', e.target.value)}
                        placeholder="e.g. 500g Sabora Pouch & Bulk"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Available Grades */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-800">Available Grades (Comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(currentProduct.gradesAvailable) ? currentProduct.gradesAvailable.join(', ') : (currentProduct.gradesAvailable || '')}
                        onChange={(e) => handleProductChange('gradesAvailable', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="e.g. 8mm+ Extra Bold, 7.5mm - 8mm Bold, 7mm Medium"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Packaging Options */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-800">Packaging Formats (One per line)</label>
                      <textarea
                        rows={3}
                        value={Array.isArray(currentProduct.packagingOptions) ? currentProduct.packagingOptions.join('\n') : (currentProduct.packagingOptions || '')}
                        onChange={(e) => handleProductChange('packagingOptions', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                        placeholder="500g Food-Grade Sabora-Branded Stand-Up Zipper Pouches&#10;25 Kg Export Master Cases"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Technical Specifications List */}
                    <div className="space-y-2 sm:col-span-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                          Technical Specifications ({currentProduct.specifications?.length || 0})
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const specs = [...(currentProduct.specifications || [])];
                            specs.push({ label: "New Parameter", value: "Standard Spec" });
                            handleProductChange('specifications', specs);
                          }}
                          className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Spec Row</span>
                        </button>
                      </div>

                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {(currentProduct.specifications || []).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={spec.label}
                              onChange={(e) => {
                                const specs = [...currentProduct.specifications];
                                specs[sIdx] = { ...specs[sIdx], label: e.target.value };
                                handleProductChange('specifications', specs);
                              }}
                              placeholder="Label (e.g. Moisture Content)"
                              className="w-2/5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-900 bg-stone-50 focus:bg-white"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => {
                                const specs = [...currentProduct.specifications];
                                specs[sIdx] = { ...specs[sIdx], value: e.target.value };
                                handleProductChange('specifications', specs);
                              }}
                              placeholder="Value (e.g. Max 10.0%)"
                              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-900 bg-stone-50 focus:bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const specs = currentProduct.specifications.filter((_, i) => i !== sIdx);
                                handleProductChange('specifications', specs);
                              }}
                              aria-label="Remove spec"
                              className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Product Save/Delete Buttons */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <button
                    onClick={() => handleDeleteProduct(selectedProductIndex)}
                    className="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete {currentProduct.name}</span>
                  </button>

                  <button
                    onClick={handleSaveProducts}
                    className="px-5 py-2.5 rounded-xl bg-[#0F3D2E] hover:bg-[#15543F] text-white text-xs font-bold shadow transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Save Products Catalog</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 3: INQUIRIES & RFQ INBOX
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Quotations & Sourcing Inquiries Inbox
                </h2>
                <p className="text-xs text-stone-500">
                  Real-time leads submitted through the website RFQ desk.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportInquiriesCsv}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export to CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table / List */}
            {inquiries && inquiries.length > 0 ? (
              <div className="space-y-3">
                {inquiries.map((inq, idx) => (
                  <div
                    key={inq.id || idx}
                    className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-500/50 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-500">
                          #{idx + 1}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          inq.status === 'Contacted' 
                            ? 'bg-blue-100 text-blue-800' 
                            : inq.status === 'Closed'
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {inq.status || 'New'}
                        </span>
                        <span className="text-xs font-bold text-stone-900">
                          {inq.name}
                        </span>
                        {inq.company && (
                          <span className="text-xs text-stone-500">
                            ({inq.company})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-stone-400 font-mono text-[11px]">
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}
                        </span>

                        <select
                          value={inq.status || 'New'}
                          onChange={(e) => onUpdateInquiryStatus && onUpdateInquiryStatus(inq.id, e.target.value)}
                          className="px-2 py-1 rounded border border-stone-200 bg-stone-50 text-[11px] font-semibold text-stone-700 focus:outline-none"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="In Progress">Status: In Progress</option>
                          <option value="Closed">Status: Closed</option>
                        </select>
                      </div>
                    </div>

                    {/* Inquiry Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <div>
                        <span className="text-stone-400 text-[11px] block">Product:</span>
                        <strong className="text-stone-900">{inq.product}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[11px] block">Quantity:</span>
                        <strong className="text-stone-900">{inq.quantity}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[11px] block">Grade/Specs:</span>
                        <span className="text-stone-800">{inq.grade || 'Standard'}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[11px] block">Destination:</span>
                        <span className="text-stone-800">{inq.destination}</span>
                      </div>
                    </div>

                    {inq.notes && (
                      <p className="text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 italic">
                        "{inq.notes}"
                      </p>
                    )}

                    {/* Action Bar for Inquiry */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                      <div className="flex items-center gap-3 text-stone-600">
                        <span>📞 {inq.phone}</span>
                        {inq.email && <span>✉️ {inq.email}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        {inq.phone && (
                          <button
                            onClick={() => {
                              const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                              const msg = `Hello ${inq.name}, thank you for your enquiry with SABORA SPICES regarding ${inq.product}. We have reviewed your requirement for ${inq.quantity} to ${inq.destination}.`;
                              window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white" />
                            <span>Reply via WhatsApp</span>
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteInquiry && onDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 space-y-2">
                <MessageCircle className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-700">No Inquiries Received Yet</h3>
                <p className="text-xs max-w-sm mx-auto">
                  When prospective buyers fill out the quote request form on the website, their leads will appear here in real time.
                </p>
              </div>
            )}

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 4: SETTINGS & CLOUD SYNC
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Firebase Cloud Backend & Storage
                </h2>
                <p className="text-xs text-stone-500">
                  Configured credentials for project <strong className="text-stone-800">sabora-spices</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-stone-500">Project ID:</span>
                  <span className="font-bold text-stone-900">sabora-spices</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Auth Domain:</span>
                  <span className="text-stone-800">sabora-spices.firebaseapp.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Storage Bucket:</span>
                  <span className="text-stone-800">sabora-spices.firebasestorage.app</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Sync Status:</span>
                  <span className="text-emerald-700 font-bold">{firebaseStatus?.message}</span>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Reset to Factory Defaults</h3>
                  <p className="text-xs text-stone-500">
                    Restores the original verified products, pouches, and hero banner slides from the SABORA SPICES specification dossier.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Reset all products and hero banners back to factory default?")) {
                      onResetAll();
                      triggerSaveNotification("Reset completed! Reloading defaults...");
                      setTimeout(() => window.location.reload(), 1000);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4 text-amber-700" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
