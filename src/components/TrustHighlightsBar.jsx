import React from 'react';
import { ShieldCheck, MapPin, FlaskConical, PackageCheck } from 'lucide-react';

export default function TrustHighlightsBar({ onScrollToSection }) {
  const highlights = [
    {
      icon: ShieldCheck,
      iconBg: "bg-emerald-100 text-emerald-800",
      title: "FSSAI & Standards Compliance",
      desc: "All whole spices & makhana comply with applicable FSSAI regulations and ISO 9001/22000 principles.",
      target: "compliance"
    },
    {
      icon: MapPin,
      iconBg: "bg-amber-100 text-amber-800",
      title: "Origin-Focused Procurement",
      desc: "Kerala Western Ghats for green cardamom, Bihar for makhana, and Salem for whole turmeric fingers.",
      target: "sourcing"
    },
    {
      icon: FlaskConical,
      iconBg: "bg-emerald-100 text-emerald-800",
      title: "Batch Testing Before Dispatch",
      desc: "Accredited food laboratory testing for moisture, contaminants, and pesticide residues with FoSCoS linking.",
      target: "lab-testing"
    },
    {
      icon: PackageCheck,
      iconBg: "bg-stone-100 text-stone-800",
      title: "Packaging & Private-Label",
      desc: "Food-grade Sabora-branded pouches, bulk wholesale packaging, and buyer-specific private-label solutions.",
      target: "products"
    }
  ];

  return (
    <section className="relative z-20 bg-stone-50 border-b border-stone-200 py-6 sm:py-8 shadow-sm w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onScrollToSection && onScrollToSection(item.target)}
                className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-300 flex items-start gap-4 cursor-pointer group"
              >
                <div className={`p-3 rounded-lg ${item.iconBg} shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#0F3D2E] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
