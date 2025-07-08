import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verificarDatos() {
	console.log('🔍 Verificando datos en la base de datos...\n');

	// Verificar regiones y ciudades
	const regiones = await prisma.region.findMany({
		include: {
			Ciudad: {
				include: {
					Comuna: true
				}
			}
		}
	});

	console.log('📍 Regiones y ubicaciones:');
	regiones.forEach(region => {
		console.log(`  - ${region.nombre}`);
		region.Ciudad.forEach(ciudad => {
			console.log(`    └── ${ciudad.nombre}`);
			ciudad.Comuna.forEach(comuna => {
				console.log(`        └── ${comuna.nombre}`);
			});
		});
	});

	// Verificar usuarios por rol
	const usuarios = await prisma.usuario.findMany({
		include: {
			Rol: true,
			Direccion: {
				include: {
					Comuna: true
				}
			}
		}
	});

	console.log('\n👤 Usuarios por rol:');
	const usuariosPorRol = usuarios.reduce((acc, usuario) => {
		const rol = usuario.Rol.nombre;
		if (!acc[rol]) acc[rol] = [];
		acc[rol].push(usuario);
		return acc;
	}, {} as Record<string, typeof usuarios>);

	Object.entries(usuariosPorRol).forEach(([rol, usuarios]) => {
		console.log(`  📋 ${rol} (${usuarios.length}):`);
		usuarios.forEach(usuario => {
			console.log(`    - ${usuario.nombre} (${usuario.email})`);
		});
	});

	// Verificar PYMEs y productos
	const pymes = await prisma.pyme.findMany({
		include: {
			Usuario: true,
			Producto: {
				include: {
					CategoriaDeProducto: true
				}
			}
		}
	});

	console.log('\n🏢 PYMEs y sus productos:');
	pymes.forEach(pyme => {
		console.log(`  - ${pyme.nombre} (${pyme.rut})`);
		console.log(`    👤 Propietario: ${pyme.Usuario.nombre}`);
		console.log(`    📦 Productos (${pyme.Producto.length}):`);
		pyme.Producto.forEach(producto => {
			console.log(`      - ${producto.nombre} - $${producto.precio} (${producto.CategoriaDeProducto.nombre})`);
		});
	});

	// Verificar ventas
	const ventas = await prisma.venta.findMany({
		include: {
			CarroDeCompras: {
				include: {
					Usuario: true,
					DetalleCarroCompras: {
						include: {
							Producto: true
						}
					}
				}
			},
			MetodoPago: true
		}
	});

	console.log('\n💰 Resumen de ventas:');
	console.log(`  Total de ventas: ${ventas.length}`);
	const totalVentas = ventas.reduce((sum, venta) => sum + Number(venta.monto_total), 0);
	console.log(`  Monto total vendido: $${totalVentas.toLocaleString()}`);

	// Verificar carritos pendientes
	const carritosPendientes = await prisma.carroDeCompras.findMany({
		where: { estado: 'pendiente' },
		include: {
			Usuario: true,
			DetalleCarroCompras: {
				include: {
					Producto: true
				}
			}
		}
	});

	console.log(`\n🛒 Carritos pendientes: ${carritosPendientes.length}`);
	carritosPendientes.forEach(carro => {
		console.log(`  - Usuario: ${carro.Usuario.nombre}, Total: $${carro.total}`);
	});

	await prisma.$disconnect();
	console.log('\n✅ Verificación completada!');
}

verificarDatos().catch(console.error);
