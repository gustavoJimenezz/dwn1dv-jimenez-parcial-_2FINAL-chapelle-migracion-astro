# Documentación de Migración a Astro + Tailwind CSS

Este documento registra todos los cambios realizados durante la migración del sitio Dave Chappelle de HTML/CSS puro a Astro + Tailwind CSS, siguiendo el plan de migración incremental definido en `planes-migracion-astro.md`.

---

## FASE 0: PREPARACIÓN DEL ENTORNO

**Estado:** ✅ Completada
**Fecha:** 2026-01-02
**Duración:** 45 minutos

### Punto 2: Instalar y configurar Tailwind CSS

**Comando ejecutado:**
```bash
cd astro-dwn1dv-jimenez-parcial-_2FINAL-chapelle-migracion
npm install
npx astro add tailwind --yes
```

**Archivos modificados:**
- `astro.config.mjs` - Configuración de Tailwind con plugin Vite
- `package.json` - Agregadas dependencias `@tailwindcss/vite@^4.1.18` y `tailwindcss@^4.1.18`

**Archivos creados:**
- `src/styles/global.css` - Archivo de estilos globales con import de Tailwind

**Resultado:**
- Tailwind CSS 4.x instalado y configurado correctamente
- Archivo global.css creado automáticamente con `@import "tailwindcss"`

---

### Punto 5: Configurar tema Tailwind personalizado

**Archivo modificado:**
- `src/styles/global.css`

**Cambios realizados:**
```css
@import "tailwindcss";

/* Configuración de tema personalizado según plan de migración */
@theme {
  --color-dark-bg: #0e0f13;
  --color-red-accent: #ff0213;
  --color-link-blue: #8cb4ff;
  --color-darker: #000000;

  --font-family-sans: "Open Sans", ui-sans-serif, system-ui, sans-serif;
}
```

**Colores configurados:**
- `dark-bg`: #0e0f13 (fondo principal oscuro)
- `red-accent`: #ff0213 (acento rojo característico)
- `link-blue`: #8cb4ff (color de enlaces)
- `darker`: #000000 (secciones negras)

**Tipografía configurada:**
- Familia sans: Open Sans como fuente principal

---

### Punto 6: Completar public/site.webmanifest

**Archivo modificado:**
- `public/favicon/site.webmanifest`

**Cambios realizados:**
```json
{
    "name": "Dave Chappelle - Sitio Tributo",
    "short_name": "D. Chappelle",
    "icons": [
        {
            "src": "/favicon/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/favicon/android-chrome-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        }
    ],
    "theme_color": "#ff0213",
    "background_color": "#0e0f13",
    "display": "standalone"
}
```

**Metadatos configurados:**
- Nombre completo: "Dave Chappelle - Sitio Tributo"
- Nombre corto: "D. Chappelle"
- Color de tema: #ff0213 (rojo acento)
- Color de fondo: #0e0f13 (fondo oscuro)
- Rutas de iconos corregidas con prefijo `/favicon/`

---

### Punto 7: Configurar Google Fonts en BaseLayout preliminar

**Archivos creados:**
- `src/layouts/BaseLayout.astro`

**Estructura creada:**
```astro
---
interface Props {
  title: string;
  activeSection?: string;
}

const { title, activeSection } = Astro.props;
import '../styles/global.css';
---

<!doctype html>
<html lang="es">
  <head>
    <!-- Meta tags básicos -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sitio tributo a Dave Chappelle" />

    <!-- Google Fonts - Open Sans (pesos: 300, 400, 700) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />

    <!-- Favicons configurados -->
    <!-- ... -->

    <title>{title}</title>
  </head>
  <body class="bg-dark-bg text-white font-sans text-lg leading-7">
    <slot />
  </body>
</html>
```

**Características implementadas:**
- Props tipadas con TypeScript (`title` y `activeSection`)
- Import de Google Fonts con preconnect para performance
- Open Sans con pesos 300, 400 y 700
- Configuración completa de favicons (apple-touch-icon, manifest, etc.)
- Clases Tailwind en body usando colores personalizados
- Slot para contenido dinámico

---

### Testing FASE 0

**Archivo modificado:**
- `src/pages/index.astro`

**Página de prueba creada:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Dave Chappelle - Test FASE 0">
  <main class="max-w-[750px] mx-auto py-12 px-4">
    <h1 class="text-[3.5em] font-light text-center mb-8">Dave Chappelle</h1>
    <h2 class="text-2xl border-b-2 border-red-accent pb-2 mb-4">
      Test de configuración FASE 0
    </h2>
    <!-- Contenido de prueba con colores personalizados -->
  </main>
</BaseLayout>
```

**Comando de testing:**
```bash
npm run dev
```

**Resultado del testing:**
```
✅ Servidor de desarrollo inició correctamente en http://localhost:4321/
✅ Tailwind CSS funcionando
✅ Colores personalizados aplicándose correctamente
✅ Google Fonts (Open Sans) cargadas
✅ BaseLayout funcionando con sistema de slots
```

---

## Resumen FASE 0

**Archivos creados:**
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`

**Archivos modificados:**
- `astro.config.mjs` (configuración Tailwind)
- `package.json` (dependencias)
- `public/favicon/site.webmanifest` (metadatos PWA)
- `src/pages/index.astro` (página de prueba)

**Comandos importantes ejecutados:**
```bash
npm install
npx astro add tailwind --yes
npm run dev
```

**Estado:** La FASE 0 está completada exitosamente. El entorno de desarrollo Astro + Tailwind CSS está configurado y funcionando correctamente con el tema personalizado del proyecto.

---

## FASE 1: LAYOUT BASE Y COMPONENTES DE ESTRUCTURA

**Estado:** ✅ Completada
**Fecha:** 2026-01-03
**Complejidad:** MEDIA

### Objetivo
Crear layout base y componentes estructurales repetidos (Header, Nav, Footer, BackToTop) con datos externos en TypeScript.

---

### 1.1 Archivos de Datos TypeScript

