import { error } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function requireUserOwnsPyme(userId: string, pymeId: string) {
	const pyme = await prisma.pyme.findUnique({
    where: { id_pyme: pymeId }
  });
	if (!pyme) throw error(404, 'PYME no encontrada');
	if (pyme.id_usuario !== userId) throw error(403, 'Acceso denegado');
	return pyme;
}
