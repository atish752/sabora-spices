import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, X, ChevronDown } from 'lucide-react';

export const SUPPORTED_LANGUAGES = [
  // Default Original
  { code: 'en', name: 'English', native: 'English (Original)', flag: '🇬🇧', cta: 'Stay in English', region: 'Default' },

  // European Focus (Directly requested)
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', cta: 'Auf Deutsch übersetzen', region: 'Europe' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', cta: 'Traduire en français', region: 'Europe' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', cta: 'Traducir al español', region: 'Europe' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', cta: 'Traduci in italiano', region: 'Europe' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱', cta: 'Vertaal naar het Nederlands', region: 'Europe' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹', cta: 'Traduzir para português', region: 'Europe' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱', cta: 'Przetłumacz na polski', region: 'Europe' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪', cta: 'Översätt till svenska', region: 'Europe' },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰', cta: 'Oversæt til dansk', region: 'Europe' },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮', cta: 'Käännä suomeksi', region: 'Europe' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷', cta: 'Μετάφραση στα ελληνικά', region: 'Europe' },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿', cta: 'Přeložit do češtiny', region: 'Europe' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴', cta: 'Traduce în română', region: 'Europe' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺', cta: 'Fordítás magyarra', region: 'Europe' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', cta: 'Перевести на русский', region: 'Europe' },

  // Global Sourcing Hubs
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', cta: 'الترجمة إلى العربية', region: 'Global' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', cta: '日本語に翻訳', region: 'Global' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳', cta: '翻译成中文', region: 'Global' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', cta: '한국어로 번역', region: 'Global' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', cta: 'हिन्दी में अनुवाद करें', region: 'Global' }
];

/**
 * Read current Google Translate cookie or local storage fallback
 */
function getActiveLanguageFromCookie() {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('sabora_selected_lang');
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
    }
    return 'en';
  }
  const val = decodeURIComponent(match[1]);
  // format is /en/de or /auto/de
  const parts = val.split('/').filter(Boolean);
  const langCode = parts.length >= 2 ? parts[1] : (parts[0] || 'en');
  return langCode;
}

/**
 * Detect user's native language from browser environment
 */
export function detectUserNativeLanguage() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return null;

  // 1. Primary browser/device locale
  const primaryRaw = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
  const primaryPrefix = primaryRaw.split('-')[0];

  // If primary language is already English, default to English without showing translation banner
  if (primaryPrefix === 'en') {
    return null;
  }

  // Check if primary matches any supported non-English language
  if (primaryPrefix) {
    const directMatch = SUPPORTED_LANGUAGES.find(lang => {
      const code = lang.code.toLowerCase();
      return primaryRaw === code || primaryPrefix === code.split('-')[0];
    });
    if (directMatch && directMatch.code !== 'en') {
      return directMatch;
    }
  }

  // 2. Scan preferred language list (navigator.languages)
  const browserLangs = navigator.languages && navigator.languages.length
    ? Array.from(navigator.languages)
    : [];

  for (const raw of browserLangs) {
    if (!raw) continue;
    const lower = raw.toLowerCase();
    const prefix = lower.split('-')[0];
    if (prefix === 'en') continue;

    const matched = SUPPORTED_LANGUAGES.find(lang => {
      const code = lang.code.toLowerCase();
      return lower === code || prefix === code.split('-')[0];
    });

    if (matched && matched.code !== 'en') return matched;
  }

  // 3. Fallback: detect European timezones for international users
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Berlin') || tz.includes('Vienna') || tz.includes('Zurich')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'de');
    }
    if (tz.includes('Paris') || tz.includes('Brussels')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'fr');
    }
    if (tz.includes('Madrid')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'es');
    }
    if (tz.includes('Rome')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'it');
    }
    if (tz.includes('Amsterdam')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'nl');
    }
    if (tz.includes('Warsaw')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'pl');
    }
    if (tz.includes('Stockholm')) {
      return SUPPORTED_LANGUAGES.find(l => l.code === 'sv');
    }
  } catch (e) {
    // ignore
  }

  return null;
}