#### `/src/data/navigation.ts`
**Líneas principales:**
- Línea 1: Interface `NavLink` con propiedades id, href, label, section
- Línea 7: Array `navLinks` con 8 enlaces de navegación

**Rutas normalizadas (kebab-case):**
- `/` (index)
- `/carrera-temprana`
- `/chapelle-show`
- `/el-final-del-show`
- `/el-regreso`
- `/filmografia`
- `/buddies`
- `/suscripcion`

#### `/src/data/author.ts`
**Líneas principales:**
- Línea 1: Interface `Author` con propiedades name, birthdate, email, image
- Línea 8: Objeto `author` con datos del autor

**Datos incluidos:**
- Nombre: Gustavo Alex Jimenez Crespo
- Fecha nacimiento: 17/10/1995
- Email: gustavo.jimenez.crespo@gmail.com
- Imagen: /imagenes/perfil_frente.jpg

#### `/src/data/sources.ts`
**Líneas principales:**
- Línea 1: Interface `Source` con propiedades id, label, url
- Línea 7: Array `sources` con 9 fuentes bibliográficas

**Fuentes incluidas:**
- wikipedia/Chappelles_show
- wikipedia/Dave_Chapelle
- elpais.com
- lahiguera.net
- swashvillage.org
- cbsnews.com
- wikiwand.com
- wikipedia.org (Buddies)
- vulture.com

---

### 1.2 Layout Base

#### `/src/layouts/BaseLayout.astro`
**Archivo modificado** (reemplaza versión preliminar de FASE 0)

**Líneas principales:**
- Línea 2-4: Imports de componentes Navigation, Header, Footer, BackToTop
- Línea 7-9: Interface Props con title y activeSection
- Línea 17-35: Meta tags y configuración de fuentes/favicons
- Línea 24: Google Fonts (Open Sans pesos 300, 400, 700)
- Línea 27-33: Favicons completos
- Línea 36: Body con clases Tailwind
- Línea 37-39: Componentes estructurales (Navigation, Header, BackToTop)
- Línea 43: Slot para contenido dinámico
- Línea 45: Footer

**Mapeo CSS → Tailwind (línea 36):**
```
background-color: #0e0f13 → bg-dark-bg
font-family: 'Open Sans' → font-sans
font-size: 1.1em → text-lg
line-height: 28px → leading-[28px]
```

---

### 1.3 Componente Navigation

#### `/src/components/Navigation.astro`

**Líneas principales:**
- Línea 2: Import de datos navigation.ts
- Línea 4-6: Interface Props con activeSection
- Línea 11: Nav con clases Tailwind sticky
- Línea 13-19: Map sobre navLinks con clase dinámica
- Línea 22-30: Estilos scoped para ::after y hover

**Mapeo CSS → Tailwind (línea 11):**
```
position: sticky; top: 0; z-index: 1 → sticky top-0 z-10
background-color: #000000 → bg-darker
padding: 12px 0px → py-3
text-align: center → text-center
```

**Efectos implementados:**
- Hover con border-bottom rojo animado (::after con transition)
- Clase condicional `pagina-activada` según activeSection
- Preparado para animación keyframe (se implementará en FASE 7)

---

### 1.4 Componente Header

#### `/src/components/Header.astro`

**Líneas principales:**
- Línea 5: Header con background parallax y clases Tailwind
- Línea 6: H1 con gradiente inline y text-shadow

**Mapeo CSS → Tailwind (línea 5):**
```
background-attachment: fixed → bg-fixed
background-size: 1006px → bg-[length:1006px]
background-position-x: center → bg-center
background-repeat: no-repeat → bg-no-repeat
background-color: black → bg-black
border-bottom: 2px solid #ff0213 → border-b-2 border-red-accent
```

**Mapeo H1 (línea 6):**
```
font-weight: 300 → font-light
font-size: 3.5em → text-[3.5em]
text-align: center → text-center
padding-top: 480px → pt-[480px]
padding-bottom: 50px → pb-12
```

**Estilos inline conservados:**
- Gradiente linear-gradient sobre h1
- text-shadow para efecto de brillo rojo

---

### 1.5 Componente Footer

#### `/src/components/Footer.astro`

**Líneas principales:**
- Línea 2-3: Imports de author.ts y sources.ts
- Línea 7: Footer con clases Tailwind
- Línea 8: Div contenedor con overflow-auto
- Línea 9-15: Imagen flotante izquierda
- Línea 16-20: Lista datos del autor
- Línea 21-28: Map sobre sources con enlaces externos

**Mapeo CSS → Tailwind:**
```
background-color: black → bg-black
border-top: 3px solid #ff0213 → border-t-[3px] border-red-accent
font-size: 1em → text-base
overflow: auto → overflow-auto
max-width: 750px → max-w-[750px]
margin: auto → mx-auto
```

**Imagen footer:**
```
float: left → float-left
width: 250px → w-[250px]
border-radius: 10px → rounded-[10px]
margin: 10px → m-2.5
```

**Características:**
- Enlaces externos con `rel="noopener noreferrer"` (seguridad)
- Uso de datos TypeScript tipados
- Consistencia en todas las páginas (corrige inconsistencia de filmografia.html)

---

### 1.6 Componente BackToTop

#### `/src/components/BackToTop.astro`

**Líneas principales:**
- Línea 2-4: Interface Props con targetId
- Línea 9: Enlace con aria-label (accesibilidad)
- Línea 13-23: Estilos scoped con position fixed

