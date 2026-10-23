import React from 'react';
import { Star, ShieldCheck, MapPin, Building, Quote } from 'lucide-react';

const REVIEWS = [
  {
    quote: "We contracted 4 metric tons of Green Cardamom (8mm Bold) delivered CIF Rotterdam for our Dutch tea blending facility. Pod sizing was extraordinarily uniform, moisture was under 9.8%, and the volatile essential oils tested at 8.1% in our laboratory. Sabora Spices is our primary direct-origin partner in Asia.",
    author: "Sophie van den Berg",
    role: "Head of Procurement & R&D",
    company: "De Botanische Specerij B.V.",
    city: "Amsterdam, Netherlands",
    port: "CIF Rotterdam",
    rating: 5
  },
  {
    quote: "As an industrial European spice importer supplying German butchery and seasoning houses, compliance with EU Regulation (EC) 396/2005 is paramount. Sabora's Salem Turmeric tested at 4.9% curcumin with zero chemical polish residue. The APEDA export paperwork arrived without a single discrepancy.",
    author: "Marcus Lindner",
    role: "Global Sourcing Director",
    company: "EuroSpice Trading GmbH",
    city: "Hamburg, Germany",
    port: "CIF Hamburg",
    rating: 5
  },
  {
    quote: "For our French gourmet condiment and mustard atelier, the whole black pepper and star anise quality must be flawless. Sabora's Tellicherry black pepper had dense liter weights of 575g/L and deep aromatic pungency. Their commercial team is exceptionally responsive on WhatsApp.",
    author: "Jean-Luc Moreau",
    role: "Master Blender & Founder",
    company: "Comptoir Artisanal des Épices",
    city: "Lyon, France",
    port: "CIF Genoa / Air",
    rating: 5
  },
  {
    quote: "We launched private-label roasted makhana superfood snack packs across Scandinavian organic supermarkets. Sabora supplied custom-printed nitrogen-flushed stand-up zip pouches directly to our warehouse. Pristine milky white fox nuts with zero burnt spots.",
    author: "Astrid Lindholm",
    role: "Co-Founder & COO",
    company: "Nordic SuperFoods AB",
    city: "Stockholm, Sweden",
    port: "CIF Gothenburg",
    rating: 5
  }
];

export default function EuropeanTrust() {
  return (
    <section id="trust" className="py-20 sm:py-28 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>European Commercial Trust</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            Verified European Partnerships
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            From container loads arriving at Rotterdam, Hamburg, and Genoa to retail private-label superfood packs across European organic grocers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-stone-200/90 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                
                {/* Top Rating & Port Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {rev.port}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="font-sans text-stone-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>

              </div>

              {/* Author & Company Meta */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                    {rev.author}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    {rev.role} • <span className="font-semibold text-stone-700">{rev.company}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-stone-400 block">
                    {rev.city}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
