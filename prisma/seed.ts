import { PrismaClient } from '@prisma/client';
import { hashToken } from '../src/lib/auth';

const prisma = new PrismaClient();

// Tokens estáticos predefinidos (nunca cambiarán)
const STATIC_TOKENS = {
	admin: 'admin-token-123456789',
	juan: 'juan-token-123456789',
	maria: 'maria-token-123456789',
	pedro: 'pedro-token-123456789',
	ana: 'ana-token-123456789',
	carlos: 'carlos-token-123456789',
	sofia: 'sofia-token-123456789'
};

async function main() {
	console.log('🌱 Iniciando seed de la base de datos...');

	// 1. REGIONES
	console.log('📍 Creando regiones...');
	const region = await prisma.region.create({
		data: {
			id_region: 1,
			nombre: 'Región Metropolitana de Santiago'
		}
	});

	// 2. CIUDADES
	console.log('🏙️ Creando ciudades...');
	const ciudad = await prisma.ciudad.create({
		data: {
			id_ciudad: 1,
			nombre: 'Santiago',
			id_region: 1
		}
	});

	// 3. COMUNAS
	console.log('🏘️ Creando comunas...');
	const comunas = await prisma.comuna.createMany({
		data: [
			{ id_comuna: 1, nombre: 'Providencia', id_ciudad: 1 },
			{ id_comuna: 2, nombre: 'Las Condes', id_ciudad: 1 },
			{ id_comuna: 3, nombre: 'Vitacura', id_ciudad: 1 }
		]
	});

	// 4. DIRECCIONES
	console.log('🏠 Creando direcciones...');
	const direcciones = await prisma.direccion.createMany({
		data: [
			{ id_direccion: 1, calle: 'Manuel Montt', numero: '170', id_comuna: 1 },
			{ id_direccion: 2, calle: 'Apoquindo', numero: '3400', id_comuna: 2 },
			{ id_direccion: 3, calle: 'Alonso de Córdova', numero: '2800', id_comuna: 3 },
			{ id_direccion: 4, calle: 'Nueva Providencia', numero: '1550', id_comuna: 1 },
			{ id_direccion: 5, calle: 'Los Leones', numero: '2345', id_comuna: 2 },
			{ id_direccion: 6, calle: 'Nueva Costanera', numero: '3750', id_comuna: 3 },
			{ id_direccion: 7, calle: 'Isidora Goyenechea', numero: '2800', id_comuna: 2 },
			{ id_direccion: 8, calle: 'Tobalaba', numero: '1180', id_comuna: 2 },
			{ id_direccion: 9, calle: 'Luis Pasteur', numero: '5425', id_comuna: 3 },
			{ id_direccion: 10, calle: 'Pedro de Valdivia', numero: '2320', id_comuna: 1 }
		]
	});

	// 5. ROLES
	console.log('👥 Creando roles...');
	const roles = await prisma.rol.createMany({
		data: [
			{
				id_rol: 1,
				nombre: 'Administrador',
				descripcion: 'Control total del sistema. Puede gestionar usuarios, roles y configuraciones generales'
			},
			{
				id_rol: 2,
				nombre: 'Usuario PYME',
				descripcion: 'Dueños de PYMES que pueden gestionar sus productos y ventas'
			},
			{
				id_rol: 3,
				nombre: 'Cliente',
				descripcion: 'Usuario regular que puede realizar compras en la plataforma'
			}
		]
	});

	// 6. USUARIOS
	console.log('👤 Creando usuarios...');

	// Create users individually so we can generate tokens
	const admin = await prisma.usuario.create({
		data: {
			id_usuario: 1,
			nombre: 'Admin Sistema',
			email: 'admin@dbd.cl',
			password: 'admin123',
			fecha_registro: new Date('2025-07-08T18:22:55.854Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.854Z'),
			esta_activo: true,
			id_direccion: 1,
			id_rol: 1
		}
	});

	const juan = await prisma.usuario.create({
		data: {
			id_usuario: 2,
			nombre: 'Juan Pyme',
			email: 'juan.tech@pyme.cl',
			password: 'pyme123',
			fecha_registro: new Date('2025-07-08T18:22:55.861Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.861Z'),
			esta_activo: true,
			id_direccion: 2,
			id_rol: 2
		}
	});

	const maria = await prisma.usuario.create({
		data: {
			id_usuario: 3,
			nombre: 'Maria Comercio',
			email: 'maria.comercio@pyme.cl',
			password: 'pyme456',
			fecha_registro: new Date('2025-07-08T18:22:55.861Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.861Z'),
			esta_activo: true,
			id_direccion: 3,
			id_rol: 2
		}
	});

	const pedro = await prisma.usuario.create({
		data: {
			id_usuario: 4,
			nombre: 'Pedro Ventas',
			email: 'pedro.ventas@pyme.cl',
			password: 'pyme789',
			fecha_registro: new Date('2025-07-08T18:22:55.861Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.861Z'),
			esta_activo: true,
			id_direccion: 4,
			id_rol: 2
		}
	});

	const ana = await prisma.usuario.create({
		data: {
			id_usuario: 5,
			nombre: 'Ana Cliente',
			email: 'ana.cliente@gmail.com',
			password: 'cliente123',
			fecha_registro: new Date('2025-07-08T18:22:55.868Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.868Z'),
			esta_activo: true,
			id_direccion: 5,
			id_rol: 3
		}
	});

	const carlos = await prisma.usuario.create({
		data: {
			id_usuario: 6,
			nombre: 'Carlos Cliente',
			email: 'carlos.cliente@gmail.com',
			password: 'cliente456',
			fecha_registro: new Date('2025-07-08T18:22:55.868Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.868Z'),
			esta_activo: true,
			id_direccion: 6,
			id_rol: 3
		}
	});

	const sofia = await prisma.usuario.create({
		data: {
			id_usuario: 7,
			nombre: 'Sofia Cliente',
			email: 'sofia.cliente@gmail.com',
			password: 'cliente789',
			fecha_registro: new Date('2025-07-08T18:22:55.868Z'),
			ultimo_login: new Date('2025-07-08T18:22:55.868Z'),
			esta_activo: true,
			id_direccion: 7,
			id_rol: 3
		}
	});

	// Generate tokens
	console.log('🔑 Configurando tokens');

	await prisma.usuario.update({
		where: { id_usuario: admin.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.admin)
		}
	});

	await prisma.usuario.update({
		where: { id_usuario: juan.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.juan)
		}
	});

	await prisma.usuario.update({
		where: { id_usuario: maria.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.maria)
		}
	});

	await prisma.usuario.update({
		where: { id_usuario: pedro.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.pedro)
		}
	});

	await prisma.usuario.update({
		where: { id_usuario: ana.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.ana)
		}
	});

	await prisma.usuario.update({
		where: { id_usuario: carlos.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.carlos)
		}
	});

	await prisma.usuario.update({
		where: { id_usuario: sofia.id_usuario },
		data: {
			auth_token: hashToken(STATIC_TOKENS.sofia)
		}
	});

	console.log('\n📋 TOKENS PARA POSTMAN:');
	console.log(`👑 Admin (${admin.email}): ${STATIC_TOKENS.admin}`);
	console.log(`🏢 Juan PYME (${juan.email}): ${STATIC_TOKENS.juan}`);
	console.log(`🏢 Maria PYME (${maria.email}): ${STATIC_TOKENS.maria}`);
	console.log(`🏢 Pedro PYME (${pedro.email}): ${STATIC_TOKENS.pedro}`);
	console.log(`👤 Ana Cliente (${ana.email}): ${STATIC_TOKENS.ana}`);
	console.log(`👤 Carlos Cliente (${carlos.email}): ${STATIC_TOKENS.carlos}`);
	console.log(`👤 Sofia Cliente (${sofia.email}): ${STATIC_TOKENS.sofia}`);
	console.log();

	// 7. PERMISOS
	console.log('🔐 Creando permisos...');
	const permisos = await prisma.permiso.createMany({
		data: [
			{ id_permiso: 1, nombre: 'gestionar_usuarios', descripcion: 'Puede crear, modificar y eliminar usuarios del sistema', id_rol: 1 },
			{ id_permiso: 2, nombre: 'gestionar_roles', descripcion: 'Puede administrar roles y sus permisos', id_rol: 1 },
			{ id_permiso: 3, nombre: 'gestionar_categorias', descripcion: 'Puede crear y modificar categorías de productos', id_rol: 1 },
			{ id_permiso: 4, nombre: 'ver_estadisticas', descripcion: 'Puede ver estadísticas generales del sistema', id_rol: 1 },
			{ id_permiso: 5, nombre: 'gestionar_productos', descripcion: 'Puede crear, modificar y eliminar sus productos', id_rol: 2 },
			{ id_permiso: 6, nombre: 'gestionar_inventario', descripcion: 'Puede actualizar el stock de sus productos', id_rol: 2 },
			{ id_permiso: 7, nombre: 'ver_ventas', descripcion: 'Puede ver el historial de ventas de su PYME', id_rol: 2 },
			{ id_permiso: 8, nombre: 'gestionar_pyme', descripcion: 'Puede actualizar información de su PYME', id_rol: 2 },
			{ id_permiso: 9, nombre: 'realizar_compras', descripcion: 'Puede agregar productos al carrito y realizar compras', id_rol: 3 },
			{ id_permiso: 10, nombre: 'gestionar_perfil', descripcion: 'Puede actualizar su información personal', id_rol: 3 },
			{ id_permiso: 11, nombre: 'gestionar_carro_de_compras', descripcion: 'Puede actualizar su carro de compras', id_rol: 3 },
			{ id_permiso: 12, nombre: 'crear_lista_deseos', descripcion: 'Puede crear y gestionar su lista de deseos', id_rol: 3 },
			{ id_permiso: 13, nombre: 'hacer_valoraciones', descripcion: 'Puede valorar y comentar productos comprados', id_rol: 3 }
		]
	});

	// 8. PYMES
	console.log('🏢 Creando PYMEs...');
	const pymes = await prisma.pyme.createMany({
		data: [
			{
				id_pyme: 1,
				nombre: 'TechStore Chile',
				rut: '76.234.567-8',
				descripcion: 'Tienda especializada en productos tecnológicos y accesorios de última generación',
				id_usuario: 2,
				id_direccion: 8
			},
			{
				id_pyme: 2,
				nombre: 'Home & Deco',
				rut: '76.345.678-9',
				descripcion: 'Artículos decorativos y muebles para el hogar con diseños exclusivos',
				id_usuario: 3,
				id_direccion: 9
			},
			{
				id_pyme: 3,
				nombre: 'ElectroHogar',
				rut: '76.456.789-0',
				descripcion: 'Electrodomésticos y artículos electrónicos para el hogar',
				id_usuario: 4,
				id_direccion: 10
			}
		]
	});

	// 9. CATEGORÍAS DE PRODUCTOS
	console.log('📂 Creando categorías de productos...');
	const categorias = await prisma.categoriaDeProducto.createMany({
		data: [
			{
				id_categoria_producto: 1,
				nombre: 'Tecnología',
				descripcion: 'Productos electrónicos y accesorios tecnológicos para el hogar y oficina'
			},
			{
				id_categoria_producto: 2,
				nombre: 'Hogar',
				descripcion: 'Artículos decorativos y útiles para el hogar'
			},
			{
				id_categoria_producto: 3,
				nombre: 'Electrodomésticos',
				descripcion: 'Aparatos eléctricos y electrónicos para facilitar las tareas domésticas'
			}
		]
	});

	// 10. PRODUCTOS
	console.log('📦 Creando productos...');
	const productos = await prisma.producto.createMany({
		data: [
			{
				id_producto: 1,
				nombre: 'Audífonos Bluetooth',
				descripcion: 'Audífonos inalámbricos con cancelación de ruido, ideal para trabajo y estudio',
				precio: 29990,
				stock: 50,
				estado: 'activo',
				fecha_publicacion: new Date('2025-07-08T18:22:55.917Z'),
				fecha_actualizacion: new Date('2025-07-08T18:22:55.917Z'),
				img_url: 'audifonos.jpg',
				id_pyme: 1,
				id_categoria_producto: 1
			},
			{
				id_producto: 2,
				nombre: 'Lámpara LED de escritorio',
				descripcion: 'Lámpara moderna con luz regulable y puerto USB para carga',
				precio: 15990,
				stock: 30,
				estado: 'activo',
				fecha_publicacion: new Date('2025-07-08T18:22:55.917Z'),
				fecha_actualizacion: new Date('2025-07-08T18:22:55.917Z'),
				img_url: 'lampara.jpg',
				id_pyme: 2,
				id_categoria_producto: 2
			},
			{
				id_producto: 3,
				nombre: 'Cafetera Automática',
				descripcion: 'Cafetera programable con filtro permanente y capacidad de 12 tazas',
				precio: 45990,
				stock: 20,
				estado: 'activo',
				fecha_publicacion: new Date('2025-07-08T18:22:55.917Z'),
				fecha_actualizacion: new Date('2025-07-08T18:22:55.917Z'),
				img_url: 'cafetera.jpg',
				id_pyme: 3,
				id_categoria_producto: 3
			}
		]
	});

	// 11. LISTAS DE DESEOS
	console.log('❤️ Creando listas de deseos...');
	const listasDeseos = await prisma.listaDeDeseos.createMany({
		data: [
			{ id_lista_deseo: 1, fecha_creacion: new Date('2025-07-08T18:22:55.874Z'), id_usuario: 5 },
			{ id_lista_deseo: 2, fecha_creacion: new Date('2025-07-08T18:22:55.874Z'), id_usuario: 6 },
			{ id_lista_deseo: 3, fecha_creacion: new Date('2025-07-08T18:22:55.874Z'), id_usuario: 7 }
		]
	});

	// 12. DETALLES DE LISTAS DE DESEOS
	console.log('📝 Creando detalles de listas de deseos...');
	const detallesListaDeseos = await prisma.detalleListaDeseos.createMany({
		data: [
			{ id_detalle_lista_deseos: 1, fecha_agregado: new Date('2025-07-08T18:22:55.950Z'), id_lista_deseo: 1, id_producto: 1 },
			{ id_detalle_lista_deseos: 2, fecha_agregado: new Date('2025-07-08T18:22:55.950Z'), id_lista_deseo: 1, id_producto: 2 }
		]
	});

	// 13. MÉTODOS DE PAGO
	console.log('💳 Creando métodos de pago...');
	const metodosPago = await prisma.metodoPago.createMany({
		data: [
			{
				id_metodo_pago: 1,
				tipo: 'Tarjeta de Crédito',
				descripcion: 'Método de pago que permite realizar transacciones usando una tarjeta de crédito bancaria'
			},
			{
				id_metodo_pago: 2,
				tipo: 'Tarjeta de Débito',
				descripcion: 'Pago directo usando una tarjeta de débito vinculada a una cuenta bancaria'
			},
			{
				id_metodo_pago: 3,
				tipo: 'Transferencia',
				descripcion: 'Transferencia bancaria directa a la cuenta de la empresa'
			}
		]
	});

	// 14. CARRITOS DE COMPRAS
	console.log('🛒 Creando carritos de compras...');
	const carritosCompras = await prisma.carroDeCompras.createMany({
		data: [
			{ id_carro_compras: 1, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 59980, estado: 'completado', id_usuario: 5 },
			{ id_carro_compras: 2, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 75980, estado: 'pendiente', id_usuario: 5 },
			{ id_carro_compras: 3, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 59980, estado: 'completado', id_usuario: 6 },
			{ id_carro_compras: 4, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 15990, estado: 'completado', id_usuario: 6 },
			{ id_carro_compras: 5, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 31980, estado: 'completado', id_usuario: 6 },
			{ id_carro_compras: 6, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 45990, estado: 'completado', id_usuario: 7 },
			{ id_carro_compras: 7, fecha: new Date('2025-07-08T18:22:55.966Z'), total: 29990, estado: 'completado', id_usuario: 7 }
		]
	});

	// 15. DETALLES DE CARRITOS DE COMPRAS
	console.log('📋 Creando detalles de carritos de compras...');
	const detallesCarroCompras = await prisma.detalleCarroCompras.createMany({
		data: [
			{ id_detalle_carro_compras: 1, cantidad: 2, id_producto: 1, id_carro_compras: 1 },
			{ id_detalle_carro_compras: 2, cantidad: 2, id_producto: 1, id_carro_compras: 3 },
			{ id_detalle_carro_compras: 3, cantidad: 1, id_producto: 2, id_carro_compras: 4 },
			{ id_detalle_carro_compras: 4, cantidad: 2, id_producto: 2, id_carro_compras: 5 },
			{ id_detalle_carro_compras: 5, cantidad: 1, id_producto: 3, id_carro_compras: 6 },
			{ id_detalle_carro_compras: 6, cantidad: 1, id_producto: 1, id_carro_compras: 7 },
			{ id_detalle_carro_compras: 7, cantidad: 1, id_producto: 1, id_carro_compras: 2 },
			{ id_detalle_carro_compras: 9, cantidad: 1, id_producto: 3, id_carro_compras: 2 }
		]
	});

	// 16. VENTAS
	console.log('💰 Creando ventas...');
	const ventas = await prisma.venta.createMany({
		data: [
			{ id_venta: 1, monto_total: 59980, fecha_venta: new Date('2025-07-08T18:22:56.186Z'), id_carro_compras: 1, id_metodo_pago: 1 },
			{ id_venta: 2, monto_total: 59980, fecha_venta: new Date('2025-07-08T18:22:56.186Z'), id_carro_compras: 3, id_metodo_pago: 1 },
			{ id_venta: 3, monto_total: 15990, fecha_venta: new Date('2025-07-08T18:22:56.186Z'), id_carro_compras: 4, id_metodo_pago: 1 },
			{ id_venta: 4, monto_total: 31980, fecha_venta: new Date('2025-07-08T18:22:56.186Z'), id_carro_compras: 5, id_metodo_pago: 1 },
			{ id_venta: 5, monto_total: 45990, fecha_venta: new Date('2025-07-08T18:22:56.186Z'), id_carro_compras: 6, id_metodo_pago: 1 },
			{ id_venta: 6, monto_total: 29990, fecha_venta: new Date('2025-07-08T18:22:56.186Z'), id_carro_compras: 7, id_metodo_pago: 1 }
		]
	});

	// 17. VALORACIONES
	console.log('⭐ Creando valoraciones...');
	const valoraciones = await prisma.valoracion.create({
		data: {
			id_valoracion: 1,
			puntaje: 5,
			comentario: 'Excelente producto, cumple perfectamente con lo descrito. La calidad es muy buena y llegó en el tiempo esperado.',
			fecha: new Date('2025-07-08T18:22:56.209Z'),
			id_usuario: 5,
			id_producto: 1
		}
	});

	console.log('✅ Seed completado exitosamente!');
	console.log(`📊 Datos creados:
  - ${1} región
  - ${1} ciudad
  - ${3} comunas
  - ${10} direcciones
  - ${3} roles
  - ${7} usuarios
  - ${13} permisos
  - ${3} PYMEs
  - ${3} categorías de productos
  - ${3} productos
  - ${3} listas de deseos
  - ${2} detalles de listas de deseos
  - ${3} métodos de pago
  - ${7} carritos de compras
  - ${8} detalles de carritos
  - ${6} ventas
  - ${1} valoración`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error('❌ Error durante el seed:', e);
		await prisma.$disconnect();
		process.exit(1);
	});
