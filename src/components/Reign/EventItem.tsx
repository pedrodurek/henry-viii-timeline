import type { TimelineEvent } from '../../data/types';
import { useInView } from '../../hooks/useInView';
import { cssVars, cx } from '../../lib/cx';
import { ageAt, ageText, formatDate } from '../../lib/dates';
import { asset, CATEGORIES, HENRY, henryPortraitAt, WIFE_BY_KEY } from '../../lib/people';
import { useModal } from '../../state/modal';
import styles from './Reign.module.css';

interface Props {
  event: TimelineEvent;
  index: number;
  active: boolean;
  hidden: boolean;
}

export function EventItem({ event: e, index, active, hidden }: Props) {
  const [ref, inView] = useInView<HTMLLIElement>();
  const { openLightbox } = useModal();
  const cat = CATEGORIES[e.cat];
  const wife = e.w ? WIFE_BY_KEY[e.w] : undefined;
  const year = e.d.slice(0, 4);
  const dayMonth = (e.label ?? formatDate(e.d)).replace(` ${year}`, '');

  return (
    <li
      ref={ref}
      id={`ev-${index}`}
      data-i={index}
      data-cat={e.cat}
      className={cx(styles.ev, inView && styles.in, active && styles.active, hidden && styles.hide)}
      style={cssVars({ '--c': cat.color })}
    >
      <div className={cx(styles.evCard, e.img && styles.hasImg)}>
        <div className={styles.evBody}>
          <div className={styles.evDate}>
            <span className={styles.yr}>{year}</span>
            <span className={styles.dm}>{dayMonth}</span>
          </div>
          <h3>{e.t}</h3>
          <p>{e.x}</p>
          <div className={styles.evMeta}>
            <span className="badge" style={cssVars({ '--c': HENRY.color })}>
              <em style={{ backgroundImage: `url(${asset(henryPortraitAt(e.d))})` }} />
              Henry, {ageAt(HENRY, e.d)}
            </span>
            {wife && e.d >= wife.born && (
              <span className="badge" style={cssVars({ '--c': wife.color })}>
                <em style={{ backgroundImage: `url(${asset(wife.img)})` }} />
                {wife.short}, {ageText(wife, e.d)}
              </span>
            )}
            <span className="badge cat">{cat.label}</span>
            {e.place && <span className="badge plain">{e.place}</span>}
          </div>
        </div>
        {e.img && (
          <button
            type="button"
            className={styles.evImg}
            aria-label={`Enlarge image: ${e.t}`}
            onClick={() => openLightbox(asset(e.img!), `${e.t}, ${formatDate(e.d)}`)}
          >
            <img src={asset(e.img)} alt="" loading="lazy" />
          </button>
        )}
      </div>
    </li>
  );
}
