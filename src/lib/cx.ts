/** Joins class names, skipping falsy ones. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');

/** Typed helper for passing CSS custom properties through `style`. */
export const cssVars = (vars: Record<`--${string}`, string>) => vars as import('react').CSSProperties;
