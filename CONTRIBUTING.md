# Contributing / Mantenimiento

## English

This document is for maintainers/developers.

For release compliance steps, follow:

- `docs/obsidian-release-checklist.md`

### Local build

```bash
pnpm install
pnpm test
pnpm build
```

### Versioning

Keep `package.json` and `manifest.json` synchronized.

Also keep `versions.json` updated with:

- plugin version -> minimum Obsidian version

```bash
pnpm version:patch
# or
pnpm version:minor
# or
pnpm version:major
```

### Release

1. Merge changes to `main` via Pull Request.
2. Ensure release workflow is valid and pinned to full SHAs.
3. Create and push signed tag:

```bash
git tag -s X.Y.Z -m "Release X.Y.Z"
git push origin X.Y.Z
```

The workflow `.github/workflows/release.yml` builds and publishes:

- `manifest.json`
- `main.js`
- `styles.css`
- `magic-tools-X.Y.Z.zip`

---

## Español

Este documento es para maintainers/desarrolladores.

Para los pasos de cumplimiento en releases, seguir:

- `docs/obsidian-release-checklist.md`

### Build local

```bash
pnpm install
pnpm test
pnpm build
```

### Versionado

Mantener sincronizados `package.json` y `manifest.json`.

Además mantener actualizado `versions.json` con:

- versión del plugin -> versión mínima de Obsidian

```bash
pnpm version:patch
# o
pnpm version:minor
# o
pnpm version:major
```

### Release

1. Mergear cambios a `main` vía Pull Request.
2. Verificar que el workflow de release esté válido y pinneado por SHA completo.
3. Crear y pushear tag firmado:

```bash
git tag -s X.Y.Z -m "Release X.Y.Z"
git push origin X.Y.Z
```

El workflow `.github/workflows/release.yml` compila y publica:

- `manifest.json`
- `main.js`
- `styles.css`
- `magic-tools-X.Y.Z.zip`
