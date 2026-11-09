# Henry VIII · The King and His Six Queens

An interactive, animated timeline of Henry VIII's life and reign, his six wives, and their children.

**Live site:** https://pedrodurek.github.io/henry-viii-timeline/

## What's on the page

- **The six queens.** Portrait cards that tilt under the cursor and flip to show the marriage dates, ages, how long it lasted, children and motto. Each opens a full story with every recorded birth and loss.
- **Ages at the wedding.** Henry's age against each wife's on the wedding day, or how long each marriage lasted.
- **The life and reign.** 39 events from 1491 to 1547. A pinned panel tracks the year, Henry's age, the reigning queen, his heirs, and his portrait as he ages.
- **Ten lives, side by side.** Drag through time, or press play, to see who was alive, who was married to whom, and everyone's age.
- **The Tudor test.** A seven-question quiz.

## Development

Built with React 19, TypeScript and Vite. It needs Node 22 or later and pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:8471
```

| Command        | What it does                                              |
| -------------- | --------------------------------------------------------- |
| `pnpm dev`     | Dev server with hot reload                                |
| `pnpm build`   | Type checks and builds the static site into `dist/`       |
| `pnpm preview` | Serves the built site at the same path GitHub Pages uses  |
| `pnpm test`    | Runs the Vitest suite                                     |
| `pnpm lint`    | Runs ESLint                                               |
| `pnpm format`  | Formats everything with Prettier                          |
| `pnpm check`   | Type check, lint, format check and tests, as CI runs them |

The project's `.npmrc` points pnpm at the public npm registry, so the lockfile works on GitHub's build servers whatever registry your machine is configured for.

## Project layout

```
src/
  data/         Content: wives and their children, heirs, events, quiz, and the types for all of it
  lib/          Date and age logic, lookups, and helpers
  hooks/        useInView, for the scroll reveal animations
  state/        The top bar's year marker, and the pop-up and rose-burst contexts
  components/   One folder per section, each with its CSS Module
  styles/       Global stylesheet: design tokens and shared pieces like buttons and badges
public/images/  Portraits and paintings
```

To change the content, edit the files in `src/data/`. Dates are ISO strings. A year-only birth date, such as `'1501'`, is treated as approximate, and ages based on it show with a `~`. The tests check that every date is well formed, events are in order, and every image exists.

## Tests

- `src/lib/dates.test.ts` covers the age, duration and date formatting logic.
- `src/data/data.test.ts` checks the content for bad dates, ordering, missing images and quiz answers.
- `src/components/classNames.test.ts` checks that every CSS Module class used in a component is defined in its stylesheet, since TypeScript can't catch a misspelled class name.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs the checks and the build on every pull request. On every push to `main` it also deploys `dist/` to GitHub Pages.

## Sources and credits

Portraits and paintings are public domain works from [Wikimedia Commons](https://commons.wikimedia.org/), by Hans Holbein the Younger and his workshop, Joos van Cleve, Anthonis Mor, the Anthony Roll and unknown artists. Fonts are Cinzel, Cinzel Decorative and EB Garamond, self-hosted through Fontsource.

Dates follow the Julian calendar used in Tudor England. Birth years for Anne Boleyn, Jane Seymour, Catherine Howard and Catherine Parr are not recorded, so their ages are estimates. No portrait of Catherine Howard is confirmed. The one used here is a Holbein workshop painting often linked to her.
