import {
  App,
  getLanguage,
  Editor,
  MarkdownFileInfo,
  MarkdownView,
  MarkdownRenderer,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  normalizePath,
  Platform,
} from "obsidian";
import {
  MAX_TIMEOUT_SECONDS,
  MIN_TIMEOUT_SECONDS,
  buildSelectionPdfOutputPath,
  clampTimeoutSeconds,
  getMarkdownImageMatch,
  getParentPath,
  removeWikiDecorators,
  sanitizeOcrText,
} from "./magic-tools-utils";

type OcrProvider = "gemini" | "openai" | "local";
type OcrLanguage = "auto" | "es" | "en";

interface MagicToolsSettings {
  googleApiKey: string;
  openaiApiKey: string;
  defaultProvider: OcrProvider;
  insertAsCallout: boolean;
  geminiFastMode: boolean;
  ocrLanguage: OcrLanguage;
  maxImageSizeMb: number;
  ocrTimeoutSeconds: number;
  pdfExportFolder: string;
  minPdfSelectionChars: number;
}

interface ImageContext {
  file: TFile;
  line: number;
  syntax: string;
}

const DEFAULT_SETTINGS: MagicToolsSettings = {
  googleApiKey: "",
  openaiApiKey: "",
  defaultProvider: "local",
  insertAsCallout: false,
  geminiFastMode: false,
  ocrLanguage: "es",
  maxImageSizeMb: 10,
  ocrTimeoutSeconds: 5,
  pdfExportFolder: "",
  minPdfSelectionChars: 20,
};

