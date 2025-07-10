import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		// This endpoint is public (no authentication required)
		const categorias = await prisma.categoriaDeProducto.findMany({
			orderBy: {
				nombre: 'asc'
			}
		});

		return json({
			success: true,
			data: categorias
		});
	} catch (error) {
		console.error('Error al obtener categorías:', error);
		return json(
			{
				success: false,
				error: 'Error interno del servidor'
			},
			{ status: 500 }
		);
	}
};
