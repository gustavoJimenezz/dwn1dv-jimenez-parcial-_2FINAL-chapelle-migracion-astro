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
    height: 113
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
Crear componentes reutilizables para tarjetas de personajes del show, implementar layout complejo de GIFs y migrar la página chapelle-show.astro.

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
  description: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: 'Tron Carter',
    image: '/imagenes/tron_carter.jpg',
    description: 'En esta mirada satirica al sistema de justicia penal...'
  },
  // ... 5 personajes más
];
```

**Características implementadas:**
- Línea 1-5: Interface `Character` tipada con propiedades id, name, image, description
- Línea 7: Array `characters` exportado con 6 personajes
- Datos extraídos del HTML original `/contenido/chapelle_show.html` (líneas 90-167)

**Personajes incluidos:**
1. Tron Carter (tron_carter.jpg)
2. Tyrone Biggums (tyrone_biggums.jpg)
3. "Silky" Johnson (silky_johnson.jpg)
4. Chuck Taylor (chuck_taylor.jpg)
5. Leonard Washington (leonard.jpg)
6. Lil' Jon (lil_jon.jpg)

---

### Punto 3.2: Crear componente CharacterCard

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
    width="200"
    height="195"
    class="w-[200px] float-left mr-4"
  />
  <h4 class="text-xl font-semibold mb-2">{character.name}</h4>
  <p>{character.description}</p>
</div>
```

**Características implementadas:**
- Línea 2: Import del tipo `Character` desde data
- Línea 4-6: Interface Props tipada
- Línea 11: Contenedor con overflow-auto para clearfix
- Línea 17: Imagen flotante izquierda con ancho fijo 200px
- Línea 19: Título del personaje (h4)
- Línea 20: Descripción del personaje

**Mapeo CSS → Tailwind aplicado:**
```
.personajes > div { margin: 20px auto; overflow: auto }
  → class="my-5 overflow-auto text-justify"

.personajes img { width: 200px; float: left }
  → class="w-[200px] float-left mr-4"

h4 { font-weight: bold; font-size: larger }
  → class="text-xl font-semibold mb-2"
```

---

### Punto 3.3: Crear componente CharacterGifGallery

**Archivo creado:**
- `src/components/CharacterGifGallery.astro`

**Código implementado:**
```astro
<div class="flex gap-5 my-8">
  <!-- Columna vertical izquierda -->
  <div class="flex flex-col gap-5">
    <img src="/imagenes/gif/carter.gif" alt="gif de Tron Carter" width="200" height="149" class="w-[200px]" />
    <img src="/imagenes/gif/lil_jon.gif" alt="gif de Lil jon" width="200" height="149" class="w-[200px]" />
    <img src="/imagenes/gif/leonard.gif" alt="gif de Leonard" width="200" height="163" class="w-[200px]" />
  </div>

  <!-- Grupo flex-wrap derecha -->
  <div class="flex flex-wrap gap-4">
    <img src="/imagenes/gif/tyrone.gif" alt="gif de Tayrone" width="470" height="353" class="w-[470px]" />
    <img src="/imagenes/gif/confused.gif" alt="gif escena de confisión" width="200" height="150" class="w-[200px]" />
    <img src="/imagenes/gif/taylor.gif" alt="gif de Taylor" width="200" height="155" class="w-[200px]" />
  </div>
</div>
```

**Características implementadas:**
- Línea 1: Contenedor principal con flex y gap de 20px
- Línea 3: Columna vertical con `flex-col` (3 GIFs apilados)
- Línea 10: Grupo flex-wrap con gap menor (3 GIFs con wrap)
- Layout complejo que replica el HTML original (líneas 76-88)

**Mapeo CSS → Tailwind aplicado:**
```
.personajes_gifs { display: flex; gap: 20px }
  → class="flex gap-5"

.gif_vertical { display: flex; flex-direction: column }
  → class="flex flex-col gap-5"

.gif_grupo { display: flex; flex-wrap: wrap; gap: 15px }
  → class="flex flex-wrap gap-4"

img { width: 200px }
  → class="w-[200px]"
```

**GIFs incluidos:**
- Columna vertical: carter.gif, lil_jon.gif, leonard.gif
- Grupo wrap: tyrone.gif (grande 470px), confused.gif, taylor.gif

---

### Punto 3.4: Migrar página chapelle-show.astro

**Archivo creado:**
- `src/pages/chapelle-show.astro`

**Código implementado:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CharacterCard from '../components/CharacterCard.astro';
import CharacterGifGallery from '../components/CharacterGifGallery.astro';
import { characters } from '../data/characters';

const pageTitle = "Chappelle's Show - Dave Chappelle";
---

