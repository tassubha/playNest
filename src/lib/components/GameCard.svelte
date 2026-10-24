<script lang="ts">
	import Play from '@lucide/svelte/icons/play';
	import { formatPlays, getCategory, type Game } from '#lib/data/games.ts';

	let { game, class: className = '' }: { game: Game; class?: string } = $props();

	const category = $derived(getCategory(game.category));
</script>

<a href="/game/{game.slug}" class="group block {className}">
	<div
		class="relative aspect-square overflow-hidden rounded-3xl ring-2 ring-white/5 transition duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.03] group-hover:ring-white/50 group-hover:shadow-[0_14px_40px_-8px_var(--glow)] group-focus-visible:ring-white/70"
		style="background: linear-gradient(135deg, {game.from}, {game.to}); --glow: {game.from};"
	>
		<!-- soft decorative shapes -->
		<span class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15"></span>
		<span class="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-black/15"></span>

		<span
			class="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110 sm:text-7xl"
			aria-hidden="true">{game.emoji}</span
		>

		{#if !game.embedUrl}
			<span
				class="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold backdrop-blur"
				>Coming soon</span
			>
		{/if}

		<span
			class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
		>
			<span
				class="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-nest-bg shadow-lg"
			>
				<Play size={16} class="fill-current" />
				Play
			</span>
		</span>
	</div>

	<div class="mt-3 px-1">
		<h3 class="truncate text-base font-semibold">{game.title}</h3>
		<div class="mt-1.5 flex items-center justify-between gap-2">
			<span
				class="truncate rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
				style="background-color: {category.from}59;"
			>
				{category.name}
			</span>
			<span class="flex shrink-0 items-center gap-1 text-xs text-white/60">
				<Play size={11} class="fill-current" />
				{formatPlays(game.plays)}
			</span>
		</div>
	</div>
</a>
