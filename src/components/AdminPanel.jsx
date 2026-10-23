import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  LogOut, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Sparkles, 
  Image as ImageIcon, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Upload, 
  X,
  Lock
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

function Toast({ message, type }) {
  return (
    <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-xs font-bold font-mono tracking-wider transition-all ${
      type === 'success' 
        ? 'bg-[#041A12] text-white border border-emerald-500/40' 
        : 'bg-red-950 text-white border border-red-500/40'
    }`}>
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}

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
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-stone-200/90 shadow-2xl p-8 space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#041A12] text-white flex items-center justify-center mx-auto mb-3 border border-amber-400/40 shadow-sm">
            <Lock className="w-5 h-5 text-amber-300" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Sabora Admin Desk
          </h1>
          <p className="text-xs text-stone-500">
            Enter your management password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#041A12] hover:bg-[#082E20] text-white text-xs font-mono font-bold tracking-wider uppercase border border-amber-400/40 shadow-sm transition-all cursor-pointer"
          >
            Access Management Console
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductModalForm({ isOpen, onClose, product, onSave }) {
  const isEditing = Boolean(product);
  const [formData, setFormData] = useState({
    id: product?.id || `product-${Date.now()}`,
    name: product?.name || '',
    subtitle: product?.subtitle || '',
    botanicalName: product?.botanicalName || '',
    category: product?.category || 'Whole Spices',
    image: product?.image || '/images/cardamom.png',
    moq: product?.moq || '50 Kg',
    origin: product?.origin || 'Idukki, Kerala, India',
    badge: product?.badge || 'Export Grade #1',
    featured: product?.featured ?? false,
    price: product?.bulkPrice?.value || '',
  });
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 800, 0.85);
      setFormData(prev => ({ ...prev, image: compressedDataUrl }));
    } catch {
      alert('Could not read image file. Please choose a valid JPG/PNG/WEBP.');
    } finally {
      setIsUploading(false);
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
      botanicalName: formData.botanicalName.trim(),
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
      specifications: product?.specifications || [
        { label: 'Origin', value: formData.origin.trim() || 'Direct Origin' },
        { label: 'Grade', value: formData.badge.trim() || 'Sortex Cleaned' },
        { label: 'MOQ', value: formData.moq.trim() || '50 Kg' }
      ]
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 my-8">
        
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Enter product specifications for your European wholesale catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Green Cardamom (Elaichi)"
              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                Botanical Name
              </label>
              <input
                type="text"
                value={formData.botanicalName}
                onChange={e => setFormData({ ...formData, botanicalName: e.target.value })}
                placeholder="e.g. Elettaria cardamomum"
                className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
              >
                <option value="Whole Spices">Whole Spices</option>
                <option value="Gourmet & Healthy Agro">Gourmet & Healthy Agro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
              Short Description / Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Sortex Sorted 8mm+ Extra Bold Natural Green Pods"
              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                Origin / Terroir
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={e => setFormData({ ...formData, origin: e.target.value })}
                placeholder="e.g. Idukki, Kerala"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                Quality Badge
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={e => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Export Grade #1"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
                MOQ
              </label>
              <input
                type="text"
                value={formData.moq}
                onChange={e => setFormData({ ...formData, moq: e.target.value })}
                placeholder="e.g. 50 Kg"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1">
              Wholesale Price (Optional)
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g. $18.50/kg CIF Rotterdam (Leave blank for Inquire)"
              className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          {/* Product Image Section */}
          <div className="space-y-2 pt-1 border-t border-stone-100">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
              Product Photo
            </label>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl border border-stone-200 overflow-hidden bg-stone-50 flex items-center justify-center shrink-0 p-1">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.src = '/images/cardamom.png'; }}
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Compressing...' : 'Upload Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>

                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or enter Image URL"
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Preset quick buttons */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-stone-400 font-mono uppercase">Presets:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: preset.url })}
                  className="px-2 py-0.5 rounded text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#041A12] hover:bg-[#082E20] text-white text-xs font-mono font-bold tracking-wider uppercase border border-amber-400/40 shadow-sm cursor-pointer"
            >
              {isEditing ? 'Update Product' : 'Create Product'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

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

  // Hero section editing state
  const [heroHeadline, setHeroHeadline] = useState(heroConfig?.headline || 'Artisanal Whole Spices.\nDirect From Origin.');
  const [heroSubheading, setHeroSubheading] = useState(heroConfig?.subheading || 'Single-estate harvests curated for European spice blenders, tea ateliers, and organic brands. Laser sortex-graded with direct CIF port delivery.');

  // Modal editing state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleSaveHero = (e) => {
    e.preventDefault();
    if (onSaveHeroConfig) {
      onSaveHeroConfig({
        headline: heroHeadline,
        subheading: heroSubheading
      });
      showToast('Hero section updated successfully!');
    }
  };

  const handleToggleFeatured = (productId) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, featured: !p.featured } : p
    );
    if (onSaveProducts) {
      onSaveProducts(updated);
      showToast('Product featured status updated');
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to remove this product from the catalog?')) {
      const updated = products.filter(p => p.id !== productId);
      if (onSaveProducts) {
        onSaveProducts(updated);
        showToast('Product deleted from catalog', 'success');
      }
    }
  };

  const handleSaveProduct = (productData) => {
    let updated;
    const exists = products.some(p => p.id === productData.id);
    if (exists) {
      updated = products.map(p => p.id === productData.id ? productData : p);
      showToast(`Updated "${productData.name}"`);
    } else {
      updated = [productData, ...products];
      showToast(`Added "${productData.name}"`);
    }
    if (onSaveProducts) {
      onSaveProducts(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all catalog products and hero settings back to factory defaults?')) {
      if (onResetAll) {
        onResetAll();
        showToast('Reset all data to defaults');
        setHeroHeadline('Artisanal Whole Spices.\nDirect From Origin.');
        setHeroSubheading('Single-estate harvests curated for European spice blenders, tea ateliers, and organic brands. Laser sortex-graded with direct CIF port delivery.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans pb-20">
      
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-stone-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400 p-0.5 bg-white shrink-0">
              <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="font-cinzel text-base font-bold tracking-wider text-stone-900 block">
                SABORA ADMIN
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                Management Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#041A12] hover:bg-[#082E20] text-white text-xs font-mono font-bold tracking-wider uppercase border border-amber-400/40 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Website</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-10">
        
        {/* Section 1: Hero Section Editor */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Section Editor
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-2">
              Homepage Hero Section
            </h2>
            <p className="text-xs text-stone-500 font-sans">
              Update the headline and subline shown at the top of the European showcase.
            </p>
          </div>

          <form onSubmit={handleSaveHero} className="space-y-4 max-w-3xl">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Hero Headline (Supports line breaks)
              </label>
              <textarea
                rows={2}
                value={heroHeadline}
                onChange={e => setHeroHeadline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-serif font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Hero Subheading
              </label>
              <textarea
                rows={2}
                value={heroSubheading}
                onChange={e => setHeroSubheading(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-sans text-stone-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-[#041A12] text-white text-xs font-mono font-bold uppercase tracking-wider border border-amber-400/40 shadow-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Hero Settings</span>
              </button>
            </div>
          </form>
        </section>

        {/* Section 2: Product Catalog Manager */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Catalog Manager
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                Products & Wholesale Inventory
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Manage spices, package photos, MOQs, and pricing.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#041A12] to-[#082E20] text-white text-xs font-mono font-bold uppercase tracking-wider border border-amber-400/40 shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Product List Table / Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 font-mono uppercase tracking-wider text-stone-400 text-[10px]">
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">MOQ</th>
                  <th className="py-3 px-3">Wholesale Price</th>
                  <th className="py-3 px-3 text-center">Featured</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50/80 transition-colors">
                    
                    {/* Thumbnail + Name */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => { e.target.src = '/images/cardamom.png'; }}
                          />
                        </div>
                        <div>
                          <span className="font-serif font-bold text-sm text-stone-900 block">
                            {product.name}
                          </span>
                          {product.botanicalName && (
                            <span className="font-serif italic text-[11px] text-stone-500 block">
                              {product.botanicalName}
                            </span>
                          )}
                          <span className="text-[10px] text-stone-400 font-mono block">
                            {product.origin || 'Origin Direct'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 text-stone-600 font-mono text-[11px]">
                      {product.category}
                    </td>

                    {/* MOQ */}
                    <td className="py-3.5 px-3 font-mono text-stone-800 font-semibold">
                      {(product.moq || '50 Kg').split('(')[0].trim()}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3 font-mono">
                      {product.bulkPrice?.visible && product.bulkPrice?.value ? (
                        <span className="font-bold text-emerald-800">{product.bulkPrice.value}</span>
                      ) : (
                        <span className="text-stone-400">Inquire CIF</span>
                      )}
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          product.featured
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-stone-300 hover:text-stone-400'
                        }`}
                        title={product.featured ? 'Featured on Showcase' : 'Not Featured'}
                      >
                        <Star className={`w-4 h-4 ${product.featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Add / Edit Product Modal */}
      <ProductModalForm
        key={editingProduct?.id || 'new'}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

    </div>
  );
}
