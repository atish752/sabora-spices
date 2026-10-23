import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';

export default function ReviewsSlider({ reviewsConfig }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      quote: "We contracted 4 metric tons of Green Cardamom (8mm Bold) delivered CIF Rotterdam for our tea blending facility. Pod sizing was extraordinarily uniform and volatile essential oil tested at 8.1% in our laboratory. Sabora is our primary origin supplier in Asia.",
      author: "Sophie van den Berg",
      role: "Head of Procurement & R&D",
      company: "De Botanische Specerij B.V.",
      location: "Amsterdam, Netherlands"
    },
    {
      quote: "As an industrial European spice importer, EU Regulation (EC) 396/2005 compliance is non-negotiable. Sabora's Salem Turmeric tested at 4.9% curcumin with zero chemical polish residue. The APEDA export paperwork arrived without a single discrepancy.",
      author: "Marcus Lindner",
      role: "Global Sourcing Director",
      company: "EuroSpice Trading GmbH",
      location: "Hamburg, Germany"
    },
    {
      quote: "For our French condiment and gastronomy atelier, the whole black pepper and star anise must be flawless. Tellicherry black pepper with dense 575g/L liter weight and deep aromatic pungency. Their commercial desk on WhatsApp is exceptionally fast.",
      author: "Jean-Luc Moreau",
      role: "Master Blender & Founder",
      company: "Comptoir Artisanal des Épices",
      location: "Lyon, France"
    },
    {
      quote: "We launched private-label roasted makhana superfood snack packs across Scandinavian organic supermarkets. Sabora supplied custom-printed nitrogen-flushed stand-up pouches directly to Gothenburg. Pristine milky white fox nuts with zero burnt spots.",
      author: "Astrid Lindholm",
      role: "Co-Founder & COO",
      company: "Nordic SuperFoods AB",
      location: "Stockholm, Sweden"
    }
  ];

  const prev = () => setCurrentIndex(i => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i + 1) % reviews.length);

  const current = reviews[currentIndex];

  return (
    <section id="reviews" className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Commercial Endorsements</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Trusted by European Blenders & Importers
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 px-2">
              {currentIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Testimonial Card */}
        <div className="bg-gradient-to-b from-slate-50 to-emerald-50/20 rounded-3xl border border-slate-200/90 p-8 sm:p-12 relative overflow-hidden">
          <Quote className="absolute top-6 right-8 w-20 h-20 text-emerald-900/5 pointer-events-none" />

          <div className="max-w-4xl space-y-6 relative z-10">
            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 leading-relaxed italic">
              "{current.quote}"
            </p>

            {/* Author info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
              <div>
                <p className="font-serif font-bold text-base text-slate-900">
                  {current.author}
                </p>
                <p className="text-xs text-slate-500 font-sans">
                  {current.role} • <span className="font-medium text-slate-700">{current.company}</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{current.location}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
