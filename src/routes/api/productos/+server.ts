import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		const productos = await prisma.producto.findMany({
			include: {
				CategoriaDeProducto: true,
				Pyme: {
					include: {
						Usuario: true
					}
				}
			},
			orderBy: {
				fecha_publicacion: 'desc'
			}
		});

		return json({
			success: true,
			data: productos,
			total: productos.length
		});
	} catch (error) {
		console.error('Error al obtener productos:', error);
		return json(
			{
				success: false,
				error: 'Error interno del servidor'
			},
			{ status: 500 }
		);
	}
};
