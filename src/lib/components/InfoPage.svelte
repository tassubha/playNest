<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
	<title>{title} - PlayNest</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14">
	<h1 class="text-4xl font-extrabold">{title}</h1>
	<div class="mt-6 space-y-4 leading-relaxed text-white/75">
		{@render children()}
	</div>
</div>
