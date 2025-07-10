import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	try {
		// User is already authenticated via hooks.server.ts
		const user = event.locals.user;

		return json({
			success: true,
			data: { usuario: user }
		});

	} catch (error) {
		console.error('Error obteniendo perfil:', error);
		return json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
	}
};
