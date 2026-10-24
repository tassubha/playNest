<script lang="ts">
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import GameCard from './GameCard.svelte';
	import type { Game } from '#lib/data/games.ts';

	let {
		title,
		emoji = '',
		href,
		games
	}: { title: string; emoji?: string; href?: string; games: Game[] } = $props();
</script>

<section class="mt-12">
	<div class="mb-2 flex items-center justify-between gap-4">
		<h2 class="text-xl font-bold sm:text-2xl">
			{#if emoji}<span class="mr-1.5" aria-hidden="true">{emoji}</span>{/if}{title}
		</h2>
		{#if href}
			<a
				{href}
				class="flex items-center gap-0.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
			>
				See all
				<ChevronRight size={16} />
			</a>
		{/if}
	</div>

	<!-- horizontal row: scrolls on small screens, fits on large ones -->
	<div class="no-scrollbar -mx-4 -my-2 flex snap-x gap-4 overflow-x-auto px-4 py-4 sm:mx-0 sm:px-2">
		{#each games as game (game.slug)}
			<GameCard {game} class="w-36 shrink-0 snap-start sm:w-44 lg:w-[11.5rem]" />
		{/each}
	</div>
</section>
