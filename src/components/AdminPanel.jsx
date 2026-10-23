import React, { useState } from 'react';
import {
  X, Plus, Edit2, Trash2, Eye, EyeOff, Save, LogOut,
  ChevronDown, ChevronUp, Package, Settings, Image as ImageIcon,
  DollarSign, AlertCircle, CheckCircle2,
  ArrowLeft, Star, StarOff, ShieldCheck, Megaphone, BookOpen,
  Layout, RotateCcw, Sparkles, Sliders, Award, Anchor, MessageSquare, Quote
} from 'lucide-react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { DEFAULT_HOMEPAGE_CONFIG, DEFAULT_HERO_CONFIG } from '../hooks/useProducts';

// ─── Constants ─────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'sabora2024';

// Empty product template
const emptyProduct = () => ({
  id: `product-${Date.now()}`,
  name: '',
  subtitle: '',
  botanicalName: '',
  category: 'Whole Spices',
  featured: false,
  badge: '',
  tagline: '',
  image: '',
  rating: 4.95,
  reviewsCount: 0,
  moq: '50 Kg (Sample from 1 Kg)',
  origin: '',
  terroir: '',
  batchCode: `SB-${new Date().getFullYear()}/26`,
  euCompliance: 'EU MRL (EC) 396/2005 Compliant • Non-ETO • Steam Sterilized',
  incoterms: 'CIF Rotterdam / Hamburg / Antwerp / Genoa | FOB Cochin',
  leadTime: '3 - 5 Business Days',
  aromaNotes: [],
  gradesAvailable: [],
  specifications: [],
  packagingOptions: [],
  b2bIdealFor: [],
  // Pricing fields
  pricingEnabled: false,
  pricePerPiece: { value: '', label: 'Per Piece', visible: false },
  bulkPrice: { value: '', quantityLabel: 'Per 50 Kg', visible: false },
});

