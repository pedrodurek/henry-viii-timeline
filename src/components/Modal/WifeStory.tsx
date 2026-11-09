import { useEffect, useState } from 'react';
import type { Wife } from '../../data/types';
import { cssVars, cx } from '../../lib/cx';
import { ageAt, ageText, bornYear, duration, formatDate, yearFraction } from '../../lib/dates';
import { asset, HENRY, isLostChild } from '../../lib/people';
import { ChildList } from './ChildList';
import styles from './Modal.module.css';

interface Props {
  wife: Wife;
  prev: Wife;
  next: Wife;
  onNav: (step: -1 | 1) => void;
}

/** A queen's full story: key facts, her life bar with births marked, the story and her children. */
export function WifeStory({ wife: w, prev, next, onNav }: Props) {
  // The marriage segment grows in just after the pop-up opens.
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const L0 = yearFraction(w.born);
  const L1 = yearFraction(w.died);
  const lp = (f: number) => ((f - L0) / (L1 - L0)) * 100;
  const marStart = lp(yearFraction(w.wed));
  const marWidth = Math.max(1, lp(yearFraction(w.end)) - marStart);
  const plural = w.kids.length === 1 ? '1 recorded birth' : `${w.kids.length} recorded births and losses`;

  return (
    <>
      <div className={styles.mImg}>
        <img src={asset(w.img)} alt={w.name} />
        <div className="medal">{w.n}</div>
      </div>
      <div className={styles.mBody}>
        <p className="kicker">Queen {w.n} of VI</p>
        <h2 id="modal-title">{w.name}</h2>
        <span className="fate-pill">{w.fate}</span>
        <p className={styles.blurb}>{w.blurb}</p>

        <div className={styles.mGrid}>
          <div>
            <label>Born</label>
            <b>{bornYear(w)}</b>
            <small>{w.birthplace}</small>
          </div>
          <div>
            <label>Died</label>
            <b>{w.died.slice(0, 4)}</b>
            <small>
              {w.deathplace}, aged {ageText(w, w.died)}
            </small>
          </div>
          <div>
            <label>Married</label>
            <b>{w.wed.slice(0, 4)}</b>
            <small>{formatDate(w.wed)}</small>
          </div>
          <div>
            <label>Her age</label>
            <b>{ageText(w, w.wed)}</b>
            <small>on the wedding day</small>
          </div>
          <div>
            <label>Henry&apos;s age</label>
            <b>{ageAt(HENRY, w.wed)}</b>
            <small>on the wedding day</small>
          </div>
          <div>
            <label>Lasted</label>
            <b>{duration(w.wed, w.end).split(',')[0]}</b>
            <small>
              {w.endHow.toLowerCase()} {formatDate(w.end)}
            </small>
          </div>
        </div>

        <div className={styles.mLife} aria-hidden="true">
          <div className={styles.bar} />
          <div className={styles.mar} style={{ left: `${marStart}%`, width: grown ? `${marWidth}%` : 0 }} />
          <span className={styles.tick} style={{ left: 0, translate: 0 }}>
            {bornYear(w)}
          </span>
          <span className={cx(styles.tick, styles.top)} style={{ left: `${marStart}%` }}>
            Queen
          </span>
          <span className={styles.tick} style={{ left: '100%', translate: '-100%' }}>
            {w.died.slice(0, 4)}
          </span>
          {w.kids.map((k, j) => (
            <span
              key={`${k.name}-${k.born ?? k.at}`}
              className={cx(styles.kdot, isLostChild(k) && styles.lost)}
              style={{
                ...cssVars({ '--d': `${0.9 + j * 0.1}s` }),
                left: `${lp(yearFraction((k.born ?? k.at)!))}%`,
              }}
              title={`${k.name}, ${k.born ? formatDate(k.born) : k.bornLabel}`}
            />
          ))}
        </div>

        {w.story.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}

        <h3 className={styles.mSub}>
          Children <small>{w.kids.length ? plural : ''}</small>
        </h3>
        <ChildList wife={w} />

        <div className={styles.mFact}>
          <b>Did you know</b>
          {w.fact}
        </div>
        <div className={styles.mNav}>
          <button type="button" className="btn" onClick={() => onNav(-1)}>
            ← {prev.name}
          </button>
          <button type="button" className="btn" onClick={() => onNav(1)}>
            {next.name} →
          </button>
        </div>
      </div>
    </>
  );
}
