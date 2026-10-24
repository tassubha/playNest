<script lang="ts">
	// Placeholder for a banner ad. Replace the inner content with your ad code later.
	let { class: className = '' }: { class?: string } = $props();
</script>

<div
	class="mt-12 flex h-24 items-center justify-center rounded-2xl border-2 border-dashed border-nest-line bg-nest-panel/40 text-sm text-white/45 {className}"
	role="complementary"
	aria-label="Advertisement"
>
	Advertisement (728 x 90)
</div>
