import { useEffect, useRef, useState } from 'react';
import { cssVars, cx } from '../../lib/cx';
import { ageAtFraction, yearFraction } from '../../lib/dates';
import { asset, EVENTS, HEIRS, HENRY, WIVES } from '../../lib/people';
import { setCursorYear } from '../../state/cursor';
import { useModal } from '../../state/modal';
import { Reveal } from '../Reveal';
import styles from './Lives.module.css';

const START = 1485;
const END = 1560;
/** Years per second while playing. */
const SPEED = 3.2;
const x = (year: number) => ((Math.min(year, END) - START) / (END - START)) * 100;

interface Row {
  key: string;
  label: string;
  img: string;
  color: string;
  born: string;
  died: string;
  approx?: boolean;
  /** Marriage to Henry, or Henry's reign, highlighted on the bar. */
  span?: { from: string; to: string; kind: 'reign' | 'marriage' };
  wifeIndex?: number;
  /** Starts a new group with a divider above it. */
  sep?: boolean;
}

const ROWS: Row[] = [
  {
    key: HENRY.key,
    label: HENRY.name,
    img: HENRY.img,
    color: HENRY.color,
    born: HENRY.born,
    died: HENRY.died,
    span: { from: HENRY.reignStart, to: HENRY.died, kind: 'reign' },
  },
  ...WIVES.map((w, i) => ({
    key: w.key,
    label: w.name,
    img: w.img,
    color: w.color,
    born: w.born,
    died: w.died,
    approx: w.approx,
    span: { from: w.wed, to: w.end, kind: 'marriage' as const },
    wifeIndex: i,
    sep: i === 0,
  })),
  ...HEIRS.map((h, i) => ({
    key: h.key,
    label: h.name,
    img: h.img,
    color: h.color,
    born: h.born,
    died: h.died,
    sep: i === 0,
  })),
];

const NOTES = EVENTS.map((e) => ({ at: yearFraction(e.d), title: e.t }));

/** What happened in a given year, as a short line under the big year. */
function noteFor(year: number) {
  const y = Math.floor(year);
  const hits = NOTES.filter((n) => n.at >= y && n.at < y + 1).map((n) => n.title);
  if (!hits.length) return '';
  return hits.slice(0, 3).join(' · ') + (hits.length > 3 ? ` · and ${hits.length - 3} more` : '');
}

/** Ten lives side by side, with a scrubber and a play button. */
export function Lives() {
  const [year, setYear] = useState(1509.3);
  const [playing, setPlaying] = useState(false);
  const { openWife } = useModal();
  // The play loop reads the latest year from here rather than from a stale closure.
  const yearRef = useRef(year);

  useEffect(() => {
    yearRef.current = year;
    if (year >= 1491 && year <= 1547.2) setCursorYear(year);
  }, [year]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const step = (t: number) => {
      const next = Math.min(END, yearRef.current + ((t - last) / 1000) * SPEED);
      last = t;
      yearRef.current = next;
      setYear(next);
      if (next >= END) setPlaying(false);
      else frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const togglePlay = () => {
    if (playing) return setPlaying(false);
    if (year >= END - 0.1) {
      yearRef.current = START;
      setYear(START);
    }
    setPlaying(true);
  };

  return (
    <section className="sec dark" id="lives">
      <Reveal className="sec-head">
        <p className="kicker">Drag through time</p>
        <h2>Ten lives, side by side</h2>
        <p className="lede">
          Scrub the year, or press play, to see who was alive, who was married to whom, and how old everyone
          was.
        </p>
      </Reveal>

      <div className={styles.livesCtrl}>
        <button
          type="button"
          className={cx(styles.play, playing && styles.on)}
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={togglePlay}
        >
          <span />
        </button>
        <div className={styles.bigYear}>{Math.floor(year)}</div>
        <div className={styles.yearNote}>{noteFor(year)}</div>
      </div>

      <div className={styles.gantt}>
        <div className={styles.gAxis}>
          {Array.from({ length: 8 }, (_, i) => 1490 + i * 10).map((y) => (
            <span key={y} style={{ left: `${x(y)}%` }}>
              {y}
            </span>
          ))}
        </div>
        <div className={styles.gRows}>
          {ROWS.map((r) => {
            const b = yearFraction(r.born);
            const d = yearFraction(r.died);
            const alive = year >= b && year < d;
            const span = r.span && { from: yearFraction(r.span.from), to: yearFraction(r.span.to) };
            const inSpan = span && year >= span.from && year <= span.to;
            const status =
              year < b
                ? ''
                : !alive
                  ? `† ${r.died.slice(0, 4)}`
                  : `${r.approx ? '~' : ''}${ageAtFraction(r.born, year)}${
                      inSpan ? (r.span!.kind === 'reign' ? ' · King' : ' · Queen') : ''
                    }`;
            const label = (
              <>
                <img src={asset(r.img)} alt="" />
                <b>{r.label}</b>
              </>
            );
            return (
              <div
                key={r.key}
                className={cx(styles.grow, r.sep && styles.sep, alive && styles.alive)}
                style={cssVars({ '--c': r.color })}
              >
                {r.wifeIndex !== undefined ? (
                  <button
                    type="button"
                    className={styles.glabel}
                    aria-label={`${r.label}, open her story`}
                    onClick={() => openWife(r.wifeIndex!)}
                  >
                    {label}
                  </button>
                ) : (
                  <div className={styles.glabel}>{label}</div>
                )}
                <div className={styles.gtrack}>
                  <div
                    className={cx(styles.gbar, d > END && styles.more)}
                    data-more={r.died.slice(0, 4)}
                    style={{ left: `${x(b)}%`, width: `${x(d) - x(b)}%` }}
                  />
                  {span && (
                    <div
                      className={cx(styles.gmar, r.span!.kind === 'reign' && styles.reign)}
                      title={r.span!.kind === 'reign' ? 'Reign' : 'Married to Henry'}
                      style={{ left: `${x(span.from)}%`, width: `${x(span.to) - x(span.from)}%` }}
                    />
                  )}
                  <span
                    className={cx(styles.gage, year < b && styles.unborn, year >= d && styles.dead)}
                    style={{ left: `${x(year)}%` }}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.gLane} aria-hidden="true">
          <div className={styles.gScrub} style={{ left: `${x(year)}%` }}>
            <span />
          </div>
        </div>
      </div>
      <input
        type="range"
        className={styles.yearRange}
        min={START}
        max={END}
        step={0.02}
        value={year}
        aria-label="Year"
        aria-valuetext={String(Math.floor(year))}
        onChange={(e) => {
          setPlaying(false);
          setYear(Number(e.target.value));
        }}
      />
    </section>
  );
}
