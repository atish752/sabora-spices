import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  MessageCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { FAQS, FAQ_CATEGORIES } from '../data/faqData';
import { SITE_CONFIG } from '../config/siteConfig';

export default function FaqSection({ onScrollToSection, onOpenQuoteModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(1); // First FAQ open by default

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>0010. Frequently Asked Questions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Everything you need to know about our whole spices sourcing, Makhana supply, packaging options, laboratory testing, and commercial order terms.
          </p>
        </div>

        {/* Live Search Input & Categories Filter */}
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 25 questions (e.g. cardamom, makhana, MOQ, testing, export)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white transition-all shadow-xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {FAQ_CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F3D2E] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-stone-50/70 border-emerald-600/40 shadow-xs' 
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded shrink-0">
                        Q{faq.id}
                      </span>
                      <span className="font-serif text-sm sm:text-base font-bold text-stone-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs sm:text-sm space-y-2">
              <p>No questions matched your search query "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-emerald-700 font-bold underline"
              >
                Clear filter & view all 25 questions
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-bold">
              Still Have Specific Sourcing Questions?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Our team welcomes commercial enquiries about Green Cardamom, Makhana, and other whole spices. Contact SABORA SPICES directly.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : onScrollToSection('contact')}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow transition-all cursor-pointer"
            >
              Request a Quote
            </button>
            <button
              onClick={() => SITE_CONFIG.openWhatsApp("Hello SABORA SPICES, I have a specific sourcing question.")}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
