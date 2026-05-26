# Magic Tools (Obsidian Plugin)

## English

Magic Tools adds two editor-view features to Obsidian:

1. **Image OCR** from context menu over embedded images.
2. **Export selection to PDF** with high-fidelity rendering.

### Features

- Supports image links `![[image.png]]` and markdown image links `![](path/image.png)`.
- Dual OCR provider:
  - **Gemini 2.5 Flash** (API key required)
  - **Local OCR** (Tesseract)
- OCR safety guards:
  - max image size
  - configurable timeout (default 5s, max 30s)
  - OCR output sanitization
- OCR insertion modes:
  - plain text (default)
  - optional expanded callout
- **Gemini Fast Mode** (optional): transcribe + insert + remove image without intermediate modal.
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

#### Option B — Build locally

```bash
pnpm install
pnpm build
pnpm test
```

Then copy generated files to `.obsidian/plugins/magic-tools/`:

- `main.js`
- `manifest.json`
- `styles.css`

### Usage

- Right-click an embedded image in editor view → **Extract text from image**.
- Select text in editor view → **Export selection to PDF**.

### Release workflow (maintainers)

Version helpers keep `package.json` and `manifest.json` in sync:

```bash
pnpm version:patch
# or
pnpm version:minor
# or
pnpm version:major
```

Release by tag:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

GitHub Actions builds and publishes release assets automatically.

---

## Español

Magic Tools agrega dos funciones para la vista de edición de Obsidian:

1. **OCR de imágenes** desde el menú contextual sobre imágenes embebidas.
2. **Exportar selección a PDF** con render de alta fidelidad.

### Características

- Soporta enlaces de imagen `![[imagen.png]]` y enlaces markdown `![](ruta/imagen.png)`.
- OCR con proveedor dual:
  - **Gemini 2.5 Flash** (requiere API key)
  - **OCR local** (Tesseract)
- Protecciones de seguridad para OCR:
  - tamaño máximo de imagen
  - timeout configurable (default 5s, máximo 30s)
  - sanitización de salida OCR
- Modos de inserción OCR:
  - texto plano (default)
  - callout expandido opcional
- **Gemini Fast Mode** (opcional): transcribe + inserta + elimina imagen sin modal intermedio.
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

#### Opción B — Build local

```bash
pnpm install
pnpm build
pnpm test
```

Después copiar los archivos generados a `.obsidian/plugins/magic-tools/`:

- `main.js`
- `manifest.json`
- `styles.css`

### Uso

- Clic derecho sobre una imagen embebida en editor view → **Extract text from image**.
- Seleccionar texto en editor view → **Export selection to PDF**.

### Flujo de release (maintainers)

Los helpers de versionado mantienen sincronizados `package.json` y `manifest.json`:

```bash
pnpm version:patch
# o
pnpm version:minor
# o
pnpm version:major
```

Release por tag:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

GitHub Actions compila y publica los assets del release automáticamente.
