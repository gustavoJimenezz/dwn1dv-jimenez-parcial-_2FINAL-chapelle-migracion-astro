# Planes de Migración a Astro + Tailwind CSS

Este documento presenta 2 estrategias diferentes para migrar el sitio de Dave Chappelle de HTML/CSS puro a Astro + Tailwind CSS.

---

## COMPARACIÓN RÁPIDA

| Aspecto | Plan 1: Incremental | Plan 2: Desde Cero |
|---------|---------------------|---------------------|
| **Enfoque** | Migrar componente por componente | Crear proyecto nuevo completo |
| **Tiempo estimado** | 13-16.5 horas | 15-22 horas |
| **Fases** | 10 fases (0-9) | 11 fases |
| **Riesgo** | Bajo (sitio funcional en cada paso) | Medio (big bang al final) |
| **Complejidad** | Media | Media-Alta |
| **Mejoras incluidas** | Responsive + Optimización imágenes + SEO | Todas desde el inicio |
| **Ideal para** | Equipos que necesitan despliegues graduales | Proyectos que pueden esperar migración completa |
| **Ventaja principal** | Menor riesgo, validación continua | Optimización desde el inicio |

**NOTA:** Este documento detalla únicamente el **Plan 1 (Incremental)**. Plan 2 pendiente de documentación.

---

# PLAN 1: MIGRACIÓN INCREMENTAL

## Filosofía
Migrar el sitio manteniendo funcionalidad en cada paso, permitiendo despliegues parciales y minimizando riesgo de errores.

**STACK TECNOLÓGICO:**
- ✅ **Astro** 4.x - Framework SSG
- ✅ **Tailwind CSS** 3.x - Utility-first CSS
- ✅ **TypeScript** 5.x - Type safety y mejor DX
- ✅ **Sharp** - Optimización de imágenes

## Fases del Plan Incremental

### FASE 0: PREPARACIÓN DEL ENTORNO
**Complejidad: BAJA** | **Duración: 30-45 minutos**

**Tareas:**
1. Inicializar proyecto Astro en paralelo (template: Empty)
2. Instalar y configurar Tailwind CSS (`npx astro add tailwind`)
3. Crear estructura de carpetas:
   ```
   /astro-dwn1dv-jimenez-parcial-_2FINAL-chapelle-migracion/
   ├── src/
   │   ├── layouts/
   │   ├── components/
   │   ├── pages/
   │   ├── data/
   │   └── styles/
   ├── public/
   │   ├── imagenes/
   │   └── favicon/
   ```
4. Copiar assets estáticos (imagenes/, favicon/)
5. Configurar tema Tailwind personalizado en `tailwind.config.mjs`:
   - Colores: `dark-bg: #0e0f13`, `red-accent: #ff0213`, `link-blue: #8cb4ff`, `darker: #000000`
   - Fuente: Open Sans (familia sans)
   - Configurar breakpoints responsive si necesario
6. Completar `public/site.webmanifest` con metadatos de la app:
   ```json
   {
     "name": "Dave Chappelle - Sitio Tributo",
     "short_name": "D. Chappelle",
     "theme_color": "#ff0213",
     "background_color": "#0e0f13",
     "display": "standalone"
   }
   ```
7. Configurar Google Fonts en BaseLayout preliminar

**Archivos creados:**
- `package.json`, `astro.config.mjs`, `tailwind.config.mjs`

**Testing:**
- Ejecutar `npm run dev` y verificar Astro + Tailwind funcionan
- Verificar acceso a imágenes en `/public/imagenes/`

---

### FASE 1: LAYOUT BASE Y COMPONENTES DE ESTRUCTURA
**Complejidad: MEDIA** | **Duración: 1.5-2 horas** | **Dependencia: FASE 0**

**Objetivo:** Crear layout base y componentes estructurales repetidos (Header, Nav, Footer).

**Tareas:**

**1.1 Crear Layout Base** (`/src/layouts/BaseLayout.astro`)
- Props: `title`, `activeSection`
- Estructura HTML5 completa + meta tags
- Google Fonts + Favicons
- Slot para contenido dinámico

