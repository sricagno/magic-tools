# Magic Tools (Obsidian Plugin)

## English

Magic Tools adds three editor-view features to Obsidian:

1. **Image OCR** from context menu over embedded images.
2. **Crop and resize image** from context menu over embedded images.
3. **Export selection to PDF** with high-fidelity rendering.

### Features

- Supports image links `![[image.png]]` and markdown image links `![](path/image.png)`.
- Dual OCR provider:
  - **Gemini 2.5 Flash** (API key required)
  - **OpenAI** (API key required)
  - **Local OCR** (Tesseract)
- OCR safety guards:
  - max image size
  - configurable timeout (default 5s, max 30s)
  - OCR output sanitization
- OCR insertion modes:
  - plain text (default)
  - optional expanded callout
- **Gemini Fast Mode** (optional): transcribe + insert + remove image without intermediate modal.
- Image optimization workflow:
  - crop + resize from one modal
  - live estimated output size and resolution
  - quality presets (JPEG/WebP)
  - supported input formats: PNG, JPG, JPEG, WEBP
- Image optimization save strategies:
  - replace original
  - optional backup (`.bkp`) before replace
  - or save as `-optimized` file
- PNG note:
  - PNG does not use perceptual quality like JPEG/WebP
  - optional PNG→JPG conversion can be enabled in the optimization modal
  - when replacing original with conversion, file extension may remain while internal content is converted
- PDF export from command palette and editor context menu when there is enough selected text.
- PDF pipeline includes hidden render, resource wait, image data-URL inlining, and callout base styles.

### Installation

#### Option A — Install from GitHub Release (recommended)

1. Go to **Releases**: <https://github.com/sricagno/magic-tools/releases>
2. Download these assets from the latest version:
   - `main.js`
   - `manifest.json`
   - `styles.css`
3. Create folder (if missing):

   `.obsidian/plugins/magic-tools/`

4. Copy the three files into that folder.
5. Open Obsidian → **Settings → Community plugins**:
   - disable Safe mode (if enabled)
   - enable **Magic Tools**


### Usage

- Right-click an embedded image in editor view → **Extract text from image**.
- Right-click an embedded image in editor view → **Crop and resize image**.
- Select text in editor view → **Export selection to PDF**.

> Maintainer/developer setup and release flow are documented in `CONTRIBUTING.md`.

---

## Español

Magic Tools agrega tres funciones para la vista de edición de Obsidian:

1. **OCR de imágenes** desde el menú contextual sobre imágenes embebidas.
2. **Recortar y redimensionar imagen** desde el menú contextual sobre imágenes embebidas.
3. **Exportar selección a PDF** con render de alta fidelidad.

### Características

- Soporta enlaces de imagen `![[imagen.png]]` y enlaces markdown `![](ruta/imagen.png)`.
- OCR con proveedor dual:
  - **Gemini 2.5 Flash** (requiere API key)
  - **OpenAI** (requiere API key)
  - **OCR local** (Tesseract)
- Protecciones de seguridad para OCR:
  - tamaño máximo de imagen
  - timeout configurable (default 5s, máximo 30s)
  - sanitización de salida OCR
- Modos de inserción OCR:
  - texto plano (default)
  - callout expandido opcional
- **Gemini Fast Mode** (opcional): transcribe + inserta + elimina imagen sin modal intermedio.
- Flujo de optimización de imagen:
  - recorte + redimensionado en un solo modal
  - estimación en vivo de tamaño y resolución de salida
  - presets de calidad (JPEG/WebP)
  - formatos soportados: PNG, JPG, JPEG, WEBP
- Estrategias de guardado para optimización:
  - reemplazar original
  - backup opcional (`.bkp`) antes de reemplazar
  - o guardar como archivo `-optimized`
- Nota sobre PNG:
  - PNG no usa calidad perceptual como JPEG/WebP
  - se puede habilitar conversión PNG→JPG en el modal de optimización
  - al reemplazar original con conversión, la extensión puede mantenerse aunque el contenido interno pase a JPG
- Exportación a PDF desde command palette y menú contextual cuando hay suficiente texto seleccionado.
- El pipeline PDF incluye render oculto, espera de recursos, inlining de imágenes a data URL y estilos base para callouts.

### Instalación

#### Opción A — Instalar desde GitHub Release (recomendado)

1. Ir a **Releases**: <https://github.com/sricagno/magic-tools/releases>
2. Descargar estos assets de la última versión:
   - `main.js`
   - `manifest.json`
   - `styles.css`
3. Crear la carpeta (si no existe):

   `.obsidian/plugins/magic-tools/`

4. Copiar esos tres archivos dentro de esa carpeta.
5. Abrir Obsidian → **Settings → Community plugins**:
   - desactivar Safe mode (si está activo)
   - habilitar **Magic Tools**


### Uso

- Clic derecho sobre una imagen embebida en editor view → **Extract text from image**.
- Clic derecho sobre una imagen embebida en editor view → **Crop and resize image**.
- Seleccionar texto en editor view → **Export selection to PDF**.

> La guía para maintainers/desarrolladores y el flujo de release están documentados en `CONTRIBUTING.md`.
