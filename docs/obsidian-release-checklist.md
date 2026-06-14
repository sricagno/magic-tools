# Obsidian Community Release Checklist

Use this checklist for every release to keep the plugin compliant with Obsidian community distribution expectations.

## 1) Pre-release (on feature branch)

- [ ] `package.json` and `manifest.json` have the same plugin version.
- [ ] `versions.json` includes the mapping: `"<plugin-version>": "<minAppVersion>"`.
- [ ] `manifest.json` has correct metadata (`id`, `name`, `version`, `minAppVersion`, `description`, `author`).
- [ ] `README.md` is updated for user-facing behavior.
- [ ] Build and tests pass locally:

```bash
pnpm test
pnpm build
```

- [ ] Release artifacts exist after build: `main.js`, `manifest.json`, `styles.css`.

## 2) Merge gate (before tagging)

- [ ] Changes merged to `main` via Pull Request.
- [ ] Final manual validation done in a local Obsidian vault.
- [ ] No pending critical issues in release flow.

## 3) Tag and release

Tag MUST match `manifest.json` version exactly (no `v` prefix).

- [ ] Create signed tag using plain semver:

```bash
git tag -s X.Y.Z -m "Release X.Y.Z"
git push origin X.Y.Z
```

- [ ] Confirm GitHub Actions release workflow succeeded.
- [ ] Confirm release assets are attached:
  - `manifest.json`
  - `main.js`
  - `styles.css`
  - `magic-tools-X.Y.Z.zip`

## 4) Community plugin submission (first-time listing)

Only required for first inclusion in Obsidian Community Plugins.

- [ ] Read latest Obsidian docs:
  - Submit your plugin: <https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin>
  - Plugin guidelines: <https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines>
- [ ] Open PR to `obsidianmd/obsidian-releases` adding plugin entry in `community-plugins.json`.
- [ ] Ensure repo root includes current `README.md` and `manifest.json`.

## 5) Post-release checks

- [ ] Install from release assets in a clean vault and validate core flows:
  - OCR over embedded image
  - Crop/resize image flow
  - Export selection to PDF
- [ ] Verify no obvious regressions in notices/settings/context menu actions.

## 6) Optional launch/promotion

- [ ] Post release note in Obsidian Forum showcase: <https://forum.obsidian.md/c/share-showcase/9>
- [ ] Post in Obsidian Discord `#updates` (requires `developer` role): <https://discord.gg/veuWUTm>
