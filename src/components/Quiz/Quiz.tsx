import { useEffect, useRef, useState } from 'react';
import { QUIZ } from '../../data/quiz';
import { cssVars, cx } from '../../lib/cx';
import { asset, WIVES } from '../../lib/people';
import { useBurst } from '../../state/burst';
import { Reveal } from '../Reveal';
import styles from './Quiz.module.css';

const NEXT_DELAY = 2600;
const VERDICTS = [
  'Off to the Tower with you.',
  'Banished from court.',
  'A promising courtier.',
  'The King is pleased.',
  'Made a Knight of the Garter!',
];

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const burst = useBurst();
  const box = useRef<HTMLDivElement>(null);
  const q = QUIZ[index];
  const score = results.filter(Boolean).length;
  const finished = index >= QUIZ.length;

  // After an answer, move on to the next question.
  useEffect(() => {
    if (picked === null) return;
    const t = setTimeout(() => {
      setPicked(null);
      setIndex((i) => i + 1);
    }, NEXT_DELAY);
    return () => clearTimeout(t);
  }, [picked]);

  // A strong final score gets a big burst of roses.
  useEffect(() => {
    if (finished && score >= 5 && box.current) burst(box.current, 40);
  }, [finished, score, burst]);

  const answer = (value: string, el: HTMLElement) => {
    if (picked !== null || !q) return;
    const ok = value === q.a;
    setPicked(value);
    setResults((r) => [...r, ok]);
    if (ok) burst(el);
  };

  const restart = () => {
    setIndex(0);
    setResults([]);
    setPicked(null);
  };

  return (
    <section className="sec" id="quiz">
      <Reveal className="sec-head">
        <p className="kicker">Were you paying attention?</p>
        <h2>The Tudor test</h2>
      </Reveal>
      <Reveal>
        <div className={styles.quiz} ref={box}>
          {finished || !q ? (
            <div className={styles.qend}>
              <h3>
                {score} / {QUIZ.length}
              </h3>
              <p>{VERDICTS[Math.min(4, Math.floor((score / QUIZ.length) * 5))]}</p>
              <button type="button" className="btn primary" onClick={restart}>
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className={styles.qprog} aria-label={`Question ${index + 1} of ${QUIZ.length}`}>
                {QUIZ.map((_, i) => (
                  <i
                    key={i}
                    className={cx(
                      results[i] === true && styles.ok,
                      results[i] === false && styles.bad,
                      i === index && results[i] === undefined && styles.cur,
                    )}
                  />
                ))}
              </div>
              <div key={index} className={styles.qq}>
                {q.q}
              </div>
              <div
                className={cx(styles.qopts, q.type === 'text' && styles.txt, picked !== null && styles.done)}
              >
                {(q.type === 'wife'
                  ? WIVES.map((w) => ({ value: w.key as string, label: w.name, img: w.img, color: w.color }))
                  : q.options.map((o) => ({ value: o, label: o, img: undefined, color: undefined }))
                ).map((o, i) => (
                  <button
                    key={`${index}-${o.value}`}
                    type="button"
                    className={cx(
                      styles.qopt,
                      picked !== null && o.value === q.a && styles.right,
                      picked === o.value && o.value !== q.a && styles.wrong,
                    )}
                    style={cssVars({ '--d': `${i * 0.06}s`, ...(o.color ? { '--c': o.color } : {}) })}
                    onClick={(e) => answer(o.value, e.currentTarget)}
                  >
                    {o.img && <img src={asset(o.img)} alt="" />}
                    <b>{o.label}</b>
                  </button>
                ))}
              </div>
              <div className={styles.qfb} aria-live="polite">
                {picked !== null && (
                  <>
                    {picked === q.a ? (
                      <b className={styles.yes}>Correct.</b>
                    ) : (
                      <b className={styles.no}>Not quite.</b>
                    )}{' '}
                    {q.why}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