**Mapeo CSS → Tailwind:**
```
body { background-color: #0e0f13 } → bg-dark-bg
font-family: 'Open Sans' → font-sans
font-size: 1.1em → text-lg
```

**1.2 Crear Navegación** (`/src/components/Navigation.astro`)
- Props: `activeSection`
- Datos externos: `/src/data/navigation.ts` (8 enlaces tipados)
- Clase dinámica `pagina_activada`
- Hover effect con border-bottom

**Mapeo CSS → Tailwind:**
```
nav { position: sticky; top: 0; z-index: 1 } → sticky top-0 z-10
background-color: #000000 → bg-darker
padding: 12px 0px → py-3
```

**1.3 Crear Header** (`/src/components/Header.astro`)
- Background parallax fixed
- 100% idéntico en todas las páginas

**Mapeo:**
```
background-attachment: fixed → bg-fixed
background-size: 1006px → bg-[length:1006px]
h1 { font-weight: 300; font-size: 3.5em } → font-light text-[3.5em]
```

**1.4 Crear Footer** (`/src/components/Footer.astro`)
- Datos externos: `/src/data/author.ts`, `/src/data/sources.ts`
- 99% idéntico (corregir inconsistencia en filmografia.html)

**1.5 Crear Botón Volver** (`/src/components/BackToTop.astro`)
- Props: `targetId`
- Fixed bottom-right

**Archivos creados:**
- 5 componentes + 3 archivos de datos

**Testing:**
- Crear página test con BaseLayout
- Verificar header, nav, footer, botón
- Probar hover effects

---

### FASE 2: PÁGINA INDEX (MIGRACIÓN COMPLETA)
**Complejidad: MEDIA** | **Duración: 1 hora** | **Dependencia: FASE 1**

**Objetivo:** Migrar completamente `/index.html` a Astro.

**Tareas:**

**2.1 Componente Imagen + Texto** (`/src/components/ImageTextContainer.astro`)
- Props: `imageSrc`, `imageAlt`, `imagePosition` ('left'|'right')
- Float image con texto envolvente

**2.2 Componente Galería GIFs** (`/src/components/GifGallery.astro`)
- Props: `gifs` (array)
- Display flex

**2.3 Migrar index** (`/src/pages/index.astro`)
- Usar BaseLayout
- 3 párrafos + GifGallery + ImageTextContainer

**Mapeo específico:**
```
section { max-width: 750px; margin: auto; padding: 50px 0px } →
  class="max-w-[750px] mx-auto py-12"
h2 { border-bottom: 2px solid #ff0213 } →
  class="border-b-2 border-red-accent"
```

**Archivos creados:**
- 3 archivos (index.astro + 2 componentes)

**Testing:**
- Comparar visualmente con `/index.html` original
- Verificar galería de 3 GIFs
- Verificar imagen HBO flota a la derecha

---

### FASE 3: COMPONENTES DE PERSONAJES
**Complejidad: MEDIA-ALTA** | **Duración: 1.5 horas** | **Dependencia: FASE 2**

**Objetivo:** Componentes reutilizables para tarjetas de personajes.

**Tareas:**

**3.1 Externalizar datos** (`/src/data/characters.ts`)
- 6 personajes tipados con interface `Character`
- Propiedades: id, name, image, gif, description

**3.2 Tarjeta de Personaje** (`/src/components/CharacterCard.astro`)
- Props: `character`
- Imagen float-left + texto

**Mapeo:**
```
.personajes > div { margin: 20px auto; overflow: auto } →
  class="my-5 overflow-auto text-justify"
.personajes img { width: 200px; float: left } →
  class="w-[200px] float-left"
```

**3.3 Galerías de GIFs** (Componentes reutilizables)
Crear 4 variaciones de galerías identificadas en el original:

- `/src/components/GifGallery.astro` - Horizontal básica (flex row)
  - Usado en index.astro (3 GIFs intro)

