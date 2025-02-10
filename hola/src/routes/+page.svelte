<script>
  import Grafico from '$lib/components/grafico.svelte';
  import CodigoLogica from '$lib/components/CodigoLogica.svelte';

  function abrirRepositorio() {
    window.open('https://github.com/SebastianAsprino/Redes', '_blank');
  }

  function abrirCuadernoJupyter() {
    window.open('https://github.com/SebastianAsprino/Redes/blob/main/taller2.ipynb', '_blank');
  }
</script>

<main class="container mx-auto p-6 max-w-7xl">
  <section class="flex justify-center space-x-4 mt-6">
    <button class="btn btn-outline btn-primary" on:click={abrirRepositorio}>
      Repositorio de GitHub
    </button>
    <button class="btn btn-outline btn-secondary" on:click={abrirCuadernoJupyter}>
      Cuaderno de Jupyter
    </button>
  </section>
  <Grafico />
  <CodigoLogica />
</main>