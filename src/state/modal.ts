import { createContext, useContext } from 'react';

export type ModalView = { type: 'wife'; index: number } | { type: 'lightbox'; src: string; caption: string };

export interface ModalApi {
  openWife: (index: number) => void;
  openLightbox: (src: string, caption: string) => void;
}

export const ModalContext = createContext<ModalApi | null>(null);

export function useModal() {
  const api = useContext(ModalContext);
  if (!api) throw new Error('useModal must be used inside <ModalProvider>');
  return api;
}