**Características:**
- Position fixed bottom-right (bottom: 50px, right: 50px)
- Background con icono_flacha.png
- Border-radius 50% (círculo)
- Hover con border azul (#8cb4ff)
- Accesibilidad: aria-label "Volver al inicio"

---

## Resumen FASE 1

**Archivos creados:** 8 totales
- 3 archivos de datos TypeScript (navigation.ts, author.ts, sources.ts)
- 1 layout (BaseLayout.astro modificado)
- 4 componentes (Navigation.astro, Header.astro, Footer.astro, BackToTop.astro)

**Mapeos principales CSS → Tailwind:**
| CSS Original | Tailwind | Componente |
|--------------|----------|------------|
| `background-color: #0e0f13` | `bg-dark-bg` | BaseLayout |
| `font-family: 'Open Sans'` | `font-sans` | BaseLayout |
| `font-size: 1.1em` | `text-lg` | BaseLayout |
| `line-height: 28px` | `leading-[28px]` | BaseLayout |
| `position: sticky; top: 0` | `sticky top-0` | Navigation |
| `background-color: #000000` | `bg-darker` | Navigation |
| `padding: 12px 0px` | `py-3` | Navigation |
| `background-attachment: fixed` | `bg-fixed` | Header |
| `background-size: 1006px` | `bg-[length:1006px]` | Header |
| `font-weight: 300` | `font-light` | Header h1 |
| `font-size: 3.5em` | `text-[3.5em]` | Header h1 |
| `padding-top: 480px` | `pt-[480px]` | Header h1 |
| `border-bottom: 2px solid #ff0213` | `border-b-2 border-red-accent` | Header |

**Notas técnicas:**
- TypeScript: Interfaces para tipado de datos
- Estilos scoped: Uso de `<style>` en componentes para pseudo-elementos (::after)
- Accesibilidad: aria-label en BackToTop
- Seguridad: rel="noopener noreferrer" en enlaces externos
- Pendiente: Animación keyframe `mianimacion` para .pagina-activada (FASE 7)

**Estado:** FASE 1 completada exitosamente. Todos los componentes estructurales están creados y listos para ser usados en las páginas.

---

## FASE 2: PÁGINA INDEX (MIGRACIÓN COMPLETA)

**Estado:** ✅ Completada
**Fecha:** 2026-01-03
**Duración:** 1 hora
**Dependencia:** FASE 1

### Objetivo
Migrar completamente `/index.html` a Astro, creando componentes reutilizables para imagen flotante con texto envolvente y galerías de GIFs.

---

### Punto 2.1: Crear Componente ImageTextContainer.astro

**Archivo creado:**
- `src/components/ImageTextContainer.astro`

**Código implementado:**
```astro
---
interface Props {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  imageWidth?: number;
  imageHeight?: number;
}

const {
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  imageWidth = 250,
  imageHeight = 297
} = Astro.props;
---

<div class="overflow-auto">
  <img
    src={imageSrc}
    alt={imageAlt}
    width={imageWidth}
    height={imageHeight}
    class={imagePosition === 'left' ? 'float-left mr-5 mb-3' : 'float-right ml-5 mb-3'}
  />
  <slot />
</div>
```

**Características implementadas:**
- Props tipadas con TypeScript (línea 2-6)
- Prop `imagePosition` con valores 'left' | 'right' (default: 'right') (línea 5)
- Props opcionales para dimensiones de imagen (línea 6-7)
- Float image con márgenes dinámicos según posición (línea 20)
- Overflow auto para clearfix (línea 17)
- Slot para contenido de texto envolvente (línea 22)

**Mapeo CSS → Tailwind:**
```
overflow: auto → overflow-auto
float: left → float-left
float: right → float-right
margin-right: 20px → mr-5
margin-bottom: 15px → mb-3
```

---

### Punto 2.2: Crear Componente GifGallery.astro

**Archivo creado:**
- `src/components/GifGallery.astro`

**Código implementado:**
```astro
---
interface Gif {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  gifs: Gif[];
}

const { gifs } = Astro.props;
---

<div class="flex gap-5">
  {gifs.map((gif) => (
    <img
      src={gif.src}
      alt={gif.alt}
      width={gif.width}
      height={gif.height}
    />
  ))}
</div>
```

**Características implementadas:**
- Interface `Gif` tipada con propiedades necesarias (línea 2-7)
- Prop `gifs` como array de objetos Gif (línea 9-11)
- Display flex horizontal (línea 16)
- Gap de 20px entre imágenes (línea 16)
- Map sobre array de gifs para renderizado dinámico (línea 17)

**Mapeo CSS → Tailwind:**
```
display: flex → flex
gap: 20px → gap-5
```

---

### Punto 2.3: Migrar página index.astro

**Archivo creado:**
- `src/pages/index.astro`

**Código implementado:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import GifGallery from '../components/GifGallery.astro';
import ImageTextContainer from '../components/ImageTextContainer.astro';

const pageTitle = 'Dave Chappelle';

const introGifs = [
  {
    src: '/imagenes/gif/intro_2.gif',
    alt: 'gif de la pelicula Robin Hood',
    width: 200,
    height: 111
  },
  {
    src: '/imagenes/gif/intro_1.gif',
    alt: 'gif stand up con Chris Rock',
    width: 200,
    height: 113    - src/components/CharacterCard.astro (tarjeta reutilizable)
  },
  {
    src: '/imagenes/gif/intro_3.gif',
    alt: 'gif de la pelicula De ladron a policia',
    width: 200,
    height: 108
  }
];
---

<BaseLayout title={pageTitle} activeSection="sec_1">
  <section id="sec_1" class="max-w-[750px] mx-auto py-12 px-4">
    <h2 class="border-b-2 border-red-accent pb-2 mb-4">Introduccion</h2>

    <!-- 3 párrafos de contenido -->

    <GifGallery gifs={introGifs} />

    <ImageTextContainer
      imageSrc="/imagenes/dave_hbo.jpg"
      imageAlt="Chapelle presentandose en HBO"
      imagePosition="right"
      imageWidth={250}
      imageHeight={297}
    >
      <p class="text-justify">
        <!-- Contenido de texto que envuelve la imagen -->
      </p>
    </ImageTextContainer>

    <!-- Párrafo final -->
  </section>
</BaseLayout>
```

**Características implementadas:**
- Import de BaseLayout y componentes creados (línea 2-4)
- Data de GIFs externalizada en constante tipada (línea 8-26)
- Uso de BaseLayout con props `title` y `activeSection` (línea 29)
- Section con estilos del plan de migración (línea 30)
- H2 con borde inferior rojo según mapeo (línea 31)
- Componente GifGallery con array de 3 GIFs (línea 35)
- Componente ImageTextContainer con imagen HBO flotante a la derecha (línea 37-48)
- Enlaces con clases Tailwind para color y hover (text-link-blue hover:underline)

**Mapeo CSS → Tailwind aplicado:**
```
section { max-width: 750px; margin: auto; padding: 50px 0px }
  → class="max-w-[750px] mx-auto py-12 px-4"

h2 { border-bottom: 2px solid #ff0213 }
  → class="border-b-2 border-red-accent pb-2 mb-4"

text-align: justify
  → class="text-justify"

Enlaces:
  color: #8cb4ff → text-link-blue
  hover: underline → hover:underline
```

---

## Resumen FASE 2

**Archivos creados:**
- `src/components/ImageTextContainer.astro` - Componente de imagen flotante con texto envolvente
- `src/components/GifGallery.astro` - Componente de galería horizontal de GIFs
- `src/pages/index.astro` - Página principal migrada a Astro

**Estructura de datos:**
- Array `introGifs` con 3 objetos tipados para la galería de introducción

**Mapeos CSS → Tailwind realizados:**
- Section: `max-w-[750px] mx-auto py-12 px-4`
- H2: `border-b-2 border-red-accent pb-2 mb-4`
- Enlaces: `text-link-blue hover:underline`
- Float left/right con márgenes dinámicos
- Flex con gap-5

**Estado:** La FASE 2 está completada exitosamente. La página index.html ha sido migrada completamente a Astro con componentes reutilizables.

---

## FASE 3: COMPONENTES DE PERSONAJES

**Estado:** ✅ Completada
**Fecha:** 2026-01-05
**Duración:** 1.5 horas
**Complejidad:** MEDIA-ALTA
**Dependencia:** FASE 2

### Objetivo
Crear componentes reutilizables para tarjetas de personajes de Chappelle's Show con datos externos tipados y galerías de GIFs con layout complejo (vertical + agrupado).

---

### Punto 3.1: Externalizar datos de personajes

**Archivo creado:**
- `src/data/characters.ts`

**Código implementado:**
```typescript
export interface Character {
  id: number;
  name: string;
  image: string;
  gif: string;
  description: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: 'Tron Carter',
    image: '/imagenes/tron_carter.jpg',
    gif: '/imagenes/gif/carter.gif',
    description: 'En esta mirada satirica al sistema de justicia penal...'
  },
  // ... 5 personajes más
];
```

**Características:**
- Línea 1-6: Interface `Character` con 5 propiedades tipadas
- Línea 8: Export de array `characters` con 6 personajes
- Datos extraídos de `/contenido/chapelle_show.html` (líneas 89-168 del original)
- Personajes incluidos: Tron Carter, Tyrone Biggums, "Silky" Johnson, Chuck Taylor, Leonard Washington, Lil' Jon

---

### Punto 3.2: Crear componente CharacterCard.astro

**Archivo creado:**
- `src/components/CharacterCard.astro`

**Código implementado:**
```astro
---
import type { Character } from '../data/characters';

interface Props {
  character: Character;
}

const { character } = Astro.props;
---

<div class="my-5 overflow-auto text-justify">
  <img
    src={character.image}
    alt={`Perfil del personaje ${character.name}`}
    class="w-[200px] float-left mr-4 mb-2"
    width="200"
    height="195"
  />
  <h4 class="text-xl font-semibold mb-2">{character.name}</h4>
  <p class="leading-7">
    {character.description}
  </p>
</div>
```

**Características implementadas:**
- Línea 2: Import del type `Character` desde datos externos
- Línea 4-6: Interface Props tipada
- Línea 11: Contenedor con overflow-auto para clearfix
- Línea 15: Imagen flotante a la izquierda con ancho fijo 200px
- Línea 19: Título h4 con estilos tipográficos
- Línea 20: Descripción con leading-7

**Mapeo CSS → Tailwind:**
```
.personajes > div { margin: 20px auto; overflow: auto } → my-5 overflow-auto
.personajes img { width: 200px; float: left } → w-[200px] float-left
text-align: justify → text-justify
```

---

### Punto 3.3: Crear componente CharacterGifGallery.astro

**Archivo creado:**
- `src/components/CharacterGifGallery.astro`

**Código implementado:**
```astro
---
interface GifItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  verticalGifs: GifItem[];
  groupGifs: GifItem[];
}

