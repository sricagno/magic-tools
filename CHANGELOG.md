# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-05-26

### Added
- Initial Obsidian plugin scaffold (`magic-tools`) with strict TypeScript and pnpm setup.
- Dual OCR support in editor view:
  - Gemini 2.5 Flash provider via Google AI Studio API.
  - Local OCR provider via Tesseract.
- Right-click OCR action for embedded images from editor/file context menus.
- OCR safety controls:
  - max image size validation,
  - timeout clamp (default 5s, hard max 30s),
  - OCR output sanitization.
- Gemini Fast Mode:
  - transcribes,
  - inserts text,
  - removes selected image,
  - skips intermediate modal.
- Configurable insertion format:
  - plain text (default), or
  - expanded callout block.
- Export selection to PDF command and context menu action.
- PDF save dialog support (desktop) when no default export folder is configured.
- External-path save support for PDF export via desktop save dialog.
- Bilingual README (Spanish/English) and ES/EN UI labels.
- Minimal unit tests (Vitest) for core pure helpers.

### Changed
- Settings reorganized into separate sections: Image OCR and PDF exporter.
- PDF rendering pipeline hardened:
  - hidden-host render,
  - print pipeline using `about:blank` + injected HTML,
  - resource wait before print.
- Added image inlining (data URL) for improved PDF image reliability.
- Added base callout styling fallback for exported PDFs.

### Fixed
- Inconsistent OCR menu availability when right-clicking images.
- PDF exports that produced background-only/near-empty output.
- Better error handling and notices for PDF export failures.
