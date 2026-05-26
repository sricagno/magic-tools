# Magic Tools (Obsidian Plugin)

## Español

Magic Tools agrega dos funciones para la vista de edición de Obsidian:

1. **OCR de imagen** desde menú contextual del editor (clic derecho sobre una imagen embebida).
2. **Exportar selección a PDF** con estilo visual equivalente al export nativo.

### Características

- Soporta imágenes `![[archivo.png]]` y `![](ruta/archivo.png)`.
- OCR con proveedor dual:
  - **Gemini 2.5 Flash** (Google AI Studio)
  - **OCR local** (Tesseract)
- Modal de resultado con:
  - Copiar texto
  - Insertar como callout debajo de la imagen
- Opción de seguridad avanzada:
  - **Gemini Fast Mode** (opcional): inserta transcripción y elimina imagen original
  - Advertencia: usar bajo propio riesgo
- Protección de seguridad/estabilidad:
  - límite de tamaño de imagen
  - timeout configurable (default 5s, máximo 30s)
  - saneamiento de salida OCR
- Comando: **Magic Tools: Exportar selección a PDF**
- Menú contextual en editor:
  - **Extract text from image** sobre imagen embebida
  - **Exportar selección a PDF** cuando hay texto seleccionado

### Backlog

- Mejorar aún más la fidelidad visual del PDF para acercarse al 1:1 nativo de Obsidian

### Instalación / Build

```bash
pnpm install
pnpm build
pnpm test
```

### Versionado (recomendado)

Mantener siempre sincronizados:

- `package.json` → `version`
- `manifest.json` → `version`

Comandos:

```bash
pnpm version:patch
# o
pnpm version:minor
# o
pnpm version:major
```

Luego:

```bash
git add .
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
git push origin main --tags
```

El workflow de GitHub Actions (`.github/workflows/release.yml`) arma artifacts y crea el release automáticamente.

Copiá estos archivos en:

`.obsidian/plugins/magic-tools/`

- `main.js`
- `manifest.json`
- `styles.css`

### Checklist de release rápida

1. `pnpm install`
2. `pnpm approve-builds esbuild tesseract.js` (una vez por entorno)
3. `pnpm build`
4. `pnpm test`
4. Copiar a `.obsidian/plugins/magic-tools/`:
   - `main.js`
   - `manifest.json`
   - `styles.css`
5. Habilitar **Magic Tools** en *Settings → Community plugins*
6. Probar:
   - OCR sobre `![[...]]` y `![](...)`
   - comando `Magic Tools: Export selection to PDF`
   - settings (provider, timeout, max size, language)

### Seguridad de supply chain (pnpm)

El proyecto incluye `pnpm-workspace.yaml` con:

- `minimumReleaseAge: 4320`
- `strictDepBuilds: true`
- `blockExoticSubdeps: true`

Recomendado para CI:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm test
pnpm build
```

---

## English

Magic Tools adds two editor-view features to Obsidian:

1. **Image OCR** from editor context menu (right-click embedded image).
2. **Export selection to PDF** with visual style equivalent to native export.

### Features

- Supports `![[image.png]]` and `![](path/image.png)`.
- Dual OCR provider:
  - **Gemini 2.5 Flash** (Google AI Studio)
  - **Local OCR** (Tesseract)
- Result modal with:
  - Copy text
  - Insert callout below image
- Advanced safety option:
  - **Gemini Fast Mode** (optional): inserts transcription and removes original image
  - Warning: use at your own risk
- Stability/safety guards:
  - max image size
  - configurable timeout (default 5s, hard max 30s)
  - OCR output sanitization
- Command: **Magic Tools: Export selection to PDF**
- Editor context menu:
  - **Extract text from image** over embedded image
  - **Export selection to PDF** when text is selected

### Backlog

- Improve PDF visual fidelity further to get closer to native Obsidian 1:1 look

### Install / Build

```bash
pnpm install
pnpm build
pnpm test
```

### Versioning (recommended)

Always keep versions in sync:

- `package.json` → `version`
- `manifest.json` → `version`

Commands:

```bash
pnpm version:patch
# or
pnpm version:minor
# or
pnpm version:major
```

Then:

```bash
git add .
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
git push origin main --tags
```

The GitHub Actions workflow (`.github/workflows/release.yml`) builds assets and creates the release automatically.

Copy build output into:

`.obsidian/plugins/magic-tools/`

- `main.js`
- `manifest.json`
- `styles.css`

### Quick release checklist

1. `pnpm install`
2. `pnpm approve-builds esbuild tesseract.js` (once per environment)
3. `pnpm build`
4. `pnpm test`
4. Copy into `.obsidian/plugins/magic-tools/`:
   - `main.js`
   - `manifest.json`
   - `styles.css`
5. Enable **Magic Tools** in *Settings → Community plugins*
6. Validate:
   - OCR over `![[...]]` and `![](...)`
   - `Magic Tools: Export selection to PDF`
   - settings (provider, timeout, max size, language)

### Supply chain security (pnpm)

`pnpm-workspace.yaml` enforces:

- `minimumReleaseAge: 4320`
- `strictDepBuilds: true`
- `blockExoticSubdeps: true`

Recommended CI:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm test
pnpm build
```
