/**
 * Dates are ISO-style strings: 'YYYY-MM-DD', 'YYYY-MM' or 'YYYY'.
 * A year-only or year-month date is treated as approximate.
 */
export type IsoDate = string;

export type WifeKey = 'aragon' | 'boleyn' | 'seymour' | 'cleves' | 'howard' | 'parr';
export type HeirKey = 'mary' | 'elizabeth' | 'edward';
export type Fate = 'Divorced' | 'Beheaded' | 'Died' | 'Survived';
export type EndHow = 'Annulled' | 'Executed' | 'Died' | 'Widowed';

/** Anything with a birth date that ages can be computed from. */
export interface Person {
  born: IsoDate;
  died: IsoDate;
  /** Birth date is an estimate; ages show with a "~". */
  approx?: boolean;
}

export interface King extends Person {
  key: 'henry';
  name: string;
  reignStart: IsoDate;
  color: string;
  img: string;
}

export type ChildFate = 'stillborn' | 'miscarriage' | 'lost' | 'infant' | 'adult' | 'unknown';

export interface Child {
  name: string;
  sex: 'Son' | 'Daughter' | 'Unknown';
  /** Exact birth date, when known. */
  born?: IsoDate;
  /** Approximate date, used only to place the child on a chart when `born` is unknown. */
  at?: IsoDate;
  bornLabel?: string;
  died?: IsoDate;
  diedLabel?: string;
  fate: ChildFate;
  /** Overrides the computed status label, such as "Lived 52 days". */
  life?: string;
  note: string;
  img?: string;
  reign?: string;
  /** Set when the father is not Henry. */
  father?: string;
}

export interface Wife extends Person {
  key: WifeKey;
  n: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  name: string;
  short: string;
  wed: IsoDate;
  end: IsoDate;
  endHow: EndHow;
  fate: Fate;
  color: string;
  img: string;
  emblem: string;
  motto: string;
  birthplace: string;
  deathplace: string;
  kidsShort: string;
  kids: Child[];
  /** Shown instead of the list when there are no children. */
  noKids?: string;
  blurb: string;
  story: string[];
  fact: string;
}

export interface Heir extends Person {
  key: HeirKey;
  name: string;
  mother: WifeKey;
  img: string;
  color: string;
}

export type Category = 'crown' | 'wife' | 'family' | 'faith' | 'politics' | 'war' | 'death';

export interface TimelineEvent {
  d: IsoDate;
  /** Overrides the formatted date, for events without an exact day. */
  label?: string;
  t: string;
  cat: Category;
  /** The wife this event involves, whose age is shown alongside Henry's. */
  w?: WifeKey;
  img?: string;
  place?: string;
  x: string;
}

interface QuizBase {
  q: string;
  why: string;
}

export type QuizQuestion =
  (QuizBase & { type: 'wife'; a: WifeKey }) | (QuizBase & { type: 'text'; a: string; options: string[] });
