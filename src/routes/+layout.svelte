<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { library } from '#lib/stores/library.svelte.ts';

	let { children } = $props();

	// load favorites and recently played from this browser
	onMount(() => library.init());
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
