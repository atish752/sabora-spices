import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function ReviewsSlider({ reviewsConfig }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultReviews = [
    {
      date: "18-02-2026",
      rating: 5,
      quote: "We contracted 4 metric tons of Green Cardamom (8mm Bold) delivered CIF Rotterdam for our Dutch tea blending facility. Pod sizing was extraordinarily uniform, moisture was under 9.8%, and the volatile essential oils tested at 8.1% in our laboratory. Sabora Spices is now our primary direct-origin supplier in Asia.",
      author: "Sophie van den Berg",
      designation: "Head of Procurement & R&D",
      company: "De Botanische Specerij B.V.",
      location: "Amsterdam, Netherlands"
    },
    {
      date: "14-01-2026",
      rating: 5,
      quote: "As an industrial European spice importer supplying German butchery and seasoning houses, compliance with EU Regulation (EC) 396/2005 is paramount. Sabora's Salem Turmeric tested at 4.9% curcumin with zero chemical polish residue. The APEDA export paperwork and phytosanitary certificates arrived without a single discrepancy.",
      author: "Marcus Lindner",
      designation: "Global Sourcing Director",
      company: "EuroSpice Trading GmbH",
      location: "Hamburg, Germany"
    },
    {
      date: "28-12-2025",
      rating: 5,
      quote: "For our French gourmet condiment and mustard atelier, the whole black pepper and star anise quality must be flawless. Sabora's Tellicherry black pepper had dense liter weights of 575g/L and deep aromatic pungency. Their commercial team is exceptionally attentive on WhatsApp.",
      author: "Jean-Luc Moreau",
      designation: "Master Blender & Founder",
      company: "Comptoir Artisanal des Épices",
      location: "Lyon, France"
    },
    {
      date: "05-11-2025",
      rating: 5,
      quote: "We launched private-label roasted makhana superfood snack packs across Scandinavian organic supermarkets. Sabora supplied custom-printed nitrogen-flushed stand-up zip pouches directly to our Gothenburg warehouse. Pristine milky white fox nuts with zero burnt spots.",
      author: "Astrid Lindholm",
      designation: "Co-Founder & COO",
      company: "Nordic SuperFoods AB",
      location: "Stockholm, Sweden"
    },
    {
      date: "19-10-2025",
      rating: 5,
      quote: "We ordered 2 metric tons of Green Cardamom (8mm Bold) for our packaging facility in Dubai. The aroma and uniform pod size exceeded our expectations. The nitrogen-flushed packaging arrived in pristine condition. Excellent B2B partner for multi-ton orders.",
      author: "Tariq Al-Mansoor",
      designation: "Procurement Director",
      company: "Al-Barakah Food Industries",
      location: "Dubai, UAE"
    }
  ];

  const reviews = (reviewsConfig?.items && reviewsConfig.items.length > 0)
    ? reviewsConfig.items
    : defaultReviews;

  const score = reviewsConfig?.score || '4.95';
  const scale = reviewsConfig?.scale || '/ 5.0 Rating';
  const title = reviewsConfig?.title || 'Trusted by European spice mills, tea blenders & gourmet ateliers.';
  const subtitle = reviewsConfig?.subtitle || 'From container loads arriving at Rotterdam, Hamburg, and Genoa to retail private-label superfood packs across European organic grocers, see why commercial wholesale buyers choose Sabora Spices.';

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex] || reviews[0];

  return (
    <section id="reviews" className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#020C08] via-[#041A12] to-[#020C08] text-slate-100 scroll-mt-20 relative overflow-hidden border-b border-emerald-900/60">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[36rem] h-[36rem] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left: Branding & Aggregate score */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left reveal-init">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/40 font-mono shadow-sm">
              Verified European & Global Trade
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl">
              {subtitle}
            </p>

            {/* Scorecard Widget — Solid Architectural Frame */}
            <div className="p-6 bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-amber-400/40 inline-block text-left w-full sm:w-auto shadow-2xl relative overflow-hidden">
              <div className="corner-tick-tl" />
              <div className="corner-tick-br" />

              <div className="flex items-center gap-3 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-white font-mono tracking-wider">
                  <AnimatedCounter value={score} /> {scale}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-1">
                Audited against international B2B buyer delivery records
              </p>
            </div>
          </div>

          {/* Right: Interactive Carousel Card */}
          <div className="lg:col-span-7 reveal-init delay-150">
            <div className="bg-gradient-to-b from-[#062419] to-[#03150E] border border-amber-400/40 p-8 sm:p-12 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              
              <div className="corner-tick-tl" />
              <div className="corner-tick-tr" />
              <div className="corner-tick-bl" />
              <div className="corner-tick-br" />

              <Quote className="w-16 h-16 text-amber-400/15 absolute -top-2 -left-2 pointer-events-none" />

              <div>
                {/* Star rating & Date badge */}
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <div className="flex text-amber-400">
                    {[...Array(current.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="font-mono text-xs text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    {current.date}
                  </span>
                </div>

                {/* Quote Content */}
                <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-white leading-relaxed mb-8 relative z-10">
                  "{current.quote}"
                </p>
              </div>

              {/* Author Attribution & Slider Controls */}
              <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                    {current.author}
                  </h4>
                  <p className="text-xs text-amber-300 font-medium font-sans">
                    {current.designation} • {current.company}
                  </p>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {current.location}
                  </p>
                </div>

                {/* Nav Arrows */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={prevReview}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-mono text-xs text-slate-300 px-2">
                    {currentIndex + 1} / {reviews.length}
                  </span>
                  <button
                    onClick={nextReview}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
