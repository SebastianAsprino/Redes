<script>
  import { onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import { promedioTeorico, simularSaltos } from '$lib/simulacion.js';

  const nodos = [10, 100, 1000];
  const EXPERIMENTOS_POR_DEFECTO = 10000;

  let experimentos = $state(EXPERIMENTOS_POR_DEFECTO);
  let resultadosFinales = $state([]);
  /** @type {HTMLCanvasElement[]} */
  const canvases = $state([]);
  /** @type {Chart[]} */
  let charts = [];

  function destruirGraficos() {
    charts.forEach((chart) => chart.destroy());
    charts = [];
  }

  // Configuración de un gráfico: promedio simulado contra el valor teórico
  function configuracionGrafico(n, simulados, total) {
    return {
      type: 'line',
      data: {
        labels: Array.from({ length: total }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Simulación',
            data: simulados,
            borderColor: 'green',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
          },
          {
            label: 'Teoría',
            data: Array(total).fill(promedioTeorico(n)),
            borderColor: 'blue',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `Red de ${n} nodos` },
        },
        scales: {
          x: { title: { display: true, text: 'Número de experimentos' } },
          y: { title: { display: true, text: 'Saltos promedio' } },
        },
      },
    };
  }

  function generarGraficos() {
    // un input vacío, negativo o con decimales no puede romper la simulación
    const total = Math.max(1, Math.floor(Number(experimentos)) || 0);
    experimentos = total;

    destruirGraficos();
    const resultados = nodos.map((n) => simularSaltos(n, total));
    resultadosFinales = nodos.map((n, i) => ({ nodos: n, promedio: resultados[i][total - 1] }));

    charts = nodos.map((n, i) => new Chart(canvases[i], configuracionGrafico(n, resultados[i], total)));
  }

  onDestroy(destruirGraficos);
</script>

<div class="container mx-auto p-6 max-w-7xl">
  <h1 class="text-2xl font-bold text-center mb-4">Simulación de Saltos en Redes</h1>
  <div class="flex justify-center mb-6">
    <div class="form-control w-full max-w-xs">
      <label class="label" for="experimentos-input">
        <span class="label-text">Número de experimentos:</span>
      </label>
      <input
        id="experimentos-input"
        type="number"
        class="input input-bordered w-full max-w-xs"
        bind:value={experimentos}
        min="1"
      />
    </div>
  </div>
  <div class="flex justify-center mb-6">
    <button class="btn btn-primary" onclick={generarGraficos}>
      Generar Simulacion
    </button>
  </div>

  {#if resultadosFinales.length > 0}
    <div class="bg-base-200 p-4 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-2">Resultados Finales:</h2>
      {#each resultadosFinales as resultado (resultado.nodos)}
        <p>
          Red con {resultado.nodos} nodos: Promedio de saltos =
          <strong>{resultado.promedio.toFixed(2)}</strong>
        </p>
      {/each}
    </div>
  {/if}

  {#each nodos as n, index (n)}
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body p-4">
        <div class="w-full h-96">
          <canvas bind:this={canvases[index]}></canvas>
        </div>
      </div>
    </div>
  {/each}
</div>
