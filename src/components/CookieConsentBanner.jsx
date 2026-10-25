import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, Check, ExternalLink } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'sabora_cookie_consent_v1';

export default function CookieConsentBanner({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!savedConsent) {
        // Small delay so page renders first, creating smooth entrance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // LocalStorage access restricted in private mode
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        choice: 'all',
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        choice: 'essential',
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setIsVisible(false);
  };

  const handleOpenPrivacy = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('privacy#cookies');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      role="region" 
      aria-label="Cookie consent banner" 
      className="fixed bottom-3 inset-x-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-slideUp select-none"
    >
      <div className="bg-[#031710]/95 backdrop-blur-md text-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-emerald-500/30 space-y-4">
        
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Cookie className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 flex items-center gap-1.5">
                <span>International Cookie Preferences</span>
                <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 uppercase font-mono">
                  GDPR & B2B
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                SABORA SPICES Trade Portal
              </p>
            </div>
          </div>

          <button
            onClick={handleEssentialOnly}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice with essential cookies"
            title="Dismiss notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative text */}
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          We use cookies to maintain quotation sessions, optimize bandwidth for international spice and makhana buyers, and ensure regulatory compliance under GDPR and Indian DPDP guidelines.
        </p>

        {/* Buttons / Actions */}
        <div className="pt-1 flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleAcceptAll}
            className="flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Accept All</span>
          </button>

          <button
            onClick={handleEssentialOnly}
            className="flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white border border-white/20 text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer flex items-center justify-center"
          >
            <span>Essential Only</span>
          </button>

          <button
            onClick={handleOpenPrivacy}
            className="py-2.5 px-3 rounded-xl text-xs sm:text-sm text-amber-300 hover:text-amber-200 hover:underline transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Privacy Policy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