- `/src/components/CharacterGifGallery.astro` - Layout complejo para personajes
  - Combinación de `.gif_vertical` (flex column) + `.gif_grupo` (flex wrap)
  - gap: 20px entre items

**Mapeo CSS → Tailwind:**
```css
.gif_intro { display: flex; gap: 20px } → class="flex gap-5"
.personajes_gifs { display: flex; gap: 20px } → class="flex gap-5"
.gif_vertical { display: flex; flex-direction: column } → class="flex flex-col"
.gif_grupo { display: flex; flex-wrap: wrap; gap: 15px } → class="flex flex-wrap gap-4"
img { width: 200px } → class="w-[200px]"
```

**3.4 Migrar Chappelle's Show** (`/src/pages/chapelle-show.astro`)
- Map sobre `characters` array

**Archivos creados:**
- 1 data file + 3 componentes + 1 página

**Testing:**
- Verificar 6 tarjetas de personajes renderizadas correctamente
- Verificar imágenes flotan a la izquierda (200px width)
- Verificar layout complejo de galería GIFs (vertical + grupo)
- Verificar todos los 10 GIFs se cargan desde `/public/imagenes/gif/`
- Comparar visualmente con `/contenido/chapelle_show.html` original

---

### FASE 4: COMPONENTES DE FILMOGRAFÍA
**Complejidad: MEDIA-ALTA** | **Duración: 1.5 horas** | **Dependencia: FASE 2**

**Objetivo:** Componente de filmografía con datos externos.

**Tareas:**

**4.1 Externalizar datos** (`/src/data/movies.ts`)
- 7 películas tipadas con interface `Movie`
- Propiedades: id, title, year, image, url, description

**4.2 Item de Filmografía** (`/src/components/MovieItem.astro`)
- Props: `movie`, `index` (para zebra striping)
- Imagen float-left + título + descripción
- Icono "click" con pseudo-elemento

**Mapeo:**
```
.lista_filmografia li:nth-child(2n-1) { background-color: #000000 } →
  class={index % 2 === 0 ? 'bg-black' : ''}
```

**4.3 Migrar Filmografía** (`/src/pages/filmografia.astro`)
- UL con map sobre `movies`

**Archivos creados:**
- 1 data + 1 componente + 1 página

**Testing:**
- Verificar 7 items
- Verificar zebra striping
- Verificar hover effects

---

### FASE 5: COMPONENTES DE NETFLIX Y PÁGINAS DE CONTENIDO
**Complejidad: MEDIA** | **Duración: 2 horas** | **Dependencia: FASE 2**

**Objetivo:** Especiales Netflix y páginas restantes.

**Tareas:**

**5.1 Datos Netflix** (`/src/data/netflix-specials.ts`)
- 4 especiales tipados con interface `NetflixSpecial`

**5.2 Galería Netflix** (`/src/components/NetflixGallery.astro`)
- Flex-wrap gallery
- Hover outline blue

**5.3 Figura con Caption** (`/src/components/FigureWithCaption.astro`)
- HTML5 figure + figcaption
- Caption con bg rojo

**5.4 Migrar páginas:**
- `/src/pages/el-regreso.astro` (con NetflixGallery + enlaces externos Netflix)
- `/src/pages/carrera-temprana.astro` (con Figure)
- `/src/pages/el-final-del-show.astro`
- `/src/pages/buddies.astro`

**NOTA:** El HTML original NO contiene iframes de YouTube. Solo enlaces externos a Netflix y otras fuentes. Si se desean agregar embeds de video, hacerlo como mejora opcional en FASE 7.

**Archivos creados:**
- 1 data + 3 componentes + 4 páginas

**Testing:**
- Verificar galería 4 especiales Netflix con hover outline azul
- Verificar enlaces externos a Netflix funcionan (target="_blank")
- Verificar Figure con caption rojo en carrera-temprana.astro

---

### FASE 6: FORMULARIO
**Complejidad: MEDIA-ALTA** | **Duración: 1.5 horas** | **Dependencia: FASE 1**

