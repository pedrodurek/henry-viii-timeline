import { useEffect, useRef, useState } from 'react';
import type { Category } from '../../data/types';
import { cssVars, cx } from '../../lib/cx';
import { yearFraction } from '../../lib/dates';
import { CATEGORIES, EVENTS } from '../../lib/people';
import { setCursorYear } from '../../state/cursor';
import { Reveal } from '../Reveal';
import { EventItem } from './EventItem';
import { Hud } from './Hud';
import styles from './Reign.module.css';

export type Filter = 'all' | Category;

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
}

/** The life and reign: filterable events, with the pinned panel following the one in view. */
export function Reign({ filter, onFilter }: Props) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const spine = useRef<HTMLElement>(null);

  // The event crossing the middle of the screen becomes the active one.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = Number((en.target as HTMLElement).dataset.i);
          setActive(i);
          setCursorYear(yearFraction(EVENTS[i]!.d));
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    list.current?.querySelectorAll('li[data-i]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // The gold line down the timeline fills as you scroll through it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = list.current;
      if (!el || !spine.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / r.height));
      spine.current.style.height = `${p * 100}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, [filter]);

  return (
    <section className="sec" id="reign">
      <Reveal className="sec-head">
        <p className="kicker">Fifty-five years, scroll by scroll</p>
        <h2>The life and reign</h2>
        <div className={styles.filters}>
          {(Object.keys(CATEGORIES) as Filter[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              className={cx(styles.chip, filter === k && styles.on)}
              style={cssVars({ '--c': CATEGORIES[k].color })}
              onClick={() => onFilter(k)}
            >
              <i />
              {CATEGORIES[k].label}
            </button>
          ))}
        </div>
      </Reveal>
      <div className={styles.reignGrid}>
        <Hud event={EVENTS[active]!} />
        <div className={styles.events} ref={list}>
          <div className={styles.spine} aria-hidden="true">
            <i ref={spine} />
          </div>
          <ol className={styles.eventList}>
            {EVENTS.map((e, i) => (
              <EventItem
                key={`${e.d}-${e.t}`}
                event={e}
                index={i}
                active={i === active}
                hidden={filter !== 'all' && e.cat !== filter}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