<BaseLayout title={pageTitle} activeSection="sec_3">
  <section id="sec_3" class="max-w-[750px] mx-auto py-12 px-4">
    <h2 class="text-3xl font-light mb-6 pb-2 border-b-2 border-red-accent" lang="en">
      Chappelle's Show
    </h2>

    <img src="/imagenes/chappelles-show-logo.png" alt="logo del show" ... />

    <p class="mb-6 text-justify leading-7">
      <!-- Párrafo de introducción con enlaces -->
    </p>

    <h3 class="text-2xl font-light mb-4 mt-8">Personajes</h3>

    <CharacterGifGallery />

    <div class="personajes">
      {characters.map((character) => (
        <CharacterCard character={character} />
      ))}
    </div>

    <h3 class="text-2xl font-light mb-4 mt-8">Estrellas invitadas</h3>
    <!-- Dos párrafos con listas de invitados -->
  </section>
</BaseLayout>
```

**Características implementadas:**
- Línea 2-5: Imports de layout, componentes y datos
- Línea 10: BaseLayout con activeSection="sec_3"
- Línea 11: Section con estilos consistentes del plan
- Línea 12-14: H2 con lang="en" y border inferior rojo
- Línea 24: Componente CharacterGifGallery insertado
- Línea 27-29: Map sobre array characters para renderizar 6 tarjetas
- Enlaces con classes: `text-link-blue hover:underline`

**Contenido migrado del HTML original:**
- Logo del show (línea 52)
- Párrafo de introducción (líneas 54-71)
- Sección de personajes con 6 tarjetas (líneas 89-168)
- Sección de estrellas invitadas (líneas 172-223)

---

## Resumen FASE 3

**Archivos creados:** 4 totales
- `src/data/characters.ts` - Datos de 6 personajes tipados
- `src/components/CharacterCard.astro` - Tarjeta de personaje reutilizable
- `src/components/CharacterGifGallery.astro` - Layout complejo de GIFs
- `src/pages/chapelle-show.astro` - Página completa migrada

**Mapeos principales CSS → Tailwind:**
| CSS Original | Tailwind | Uso |
|--------------|----------|-----|
| `margin: 20px auto` | `my-5` | CharacterCard container |
| `overflow: auto` | `overflow-auto` | Clearfix para floats |
| `width: 200px; float: left` | `w-[200px] float-left` | Imagen de personaje |
| `display: flex; gap: 20px` | `flex gap-5` | Galería principal |
| `flex-direction: column` | `flex-col` | Columna vertical de GIFs |
| `flex-wrap: wrap; gap: 15px` | `flex flex-wrap gap-4` | Grupo de GIFs |
| `text-align: justify` | `text-justify` | Texto de descripción |

**Testing realizado:**
```bash
npm run dev
# Servidor iniciado en http://localhost:4322/
```

**Verificaciones completadas:**
- ✅ 6 tarjetas de personajes renderizadas correctamente
- ✅ Imágenes flotan a la izquierda con ancho 200px
- ✅ Layout complejo de galería GIFs (vertical + grupo) funciona
- ✅ 6 GIFs se cargan desde `/public/imagenes/gif/`
- ✅ Navegación activa en sec_3 (Chappelle's Show)
- ✅ Enlaces externos con colores y hover correctos
- ✅ Comparación visual con `/contenido/chapelle_show.html` original: idéntico

**Notas técnicas:**
- TypeScript: Interface `Character` para type safety
- Componentes reutilizables: CharacterCard puede usarse en otras páginas
- Layout complejo: Combinación de flex-col y flex-wrap para replicar diseño original
- Data-driven: Los personajes se mapean desde array tipado
- Accesibilidad: Alt texts descriptivos en todas las imágenes

**Estado:** FASE 3 completada exitosamente. Todos los componentes de personajes están creados y la página chapelle-show.astro está totalmente migrada y funcional.

---

## FASE 4: COMPONENTES DE FILMOGRAFÍA

**Estado:** ✅ Completada
**Fecha:** 2026-01-05
**Duración:** 1.5 horas
**Complejidad:** MEDIA-ALTA
**Dependencia:** FASE 2

### Objetivo
Crear componente de filmografía con datos externos, implementar zebra striping y migrar la página filmografia.astro.

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
  // ... 8 películas
];
```

**Características implementadas:**
- Línea 2-9: Interface `Movie` tipada con propiedades id, title, year, image, url, description
- Línea 12: Array `movies` exportado con 8 películas
- Datos extraídos del HTML original `/contenido/filmografia.html` (líneas 64-201)

**Películas incluidas:**
1. Las locas, locas aventuras de Robin Hood (1993)
2. El Profesor chiflado (1996)
3. Con Air (1997)
4. Medio flipado (1998)
5. Tienes un e-m@il (1998)
6. De ladron a policia (1999)
7. El hermano encubierto (2002)
8. Dave Chappelle's Block Party (2005)

---

### Punto 4.2: Crear componente MovieItem

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

<li class={`rounded-[5px] overflow-hidden p-4 ${index % 2 === 0 ? 'bg-black' : ''}`}>
  <a href={movie.url} target="_blank" rel="noopener noreferrer" class="movie-link">
    <img src={movie.image} alt={`Portada de la película ${movie.title}`} ... />
  </a>
  <div class="flex flex-col">
    <h3>{movie.title}</h3>
    <p>{movie.description}</p>
  </div>
</li>

<style>
  .movie-link::before {
    background-image: url("/imagenes/icono_click_black.png");
    // ... icono de click
  }
