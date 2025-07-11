import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { requireUserOwnsPyme } from '$lib/check_pyme_access';

export const PUT: RequestHandler = async (event) => {
  try {
    const { request, params } = event;
		const user = event.locals.user;
    const pymeId = parseInt(params.pymeId);
    const id_producto = parseInt(params.productoId);
    const body = await request.json();

    await requireUserOwnsPyme(user.id_usuario, pymeId);

    const updatedProducto = await prisma.producto.update({
      where: {
        id_producto,
      },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        precio: body.precio,
        stock: body.stock,
        estado: body.estado,
        fecha_actualizacion: new Date(),
        id_categoria_producto: body.id_categoria_producto,
        id_pyme: pymeId
      }
    });

    return json({ success: true, data: updatedProducto });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return json({ success: false, error: 'Error al actualizar producto' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async (event) => {
  try {
    const { params } = event;
    const id_producto = parseInt(params.productoId);
    const pymeId = parseInt(params.pymeId);
		const user = event.locals.user;

    await requireUserOwnsPyme(user.id_usuario, pymeId);

    await prisma.producto.delete({
      where: {
        id_producto
      }
    });

    return json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return json({ success: false, error: 'Error al eliminar producto' }, { status: 500 });
  }
};
