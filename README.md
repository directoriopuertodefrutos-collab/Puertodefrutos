# Puerto de Frutos — Directorio Digital

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Plataforma digital premium del **Puerto de Frutos de Tigre**, Buenos Aires. Un directorio moderno, rápido y elegante para descubrir comercios, productos y servicios del mercado más emblemático del Delta del Paraná.

## Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 15 | Framework React con App Router |
| React | 19 | UI declarativa y componentes |
| TypeScript | 5.7 | Tipado estático |
| TailwindCSS | 4 | Estilos utilitarios |
| Framer Motion | 11 | Animaciones |
| Lucide React | 0.468 | Iconografía |
| Swiper | 11 | Sliders/Carruseles |
| React Hook Form | 7.54 | Formularios |
| Zod | 3.24 | Validación de esquemas |
| clsx | 2.1 | Condicionales de clases |

## Estructura del proyecto

```
├── app/
│   ├── (home)/           # Página principal (grupo de rutas)
│   │   ├── page.tsx      # Home page
│   │   └── layout.tsx    # Layout de home
│   ├── admin/            # Panel de administración
│   ├── layout.tsx        # Layout raíz
│   ├── page.tsx          # Entry point
│   ├── not-found.tsx     # Página 404
│   ├── robots.ts         # Configuración de robots.txt
│   └── sitemap.ts        # Generación de sitemap.xml
├── components/
│   ├── animations/       # Componentes de animación (FadeIn, ScaleIn, Parallax, Counter)
│   ├── business/         # Componentes relacionados a comercios
│   ├── categories/       # Componentes de categorías
│   ├── home/             # Secciones de la home (Hero, Categories, FAQs, etc.)
│   ├── layout/           # Layout global (Navbar, Footer)
│   ├── map/              # Componentes de mapa
│   ├── modal/            # Modal de detalle de comercio
│   └── ui/               # UI primitivas (Button, Badge, Input, Card, etc.)
├── data/
│   ├── businesses.ts     # Datos de comercios
│   ├── categories.ts     # Datos de categorías
│   ├── plans.ts          # Planes de suscripción
│   ├── testimonials.ts   # Testimonios
│   ├── statistics.ts     # Estadísticas
│   └── faq.ts            # Preguntas frecuentes
├── hooks/
│   ├── useFavorites.ts   # Favoritos (localStorage)
│   ├── useModal.ts       # Control de modal
│   ├── useSearch.ts      # Búsqueda y filtros
│   └── useScrollPosition.ts # Posición de scroll
├── lib/
│   ├── seo.ts            # Meta tags y Schema.org
│   └── utils.ts          # Utilidades (cn, format, isOpenNow, etc.)
├── public/
│   ├── icons/            # Favicon, manifest, íconos
│   ├── images/           # Imágenes estáticas
│   └── video/            # Video del hero
├── styles/
│   └── globals.css       # Estilos globales y tema Tailwind
└── types/
    └── index.ts          # Tipos TypeScript globales
```

## Diseño

### Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| Azul Río | `#0E4D64` | Primary, acentos, links |
| Verde Delta | `#4C956C` | Success, badges |
| Arena | `#F6F1E9` | Fondos, secciones alternas |
| Madera | `#A47148` | Acentos secundarios |
| Carbón | `#161616` | Texto principal |

### Tipografía

- **Display**: Poppins (títulos, headings, números grandes)
- **Sans**: Inter (cuerpo, navegación, textos)

### Componentes UI

- **Navbar**: Transparente → sólida con blur al scrollear. Menú desktop + mobile hamburguesa.
- **Hero**: Video del Delta con overlay, texto gigante, CTA y scroll indicator.
- **Cards**: Glassmorphism, hover 3D, sombras suaves, transiciones premium.
- **Modal**: Full-viewport overlay con backdrop blur. Inspirado en Airbnb.
- **Botones**: Efecto magnetic (Framer Motion), variantes primary/secondary/ghost/outline.

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd puerto-de-frutos

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con las variables necesarias

# 4. Iniciar en desarrollo
npm run dev

# 5. Abrir http://localhost:3000
```

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run typecheck` | Verificación de tipos TypeScript |
| `npm run format` | Formatea código con Prettier |

## Características

- [x] Diseño responsivo (mobile first, tablet, desktop, ultrawide)
- [x] Animaciones premium con Framer Motion
- [x] Modal de detalle sin abandonar la home
- [x] Búsqueda instantánea con filtros
- [x] Favoritos persistentes (localStorage)
- [x] SEO completo (OpenGraph, Twitter Cards, JSON-LD, sitemap)
- [x] Optimización de imágenes (Next/Image, lazy loading, AVIF/WebP)
- [x] Componentes dinámicos con Suspense
- [x] Arquitectura escalable y código limpio
- [x] Glassmorphism, sombras premium, transiciones suaves
- [x] Paleta de colores personalizada (Río, Delta, Arena, Madera)
- [x] Preparado para Mapbox (token listo en .env)
- [x] Panel de administración (frontend)
- [x] Tipografía Poppins + Inter con variable fonts
- [x] Accesibilidad WCAG (roles, aria-labels, teclado)

## Convenciones de código

- **Nombres**: PascalCase para componentes, camelCase para funciones/variables
- **Imports**: Librería → Componentes → Data → Hooks → Utils → Estilos
- **Props**: Interfaces explícitas, tipado estricto
- **Estados**: Separación de lógica con hooks custom
- **Animaciones**: Framer Motion, preferir `whileInView` para scroll

## Personalización

### Agregar un comercio

1. Abrir `data/businesses.ts`
2. Agregar un objeto siguiendo la interfaz `Business`
3. Incluir imágenes en `public/images/businesses/`

### Agregar una categoría

1. Abrir `data/categories.ts`
2. Agregar un objeto siguiendo la interfaz `Category`
3. Asignar un ícono de Lucide en `components/ui/IconMap.tsx`

## Licencia

MIT

---

Desarrollado con dedicación para el Puerto de Frutos de Tigre y toda su comunidad.
