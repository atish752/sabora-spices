import React, { useState, useRef } from 'react';
import {
  Plus, Edit2, Trash2, Save, LogOut, ArrowLeft,
  CheckCircle2, AlertCircle, Star, Sparkles, Image as ImageIcon,
  RotateCcw, Eye, ShieldCheck, Tag, DollarSign, Package, Upload, X
} from 'lucide-react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

const ADMIN_PASSWORD = 'sabora2024';

const PRESET_IMAGES = [
  { label: 'Cardamom Pack', url: '/images/cardamom.png' },
  { label: 'Turmeric Pack', url: '/images/turmeric-whole.png' },
  { label: 'Makhana Pack', url: '/images/makhana-fox-nuts.png' },
];

/**
 * Client-side high-fidelity image compressor.
 * Compresses uploaded images to max 800px width/height to guarantee ultra-fast loading
 * and stay well within localStorage storage quotas.
 */
function compressImageFile(file, maxWidth = 800, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Invalid image file'));
    }
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Toast notification
function Toast({ message, type }) {
  return (
    <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-xl text-xs font-bold transition-all uppercase tracking-wider font-mono ${
      type === 'success' ? 'bg-[#041A12] text-white border border-emerald-500/40' : 'bg-red-900 text-white border border-red-500/40'
    }`}>
      {type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />}
      <span>{message}</span>
    </div>
  );
}

// Login Screen
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBFA] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-amber-400/80 shadow-md p-0.5 bg-white">
            <img src="/images/logo.jpg" alt="Sabora Spices" className="w-full h-full object-cover rounded-xl" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-slate-900 tracking-wider">SABORA SPICES</h1>
          <p className="text-xs text-amber-700 font-mono uppercase tracking-widest font-semibold">Store Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password (sabora2024)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none text-xs transition-all font-mono"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#041A12] hover:bg-emerald-950 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-emerald-950/20 font-mono"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// Add / Edit Product Modal with Instant Photo Upload & Compression
function ProductModal({ product, isOpen, onClose, onSave }) {
  const isEditing = Boolean(product?.id);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const [formData, setFormData] = useState({
    id: product?.id || `product-${Date.now()}`,
    name: product?.name || '',
    subtitle: product?.subtitle || '',
    category: product?.category || 'Whole Spices',
    image: product?.image || '/images/cardamom.png',
    moq: product?.moq || '50 Kg',
    origin: product?.origin || '',
    badge: product?.badge || '',
    price: product?.bulkPrice?.value || product?.price || '',
    featured: product?.featured ?? false,
  });

  if (!isOpen) return null;

  const handleFileSelect = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 800, 0.85);
      setFormData(prev => ({ ...prev, image: compressedDataUrl }));
    } catch (err) {
      alert('Could not read image file. Please choose a valid JPG/PNG/WEBP.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const savedProduct = {
      ...(product || {}),
      id: formData.id,
      name: formData.name.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category,
      image: formData.image.trim(),
      moq: formData.moq.trim(),
      origin: formData.origin.trim(),
      badge: formData.badge.trim(),
      featured: formData.featured,
      pricingEnabled: Boolean(formData.price.trim()),
      bulkPrice: {
        value: formData.price.trim(),
        quantityLabel: 'Wholesale Rate',
        visible: Boolean(formData.price.trim())
      },
      // Ensure essential arrays remain valid for the public site view
      aromaNotes: product?.aromaNotes || ['Authentic Terroir', 'Natural Aroma'],
      gradesAvailable: product?.gradesAvailable || ['Export Standard'],
      specifications: product?.specifications || [
        { label: 'Origin', value: formData.origin.trim() || 'Direct Origin' },
        { label: 'Grade', value: formData.badge.trim() || 'Sortex Cleaned' },
        { label: 'MOQ', value: formData.moq.trim() || '50 Kg' }
      ],
      packagingOptions: product?.packagingOptions || ['Multiwall Kraft Bags', 'Nitrogen Pouches']
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Enter essential product details for your European catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-sm font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Green Cardamom (Elaichi)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          {/* Subtitle / Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
              Short Description / Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Sortex Sorted 8mm+ Extra Bold Natural Green Pods"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
              >
                <option value="Whole Spices">Whole Spices</option>
                <option value="Gourmet & Healthy Agro">Gourmet & Healthy Agro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={e => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Export Grade #1"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          {/* Photo Uploader (File / Dropzone / Presets) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
              Product Photo Upload
            </label>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            {/* Image Preview or Drop Area */}
            {formData.image ? (
              <div className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    Photo attached
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    {formData.image.startsWith('data:') ? 'Custom uploaded image (optimized)' : formData.image}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-mono font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                    >
                      Upload Different
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="text-[11px] font-mono font-bold text-red-600 hover:text-red-800 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-300 hover:border-emerald-600/60 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 mb-2 shadow-2xs">
                  <Upload className="w-5 h-5 text-emerald-700" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {isUploading ? 'Optimizing photo...' : 'Click to upload photo or drag & drop'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  PNG, JPG, or WEBP (auto-compressed for speed)
                </p>
              </div>
            )}

            {/* Quick Presets & Alternative URL Link */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Presets:</span>
                {PRESET_IMAGES.map((preset) => (
                  <button
                    type="button"
                    key={preset.url}
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`text-[10px] px-2 py-0.5 rounded-md border font-mono transition-all ${
                      formData.image === preset.url
                        ? 'bg-[#041A12] text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label.split(' ')[0]}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-800 underline"
              >
                {showUrlInput ? 'Hide URL' : 'Use URL'}
              </button>
            </div>

            {showUrlInput && (
              <input
                type="text"
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste external/public image URL..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none mt-1"
              />
            )}
          </div>

          {/* MOQ, Origin, and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                MOQ
              </label>
              <input
                type="text"
                value={formData.moq}
                onChange={e => setFormData({ ...formData, moq: e.target.value })}
                placeholder="e.g. 50 Kg"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                Origin
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={e => setFormData({ ...formData, origin: e.target.value })}
                placeholder="e.g. Idukki, Kerala"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                Price (Optional)
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. €28 / Kg"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          {/* Featured on Hero Toggle */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                Showcase on Hero Slider
              </p>
              <p className="text-[11px] text-slate-500">
                Featured products appear prominently in the top hero showcase.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, featured: !formData.featured })}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer border ${
                formData.featured ? 'bg-emerald-600 border-emerald-700' : 'bg-slate-200 border-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  formData.featured ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-mono text-xs font-bold uppercase transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#041A12] hover:bg-emerald-950 text-white font-mono text-xs font-bold uppercase transition-all shadow-md"
            >
              {isEditing ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Simple Admin Panel ──
export default function AdminPanel({
  products = [],
  heroConfig = {},
  onSaveProducts,
  onSaveHeroConfig,
  onResetAll,
  onClose
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hero text quick editor
  const [headline, setHeadline] = useState(heroConfig?.headline || 'Artisanal Single-Estate Spices,\nDirect From Origin');
  const [subheading, setSubheading] = useState(heroConfig?.subheading || 'Direct plantation harvest for European blenders, tea ateliers & food purveyors. Optical sortex graded, EU MRL compliant & steam sterilized.');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // Handle saving hero headline & subline
  const handleSaveHero = () => {
    onSaveHeroConfig({ headline, subheading });
    showToast('Hero text updated successfully');
  };

  // Handle toggling featured state
  const handleToggleFeatured = (productId) => {
    const updated = products.map(p => p.id === productId ? { ...p, featured: !p.featured } : p);
    onSaveProducts(updated);
    showToast('Product featured status updated');
  };

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== productId);
      onSaveProducts(updated);
      showToast('Product deleted');
    }
  };

  // Handle saving product from modal
  const handleSaveProduct = (productData) => {
    const exists = products.some(p => p.id === productData.id);
    let updated;
    if (exists) {
      updated = products.map(p => p.id === productData.id ? { ...p, ...productData } : p);
      showToast('Product details updated');
    } else {
      updated = [productData, ...products];
      showToast('New product added successfully');
    }
    onSaveProducts(updated);
  };

  return (
    <div className="min-h-screen bg-[#F9FBFA] text-slate-900 font-sans pb-20 selection:bg-[#041A12] selection:text-amber-300">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200"
              title="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/80 bg-white shadow-xs p-0.5">
              <img src="/images/logo.jpg" alt="Sabora" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-lg font-bold text-slate-900 tracking-wider">
                  SABORA SPICES
                </h1>
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                  Admin Desk
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                {products.length} Products in Catalog • Fast Simplified Editor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold uppercase transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Site</span>
            </button>

            <button
              onClick={() => {
                setActiveModalProduct(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#041A12] hover:bg-emerald-950 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-500 transition-colors border border-slate-200"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Simple Hero Section Editor Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Hero Section Headline & Message
              </h2>
            </div>
            <button
              onClick={handleSaveHero}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#041A12] hover:bg-emerald-900 text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-amber-300" />
              <span>Save Hero Text</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                Main Headline
              </label>
              <textarea
                rows={2}
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                placeholder="Artisanal Single-Estate Spices, Direct From Origin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider font-mono">
                Subheading / Value Proposition
              </label>
              <textarea
                rows={2}
                value={subheading}
                onChange={e => setSubheading(e.target.value)}
                placeholder="Direct plantation harvest for European blenders, tea ateliers..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Product Catalog List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Catalog Products ({products.length})
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Quickly add, edit, or toggle products featured in the hero.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveModalProduct(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Product</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top row: thumbnail & category & status */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.src = '/images/cardamom.png';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {p.category || 'Spice'}
                        </span>
                        {p.featured && (
                          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            Hero
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-base text-slate-900 mt-1 truncate">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate font-sans">
                        {p.subtitle || p.botanicalName || 'Single-estate harvest'}
                      </p>
                    </div>
                  </div>

                  {/* Quick Meta */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">MOQ</span>
                      <span className="font-bold text-slate-700 truncate block">{p.moq || '50 Kg'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Origin</span>
                      <span className="font-bold text-slate-700 truncate block">{p.origin ? p.origin.split(',')[0] : 'Origin direct'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  {/* Hero Toggle */}
                  <button
                    onClick={() => handleToggleFeatured(p.id)}
                    className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      p.featured
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Toggle appearance in hero carousel"
                  >
                    <Star className={`w-3.5 h-3.5 ${p.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{p.featured ? 'Featured' : 'Feature'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setActiveModalProduct(p);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Reset Section */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            All changes are stored locally in your browser session. Password: <code className="font-mono font-bold text-slate-700">sabora2024</code>
          </p>
          <button
            onClick={() => {
              if (window.confirm('Reset all catalog and homepage data back to original defaults?')) {
                onResetAll();
                showToast('All data reset to factory defaults');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-red-600 hover:text-red-700 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>

      </main>

      {/* Product Add / Edit Modal */}
      <ProductModal
        product={activeModalProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveModalProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