**Objetivo:** Migrar formulario de suscripción.

**Tareas:**

**6.1 Componentes de formulario:**
- `/src/components/forms/TextInput.astro`
- `/src/components/forms/TextArea.astro`
- `/src/components/forms/Select.astro`
- `/src/components/forms/Checkbox.astro`

**Mapeo:**
```
input {
  background-color: #0e0f13;
  border-bottom: 1px solid #ff0213;
} → class="bg-dark-bg border-b border-red-accent"
```

**6.2 Datos del formulario** (`/src/data/form-options.ts`)
- Secciones (7 options) tipadas
- Especiales favoritos (4 checkboxes) tipados

**6.3 Migrar formulario** (`/src/pages/suscripcion.astro`)
- Form completo con fieldsets
- Submit button con gradient hover

**Archivos creados:**
- 4 componentes forms + 1 data + 1 página

**Testing:**
- Verificar campos de texto
- Verificar select con 7 opciones
- Verificar 3 checkboxes marcados por defecto
- Verificar hover gradient en submit

---

### FASE 7: OPTIMIZACIÓN Y REFINAMIENTO
**Complejidad: BAJA-MEDIA** | **Duración: 1-1.5 horas** | **Dependencia: FASES 1-6**

**Objetivo:** Optimizar estilos y refinar detalles.

**Tareas:**

**7.1 Estilos globales** (`/src/styles/global.css`)
- Animación para navegación activa (keyframes)
- Pseudo-elementos para hover effects
- Header gradient

**7.2 Refinar navegación**
- Agregar clase `pagina-activada` con animación

**7.3 Componente Blockquote** (`/src/components/Blockquote.astro`)

**7.4 Meta tags SEO en BaseLayout**
- Description, Open Graph, Twitter Card

**7.5 Verificar accesibilidad**
- Alt texts
- Labels ocultos
- Contraste colores

**7.6 Normalizar URLs**
- Rutas Astro (`/carrera-temprana` vs `/contenido/carrera_temprana.html`)

**Archivos creados/modificados:**
- 2 nuevos + modificaciones

**Testing:**
- Verificar animaciones
- Testing teclado
- Verificar meta tags

---

### FASE 8: DISEÑO RESPONSIVE
**Complejidad: MEDIA** | **Duración: 1.5-2 horas** | **Dependencia: FASES 1-7**

**Objetivo:** Agregar responsive design al sitio (NO presente en original HTML/CSS).

**IMPORTANTE:** El sitio original NO tiene media queries ni es responsive. Esta fase es una MEJORA sobre el original.

**Tareas:**

**8.1 Responsive Header**
- Ajustar tamaño de h1 en móviles
- Ajustar background-size del parallax
```css
/* Tailwind responsive */
h1: text-[2em] md:text-[3.5em]
background-size: bg-[600px] md:bg-[1006px]
```

**8.2 Responsive Navegación**
- Mobile: menu hamburguesa o stack vertical
- Desktop: horizontal como original
```css
nav: flex-col md:flex-row
gap-2 md:gap-6
```

**8.3 Responsive Layouts de Contenido**
- Secciones: padding reducido en móvil
- Imágenes flotantes: cambiar a block en móvil
```css
section: px-4 md:px-0, py-8 md:py-12
img flotante: float-none md:float-left, w-full md:w-[200px]
```

**8.4 Responsive Galerías**
- GIFs: stack vertical en móvil, horizontal en desktop
- Cards de películas: full-width en móvil
```css
.gif_intro: flex-col md:flex-row
.lista_filmografia img: w-full md:w-[100px]
```

**8.5 Responsive Formulario**
- Campos: full-width en móvil, inline en desktop
- Submit button: full-width en móvil
```css
.email_fecha_nacimiento: flex-col md:flex-row
[type="submit"]: w-full md:w-auto
```

**8.6 Breakpoints Tailwind Recomendados**
```javascript
// tailwind.config.mjs
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px'   // Large desktop
}
```

**Archivos modificados:**
- Todos los componentes con clases responsive
- `tailwind.config.mjs` (si se personalizan breakpoints)

