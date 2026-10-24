<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Search from '@lucide/svelte/icons/search';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import GameCard from '#lib/components/GameCard.svelte';
	import AdSlot from '#lib/components/AdSlot.svelte';
	import { categories, games, type Game } from '#lib/data/games.ts';

	const PAGE_SIZE = 10;

	// Everything the visitor picks lives in the URL, so results can be shared and bookmarked.
	const q = $derived(page.url.searchParams.get('q')?.trim() ?? '');
	const category = $derived(page.url.searchParams.get('category') ?? 'all');
	const sort = $derived(page.url.searchParams.get('sort') ?? 'popular');

	let visible = $state(PAGE_SIZE);

	// start from the first page again whenever the filters change
	$effect(() => {
		void q;
		void category;
		void sort;
		visible = PAGE_SIZE;
	});

	const results = $derived.by(() => {
		const term = q.toLowerCase();
		const list = games.filter(
			(g: Game) =>
				(category === 'all' || g.category === category) &&
				(term === '' || g.title.toLowerCase().includes(term))
		);
		if (sort === 'new') return list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
		if (sort === 'az') return list.sort((a, b) => a.title.localeCompare(b.title));
		return list.sort((a, b) => b.plays - a.plays);
	});

	const shown = $derived(results.slice(0, visible));
	const activeCategory = $derived(categories.find((c) => c.slug === category));
	const heading = $derived(
		q ? `Results for "${q}"` : activeCategory ? `${activeCategory.name} games` : 'All games'
	);

	function update(changes: Record<string, string | null>) {
		const url = new URL(page.url.href);
		for (const [key, value] of Object.entries(changes)) {
			if (value === null || value === '') url.searchParams.delete(key);
			else url.searchParams.set(key, value);
		}
		goto(url, { replace: true, reset: false });
	}
</script>

<svelte:head>
	<title>{heading} - PlayNest</title>
	<meta name="description" content="Browse and play free online games on PlayNest." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10">
	<div class="flex flex-col gap-1">
		<h1 class="text-3xl font-extrabold sm:text-4xl">
			{#if activeCategory}<span aria-hidden="true">{activeCategory.emoji}</span>{/if}
			{heading}
		</h1>
		<p class="text-white/60">
			{results.length}
			{results.length === 1 ? 'game' : 'games'} to play
		</p>
	</div>

	<!-- search + sort -->
	<div class="mt-6 flex flex-col gap-3 sm:flex-row">
		<div class="relative flex-1">
			<label for="page-search" class="sr-only">Search games</label>
			<Search
				size={18}
				class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
			/>
			<input
				id="page-search"
				type="search"
				value={q}
				placeholder="Search games"
				autocomplete="off"
				oninput={(e) => update({ q: e.currentTarget.value })}
				class="w-full rounded-full border border-white/10 bg-nest-panel py-3 pl-11 pr-4 text-white placeholder-white/45 transition focus:border-nest-pink focus:bg-nest-panel2 focus:outline-none"
			/>
		</div>

		<div class="relative sm:w-56">
			<label for="sort" class="sr-only">Sort games</label>
			<select
				id="sort"
				value={sort}
				onchange={(e) => update({ sort: e.currentTarget.value === 'popular' ? null : e.currentTarget.value })}
				class="w-full appearance-none rounded-full border border-white/10 bg-nest-panel py-3 pl-5 pr-11 font-medium text-white transition focus:border-nest-pink focus:outline-none"
			>
				<option value="popular">Most popular</option>
				<option value="new">Newest</option>
				<option value="az">A to Z</option>
			</select>
			<ChevronDown
				size={18}
				class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
			/>
		</div>
	</div>

	<!-- category filter -->
	<div class="no-scrollbar -mx-4 mt-5 flex gap-2.5 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
		<button
			type="button"
			onclick={() => update({ category: null })}
			aria-pressed={category === 'all'}
			class="shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition {category === 'all'
				? 'bg-white text-nest-bg'
				: 'bg-nest-panel text-white/75 hover:bg-nest-panel2 hover:text-white'}"
		>
			All
		</button>
		{#each categories as cat (cat.slug)}
			<button
				type="button"
				onclick={() => update({ category: cat.slug })}
				aria-pressed={category === cat.slug}
				class="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition {category ===
				cat.slug
					? 'text-white shadow-lg'
					: 'bg-nest-panel text-white/75 hover:bg-nest-panel2 hover:text-white'}"
				style={category === cat.slug
					? `background: linear-gradient(135deg, ${cat.from}, ${cat.to});`
					: ''}
			>
				<span aria-hidden="true">{cat.emoji}</span>
				{cat.name}
			</button>
		{/each}
	</div>

	{#if shown.length > 0}
		<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each shown as game (game.slug)}
				<GameCard {game} />
			{/each}
		</div>

		{#if visible < results.length}
			<div class="mt-12 flex justify-center">
				<button
					type="button"
					onclick={() => (visible += PAGE_SIZE)}
					class="btn-gradient rounded-full px-10 py-3.5 font-bold text-white"
				>
					Load more games
				</button>
			</div>
		{/if}
	{:else}
		<div class="mt-16 flex flex-col items-center text-center">
			<span class="text-7xl" aria-hidden="true">🔍</span>
			<h2 class="mt-5 text-2xl font-bold">No games found</h2>
			<p class="mt-2 max-w-sm text-white/65">
				Try a different word or pick another category to see more games.
			</p>
			<button
				type="button"
				onclick={() => goto('/games', { replace: true })}
				class="btn-gradient mt-6 rounded-full px-8 py-3 font-bold text-white"
			>
				Show all games
			</button>
		</div>
	{/if}

	<AdSlot />
</div>
