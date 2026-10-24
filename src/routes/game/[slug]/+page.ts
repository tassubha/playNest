import { error } from '@sveltejs/kit';
import { getGame } from '#lib/data/games.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const game = getGame(params.slug);
	if (!game) error(404, 'Game not found');
	return { game };
};
