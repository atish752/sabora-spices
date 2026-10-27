import React from 'react';

/**
 * Authentic FSSAI Logo component displaying the official Food Safety and
 * Standards Authority of India emblem alongside the statutory license number.
 */
export default function FssaiLogo({ 
  className = "h-4 w-auto", 
  showLicense = false, 
  licenseNumber = "13326008000336",
  licenseClassName = "text-2xs font-mono font-bold text-[#0B2568]",
  containerClassName = "inline-flex items-center gap-1.5",
  variant = "default" // "default" | "badge" | "dark"
}) {
  if (variant === "badge") {
    return (
      <div 
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-stone-200/90 shadow-2xs select-none"
        title={`FSSAI Central / State License No: ${licenseNumber}`}
      >
        <img 
          src="/images/fssai-logo.png" 
          alt="FSSAI - Food Safety and Standards Authority of India" 
          className={`object-contain shrink-0 ${className}`}
          loading="lazy"
        />
        {showLicense && (
          <span className={licenseClassName}>
            Lic. {licenseNumber}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={containerClassName} title={`FSSAI Central / State License No: ${licenseNumber}`}>
      <img 
        src="/images/fssai-logo.png" 
        alt="FSSAI - Food Safety and Standards Authority of India" 
        className={`object-contain shrink-0 ${className}`}
        loading="lazy"
      />
      {showLicense && (
        <span className={licenseClassName}>
          Lic. {licenseNumber}
        </span>
      )}
    </div>
  );
}