const I18N = {
  es: {
    extractTextFromImage: "Extraer texto de imagen",
    noImageDetected: "No se detectó una imagen embebida en la línea o selección actual.",
    imageTooLarge: (sizeMb: number, maxMb: number) =>
      `La imagen pesa ${sizeMb.toFixed(2)} MB y supera el máximo configurado (${maxMb} MB).`,
    apiKeyMissing: "Falta la API key de Google AI Studio para usar Gemini OCR.",
    openAiApiKeyMissing: "Falta la API key de OpenAI para usar OCR con OpenAI.",
    ocrFailed: "Falló el OCR.",
    serviceUnavailable:
      "El proveedor de OCR no está disponible temporalmente (503). Probá nuevamente en unos segundos.",
    rateLimited: "Se alcanzó el límite del proveedor OCR (429). Esperá un momento e intentá de nuevo.",
    timeoutError:
      "Se agotó el tiempo de OCR. Probá aumentar el timeout (máx. 30s) o usar una imagen con menos texto/complejidad.",
    modalTitle: "Texto extraído",
    copyText: "Copiar texto",
    copied: "Texto copiado",
    insertToggle: "Insertar debajo de la imagen",
    insertNow: "Insertar ahora",
    close: "Cerrar",
    inserted: "Texto insertado debajo de la imagen",
    exportSelectionToPdf: "Magic Tools: Exportar selección a PDF",
    noTextSelected: "No hay texto seleccionado",
    pdfSaved: (path: string) => `PDF guardado: ${path}`,
    pdfNotDesktop: "La exportación a PDF solo está disponible en Obsidian Desktop.",
    pdfFailed: "No se pudo generar el PDF de la selección.",
    settingsTitle: "Magic Tools",
    settingApiKey: "Google AI Studio API key",
    settingApiKeyDesc: "Se usa cuando el proveedor OCR es Gemini.",
    settingOpenAiApiKey: "OpenAI API key",
    settingOpenAiApiKeyDesc: "Se usa cuando el proveedor OCR es OpenAI.",
    settingProvider: "Proveedor OCR por defecto",
    settingProviderDesc: "Elegí Gemini, OpenAI o OCR local.",
    settingInsertAsCallout: "Insertar dentro de callout",
    settingInsertAsCalloutDesc: "Desactivado por defecto. Si se activa, usa bloque [!note] expandido.",
    settingGeminiFastMode: "Gemini Fast Mode (borra imagen)",
    settingGeminiFastModeDesc:
      "Riesgo: inserta transcripción y elimina la imagen original. Usalo bajo tu propio riesgo.",
    settingLanguage: "Idioma OCR",
    settingLanguageDesc: "Idioma preferido para el reconocimiento.",
    settingMaxSize: "Tamaño máximo de imagen (MB)",
    settingMaxSizeDesc: "Límite para evitar procesamientos pesados.",
    settingTimeout: "Timeout OCR (segundos)",
    settingTimeoutDesc: "Por defecto 5, máximo 30.",
    settingPdfExportFolder: "Carpeta por defecto para exportar PDFs",
    settingPdfExportFolderDesc: "Ruta relativa al vault (ej: Exports/PDF). Vacío = misma carpeta de la nota.",
    settingMinPdfChars: "Mínimo de caracteres para exportar selección",
    settingMinPdfCharsDesc: "Evita exportaciones vacías o accidentales desde menú contextual.",
    sectionOcr: "OCR de imagen",
    sectionPdf: "Exportador PDF",
    contextExportSelectionToPdf: "Exportar selección a PDF",
    invalidPdfExportFolder: "Ruta inválida. Debe ser una carpeta dentro del vault.",
    emptyRenderedPdfFallback: "No se pudo renderizar con estilo. Se exportó en modo texto simple.",
    saveDialogCanceled: "Exportación cancelada.",
    pdfWriteFailed: "No se pudo escribir el PDF. Revisá permisos/ruta de guardado.",
    selectionTooShort: (min: number) => `La selección es muy corta. Seleccioná al menos ${min} caracteres.`,
    providerGemini: "Gemini (Google AI Studio)",
    providerOpenAI: "OpenAI",
    providerLocal: "OCR local",
    langAuto: "Automático",
    langEs: "Español",
    langEn: "Inglés",
    commandPdfUnavailable:
      "No se pudo acceder al motor de PDF de Electron. Probá actualizar Obsidian Desktop.",
  },
  en: {
    extractTextFromImage: "Extract text from image",
    noImageDetected: "No embedded image was detected in the current line or selection.",
    imageTooLarge: (sizeMb: number, maxMb: number) =>
      `Image is ${sizeMb.toFixed(2)} MB and exceeds configured max (${maxMb} MB).`,
    apiKeyMissing: "Google AI Studio API key is missing for Gemini OCR.",
    openAiApiKeyMissing: "OpenAI API key is missing for OpenAI OCR.",
    ocrFailed: "OCR failed.",
    serviceUnavailable:
      "OCR provider is temporarily unavailable (503). Please retry in a few seconds.",
    rateLimited: "OCR provider rate limit reached (429). Please wait and retry.",
    timeoutError:
      "OCR timed out. Try increasing timeout (max 30s) or use an image with less text/complexity.",
    modalTitle: "Extracted text",
    copyText: "Copy text",
    copied: "Text copied",
    insertToggle: "Insert below image",
    insertNow: "Insert now",
    close: "Close",
    inserted: "Text inserted below image",
    exportSelectionToPdf: "Magic Tools: Export selection to PDF",
    noTextSelected: "No text selected",
    pdfSaved: (path: string) => `PDF saved: ${path}`,
    pdfNotDesktop: "PDF export is only available in Obsidian Desktop.",
    pdfFailed: "Could not generate selection PDF.",
    settingsTitle: "Magic Tools",
    settingApiKey: "Google AI Studio API key",
    settingApiKeyDesc: "Used when OCR provider is Gemini.",
    settingOpenAiApiKey: "OpenAI API key",
    settingOpenAiApiKeyDesc: "Used when OCR provider is OpenAI.",
    settingProvider: "Default OCR provider",
    settingProviderDesc: "Choose Gemini, OpenAI, or local OCR.",
    settingInsertAsCallout: "Insert inside callout",
    settingInsertAsCalloutDesc: "Off by default. If enabled, uses expanded [!note] block.",
    settingGeminiFastMode: "Gemini Fast Mode (deletes image)",
    settingGeminiFastModeDesc:
      "Risk: inserts transcription and removes original image. Use at your own risk.",
    settingLanguage: "OCR language",
    settingLanguageDesc: "Preferred recognition language.",
    settingMaxSize: "Max image size (MB)",
    settingMaxSizeDesc: "Limit to avoid heavy processing.",
    settingTimeout: "OCR timeout (seconds)",
    settingTimeoutDesc: "Default 5, hard max 30.",
    settingPdfExportFolder: "Default folder for exported PDFs",
    settingPdfExportFolderDesc: "Vault-relative path (e.g. Exports/PDF). Empty = same note folder.",
    settingMinPdfChars: "Minimum chars for exporting selection",
    settingMinPdfCharsDesc: "Avoid empty or accidental exports from context menu.",
    sectionOcr: "Image OCR",
    sectionPdf: "PDF exporter",
    contextExportSelectionToPdf: "Export selection to PDF",
    invalidPdfExportFolder: "Invalid path. It must be a folder inside the vault.",
    emptyRenderedPdfFallback: "Styled render failed. Exported using plain text fallback.",
    saveDialogCanceled: "Export canceled.",
    pdfWriteFailed: "Could not write PDF. Check path/permissions.",
    selectionTooShort: (min: number) => `Selection is too short. Please select at least ${min} characters.`,
    providerGemini: "Gemini (Google AI Studio)",
    providerOpenAI: "OpenAI",
    providerLocal: "Local OCR",
    langAuto: "Auto",
    langEs: "Spanish",
    langEn: "English",
    commandPdfUnavailable:
      "Could not access Electron PDF engine. Try updating Obsidian Desktop.",
  },
};

