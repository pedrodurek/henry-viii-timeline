// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { EVENTS } from './events';
import { HEIRS } from './heirs';
import { HENRY } from './henry';
import { QUIZ } from './quiz';
import { WIVES } from './wives';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ISO = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const dates = (o: object) =>
  Object.entries(o).filter(
    ([k, v]) => typeof v === 'string' && ['born', 'died', 'wed', 'end', 'd', 'at', 'reignStart'].includes(k),
  );

describe('content data', () => {
  it('uses well-formed ISO dates everywhere', () => {
    const all = [HENRY, ...WIVES, ...WIVES.flatMap((w) => w.kids), ...HEIRS, ...EVENTS].flatMap(dates);
    expect(all.length).toBeGreaterThan(80);
    for (const [key, value] of all) expect(value, key).toMatch(ISO);
  });

  it('lists the wives in marriage order, each ending before or as the next begins', () => {
    for (let i = 1; i < WIVES.length; i++) {
      expect(WIVES[i]!.wed >= WIVES[i - 1]!.wed).toBe(true);
      expect(WIVES[i]!.wed <= WIVES[i]!.end).toBe(true);
    }
  });

  it('keeps events in date order', () => {
    for (let i = 1; i < EVENTS.length; i++) expect(EVENTS[i]!.d >= EVENTS[i - 1]!.d, EVENTS[i]!.t).toBe(true);
  });

  it('gives every child a date to place them on the life chart', () => {
    for (const k of WIVES.flatMap((w) => w.kids)) expect(k.born ?? k.at, k.name).toBeTruthy();
    for (const w of WIVES) if (!w.kids.length) expect(w.noKids, w.name).toBeTruthy();
  });

  it('points every image at a file that exists', () => {
    const imgs = [
      HENRY.img,
      ...WIVES.map((w) => w.img),
      ...HEIRS.map((h) => h.img),
      ...EVENTS.map((e) => e.img),
    ]
      .concat(WIVES.flatMap((w) => w.kids.map((k) => k.img)))
      .filter((s): s is string => !!s);
    for (const img of imgs)
      expect(existsSync(fileURLToPath(new URL(`../../public/${img}`, import.meta.url))), img).toBe(true);
  });

  it('has quiz answers that are among the options', () => {
    for (const q of QUIZ) if (q.type === 'text') expect(q.options).toContain(q.a);
  });
});
