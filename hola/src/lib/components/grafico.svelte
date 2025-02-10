<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let nodos = [10, 100, 1000];
  let experimentos = 10000;
  let charts = [];
  let resultadosFinales = [];

  function promedioTeorico(n) {
    return (n + 1) / 3;
  }

  function simularSaltos(n, numExperimentos) {
    let totalSaltos = 0;
    let promedios = [];
    for (let i = 1; i <= numExperimentos; i++) {
      let a = Math.floor(Math.random() * n) + 1;
      let b = Math.floor(Math.random() * n) + 1;
      while (a === b) {
        b = Math.floor(Math.random() * n) + 1;
      }
      let saltos = Math.abs(a - b);
      totalSaltos += saltos;
      let promedioActual = totalSaltos / i;
      promedios.push(promedioActual);
    }
    return promedios;
  }

  function generarGraficos() {
    charts.forEach(chart => chart.destroy());
    charts = [];
    resultadosFinales = [];
    let resultados = {};
    nodos.forEach(n => {
      resultados[n] = simularSaltos(n, experimentos);
    });
    nodos.forEach(n => {
      let promedioSimulado = resultados[n][experimentos - 1];
      resultadosFinales.push({ nodos: n, promedio: promedioSimulado });
    });

    // Crear gráficos
    nodos.forEach((n, index) => {
      let ctx = document.getElementById(`chart-${index}`).getContext('2d');
      let teoria = promedioTeorico(n);

      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: experimentos }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Simulación',
              data: resultados[n],
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
              pointRadius: 0,
            },
            {
              label: 'Teoría',
              data: Array(experimentos).fill(teoria),
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
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Red de ${n} nodos`,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Número de experimentos',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Saltos promedio',
              },
            },
          },
        },
      });
      charts.push(chart);
    });
  }
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
    <button
      class="btn btn-primary"
      on:click={generarGraficos}
    >
      Generar Simulacion
    </button>
  </div>

  {#if resultadosFinales.length > 0}
    <div class="bg-base-200 p-4 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-2">Resultados Finales:</h2>
      {#each resultadosFinales as resultado}
        <p>
          Red con {resultado.nodos} nodos: Promedio de saltos =
          <strong>{resultado.promedio.toFixed(2)}</strong>
        </p>
      {/each}
    </div>
  {/if}

  {#each nodos as _, index}
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body p-4">
        <div class="w-full h-96">
          <canvas id={`chart-${index}`}></canvas>
        </div>
      </div>
    </div>
  {/each}
</div>