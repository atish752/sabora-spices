import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  Leaf, 
  FileCheck, 
  Microscope, 
  MessageSquare, 
  Boxes, 
  Package, 
  Globe2, 
  Handshake, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function WhySaboraSection({ onOpenQuoteModal, onScrollToSection }) {
  const pillars = [
    {
      num: "01",
      icon: Award,
      title: "Quality Comes First",
      desc: "Quality is central to how we approach every product enquiry. From appearance and size to aroma, moisture, and packaging suitability, parameters are evaluated to provide the best reasonably achievable quality."
    },
    {
      num: "02",
      icon: MapPin,
      title: "Origin-Focused Sourcing",
      desc: "We consider suitable producing regions, local markets, and available supply networks across India, exploring direct sourcing from farmers, producers, and regional dealers."
    },
    {
      num: "03",
      icon: Leaf,
      title: "Specialised Cardamom Focus",
      desc: "Green Cardamom is a core pillar. We understand buyer expectations for capsule millimeter sizing (7.5mm, 8mm+), deep green color, rich aroma, and volatile essential oils."
    },
    {
      num: "04",
      icon: Boxes,
      title: "Dedicated Focus on Makhana",
      desc: "Makhana (Fox Nuts) is our second principal category. We supply uniform 5-Suta and 6-Suta Jumbo grades with zero chemical bleaching for wholesale, retail, and private label."
    },
    {
      num: "05",
      icon: FileCheck,
      title: "Buyer-Specific Quality Specs",
      desc: "We understand that wholesalers, retailers, food processors, and international importers each require different specifications. Acceptance criteria are agreed in advance."
    },
    {
      num: "06",
      icon: ShieldCheck,
      title: "Careful Product Selection",
      desc: "Quality varies by supplier, harvest, and storage conditions. We select products based on suitability and evidence rather than relying solely on origin or surface appearance."
    },
    {
      num: "07",
      icon: Microscope,
      title: "Quality Checks & Testing",
      desc: "We discuss product inspection, accredited laboratory testing, or third-party analysis for moisture, microbial load, and pesticide residues according to destination regulations."
    },
    {
      num: "08",
      icon: MessageSquare,
      title: "Clear & Transparent Communication",
      desc: "We communicate product availability, specifications, order quantities, packaging options, and commercial terms with complete transparency before confirmation."
    },
    {
      num: "09",
      icon: Boxes,
      title: "Flexible Bulk Supply Solutions",
      desc: "We accommodate diverse order sizes, container stuffing, and delivery schedules for domestic wholesalers and international trade houses."
    },
    {
      num: "10",
      icon: Package,
      title: "Packaging & Private-Label Options",
      desc: "From food-grade Sabora-branded pouches to buyer-specific private-label packaging with custom branding, nutritional charts, and barcodes."
    },
    {
      num: "11",
      icon: Globe2,
      title: "Domestic & International Focus",
      desc: "We review documentation, import requirements, labelling rules, and transport arrangements tailored to both Indian and overseas destination markets."
    },
    {
      num: "12",
      icon: Handshake,
      title: "Responsible Business Practices",
      desc: "We build relationships through realistic commitments, professional conduct, and clear commercial expectations rather than short-term promises."
    },
    {
      num: "13",
      icon: Users,
      title: "A Customer-Focused Approach",
      desc: "Every enquiry receives careful review of product requirements, intended culinary or retail application, packaging format, and destination."
    },
    {
      num: "14",
      icon: TrendingUp,
      title: "A Long-Term Partnership Mindset",
      desc: "We see sourcing and supply as an ongoing partnership, supporting buyers as their volume, product range, and market requirements evolve."
    }
  ];

  return (
    <section id="why-sabora" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F3D2E] text-xs font-bold tracking-wide uppercase">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>14 Pillars of Reliability</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-stone-900 tracking-tight">
            Quality-Led Sourcing. Reliable Supply. Lasting Partnerships.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            At SABORA SPICES, we believe quality begins at the source and continues through every stage of sourcing, product selection, handling, packaging, and supply. Here is why businesses consider SABORA SPICES as their sourcing partner.
          </p>
        </div>

        {/* 14 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                      #{item.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-stone-50 text-[#0F3D2E] group-hover:bg-[#0F3D2E] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Sabora Commitment Statement Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#041A12] via-[#0F3D2E] to-[#041A12] text-white shadow-xl border border-emerald-800/40 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              The SABORA SPICES Commitment
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              "Trust must be earned through actual performance."
            </h3>
            <p className="text-xs sm:text-base text-stone-200 leading-relaxed font-normal">
              Our commitment is to pursue the best suitable quality, maintain clear product specifications, coordinate appropriate quality checks, and provide professional sourcing and supply support. Our aim is to establish that trust through transparency, careful product selection, realistic commitments, and continuous attention to buyer requirements.
            </p>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Unsupported Claims
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Accredited Lab Verified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                FSSAI & FoSCoS Aligned
              </span>
            </div>

            <button
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : (onScrollToSection && onScrollToSection('contact'))}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Partner with SABORA SPICES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