function getLocale(): "es" | "en" {
  const locale = (getLanguage?.() ?? navigator.language ?? "en").toLowerCase();
  return locale.startsWith("es") ? "es" : "en";
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("OCR_TIMEOUT")), ms);
    promise
      .then((value) => {
        window.clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        window.clearTimeout(timer);
        reject(err);
      });
  });
}

class OcrResultModal extends Modal {
  private readonly i18n = I18N[getLocale()];

  constructor(
    app: App,
    private readonly text: string,
    private readonly onInsert: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText(this.i18n.modalTitle);

    const textarea = this.contentEl.createEl("textarea", {
      text: this.text,
      cls: "magic-tools-ocr-textarea",
    });
    textarea.style.width = "100%";
    textarea.style.minHeight = "220px";

    const buttonRow = this.contentEl.createDiv({ cls: "magic-tools-button-row" });
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "8px";

    const copyButton = buttonRow.createEl("button", { text: this.i18n.copyText });
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(textarea.value);
      new Notice(this.i18n.copied);
    });

    const insertButton = buttonRow.createEl("button", { text: this.i18n.insertNow });
    insertButton.addEventListener("click", () => {
      this.onInsert();
      this.close();
    });

    const closeButton = buttonRow.createEl("button", { text: this.i18n.close });
    closeButton.addEventListener("click", () => this.close());
  }
}

export default class MagicToolsPlugin extends Plugin {
  settings: MagicToolsSettings = DEFAULT_SETTINGS;
  private readonly i18n = I18N[getLocale()];

