# Comandos personalizados
@~/.claude/commands/documentar-migracion.md
@~/.claude/commands/agregar-cambios-git.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Resumen del Proyecto

Este es un proyecto de migración de un sitio web estático HTML/CSS sobre el comediante Dave Chappelle hacia el framework moderno Astro con TailwindCSS v4.

## Directorios de Trabajo

**IMPORTANTE**: Al trabajar en este proyecto, siempre tener en cuenta:

- **📝 Directorio de trabajo activo (donde se agregan cambios)**: `astro-dwn1dv-jimenez-parcial-_2FINAL-chapelle-migracion/`
  - Este es el proyecto Astro donde se implementan todas las migraciones y cambios
  - Todos los comandos npm deben ejecutarse desde aquí

- **📁 Código fuente original (solo referencia)**: `original-dwn1dv-jimenez-parcial-_2FINAL-chapelle/`
  - Sitio HTML/CSS estático original
  - Usar solo como referencia para migración
  - NO modificar este directorio

## Comandos

Ejecutar todos los comandos desde el directorio del proyecto Astro:

```bash
cd astro-dwn1dv-jimenez-parcial-_2FINAL-chapelle-migracion
```

- `npm run dev` - Servidor de desarrollo en localhost:4321
- `npm run build` - Construir sitio de producción en ./dist/
- `npm run preview` - Previsualizar build de producción localmente

## Arquitectura del Proyecto

### Estrategia de Migración por Fases

El proyecto sigue una migración por fases desde el HTML original:
- **FASE 1 (Completada)**: Layout base y componentes estructurales (BaseLayout, Header, Footer, Navigation)
- **FASE 2 (Completada)**: Migración de página index
- **Fases futuras**: Páginas de contenido restantes (carrera-temprana, chapelle-show, el-final-del-show, el-regreso, filmografia, buddies, suscripcion)

### Estructura de Directorios

```
src/
├── components/          # Componentes Astro reutilizables
│   ├── BackToTop.astro
│   ├── Footer.astro
│   ├── GifGallery.astro
│   ├── Header.astro
│   ├── ImageTextContainer.astro
│   └── Navigation.astro
├── data/               # Definiciones de datos en TypeScript
│   ├── author.ts       # Información del autor
│   ├── navigation.ts   # Estructura de navegación del sitio
│   └── sources.ts      # Fuentes/referencias externas
├── layouts/
│   └── BaseLayout.astro # Layout principal wrapper
├── pages/              # Enrutamiento basado en archivos
│   └── index.astro
└── styles/
    └── global.css      # Configuración de tema TailwindCSS v4

public/
├── favicon/           # Archivos de favicon
└── imagenes/          # Todas las imágenes incluyendo gifs
```

### Patrones de Diseño Clave

**Navegación Data-Driven**: Los enlaces de navegación se definen en `src/data/navigation.ts`:
```typescript
{ id: number, href: string, label: string, section: string }
```

**Seguimiento de Sección Activa**: Cada página recibe un prop `activeSection` que corresponde a un ID de sección (ej: 'sec_1', 'sec_2'). Esto se usa para resaltar la página actual en la navegación mediante la clase `pagina-activada`.

**Composición de Layout**: Todas las páginas usan `BaseLayout.astro` que incluye:
- Navigation (header sticky)
- Header
- Botón BackToTop (apunta a 'sec_1')
- Footer
- Estilos globales y fuentes

**Patrones de Contenido Reutilizable**:
- `ImageTextContainer.astro` - Permite flotar imágenes a izquierda/derecha con texto envolvente
- `GifGallery.astro` - Muestra arrays de imágenes GIF

### Enfoque de Estilos

Usa TailwindCSS v4 con tema personalizado en `src/styles/global.css`:
- `--color-dark-bg: #0e0f13` - Fondo principal
- `--color-red-accent: #ff0213` - Color de acento
- `--color-link-blue: #8cb4ff` - Color de enlaces
- `--color-darker: #000000` - Fondo de navegación
- `--font-family-sans: "Open Sans"` - Fuente principal

Los estilos con scope de componente se usan para interacciones específicas (ej: efectos hover de Navigation).

### Notas para Migración de Páginas

Al migrar nuevas páginas desde el HTML original:
1. Crear nuevo archivo `.astro` en `src/pages/` que coincida con la ruta de `navigation.ts`
2. Usar `BaseLayout` con los props apropiados de title y activeSection
3. Extraer secciones de contenido preservando HTML semántico
4. Convertir estilos inline a clases de utilidad de TailwindCSS
5. Las imágenes ya están en `public/imagenes/`
6. Usar archivos de datos en `src/data/` para contenido estructurado cuando sea apropiado

### Assets Estáticos

Todas las imágenes y favicons del sitio original están en el directorio `public/` y se referencian con rutas absolutas (ej: `/imagenes/dave_chapelle_1993.jpg`).

## Stack Tecnológico

- **Astro 5.16.6** - Generador de Sitios Estáticos
- **TailwindCSS 4.1.18** - Estilos (vía plugin de Vite)
- **TypeScript** - Definiciones de datos type-safe
- **Google Fonts** - Familia de fuentes Open Sans
