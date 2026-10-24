// All game data lives here for version 1.
// Later you can move this into a Supabase "games" table with the same fields.
//
// A game with an `embedUrl` is playable. A game without one shows "Coming soon".
// To add a real game: put its HTML5 embed URL (or a file in /static/embed) in `embedUrl`.

export type CategorySlug =
	| 'action'
	| 'puzzle'
	| 'racing'
	| 'sports'
	| 'arcade'
	| 'adventure'
	| 'kids'
	| 'strategy';

export interface Category {
	slug: CategorySlug;
	name: string;
	emoji: string;
	from: string;
	to: string;
}

export interface Game {
	slug: string;
	title: string;
	category: CategorySlug;
	emoji: string;
	/** thumbnail gradient colors */
	from: string;
	to: string;
	plays: number;
	/** plays this week, used for "Trending" */
	weekly: number;
	/** YYYY-MM-DD, used for "New" */
	addedAt: string;
	featured?: boolean;
	description: string;
	controls: string[];
	embedUrl?: string;
}

export const categories: Category[] = [
	{ slug: 'action', name: 'Action', emoji: '🔥', from: '#f97316', to: '#ef4444' },
	{ slug: 'puzzle', name: 'Puzzle', emoji: '🧩', from: '#7c3aed', to: '#6366f1' },
	{ slug: 'racing', name: 'Racing', emoji: '🏎️', from: '#06b6d4', to: '#3b82f6' },
	{ slug: 'sports', name: 'Sports', emoji: '⚽', from: '#22c55e', to: '#10b981' },
	{ slug: 'arcade', name: 'Arcade', emoji: '👾', from: '#ec4899', to: '#a855f7' },
	{ slug: 'adventure', name: 'Adventure', emoji: '🗺️', from: '#f59e0b', to: '#f97316' },
	{ slug: 'kids', name: 'Kids', emoji: '🎈', from: '#f472b6', to: '#fb923c' },
	{ slug: 'strategy', name: 'Strategy', emoji: '♟️', from: '#14b8a6', to: '#06b6d4' }
];

