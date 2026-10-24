import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		// SvelteKit 3 reads its config here (svelte.config.js is no longer used).
		// adapter-auto picks the right adapter for Vercel, Netlify, Cloudflare...
		// Swap it for a specific adapter when you choose your host.
		sveltekit({
			adapter: adapter()
		})
	]
});
