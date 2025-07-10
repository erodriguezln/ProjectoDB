import { prisma } from './prisma';
import { createHash } from 'crypto';

export interface AuthUser {
	id_usuario: number;
	nombre: string;
	email: string;
	rol: {
		id_rol: number;
		nombre: string;
	};
}

/**
 * Hashea un token
 */
export function hashToken(token: string): string {
	return createHash('sha256').update(token).digest('hex');
}

/**
 * Valida un token y devuelve el usuario (sin verificación de expiración)
 */
export async function validateAuthToken(token: string): Promise<AuthUser | null> {
	if (!token) return null;

	const hashedToken = hashToken(token);

	try {
		const usuario = await prisma.usuario.findFirst({
			where: {
				auth_token: hashedToken,
				esta_activo: true
			},
			include: { Rol: true }
		});

		if (!usuario) return null;

		return {
			id_usuario: usuario.id_usuario,
			nombre: usuario.nombre,
			email: usuario.email,
			rol: {
				id_rol: usuario.Rol.id_rol,
				nombre: usuario.Rol.nombre
			}
		};
	} catch (error) {
		console.error('Error validando token:', error);
		return null;
	}
}

/**
 * Extrae el token del header Authorization
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
	if (!authHeader) return null;

	const parts = authHeader.split(' ');
	if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

	return parts[1];
}
