import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cssVars, cx } from '../../lib/cx';
import { WIVES } from '../../lib/people';
import { ModalContext, type ModalApi, type ModalView } from '../../state/modal';
import styles from './Modal.module.css';
import { WifeStory } from './WifeStory';

const wrap = (i: number) => (i + WIVES.length) % WIVES.length;

/**
 * Holds the pop-up: a queen's story or an enlarged image. The last view stays rendered
 * while the pop-up animates closed.
 */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ModalView | null>(null);
  const isOpen = useRef(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const body = useRef<HTMLElement>(null);

  const show = useCallback((next: ModalView) => {
    if (!isOpen.current) lastFocus.current = document.activeElement as HTMLElement | null;
    isOpen.current = true;
    setOpen(true);
    setView(next);
  }, []);

  const api = useMemo<ModalApi>(
    () => ({
      openWife: (index) => show({ type: 'wife', index: wrap(index) }),
      openLightbox: (src, caption) => show({ type: 'lightbox', src, caption }),
    }),
    [show],
  );

  const close = useCallback(() => {
    isOpen.current = false;
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  // Lock page scroll, focus the close button, and handle Escape and the arrow keys.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => closeBtn.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (view?.type === 'wife' && e.key === 'ArrowRight') api.openWife(view.index + 1);
      if (view?.type === 'wife' && e.key === 'ArrowLeft') api.openWife(view.index - 1);
    };
    addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
      removeEventListener('keydown', onKey);
    };
  }, [open, view, api, close]);

  // Start each story at the top.
  useEffect(() => {
    body.current?.querySelector(`.${styles.mBody}`)?.scrollTo(0, 0);
    body.current?.scrollTo(0, 0);
  }, [view]);

  const wife = view?.type === 'wife' ? WIVES[view.index] : undefined;

  return (
    <ModalContext.Provider value={api}>
      {children}
      <div
        className={cx(styles.modal, open && styles.open)}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby={wife ? 'modal-title' : undefined}
        aria-label={view?.type === 'lightbox' ? view.caption : undefined}
      >
        <div className={styles.modalBg} onClick={close} />
        <article
          ref={body}
          className={cx(styles.modalCard, view?.type === 'lightbox' && styles.lightbox)}
          style={cssVars({ '--c': wife?.color ?? '#d8ad55' })}
        >
          <button ref={closeBtn} type="button" className={styles.mClose} aria-label="Close" onClick={close}>
            ×
          </button>
          {wife && view?.type === 'wife' && (
            <WifeStory
              key={wife.key}
              wife={wife}
              prev={WIVES[wrap(view.index - 1)]!}
              next={WIVES[wrap(view.index + 1)]!}
              onNav={(step) => api.openWife(view.index + step)}
            />
          )}
          {view?.type === 'lightbox' && (
            <figure style={{ margin: 0 }}>
              <img src={view.src} alt="" />
              <figcaption>{view.caption}</figcaption>
            </figure>
          )}
        </article>
      </div>
    </ModalContext.Provider>
  );
}
