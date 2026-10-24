import React from 'react';
import { ChevronRight, Home, Leaf, MessageCircle, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function PageHeaderBanner({
  badge,
  title,
  subtitle,
  breadcrumbCurrent,
  onNavigate,
  onOpenQuoteModal
}) {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#031710] via-[#082E20] to-[#041A12] text-white border-b border-emerald-900/60 overflow-hidden py-10 sm:py-14 lg:py-16">
      {/* Background Accent Gradients */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px), radial-gradient(#10B981 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Content (Spans max-w-[1440px] with responsive gutters) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 space-y-4">
        
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-300 font-medium">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-amber-300 font-semibold">{breadcrumbCurrent || title}</span>
        </nav>

        {/* Section Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="max-w-4xl space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : onNavigate && onNavigate('contact')}
            className="px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer border border-amber-300/40"
          >
            <FileText className="w-4 h-4" />
            <span>Request Wholesale Quote</span>
          </button>

          <button
            onClick={() => SITE_CONFIG.openWhatsApp(`Hello SABORA SPICES, I am viewing the ${breadcrumbCurrent || title} page and would like to inquire.`)}
            className="px-4 sm:px-5 py-2.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>WhatsApp Commercial Desk</span>
          </button>
        </div>

      </div>
    </div>
  );
}
