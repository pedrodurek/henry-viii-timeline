import styles from './Reign.module.css';

const DIGITS = [...'0123456789'];

/** A number whose digits roll into place like a mechanical counter. */
export function Odometer({ value, digits, label }: { value: number; digits: number; label: string }) {
  const text = String(value).padStart(digits, '0');
  return (
    <div className={styles.odo} role="img" aria-label={`${label} ${value}`}>
      {[...text].map((d, i) => (
        <span key={i} className={styles.dg} aria-hidden="true">
          <span className={styles.strip} style={{ transform: `translateY(${-Number(d)}em)` }}>
            {DIGITS.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}
