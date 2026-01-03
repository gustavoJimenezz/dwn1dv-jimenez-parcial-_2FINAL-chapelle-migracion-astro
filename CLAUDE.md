# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Descripción del Proyecto

Este repositorio contiene un sitio web tributo a Dave Chappelle que está siendo migrado de HTML/CSS puro a Astro + Tailwind CSS. El proyecto sigue un plan de migración incremental detallado documentado en `planes-migracion-astro.md`.

**Origen:** `/dwn1dv-jimenez-parcial-_2FINAL-chapelle/` - Sitio original HTML/CSS
**Destino:** Sitio estático Astro + Tailwind CSS

## Flujo de Trabajo de Migración

Este proyecto tiene un flujo de documentación específico definido en `documentar-migracion.md`:

1. Al trabajar en tareas de migración, siempre consultar `planes-migracion-astro.md` para la fase actual
2. Documentar todos los cambios en `documentacion-migracion-astro.md` (crear si no existe)
3. Para cada paso de migración, documentar:
   - Fase y tarea actual del plan de migración
   - Archivos editados
   - Cambios realizados

**Importante:** Solo documentar cuando se trabaje explícitamente con el contexto del plan de migración.

## Arquitectura y Sistema de Diseño

### Paleta de Colores
- **Fondo oscuro:** `#0e0f13` → Tailwind: `bg-dark-bg`
- **Acento rojo:** `#ff0213` → Tailwind: `border-red-accent`
- **Azul de enlaces:** `#8cb4ff` → Tailwind: `text-link-blue`
- **Secciones negras:** `#000000` → Tailwind: `bg-black`

### Tipografía
- **Fuente:** Open Sans (vía Google Fonts)
- **Tamaño base:** `1.1em` → Tailwind: `text-lg`
- **Altura de línea:** `28px`

### Patrones de Layout Clave

**Header:**
- Fondo parallax fijo (`background-attachment: fixed`)
- Tamaño de fondo: `1006px`
- Gradiente sobre h1
- Borde inferior: 2px sólido acento rojo

**Navegación:**
- Posicionamiento sticky (`position: sticky; top: 0`)
- Indicador de página activa con animación pulsante (keyframes `mianimacion`)
- Efecto hover: subrayado rojo animado (pseudo-elemento `::after`)

**Footer:**
- Consistente en todas las páginas (excepto inconsistencia menor en filmografia.html)
- Contiene información del autor y enlaces de fuentes
- Imagen flota a la izquierda

### Patrones de Componentes

**Tarjetas de Personajes** (`/contenido/chapelle_show.html`):
- Imagen flota a la izquierda (ancho 200px)
- Texto justificado
- Overflow auto para clearfix

**Items de Películas** (`/contenido/filmografia.html`):
- Rayado zebra: `li:nth-child(2n-1)` tiene fondo negro
- Icono de click con pseudo-elemento (`::before`)
- Hover: contorno azul en imágenes