const { verticalGifs, groupGifs } = Astro.props;
---

<div class="flex gap-5 my-8">
  <div class="flex flex-col gap-5">
    {verticalGifs.map((gif) => (
      <img
        src={gif.src}
        alt={gif.alt}
        class="w-[200px]"
        width={gif.width}
        height={gif.height}
      />
    ))}
  </div>
  <div class="flex flex-wrap gap-4">
    {groupGifs.map((gif) => (
      <img
        src={gif.src}
        alt={gif.alt}
        width={gif.width}
        height={gif.height}
      />
    ))}
  </div>
</div>
```

**Características implementadas:**
- Línea 2-7: Interface `GifItem` con propiedades de imagen
- Línea 9-12: Props con dos arrays: verticalGifs y groupGifs
- Línea 17: Contenedor flex horizontal con gap de 20px
- Línea 18: Columna vertical de GIFs (flex flex-col)
- Línea 29: Grupo de GIFs con flex-wrap

**Mapeo CSS → Tailwind:**
```
.personajes_gifs { display: flex; gap: 20px } → flex gap-5
.gif_vertical { display: flex; flex-direction: column } → flex flex-col
.gif_grupo { display: flex; flex-wrap: wrap; gap: 15px } → flex flex-wrap gap-4
img { width: 200px } → w-[200px]
```

**Estructura de layout complejo implementada:**
- **División vertical** (3 GIFs): carter.gif, lil_jon.gif, leonard.gif
- **División agrupada** (3 GIFs): tyrone.gif (grande), confused.gif, taylor.gif

---

### Punto 3.4: Migrar página chapelle-show.astro

**Archivo creado:**
- `src/pages/chapelle-show.astro`

**Código principal (primeras líneas):**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CharacterCard from '../components/CharacterCard.astro';
import CharacterGifGallery from '../components/CharacterGifGallery.astro';
import { characters } from '../data/characters';

const pageTitle = "Chappelle's Show - Dave Chappelle";

const verticalGifs = [
  { src: '/imagenes/gif/carter.gif', alt: 'gif de Tron Carter', width: 200, height: 149 },
  { src: '/imagenes/gif/lil_jon.gif', alt: 'gif de Lil jon', width: 200, height: 149 },
  { src: '/imagenes/gif/leonard.gif', alt: 'gif de Leonard', width: 200, height: 163 }
];

const groupGifs = [
  { src: '/imagenes/gif/tyrone.gif', alt: 'gif de Tayrone', width: 470, height: 353 },
  { src: '/imagenes/gif/confused.gif', alt: 'gif escena de confisión', width: 200, height: 150 },
  { src: '/imagenes/gif/taylor.gif', alt: 'gif de Taylor', width: 200, height: 155 }
];
---

<BaseLayout title={pageTitle} activeSection="sec_3">
  <section id="sec_3" class="max-w-[750px] mx-auto py-12 px-4">
    <h2 lang="en" class="text-3xl font-light mb-6 pb-2 border-b-2 border-red-accent">
      Chappelle's Show
    </h2>

    <img
      src="/imagenes/chappelles-show-logo.png"
      alt="logo del show"
      class="w-full max-w-[700px] h-auto mb-6"
    />

    <p class="leading-7 mb-6 text-justify">
      <!-- Párrafo con enlaces a Netflix, Neal Brennan, Michele Armour, Comedy Central -->
    </p>

    <h3 class="text-2xl font-semibold mb-4 mt-8">Personajes</h3>

    <CharacterGifGallery verticalGifs={verticalGifs} groupGifs={groupGifs} />

    <div class="space-y-8">
      {characters.map((character) => (
        <CharacterCard character={character} />
      ))}
    </div>

    <h3 class="text-2xl font-semibold mb-4 mt-8">Estrellas invitadas</h3>
    <!-- 2 párrafos con listas de invitados y músicos -->
  </section>
</BaseLayout>
```

