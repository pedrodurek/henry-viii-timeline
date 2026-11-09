import { cssVars as vars } from '../../lib/cx';
import { asset, HENRY, WIVES } from '../../lib/people';
import { useModal } from '../../state/modal';
import { GoldDust } from './GoldDust';
import styles from './Hero.module.css';

/** Splits a word into letters that rise in one after another. */
function Letters({ text, start }: { text: string; start: number }) {
  return [...text].map((ch, i) => (
    <span key={i} className={styles.ch} style={{ animationDelay: `${start + i * 0.08}s, 0s` }}>
      {ch}
    </span>
  ));
}

export function Hero() {
  const { openWife } = useModal();

  return (
    <header className={styles.hero} id="top">
      <GoldDust className={styles.dust} />
      <div className={styles.heroInner}>
        <div>
          <svg className={styles.crown} viewBox="0 0 200 120" aria-hidden="true">
            <path d="M20 95 L10 30 L55 65 L100 15 L145 65 L190 30 L180 95 Z" />
            <path d="M20 95 L180 95 L178 110 L22 110 Z" />
            <circle cx="10" cy="30" r="6" />
            <circle cx="100" cy="15" r="7" />
            <circle cx="190" cy="30" r="6" />
            <circle cx="55" cy="80" r="5" />
            <circle cx="100" cy="78" r="6" />
            <circle cx="145" cy="80" r="5" />
          </svg>
          <p className="kicker">By the Grace of God, King of England, France &amp; Ireland</p>
          <h1 className={styles.title} aria-label="Henry VIII">
            <span className={styles.split}>
              <Letters text="HENRY" start={0.35} />
            </span>{' '}
            <span className={`${styles.split} ${styles.roman}`}>
              <Letters text="VIII" start={0.8} />
            </span>
          </h1>
          <p className={styles.sub}>1491 to 1547 · 37 years on the throne · one Church broken · six queens</p>
          <p className={styles.rhyme} aria-label="Divorced, beheaded, died; divorced, beheaded, survived">
            {WIVES.map((w, i) => (
              <button
                key={w.key}
                type="button"
                className={styles.w}
                style={{ ...vars({ '--c': w.color }), animationDelay: `${1.9 + i * 0.18}s` }}
                onClick={() => openWife(i)}
              >
                {w.fate}
                <span className={styles.tip}>
                  <img src={asset(w.img)} alt="" />
                  <span>{w.name}</span>
                </span>
              </button>
            ))}
          </p>
          <div className={styles.heroCta}>
            <a className="btn primary" href="#queens">
              Meet the queens
            </a>
            <a className="btn" href="#reign">
              Walk the reign
            </a>
          </div>
        </div>

        <div className={styles.orbitWrap} aria-label="Henry and his six wives">
          <div className={styles.orbitRing} />
          <div className={`${styles.orbitRing} ${styles.r2}`} />
          <div className={styles.kingMedal}>
            <img src={asset(HENRY.img)} alt="Henry VIII by Hans Holbein the Younger, c. 1537" />
            <span>Henry VIII</span>
          </div>
          <div className={styles.orbit}>
            {WIVES.map((w, i) => (
              <div key={w.key} className={styles.sat} style={vars({ '--a': `${i * 60}deg`, '--c': w.color })}>
                <div className={styles.satIn}>
                  <button type="button" aria-label={w.name} onClick={() => openWife(i)}>
                    <img src={asset(w.img)} alt="" />
                    <span className={styles.n}>{w.n}</span>
                  </button>
                  <span className={styles.lbl}>{w.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a className={styles.scrollCue} href="#queens" aria-label="Scroll down">
        <span />
      </a>
    </header>
  );
}