/**
 * Apply translation to target language with smooth polling retry
 */
export function changeLanguage(targetCode) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const current = getActiveLanguageFromCookie();
  if (current === targetCode && targetCode !== 'en') return;

  const hostname = window.location.hostname;
  const hostParts = hostname.split('.');

  if (targetCode === 'en') {
    // Clear cookies across host and root domains
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
    if (hostParts.length > 1) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${hostParts.slice(-2).join('.')}; path=/;`;
    }
    // Set explicit en-to-en override
    document.cookie = "googtrans=/en/en; path=/;";

    localStorage.removeItem('sabora_selected_lang');
    document.documentElement.lang = 'en';

    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = 'en';
      select.dispatchEvent(new Event('change'));
    }
    // Smooth reload to clear any residual translated DOM nodes
    setTimeout(() => {
      window.location.reload();
    }, 150);
    return;
  }

  // Set translation cookie
  const cookieVal = `/en/${targetCode}`;
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; domain=${hostname}; path=/;`;
  if (hostParts.length > 1) {
    document.cookie = `googtrans=${cookieVal}; domain=.${hostParts.slice(-2).join('.')}; path=/;`;
  }

  localStorage.setItem('sabora_selected_lang', targetCode);
  document.documentElement.lang = targetCode;

  // Poll for .goog-te-combo if script is still initializing
  let attempts = 0;
  const triggerCombo = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = targetCode;
      select.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  };

  if (!triggerCombo()) {
    const interval = setInterval(() => {
      attempts++;
      if (triggerCombo() || attempts >= 15) {
        clearInterval(interval);
        if (attempts >= 15 && !document.querySelector('.goog-te-combo')) {
          window.location.reload();
        }
      }
    }, 120);
  }
}

/**
 * Main Language Translator Component with:
 * 1. Google Translate engine setup
 * 2. Automated Native Language Suggestion Banner
 */
