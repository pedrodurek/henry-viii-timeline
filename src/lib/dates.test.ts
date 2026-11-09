import { describe, expect, it } from 'vitest';
import { ageAt, ageText, bornYear, duration, formatDate, parseDate, yearFraction } from './dates';

const henry = { born: '1491-06-28' };

describe('ageAt', () => {
  it('counts whole years and respects the birthday', () => {
    expect(ageAt(henry, '1509-04-21')).toBe(17); // became king two months before turning 18
    expect(ageAt(henry, '1509-06-27')).toBe(17);
    expect(ageAt(henry, '1509-06-28')).toBe(18);
    expect(ageAt(henry, '1547-01-28')).toBe(55);
  });

  it('treats a year-only birth as 1 July', () => {
    expect(ageAt({ born: '1501' }, '1533-01-25')).toBe(31);
    expect(ageAt({ born: '1501' }, '1533-07-01')).toBe(32);
  });

  it('treats a year-month birth as the 1st of that month', () => {
    expect(ageAt({ born: '1512-08' }, '1543-07-12')).toBe(30);
    expect(ageAt({ born: '1512-08' }, '1548-09-05')).toBe(36);
  });
});

describe('ageText', () => {
  it('marks estimated ages with ~', () => {
    expect(ageText({ born: '1508', approx: true }, '1536-05-30')).toBe('~27');
    expect(ageText({ born: '1485-12-16' }, '1509-06-11')).toBe('23');
  });
});

describe('formatDate', () => {
  it('formats each level of precision', () => {
    expect(formatDate('1509-06-11')).toBe('11 June 1509');
    expect(formatDate('1512-08')).toBe('August 1512');
    expect(formatDate('1501')).toBe('c. 1501');
  });
});

describe('bornYear', () => {
  it('prefixes approximate years with c.', () => {
    expect(bornYear({ born: '1501', approx: true })).toBe('c. 1501');
    expect(bornYear({ born: '1485-12-16' })).toBe('1485');
  });
});

describe('duration', () => {
  it('matches the marriage lengths shown on the cards', () => {
    expect(duration('1509-06-11', '1533-05-23')).toBe('23 years, 11 months');
    expect(duration('1533-01-25', '1536-05-19')).toBe('3 years, 3 months');
    expect(duration('1540-01-06', '1540-07-09')).toBe('6 months');
    expect(duration('1536-05-19', '1536-05-30')).toBe('11 days');
  });
});

describe('yearFraction', () => {
  it('places dates within the year', () => {
    expect(yearFraction('1509-01-01')).toBe(1509);
    expect(yearFraction('1501')).toBeCloseTo(1501.5, 1);
    expect(parseDate('1501')).toEqual({ y: 1501, m: 6, d: 1 });
  });
});
