<script lang="ts">
	import { categories } from '#lib/data/games.ts';
</script>

<nav aria-label="Game categories">
	<div class="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 py-2 sm:mx-0 sm:flex-wrap sm:px-0">
		{#each categories as cat (cat.slug)}
			<a
				href="/games?category={cat.slug}"
				class="flex shrink-0 items-center gap-2 rounded-full py-2.5 pl-3 pr-5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:brightness-110"
				style="background: linear-gradient(135deg, {cat.from}, {cat.to});"
			>
				<span class="text-lg" aria-hidden="true">{cat.emoji}</span>
				{cat.name}
			</a>
		{/each}
	</div>
</nav>
