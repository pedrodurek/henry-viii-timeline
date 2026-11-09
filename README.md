# Henry VIII · The King and His Six Queens

An interactive, animated timeline of Henry VIII's life and reign, his six wives, and their children.

**Live site:** https://pedrodurek.github.io/henry-viii-timeline/

## What's on the page

- **The six queens.** Portrait cards that tilt under the cursor and flip to show the marriage dates, ages, how long it lasted, children and motto. Each opens a full story with every recorded birth and loss.
- **Ages at the wedding.** Henry's age against each wife's on the wedding day, or how long each marriage lasted.
- **The life and reign.** 39 events from 1491 to 1547. A pinned panel tracks the year, Henry's age, the reigning queen, his heirs, and his portrait as he ages.
- **Ten lives, side by side.** Drag through time, or press play, to see who was alive, who was married to whom, and everyone's age.
- **The Tudor test.** A seven-question quiz.

## Running it locally

It's a static site with no build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8471
```

Then visit http://localhost:8471.

## Files

| File | Contents |
|---|---|
| `index.html` | Page structure |
| `styles.css` | Styling and animations |
| `app.js` | Interactions: cards, timeline, charts, quiz, pop-ups |
| `data.js` | Content: wives, children, events, quiz questions |
| `images/` | Portraits and paintings |

To change the content, edit `data.js`. Dates are ISO strings. A year-only birth date, such as `'1501'`, is treated as approximate, and ages based on it show with a `~`.

## Sources and credits

Portraits and paintings are public domain works from [Wikimedia Commons](https://commons.wikimedia.org/), by Hans Holbein the Younger and his workshop, Joos van Cleve, Anthonis Mor, the Anthony Roll and unknown artists. Fonts are Cinzel, Cinzel Decorative and EB Garamond from Google Fonts.

Dates follow the Julian calendar used in Tudor England. Birth years for Anne Boleyn, Jane Seymour, Catherine Howard and Catherine Parr are not recorded, so their ages are estimates. No portrait of Catherine Howard is confirmed. The one used here is a Holbein workshop painting often linked to her.
