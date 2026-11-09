import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { cssVars, cx } from '../../lib/cx';
import { ageAt, ageText, daysBetween, duration, formatDate } from '../../lib/dates';
import { asset, HENRY, WIVES } from '../../lib/people';
import { useModal } from '../../state/modal';
import { Reveal } from '../Reveal';
import styles from './AgeChart.module.css';

type Mode = 'age' | 'len';
const MAX_AGE = 60;
const MAX_LEN = Math.max(...WIVES.map((w) => daysBetween(w.wed, w.end)));

/** Henry's age against each wife's on the wedding day, or how long each marriage lasted. */
export function AgeChart() {
  const [mode, setMode] = useState<Mode>('age');
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const { openWife } = useModal();
  const width = (fraction: number) => (inView ? `${fraction * 100}%` : '0');

  return (
    <section className="sec dark" id="ages">
      <Reveal className="sec-head">
        <p className="kicker">On the wedding day</p>
        <h2>
          He got older. <em>They didn&apos;t.</em>
        </h2>
        <div className={styles.toggle} role="tablist">
          {(
            [
              ['age', 'Ages at the wedding'],
              ['len', 'How long it lasted'],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              className={cx(mode === m && styles.on)}
              onClick={() => setMode(m)}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div ref={ref} className={cx(styles.agechart, inView && styles.in)} data-mode={mode}>
        {WIVES.map((w, i) => {
          const hA = ageAt(HENRY, w.wed);
          const wA = ageAt(w, w.wed);
          const gap =
            hA > wA
              ? `He was ${w.approx ? 'about ' : ''}${hA - wA} years older`
              : `She was ${wA - hA} years older`;
          return (
            <div
              key={w.key}
              className={styles.arow}
              style={cssVars({ '--c': w.color, '--d': `${i * 0.12}s` })}
            >
              <button type="button" className={styles.awho} onClick={() => openWife(i)}>
                <img src={asset(w.img)} alt="" />
                <div>
                  <b>{w.name}</b>
                  <small>{formatDate(w.wed)}</small>
                </div>
              </button>
              <div className={styles.abars}>
                <div className={cx(styles.abar, styles.h)}>
                  <i style={{ width: mode === 'age' ? width(hA / MAX_AGE) : '0' }} />
                  <span>Henry · {hA}</span>
                </div>
                <div className={styles.abar}>
                  <i
                    style={{
                      width:
                        mode === 'age' ? width(wA / MAX_AGE) : width(daysBetween(w.wed, w.end) / MAX_LEN),
                    }}
                  />
                  <span>{mode === 'age' ? `${w.short} · ${ageText(w, w.wed)}` : duration(w.wed, w.end)}</span>
                </div>
                <div className={cx(styles.abar, styles.gap)}>
                  {mode === 'age' ? gap : `${w.endHow} on ${formatDate(w.end)}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="footnote">
        Ages marked ~ are estimates. Birth years of Anne Boleyn, Jane Seymour, Catherine Howard and Catherine
        Parr are not recorded.
      </p>
    </section>
  );
}
