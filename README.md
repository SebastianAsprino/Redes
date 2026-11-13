# Redes — simulación de saltos entre nodos

Aplicación web que estima, con una simulación Monte Carlo, cuántos saltos hay en promedio entre dos
nodos distintos elegidos al azar en una red lineal (nodos numerados de 1 a n, donde la distancia entre
`a` y `b` es `|a - b|`), y la compara con el valor teórico:

```text
E[|a - b|] = (n + 1) / 3
```

Se hizo como apoyo de un taller de la materia de redes; el cuaderno de Jupyter original está en el
historial del repositorio
([`taller2.ipynb`](https://github.com/SebastianAsprino/Redes/blob/1c35ff763d6976b05e29784a2b5a78125459b946/taller2.ipynb)).

## Características

- Simulación para redes de **10, 100 y 1000 nodos** con un número de experimentos configurable
  (10 000 por defecto).
- Un gráfico de línea por red (Chart.js) con el **promedio acumulado** de la simulación frente a la
  **curva teórica**, para ver cómo converge.
- Resumen con el promedio final de cada red.
- El panel "Código de Lógica de Simulación" muestra el código fuente real de `src/lib/simulacion.js`
  (importado con `?raw`), así que siempre coincide con lo que se ejecuta.
- Interfaz con Tailwind CSS 4 y daisyUI (tema `forest`).

## Stack

- [SvelteKit 2](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev) (JavaScript)
- [Chart.js 4](https://www.chartjs.org)
- [Tailwind CSS 4](https://tailwindcss.com) + [daisyUI 5](https://daisyui.com)
- [`@sveltejs/adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare) para Cloudflare Pages

## Estructura

```text
hola/                               # la aplicación SvelteKit
├── src/
│   ├── lib/
│   │   ├── simulacion.js           # lógica pura: promedio teórico y simulación de saltos
│   │   └── components/
│   │       ├── grafico.svelte      # formulario, ejecución de la simulación y gráficos
│   │       └── CodigoLogica.svelte # muestra simulacion.js como texto
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte            # enlaces al repo/cuaderno + gráfico + código
│   ├── app.css                     # Tailwind + daisyUI
│   └── app.html
├── static/
├── svelte.config.js
└── vite.config.js
```

## Desarrollo

Requiere Node.js 20 o superior (o [Bun](https://bun.sh)). Todos los comandos se ejecutan dentro de
`hola/`:

```sh
cd hola
npm ci            # instalar dependencias desde package-lock.json
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción para Cloudflare en .svelte-kit/cloudflare
npm run preview   # previsualizar el build
```

## Despliegue

El proyecto usa `@sveltejs/adapter-cloudflare`. En Cloudflare Pages se configura:

- Directorio raíz: `hola`
- Comando de build: `npm run build`
- Directorio de salida: `.svelte-kit/cloudflare`

## Integración continua

`.github/workflows/ci.yml` instala dependencias con `npm ci` y ejecuta `npm run build` en cada push a
`main` y en cada pull request.
