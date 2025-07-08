<script lang="ts">
  import { onMount } from 'svelte';

  let productos: any[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      const response = await fetch('/api/productos');
      const data = await response.json();

      if (data.success) {
        productos = data.data;
      } else {
        error = data.error || 'Error al cargar productos';
      }
    } catch (err) {
      error = 'Error de conexión';
      console.error('Error:', err);
    } finally {
      loading = false;
    }
  });
</script>

<h1>Productos</h1>

{#if loading}
  <p>Cargando productos...</p>
{:else if error}
  <p class="error">Error: {error}</p>
{:else if productos.length === 0}
  <p>No hay productos disponibles.</p>
{:else}
  <div class="productos-grid">
    {#each productos as producto}
      <div class="producto-card">
        <h3>{producto.nombre}</h3>
        <p class="descripcion">{producto.descripcion || 'Sin descripción'}</p>
        <p class="precio">${producto.precio}</p>
        <p class="stock">Stock: {producto.stock}</p>
        <p class="categoria">
          Categoría: {producto.CategoriaDeProducto.nombre}
        </p>
        <p class="pyme">
          Vendido por: {producto.Pyme.Usuario.nombre}
          {producto.Pyme.Usuario.apellido}
        </p>
        <p
          class="estado"
          class:activo={producto.estado === 'activo'}
        >
          Estado: {producto.estado}
        </p>
      </div>
    {/each}
  </div>
{/if}

<style>
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
  }

  .productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  .producto-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .producto-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .producto-card h3 {
    margin: 0 0 1rem 0;
    color: #2563eb;
  }

  .descripcion {
    color: #666;
    margin-bottom: 1rem;
  }

  .precio {
    font-size: 1.25rem;
    font-weight: bold;
    color: #059669;
    margin-bottom: 0.5rem;
  }

  .stock,
  .categoria,
  .pyme {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .estado {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    background: #ef4444;
    color: white;
    display: inline-block;
  }

  .estado.activo {
    background: #10b981;
  }

  .error {
    color: #ef4444;
    text-align: center;
    padding: 1rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 4px;
    margin: 1rem;
  }

  p {
    margin: 0 0 0.5rem 0;
  }
</style>
