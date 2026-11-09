import { useEffect, useState } from 'react';
import { cssVars } from '../../lib/cx';
import { yearFraction } from '../../lib/dates';
import { WIVES } from '../../lib/people';
import { useCursorYear } from '../../state/cursor';
import { useModal } from '../../state/modal';
import { RoseIcon } from '../Rose';
import styles from './Minimap.module.css';

const START = 1491;
const END = 1547.2;
/** Percentage position of a year along Henry's life. */
const lifePercent = (year: number) => ((year - START) / (END - START)) * 100;

const LINKS = [
  ['queens', 'Queens'],
  ['ages', 'Ages'],
  ['reign', 'Reign'],
  ['lives', 'Lives'],
  ['quiz', 'Quiz'],
] as const;

/** Sticky bar along the top: Henry's life with each marriage, a year marker, and section links. */
export function Minimap({ onJump }: { onJump: (year: number) => void }) {
  const year = useCursorYear();
  const { openWife } = useModal();
  const [section, setSection] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const clamped = Math.min(END, Math.max(START, year));

  return (
    <nav className={styles.minimap} aria-label="Reign progress">
      <div className={styles.mmBrand}>
        <RoseIcon />
        <span>H VIII</span>
      </div>
      <div
        className={styles.mmTrack}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          onJump(START + ((e.clientX - r.left) / r.width) * (END - START));
        }}
      >
        <div className={styles.mmSegs}>
          {WIVES.map((w, i) => {
            const a = lifePercent(yearFraction(w.wed));
            const b = lifePercent(yearFraction(w.end));
            return (
              <i
                key={w.key}
                data-n={w.n}
                title={`${w.name}, ${w.wed.slice(0, 4)} to ${w.end.slice(0, 4)}`}
                style={{ ...cssVars({ '--c': w.color }), left: `${a}%`, width: `${Math.max(0.6, b - a)}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  openWife(i);
                }}
              />
            );
          })}
        </div>
        <div className={styles.mmMarker} style={{ left: `${lifePercent(clamped)}%` }}>
          <b>{Math.floor(clamped)}</b>
        </div>
      </div>
      <div className={styles.mmLinks}>
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={section === id ? styles.on : undefined}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