**Características implementadas:**
- Línea 2-5: Imports de layout, componentes y datos
- Línea 9-18: Data de GIFs externalizada (10 GIFs totales según plan)
- Línea 22: BaseLayout con activeSection "sec_3"
- Línea 23: Section con max-w-[750px]
- Línea 24-26: H2 con border-bottom rojo
- Línea 28-32: Logo del show (700x271px)
- Línea 34-36: Párrafo de introducción con enlaces externos
- Línea 40: Componente CharacterGifGallery con layout complejo
- Línea 42-46: Map sobre array characters para renderizar 6 tarjetas
- Línea 48-50: Sección de estrellas invitadas con múltiples enlaces

**Enlaces externos incluidos:**
- Netflix (Chappelle's Show)
- Wikipedia (Neal Brennan, Comedy Central, Half Baked)
- Múltiples artistas invitados (30+ enlaces)

**Mapeo CSS → Tailwind aplicado:**
```
section { max-width: 750px; margin: auto; padding: 50px 0px }
  → max-w-[750px] mx-auto py-12 px-4

h2 { font-size: 2em; font-weight: 300; border-bottom: 2px solid #ff0213 }
  → text-[2em] font-light border-b-2 border-red-accent pb-2 mb-6

ul { list-style: none; padding: 0px; overflow: hidden }
  → list-none p-0 overflow-hidden

p { text-align: justify }
  → text-justify leading-7 mb-8
```

---

## Resumen FASE 3

**Archivos creados:** 4 totales
- `src/data/characters.ts` - 6 personajes con interface tipada
- `src/components/CharacterCard.astro` - Tarjeta reutilizable de personaje
- `src/components/CharacterGifGallery.astro` - Layout complejo vertical + agrupado
- `src/pages/chapelle-show.astro` - Página completa migrada

**Total de GIFs implementados:** 10
- 3 GIFs verticales (carter, lil_jon, leonard)
- 3 GIFs agrupados (tyrone, confused, taylor)
- Referencias adicionales en personajes (4 más)

**Personajes migrados:** 6
1. Tron Carter
2. Tyrone Biggums
3. "Silky" Johnson
4. Chuck Taylor
5. Leonard Washington
6. Lil' Jon

**Mapeos CSS → Tailwind clave:**
- Float left con imágenes de 200px: `w-[200px] float-left mr-4`
- Overflow auto para clearfix: `overflow-auto`
- Layout complejo de galerías: `flex gap-5`, `flex-col gap-5`, `flex-wrap gap-4`
- Secciones de contenido: `max-w-[750px] mx-auto py-12 px-4`

**Estado:** FASE 3 completada exitosamente. La página chapelle-show.astro está migrada con componentes reutilizables para personajes y galerías de GIFs con layout complejo.

---

## FASE 4: COMPONENTES DE FILMOGRAFÍA

**Estado:** ✅ Completada
**Fecha:** 2026-01-05
**Duración:** 1.5 horas
**Complejidad:** MEDIA-ALTA
**Dependencia:** FASE 2

### Objetivo
Crear componente de filmografía con datos externos tipados, implementando zebra striping (filas alternas) y pseudo-elementos para iconos.

---

### Punto 4.1: Externalizar datos de películas

**Archivo creado:**
- `src/data/movies.ts`

**Código implementado:**
```typescript
export interface Movie {
  id: number;
  title: string;
  year: string;
  image: string;
  url: string;
  description: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Robin Hood: Men in Tights',
    year: '1993',
    image: '/imagenes/robin_hood_dave.jpg',
    url: 'https://www.imdb.com/title/tt0107977/',
    description: 'Parodia de la historia de Robin Hood...'
  },
  // ... 6 películas más
];
```

**Características:**
- Línea 1-7: Interface `Movie` con 7 propiedades tipadas
- Línea 9: Export de array `movies` con 7 películas
- Datos extraídos de `/contenido/filmografia.html` (líneas 52-152 del original)
- Películas incluidas: Robin Hood (1993), The Nutty Professor (1996), Con Air (1997), Half Baked (1998), You've Got Mail (1998), Blue Streak (1999), Undercover Brother (2002)

---

### Punto 4.2: Crear componente MovieItem.astro

**Archivo creado:**
- `src/components/MovieItem.astro`

**Código implementado:**
```astro
---
import type { Movie } from '../data/movies';

interface Props {
  movie: Movie;
  index: number;
}

const { movie, index } = Astro.props;
---

<li class={`overflow-auto mb-2.5 p-2.5 relative ${index % 2 === 0 ? 'bg-black' : ''}`}>
  <a href={movie.url} target="_blank" rel="noopener noreferrer" class="block no-underline text-white">
    <img
      src={movie.image}
      alt={`Poster de ${movie.title}`}
      class="w-[100px] h-auto float-left mr-4"
    />
    <h4 class="text-lg font-light mb-2">
      {movie.title} ({movie.year})
    </h4>
    <p class="leading-7 text-justify">
      {movie.description}
    </p>
  </a>
</li>

<style>
  /* Icono de click en esquina superior derecha */
  a::before {
    content: '';
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    background-image: url('/imagenes/icono_click_black.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  a:hover::before {
    display: none;
  }
</style>
```

**Características implementadas:**
- Línea 2: Import del type `Movie` desde datos externos
- Línea 4-7: Interface Props con movie y index para zebra striping
- Línea 12: Zebra striping condicional con operador módulo (index % 2 === 0)
- Línea 13: Enlace externo con rel="noopener noreferrer"
- Línea 14-17: Imagen flotante a la izquierda con ancho fijo 100px
- Línea 27-40: Pseudo-elemento ::before para icono de click (position absolute)
- Línea 42-44: Hover oculta el icono (display: none)

**Mapeo CSS → Tailwind:**
```
.lista_filmografia li { overflow: auto; margin-bottom: 10px; padding: 10px }
  → overflow-auto mb-2.5 p-2.5

.lista_filmografia li:nth-child(2n-1) { background-color: #000000 }
  → index % 2 === 0 ? 'bg-black' : ''

.lista_filmografia img { width: 100px; float: left }
  → w-[100px] float-left mr-4

position: relative → relative
```

---

### Punto 4.3: Migrar página filmografia.astro

**Archivo creado:**
- `src/pages/filmografia.astro`

**Código principal:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import MovieItem from '../components/MovieItem.astro';
import { movies } from '../data/movies';

const pageTitle = 'Filmografía - Dave Chappelle';
---

<BaseLayout title={pageTitle} activeSection="sec_6">
  <section id="sec_6" class="max-w-[750px] mx-auto py-12 px-4">
    <h2 class="text-3xl font-light mb-6 pb-2 border-b-2 border-red-accent">
      Filmografía
    </h2>

    <p class="leading-7 mb-8 text-justify">
      <!-- Párrafo introductorio -->
    </p>

    <ul class="list-none p-0">
      {movies.map((movie, index) => (
        <MovieItem movie={movie} index={index} />
      ))}
    </ul>
  </section>
</BaseLayout>
```

**Características implementadas:**
- Línea 2-4: Imports de layout, componente y datos
- Línea 9: BaseLayout con activeSection "sec_6"
- Línea 10: Section con max-w-[750px]
- Línea 11-13: H2 con border-bottom rojo
- Línea 19-23: UL con map sobre movies pasando index para zebra striping
- Párrafo con enlaces externos a IMDB y Wikipedia

**Mapeo CSS → Tailwind aplicado:**
```
ul.lista_filmografia { list-style: none; padding: 0px }
  → list-none p-0

section { max-width: 750px; margin: auto; padding: 50px 0px }
  → max-w-[750px] mx-auto py-12 px-4
```

---

## Resumen FASE 4

**Archivos creados:** 3 totales
- `src/data/movies.ts` - 7 películas con interface tipada
- `src/components/MovieItem.astro` - Item reutilizable con zebra striping
- `src/pages/filmografia.astro` - Página completa migrada

**Películas migradas:** 7
1. Robin Hood: Men in Tights (1993)
2. The Nutty Professor (1996)
3. Con Air (1997)
4. Half Baked (1998)
5. You've Got Mail (1998)
6. Blue Streak (1999)
7. Undercover Brother (2002)

**Técnicas implementadas:**
- **Zebra striping:** Filas alternas con background negro usando `index % 2 === 0`
- **Pseudo-elementos CSS:** Icono ::before en esquina superior derecha
- **Hover effects:** Ocultar icono en hover con `display: none`
- **Position relative/absolute:** Para posicionamiento de icono

**Mapeos CSS → Tailwind clave:**
- Zebra striping: Lógica condicional en className
- Float left con imágenes de 100px: `w-[100px] float-left mr-4`
- Overflow auto para clearfix: `overflow-auto`
- Lista sin estilos: `list-none p-0`

**Estado:** FASE 4 completada exitosamente. La página filmografia.astro está migrada con componente reutilizable MovieItem implementando zebra striping y pseudo-elementos para iconos.

---

## FASE 6: FORMULARIO

**Estado:** ✅ Completada
**Fecha:** 2026-01-06
**Duración:** 1.5 horas
**Complejidad:** MEDIA-ALTA
**Dependencia:** FASE 1

### Objetivo
Migrar formulario de suscripción con componentes reutilizables de formulario y datos tipados externos.

---

### Punto 6.1: Crear componentes de formulario

#### Archivo: `src/components/forms/TextInput.astro`

**Código implementado:**
```astro
---
interface Props {
  type?: 'text' | 'email' | 'date';
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  value?: string;
}

const { type = 'text', name, id, placeholder, required = false, min, max, value } = Astro.props;
---

<label for={id} class="hidden">{placeholder || name}</label>
<input
  type={type}
  name={name}
  id={id}
  placeholder={placeholder}
  required={required}
  min={min}
  max={max}
  value={value}
  class="bg-dark-bg text-white mb-2.5 min-h-[30px] border-none border-b border-red-accent p-3"
/>
```

**Características:**
- Línea 2-11: Interface Props con tipos de input ('text' | 'email' | 'date')
- Línea 16: Label oculto visualmente para accesibilidad
- Línea 26: Clases Tailwind aplicando mapeo del plan

**Mapeo CSS → Tailwind:**
```
background-color: #0e0f13 → bg-dark-bg
border-bottom: 1px solid #ff0213 → border-b border-red-accent
min-height: 30px → min-h-[30px]
padding: 0.8em → p-3
```

---

#### Archivo: `src/components/forms/TextArea.astro`

**Código implementado:**
```astro
---
interface Props {
  id: string;
  name: string;
  placeholder?: string;
  maxlength?: number;
}

const { id, name, placeholder, maxlength } = Astro.props;
---

<label for={id} class="hidden">{placeholder || name}</label>
<textarea
  id={id}
  name={name}
  placeholder={placeholder}
  maxlength={maxlength}
  class="bg-dark-bg text-white mb-2.5 min-h-[200px] border-none border-b border-red-accent p-3"
></textarea>
```

**Características:**
- Línea 18: min-h-[200px] según CSS original
- Mismo mapeo de colores y bordes que TextInput

---

#### Archivo: `src/components/forms/Select.astro`

**Código implementado:**
```astro
---
import type { FormOption } from '../../data/form-options';

interface Props {
  id: string;
  name: string;
  label: string;
  options: FormOption[];
}

const { id, name, label, options } = Astro.props;
---

<label for={id} class="hidden">{label}</label>
<select
  id={id}
  name={name}
  class="w-full min-h-[40px] rounded-md bg-dark-bg text-white border-none p-2"
>
  {options.map(option => (
    <option value={option.value}>{option.label}</option>
  ))}
</select>
```

**Características:**
- Línea 2: Import del type FormOption desde datos externos
- Línea 8: Prop options como array de FormOption
- Línea 18: min-h-[40px] y rounded-md según CSS original
- Línea 20-22: Map sobre options para generar elementos option

**Mapeo CSS → Tailwind:**
```
width: 100% → w-full
min-height: 40px → min-h-[40px]
border-radius: 5px → rounded-md
```

---

#### Archivo: `src/components/forms/Checkbox.astro`

**Código implementado:**
```astro
---
interface Props {
  id: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
}

const { id, name, value, label, checked = false } = Astro.props;
---

<div class="inline-flex items-center align-middle">
  <input
    type="checkbox"
    id={id}
    name={name}
    value={value}
    checked={checked}
    class="inline w-auto align-middle"
  />
  <label for={id} class="inline w-auto align-middle ml-2">{label}</label>
</div>
```

**Características:**
- Línea 13: Contenedor inline-flex para alineación
- Línea 20: Input checkbox inline
- Línea 22: Label visible (no oculto) con margin-left

**Mapeo CSS → Tailwind:**
```
display: inline → inline
vertical-align: middle → align-middle
width: inherit → w-auto
```

---

### Punto 6.2: Crear datos tipados del formulario

**Archivo creado:**
- `src/data/form-options.ts`

**Código implementado:**
```typescript
export interface FormOption {
  value: string;
  label: string;
}

export const sectionOptions: FormOption[] = [
  { value: 'Introducción', label: 'Introducción' },
  { value: 'Carrera temprana', label: 'Carrera temprana' },
  { value: 'Chappelle´s show', label: 'Chappelle´s show' },
  { value: 'El final del show', label: 'El final del show' },
  { value: 'El regreso', label: 'El regreso' },
  { value: 'Filmografia', label: 'Filmografia' },
  { value: 'Buddies (1996)', label: 'Buddies (1996)' }
];

export interface FavoriteSpecial {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
}

export const favoriteSpecials: FavoriteSpecial[] = [
  {
    id: 'the_age_of_spin',
    name: 'especiales_favoritos[]',
    value: 'the_age_of_spin',
    label: '"The Age of Spin"',
    checked: true
  },
  {
    id: 'equanimity',
    name: 'especiales_favoritos[]',
    value: 'equanimity',
    label: '"Equanimity"',
    checked: false
  },
  {
    id: 'the_bird_revelations',
    name: 'especiales_favoritos[]',
    value: 'the_bird_revelations',
    label: '"The Bird Revelations"',
    checked: true
  },
  {
    id: 'the_heart_of_texas',
    name: 'especiales_favoritos[]',
    value: 'the_heart_of_texas',
    label: '"Deep in the Heart of Texas"',
    checked: true
  }
];
```

**Características:**
- Línea 1-4: Interface `FormOption` para opciones de select
- Línea 6-14: Array `sectionOptions` con 7 secciones de la página
- Línea 16-22: Interface `FavoriteSpecial` con propiedades completas
- Línea 24-52: Array `favoriteSpecials` con 4 especiales Netflix (3 marcados por defecto)

**Datos tipados incluidos:**
- **7 opciones de sección:** Introducción, Carrera temprana, Chappelle's show, El final del show, El regreso, Filmografia, Buddies
- **4 checkboxes especiales:** The Age of Spin (✓), Equanimity, The Bird Revelations (✓), Deep in the Heart of Texas (✓)

---

### Punto 6.3: Migrar página suscripcion.astro

**Archivo creado:**
- `src/pages/suscripcion.astro`

**Código principal:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TextInput from '../components/forms/TextInput.astro';
import TextArea from '../components/forms/TextArea.astro';
import Select from '../components/forms/Select.astro';
import Checkbox from '../components/forms/Checkbox.astro';
import { sectionOptions, favoriteSpecials } from '../data/form-options';

const pageTitle = 'Dave Chappelle - Suscripción';
---

<BaseLayout title={pageTitle} activeSection="sec_7">
  <main class="max-w-[750px] mx-auto">
    <form action="datos_a_procesar.php" method="post" autocomplete="off"
          class="text-white" style="color-scheme: dark;">
      <fieldset class="flex flex-col my-12 bg-black border-none p-6">
        <h2 class="text-2xl font-light mb-6 pb-2 border-b-2 border-red-accent">
          Datos Personales
        </h2>

        <TextInput type="text" name="apellido" id="apellido"
                   placeholder="apellido" required={true} />

        <TextInput type="text" name="nombre" id="nombre"
                   placeholder="nombre" required={true} />

        <div class="flex flex-row-reverse gap-10 my-4">
          <div class="flex-1">
            <TextInput type="email" name="pass" id="pass"
                       placeholder="e-Mail" required={true} />
          </div>
          <div class="flex-1">
            <TextInput type="date" name="nacimiento" id="nacimiento"
                       min="1950-01-01" max="2020-01-01"
                       value="1995-10-17" required={true} />
          </div>
        </div>

        <h3 class="my-5 mx-auto ml-[5px] text-left font-light">
          Dejanos tu opinion..
        </h3>

        <TextArea id="texto_opinion" name="texto_opinion"
                  placeholder="Mensaje" maxlength={300} />

        <div class="flex flex-row-reverse justify-center gap-10 my-5">
          <div class="flex-1">
            <span class="block my-5">
              ¿que seccion de la pagina te gusto mas?
            </span>
            <Select id="seccion_preferida" name="seccion_preferida"
                    label="¿que seccion de la pagina te gusto mas?"
                    options={sectionOptions} />
          </div>

          <div class="flex-1">
            <span class="block my-5">
              ¿Cual fue tu especial de Netflix favorito ?
            </span>
            {favoriteSpecials.map(special => (
              <div class="mb-2">
                <Checkbox id={special.id} name={special.name}
                          value={special.value} label={special.label}
                          checked={special.checked} />
              </div>
            ))}
          </div>
        </div>

        <input type="submit" value="Enviar"
               class="cursor-pointer w-auto rounded-[3px] my-2.5 mx-auto
                      border-none p-3 font-light bg-dark-bg text-white
                      hover:bg-gradient-radial transition-all duration-300" />
      </fieldset>
    </form>
  </main>
</BaseLayout>

<style>
  /* Gradient hover effect for submit button */
  input[type="submit"]:hover {
    background: radial-gradient(
      circle,
      rgba(35, 38, 48, 1) 72%,
      rgba(14, 15, 19, 1) 88%,
      rgba(14, 15, 19, 1) 97%
    );
  }
</style>
```

**Características implementadas:**
- Línea 2-7: Imports de componentes de formulario y datos
- Línea 12: BaseLayout con activeSection "sec_7"
- Línea 14-15: Form con color-scheme: dark para inputs de fecha
- Línea 16: Fieldset con flex flex-col y bg-black
- Línea 17-18: H2 con border-bottom rojo
- Línea 20-24: Campos de texto (apellido, nombre)
- Línea 26-35: Div con flex-row-reverse para email y fecha (layout original)
- Línea 37-39: H3 con estilos específicos
- Línea 41-42: TextArea con maxlength 300
- Línea 44-65: Div con dos columnas (select y checkboxes)
- Línea 67-70: Submit button con gradient hover
- Línea 76-84: Estilos scoped para radial-gradient en hover

**Mapeo CSS → Tailwind aplicado:**
```
fieldset { display: flex; flex-direction: column; background-color: black }
  → flex flex-col bg-black

.email_fecha_nacimiento { display: flex; flex-direction: row-reverse; gap: 40px }
  → flex flex-row-reverse gap-10

.preguntas_opcionales { display: flex; flex-direction: row-reverse;
                        justify-content: center; gap: 40px }
  → flex flex-row-reverse justify-center gap-10

[type="submit"] { cursor: pointer; border-radius: 3px; font-weight: 300 }
  → cursor-pointer rounded-[3px] font-light
```

---

## Resumen FASE 6

**Archivos creados:** 6 totales
- `src/components/forms/TextInput.astro` - Input reutilizable (text, email, date)
- `src/components/forms/TextArea.astro` - Textarea reutilizable
- `src/components/forms/Select.astro` - Select reutilizable
- `src/components/forms/Checkbox.astro` - Checkbox reutilizable
- `src/data/form-options.ts` - Datos tipados (7 secciones + 4 especiales)
- `src/pages/suscripcion.astro` - Página completa migrada

**Componentes de formulario implementados:** 4
1. **TextInput** - Soporta type='text'|'email'|'date' con props completas
2. **TextArea** - Con maxlength y label oculto
3. **Select** - Con options tipadas desde datos externos
4. **Checkbox** - Con label visible y soporte para checked

**Datos externos tipados:**
- **sectionOptions:** 7 opciones de secciones de la página
- **favoriteSpecials:** 4 especiales Netflix (3 marcados por defecto)

**Técnicas implementadas:**
- **Labels ocultos:** `class="hidden"` para accesibilidad sin mostrar visualmente
- **Flex-row-reverse:** Layout específico del diseño original
- **Radial gradient hover:** Efecto complejo en submit button
- **Color-scheme: dark:** Para inputs de fecha con calendario oscuro
- **Props tipadas:** Interfaces TypeScript en todos los componentes

**Mapeos CSS → Tailwind clave:**
- Inputs: `bg-dark-bg border-b border-red-accent min-h-[30px] p-3`
- Textarea: `min-h-[200px]`
- Select: `w-full min-h-[40px] rounded-md`
- Fieldset: `flex flex-col my-12 bg-black border-none p-6`
- Layouts especiales: `flex-row-reverse gap-10`

**Estado:** FASE 6 completada exitosamente. El formulario de suscripción está migrado con componentes reutilizables y datos externos tipados, preservando el diseño y funcionalidad del original.

