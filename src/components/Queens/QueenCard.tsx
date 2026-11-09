import { useRef, useState } from 'react';
import type { Wife } from '../../data/types';
import { cssVars, cx } from '../../lib/cx';
import { ageAt, ageText, bornYear, duration, formatDate } from '../../lib/dates';
import { asset, HENRY } from '../../lib/people';
import { useInView } from '../../hooks/useInView';
import styles from './QueenCards.module.css';

interface Props {
  wife: Wife;
  index: number;
  onOpen: () => void;
}

/** A portrait card that tilts under the cursor and turns over to show the marriage details. */
export function QueenCard({ wife: w, index, onOpen }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [revealRef, inView] = useInView<HTMLElement>();
  const el = useRef<HTMLElement | null>(null);

  const setVars = (vars: Record<string, string>) => {
    for (const [k, v] of Object.entries(vars)) el.current?.style.setProperty(k, v);
  };

  return (
    <article
      ref={(node) => {
        el.current = node;
        revealRef(node);
      }}
      className={cx(styles.card, inView && styles.in, flipped && styles.flipped)}
      style={cssVars({ '--c': w.color, '--d': `${(index % 3) * 0.12}s` })}
      tabIndex={0}
      aria-label={`${w.name}. ${flipped ? 'Showing details' : 'Press Enter to turn over'}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setVars({
          '--ry': `${(x - 0.5) * 18}deg`,
          '--rx': `${(0.5 - y) * 14}deg`,
          '--mx': `${x * 100}%`,
          '--my': `${y * 100}%`,
        });
      }}
      onPointerLeave={() => setVars({ '--rx': '0deg', '--ry': '0deg' })}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className={styles.cardTilt}>
        <div className={styles.cardInner}>
          <div className={cx(styles.face, styles.front)}>
            <img src={asset(w.img)} alt={w.name} loading="lazy" />
            <div className="medal">{w.n}</div>
            <span className={styles.flipHint}>Click to turn ↻</span>
            <div className={styles.frontTxt}>
              <h3>{w.name}</h3>
              <div className={styles.yrs}>
                {bornYear(w)} to {w.died.slice(0, 4)} · Queen {w.wed.slice(0, 4)} to {w.end.slice(0, 4)}
              </div>
              <span className="fate-pill">{w.fate}</span>
            </div>
          </div>
          <div className={cx(styles.face, styles.back)}>
            <h3>{w.name}</h3>
            <dl>
              <dt>Married</dt>
              <dd>{formatDate(w.wed)}</dd>
              <dt>Ended</dt>
              <dd>
                {w.endHow}, {formatDate(w.end)}
              </dd>
              <dt>Lasted</dt>
              <dd>{duration(w.wed, w.end)}</dd>
              <dt>Emblem</dt>
              <dd>{w.emblem}</dd>
              <dt>Children</dt>
              <dd>{w.kidsShort}</dd>
            </dl>
            <div className={styles.vs}>
              <div>
                <b>{ageText(w, w.wed)}</b>
                <small>Her age</small>
              </div>
              <i>and</i>
              <div>
                <b>{ageAt(HENRY, w.wed)}</b>
                <small>Henry&apos;s</small>
              </div>
            </div>
            <div className={styles.stamp}>{w.fate}</div>
            <p className={styles.motto}>&ldquo;{w.motto}&rdquo;</p>
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              Read her story →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
