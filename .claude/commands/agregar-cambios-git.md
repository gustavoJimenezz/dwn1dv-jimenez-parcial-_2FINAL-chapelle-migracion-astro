---
description: agrega los cambios y hace commit (solo cambios de la migracion actual).
---

## Flujo de Git y Commits
ejecutar un "commit estructurado", sigue este proceso:

### 1. Preparación (Add)
- haz `git add` de los archivos dentro de `./astro-dwn1dv-jimenez-parcial-_2FINAL-chapelle-migracion/` y del archivo `documentacion-migracion-astro.md`.
- NO agregues archivos de la carpeta `original-...` ni archivos de notas personales a menos que lo pida explícitamente.

### 2. Formato del Mensaje
Usa el estándar de **Conventional Commits**:
`<tipo>(<alcance>): <descripción corta en minúsculas>`

**Tipos permitidos:**
- `feat`: Nueva funcionalidad (ej. un nuevo componente Astro).
- `fix`: Corrección de un error.
- `refactor`: Cambio de código que ni corrige un error ni añade una función (migración de lógica).
- `docs`: Cambios en documentación o `CLAUDE.md`.
- `style`: Cambios de formato (CSS, espacios, etc).

**Alcances (Scopes) sugeridos:**
- `component`, `layout`, `page`, `config`, `migracion`.

### 3. Comando de Ejecución
Antes de commitear, genera un resumen de lo que hiciste y pregúntame:
"¿Deseas que proceda con el commit: `tipo(alcance): descripción`?"