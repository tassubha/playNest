<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} - PlayNest</title>
</svelte:head>

<div class="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
	<span class="anim-float text-8xl" aria-hidden="true">🛸</span>
	<h1 class="mt-6 text-4xl font-extrabold">
		{page.status === 404 ? "We can't find that page" : 'Something went wrong'}
	</h1>
	<p class="mt-3 text-white/70">
		{page.status === 404
			? 'The page or game may have moved. Head back and pick another game.'
			: (page.error?.message ?? 'Please try again in a moment.')}
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a href="/" class="btn-gradient rounded-full px-7 py-3.5 font-bold text-white">Go to home</a>
		<a
			href="/games"
			class="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-bold transition hover:bg-white/15"
		>
			Browse games
		</a>
	</div>
</div>
