import type { Wife } from '../../data/types';
import { cssVars, cx } from '../../lib/cx';
import { ageAt, ageText } from '../../lib/dates';
import { asset, childDates, childLife, HENRY, isLostChild } from '../../lib/people';
import { RoseIcon } from '../Rose';
import styles from './Modal.module.css';

/** Every recorded birth and loss for a queen, with dates and the parents' ages. */
export function ChildList({ wife: w }: { wife: Wife }) {
  if (!w.kids.length) return <p className={styles.nokids}>{w.noKids}</p>;
  const mother = w.name.split(' ')[0];

  return (
    <ol className={styles.kids}>
      {w.kids.map((k, j) => {
        const ages = k.born
          ? [`${mother} ${ageText(w, k.born)}`].concat(
              k.born <= HENRY.died && !k.father ? [`Henry ${ageAt(HENRY, k.born)}`] : [],
            )
          : [];
        const { born, died } = childDates(k);
        return (
          <li
            key={`${k.name}-${k.born ?? k.at}`}
            className={cx(styles.kid, isLostChild(k) && styles.lost)}
            style={cssVars({ '--d': `${0.15 + j * 0.09}s` })}
          >
            <span
              className={styles.kav}
              style={k.img ? { backgroundImage: `url(${asset(k.img)})` } : undefined}
            >
              {!k.img && <RoseIcon />}
            </span>
            <div>
              <div className={styles.khead}>
                <b>{k.name}</b>
                <small>
                  {k.sex === 'Unknown' ? '' : k.sex}
                  {k.father ? ` of ${k.father}` : ''}
                </small>
                <span className={styles.klife}>{childLife(k)}</span>
              </div>
              <div className={styles.kdates}>
                {born}
                {died && (
                  <>
                    {' '}
                    <i>to</i> {died}
                  </>
                )}
                {ages.length > 0 && (
                  <span className={styles.kages}>
                    {ages.length > 1 ? "Parents' ages" : "Mother's age"}: {ages.join(', ')}
                  </span>
                )}
              </div>
              {k.reign && <div className={styles.kreign}>{k.reign}</div>}
              <p className={styles.knote}>{k.note}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
