const browser = typeof window !== 'undefined';

// Favorites and recently played are saved in the visitor's own browser,
// so nobody has to register or log in.

const FAV_KEY = 'playnest:favorites';
const RECENT_KEY = 'playnest:recent';
const MAX_RECENT = 12;

function load(key: string): string[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(key);
		const value = raw ? JSON.parse(raw) : [];
		return Array.isArray(value) ? value.filter((v) => typeof v === 'string') : [];
	} catch {
		return [];
	}
}

function save(key: string, value: string[]) {
	if (!browser) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// storage can be blocked (private mode); the site still works
	}
}

class Library {
	favorites = $state<string[]>([]);
	recent = $state<string[]>([]);

	/** Call once in the browser (done in the root layout). */
	init() {
		this.favorites = load(FAV_KEY);
		this.recent = load(RECENT_KEY);
	}

	isFavorite(slug: string) {
		return this.favorites.includes(slug);
	}

	toggleFavorite(slug: string) {
		this.favorites = this.isFavorite(slug)
			? this.favorites.filter((s) => s !== slug)
			: [slug, ...this.favorites];
		save(FAV_KEY, this.favorites);
	}

	addRecent(slug: string) {
		this.recent = [slug, ...this.recent.filter((s) => s !== slug)].slice(0, MAX_RECENT);
		save(RECENT_KEY, this.recent);
	}
}

export const library = new Library();
