import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	try {
		// User is already authenticated via hooks.server.ts
		const user = event.locals.user;

		const { params } = event;
		const idParam = params.id;

		if (!idParam) {
			return json(
				{
					success: false,
					error: 'ID de pyme requerido'
				},
				{ status: 400 }
			);
		}

		const id = parseInt(idParam);

		if (isNaN(id)) {
			return json(
				{
					success: false,
					error: 'ID de pyme inválido'
				},
				{ status: 400 }
			);
		}

		const pyme = await prisma.pyme.findUnique({
			where: {
				id_pyme: id
			},
			include: {
				CategoriaDepyme: true,
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

		if (!pyme) {
			return json(
				{
					success: false,
					error: 'Pyme no encontrada'
				},
				{ status: 404 }
			);
		}

		return json({
			success: true,
			data: pyme
		});
	} catch (error) {
		console.error('Error al obtener pyme:', error);
		return json(
			{
				success: false,
				error: 'Error interno del servidor'
			},
			{ status: 500 }
		);
	}
};
