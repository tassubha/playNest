<script lang="ts">
	import Play from '@lucide/svelte/icons/play';
	import Zap from '@lucide/svelte/icons/zap';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Gift from '@lucide/svelte/icons/gift';
	import CategoryChips from '#lib/components/CategoryChips.svelte';
	import GameRow from '#lib/components/GameRow.svelte';
	import AdSlot from '#lib/components/AdSlot.svelte';
	import { library } from '#lib/stores/library.svelte.ts';
	import {
		byCategory,
		featuredGame,
		formatPlays,
		getCategory,
		getGame,
		mostPlayed,
		newest,
		trending,
		type Game
	} from '#lib/data/games.ts';

	const featured = featuredGame();
	const featuredCategory = getCategory(featured.category);

	const recentGames = $derived(
		library.recent.map((slug) => getGame(slug)).filter((g): g is Game => g !== undefined)
	);
	const favoriteGames = $derived(
		library.favorites.map((slug) => getGame(slug)).filter((g): g is Game => g !== undefined)
	);

	const perks = [
		{ icon: Zap, title: 'Play instantly', text: 'Click a game and it starts. Nothing to download.' },
		{
			icon: Smartphone,
			title: 'Works on any device',
			text: 'Phone, tablet or computer, right in your browser.'
		},
		{ icon: Gift, title: 'Always free', text: 'No sign-up, no payments, no catches.' }
	];
</script>

<svelte:head>
	<title>PlayNest - Play Free Online Games Instantly</title>
	<meta
		name="description"
		content="Play free online games instantly in your browser. No downloads, no installs, no sign-up. New games added all the time."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden">
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-nest-purple/40 blur-3xl"></div>
		<div class="absolute -right-24 top-10 h-80 w-80 rounded-full bg-nest-pink/30 blur-3xl"></div>
		<div class="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-nest-cyan/25 blur-3xl"></div>
	</div>

	<div
		class="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20"
	>
		<div class="anim-rise">
			<p
				class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
			>
				<span class="text-base" aria-hidden="true">🎮</span>
				Free to play. No download. No sign-up.
			</p>
			<h1 class="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
				Play free games. Instantly.
			</h1>
			<p class="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
				Pick a game, press play, and you're in. New browser games land on PlayNest all the time, so
				there's always something fresh to try.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a
					href="/game/{featured.slug}"
					class="btn-gradient flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white"
				>
					<Play size={18} class="fill-current" />
					Play now
				</a>
				<a
					href="/games"
					class="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold transition hover:bg-white/15"
				>
					Browse all games
				</a>
			</div>
		</div>

		<!-- Featured game: the one big moment on the page -->
		<a
			href="/game/{featured.slug}"
			class="anim-rise-2 group relative block aspect-4/3 overflow-hidden rounded-[2rem] shadow-2xl ring-2 ring-white/20 transition duration-300 hover:scale-[1.02] hover:ring-white/50"
			style="background: linear-gradient(135deg, {featured.from}, {featured.to}); box-shadow: 0 30px 80px -20px {featured.from}99;"
			aria-label="Play {featured.title}"
		>
			<span class="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15"></span>
			<span class="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-black/15"></span>
			<span
				class="anim-float absolute inset-0 flex items-center justify-center text-[8rem] drop-shadow-2xl sm:text-[10rem]"
				aria-hidden="true">{featured.emoji}</span
			>
			<div
				class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/60 to-transparent p-5 sm:p-7"
			>
				<div>
					<span class="rounded-full bg-white/25 px-3 py-1 text-xs font-semibold backdrop-blur">
						Featured game
					</span>
					<h2 class="mt-2 text-2xl font-extrabold sm:text-3xl">{featured.title}</h2>
					<p class="mt-1 text-sm text-white/80">
						{featuredCategory.name} - {formatPlays(featured.plays)} plays
					</p>
				</div>
				<span
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-nest-bg shadow-xl transition group-hover:scale-110"
				>
					<Play size={24} class="ml-0.5 fill-current" />
				</span>
			</div>
		</a>
	</div>
</section>

<div class="mx-auto max-w-7xl px-4">
	<CategoryChips />

	{#if recentGames.length > 0}
		<GameRow title="Recently played" emoji="🕹️" games={recentGames} />
	{/if}

	{#if favoriteGames.length > 0}
		<GameRow title="Your favorites" emoji="💜" games={favoriteGames} />
	{/if}

	<GameRow title="Trending now" emoji="🔥" href="/games?sort=popular" games={trending(8)} />
	<GameRow title="New games" emoji="✨" href="/games?sort=new" games={newest(8)} />

	<AdSlot />

	<GameRow title="Most played" emoji="🏆" href="/games?sort=popular" games={mostPlayed(8)} />
	<GameRow
		title="Puzzle games"
		emoji="🧩"
		href="/games?category=puzzle"
		games={byCategory('puzzle')}
	/>

	<!-- Why PlayNest -->
	<section class="mt-16 grid gap-4 sm:grid-cols-3">
		{#each perks as perk (perk.title)}
			<div class="rounded-3xl border border-white/10 bg-nest-panel p-6">
				<span
					class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-nest-purple to-nest-pink"
				>
					<perk.icon size={24} />
				</span>
				<h3 class="mt-4 text-lg font-bold">{perk.title}</h3>
				<p class="mt-1.5 text-sm leading-relaxed text-white/65">{perk.text}</p>
			</div>
		{/each}
	</section>
</div>