  async onload(): Promise<void> {
    await this.loadSettings();

    this.addSettingTab(new MagicToolsSettingTab(this.app, this));

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor, view) => {
        const pointerEvent = window.event as PointerEvent | undefined;
        const imageContext =
          this.findImageContextNearPointer(editor, pointerEvent) ?? this.getCurrentImageContext(editor, view);

        const selectedText = editor.getSelection().trim();
        const hasSelection = selectedText.length >= this.settings.minPdfSelectionChars;
        if (hasSelection && view.file) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.contextExportSelectionToPdf);
            item.onClick(async () => {
              try {
                await this.exportSelectionToPdf(editor, view.file as TFile);
              } catch (error) {
                console.error("[Magic Tools] Context export selection to PDF failed", error);
                new Notice(this.i18n.pdfFailed);
              }
            });
          });
        }

        if (!imageContext) return;

        if (selectedText.length > 0 && !this.isSelectionSingleImage(selectedText)) {
          return;
        }

        menu.addItem((item) => {
          item.setTitle(this.i18n.extractTextFromImage);
          item.onClick(async () => this.handleImageOcr(editor, view, imageContext));
        });
      }),
    );

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof TFile)) return;
        if (!this.isImageFile(file)) return;

        menu.addItem((item) => {
          item.setTitle(this.i18n.extractTextFromImage);
          item.onClick(async () => {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            const editor = view?.editor;
            const activeFile = view?.file;
            if (!editor || !activeFile) {
              new Notice(this.i18n.noImageDetected);
              return;
            }

            const line = this.findImageLineForFile(editor, file, activeFile.path);
            if (line === -1) {
              new Notice(this.i18n.noImageDetected);
              return;
            }

            const imageContext: ImageContext = {
              file,
              line,
              syntax: this.extractImageSyntaxAtLine(editor, line) ?? `![[${file.path}]]`,
            };

            await this.handleImageOcr(editor, view, imageContext);
          });
        });
      }),
    );

    this.addCommand({
      id: "export-selection-to-pdf",
      name: this.i18n.exportSelectionToPdf,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownFileInfo) => {
        if (!editor || !view?.file) return false;
        if (checking) return true;

        this.exportSelectionToPdf(editor, view.file).catch((error) => {
          console.error("[Magic Tools] Export selection to PDF failed", error);
          new Notice(this.i18n.pdfFailed);
        });
        return true;
      },
    });
  }

  private async handleImageOcr(
    editor: Editor,
    view: MarkdownFileInfo,
    imageContext: ImageContext,
  ): Promise<void> {
    try {
      const maxBytes = this.settings.maxImageSizeMb * 1024 * 1024;
      if (imageContext.file.stat.size > maxBytes) {
        new Notice(
          this.i18n.imageTooLarge(imageContext.file.stat.size / (1024 * 1024), this.settings.maxImageSizeMb),
        );
        return;
      }

      const binary = await this.app.vault.readBinary(imageContext.file);
      const timeoutMs = clampTimeoutSeconds(this.settings.ocrTimeoutSeconds) * 1000;

      const extracted = await withTimeout(this.runOcr(binary, imageContext.file.extension), timeoutMs);
      const safeText = sanitizeOcrText(extracted);
      if (!safeText) throw new Error("EMPTY_OCR_RESULT");

      const insertFn = () => {
        const insertedText = this.buildInsertedText(safeText);
        editor.replaceRange(insertedText, { line: imageContext.line + 1, ch: 0 });
        if (this.settings.defaultProvider === "gemini" && this.settings.geminiFastMode) {
          editor.replaceRange("", { line: imageContext.line, ch: 0 }, { line: imageContext.line + 1, ch: 0 });
        }
        new Notice(this.i18n.inserted);
      };

      if (this.settings.defaultProvider === "gemini" && this.settings.geminiFastMode) {
        insertFn();
        return;
      }

      new OcrResultModal(this.app, safeText, insertFn).open();
    } catch (error) {
      console.error("[Magic Tools] OCR failed", error);
      if (error instanceof Error && error.message === "OCR_TIMEOUT") {
        new Notice(this.i18n.timeoutError, 8000);
      } else if (error instanceof Error && error.message.includes("HTTP 503")) {
        new Notice(this.i18n.serviceUnavailable, 8000);
      } else if (error instanceof Error && error.message.includes("HTTP 429")) {
        new Notice(this.i18n.rateLimited, 8000);
      } else {
        new Notice(`${this.i18n.ocrFailed} ${error instanceof Error ? error.message : ""}`.trim());
      }
    }
  }

  private pickImageContextFromSelection(editor: Editor, view: MarkdownFileInfo): ImageContext | null {
    const selected = editor.getSelection().trim();
    if (!selected || !view.file) return null;
    if (!this.isSelectionSingleImage(selected)) return null;
    const syntax = getMarkdownImageMatch(selected);
    if (!syntax) return null;
    const line = editor.getCursor().line;
    const file = this.resolveImageFile(syntax, view.file.path);
    if (!file) return null;
    return { file, line, syntax };
  }

  private async runOcr(binary: ArrayBuffer, extension: string): Promise<string> {
    if (this.settings.defaultProvider === "gemini") {
      return this.runGeminiOcr(binary, extension);
    }
    if (this.settings.defaultProvider === "openai") {
      return this.runOpenAiOcr(binary, extension);
    }
    return this.runLocalOcr(binary);
  }

  private async runGeminiOcr(binary: ArrayBuffer, extension: string): Promise<string> {
    if (!this.settings.googleApiKey?.trim()) {
      throw new Error(this.i18n.apiKeyMissing);
    }

    const base64 = this.arrayBufferToBase64(binary);
    const mimeType = this.getMimeType(extension);
    const languageHint = this.settings.ocrLanguage === "auto" ? "auto" : this.settings.ocrLanguage;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.settings.googleApiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Extract only readable text from this image. Do not add commentary. OCR language hint: ${languageHint}.`,
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const details = await this.tryExtractProviderError(response);
      throw new Error(`Gemini HTTP ${response.status}${details ? ` - ${details}` : ""}`);
    }

    const payload = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const text = payload.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("\n") ?? "";
    return text;
  }

  private async runOpenAiOcr(binary: ArrayBuffer, extension: string): Promise<string> {
    if (!this.settings.openaiApiKey?.trim()) {
      throw new Error(this.i18n.openAiApiKeyMissing);
    }

    const base64 = this.arrayBufferToBase64(binary);
    const mimeType = this.getMimeType(extension);
    const languageHint = this.settings.ocrLanguage === "auto" ? "auto" : this.settings.ocrLanguage;
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.settings.openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Extract only readable text from this image. Do not add commentary. OCR language hint: ${languageHint}.`,
              },
              {
                type: "input_image",
                image_url: `data:${mimeType};base64,${base64}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const details = await this.tryExtractProviderError(response);
      throw new Error(`OpenAI HTTP ${response.status}${details ? ` - ${details}` : ""}`);
    }

    const payload = (await response.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{ type?: string; text?: string }>;
      }>;
    };

    if (payload.output_text?.trim()) {
      return payload.output_text;
    }

    const contentText =
      payload.output
        ?.flatMap((item) => item.content ?? [])
        .map((part) => (part.type === "output_text" || part.type === "text" ? part.text ?? "" : ""))
        .join("\n")
        .trim() ?? "";
    return contentText;
  }

  private async tryExtractProviderError(response: Response): Promise<string> {
    try {
      const clone = response.clone();
      const body = (await clone.json()) as { error?: { message?: string }; message?: string };
      return body.error?.message?.trim() || body.message?.trim() || "";
    } catch {
      return "";
    }
  }

  private async runLocalOcr(binary: ArrayBuffer): Promise<string> {
    const lang = this.settings.ocrLanguage === "es" ? "spa" : this.settings.ocrLanguage === "en" ? "eng" : "eng+spa";
    const tesseract = await import("tesseract.js");
    const worker = await tesseract.createWorker(lang);
    try {
      const result = await worker.recognize(new Uint8Array(binary));
      return result.data.text ?? "";
    } finally {
      await worker.terminate();
    }
  }

  private async exportSelectionToPdf(editor: Editor, noteFile: TFile): Promise<void> {
    const selection = editor.getSelection();
    if (!selection.trim()) {
      new Notice(this.i18n.noTextSelected);
      return;
    }

    if (selection.trim().length < this.settings.minPdfSelectionChars) {
      new Notice(this.i18n.selectionTooShort(this.settings.minPdfSelectionChars));
      return;
    }

    if (!Platform.isDesktopApp) {
      new Notice(this.i18n.pdfNotDesktop);
      return;
    }

    const selectionWithInlinedImages = this.inlineImageEmbedsForSelection(selection, noteFile.path);
    const renderedHtml = await this.renderSelectionHtml(selectionWithInlinedImages, noteFile.path);
    const finalContent = renderedHtml.trim() ? renderedHtml : this.escapeHtml(selectionWithInlinedImages).replace(/\n/g, "<br/>");
    if (!renderedHtml.trim()) {
      new Notice(this.i18n.emptyRenderedPdfFallback);
    }
    console.log("[Magic Tools] PDF render content length:", finalContent.length);

    const html = this.buildPrintableHtml(finalContent);
    const pdfBuffer = await this.renderPdfFromHtml(html);
    if (!pdfBuffer) {
      new Notice(this.i18n.commandPdfUnavailable);
      return;
    }

    const outputPath = await this.resolvePdfOutputPath(noteFile.path, noteFile.basename);
    if (!outputPath) {
      new Notice(this.i18n.saveDialogCanceled);
      return;
    }

    try {
      await this.writePdfToPath(outputPath, pdfBuffer);
      new Notice(this.i18n.pdfSaved(outputPath));
    } catch (error) {
      console.error("[Magic Tools] PDF write failed", error);
      new Notice(this.i18n.pdfWriteFailed);
    }
  }

  private async resolvePdfOutputPath(notePath: string, noteBasename: string): Promise<string | null> {
    const folder = this.settings.pdfExportFolder.trim();

    if (!folder) {
      const savePath = await this.promptPdfSavePath(`${noteBasename}-selection.pdf`);
      return savePath;
    }

    if (this.isAbsoluteSystemPath(folder)) {
      new Notice(this.i18n.invalidPdfExportFolder);
      return null;
    }

    return normalizePath(buildSelectionPdfOutputPath(notePath, noteBasename, folder));
  }

  private isAbsoluteSystemPath(value: string): boolean {
    return value.startsWith("/") || value.startsWith("~") || /^[A-Za-z]:\\/.test(value);
  }

  private async promptPdfSavePath(defaultFileName: string): Promise<string | null> {
    if (!Platform.isDesktopApp) return null;

    try {
      const req = (window as unknown as { require?: (name: string) => any }).require;
      if (!req) return null;

      const remote = req("@electron/remote");
      const dialog = remote?.dialog;
      const result = await dialog?.showSaveDialog({
        title: this.i18n.contextExportSelectionToPdf,
        defaultPath: defaultFileName,
        filters: [{ name: "PDF", extensions: ["pdf"] }],
      });

      if (!result || result.canceled || !result.filePath) {
        return null;
      }

      return result.filePath;
    } catch (error) {
      console.error("[Magic Tools] Save dialog unavailable", error);
      return null;
    }
  }

  private async writePdfToPath(outputPath: string, pdfBuffer: ArrayBuffer): Promise<void> {
    if (this.isAbsoluteSystemPath(outputPath)) {
      const req = (window as unknown as { require?: (name: string) => any }).require;
      if (!req) throw new Error("Node require unavailable");

      const fs = req("fs/promises") as { writeFile: (path: string, data: Uint8Array) => Promise<void> };
      await fs.writeFile(outputPath, new Uint8Array(pdfBuffer));
      return;
    }

    await this.ensureVaultFolderExistsForPath(outputPath);
    await this.app.vault.adapter.writeBinary(outputPath, pdfBuffer);
  }

  private buildPrintableHtml(innerHtml: string): string {
    const baseHref = window.location.href;

    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <base href="${baseHref}" />
    <style>
      html, body { background: transparent !important; color: #111 !important; }
      body { margin: 0; }
      .markdown-preview-view, .markdown-rendered { color: #111 !important; }
      .markdown-preview-view * { color: inherit !important; }
      .markdown-preview-view { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.55; }
      h1, h2, h3, h4, h5, h6 { margin: 1.1em 0 0.55em; }
      p, ul, ol, blockquote, pre { margin: 0.6em 0; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      blockquote { border-left: 3px solid #999; padding-left: 0.8em; }
      img { max-width: 100%; height: auto; }
      .callout { border: 1px solid #d0d0d0; border-radius: 8px; padding: 10px 12px; margin: 10px 0; background: #f7f7f7; }
      .callout-title { font-weight: 700; margin-bottom: 6px; }
      .callout-content > :first-child { margin-top: 0; }
      .callout-content > :last-child { margin-bottom: 0; }
      .callout[data-callout="important"] { border-left: 4px solid #d97706; }
      .callout[data-callout="warning"] { border-left: 4px solid #b91c1c; }
      .callout[data-callout="note"] { border-left: 4px solid #2563eb; }
    </style>
  </head>
  <body>
    <div class="markdown-preview-view markdown-rendered markdown-preview-section" style="padding:24px;">
      ${innerHtml}
    </div>
  </body>
</html>`;
  }

  private async renderPdfFromHtml(html: string): Promise<ArrayBuffer | null> {
    try {
      const req = (window as unknown as { require?: (name: string) => any }).require;
      if (!req) return null;

      const remote = req("@electron/remote");
      if (!remote?.BrowserWindow) return null;

      const win = new remote.BrowserWindow({
        show: false,
        webPreferences: { sandbox: false },
      });

      await win.loadURL("about:blank");
      await win.webContents.executeJavaScript(
        `document.open();document.write(${JSON.stringify(html)});document.close();`,
        true,
      );
      await win.webContents.executeJavaScript(
        `new Promise((resolve) => {
          const done = () => setTimeout(resolve, 120);
          if (document.readyState === 'complete') {
            const imgs = Array.from(document.images || []);
            if (!imgs.length) return done();
            let pending = imgs.length;
            const next = () => { pending -= 1; if (pending <= 0) done(); };
            imgs.forEach((img) => {
              if (img.complete) return next();
              img.addEventListener('load', next, { once: true });
              img.addEventListener('error', next, { once: true });
            });
            return;
          }
          window.addEventListener('load', done, { once: true });
        })`,
        true,
      );

      const nodeBuffer: Uint8Array = await win.webContents.printToPDF({
        printBackground: true,
        preferCSSPageSize: true,
      });

      if (!nodeBuffer || nodeBuffer.byteLength < 1024) {
        console.warn("[Magic Tools] PDF output looks too small/empty", nodeBuffer?.byteLength ?? 0);
      }

      win.destroy();
      return nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength);
    } catch (error) {
      console.error("[Magic Tools] Electron PDF rendering unavailable", error);
      return null;
    }
  }

  private async renderSelectionHtml(markdown: string, sourcePath: string): Promise<string> {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-99999px";
    host.style.top = "0";
    host.style.width = "800px";
    host.style.zIndex = "-1";
    host.className = "markdown-preview-view markdown-rendered markdown-preview-section";
    document.body.appendChild(host);

    try {
      await MarkdownRenderer.render(this.app, markdown, host, sourcePath, this);
      await this.inlineRenderedImagesAsDataUrls(host);
      await this.waitForPaint();
      return host.innerHTML;
    } finally {
      host.remove();
    }
  }

  private async inlineRenderedImagesAsDataUrls(container: HTMLElement): Promise<void> {
    const imgs = Array.from(container.querySelectorAll("img"));

    for (const img of imgs) {
      const src = img.getAttribute("src") ?? "";
      if (!src || src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
        continue;
      }

      try {
        const response = await fetch(src);
        if (!response.ok) continue;
        const blob = await response.blob();
        const dataUrl = await this.blobToDataUrl(blob);
        img.setAttribute("src", dataUrl);
      } catch {
        // keep original src if conversion fails
      }
    }
  }

  private blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  private async waitForPaint(): Promise<void> {
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
    await new Promise<void>((resolve) => window.setTimeout(() => resolve(), 60));
  }

  private escapeHtml(input: string): string {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  private getCurrentImageContext(editor: Editor, view: MarkdownFileInfo): ImageContext | null {
    const fromSelection = this.pickImageContextFromSelection(editor, view);
    if (fromSelection) return fromSelection;

    const line = editor.getCursor().line;
    const lineText = editor.getLine(line);

    const syntax = getMarkdownImageMatch(lineText);
    if (!syntax || !view.file) return null;

    const file = this.resolveImageFile(syntax, view.file.path);
    if (!file) return null;

    return {
      file,
      line,
      syntax,
    };
  }

  private resolveImageFile(imageSyntax: string, sourcePath: string): TFile | null {
    const wikiMatch = imageSyntax.match(/!\[\[([^\]]+)\]\]/);
    if (wikiMatch?.[1]) {
      const clean = removeWikiDecorators(wikiMatch[1]);
      const file = this.app.metadataCache.getFirstLinkpathDest(clean, sourcePath);
      return file instanceof TFile ? file : null;
    }

    const mdMatch = imageSyntax.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (!mdMatch?.[1]) return null;

    const rawPath = decodeURIComponent(mdMatch[1]);
    const parent = getParentPath(sourcePath);
    const resolved = normalizePath(rawPath.startsWith("/") ? rawPath.substring(1) : `${parent}/${rawPath}`);
    const af = this.app.vault.getAbstractFileByPath(resolved);
    return af instanceof TFile ? af : null;
  }

  private inlineImageEmbedsForSelection(selection: string, sourcePath: string): string {
    const wikiPattern = /!\[\[([^\]]+)\]\]/g;
    const markdownPattern = /!\[([^\]]*)\]\(([^)]+)\)/g;

    const withWikiResolved = selection.replace(wikiPattern, (_full, rawPath: string) => {
      const clean = removeWikiDecorators(rawPath);
      const file = this.app.metadataCache.getFirstLinkpathDest(clean, sourcePath);
      if (!(file instanceof TFile)) return `![[${rawPath}]]`;
      return `![](${this.app.vault.getResourcePath(file)})`;
    });

    return withWikiResolved.replace(markdownPattern, (_full, alt: string, rawPath: string) => {
      if (/^https?:\/\//i.test(rawPath) || /^data:/i.test(rawPath)) {
        return `![${alt}](${rawPath})`;
      }

      const decoded = decodeURIComponent(rawPath.trim());
      const parent = getParentPath(sourcePath);
      const resolved = normalizePath(decoded.startsWith("/") ? decoded.substring(1) : `${parent}/${decoded}`);
      const file = this.app.vault.getAbstractFileByPath(resolved);
      if (!(file instanceof TFile)) return `![${alt}](${rawPath})`;
      return `![${alt}](${this.app.vault.getResourcePath(file)})`;
    });
  }

  private findImageContextNearPointer(editor: Editor, event?: PointerEvent): ImageContext | null {
    if (!event?.target) return null;
    const target = event.target as HTMLElement;

    const editorContainer = target.closest(".markdown-source-view.mod-cm6");
    if (!editorContainer) return null;

    const imageToken = target.closest("img, span.cm-embed.cm-image, span.cm-formatting-embed.cm-image");
    const lineElement = target.closest(".cm-line") as HTMLElement | null;

    let tokenText = imageToken?.textContent?.trim() ?? "";
    if (!tokenText && imageToken instanceof HTMLImageElement) {
      const possibleAlt = imageToken.getAttribute("alt") ?? "";
      tokenText = possibleAlt.startsWith("![[") || possibleAlt.startsWith("![") ? possibleAlt : "";
    }
    const lineNumberAttr = lineElement?.getAttribute("data-line");
    const lineNumber = lineNumberAttr ? Number(lineNumberAttr) : NaN;
    const line = Number.isFinite(lineNumber) ? lineNumber : editor.getCursor().line;
    const lineText = editor.getLine(line);

    const syntax = getMarkdownImageMatch(tokenText || lineText);
    if (!syntax) return null;

    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) return null;

    const file = this.resolveImageFile(syntax, activeFile.path);
    if (!file) return null;

    return { file, line, syntax };
  }

  private getMimeType(extension: string): string {
    const ext = extension.toLowerCase();
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "webp") return "image/webp";
    if (ext === "gif") return "image/gif";
    return "image/png";
  }

  private extractImageSyntaxAtLine(editor: Editor, line: number): string | null {
    const lineText = editor.getLine(line);
    return getMarkdownImageMatch(lineText);
  }

  private findImageLineForFile(editor: Editor, imageFile: TFile, sourcePath: string): number {
    const totalLines = editor.lineCount();
    const cursorLine = editor.getCursor().line;
    const matches: number[] = [];

    for (let i = 0; i < totalLines; i += 1) {
      const syntax = getMarkdownImageMatch(editor.getLine(i));
      if (!syntax) continue;
      const resolved = this.resolveImageFile(syntax, sourcePath);
      if (resolved?.path === imageFile.path) {
        matches.push(i);
      }
    }

    if (matches.length === 0) return -1;

    let bestLine = matches[0];
    let bestDistance = Math.abs(bestLine - cursorLine);
    for (let i = 1; i < matches.length; i += 1) {
      const dist = Math.abs(matches[i] - cursorLine);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestLine = matches[i];
      }
    }

    return bestLine;
  }

  private async ensureVaultFolderExistsForPath(filePath: string): Promise<void> {
    const idx = filePath.lastIndexOf("/");
    if (idx <= 0) return;

    const folderPath = filePath.substring(0, idx);
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (existing) return;

    const segments = folderPath.split("/").filter(Boolean);
    let current = "";
    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      const af = this.app.vault.getAbstractFileByPath(current);
      if (!af) {
        await this.app.vault.createFolder(current);
      }
    }
  }

  private buildInsertedText(safeText: string): string {
    if (!this.settings.insertAsCallout) {
      return `\n${safeText}\n`;
    }

    return `> [!note] ${this.i18n.modalTitle}\n> ${safeText.replace(/\n/g, "\n> ")}\n`;
  }

  private isSelectionSingleImage(selection: string): boolean {
    const trimmed = selection.trim();
    if (!trimmed) return false;
    const matched = getMarkdownImageMatch(trimmed);
    return matched === trimmed;
  }

  private isImageFile(file: TFile): boolean {
    return ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"].includes(file.extension.toLowerCase());
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}

