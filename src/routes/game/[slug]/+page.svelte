<script lang="ts">
	import { tick } from 'svelte';
	import Play from '@lucide/svelte/icons/play';
	import Heart from '@lucide/svelte/icons/heart';
	import Maximize from '@lucide/svelte/icons/maximize';
	import Keyboard from '@lucide/svelte/icons/keyboard';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import AdSlot from '#lib/components/AdSlot.svelte';
	import { library } from '#lib/stores/library.svelte.ts';
	import { formatPlays, getCategory, related } from '#lib/data/games.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const game = $derived(data.game);
	const category = $derived(getCategory(game.category));
	const similar = $derived(related(game, 6));
	const isFavorite = $derived(library.isFavorite(game.slug));

	let playing = $state(false);
	let playerEl = $state<HTMLDivElement>();
	let frameEl = $state<HTMLIFrameElement>();

	// going to another game from the "more games" list goes back to the Play screen
	$effect(() => {
		void game.slug;
		playing = false;
	});

	async function start() {
		if (!game.embedUrl) return;
		playing = true;
		library.addRecent(game.slug);
		await tick();
		frameEl?.focus();
	}

	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else playerEl?.requestFullscreen?.();
	}
</script>

<svelte:head>
	<title>{game.title} - Play Free Online | PlayNest</title>
	<meta name="description" content={game.description} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	<!-- breadcrumb -->
	<nav aria-label="Breadcrumb" class="mb-5 flex items-center gap-1 text-sm text-white/60">
		<a href="/" class="hover:text-white">Home</a>
		<ChevronRight size={14} />
		<a href="/games?category={category.slug}" class="hover:text-white">{category.name}</a>
		<ChevronRight size={14} />
		<span class="text-white">{game.title}</span>
	</nav>

	<div class="grid gap-8 lg:grid-cols-[1fr_20rem]">
		<div class="min-w-0">
			<!-- player -->
			<div
				bind:this={playerEl}
				class="relative aspect-video w-full overflow-hidden rounded-3xl bg-black ring-2 ring-white/10"
				style="box-shadow: 0 30px 80px -30px {game.from}aa;"
			>
				{#if playing && game.embedUrl}
					<iframe
						bind:this={frameEl}
						src={game.embedUrl}
						title={game.title}
						class="absolute inset-0 h-full w-full border-0"
						allow="fullscreen; autoplay; gamepad"
						allowfullscreen
						sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
					></iframe>
				{:else}
					<div
						class="absolute inset-0 flex flex-col items-center justify-center gap-5 p-4 text-center"
						style="background: linear-gradient(135deg, {game.from}, {game.to});"
					>
						<span class="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/15"></span>
						<span class="absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-black/15"></span>
						<span class="anim-float relative text-7xl drop-shadow-xl sm:text-9xl" aria-hidden="true"
							>{game.emoji}</span
						>
						{#if game.embedUrl}
							<button
								type="button"
								onclick={start}
								class="relative flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-extrabold text-nest-bg shadow-2xl transition hover:scale-105 active:scale-95"
							>
								<Play size={22} class="fill-current" />
								Play now
							</button>
						{:else}
							<div class="relative max-w-sm rounded-2xl bg-black/40 px-6 py-4 backdrop-blur">
								<p class="font-bold">This game is coming soon</p>
								<p class="mt-1 text-sm text-white/80">Try one of the games you can play today.</p>
								<a
									href="/games"
									class="mt-3 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-nest-bg"
								>
									Browse games
								</a>
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<!-- title + actions -->
			<div class="mt-5 flex flex-wrap items-start justify-between gap-4">
				<div>
					<h1 class="text-3xl font-extrabold sm:text-4xl">{game.title}</h1>
					<div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
						<a
							href="/games?category={category.slug}"
							class="rounded-full px-3.5 py-1 font-semibold text-white transition hover:brightness-125"
							style="background-color: {category.from}66;"
						>
							{category.emoji}
							{category.name}
						</a>
						<span class="flex items-center gap-1.5 text-white/65">
							<Play size={13} class="fill-current" />
							{formatPlays(game.plays)} plays
						</span>
					</div>
				</div>

				<div class="flex gap-2.5">
					<button
						type="button"
						onclick={() => library.toggleFavorite(game.slug)}
						aria-pressed={isFavorite}
						class="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition {isFavorite
							? 'border-nest-pink bg-nest-pink/20 text-white'
							: 'border-white/15 bg-white/5 text-white/85 hover:bg-white/15'}"
					>
						<Heart size={18} class={isFavorite ? 'fill-nest-pink text-nest-pink' : ''} />
						{isFavorite ? 'Favorited' : 'Favorite'}
					</button>
					<button
						type="button"
						onclick={toggleFullscreen}
						disabled={!playing}
						class="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
					>
						<Maximize size={18} />
						Fullscreen
					</button>
				</div>
			</div>

			<AdSlot class="mt-8!" />

			<!-- about + controls -->
			<div class="mt-8 grid gap-4 md:grid-cols-2">
				<section class="rounded-3xl border border-white/10 bg-nest-panel p-6">
					<h2 class="text-lg font-bold">About this game</h2>
					<p class="mt-2 leading-relaxed text-white/75">{game.description}</p>
				</section>
				<section class="rounded-3xl border border-white/10 bg-nest-panel p-6">
					<h2 class="flex items-center gap-2 text-lg font-bold">
						<Keyboard size={20} class="text-nest-cyan" />
						How to play
					</h2>
					<ul class="mt-2 list-disc space-y-1.5 pl-5 text-white/75 marker:text-nest-pink">
						{#each game.controls as control (control)}
							<li>{control}</li>
						{/each}
					</ul>
				</section>
			</div>
		</div>

		<!-- more games -->
		<aside aria-label="More games">
			<h2 class="text-lg font-bold">More games you may like</h2>
			<ul class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
				{#each similar as item (item.slug)}
					{@const itemCategory = getCategory(item.category)}
					<li>
						<a
							href="/game/{item.slug}"
							class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-nest-panel p-3 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-nest-panel2"
						>
							<span
								class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl transition group-hover:scale-105"
								style="background: linear-gradient(135deg, {item.from}, {item.to});"
								aria-hidden="true">{item.emoji}</span
							>
							<span class="min-w-0">
								<span class="block truncate font-semibold">{item.title}</span>
								<span class="mt-0.5 block text-sm text-white/60">
									{itemCategory.name} - {formatPlays(item.plays)} plays
								</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	</div>
</div>
