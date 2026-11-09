import { WIVES } from '../../lib/people';
import { useModal } from '../../state/modal';
import { Reveal } from '../Reveal';
import { QueenCard } from './QueenCard';
import styles from './QueenCards.module.css';

export function Queens() {
  const { openWife } = useModal();
  return (
    <section className="sec" id="queens">
      <Reveal className="sec-head">
        <p className="kicker">Six marriages in 34 years</p>
        <h2>The six queens</h2>
        <p className="lede">
          Move over a portrait to tilt it. Click to turn it over. Open the full story from the back.
        </p>
      </Reveal>
      <div className={styles.cards}>
        {WIVES.map((w, i) => (
          <QueenCard key={w.key} wife={w} index={i} onOpen={() => openWife(i)} />
        ))}
      </div>
    </section>
  );
}