export default function LanguageTranslator() {
  const [currentLang, setCurrentLang] = useState('en');
  const [suggestedLang, setSuggestedLang] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Initialize Google Translate Script
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        try {
          if (window.google?.translate?.TranslateElement) {
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: SUPPORTED_LANGUAGES.map(l => l.code).join(','),
              layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE || 0,
              autoDisplay: false
            }, 'google_translate_element');
          }
        } catch (err) {
          console.warn('Google Translate initialization:', err);
        }
      };

      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // 2. Determine active language
    const cookieLang = getActiveLanguageFromCookie();
    setCurrentLang(cookieLang);

    // 3. Automated Native Language Suggestion
    // If user is currently in English, check if their native language is different
    if (cookieLang === 'en') {
      const native = detectUserNativeLanguage();
      if (native && native.code !== 'en') {
        const dismissed = localStorage.getItem(`sabora_lang_dismiss_${native.code}`);
        if (!dismissed) {
          setSuggestedLang(native);
          // Small delay so page renders first
          const timer = setTimeout(() => setShowBanner(true), 1200);
          return () => clearTimeout(timer);
        }
      }
    }
  }, []);

  const handleTranslate = (code) => {
    setShowBanner(false);
    changeLanguage(code);
  };

  const handleDismiss = () => {
    if (suggestedLang) {
      localStorage.setItem(`sabora_lang_dismiss_${suggestedLang.code}`, 'true');
    }
    setShowBanner(false);
  };

  return (
    <>
      {/* Offscreen container for Google Translate widget - avoids display:none layout calculation issues */}
      <div 
        id="google_translate_element" 
        className="fixed -top-[9999px] -left-[9999px] w-px h-px opacity-0 pointer-events-none overflow-hidden" 
        aria-hidden="true" 
      />

      {/* Automated Native Language Suggestion Banner */}
      {showBanner && suggestedLang && (
        <div 
          role="region"
          aria-label="Language translation suggestion"
          className="fixed top-3 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-xl animate-bounce-in shadow-[0_20px_50px_rgba(4,26,18,0.35)]"
        >
          <div className="bg-[#041A12] text-white border-2 border-amber-400/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 ring-2 ring-emerald-500/20 backdrop-blur-md">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-xl">
                <span>{suggestedLang.flag}</span>
              </div>
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm sm:text-base text-amber-300">
                    Translate to {suggestedLang.native}?
                  </span>
                  <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Auto-Detected
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-snug">
                  We noticed your preferred language is {suggestedLang.name}. View SABORA SPICES in your native language with 1 click.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <button
                onClick={() => handleTranslate(suggestedLang.code)}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {suggestedLang.cta}
              </button>

              <button
                onClick={handleDismiss}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Stay in English
              </button>

              <button
                onClick={handleDismiss}
                className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Dismiss translation suggestion"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

/**
 * Sleek Language Dropdown Component for Header & Mobile Navigation
 */
export function LanguageDropdown({ compact = false }) {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef(null);

  useEffect(() => {
    setCurrentLang(getActiveLanguageFromCookie());

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (code) => {
    setOpen(false);
    changeLanguage(code);
    setCurrentLang(code);
  };

  const europeanLangs = SUPPORTED_LANGUAGES.filter(l => l.region === 'Europe');
  const globalLangs = SUPPORTED_LANGUAGES.filter(l => l.region === 'Global');

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
          compact
            ? 'px-2 py-1 text-2xs bg-emerald-950/80 hover:bg-emerald-900/90 text-stone-200 border border-emerald-800/60'
            : 'px-2.5 py-1.5 text-xs bg-emerald-950/60 hover:bg-emerald-900/80 text-stone-200 border border-emerald-800/80 shadow-2xs'
        }`}
        title="Select Language / Translate Website"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="flex items-center gap-1">
          <span>{activeObj.flag}</span>
          <span className="font-mono uppercase font-bold text-amber-300">{activeObj.code}</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-[#041A12] border border-emerald-800/80 shadow-2xl z-[70] overflow-hidden text-stone-200 animate-fadeIn ring-1 ring-black/20">
          
          {/* Header */}
          <div className="p-3 bg-[#03150E] border-b border-emerald-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Language / Sprache</span>
            </div>
            {currentLang !== 'en' && (
              <button
                onClick={() => handleSelect('en')}
                className="text-3xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950 hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Reset English
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-emerald-950/60 p-1.5 scrollbar-thin">
            
            {/* English Original */}
            <div className="py-1">
              <button
                onClick={() => handleSelect('en')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-emerald-700/50 text-amber-300 font-bold'
                    : 'hover:bg-emerald-900/40 text-stone-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🇬🇧</span>
                  <div className="text-left">
                    <span className="block font-semibold">English (Original)</span>
                    <span className="text-3xs text-stone-400">Default Site Language</span>
                  </div>
                </div>
                {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            </div>

            {/* European Languages */}
            <div className="py-1">
              <div className="px-3 py-1 text-3xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                🇪🇺 European Languages
              </div>
              {europeanLangs.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentLang === lang.code
                      ? 'bg-emerald-700/50 text-amber-300 font-bold'
                      : 'hover:bg-emerald-900/40 text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <div className="text-left">
                      <span className="font-semibold">{lang.native}</span>
                      <span className="text-3xs text-stone-400 ml-1.5">({lang.name})</span>
                    </div>
                  </div>
                  {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>

            {/* Global Languages */}
            <div className="py-1">
              <div className="px-3 py-1 text-3xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                🌐 Global Languages
              </div>
              {globalLangs.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentLang === lang.code
                      ? 'bg-emerald-700/50 text-amber-300 font-bold'
                      : 'hover:bg-emerald-900/40 text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <div className="text-left">
                      <span className="font-semibold">{lang.native}</span>
                      <span className="text-3xs text-stone-400 ml-1.5">({lang.name})</span>
                    </div>
                  </div>
                  {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>

          </div>

          <div className="p-2 bg-[#03150E] border-t border-emerald-900/80 text-center text-3xs text-stone-400">
            Powered by Multilingual Web Translation Engine
          </div>

        </div>
      )}
    </div>
  );
}
