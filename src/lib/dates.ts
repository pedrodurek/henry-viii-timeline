import type { IsoDate, Person } from '../data/types';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Parts {
  y: number;
  /** Zero-based month. */
  m: number;
  d: number;
}

/** Splits an ISO date. Missing parts default to 1 July (year only) or the 1st (year and month). */
export function parseDate(s: IsoDate): Parts {
  const [y = NaN, m, d] = s.split('-').map(Number);
  return { y, m: m ? m - 1 : 6, d: d || 1 };
}

const toUtc = ({ y, m, d }: Parts) => Date.UTC(y, m, d);

/** Whole years between a person's birth and a date. */
export function ageAt(person: Pick<Person, 'born'>, date: IsoDate) {
  const b = parseDate(person.born);
  const t = parseDate(date);
  let age = t.y - b.y;
  if (t.m < b.m || (t.m === b.m && t.d < b.d)) age--;
  return age;
}

/** Age as text, with "~" when the birth date is an estimate. */
export const ageText = (person: Pick<Person, 'born' | 'approx'>, date: IsoDate) =>
  `${person.approx ? '~' : ''}${ageAt(person, date)}`;

/** A date as a fractional year, for placing it on a chart. */
export function yearFraction(s: IsoDate) {
  const { y, m, d } = parseDate(s);
  return y + (m + (d - 1) / 31) / 12;
}

/** "11 June 1509", "August 1512" or "c. 1501", depending on how precise the date is. */
export function formatDate(s: IsoDate) {
  const [y, m, d] = s.split('-');
  if (d) return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
  if (m) return `${MONTHS[Number(m) - 1]} ${y}`;
  return `c. ${y}`;
}

/** Birth year, with "c." when approximate. */
export const bornYear = (p: Pick<Person, 'born' | 'approx'>) =>
  `${p.approx ? 'c. ' : ''}${p.born.slice(0, 4)}`;

export const daysBetween = (a: IsoDate, b: IsoDate) => (toUtc(parseDate(b)) - toUtc(parseDate(a))) / 864e5;

/** "23 years, 11 months", "6 months", or "11 days" for very short spans. */
export function duration(a: IsoDate, b: IsoDate) {
  const A = parseDate(a);
  const B = parseDate(b);
  const months = (B.y - A.y) * 12 + (B.m - A.m) - (B.d < A.d ? 1 : 0);
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y && !m) return `${Math.round(daysBetween(a, b))} days`;
  const plural = (n: number, unit: string) => `${n} ${unit}${n > 1 ? 's' : ''}`;
  return [y && plural(y, 'year'), m && plural(m, 'month')].filter(Boolean).join(', ');
}

/** Converts a fractional year back to whole-year text, for charts. */
export const ageAtFraction = (born: IsoDate, year: number) => Math.floor(year - yearFraction(born));