class MagicToolsSettingTab extends PluginSettingTab {
  plugin: MagicToolsPlugin;
  private readonly i18n = I18N[getLocale()];

  constructor(app: App, plugin: MagicToolsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.i18n.settingsTitle });

    containerEl.createEl("h3", { text: this.i18n.sectionOcr });

    new Setting(containerEl)
      .setName(this.i18n.settingApiKey)
      .setDesc(this.i18n.settingApiKeyDesc)
      .addText((text) =>
        text
          .setPlaceholder("AIza...")
          .setValue(this.plugin.settings.googleApiKey)
          .onChange(async (value) => {
            this.plugin.settings.googleApiKey = value.trim();
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingOpenAiApiKey)
      .setDesc(this.i18n.settingOpenAiApiKeyDesc)
      .addText((text) =>
        text
          .setPlaceholder("sk-...")
          .setValue(this.plugin.settings.openaiApiKey)
          .onChange(async (value) => {
            this.plugin.settings.openaiApiKey = value.trim();
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingProvider)
      .setDesc(this.i18n.settingProviderDesc)
      .addDropdown((dropdown) => {
        dropdown
          .addOption("local", this.i18n.providerLocal)
          .addOption("gemini", this.i18n.providerGemini)
          .addOption("openai", this.i18n.providerOpenAI)
          .setValue(this.plugin.settings.defaultProvider)
          .onChange(async (value: OcrProvider) => {
            this.plugin.settings.defaultProvider = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(this.i18n.settingInsertAsCallout)
      .setDesc(this.i18n.settingInsertAsCalloutDesc)
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.insertAsCallout).onChange(async (value) => {
          this.plugin.settings.insertAsCallout = value;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingGeminiFastMode)
      .setDesc(this.i18n.settingGeminiFastModeDesc)
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.geminiFastMode).onChange(async (value) => {
          this.plugin.settings.geminiFastMode = value;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingLanguage)
      .setDesc(this.i18n.settingLanguageDesc)
      .addDropdown((dropdown) => {
        dropdown
          .addOption("auto", this.i18n.langAuto)
          .addOption("es", this.i18n.langEs)
          .addOption("en", this.i18n.langEn)
          .setValue(this.plugin.settings.ocrLanguage)
          .onChange(async (value: OcrLanguage) => {
            this.plugin.settings.ocrLanguage = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(this.i18n.settingMaxSize)
      .setDesc(this.i18n.settingMaxSizeDesc)
      .addText((text) =>
        text.setValue(String(this.plugin.settings.maxImageSizeMb)).onChange(async (value) => {
          const parsed = Number(value);
          if (Number.isFinite(parsed)) {
            this.plugin.settings.maxImageSizeMb = Math.max(1, Math.min(15, Math.round(parsed)));
            await this.plugin.saveSettings();
          }
        }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingTimeout)
      .setDesc(this.i18n.settingTimeoutDesc)
      .addText((text) =>
        text.setValue(String(this.plugin.settings.ocrTimeoutSeconds)).onChange(async (value) => {
          const parsed = Number(value);
          if (Number.isFinite(parsed)) {
            this.plugin.settings.ocrTimeoutSeconds = Math.max(
              MIN_TIMEOUT_SECONDS,
              Math.min(MAX_TIMEOUT_SECONDS, Math.round(parsed)),
            );
            await this.plugin.saveSettings();
          }
        }),
      );

    containerEl.createEl("h3", { text: this.i18n.sectionPdf });

    new Setting(containerEl)
      .setName(this.i18n.settingPdfExportFolder)
      .setDesc(this.i18n.settingPdfExportFolderDesc)
      .addText((text) =>
        text
          .setPlaceholder("Exports/PDF")
          .setValue(this.plugin.settings.pdfExportFolder)
          .onChange(async (value) => {
            this.plugin.settings.pdfExportFolder = value.trim().replace(/^\/+|\/+$/g, "");
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingMinPdfChars)
      .setDesc(this.i18n.settingMinPdfCharsDesc)
      .addText((text) =>
        text
          .setValue(String(this.plugin.settings.minPdfSelectionChars))
          .onChange(async (value) => {
            const parsed = Number(value);
            if (Number.isFinite(parsed)) {
              this.plugin.settings.minPdfSelectionChars = Math.max(1, Math.min(500, Math.round(parsed)));
              await this.plugin.saveSettings();
            }
          }),
      );
  }
}
