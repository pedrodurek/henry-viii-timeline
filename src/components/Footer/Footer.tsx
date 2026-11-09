import { RoseIcon } from '../Rose';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.foot}>
      <RoseIcon className={styles.footRose} />
      <p>
        Portraits and images are public domain works from Wikimedia Commons: Holbein the Younger and workshop,
        Joos van Cleve, Anthonis Mor, the Anthony Roll and others.
      </p>
      <p>
        Dates follow the Julian calendar used in Tudor England. Ages marked ~ rely on estimated birth years.
      </p>
      <a href="#top" className="btn">
        Back to the beginning
      </a>
    </footer>
  );
}