**Testing:**
- Probar en Chrome DevTools (375px, 768px, 1024px, 1440px)
- Verificar navegación en móvil
- Verificar imágenes no desborden en móvil
- Verificar formulario usable en pantallas pequeñas
- Verificar galerías se adaptan correctamente

---

### FASE 9: BUILD Y DESPLIEGUE
**Complejidad: BAJA** | **Duración: 30-45 minutos** | **Dependencia: TODAS**

**Objetivo:** Build de producción y despliegue.

**Tareas:**

**9.1 Configurar Astro** (`astro.config.mjs`)
```javascript
{
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
}
```

**9.2 Optimización de Imágenes**
- Convertir JPGs grandes a WebP con fallback
- Implementar lazy loading nativo: `<img loading="lazy" />`
- Usar componente `<Image>` de Astro para optimización automática
- Considerar srcset para imágenes responsive:
  ```html
  <img
    srcset="imagen-300w.webp 300w, imagen-600w.webp 600w"
    sizes="(max-width: 768px) 100vw, 200px"
  />
  ```
- **CRÍTICO:** 43 imágenes (~6.5 MB) pueden reducirse significativamente

**9.3 Build**
```bash
npm run build
```

**9.4 Preview**
```bash
npm run preview
```

**9.5 Auditorías y Testing Final**
- Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
  - Target: Performance > 90
  - Accessibility > 95
- Verificar todas las rutas generadas en `/dist`
- Testing cross-browser (Chrome, Firefox, Safari, Edge)
- Verificar enlaces externos funcionan
- Testing responsive en dispositivos reales

**9.6 Documentación** (`README.md`)
- Comandos de desarrollo
- Estructura del proyecto
- Guía de deployment
- Créditos y fuentes

**9.7 Deploy**
Opciones recomendadas:
- **Netlify** - Drag & drop `/dist`, auto HTTPS
- **Vercel** - Soporte nativo Astro
- **GitHub Pages** - Gratis con GitHub Actions
- **Cloudflare Pages** - CDN global gratuito

**Archivos creados:**
- README.md, netlify.toml (opcional)

**Testing final:**
- Deploy a producción
- Testing completo en URL live

---

## RESUMEN PLAN INCREMENTAL

**Total: 10 fases (0-9) | 13-16.5 horas**

| Fase | Complejidad | Duración | Archivos | Notas |
|------|-------------|----------|----------|-------|
| 0 - Setup | Baja | 30-45m | 4 | Incluye config manifest |
| 1 - Layout | Media | 1.5-2h | 7 | Base + componentes estructura |
| 2 - Index | Media | 1h | 3 | Página principal + 2 componentes |
| 3 - Personajes | Media-Alta | 1.5h | 4 | 4 tipos de galerías GIF |
| 4 - Filmografía | Media-Alta | 1.5h | 3 | 7 películas con zebra striping |
| 5 - Netflix | Media | 2h | 7 | 4 especiales + 4 páginas contenido |
| 6 - Formulario | Media-Alta | 1.5h | 6 | 4 componentes form reutilizables |
| 7 - Optimización | Baja-Media | 1-1.5h | 3 | Animaciones, SEO, accesibilidad |
| 8 - Responsive | Media | 1.5-2h | Modif. | **MEJORA** - No en original |
| 9 - Deploy | Baja | 30-45m | 3 | Build + optimización imágenes |

**Total archivos nuevos: ~40**

**MEJORAS SOBRE EL ORIGINAL:**
- ✅ Diseño responsive (FASE 8) - Original NO es responsive
- ✅ Optimización de imágenes WebP + lazy loading (FASE 9.2)
- ✅ PWA manifest completo (FASE 0)
- ✅ SEO mejorado con meta tags (FASE 7.4)
- ✅ Build optimizado Astro SSG

---

## RECOMENDACIONES Y MEJORES PRÁCTICAS

