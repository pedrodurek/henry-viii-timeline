import { createContext, useContext } from 'react';

/** Fires a burst of Tudor roses from the centre of an element. */
export type BurstFn = (el: Element, count?: number) => void;

export const BurstContext = createContext<BurstFn>(() => {});
export const useBurst = () => useContext(BurstContext);
