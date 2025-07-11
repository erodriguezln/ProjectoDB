import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

// index
export const GET: RequestHandler = async (event) => {
	try {
		// User is already authenticated via hooks.server.ts
		const user = event.locals.user;

		const pymes = await prisma.pyme.findMany({
      where: {
        id_usuario: user.id_usuario,
      },
		});

		return json({
			success: true,
			data: pymes,
			total: pymes.length,
			user: user?.nombre // Optional: include user info in response
		});
	} catch (error) {
		console.error('Error al obtener pymes:', error);
		return json(
			{
				success: false,
				error: 'Error interno del servidor'
			},
			{ status: 500 }
		);
	}
};

// create
export const POST: RequestHandler = async (event) => {
  try {
    const { request } = event;
		const user = event.locals.user;
    const body = await request.json();

    // Sanitizar body y evitar campos inesperados
    const {
      nombre,
      rut,
      descripcion,
      id_direccion
    } = body;

    const nuevoPyme = await prisma.pyme.create({
      data: {
        nombre,
        rut,
        descripcion,
        id_direccion,
        id_usuario: user.id_usuario
      }
    });

    return json({ success: true, data: nuevoPyme });
  } catch (error) {
    console.error('Error al crear pyme:', error);
    return json({ success: false, error: 'Error al crear pyme' }, { status: 500 });
  }
};
