import { requireAuth } from '$lib/middleware';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Only protect API routes
	if (event.url.pathname.startsWith('/api/')) {
		// Routes that don't require authentication
		const publicRoutes = ['/api/public'];
		const isPublicRoute = publicRoutes.some(route =>
			event.url.pathname.startsWith(route)
		);

		if (!isPublicRoute) {
			const authResult = await requireAuth(event);

			if ('status' in authResult) {
				return authResult;
			}

			// Add user to locals for easy access in endpoints
			event.locals.user = authResult.user;
		}
	}

	return resolve(event);
};
