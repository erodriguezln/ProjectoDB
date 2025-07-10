import { json } from '@sveltejs/kit';
import { validateAuthToken, extractTokenFromHeader, type AuthUser } from './auth';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Middleware que requiere autenticación para acceder al endpoint
 */
export async function requireAuth(event: RequestEvent): Promise<{ user: AuthUser } | Response> {
	const authHeader = event.request.headers.get('Authorization');
	const token = extractTokenFromHeader(authHeader);

	if (!token) {
		return json({ success: false, error: 'Token requerido' }, { status: 401 });
	}

	const user = await validateAuthToken(token);

	if (!user) {
		return json({ success: false, error: 'Token inválido o expirado' }, { status: 401 });
	}

	return { user };
}
