# MiTienda — Frontend (React + Vite)

Este repositorio contiene el frontend de una pequeña aplicación de ventas (React + Vite).

Resumen rápido
- React + Vite
- Axios para llamadas a API
- Tailwind (mediante CDN para desarrollo rápido). Recomendado: integrar Tailwind localmente para producción.

Requisitos
- Node >= 16
- Backend corriendo (por defecto en `http://localhost:3000`)

Instalación y ejecución (desarrollo)

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el frontend (Vite):

```bash
npm run dev
```

3. Abre en el navegador:

http://localhost:5173

Endpoints esperados del backend
- `GET /products`  -> lista de productos
- `POST /products` -> crear producto
- `PUT /products/:id` -> actualizar producto
- `DELETE /products/:id` -> eliminar producto

Smoke test rápido

Antes de ejecutar el `smoke-test`, asegúrate de que el servidor frontend y backend estén corriendo.

Ejecuta:

```bash
npm run smoke-test
```

El script comprueba:
- Que el frontend esté disponible en `http://localhost:5173/`
- Que `GET http://localhost:3000/products` responda

Esto devuelve `exit code 0` si todo está OK, o `1` si falla alguna comprobación.

Construir para producción

```bash
npm run build
npm run preview
```

Deployment (opciones rápidas)

Opción A — Vercel (recomendado para proyectos React + Vite)
1. Conecta el repositorio a Vercel (https://vercel.com/new)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Asegúrate de configurar variables de entorno (ej. `API_BASE_URL`) si tu backend está en otra URL.

Opción B — Netlify
1. Crea un nuevo sitio en Netlify y conecta el repo
2. Build command: `npm run build`
3. Publish directory: `dist`

Nota sobre Tailwind
- Actualmente se usa la CDN `https://cdn.tailwindcss.com` incluida en `index.html` para acelerar el desarrollo.
- Para producción, recomiendo instalar Tailwind localmente y configurarlo: 

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Luego en `tailwind.config.cjs` configura `content` con `./index.html` y `./src/**/*.{js,jsx}` y en `src/index.css` importa las directivas de Tailwind (`@tailwind base; @tailwind components; @tailwind utilities;`). Finalmente elimina la inclusión CDN de `index.html`.

Próximos pasos sugeridos
- Integrar Tailwind localmente y refinar estilos
- Añadir validaciones de formularios más detalladas
- Añadir pruebas E2E (Cypress / Playwright) si quieres testear flujos críticos
- Preparar variables de entorno y CI/CD para despliegue automático

Si quieres, puedo:
- Integrar Tailwind localmente y ajustar `index.css`.
- Crear tests E2E básicos con Playwright o Cypress.
- Añadir GitHub Actions para build y deploy automático (Vercel/Netlify).

Dime cuál prefieres y lo implemento.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
