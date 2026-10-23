import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter — Counts up dynamically when scrolled into view.
 * Gives users an unmistakable, tangible sense of animation and momentum.
 */
export default function AnimatedCounter({ value, duration = 1400, className = '' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Parse numeric value and prefix/suffix
    const stringVal = String(value || '').trim();
    // Match optional prefix, numbers (with commas or decimals), and suffix
    const match = stringVal.match(/^([^\d.]*)(\d[\d,.]*)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNum = parseFloat(numStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = match[2].includes(',');
    const hasDecimal = match[2].includes('.');
    const decimalPlaces = hasDecimal ? (match[2].split('.')[1] || '').length : 0;

    const el = elementRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.disconnect();

            const startTime = performance.now();

            const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

            const update = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutExpo(progress);
              const currentNum = targetNum * easedProgress;

              let formattedNum;
              if (decimalPlaces > 0) {
                formattedNum = currentNum.toFixed(decimalPlaces);
              } else {
                formattedNum = Math.round(currentNum).toString();
              }

              if (hasComma) {
                const parts = formattedNum.split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                formattedNum = parts.join('.');
              }

              setDisplayValue(`${prefix}${formattedNum}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setDisplayValue(value); // ensure exact target is shown
              }
            };

            requestAnimationFrame(update);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}
