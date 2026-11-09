import { EVENTS } from '../data/events';
import { HEIRS } from '../data/heirs';
import { HENRY } from '../data/henry';
import type { Category, Child, IsoDate, Wife, WifeKey } from '../data/types';
import { WIVES } from '../data/wives';
import { ageAt, daysBetween, formatDate } from './dates';

/** Prefixes a public asset path with the site's base URL, so it works on GitHub Pages. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const WIFE_BY_KEY = Object.fromEntries(WIVES.map((w) => [w.key, w])) as Record<WifeKey, Wife>;

export const CATEGORIES: Record<'all' | Category, { label: string; color: string }> = {
  all: { label: 'Everything', color: '#f7dc95' },
  crown: { label: 'Crown', color: '#d8ad55' },
  wife: { label: 'Marriages', color: '#d4668a' },
  family: { label: 'Heirs', color: '#6fae63' },
  faith: { label: 'Faith', color: '#9b7fd1' },
  politics: { label: 'Politics', color: '#c98b4a' },
  war: { label: 'War', color: '#6c98c9' },
  death: { label: 'Deaths', color: '#c8303a' },
};

/** The queen married to Henry on a date. Early 1533 overlaps two; the later marriage wins. */
export const queenAt = (d: IsoDate) => WIVES.filter((w) => d >= w.wed && d <= w.end).at(-1) ?? null;

/** The most recent queen whose marriage had ended before a date. */
export const lastQueenBefore = (d: IsoDate) => WIVES.filter((w) => w.end < d).at(-1) ?? null;

/** Henry's portrait for a date: young, c. 1530, Holbein c. 1537, or the 1540s. */
export function henryPortraitAt(d: IsoDate) {
  if (d < '1520') return 'images/henry_1509.jpg';
  if (d < '1536') return 'images/henry_1530.jpg';
  return 'images/henry_holbein.jpg';
}

/**
 * Rough waistline estimate: a straight line from about 32 inches in 1512 to 52 in the
 * 1540s. Not a measurement. Returns null for childhood.
 */
export function waistAt(year: number) {
  if (year < 1505) return null;
  if (year < 1512) return 32;
  return Math.round(Math.min(52, 32 + (year - 1512) * (20 / 33)));
}

export const isLostChild = (k: Child) => k.fate !== 'adult' && k.fate !== 'unknown';

/** The status shown on a child's entry, such as "Lived 52 days" or "Died aged 42". */
export function childLife(k: Child) {
  if (k.life) return k.life;
  if (k.fate === 'stillborn') return 'Stillborn';
  if (k.fate === 'miscarriage') return 'Miscarried';
  if (k.born && k.died) {
    const d = daysBetween(k.born, k.died);
    return d < 365 ? `Lived ${d} days` : `Died aged ${ageAt({ born: k.born }, k.died)}`;
  }
  return '';
}

/** The child's dates as display parts. Losses show a single date. */
export function childDates(k: Child) {
  const born = k.born ? formatDate(k.born) : (k.bornLabel ?? '');
  if (k.fate === 'stillborn' || k.fate === 'miscarriage' || k.fate === 'lost') return { born };
  const died = k.died ? formatDate(k.died) : k.diedLabel;
  return { born, died };
}

export { EVENTS, HEIRS, HENRY, WIVES };
