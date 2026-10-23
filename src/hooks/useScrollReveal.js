import { useEffect } from 'react';

/**
 * useScrollReveal — Automatically attaches an IntersectionObserver to any
 * DOM element with the `.reveal-init` or `.reveal-line` class.
 *
 * When the element enters the viewport, it adds `.reveal-active`, triggering
 * the CSS fade-up, scale, and hairline reveal transitions.
 */
export function useScrollReveal(dependency = null) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal-init:not(.reveal-active), .reveal-line:not(.reveal-active)');
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // Small delay to capture elements rendered after initial mount
    const timer = setTimeout(observeAll, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [dependency]);
}
