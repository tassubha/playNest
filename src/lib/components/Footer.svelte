<script lang="ts">
	import Gamepad2 from '@lucide/svelte/icons/gamepad-2';
	import { categories } from '#lib/data/games.ts';

	const year = new Date().getFullYear();
</script>

<footer class="mt-20 border-t border-white/10 bg-nest-panel/60">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
		<div class="sm:col-span-2 lg:col-span-1">
			<a href="/" class="flex items-center gap-2.5" aria-label="PlayNest home">
				<span
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-nest-purple to-nest-pink"
				>
					<Gamepad2 size={22} />
				</span>
				<span class="font-display text-2xl font-extrabold">
					Play<span class="gradient-text">Nest</span>
				</span>
			</a>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
				Free browser games you can play right now. No downloads, no installs, no sign-up.
			</p>
		</div>

		<div>
			<h3 class="font-semibold">Explore</h3>
			<ul class="mt-4 space-y-2.5 text-sm text-white/65">
				<li><a class="hover:text-white" href="/">Home</a></li>
				<li><a class="hover:text-white" href="/games">All Games</a></li>
				<li><a class="hover:text-white" href="/games?sort=new">New Games</a></li>
				<li><a class="hover:text-white" href="/games?sort=popular">Popular Games</a></li>
			</ul>
		</div>

		<div>
			<h3 class="font-semibold">Categories</h3>
			<ul class="mt-4 space-y-2.5 text-sm text-white/65">
				{#each categories.slice(0, 5) as cat (cat.slug)}
					<li>
						<a class="hover:text-white" href="/games?category={cat.slug}">{cat.name}</a>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="font-semibold">PlayNest</h3>
			<ul class="mt-4 space-y-2.5 text-sm text-white/65">
				<li><a class="hover:text-white" href="/about">About</a></li>
				<li><a class="hover:text-white" href="/contact">Contact</a></li>
				<li><a class="hover:text-white" href="/privacy">Privacy Policy</a></li>
				<li><a class="hover:text-white" href="/terms">Terms of Use</a></li>
			</ul>
		</div>
	</div>

	<div class="border-t border-white/10 py-5 text-center text-xs text-white/50">
		&copy; {year} PlayNest. All rights reserved.
	</div>
</footer>
