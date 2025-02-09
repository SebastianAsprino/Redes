<script>
  let results = [];

  function runSimulation() {
    const networkSizes = [10, 100, 1000];
    const experiments = 1000;

    results = []; // Limpiar resultados previos

    networkSizes.forEach(size => {
      let totalHops = 0;

      for (let i = 0; i < experiments; i++) {
        const A = Math.floor(Math.random() * size);
        let B = Math.floor(Math.random() * size);

        // Asegurarse de que A y B estén en nodos diferentes
        while (B === A) {
          B = Math.floor(Math.random() * size);
        }

        // Calcular saltos entre A y B
        totalHops += Math.abs(A - B);
      }

      const averageHops = totalHops / experiments;
      results.push({ size, averageHops: averageHops.toFixed(2) });
    });
  }
</script>

<div class="p-4">
  <h1 class="text-3xl font-bold mb-4">Simulación de Saltos Promedio en Red Punto a Punto</h1>
  <button
    class="btn btn-primary mb-4"
    on:click={runSimulation}
  >
    Ejecutar Simulación
  </button>

  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th>Tamaño de la Red (n)</th>
        <th>Saltos Promedio</th>
      </tr>
    </thead>
    <tbody>
      {#each results as { size, averageHops }}
        <tr>
          <td>{size}</td>
          <td>{averageHops}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
