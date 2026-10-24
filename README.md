# PlayNest

Free HTML5 browser games, playable instantly. No downloads, no sign-up.

Built with SvelteKit 3 (Svelte 5), Tailwind CSS 4, TypeScript and Bun.
SvelteKit 3 settings live in `vite.config.ts` (there is no `svelte.config.js`), and imports
from `src/lib` use the `#lib/...` alias with file extensions.
This is the **front end only**. Game data lives in a TypeScript file for now.

## Run it

```bash
bun install
bun run dev
```

Then open http://localhost:5173

Other commands:

```bash
bun run build     # production build
bun run preview   # preview the production build
bun run check     # type check
```

Run `bun install` inside this folder first, so the project uses its own packages.
SvelteKit 3 needs Node 22.17 or newer.

## What's inside

```
src/
  app.css                      Tailwind + PlayNest colors and animations
  lib/
    data/games.ts              Categories + all games (edit this to add games)
    stores/library.svelte.ts   Favorites + recently played (saved in the browser)
    components/                Header, Footer, GameCard, GameRow, CategoryChips, AdSlot, InfoPage
  routes/
    +page.svelte               Home
    games/+page.svelte         All games, search, category filter, sort, load more
    game/[slug]/               Play page (player, favorite, fullscreen, related games)
    about, contact, privacy, terms
static/embed/                  5 original playable games (HTML files)
```

## Playable games included

Snake Rush, Bubble Pop, Memory Match, Tic Tac Toe and Whack-a-Mole are original games
made for this project, so you can use them freely. The other games in the list show
"Coming soon" until you give them an `embedUrl`.

## Adding a game

Open `src/lib/data/games.ts` and add an entry to the `games` array:

```ts
{
  slug: 'my-game',
  title: 'My Game',
  category: 'arcade',
  emoji: '🎯',
  from: '#7c3aed',
  to: '#ec4899',
  plays: 0,
  weekly: 0,
  addedAt: '2026-11-01',
  description: 'One or two friendly sentences.',
  controls: ['Arrow keys to move'],
  embedUrl: '/embed/my-game.html'   // or a licensed https:// embed URL
}
```

Games run inside an `iframe` on the play page. Only use games you made, games with an
open license, or games from catalogs that allow embedding (check their terms first).
The `plays` numbers are demo values. Replace them with real counts once you track plays.

## Later (not in this version)

- Move `games.ts` into a Supabase `games` table
- Real ads (replace the `AdSlot` component)
- Premium membership and accounts
- Real thumbnails (swap the emoji tile in `GameCard.svelte` for an `<img>`)
- Replace the placeholder text and email on the About, Contact, Privacy and Terms pages
- Pick a hosting adapter (Vercel or Cloudflare) in `vite.config.ts`