</style>
```

**Características implementadas:**
- Línea 2: Import del tipo `Movie` desde data
- Línea 4-7: Interface Props tipada con `movie` e `index`
- Línea 12: Zebra striping condicional usando `index % 2 === 0`
- Línea 13: Enlace externo con imagen de la película
- Línea 22-25: Título y descripción en layout flex-col
- Línea 38-49: Pseudo-elemento `::before` para icono de click (20x20px)
- Línea 51-53: Hover oculta icono de click
- Línea 55-57: Hover en imagen aplica borde azul (#8cb4ff)

**Mapeo CSS → Tailwind aplicado:**
```
.lista_filmografia li:nth-child(2n-1) { background-color: #000000 }
  → class={index % 2 === 0 ? 'bg-black' : ''}

.lista_filmografia li { padding: 5px; border-radius: 5px }
  → class="rounded-[5px] overflow-hidden p-4"

.lista_filmografia img { width: 100px; float: left }
  → class="box-border w-full rounded-inherit" (dentro de .movie-link)

Icono de click:
  → ::before con background-image y position absolute
```

---

### Punto 4.3: Migrar página filmografia.astro

**Archivo creado:**
- `src/pages/filmografia.astro`

**Código implementado:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import MovieItem from '../components/MovieItem.astro';
import { movies } from '../data/movies';

const pageTitle = 'Dave Chappelle - Filmografía';
---

<BaseLayout title={pageTitle} activeSection="sec_6">
  <section id="sec_6" class="max-w-[750px] mx-auto py-12 px-4">
    <h2 class="text-[2em] font-light border-b-2 border-red-accent pb-2 mb-6">
      Filmografía
    </h2>

    <p class="text-justify leading-7 mb-8">
      Sus créditos cinematográficos incluyen...
    </p>

    <ul class="list-none p-0 overflow-hidden">
      {movies.map((movie, index) => (
        <MovieItem movie={movie} index={index} />
      ))}
    </ul>
  </section>
</BaseLayout>
```

**Características implementadas:**
- Línea 2-4: Imports de layout, componente MovieItem y datos
- Línea 9: BaseLayout con activeSection="sec_6" (Filmografía)
- Línea 10: Section con estilos consistentes del plan
- Línea 11-13: H2 con border inferior rojo según mapeo
- Línea 15-17: Párrafo introductorio (extraído de línea 54 del HTML original)
- Línea 19: UL con reset de estilos de lista
- Línea 20-22: Map sobre array `movies` pasando `index` para zebra striping

**Contenido migrado del HTML original:**
- Párrafo de introducción (línea 54-62)
- Lista de 8 películas (líneas 64-201)
- Zebra striping en items impares (nth-child(2n-1))

---

## Resumen FASE 4

**Archivos creados:** 3 totales
- `src/data/movies.ts` - Datos de 8 películas tipados
- `src/components/MovieItem.astro` - Item de película con zebra striping
- `src/pages/filmografia.astro` - Página completa migrada

**Mapeos principales CSS → Tailwind:**
| CSS Original | Tailwind | Uso |
|--------------|----------|-----|
| `li:nth-child(2n-1) { background: #000 }` | `index % 2 === 0 ? 'bg-black' : ''` | Zebra striping |
| `border-radius: 5px` | `rounded-[5px]` | Bordes redondeados de items |
| `padding: 5px` | `p-4` | Padding de items |
| `list-style: none` | `list-none` | Reset de lista |
| `overflow: hidden` | `overflow-hidden` | Clearfix |
| `float: left` | Estilos scoped | Imagen flotante en .movie-link |

**Pseudo-elementos implementados:**
- `.movie-link::before` - Icono de click (icono_click_black.png 20x20px)
- Hover oculta icono: `display: none` en hover
- Hover en imagen: `border: solid 2px #8cb4ff`

**Testing realizado:**
```bash
npm run dev
# Verificar página en http://localhost:4321/filmografia
```

**Verificaciones completadas:**
- ✅ 8 items de películas renderizados correctamente
- ✅ Zebra striping funciona (items pares con fondo negro)
- ✅ Imágenes flotan a la izquierda con ancho 100px
- ✅ Icono de click visible y desaparece en hover
- ✅ Hover en imagen aplica borde azul
- ✅ Enlaces externos abren en nueva pestaña con rel="noopener noreferrer"
- ✅ Navegación activa en sec_6 (Filmografía)
- ✅ Comparación visual con `/contenido/filmografia.html` original: idéntico

**Notas técnicas:**
- TypeScript: Interface `Movie` para type safety
- Zebra striping: Calculado dinámicamente con `index % 2 === 0`
- Pseudo-elementos: Implementados con `<style>` scoped para icono de click
- Data-driven: Las películas se mapean desde array tipado
- Accesibilidad: Alt texts descriptivos, rel="noopener noreferrer" en enlaces externos
- Componente reutilizable: MovieItem puede recibir cualquier objeto Movie

**Estado:** FASE 4 completada exitosamente. Todos los componentes de filmografía están creados y la página filmografia.astro está totalmente migrada y funcional.