**Galería Netflix** (`/contenido/el_regreso.html`):
- Layout flex wrap
- Icono de click con pseudo-elemento
- Hover: contorno azul (2px sólido #8cb4ff)

**Componentes de Formulario** (`/contenido/formulario.html`):
- Esquema de color oscuro (`color-scheme: dark`)
- Inputs: fondo oscuro con borde inferior rojo
- Botón submit: gradiente radial en hover
- Labels ocultos (accesibilidad vía placeholder)

**Galerías de GIFs:**
- `.gif_intro`: display flex horizontal
- `.personajes_gifs`: layout complejo con variaciones verticales y agrupadas
- `.gif_vertical`: flex column
- `.gif_grupo`: flex wrap con gap

## Comandos de Desarrollo

**Nota:** En el estado inicial del repositorio, aún no hay un proyecto Astro inicializado. Estos comandos estarán disponibles después de la configuración de FASE 0:

```bash
# Inicializar proyecto Astro (FASE 0)
npm create astro@latest -- --template empty

# Instalar Tailwind CSS
npx astro add tailwind

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa de build de producción
npm run preview
```

## Estructura del Plan de Migración

La migración sigue un enfoque incremental de 9 fases (detallado en `planes-migracion-astro.md`):

1. **FASE 0:** Configuración del entorno (config Astro + Tailwind, estructura de carpetas, assets estáticos)
2. **FASE 1:** Layout base y componentes estructurales (Header, Nav, Footer)
3. **FASE 2:** Migración de página index
4. **FASE 3:** Componentes de personajes (Chappelle's Show)
5. **FASE 4:** Componentes de filmografía
6. **FASE 5:** Especiales de Netflix y páginas de contenido
7. **FASE 6:** Componentes de formulario
8. **FASE 7:** Optimización y refinamiento (animaciones, SEO, accesibilidad)
9. **FASE 8:** Build y despliegue

Cada fase incluye mapeos específicos de CSS → Tailwind y requisitos de testing.

## Estructura de Archivos (Post-Migración)

```
/src/
├── layouts/
│   └── BaseLayout.astro          # Layout principal con meta tags, fuentes
├── components/
│   ├── Navigation.astro          # Nav sticky con estado activo
│   ├── Header.astro              # Header parallax
│   ├── Footer.astro              # Info autor + fuentes
│   ├── BackToTop.astro           # Botón fijo abajo-derecha
│   ├── ImageTextContainer.astro  # Imagen flotante con texto envolvente
│   ├── GifGallery.astro          # Display horizontal de GIFs
│   ├── CharacterCard.astro       # Personajes de Chappelle's Show
│   ├── CharacterGifGallery.astro # Layout complejo vertical/agrupado
│   ├── MovieItem.astro           # Filmografía con rayado zebra
│   ├── NetflixGallery.astro      # Grid de especiales Netflix
│   ├── FigureWithCaption.astro   # Figure HTML5 con caption rojo
│   ├── Blockquote.astro          # Citas estilizadas
│   └── forms/
│       ├── TextInput.astro
│       ├── TextArea.astro
│       ├── Select.astro
│       └── Checkbox.astro
├── pages/
│   ├── index.astro               # Introducción
│   ├── carrera-temprana.astro    # Carrera temprana
│   ├── chapelle-show.astro       # Chappelle's Show
│   ├── el-final-del-show.astro   # Final del show
│   ├── el-regreso.astro          # Regreso a Netflix
│   ├── filmografia.astro         # Lista de películas
│   ├── buddies.astro             # Serie TV Buddies
│   └── suscripcion.astro         # Formulario de suscripción
├── data/
│   ├── navigation.js             # 8 enlaces de navegación
│   ├── author.js                 # Info del autor para footer
│   ├── sources.js                # Bibliografía del footer
│   ├── characters.js             # 6 personajes de Chappelle's Show
│   ├── movies.js                 # 7 películas
│   ├── netflix-specials.js       # 4 especiales de Netflix
│   └── form-options.js           # Datos de select/checkbox del formulario
└── styles/
    └── global.css                # Animaciones, pseudo-elementos

/public/
├── imagenes/                     # Todas las imágenes (jpg, gif, png)
└── favicon/                      # Assets de favicon
```

## Consideraciones Importantes

### Especificidad CSS
El sitio original usa dos archivos CSS:
- `estilo.css`: Estilos base (body, header, nav, footer, elementos generales)
- `estilo_clases.css`: Clases de componentes específicos de página

Al migrar, mantener exactamente la jerarquía visual y efectos hover.

### Animaciones
- `.pagina_activada` usa una animación keyframe infinita de 6 segundos con brillo rojo
- Hover de navegación usa transiciones CSS (transición de width de 0.5s en `::after`)
- Botón submit del formulario tiene hover con gradiente radial

### Notas de Accesibilidad
- Labels del formulario están ocultos pero presentes (accesibles para lectores de pantalla)
- Todas las imágenes tienen texto alt en el HTML original
- Los colores de enlaces tienen contraste suficiente (#8cb4ff sobre fondo oscuro)

### Inconsistencias a Corregir
- El footer en `filmografia.html` difiere ligeramente de otras páginas - normalizar durante migración
- Asegurar que todas las páginas usen datos consistentes de autor y enlaces de fuentes

## Rutas de Assets
- Imágenes originales: `/dwn1dv-jimenez-parcial-_2FINAL-chapelle/imagenes/`
- Favicons originales: `/dwn1dv-jimenez-parcial-_2FINAL-chapelle/favicon/`
- Assets públicos Astro: Copiar a `/public/imagenes/` y `/public/favicon/`

## Dependencias Externas
- **Google Fonts:** Open Sans (pesos: 300, 400, 700)
- **Embeds de YouTube:** Usado en el-regreso.astro para trailers de especiales Netflix
- **Enlaces Netflix:** Enlaces externos a contenido de Netflix

## Checklist de Testing (Por Fase)
- Comparación visual con páginas HTML originales
- Verificar todos los efectos hover y animaciones
- Verificar comportamiento responsive
- Probar estado activo de navegación
- Validar enlaces y recursos externos
- Accesibilidad: navegación por teclado, textos alt
- Compatibilidad entre navegadores
