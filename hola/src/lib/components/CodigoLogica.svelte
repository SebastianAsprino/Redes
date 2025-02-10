<script>
  const codigo = `
// Función para calcular el promedio teórico
function promedioTeorico(n) {
  return (n + 1) / 3;
}

// Función para simular los saltos
function simularSaltos(n, numExperimentos) {
  let totalSaltos = 0;
  let promedios = [];
  for (let i = 1; i <= numExperimentos; i++) {
    let a = Math.floor(Math.random() * n) + 1;
    let b = Math.floor(Math.random() * n) + 1;
    while (a === b) {
      b = Math.floor(Math.random() * n) + 1; // Asegurarse de que a y b sean diferentes
    }
    let saltos = Math.abs(a - b);
    totalSaltos += saltos;
    let promedioActual = totalSaltos / i;
    promedios.push(promedioActual);
  }
  return promedios;
}
  `;
</script>

<div class="bg-base-200 p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-4">Código de Lógica de Simulación</h2>
  <pre class="bg-base-100 p-4 rounded-lg overflow-auto text-sm">
    <code>{codigo}</code>
  </pre>
</div>