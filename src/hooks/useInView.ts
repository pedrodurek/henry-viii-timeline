import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * True once the element has scrolled into view. With `once` (the default) it stays
 * true, which is what the reveal animations want.
 */
export function useInView<T extends Element>({ threshold = 0.15, once = true } = {}) {
  const [inView, setInView] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (el: T | null) => {
      observer.current?.disconnect();
      if (!el) return;
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setInView(true);
            if (once) observer.current?.disconnect();
          } else if (!once) setInView(false);
        },
        { threshold },
      );
      observer.current.observe(el);
    },
    [threshold, once],
  );

  useEffect(() => () => observer.current?.disconnect(), []);
  return [ref, inView] as const;
}
