// Función para calcular el promedio teórico de saltos entre dos nodos distintos
// elegidos al azar en una red lineal de n nodos: E[|a - b|] = (n + 1) / 3
export function promedioTeorico(n) {
  return (n + 1) / 3;
}

// Elige un nodo al azar entre 1 y n
function nodoAleatorio(n) {
  return Math.floor(Math.random() * n) + 1;
}

// Función para simular los saltos: devuelve el promedio acumulado después de cada experimento
export function simularSaltos(n, numExperimentos) {
  let totalSaltos = 0;
  const promedios = [];
  for (let i = 1; i <= numExperimentos; i++) {
    const a = nodoAleatorio(n);
    let b = nodoAleatorio(n);
    while (a === b) {
      b = nodoAleatorio(n); // Asegurarse de que a y b sean diferentes
    }
    totalSaltos += Math.abs(a - b);
    promedios.push(totalSaltos / i);
  }
  return promedios;
}
