import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { requireUserOwnsPyme } from '$lib/check_pyme_access';

// index
export const GET: RequestHandler = async (event) => {
	try {
		// User is already authenticated via hooks.server.ts
		const user = event.locals.user;
		const { params } = event;
    const pymeId = parseInt(params.pymeId);

    await requireUserOwnsPyme(user.id_usuario, pymeId);

		const productos = await prisma.producto.findMany({
      where: {
        id_pyme: pymeId,
      },
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
			total: productos.length,
			user: user?.nombre // Optional: include user info in response
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

// create
export const POST: RequestHandler = async (event) => {
  try {
    const { request, params } = event;
		const user = event.locals.user;
    const pymeId = parseInt(params.pymeId);
    const body = await request.json();

    await requireUserOwnsPyme(user.id_usuario, pymeId);

    // Sanitizar body y evitar campos inesperados
    const {
      nombre,
      descripcion,
      precio,
      id_categoria_producto,
      stock,
      estado
    } = body;

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio,
        fecha_publicacion: new Date(),
        fecha_actualizacion: new Date(),
        id_categoria_producto,
        id_pyme: pymeId,
        stock,
        estado
      }
    });

    return json({ success: true, data: nuevoProducto });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return json({ success: false, error: 'Error al crear producto' }, { status: 500 });
  }
};
