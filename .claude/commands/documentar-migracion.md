---
description: documentar instrucción y cambios de las fases de migración.
---

$ARGUMENTS

IMPORTANT: primero agregar los cambios y después documentar de forma resumida los cambios en base a la migración que estamos siguiendo desde el archivo @planes-migracion-astro.md y agregarlos en el archivo documentacion-migracion-astro.md.

** Condición
este comando solo se ejecuta si se trabaja en el mismo contexto del archivo planes-migracion-astro.md

** Contexto
estamos siguiendo las fases y puntos del plan de migración que está en el archivo planes-migracion-astro.md.

** Tarea
1. Crear documentacion-migracion-astro.md si no existe
2. Para cada cambio realizado, documentar:
   - Nombre de la fase actual (según planes-migracion-astro.md)
   - Punto específico de la fase que se completó
   - Lista de archivos editados/creados con sus rutas completas
   - Cambios realizados en cada archivo:
     * Descripción breve del cambio (1-2 líneas)
     * Número de línea principal donde se hizo el cambio
     * Fragmento clave del código agregado (3-5 líneas máximo)
   - Comandos importantes ejecutados (omitir comandos de navegación/listado)
   - Problemas encontrados y cómo se resolvieron (si aplica)
   - Estado: ✅ Completado / 🔄 En progreso / ⏸️ Pendiente

** Formato de salida esperado
````markdown
## [Fecha] - FASE X: [Nombre de la fase]

### Punto X.X: [Descripción del punto]
**Estado:** ✅ Completado

#### Archivos modificados:
- `ruta/del/archivo1.astro`
  - Línea 25: Agregado componente Header
  - Código: `<Header title="Mi sitio" />`
  
- `ruta/del/archivo2.ts`
  - Línea 12: Configuración de rutas
  - Código: `export const routes = { home: '/', about: '/about' }`

#### Comandos ejecutados:
```bash
npm install @astrojs/tailwind
astro add tailwind
```

#### Notas:
- Se ajustó la configuración de Tailwind para incluir paths personalizados
- Pendiente: optimizar imágenes en próxima fase
````

** Ejemplo de lo que NO debe incluir:
- Comandos como: `ls`, `cd`, `pwd`, `cat`
- Información excesivamente genérica sin detalles específicos
- Duplicación de información ya documentada

** Ejemplo de lo que SÍ debe incluir:
- Comandos de instalación, build, configuración
- Cambios específicos con números de línea
- Fragmentos de código relevantes
- Decisiones técnicas importantes