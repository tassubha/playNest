<script lang="ts">
	import { page } from '$app/state';
	import Gamepad2 from '@lucide/svelte/icons/gamepad-2';
	import Search from '@lucide/svelte/icons/search';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/games', label: 'All Games' },
		{ href: '/games?sort=new', label: 'New' },
		{ href: '/games?sort=popular', label: 'Popular' }
	];

	let menuOpen = $state(false);

	function isActive(href: string) {
		const target = new URL(href, page.url.href);
		if (target.pathname !== page.url.pathname) return false;
		return (target.searchParams.get('sort') ?? '') === (page.url.searchParams.get('sort') ?? '');
	}
</script>

{#snippet searchBox(id: string)}
	<form action="/games" method="GET" role="search" class="relative w-full">
		<label for={id} class="sr-only">Search games</label>
		<Search
			size={18}
			class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
		/>
		<input
			{id}
			name="q"
			type="search"
			placeholder="Search games"
			autocomplete="off"
			class="w-full rounded-full border border-white/10 bg-nest-panel py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/45 transition focus:border-nest-pink focus:bg-nest-panel2 focus:outline-none"
		/>
	</form>
{/snippet}

<header class="sticky top-0 z-40 border-b border-white/10 bg-nest-bg/85 backdrop-blur-xl">
	<div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
		<a href="/" class="flex items-center gap-2.5" aria-label="PlayNest home" onclick={() => (menuOpen = false)}>
			<span
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-nest-purple to-nest-pink shadow-lg shadow-nest-pink/30"
			>
				<Gamepad2 size={22} class="text-white" />
			</span>
			<span class="font-display text-2xl font-extrabold tracking-tight">
				Play<span class="gradient-text">Nest</span>
			</span>
		</a>

		<nav class="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class="rounded-full px-4 py-2 text-sm font-semibold transition {isActive(link.href)
						? 'bg-white/15 text-white'
						: 'text-white/70 hover:bg-white/10 hover:text-white'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto hidden w-full max-w-xs lg:block">
			{@render searchBox('search-desktop')}
		</div>

		<button
			type="button"
			class="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20 lg:hidden"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={22} />{:else}<Menu size={22} />{/if}
		</button>
	</div>

	{#if menuOpen}
		<div id="mobile-menu" class="border-t border-white/10 bg-nest-bg px-4 pb-5 pt-4 lg:hidden">
			{@render searchBox('search-mobile')}
			<nav class="mt-4 grid grid-cols-2 gap-2" aria-label="Main mobile">
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={() => (menuOpen = false)}
						aria-current={isActive(link.href) ? 'page' : undefined}
						class="rounded-2xl px-4 py-3 text-center text-sm font-semibold transition {isActive(
							link.href
						)
							? 'bg-linear-to-br from-nest-purple to-nest-pink text-white'
							: 'bg-nest-panel text-white/80 hover:bg-nest-panel2'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>