// ─── Toast notification ─────────────────────────────────────────────────────
function Toast({ message, type }) {
  return (
    <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2.5 px-5 py-3.5 rounded-lg shadow-xl text-xs font-bold transition-all uppercase tracking-wider font-mono ${type === 'success' ? 'bg-[#041A12] text-white border border-brass-500/50' : 'bg-red-800 text-white'}`}>
      {type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      <span>{message}</span>
    </div>
  );
}

// ─── Login Screen ───────────────────────────────────────────────────────────
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
      {/* Ambient glowing radial orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brass-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-8 space-y-6 relative z-10">
        <div className="text-center space-y-2.5">
          <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden border border-brass-400/80 shadow-md p-0.5 bg-white">
            <img src="/images/logo.jpg" alt="Sabora Spices" className="w-full h-full object-cover rounded-lg" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-slate-900 tracking-wider">SABORA SPICES</h1>
          <p className="text-[11px] text-brass-700 font-mono uppercase tracking-widest">European Catalog & Homepage Desk</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password (sabora2024)"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none text-xs transition-all font-mono"
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
            className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-emerald-950/20 font-mono"
          >
            Access Commercial Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Toggle switch UI ───────────────────────────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-lg transition-colors cursor-pointer border ${checked ? 'bg-[#041A12] border-brass-500/50' : 'bg-gray-200 border-gray-300'}`}
        aria-checked={checked}
        role="switch"
      >
        <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-xs shadow transition-transform ${checked ? 'translate-x-5 bg-brass-400' : ''}`} />
      </button>
      {label && <span className="text-xs font-bold text-charcoal-800 uppercase tracking-wider font-mono">{label}</span>}
    </label>
  );
}

// ─── Array field editor ─────────────────────────────────────────────────────
function ArrayField({ label, values = [], onChange }) {
  const add = () => onChange([...values, '']);
  const update = (i, v) => { const a = [...values]; a[i] = v; onChange(a); };
  const remove = (i) => onChange(values.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-charcoal-800 uppercase tracking-wider font-mono">{label}</label>
        <button type="button" onClick={add} className="text-xs text-brass-700 hover:text-brass-900 font-bold flex items-center gap-1 cursor-pointer font-mono">
          <Plus className="w-3.5 h-3.5" /> ADD ITEM
        </button>
      </div>
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={v}
            onChange={e => update(i, e.target.value)}
            placeholder={`${label} ${i + 1}`}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-emerald-600 outline-none transition-all font-sans"
          />
          <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 cursor-pointer p-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      {values.length === 0 && <p className="text-xs text-charcoal-400 italic">None configured.</p>}
    </div>
  );
}

// ─── Spec rows editor ───────────────────────────────────────────────────────
function SpecsField({ specs = [], onChange }) {
  const add = () => onChange([...specs, { label: '', value: '' }]);
  const update = (i, key, val) => {
    const a = [...specs];
    a[i] = { ...a[i], [key]: val };
    onChange(a);
  };
  const remove = (i) => onChange(specs.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-charcoal-800 uppercase tracking-wider font-mono">Technical Specifications (COA Dossier)</label>
        <button type="button" onClick={add} className="text-xs text-brass-700 hover:text-brass-900 font-bold flex items-center gap-1 cursor-pointer font-mono">
          <Plus className="w-3.5 h-3.5" /> ADD ROW
        </button>
      </div>
      {specs.map((spec, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={spec.label}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder="Analytical Parameter (e.g. Volatile Oil)"
            className="w-2/5 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-emerald-600 outline-none transition-all font-sans"
          />
          <input
            value={spec.value}
            onChange={e => update(i, 'value', e.target.value)}
            placeholder="Certified Benchmark (e.g. Min 7.5% - 8.2%)"
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-emerald-600 outline-none transition-all font-sans"
          />
          <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 cursor-pointer p-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      {specs.length === 0 && <p className="text-xs text-charcoal-400 italic">No specs added.</p>}
    </div>
  );
}

// ─── Product Form (add/edit) ─────────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({ ...emptyProduct(), ...initial }));

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setPricing = (pricingKey, subKey, val) =>
    setForm(f => ({ ...f, [pricingKey]: { ...f[pricingKey], [subKey]: val } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Basic Info */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 space-y-4">
        <h3 className="text-xs font-bold text-charcoal-900 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Package className="w-4 h-4 text-brass-700" /> Basic Information & Provenance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Product Name *</label>
            <input required value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. Green Cardamom (Elaichi)" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Subtitle</label>
            <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)}
              placeholder="e.g. Sortex Sorted 8mm+ Extra Bold Natural Green Pods" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Botanical Name (Latin)</label>
            <input value={form.botanicalName || ''} onChange={e => set('botanicalName', e.target.value)}
              placeholder="e.g. Elettaria cardamomum" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Category</label>
            <input value={form.category} onChange={e => set('category', e.target.value)}
              placeholder="e.g. Whole Spices" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Badge Label</label>
            <input value={form.badge} onChange={e => set('badge', e.target.value)}
              placeholder="e.g. Export Grade #1" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Harvest Origin / Region</label>
            <input value={form.origin || ''} onChange={e => set('origin', e.target.value)}
              placeholder="e.g. Idukki Hills, Kerala, India" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Commercial MOQ</label>
            <input value={form.moq || ''} onChange={e => set('moq', e.target.value)}
              placeholder="e.g. 50 Kg (Sample from 1 Kg)" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Dispatch Lead Time</label>
            <input value={form.leadTime || ''} onChange={e => set('leadTime', e.target.value)}
              placeholder="e.g. 3 - 5 Business Days" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Detailed Terroir Narrative</label>
            <input value={form.terroir || ''} onChange={e => set('terroir', e.target.value)}
              placeholder="e.g. Cardamom Hills, Idukki (1,100m elevation canopy)" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Batch / Harvest Lot Code</label>
            <input value={form.batchCode || ''} onChange={e => set('batchCode', e.target.value)}
              placeholder="e.g. SB-IDK-2025/26" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">EU Compliance Standard</label>
            <input value={form.euCompliance || ''} onChange={e => set('euCompliance', e.target.value)}
              placeholder="e.g. EU MRL (EC) 396/2005 Compliant • Non-ETO" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Export Incoterms & Ports</label>
            <input value={form.incoterms || ''} onChange={e => set('incoterms', e.target.value)}
              placeholder="e.g. CIF Rotterdam / Hamburg | FOB Cochin" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">Tagline / Narrative Description</label>
          <textarea value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} rows={2}
            placeholder="Artisanal description for product cards..." className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all resize-none" />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">Image URL or Local Asset Path</label>
          <input value={form.image || ''} onChange={e => set('image', e.target.value)}
            placeholder="e.g. /images/cardamom.png" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all font-mono" />
        </div>
      </div>

      {/* Pricing Controls */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-charcoal-900 flex items-center gap-2 uppercase tracking-wider font-mono">
            <DollarSign className="w-4 h-4 text-brass-700" /> Commercial Pricing Controls
          </h3>
          <Toggle checked={form.pricingEnabled} onChange={v => set('pricingEnabled', v)} label="Enable Price Displays" />
        </div>

        {form.pricingEnabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-charcoal-800">Unit / Per-Piece Price</span>
                <Toggle checked={form.pricePerPiece?.visible} onChange={v => setPricing('pricePerPiece', 'visible', v)} label="Visible" />
              </div>
              <input value={form.pricePerPiece?.value || ''} onChange={e => setPricing('pricePerPiece', 'value', e.target.value)}
                placeholder="e.g. €24 / Kg or $28" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none" />
              <input value={form.pricePerPiece?.label || ''} onChange={e => setPricing('pricePerPiece', 'label', e.target.value)}
                placeholder="Label (e.g. Per Kg / Unit)" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none" />
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-charcoal-800">Bulk / Volume Price</span>
                <Toggle checked={form.bulkPrice?.visible} onChange={v => setPricing('bulkPrice', 'visible', v)} label="Visible" />
              </div>
              <input value={form.bulkPrice?.value || ''} onChange={e => setPricing('bulkPrice', 'value', e.target.value)}
                placeholder="e.g. €19 / Kg (for 500+ Kg)" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none" />
              <input value={form.bulkPrice?.quantityLabel || ''} onChange={e => setPricing('bulkPrice', 'quantityLabel', e.target.value)}
                placeholder="Label (e.g. Container Load Rates)" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none" />
            </div>
          </div>
        )}
      </div>

      {/* Specifications & Packaging */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 space-y-5">
        <ArrayField label="Sensory Aroma Profile Notes (Tasting Pills)" values={form.aromaNotes || []} onChange={v => set('aromaNotes', v)} />
        <SpecsField specs={form.specifications || []} onChange={v => set('specifications', v)} />
        <ArrayField label="Available Calibrated Grades" values={form.gradesAvailable || []} onChange={v => set('gradesAvailable', v)} />
        <ArrayField label="Packaging Specifications" values={form.packagingOptions || []} onChange={v => set('packagingOptions', v)} />
        <ArrayField label="Ideal European Industries" values={form.b2bIdealFor || []} onChange={v => set('b2bIdealFor', v)} />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit"
          className="flex-1 py-4 bg-[#041A12] hover:bg-emerald-950 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 border border-brass-500/50 font-mono">
          <Save className="w-4 h-4" /> Save Product Lot
        </button>
        <button type="button" onClick={onCancel}
          className="px-6 py-4 bg-white border border-slate-200 hover:bg-slate-100 text-charcoal-700 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer font-mono">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Product Row (List Item) ────────────────────────────────────────────────
function ProductRow({ product, onEdit, onDelete, onToggleFeatured }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-2xs gap-4 hover:border-brass-500/60 transition-colors">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain"
            onError={e => { e.target.style.opacity = '0'; }} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-charcoal-900 truncate">{product.name}</p>
          <p className="text-xs text-charcoal-500 italic truncate font-serif">{product.botanicalName || product.subtitle}</p>
          <div className="flex items-center gap-2 mt-1">
            {product.featured && (
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-brass-100 text-brass-800 font-bold border border-brass-300 font-mono">
                ★ Hero Slide
              </span>
            )}
            {product.pricingEnabled && (
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 font-mono">
                $ Price Active
              </span>
            )}
            <span className="text-[10px] text-charcoal-400 font-mono">MOQ: {product.moq || '—'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onToggleFeatured(product.id)} title={product.featured ? 'Remove from Hero' : 'Add to Hero'}
          className={`p-2 rounded-lg transition-colors cursor-pointer border ${product.featured ? 'text-brass-800 bg-brass-100 border-brass-300' : 'text-charcoal-400 hover:text-brass-700 hover:bg-brass-50 border-transparent'}`}>
          {product.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
        </button>
        <button onClick={() => onEdit(product)} title="Edit product"
          className="p-2 rounded-lg text-[#041A12] hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(product.id)} title="Delete product"
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-slate-200">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Hero Config & Figures Editor ───────────────────────────────────────────
function HeroConfigEditor({ heroConfig, onSave }) {
  const [form, setForm] = useState(heroConfig || DEFAULT_HERO_CONFIG);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updateStat = (index, field, val) => {
    const updatedStats = [...(form.stats || [])];
    updatedStats[index] = { ...updatedStats[index], [field]: val };
    setForm(f => ({ ...f, stats: updatedStats }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6 font-sans">
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brass-700" /> Hero Headlines & Badges
        </h3>
        
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Hero Top Badge</label>
          <input value={form.badge || ''} onChange={e => set('badge', e.target.value)}
            placeholder="e.g. SINGLE-ORIGIN HARVEST • CROP 2025/26" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all font-mono" />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Hero Headline</label>
          <textarea value={form.headline} onChange={e => set('headline', e.target.value)} rows={2}
            placeholder="Main hero heading (use \n for line break)" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all resize-none font-serif text-base" />
          <p className="text-[10px] text-charcoal-400 mt-0.5 font-mono">Hint: Type \n to create an editorial line break.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Hero Narrative Subheading</label>
          <textarea value={form.subheading} onChange={e => set('subheading', e.target.value)} rows={2}
            placeholder="Supporting narrative under headline" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Primary WhatsApp CTA Text</label>
            <input value={form.ctaText} onChange={e => set('ctaText', e.target.value)}
              placeholder="e.g. Inquire on WhatsApp (1-Click)" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Secondary CTA Text</label>
            <input value={form.secondaryCtaText || ''} onChange={e => set('secondaryCtaText', e.target.value)}
              placeholder="e.g. Explore Catalog & Lab COA" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* 4 Key Figures Strip Controls */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brass-700" /> Key Figures & Commercial Metrics (4 Columns)
        </h3>
        <p className="text-xs text-charcoal-500">Customize the 4 quantitative trust figures displayed in the full-bleed hero banner.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(form.stats || []).map((st, i) => (
            <div key={st.id || i} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono font-bold text-brass-700 uppercase tracking-wider block">Figure № 0{i + 1}</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-charcoal-600 mb-0.5">Value</label>
                  <input
                    value={st.value}
                    onChange={e => updateStat(i, 'value', e.target.value)}
                    placeholder="e.g. 15+ Years"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-charcoal-600 mb-0.5">Label</label>
                  <input
                    value={st.label}
                    onChange={e => updateStat(i, 'label', e.target.value)}
                    placeholder="e.g. Heritage Terroir"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-charcoal-600 mb-0.5">Description</label>
                <input
                  value={st.desc}
                  onChange={e => updateStat(i, 'desc', e.target.value)}
                  placeholder="e.g. Generational estate cultivation"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="submit"
        className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 font-mono">
        <Save className="w-4 h-4" /> Save Hero & Figures Configuration
      </button>
    </form>
  );
}

// ─── Ticker & Announcement Editor ───────────────────────────────────────────
function AnnouncementEditor({ announcement, onSave }) {
  const [form, setForm] = useState(announcement || DEFAULT_HOMEPAGE_CONFIG.announcement);

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-5 font-sans">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div>
          <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Top Announcement Banner</h4>
          <p className="text-xs text-charcoal-500">Enable or disable the continuous trade announcement ticker at the top of the page.</p>
        </div>
        <Toggle checked={form.enabled} onChange={v => setForm(f => ({ ...f, enabled: v }))} label={form.enabled ? 'Enabled' : 'Disabled'} />
      </div>

      <div>
        <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Announcement Badge</label>
        <input
          value={form.badge}
          onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
          placeholder="e.g. EXPORT NOTICE"
          className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Marquee Ribbon Ticker Text</label>
        <textarea
          rows={3}
          value={form.text}
          onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
          placeholder="Continuous scrolling text displayed across the full width..."
          className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all"
        />
      </div>

      <button type="submit"
        className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 font-mono">
        <Save className="w-4 h-4" /> Save Announcement Settings
      </button>
    </form>
  );
}

// ─── Trust Badges & Statistics Editor ───────────────────────────────────────
function TrustBadgesEditor({ trustBadges, onSave }) {
  const [form, setForm] = useState(trustBadges || DEFAULT_HOMEPAGE_CONFIG.trustBadges);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-5 font-sans">
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">European Trust Badges Strip</h4>
        <p className="text-xs text-charcoal-500">Edit the 4 primary accreditation pillars shown immediately beneath the hero banner.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 font-mono">Rating Score</label>
          <input value={form.rating} onChange={e => set('rating', e.target.value)}
            placeholder="e.g. 4.95" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white font-bold" />
        </div>
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 font-mono">Rating Scale</label>
          <input value={form.ratingScale} onChange={e => set('ratingScale', e.target.value)}
            placeholder="e.g. / 5.0" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 font-mono">Review Count / Label</label>
          <input value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)}
            placeholder="e.g. 1,280+ Importers & Blenders" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
          <span className="text-[10px] font-bold uppercase text-brass-700 font-mono">Pillar 2: Terroir</span>
          <input value={form.pillar1Title} onChange={e => set('pillar1Title', e.target.value)}
            placeholder="Title" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
          <input value={form.pillar1Desc} onChange={e => set('pillar1Desc', e.target.value)}
            placeholder="Description" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
          <span className="text-[10px] font-bold uppercase text-brass-700 font-mono">Pillar 3: Standards</span>
          <input value={form.pillar2Title} onChange={e => set('pillar2Title', e.target.value)}
            placeholder="Title" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
          <input value={form.pillar2Desc} onChange={e => set('pillar2Desc', e.target.value)}
            placeholder="Description" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
          <span className="text-[10px] font-bold uppercase text-brass-700 font-mono">Pillar 4: Logistics</span>
          <input value={form.pillar3Title} onChange={e => set('pillar3Title', e.target.value)}
            placeholder="Title" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
          <input value={form.pillar3Desc} onChange={e => set('pillar3Desc', e.target.value)}
            placeholder="Description" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
        </div>
      </div>

      <button type="submit"
        className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 font-mono">
        <Save className="w-4 h-4" /> Save Trust Badges
      </button>
    </form>
  );
}

// ─── B2B Services Editor ────────────────────────────────────────────────────
function ServicesEditor({ services, onSave }) {
  const [form, setForm] = useState(services || DEFAULT_HOMEPAGE_CONFIG.services);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updateService = (index, field, val) => {
    const updated = [...(form.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setForm(f => ({ ...f, items: updated }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-5 font-sans">
      <div>
        <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Section Headline</label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Section Headline" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white font-serif text-base" />
      </div>

      <div>
        <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Section Subtitle</label>
        <textarea rows={2} value={form.subtitle} onChange={e => set('subtitle', e.target.value)}
          placeholder="Supporting narrative for services..." className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white resize-none" />
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">3 Core B2B Offerings</h4>
        {(form.items || []).map((srv, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg border border-slate-200 space-y-2.5">
            <span className="text-[10px] font-bold uppercase text-brass-700 font-mono">Service {srv.num || `0${idx + 1}`}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={srv.title} onChange={e => updateService(idx, 'title', e.target.value)}
                placeholder="Service Title" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-bold" />
              <input value={srv.badge} onChange={e => updateService(idx, 'badge', e.target.value)}
                placeholder="Target Audience Badge" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
            </div>
            <textarea rows={2} value={srv.description} onChange={e => updateService(idx, 'description', e.target.value)}
              placeholder="Description..." className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 resize-none" />
          </div>
        ))}
      </div>

      <button type="submit"
        className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 font-mono">
        <Save className="w-4 h-4" /> Save B2B Services Configuration
      </button>
    </form>
  );
}

// ─── Terroir Story & Manifesto Editor (including all 4 accordions) ───────────
function StoryEditor({ story, onSave }) {
  const [form, setForm] = useState(story || DEFAULT_HOMEPAGE_CONFIG.story);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updateAccordion = (index, field, val) => {
    const updated = [...(form.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setForm(f => ({ ...f, items: updated }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6 font-sans">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Section Headline</label>
          <input
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="e.g. Crafted by ancient terroirs, certified by European standards."
            className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all font-serif text-base"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Section Subtitle</label>
          <textarea
            rows={2}
            value={form.subtitle}
            onChange={e => set('subtitle', e.target.value)}
            placeholder="Supporting narrative for the terroir section..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Manifesto Italic Quote</label>
          <textarea
            rows={3}
            value={form.manifestoQuote}
            onChange={e => set('manifestoQuote', e.target.value)}
            placeholder="The core philosophical statement displayed prominently..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all font-serif italic text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Commercial Guarantees Paragraph</label>
          <textarea
            rows={3}
            value={form.paragraph}
            onChange={e => set('paragraph', e.target.value)}
            placeholder="Detailed narrative on batch testing and European port delivery..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-emerald-600 outline-none transition-all"
          />
        </div>
      </div>

      {/* 4 Accordion Pillars Editor */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">4 Terroir & Quality Accordion Pillars</h4>
        {(form.items || []).map((acc, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg border border-slate-200 space-y-2.5">
            <span className="text-[10px] font-bold uppercase text-brass-700 font-mono">Accordion Pillar {acc.num || `0${idx + 1}`}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={acc.title} onChange={e => updateAccordion(idx, 'title', e.target.value)}
                placeholder="Pillar Title" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-bold" />
              <input value={acc.subtitle} onChange={e => updateAccordion(idx, 'subtitle', e.target.value)}
                placeholder="Pillar Subtitle" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
            </div>
            <textarea rows={3} value={acc.content} onChange={e => updateAccordion(idx, 'content', e.target.value)}
              placeholder="Full analytical content..." className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 resize-none" />
          </div>
        ))}
      </div>

      <button type="submit"
        className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 font-mono">
        <Save className="w-4 h-4" /> Save Terroir Manifesto & Accordions
      </button>
    </form>
  );
}

// ─── Client Reviews Editor ──────────────────────────────────────────────────
function ReviewsEditor({ reviews, onSave }) {
  const [form, setForm] = useState(reviews || DEFAULT_HOMEPAGE_CONFIG.reviews);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updateReview = (index, field, val) => {
    const updated = [...(form.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setForm(f => ({ ...f, items: updated }));
  };

  const addReview = () => {
    setForm(f => ({
      ...f,
      items: [
        ...(f.items || []),
        {
          date: new Date().toLocaleDateString('en-GB'),
          rating: 5,
          quote: "New European trade testimonial...",
          author: "Name",
          designation: "Procurement Manager",
          company: "Company Name",
          location: "Rotterdam, Netherlands"
        }
      ]
    }));
  };

  const removeReview = (index) => {
    setForm(f => ({ ...f, items: (f.items || []).filter((_, i) => i !== index) }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6 font-sans">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Section Headline</label>
          <input value={form.title} onChange={e => set('title', e.target.value)}
            placeholder="Headline" className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 bg-white font-serif text-base" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Audited Score</label>
            <input value={form.score} onChange={e => set('score', e.target.value)}
              placeholder="e.g. 4.95" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1 uppercase tracking-wider font-mono">Score Scale</label>
            <input value={form.scale} onChange={e => set('scale', e.target.value)}
              placeholder="e.g. / 5.0 Rating" className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Client Endorsement Entries ({(form.items || []).length})</h4>
          <button type="button" onClick={addReview} className="text-xs text-brass-700 hover:text-brass-900 font-bold flex items-center gap-1 cursor-pointer font-mono">
            <Plus className="w-3.5 h-3.5" /> ADD TESTIMONIAL
          </button>
        </div>

        {(form.items || []).map((rev, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg border border-slate-200 space-y-3 relative">
            <button type="button" onClick={() => removeReview(idx)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer p-1">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
              <input value={rev.author} onChange={e => updateReview(idx, 'author', e.target.value)}
                placeholder="Author Name" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-bold" />
              <input value={rev.designation} onChange={e => updateReview(idx, 'designation', e.target.value)}
                placeholder="Role / Title" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
              <input value={rev.company} onChange={e => updateReview(idx, 'company', e.target.value)}
                placeholder="Company Name" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={rev.location} onChange={e => updateReview(idx, 'location', e.target.value)}
                placeholder="Location (e.g. Amsterdam, Netherlands)" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200" />
              <input value={rev.date} onChange={e => updateReview(idx, 'date', e.target.value)}
                placeholder="Date" className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-mono" />
            </div>
            <textarea rows={3} value={rev.quote} onChange={e => updateReview(idx, 'quote', e.target.value)}
              placeholder="Testimonial Quote..." className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 font-serif italic" />
          </div>
        ))}
      </div>

      <button type="submit"
        className="w-full py-4 bg-[#041A12] hover:bg-emerald-950 text-white border border-brass-500/50 rounded-lg font-bold text-xs uppercase tracking-wider shadow-soft transition-all cursor-pointer flex items-center justify-center gap-2 font-mono">
        <Save className="w-4 h-4" /> Save Client Endorsements
      </button>
    </form>
  );
}

// ─── Section Visibility Controls ────────────────────────────────────────────
function SectionVisibilityEditor({ sections, onSave }) {
  const [form, setForm] = useState(sections || DEFAULT_HOMEPAGE_CONFIG.sections);

  const toggle = (key) => {
    const updated = { ...form, [key]: !form[key] };
    setForm(updated);
    onSave(updated);
  };

  const sectionItems = [
    { key: 'showTicker', label: 'Top Announcement Marquee Ribbon', desc: 'Continuous running trade ticker at the top of the screen' },
    { key: 'showTrustBadges', label: 'Trust Badges & Quality Assurance Strip', desc: '4-column metric figures (4.95 rating, Terroir, EU MRL, CIF ports)' },
    { key: 'showCatalog', label: 'Wholesale Spices Catalog Grid', desc: 'Product cards, filter tabs, live search, and Sample Kit banner' },
    { key: 'showB2BServices', label: 'B2B & Private Label Services', desc: 'OEM retail packaging, bulk ocean freight, institutional contracts' },
    { key: 'showStory', label: 'Terroir Quality Manifesto & Accordion', desc: 'Single-estate sourcing manifesto and technical testing accordions' },
    { key: 'showReviews', label: 'Verified Client Endorsements', desc: 'Endorsements from Dutch, German, French, and Scandinavian importers' },
    { key: 'showRFQ', label: 'Direct Bulk RFQ Form', desc: 'Instant quotation request form linked to WhatsApp desk' },
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Homepage Section Layout Manager</h4>
        <p className="text-xs text-charcoal-500">Toggle individual sections on or off to tailor the European landing experience in real-time.</p>
      </div>

      <div className="space-y-3">
        {sectionItems.map(item => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <div>
              <p className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">{item.label}</p>
              <p className="text-xs text-charcoal-500 mt-0.5">{item.desc}</p>
            </div>
            <Toggle checked={form[item.key] !== false} onChange={() => toggle(item.key)} label={form[item.key] !== false ? 'Visible' : 'Hidden'} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Admin Panel ────────────────────────────────────────────────────────
export default function AdminPanel({
  products,
  homepageConfig = DEFAULT_HOMEPAGE_CONFIG,
  heroConfig,
  onSaveProducts,
  onSaveHomepageConfig,
  onSaveHeroConfig,
  onResetAll,
  onClose
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null);
  const [tab, setTab] = useState('products'); // 'products' | 'hero' | 'announcement' | 'trustBadges' | 'services' | 'story' | 'reviews' | 'sections'
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  // ── Product handlers ──
  const handleSaveProduct = (formData) => {
    let updated;
    if (editTarget) {
      updated = products.map(p => p.id === formData.id ? { ...formData } : p);
    } else {
      updated = [...products, { ...formData, id: `product-${Date.now()}` }];
    }
    onSaveProducts(updated);
    setView('list');
    setEditTarget(null);
    showToast(editTarget ? 'Product updated successfully!' : 'New product lot added!');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Permanently delete this product lot from the catalog?')) return;
    onSaveProducts(products.filter(p => p.id !== id));
    showToast('Product lot deleted.', 'error');
  };

  const handleToggleFeatured = (id) => {
    onSaveProducts(products.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    showToast('Hero showcase slide updated!');
  };

  const handleSaveHero = (heroData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, hero: heroData });
    } else if (onSaveHeroConfig) {
      onSaveHeroConfig(heroData);
    }
    showToast('Hero section & metrics updated!');
  };

  const handleSaveAnnouncement = (announcementData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, announcement: announcementData });
    }
    showToast('Announcement ticker updated!');
  };

  const handleSaveTrustBadges = (trustData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, trustBadges: trustData });
    }
    showToast('Trust badges & stats updated!');
  };

  const handleSaveServices = (servicesData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, services: servicesData });
    }
    showToast('B2B Services updated!');
  };

  const handleSaveStory = (storyData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, story: storyData });
    }
    showToast('Terroir manifesto & accordions updated!');
  };

  const handleSaveReviews = (reviewsData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, reviews: reviewsData });
    }
    showToast('Client reviews updated!');
  };

  const handleSaveSections = (sectionsData) => {
    if (onSaveHomepageConfig) {
      onSaveHomepageConfig({ ...homepageConfig, sections: sectionsData });
    }
    showToast('Section visibility updated!');
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Reset all catalog lots and homepage settings to factory defaults? This will erase all admin edits.')) return;
    if (onResetAll) {
      onResetAll();
    } else {
      localStorage.clear();
      window.location.reload();
    }
    showToast('Factory defaults restored.');
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-charcoal-900 pb-20">
      {toast && <Toast {...toast} />}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-2xs">
        <div className="w-full px-4 sm:px-8 md:px-12 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-brass-400 p-0.5 bg-white">
              <img src="/images/logo.jpg" alt="Sabora" className="w-full h-full object-cover rounded-xs" />
            </div>
            <div>
              <p className="font-cinzel font-bold text-base text-[#041A12] tracking-wider leading-none">SABORA SPICES</p>
              <p className="text-[10px] text-brass-700 font-mono uppercase tracking-widest mt-1">European Catalog & Homepage Admin</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-charcoal-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-slate-200 font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> View Public Site
            </button>
            <button onClick={() => setLoggedIn(false)}
              className="p-2.5 rounded-lg text-charcoal-500 hover:bg-slate-100 hover:text-charcoal-900 transition-colors cursor-pointer border border-transparent hover:border-slate-200" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-8 md:px-12 py-8 space-y-6">

        {/* Tab navigation — 8 Comprehensive Tabs */}
        {view === 'list' && (
          <div className="flex items-center gap-1.5 bg-white rounded-lg border border-slate-200 p-1.5 shadow-2xs overflow-x-auto w-full no-scrollbar">
            {[
              { key: 'products', label: '📦 Product Catalog', icon: Package },
              { key: 'hero', label: '🎨 Hero & Metrics', icon: Sparkles },
              { key: 'announcement', label: '📢 Ticker Ribbon', icon: Megaphone },
              { key: 'trustBadges', label: '🏆 Trust Badges', icon: Award },
              { key: 'services', label: '⚓ B2B Services', icon: Anchor },
              { key: 'story', label: '📜 Terroir & Accordions', icon: BookOpen },
              { key: 'reviews', label: '💬 Client Reviews', icon: Quote },
              { key: 'sections', label: '👁️ Section Visibility', icon: Layout }
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono ${
                  tab === t.key ? 'bg-[#041A12] text-white border border-brass-500/50 shadow-xs' : 'text-charcoal-600 hover:bg-slate-100'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* ── 1. PRODUCTS TAB ── */}
        {view === 'list' && tab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Commercial Lots ({products.length})</h2>
                <p className="text-xs text-charcoal-500 mt-0.5">Manage products, pricing visibility, MOQs, technical dossiers, and hero carousel selection.</p>
              </div>
              <div className="flex gap-2.5">
                <button onClick={handleResetDefaults}
                  className="px-3.5 py-2 text-xs font-bold text-charcoal-600 hover:text-red-700 border border-slate-200 hover:border-red-300 rounded-lg transition-all cursor-pointer bg-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
                </button>
                <button onClick={() => { setEditTarget(null); setView('add'); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#041A12] hover:bg-emerald-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-soft transition-all cursor-pointer border border-brass-500/50 font-mono">
                  <Plus className="w-4 h-4" /> Add Product Lot
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <ProductRow
                  key={p.id}
                  product={p}
                  onEdit={prod => { setEditTarget(prod); setView('edit'); }}
                  onDelete={handleDelete}
                  onToggleFeatured={handleToggleFeatured}
                />
              ))}
              {products.length === 0 && (
                <div className="col-span-2 text-center py-16 text-charcoal-400 bg-white rounded-lg border border-slate-200">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">No products currently in catalog.</p>
                  <button onClick={() => { setEditTarget(null); setView('add'); }}
                    className="mt-3 text-brass-700 hover:text-brass-900 text-xs font-bold uppercase tracking-wider cursor-pointer">
                    + Add your first product lot
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 2. HERO TAB ── */}
        {view === 'list' && tab === 'hero' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Hero Section & Figures Showcase</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Customize grand headline, narrative subheading, CTA buttons, and the 4 key commercial metrics.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <HeroConfigEditor heroConfig={homepageConfig?.hero || heroConfig || DEFAULT_HERO_CONFIG} onSave={handleSaveHero} />
            </div>

            <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
              <p className="text-xs font-bold text-charcoal-800 mb-2 uppercase tracking-wider font-mono">★ Active Hero Showcase Slides</p>
              <p className="text-xs text-charcoal-600 mb-3">Products marked with <strong>★ Hero Slide</strong> appear in the interactive hero pedestal. Toggle the ★ star in the Products tab to add or remove lots.</p>
              <div className="flex flex-wrap gap-2">
                {products.filter(p => p.featured).map(p => (
                  <div key={p.id} className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-charcoal-800">
                    <Star className="w-3.5 h-3.5 text-brass-600 fill-current" />
                    <span>{p.name}</span>
                  </div>
                ))}
                {products.filter(p => p.featured).length === 0 && (
                  <p className="text-xs text-charcoal-400 italic">No featured products selected. Hero displays the first 3 catalog products by default.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 3. ANNOUNCEMENT TICKER TAB ── */}
        {view === 'list' && tab === 'announcement' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Top Announcement & Marquee Ribbon</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Customize the live trade notice, CIF shipping updates, and marquee speed.</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <AnnouncementEditor announcement={homepageConfig?.announcement} onSave={handleSaveAnnouncement} />
            </div>
          </div>
        )}

        {/* ── 4. TRUST BADGES TAB ── */}
        {view === 'list' && tab === 'trustBadges' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">European Trust Badges & Accreditations</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Customize review score, importer count, and individual pillar headlines.</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <TrustBadgesEditor trustBadges={homepageConfig?.trustBadges} onSave={handleSaveTrustBadges} />
            </div>
          </div>
        )}

        {/* ── 5. B2B SERVICES TAB ── */}
        {view === 'list' && tab === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">B2B & Private Label Services</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Customize service titles, badges, descriptions, and WhatsApp inquiry templates.</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <ServicesEditor services={homepageConfig?.services} onSave={handleSaveServices} />
            </div>
          </div>
        )}

        {/* ── 6. TERROIR STORY & ACCORDIONS TAB ── */}
        {view === 'list' && tab === 'story' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Terroir Story & Quality Accordions</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Customize the philosophical manifesto, commercial narrative, and all 4 analytical accordion pillars.</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <StoryEditor story={homepageConfig?.story} onSave={handleSaveStory} />
            </div>
          </div>
        )}

        {/* ── 7. CLIENT REVIEWS TAB ── */}
        {view === 'list' && tab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">European Client Endorsements</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Manage international B2B buyer reviews, ratings, company names, and testimonials.</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <ReviewsEditor reviews={homepageConfig?.reviews} onSave={handleSaveReviews} />
            </div>
          </div>
        )}

        {/* ── 8. SECTION VISIBILITY TAB ── */}
        {view === 'list' && tab === 'sections' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Homepage Section Visibility</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Show or hide specific homepage blocks to optimize your commercial landing flow.</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <SectionVisibilityEditor sections={homepageConfig?.sections} onSave={handleSaveSections} />
            </div>
          </div>
        )}

        {/* ── ADD / EDIT PRODUCT FORM ── */}
        {(view === 'add' || view === 'edit') && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={() => { setView('list'); setEditTarget(null); }}
                className="p-2.5 rounded-lg border border-slate-200 text-charcoal-600 hover:bg-white transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                {view === 'edit' ? `Edit Product Lot: ${editTarget?.name}` : 'Add New Commercial Spice Lot'}
              </h2>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 shadow-soft p-6 sm:p-8">
              <ProductForm
                initial={editTarget ?? emptyProduct()}
                onSave={handleSaveProduct}
                onCancel={() => { setView('list'); setEditTarget(null); }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
