import type { TimelineEvent } from '../../data/types';
import { cssVars, cx } from '../../lib/cx';
import { ageAt, ageText, formatDate } from '../../lib/dates';
import { asset, HEIRS, HENRY, lastQueenBefore, queenAt, waistAt } from '../../lib/people';
import { Odometer } from './Odometer';
import styles from './Reign.module.css';

const PORTRAITS = [
  { from: 1491, src: 'images/henry_1509.jpg', caption: 'Portrait c. 1509, unknown artist' },
  { from: 1520, src: 'images/henry_1530.jpg', caption: 'Portrait c. 1530, Joos van Cleve' },
  { from: 1536, src: 'images/henry_holbein.jpg', caption: 'Portrait c. 1537, Hans Holbein' },
  { from: 1540, src: 'images/henry_full.jpg', caption: 'Portrait 1540s, after Holbein' },
];

/**
 * Pinned panel beside the timeline: year, Henry's age, the reigning queen, the heirs born
 * so far and a waistline estimate, all following the event in the middle of the screen.
 */
export function Hud({ event }: { event: TimelineEvent }) {
  const year = Number(event.d.slice(0, 4));
  const portrait = PORTRAITS.findLast((p) => year >= p.from) ?? PORTRAITS[0]!;
  const queen = queenAt(event.d);
  const previous = lastQueenBefore(event.d);
  const waist = waistAt(year + 0.5);
  const heirsBorn = HEIRS.filter((h) => event.d >= h.born);

  // The flash and the queen "bump" are CSS animations that play on mount, so a changing
  // key replays them: the flash for each death, the bump for each change of queen.
  return (
    <aside className={styles.hud}>
      <div className={styles.hudPortrait}>
        {PORTRAITS.map((p) => (
          <img
            key={p.from}
            src={asset(p.src)}
            data-from={p.from}
            alt={p === portrait ? `Henry VIII, ${p.caption.toLowerCase()}` : ''}
            className={cx(p === portrait && styles.on)}
          />
        ))}
        <span className={styles.hudCap}>{portrait.caption}</span>
        {event.cat === 'death' && <div key={event.d + event.t} className={cx(styles.hudFlash, styles.go)} />}
      </div>
      <div className={styles.hudStats}>
        <div className={styles.stat}>
          <label>Year</label>
          <Odometer value={year} digits={4} label="Year" />
        </div>
        <div className={styles.stat}>
          <label>Henry&apos;s age</label>
          <Odometer value={ageAt(HENRY, event.d)} digits={2} label="Age" />
        </div>
      </div>
      <div className={styles.hudRow}>
        <label>Queen</label>
        <div
          key={queen?.key ?? previous?.key ?? 'none'}
          className={cx(styles.queenChip, styles.bump)}
          style={cssVars({ '--c': queen?.color ?? '#6b5b45' })}
        >
          <span
            className={styles.qcImg}
            style={queen ? { backgroundImage: `url(${asset(queen.img)})` } : undefined}
          />
          <span className={styles.qcName}>
            {queen ? (
              <>
                {queen.name}
                <small>
                  Queen {queen.n} · age {ageText(queen, event.d)}
                </small>
              </>
            ) : previous ? (
              <>
                Between wives<small>after {previous.name}</small>
              </>
            ) : (
              <>
                Unmarried<small>Prince Henry</small>
              </>
            )}
          </span>
        </div>
      </div>
      <div className={styles.hudRow}>
        <label>Heirs</label>
        <div className={styles.heirs}>
          {!heirsBorn.length && <span className={styles.none}>None yet</span>}
          {HEIRS.map((h) => (
            <span
              key={h.key}
              className={cx(styles.h, heirsBorn.includes(h) && styles.on)}
              data-n={h.name}
              title={`${h.name}, born ${formatDate(h.born)}, died ${formatDate(h.died)}`}
              style={{ ...cssVars({ '--c': h.color }), backgroundImage: `url(${asset(h.img)})` }}
            />
          ))}
        </div>
      </div>
      <div className={styles.hudRow}>
        <label>
          Waistline <small>(estimated from his armour)</small>
        </label>
        <div className={styles.waist}>
          <div className={styles.waistBar}>
            <i style={{ width: waist ? `${((waist - 26) / 28) * 100}%` : '0%' }} />
          </div>
          <b>{waist ? `${waist}"` : 'Boy'}</b>
        </div>
      </div>
    </aside>
  );
}