### Gestión de Assets
**43 imágenes totales (~6.5 MB)** distribuidas:
- 28 JPG (retratos, películas, series)
- 10 GIF (animaciones en `/imagenes/gif/`)
- 5 PNG (logos, iconos)

**Optimizaciones recomendadas:**
1. Convertir JPGs grandes (>200KB) a WebP con fallback JPG
2. Comprimir GIFs o considerar conversión a video MP4 (mejor performance)
3. Usar `<Image>` de Astro para optimización automática
4. Implementar lazy loading en todas las imágenes below-the-fold

### Estructura de Datos Externos
Crear archivos en `/src/data/` para separar contenido de presentación usando **TypeScript**:

```typescript
// /src/data/navigation.ts
export interface NavLink {
  id: number;
  href: string;
  label: string;
  section: string;
}

export const navLinks: NavLink[] = [
  { id: 1, href: '/', label: 'Introducción', section: 'sec_1' },
  { id: 2, href: '/carrera-temprana', label: 'Carrera temprana', section: 'sec_2' },
  // ... 6 más
];

// /src/data/characters.ts
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
    description: '...'
  },
  // ... 5 más
];

// /src/data/movies.ts
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
    url: 'https://...',
    description: '...'
  },
  // ... 6 más
];

// /src/data/netflix-specials.ts
export interface NetflixSpecial {
  id: number;
  title: string;
  year: string;
  image: string;
  url: string;
}

export const netflixSpecials: NetflixSpecial[] = [
  // ... 4 especiales
];

// /src/data/form-options.ts
export interface FormOption {
  value: string;
  label: string;
}

export const sectionOptions: FormOption[] = [
  // ... 7 opciones
];

export const favoriteSpecials: FormOption[] = [
  // ... 4 checkboxes
];
```

### Uso de TypeScript en Componentes Astro
Los componentes Astro soportan TypeScript nativamente en el frontmatter script:

```astro
---
// /src/components/CharacterCard.astro
import type { Character } from '../data/characters';

interface Props {
  character: Character;
}

const { character } = Astro.props;
---

<div class="my-5 overflow-auto text-justify">
  <img
    src={character.image}
    alt={character.name}
    class="w-[200px] float-left"
  />
  <h3>{character.name}</h3>
  <p>{character.description}</p>
</div>
```

**Ventajas:**
- ✅ Autocompletado de propiedades en VS Code
- ✅ Detección de errores en tiempo de desarrollo
- ✅ Refactoring seguro
- ✅ Documentación implícita de props

**Ejemplo de uso en páginas:**
```astro
---
// /src/pages/chapelle-show.astro
import { characters } from '../data/characters';
import type { Character } from '../data/characters';
import CharacterCard from '../components/CharacterCard.astro';
import BaseLayout from '../layouts/BaseLayout.astro';

const pageTitle = "Chappelle's Show";
---

<BaseLayout title={pageTitle} activeSection="sec_3">
  <section>
    <h2>Personajes Memorables</h2>
    {characters.map((character: Character) => (
      <CharacterCard character={character} />
    ))}
  </section>
</BaseLayout>
```

### Animaciones CSS Críticas
El sitio original usa **1 animación keyframe principal**:

```css
@keyframes mianimacion {
  0%, 100% { border-bottom: 2px solid #ff0213; }
  50% { border-bottom: 2px solid #ffffff; }
}
```

**Implementación en Astro:**
- Agregar en `/src/styles/global.css`
- Aplicar a `.pagina-activada::after` en Navigation.astro
- Duración: 6 segundos, infinito, ease-in-out

### Pseudo-elementos Importantes
Mapear estos pseudo-elementos CSS en componentes Astro:

1. **Navegación activa** (`.pagina_activada::after`):
   - Border-bottom animado
   - Width: 100%, position: absolute

2. **Iconos de click** (`.especiales_netflix a::before`, `.lista_filmografia a::before`):
   - background-image: icono_click_black.png (20x20px)
   - position: absolute, top: 5px, right: 5px
   - Ocultar en hover: `display: none`

3. **Hover de navegación** (`nav a::after`):
   - Border-bottom rojo con transición 0.5s
   - Width: 0 → 100% en hover

