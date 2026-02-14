import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Returns whether to reduce or disable animations for accessibility and mobile.
 * - prefersReducedMotion: user OS/browser setting
 * - isMobile: viewport < 768px (touch-first, often weaker GPUs)
 * - shouldReduceMotion: true when either is true (use to skip/simplify animations)
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const update = () => {
      setPrefersReducedMotion(reducedQuery.matches);
      setIsMobile(mobileQuery.matches);
    };
    update();

    reducedQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);
    return () => {
      reducedQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
    };
  }, []);

  return {
    prefersReducedMotion,
    isMobile,
    shouldReduceMotion: prefersReducedMotion || isMobile,
  };
}

/**
 * Desktop = pointer: fine (mouse). Use to disable cursor trails / heavy hover effects on touch.
 */
export function useIsDesktopPointer() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}
