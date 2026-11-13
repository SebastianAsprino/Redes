<script>
  import Grafico from '$lib/components/grafico.svelte';
  import CodigoLogica from '$lib/components/CodigoLogica.svelte';

  const REPOSITORIO = 'https://github.com/SebastianAsprino/Redes';
  // El cuaderno se retiró de main; se enlaza la última versión que lo incluía
  const CUADERNO_JUPYTER = `${REPOSITORIO}/blob/1c35ff763d6976b05e29784a2b5a78125459b946/taller2.ipynb`;
</script>

<svelte:head>
  <title>Simulación de saltos en redes</title>
  <meta
    name="description"
    content="Simulación Monte Carlo del promedio de saltos entre dos nodos al azar en redes de 10, 100 y 1000 nodos, comparada con el valor teórico."
  />
</svelte:head>

<main class="container mx-auto p-6 max-w-7xl">
  <section class="flex justify-center space-x-4 mt-6">
    <a class="btn btn-outline btn-primary" href={REPOSITORIO} target="_blank" rel="noopener noreferrer">
      Repositorio de GitHub
    </a>
    <a class="btn btn-outline btn-secondary" href={CUADERNO_JUPYTER} target="_blank" rel="noopener noreferrer">
      Cuaderno de Jupyter
    </a>
  </section>
  <Grafico />
  <CodigoLogica />
</main>
