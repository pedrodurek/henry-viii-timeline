// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * CSS Module class lookups are typed as plain strings, so a typo like `styles.cardInnr`
 * compiles and silently renders nothing. This checks every `styles.x` used in a component
 * against the classes its module actually defines.
 */
const dir = fileURLToPath(new URL('.', import.meta.url));
const camel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

const files = readdirSync(dir, { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.tsx'));

describe('CSS Module class names', () => {
  for (const file of files) {
    const src = readFileSync(`${dir}/${file}`, 'utf8');
    const imp = src.match(/import styles from '\.\/(.+\.module\.css)'/);
    if (!imp) continue;
    it(`${file} only uses classes defined in ${imp[1]}`, () => {
      const css = readFileSync(`${dir}/${file.replace(/[^/]+$/, '')}${imp[1]}`, 'utf8').replace(
        /:global\([^)]*\)/g,
        '',
      );
      const defined = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => camel(m[1]!)));
      const used = [...new Set([...src.matchAll(/styles\.(\w+)/g)].map((m) => m[1]!))];
      expect(used.filter((c) => !defined.has(c))).toEqual([]);
    });
  }
});
