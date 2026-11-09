import { useSyncExternalStore } from 'react';

/**
 * The year marked on the top bar. The reign timeline and the lifespan chart both move
 * it. It lives outside React state so updating it at 60fps during playback only
 * re-renders the top bar.
 */
let year = 1491;
const listeners = new Set<() => void>();

export function setCursorYear(next: number) {
  if (next === year) return;
  year = next;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useCursorYear = () => useSyncExternalStore(subscribe, () => year);
