import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { cx } from '../lib/cx';

/** A block that fades and slides up the first time it scrolls into view. */
export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cx('reveal', inView && 'in', className)}>
      {children}
    </div>
  );
}
