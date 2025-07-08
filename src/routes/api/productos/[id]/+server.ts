import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const idParam = params.id;

		if (!idParam) {
			return json(
				{
					success: false,
					error: 'ID de producto requerido'
				},
				{ status: 400 }
			);
		}

		const id = parseInt(idParam);

		if (isNaN(id)) {
			return json(
				{
					success: false,
					error: 'ID de producto inválido'
				},
				{ status: 400 }
			);
		}

		const producto = await prisma.producto.findUnique({
			where: {
				id_producto: id
			},
			include: {
				CategoriaDeProducto: true,
				Pyme: {
					include: {
						Usuario: true,
						Direccion: {
							include: {
								Comuna: {
									include: {
										Ciudad: {
											include: {
												Region: true
											}
										}
									}
								}
							}
						}
					}
				},
				Valoracion: {
					include: {
						Usuario: true
					}
				}
			}
		});

		if (!producto) {
			return json(
				{
					success: false,
					error: 'Producto no encontrado'
				},
				{ status: 404 }
			);
		}

		return json({
			success: true,
			data: producto
		});
	} catch (error) {
		console.error('Error al obtener producto:', error);
		return json(
			{
				success: false,
				error: 'Error interno del servidor'
			},
			{ status: 500 }
		);
	}
};