### Accesibilidad (WCAG 2.1 AA)
Verificaciones críticas:
- ✅ Todos los `<img>` tienen `alt` descriptivo
- ✅ Labels de formulario presentes (ocultos visualmente pero accesibles)
- ✅ Contraste colores: #8cb4ff sobre #0e0f13 = 7.8:1 (AAA)
- ✅ Enlaces externos con `target="_blank"` incluir `rel="noopener noreferrer"`
- ⚠️ Navegación por teclado: verificar focus visible en todos los elementos interactivos
- ⚠️ Skip to content link recomendado para lectores de pantalla

### Consistencia de Datos
**Inconsistencia detectada en Footer:**
- 7 de 8 páginas tienen footer idéntico
- `filmografia.html` tiene variación menor en footer
- **Solución:** Usar componente único `Footer.astro` con datos de `/src/data/author.js` y `/src/data/sources.js`

### Performance Targets
Objetivos Lighthouse después de migración:
- **Performance:** > 90 (optimización imágenes + lazy loading + Astro SSG)
- **Accessibility:** > 95 (ya bien implementado en original)
- **Best Practices:** > 95 (HTTPS, meta tags, sin console errors)
- **SEO:** > 95 (meta descriptions, Open Graph, structured data)

### Rutas y URLs
Normalización de rutas HTML → Astro:

```
/index.html                      → /
/contenido/carrera_temprana.html → /carrera-temprana
/contenido/chapelle_show.html    → /chapelle-show
/contenido/el_final_del_show.html→ /el-final-del-show
/contenido/el_regreso.html       → /el-regreso
/contenido/filmografia.html      → /filmografia
/contenido/buddies.html          → /buddies
/contenido/formulario.html       → /suscripcion
```

**Ventajas:**
- URLs limpias sin extensión `.html`
- Kebab-case consistente
- Mejor para SEO
- Fácil configuración de redirects si necesario

---

## DEPENDENCIES Y HERRAMIENTAS

### NPM Packages Requeridos
```json
{
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "sharp": "^0.33.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0"
  }
}
```

**NOTA:** Astro incluye TypeScript por defecto. No requiere configuración adicional de `tsconfig.json` para funcionar.

### VSCode Extensions Recomendadas
- Astro (astro-build.astro-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Prettier (esbenp.prettier-vscode)

### Scripts NPM Útiles
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "format": "prettier --write ."
  }
}
```

---

## CHECKLIST FINAL DE MIGRACIÓN

### Pre-Migración
- [ ] Backup completo del proyecto original
- [ ] Análisis de todas las páginas HTML (8 páginas)
- [ ] Inventario de assets (43 imágenes, 11 favicons)
- [ ] Mapeo CSS → Tailwind completo

### Durante Migración
- [ ] Completar FASE 0 (Setup)
- [ ] Completar FASE 1 (Layout base)
- [ ] Completar FASE 2 (Index)
- [ ] Completar FASE 3 (Personajes)
- [ ] Completar FASE 4 (Filmografía)
- [ ] Completar FASE 5 (Netflix + Contenido)
- [ ] Completar FASE 6 (Formulario)
- [ ] Completar FASE 7 (Optimización)
- [ ] Completar FASE 8 (Responsive)
- [ ] Completar FASE 9 (Build + Deploy)

### Post-Migración
- [ ] Comparación visual 1:1 con original (todas las páginas)
- [ ] Testing responsive (móvil, tablet, desktop)
- [ ] Lighthouse audit (4 categorías > 90)
- [ ] Testing cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Verificar todos los enlaces externos funcionan
- [ ] Testing de formulario (validación HTML5)
- [ ] Verificar todas las animaciones funcionan
- [ ] Testing de accesibilidad con lector de pantalla
- [ ] Performance testing (tiempo de carga < 3s)
- [ ] Deploy a producción
- [ ] Documentación en README.md

---

**FIN DEL PLAN DE MIGRACIÓN INCREMENTAL**