export const games: Game[] = [
	{
		slug: 'snake-rush',
		title: 'Snake Rush',
		category: 'arcade',
		emoji: '🐍',
		from: '#22c55e',
		to: '#06b6d4',
		plays: 482000,
		weekly: 18400,
		addedAt: '2026-10-20',
		featured: true,
		description:
			'Guide your hungry snake around the board, gobble up apples, and grow as long as you can. Do not bump into the walls or your own tail!',
		controls: ['Arrow keys or W A S D to steer', 'Swipe on a phone or tablet'],
		embedUrl: '/embed/snake.html'
	},
	{
		slug: 'bubble-pop',
		title: 'Bubble Pop',
		category: 'kids',
		emoji: '🫧',
		from: '#38bdf8',
		to: '#a855f7',
		plays: 356000,
		weekly: 15200,
		addedAt: '2026-10-21',
		description:
			'Pop as many bubbles as you can in 30 seconds. Small bubbles are worth more points, so aim carefully!',
		controls: ['Click or tap a bubble to pop it'],
		embedUrl: '/embed/bubble-pop.html'
	},
	{
		slug: 'memory-match',
		title: 'Memory Match',
		category: 'puzzle',
		emoji: '🧠',
		from: '#7c3aed',
		to: '#ec4899',
		plays: 291000,
		weekly: 11800,
		addedAt: '2026-10-22',
		description:
			'Flip the cards and find all the matching pairs in as few moves as possible. A fun workout for your memory.',
		controls: ['Click or tap a card to flip it', 'Match all 8 pairs to win'],
		embedUrl: '/embed/memory-match.html'
	},
	{
		slug: 'tic-tac-toe',
		title: 'Tic Tac Toe',
		category: 'strategy',
		emoji: '❌',
		from: '#f59e0b',
		to: '#ef4444',
		plays: 204000,
		weekly: 7600,
		addedAt: '2026-10-22',
		description:
			'The classic game of X and O against the computer. Choose Easy to relax or Hard if you dare to try for a draw.',
		controls: ['Click or tap a square to place your X', 'Pick Easy or Hard before you start'],
		embedUrl: '/embed/tic-tac-toe.html'
	},
	{
		slug: 'whack-a-mole',
		title: 'Whack-a-Mole',
		category: 'kids',
		emoji: '🔨',
		from: '#84cc16',
		to: '#f59e0b',
		plays: 175000,
		weekly: 9300,
		addedAt: '2026-10-23',
		description:
			'The moles are popping out of their holes! Whack as many as you can before the 30 seconds run out.',
		controls: ['Click or tap a mole to whack it'],
		embedUrl: '/embed/whack-a-mole.html'
	},
	{
		slug: 'neon-racer',
		title: 'Neon Racer',
		category: 'racing',
		emoji: '🏎️',
		from: '#06b6d4',
		to: '#6366f1',
		plays: 640000,
		weekly: 21000,
		addedAt: '2026-10-18',
		description: 'Race through glowing neon streets and dodge traffic at top speed.',
		controls: ['Arrow keys to steer', 'Space to boost']
	},
	{
		slug: 'block-blast',
		title: 'Block Blast',
		category: 'puzzle',
		emoji: '🧱',
		from: '#ec4899',
		to: '#f59e0b',
		plays: 520000,
		weekly: 16900,
		addedAt: '2026-10-17',
		description: 'Fit colorful blocks into the grid and clear full lines to score big.',
		controls: ['Drag blocks onto the grid']
	},
	{
		slug: 'space-dash',
		title: 'Space Dash',
		category: 'action',
		emoji: '🚀',
		from: '#6366f1',
		to: '#0ea5e9',
		plays: 388000,
		weekly: 14100,
		addedAt: '2026-10-16',
		description: 'Blast through an asteroid field and collect stars on your way across the galaxy.',
		controls: ['Arrow keys to fly', 'Space to shoot']
	},
	{
		slug: 'sky-jumper',
		title: 'Sky Jumper',
		category: 'adventure',
		emoji: '🦘',
		from: '#f59e0b',
		to: '#22c55e',
		plays: 247000,
		weekly: 8800,
		addedAt: '2026-10-15',
		description: 'Hop from cloud to cloud and climb as high as you can without falling.',
		controls: ['Left and right arrows to move']
	},
	{
		slug: 'fruit-slice',
		title: 'Fruit Slice',
		category: 'arcade',
		emoji: '🍉',
		from: '#ef4444',
		to: '#22c55e',
		plays: 433000,
		weekly: 13500,
		addedAt: '2026-10-14',
		description: 'Swipe to slice flying fruit. Watch out for the bombs!',
		controls: ['Swipe or drag with the mouse']
	},
	{
		slug: 'tiny-tanks',
		title: 'Tiny Tanks',
		category: 'strategy',
		emoji: '🪖',
		from: '#14b8a6',
		to: '#84cc16',
		plays: 162000,
		weekly: 5200,
		addedAt: '2026-10-13',
		description: 'Outsmart the enemy tanks by planning your angle and power for each shot.',
		controls: ['Mouse to aim', 'Click to fire']
	},
	{
		slug: 'penalty-kick',
		title: 'Penalty Kick',
		category: 'sports',
		emoji: '⚽',
		from: '#22c55e',
		to: '#0ea5e9',
		plays: 311000,
		weekly: 10400,
		addedAt: '2026-10-12',
		description: 'Aim your shot, beat the goalkeeper, and score the winning goal.',
		controls: ['Click and drag to aim', 'Release to shoot']
	},
	{
		slug: 'word-rush',
		title: 'Word Rush',
		category: 'puzzle',
		emoji: '🔤',
		from: '#a855f7',
		to: '#06b6d4',
		plays: 198000,
		weekly: 6100,
		addedAt: '2026-10-11',
		description: 'Find as many words as you can in the letter grid before time runs out.',
		controls: ['Drag across letters to spell words']
	}
];

export function getGame(slug: string): Game | undefined {
	return games.find((g) => g.slug === slug);
}

export function getCategory(slug: string): Category {
	return categories.find((c) => c.slug === slug) ?? categories[0];
}

export function featuredGame(): Game {
	return games.find((g) => g.featured) ?? games[0];
}

export function trending(n = 6): Game[] {
	return [...games].sort((a, b) => b.weekly - a.weekly).slice(0, n);
}

export function newest(n = 6): Game[] {
	return [...games].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, n);
}

export function mostPlayed(n = 6): Game[] {
	return [...games].sort((a, b) => b.plays - a.plays).slice(0, n);
}

export function byCategory(slug: CategorySlug): Game[] {
	return games.filter((g) => g.category === slug);
}

/** Same-category games first, then the most played of the rest. */
export function related(game: Game, n = 6): Game[] {
	const others = games.filter((g) => g.slug !== game.slug);
	const same = others.filter((g) => g.category === game.category);
	const rest = others
		.filter((g) => g.category !== game.category)
		.sort((a, b) => b.plays - a.plays);
	return [...same, ...rest].slice(0, n);
}

export function formatPlays(n: number): string {
	if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
	return String(n);
}
