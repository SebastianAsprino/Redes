function calcularPromedioSaltos(n, numExperimentos = 10000000) {
  let totalSaltos = 0;

  for (let i = 0; i < numExperimentos; i++) {
      // Seleccionar nodos A y B aleatoriamente, asegurando que sean diferentes
      let A = Math.floor(Math.random() * n);
      let B;
      do {
          B = Math.floor(Math.random() * n);
      } while (A === B);

      // Calcular la cantidad de saltos (distancia absoluta entre A y B)
      let saltos = Math.abs(A - B);
      totalSaltos += saltos;
  }

  // Calcular el promedio de saltos
  let promedioSaltos = totalSaltos / numExperimentos;
  return promedioSaltos;
}

// Tamaños de red a simular
let tamanosRed = [10, 100, 1000];

// Realizar la simulación para cada tamaño de red
let resultados = {};
for (let n of tamanosRed) {
  let promedio = calcularPromedioSaltos(n);
  resultados[n] = promedio;
  console.log(`Red con ${n} nodos: Promedio de saltos = ${promedio.toFixed(2)}`);
}

// Mostrar resultados
console.log("\nResultados finales:");
for (let n in resultados) {
  console.log(`Red con ${n} nodos: Promedio de saltos = ${resultados[n].toFixed(2)}`);
}