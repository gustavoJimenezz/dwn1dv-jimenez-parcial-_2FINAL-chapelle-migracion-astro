# Dave Chappelle - Sitio Web Tributo

Sitio web dedicado al comediante Dave Chappelle, migrado de HTML/CSS estático a **Astro + TailwindCSS v4**.

---

## Sobre el Proyecto

### Consigna Original

Página web estática que cumple con las buenas prácticas de usabilidad, accesibilidad y semántica, manteniendo coherencia y claridad en el contenido.

**Requisitos técnicos cumplidos:**
- Mínimo de 6 secciones semánticas (8 páginas implementadas)
- Formulario funcional de suscripción
- HTML semántico con buena cohesión y acoplamiento
- Etiquetas `<meta>` correctas para SEO
- Anatomía HTML correcta: apertura/cierre, nombres en minúscula
- Atributos correctamente implementados
- Atributo `lang` definido en el documento
- Comentarios organizadores en el código
- Estructura de directorios ordenada
- Enlaces claros y navegación intuitiva
- Imágenes optimizadas manteniendo calidad original

### Proyecto Migrado

Este sitio representa la evolución del proyecto original HTML/CSS hacia un framework moderno, aplicando:
- **Componentización**: Separación de UI en componentes reutilizables
- **Data-Driven**: Contenido externalizado en archivos TypeScript
- **Estilos Utilitarios**: Migración de CSS tradicional a TailwindCSS v4
- **Diseño Responsive**: Adaptación a múltiples dispositivos (mejora sobre el original)
- **Optimización**: Build estático optimizado con Astro SSG

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (localhost:4321)
npm run dev

# Construir sitio de producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## Estructura del Proyecto

```
src/
├── assets/
│   └── imagenes/        # Imágenes optimizadas con Astro
├── components/          # Componentes Astro reutilizables
│   ├── BackToTop.astro
│   ├── Blockquote.astro
│   ├── CharacterCard.astro
│   ├── CharacterGifGallery.astro
│   ├── FigureWithCaption.astro
│   ├── Footer.astro
│   ├── GifGallery.astro
│   ├── Header.astro
│   ├── ImageTextContainer.astro
│   ├── MovieItem.astro
│   ├── Navigation.astro
│   ├── NetflixGallery.astro
│   └── forms/           # Componentes de formulario
│       ├── Checkbox.astro
│       ├── Select.astro
│       ├── TextArea.astro
│       └── TextInput.astro
├── data/                # Datos estructurados en TypeScript
│   ├── author.ts        # Información del autor
│   ├── characters.ts    # Personajes de Chappelle's Show
│   ├── form-options.ts  # Opciones del formulario
│   ├── movies.ts        # Filmografía
│   ├── navigation.ts    # Enlaces de navegación
│   ├── netflix-specials.ts # Especiales de Netflix
│   └── sources.ts       # Fuentes bibliográficas
├── layouts/
│   └── BaseLayout.astro # Layout principal
├── pages/               # Páginas (rutas automáticas)
│   ├── index.astro
│   ├── carrera-temprana.astro
│   ├── chapelle-show.astro
│   ├── el-final-del-show.astro
│   ├── el-regreso.astro
│   ├── filmografia.astro
│   ├── buddies.astro
│   └── suscripcion.astro
└── styles/
    └── global.css       # Tema TailwindCSS v4

public/
├── favicon/             # Favicons del sitio
└── imagenes/            # Imágenes estáticas y GIFs
```

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Astro** | 5.16.6 | Framework SSG |
| **TailwindCSS** | 4.1.18 | Estilos utilitarios |
| **TypeScript** | 5.x | Tipado de datos |

---

## Migración con Claude Code

### Objetivo del Proyecto

Aprender a usar **Claude Code** (claude.ai/code) como herramienta de asistencia para desarrollo, aplicando las funcionalidades principales:
- Planificación de tareas con archivo de fases
- Configuración de contexto mediante `CLAUDE.md`
- Comandos personalizados para automatización
- Migración incremental con validación en cada paso

### Fases de la Migración

La migración se ejecutó siguiendo un plan incremental de 10 fases:

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Preparación del entorno Astro + Tailwind | Completada |
| 1 | Layout base y componentes estructurales | Completada |
| 2 | Migración de página index | Completada |
| 3 | Componentes de personajes | Completada |
| 4 | Componentes de filmografía | Completada |
| 5 | Netflix y páginas de contenido | Completada |
| 6 | Formulario de suscripción | Completada |
| 7 | Optimización y refinamiento | Completada |
| 8 | Diseño responsive | Completada |
| 9 | Build y despliegue | Completada |

### Configuración de Claude Code

**Archivo `CLAUDE.md`**: Define el contexto del proyecto para Claude, incluyendo:
- Directorios de trabajo (activo vs referencia)
- Comandos disponibles
- Arquitectura y patrones de diseño
- Stack tecnológico

**Comandos personalizados**:
- `/documentar-migracion` - Documenta instrucciones y cambios por fase
- `/agregar-cambios-git` - Agrega cambios y realiza commits

### Evolución del Código

```
ORIGINAL                          MIGRADO
─────────────────────────────────────────────────────────
HTML estático                  →  Componentes Astro
CSS tradicional                →  TailwindCSS v4 utilities
Contenido en HTML              →  Datos en TypeScript
Sin responsive                 →  Mobile-first responsive
8 archivos HTML separados      →  Sistema de layouts + pages
Estilos duplicados             →  Componentes reutilizables
Sin tipado                     →  TypeScript interfaces
```

### Herramientas de Claude Utilizadas

- **Lectura de archivos**: Análisis del código original
- **Búsqueda (Grep/Glob)**: Identificación de patrones CSS
- **Edición**: Creación de componentes y páginas
- **Bash**: Ejecución de comandos npm
- **Planificación**: TodoWrite para seguimiento de tareas

---

## Créditos y Fuentes

### Autor

**Gustavo Alex Jimenez Crespo**
Email: gustavo.jimenez.crespo@gmail.com

### Fuentes de Información

| Fuente | URL |
|--------|-----|
| Wikipedia - Chappelle's Show | [enlace](https://en.wikipedia.org/wiki/Chappelle%27s_Show) |
| Wikipedia - Dave Chappelle | [enlace](https://es.wikipedia.org/wiki/Dave_Chappelle) |
| El País | [enlace](https://elpais.com/elpais/2017/03/15/icon/1489572882_162900.html) |
| La Higuera | [enlace](https://www.lahiguera.net/cinemania/actores/dave_chappelle/biografia.php) |
| Swashvillage | [enlace](https://es.swashvillage.org/article/dave-chappelle-biography) |
| CBS News | [enlace](https://www.cbsnews.com/news/dave-chappelle-netflix-comedy-fame-leaving-chappelles-show/) |
| Wikiwand | [enlace](https://www.wikiwand.com/en/Chappelle%27s_Show) |
| Wikipedia - Buddies | [enlace](https://en.wikipedia.org/wiki/Buddies_(TV_series)) |
| Vulture | [enlace](https://www.vulture.com/2013/05/buddies-dave-chappelles-home-improvement-spin-off-that-actually-got-made.html) |

### Herramientas de Desarrollo

- [Astro](https://astro.build/) - Framework web
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [Claude Code](https://claude.ai/code) - Asistente de desarrollo IA

---

