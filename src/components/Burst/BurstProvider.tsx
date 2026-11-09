import { useCallback, useState, type ReactNode } from 'react';
import { BurstContext, type BurstFn } from '../../state/burst';
import { cssVars } from '../../lib/cx';
import styles from './Burst.module.css';

interface Particle {
  id: number;
  left: number;
  top: number;
  tx: number;
  ty: number;
  rot: number;
  delay: number;
}

const LIFETIME = 1700;
let nextId = 0;

/** Renders rose bursts fired from anywhere through `useBurst()`. */
export function BurstProvider({ children }: { children: ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback<BurstFn>((el, count = 18) => {
    const r = el.getBoundingClientRect();
    const fresh = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 220;
      return {
        id: nextId++,
        left: r.left + r.width / 2 - 15,
        top: r.top + r.height / 2 - 15,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 80,
        rot: Math.random() * 720 - 360,
        delay: Math.random() * 0.15,
      };
    });
    setParticles((p) => [...p, ...fresh]);
    const ids = new Set(fresh.map((p) => p.id));
    setTimeout(() => setParticles((p) => p.filter((x) => !ids.has(x.id))), LIFETIME);
  }, []);

  return (
    <BurstContext.Provider value={burst}>
      {children}
      <div className={styles.burst} aria-hidden="true">
        {particles.map((p) => (
          <svg
            key={p.id}
            style={{
              ...cssVars({ '--tx': `${p.tx}px`, '--ty': `${p.ty}px`, '--rot': `${p.rot}deg` }),
              left: p.left,
              top: p.top,
              animationDelay: `${p.delay}s`,
            }}
          >
            <use href="#rose" />
          </svg>
        ))}
      </div>
    </BurstContext.Provider>
  );
}
