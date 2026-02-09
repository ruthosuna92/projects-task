Spybee – Prueba técnica Frontend

Este proyecto es una prueba técnica frontend para Spybee.

La idea fue replicar el dashboard lo más fiel posible a nivel de UI y comportamiento, usando los datos entregados (JSON), sin backend real.

Stack
	•	Next.js (App Router)
	•	TypeScript
	•	Zustand (estado global)
	•	NextAuth (login mock con credenciales)
	•	Mapbox GL JS
	•	CSS Modules

Todo el layout y los componentes están hechos a mano.

Autenticación

Se implementó login con NextAuth (Credentials Provider) usando un usuario mock.

Credenciales:
	•	Email: demo@spybee.com
	•	Password: demo1234

Las rutas internas (/projects) están protegidas.
Si no hay sesión, redirige al login (/).

Datos

No hay fetch real.
Los proyectos vienen de un JSON entregado para la prueba.

Aun así, hay un pequeño momento donde la tabla no muestra data mientras se procesan:
	•	filtros
	•	orden
	•	paginación
	•	totales

Por eso se dejó preparado el estado isLoading.

Estado y lógica
	•	Zustand se usa solo para estado
	•	La lógica (paginación, filtros, totales, proyectos visibles) vive en selectores
	•	La UI solo consume estado ya procesado

Vistas

Tabla
	•	Vista principal
	•	Maneja la paginación
	•	Seleccionar una fila actualiza el proyecto activo

Grid
	•	Usa la misma lógica de la tabla
	•	Solo cambia la presentación

Mapa
	•	No pagina
	•	Solo reacciona al proyecto seleccionado
	•	Se centra usando lat / lng
	•	La tabla sigue siendo el punto de navegación

Sidebar
	•	En desktop se muestra fija
	•	En pantallas menores a 1280px funciona como overlay
	•	Al abrirla, se bloquea el scroll del fondo

    Notas finales

El foco estuvo en:
	•	UI
	•	UX
	•	separación clara de responsabilidades
	•	comportamiento responsive

No se priorizó backend real ni optimización prematura.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


