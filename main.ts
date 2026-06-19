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
  AI_DEFINITION_MAX_CHARS,
  AI_DEFINITION_MAX_WORDS,
  buildOptimizedImagePathWithExtension,
  MAX_TIMEOUT_SECONDS,
  MIN_TIMEOUT_SECONDS,
  buildSelectionPdfOutputPath,
  clampTimeoutSeconds,
  getMarkdownImageMatches,
  getMarkdownImageMatch,
  getAiDefinitionLanguageName,
  isAiDefinitionSelectionValid,
  isImageOptimizationSupported,
  resolveMarkdownImagePaths,
  removeWikiDecorators,
  sanitizeOcrText,
} from "./magic-tools-utils";

type OcrProvider = "gemini" | "openai" | "local";
type OcrLanguage = "auto" | "es" | "en";
type AiDefinitionLanguage = "auto" | "en" | "es" | "pt" | "fr" | "de" | "it" | "nl" | "ru" | "zh" | "ja";

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
  enableImageOptimization: boolean;
  replaceOriginalImage: boolean;
  createBackupBeforeReplace: boolean;
  enableAiDefinitions: boolean;
  aiDefinitionLanguage: AiDefinitionLanguage;
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
  enableImageOptimization: false,
  replaceOriginalImage: true,
  createBackupBeforeReplace: true,
  enableAiDefinitions: false,
  aiDefinitionLanguage: "es",
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
    sectionAiDefinitions: "Definiciones con IA",
    sectionImages: "Imágenes",
    sectionPdf: "Exportador PDF",
    menuGroupTitle: "Magic Tools",
    contextExportSelectionToPdf: "Exportar selección a PDF",
    explainSelectionWithAi: "Explicar selección (IA)",
    aiDefinitionModalTitle: "Explicación breve",
    aiDefinitionFailed: "No se pudo generar la explicación.",
    aiDefinitionApiKeyMissing: "Configurá una API key de IA para usar esta función.",
    aiDefinitionTimeout: "Se agotó el tiempo al pedir la explicación. Probá de nuevo.",
    aiDefinitionServiceUnavailable: "El proveedor de IA no está disponible temporalmente (503). Probá en unos segundos.",
    aiDefinitionRateLimited: "Se alcanzó el límite del proveedor de IA (429). Esperá un momento e intentá de nuevo.",
    aiDefinitionSelectionInvalid: `Seleccioná un término o frase corta (máx. ${AI_DEFINITION_MAX_WORDS} palabras o ${AI_DEFINITION_MAX_CHARS} caracteres).`,
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
    optimizeModalTitle: "Recortar y redimensionar imagen",
    optimizeAction: "Recortar y redimensionar imagen",
    optimizeApply: "Aplicar optimización",
    cropCancel: "Cancelar",
    optimizeSavedReplaced: "Imagen optimizada guardada. Se reemplazó el original.",
    optimizeSavedReplacedWithBackup: "Imagen optimizada guardada. Se reemplazó el original (backup: .bkp).",
    optimizeSavedNewFile: (path: string) => `Imagen optimizada guardada como: ${path}`,
    optimizeUnsupportedFormat: (ext: string) =>
      `Formato de imagen no soportado para optimización: .${ext}. Soportados: png, jpg, jpeg, webp.`,
    optimizeSaveFailed: "No se pudo guardar la imagen optimizada.",
    optimizeWouldIncreaseSize:
      "La optimización propuesta aumentaría el tamaño de la imagen. Bajá más la calidad o recortá más para continuar.",
    optimizeCurrentResolution: "Resolución actual",
    optimizeEstimatedCurrentSize: "Tamaño estimado actual",
    optimizeQualityLabel: "Calidad",
    optimizeQualityNotApplicable: "(no aplica para PNG)",
    optimizePngConversionNotice:
      "En PNG no se puede ajustar calidad perceptual. Para comprimir con calidad, convertí a JPG.",
    optimizeConvertToJpg: "Convertir PNG a JPG",
    optimizeConvertFormatDisclaimer:
      "Si reemplazás el original, se mantiene la extensión del archivo, pero el contenido interno pasa a JPG.",
    optimizeEstimatedOutputResolution: "Resolución estimada de salida",
    optimizeEstimatedOutputSize: "Tamaño estimado de salida",
    optimizeRiskLevel: "Riesgo de degradación",
    optimizeRiskLow: "Bajo",
    optimizeRiskMedium: "Medio",
    optimizeRiskHigh: "Alto",
    optimizeHighRiskTitle: "Optimización agresiva",
    optimizeRiskDisclaimer:
      "Esta optimización puede degradar notablemente la imagen (texto borroso, artefactos y pérdida de detalle). Usala solo si priorizás reducir tamaño.",
    optimizeContinueAnyway: "Continuar de todos modos",
    settingEnableImageOptimization: "Habilitar acción de optimización de imagen",
    settingEnableImageOptimizationDesc:
      "Muestra la acción contextual para recortar y redimensionar imágenes.",
    settingReplaceOriginalImage: "Reemplazar imagen original",
    settingReplaceOriginalImageDesc:
      "Si está activo, sobrescribe el archivo original con la versión optimizada.",
    settingCreateBackupBeforeReplace: "Crear backup antes de reemplazar",
    settingCreateBackupBeforeReplaceDesc:
      "Si está activo, crea un archivo .bkp antes de sobrescribir la imagen original.",
    settingImageRiskDisclaimer:
      "⚠️ Si reemplazás la imagen original sin backup, no hay forma automática de recuperarla.",
    settingEnableAiDefinitions: "Habilitar explicación breve por selección",
    settingEnableAiDefinitionsDesc:
      "Agrega una acción contextual para explicar un término o frase corta usando IA.",
    settingAiDefinitionLanguage: "Idioma de respuesta",
    settingAiDefinitionLanguageDesc: "Idioma preferido para la explicación breve.",
    aiDefinitionsRequiresApi: "Configurá una API key de Gemini u OpenAI para habilitar esta sección.",
    aiLangAuto: "Automático",
    aiLangEn: "Inglés",
    aiLangEs: "Español",
    aiLangPt: "Portugués",
    aiLangFr: "Francés",
    aiLangDe: "Alemán",
    aiLangIt: "Italiano",
    aiLangNl: "Neerlandés",
    aiLangRu: "Ruso",
    aiLangZh: "Chino (simplificado)",
    aiLangJa: "Japonés",
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
    sectionAiDefinitions: "AI Definitions",
    sectionImages: "Images",
    sectionPdf: "PDF exporter",
    menuGroupTitle: "Magic Tools",
    contextExportSelectionToPdf: "Export selection to PDF",
    explainSelectionWithAi: "Explain selection (AI)",
    aiDefinitionModalTitle: "Quick explanation",
    aiDefinitionFailed: "Could not generate explanation.",
    aiDefinitionApiKeyMissing: "Configure an AI API key to use this feature.",
    aiDefinitionTimeout: "Explanation request timed out. Please try again.",
    aiDefinitionServiceUnavailable: "AI provider is temporarily unavailable (503). Please retry in a few seconds.",
    aiDefinitionRateLimited: "AI provider rate limit reached (429). Please wait and retry.",
    aiDefinitionSelectionInvalid: `Select a short term or phrase (max ${AI_DEFINITION_MAX_WORDS} words or ${AI_DEFINITION_MAX_CHARS} chars).`,
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
    optimizeModalTitle: "Crop and resize image",
    optimizeAction: "Crop and resize image",
    optimizeApply: "Apply optimization",
    cropCancel: "Cancel",
    optimizeSavedReplaced: "Optimized image saved. Original replaced.",
    optimizeSavedReplacedWithBackup: "Optimized image saved. Original replaced (backup: .bkp).",
    optimizeSavedNewFile: (path: string) => `Optimized image saved as: ${path}`,
    optimizeUnsupportedFormat: (ext: string) =>
      `Unsupported image format for optimization: .${ext}. Supported: png, jpg, jpeg, webp.`,
    optimizeSaveFailed: "Could not save optimized image.",
    optimizeWouldIncreaseSize:
      "The proposed optimization would increase image size. Lower quality or crop more to continue.",
    optimizeCurrentResolution: "Current resolution",
    optimizeEstimatedCurrentSize: "Current estimated size",
    optimizeQualityLabel: "Quality",
    optimizeQualityNotApplicable: "(not applicable for PNG)",
    optimizePngConversionNotice:
      "PNG does not support perceptual quality adjustment. Convert to JPG to use quality compression.",
    optimizeConvertToJpg: "Convert PNG to JPG",
    optimizeConvertFormatDisclaimer:
      "If you replace the original, the file extension is preserved but internal content is converted to JPG.",
    optimizeEstimatedOutputResolution: "Estimated output resolution",
    optimizeEstimatedOutputSize: "Estimated output size",
    optimizeRiskLevel: "Degradation risk",
    optimizeRiskLow: "Low",
    optimizeRiskMedium: "Medium",
    optimizeRiskHigh: "High",
    optimizeHighRiskTitle: "Aggressive optimization",
    optimizeRiskDisclaimer:
      "This optimization may noticeably degrade image quality (blurry text, artifacts, detail loss). Use it only if file size reduction is the priority.",
    optimizeContinueAnyway: "Continue anyway",
    settingEnableImageOptimization: "Enable image optimization action",
    settingEnableImageOptimizationDesc:
      "Shows the contextual action to crop and resize images.",
    settingReplaceOriginalImage: "Replace original image",
    settingReplaceOriginalImageDesc:
      "If enabled, overwrite the original file with the optimized version.",
    settingCreateBackupBeforeReplace: "Create backup before replace",
    settingCreateBackupBeforeReplaceDesc:
      "If enabled, creates a .bkp file before overwriting the original image.",
    settingImageRiskDisclaimer:
      "⚠️ If you replace the original image without backup, it cannot be recovered automatically.",
    settingEnableAiDefinitions: "Enable quick explanation from selection",
    settingEnableAiDefinitionsDesc:
      "Adds a contextual action to explain a short term or phrase using AI.",
    settingAiDefinitionLanguage: "Response language",
    settingAiDefinitionLanguageDesc: "Preferred language for the quick explanation.",
    aiDefinitionsRequiresApi: "Configure a Gemini or OpenAI API key to enable this section.",
    aiLangAuto: "Auto",
    aiLangEn: "English",
    aiLangEs: "Spanish",
    aiLangPt: "Portuguese",
    aiLangFr: "French",
    aiLangDe: "German",
    aiLangIt: "Italian",
    aiLangNl: "Dutch",
    aiLangRu: "Russian",
    aiLangZh: "Chinese (Simplified)",
    aiLangJa: "Japanese",
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

class AiDefinitionModal extends Modal {
  private readonly i18n = I18N[getLocale()];

  constructor(
    app: App,
    private readonly text: string,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText(this.i18n.aiDefinitionModalTitle);

    const body = this.contentEl.createEl("textarea", {
      text: this.text,
      cls: "magic-tools-ocr-textarea",
    });
    body.style.width = "100%";
    body.style.minHeight = "140px";
    body.style.resize = "vertical";

    const buttonRow = this.contentEl.createDiv({ cls: "magic-tools-button-row" });
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "8px";

    const copyButton = buttonRow.createEl("button", { text: this.i18n.copyText });
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(body.value);
      new Notice(this.i18n.copied);
    });

    const closeButton = buttonRow.createEl("button", { text: this.i18n.close });
    closeButton.addEventListener("click", () => this.close());
  }
}

interface ImageOptimizationPayload {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
  outputMimeType: string;
}

class ImageOptimizationModal extends Modal {
  private readonly i18n = I18N[getLocale()];
  private canvas!: HTMLCanvasElement;
  private img!: HTMLImageElement;
  private currentResolutionValueEl!: HTMLSpanElement;
  private currentSizeValueEl!: HTMLSpanElement;
  private outputResolutionValueEl!: HTMLSpanElement;
  private outputSizeValueEl!: HTMLSpanElement;
  private riskValueEl!: HTMLSpanElement;
  private optimizeButton!: HTMLButtonElement;
  private cropX = 0;
  private cropY = 0;
  private cropW = 0;
  private cropH = 0;
  private quality = 90;
  private qualityEnabled = true;
  private forceJpegConversion = false;
  private estimateRequestId = 0;
  private isDragging = false;
  private isResizing = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private resizeHandle = "";
  private readonly HANDLE_SIZE = 14;
  private readonly HANDLE_HITBOX = 24;
  private readonly QUALITY_OPTIONS = [90, 75, 50, 25, 10] as const;

  constructor(
    app: App,
    private readonly imageDataUrl: string,
    private readonly outputMimeType: string,
    private readonly currentSizeBytes: number,
    private readonly onOptimize: (payload: ImageOptimizationPayload) => Promise<void>,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText(this.i18n.optimizeModalTitle);
    this.modalEl.style.maxWidth = "90vw";
    this.modalEl.style.width = "fit-content";

    const infoContainer = this.contentEl.createDiv({ cls: "magic-tools-optimize-info" });
    infoContainer.style.cssText = "display:grid;grid-template-columns:auto 1fr;gap:6px 10px;margin-bottom:10px;";

    this.currentResolutionValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeCurrentResolution);
    this.currentSizeValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeEstimatedCurrentSize);
    this.outputResolutionValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeEstimatedOutputResolution);
    this.outputSizeValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeEstimatedOutputSize);
    this.riskValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeRiskLevel);

    const qualityRow = this.contentEl.createDiv({ cls: "magic-tools-optimize-quality-row" });
    qualityRow.style.cssText = "display:flex;align-items:center;gap:10px;margin-bottom:10px;";
    const qualityLabelEl = qualityRow.createEl("label", { text: this.i18n.optimizeQualityLabel });
    const qualitySelect = qualityRow.createEl("select");
    for (const value of this.QUALITY_OPTIONS) {
      const option = qualitySelect.createEl("option", { text: String(value) });
      option.value = String(value);
      if (value === this.quality) {
        option.selected = true;
      }
    }
    qualitySelect.addEventListener("change", () => {
      this.quality = Number(qualitySelect.value) || 90;
      void this.updateEstimatedOutputSize();
    });

    this.qualityEnabled = this.outputMimeType !== "image/png";
    if (!this.qualityEnabled) {
      qualitySelect.disabled = true;
      qualityLabelEl.setText(`${this.i18n.optimizeQualityLabel} ${this.i18n.optimizeQualityNotApplicable}`);

      const pngNotice = this.contentEl.createDiv({ text: this.i18n.optimizePngConversionNotice });
      pngNotice.style.cssText = "margin-bottom:8px;color:var(--text-muted);font-size:12px;";

      const convertRow = this.contentEl.createDiv({ cls: "magic-tools-optimize-convert-row" });
      convertRow.style.cssText = "display:flex;align-items:center;gap:8px;margin-bottom:10px;";
      const convertToggle = convertRow.createEl("input");
      convertToggle.type = "checkbox";
      const convertLabel = convertRow.createEl("label", { text: this.i18n.optimizeConvertToJpg });
      convertLabel.style.cursor = "pointer";
      convertLabel.addEventListener("click", () => {
        if (!convertToggle.checked) {
          convertToggle.checked = true;
          convertToggle.dispatchEvent(new Event("change"));
        }
      });

      convertToggle.addEventListener("change", () => {
        if (convertToggle.checked) {
          this.forceJpegConversion = true;
          convertToggle.disabled = true;
          qualitySelect.disabled = false;
          qualityLabelEl.setText(this.i18n.optimizeQualityLabel);
          const convertDisclaimer = this.contentEl.createDiv({ text: this.i18n.optimizeConvertFormatDisclaimer });
          convertDisclaimer.style.cssText = "margin-bottom:8px;color:var(--text-muted);font-size:12px;";
          void this.updateEstimatedOutputSize();
        }
      });
    }

    this.canvas = this.contentEl.createEl("canvas");
    this.canvas.style.display = "block";
    this.canvas.style.cursor = "crosshair";
    this.canvas.style.maxWidth = "80vw";
    this.canvas.style.maxHeight = "50vh";

    this.img = new Image();
    this.img.onload = () => this.initCanvas();
    this.img.src = this.imageDataUrl;

    const buttonRow = this.contentEl.createDiv({ cls: "magic-tools-button-row" });
    buttonRow.style.cssText = "display:flex;gap:8px;margin-top:10px;";

    this.optimizeButton = buttonRow.createEl("button", { text: this.i18n.optimizeApply, cls: "mod-cta" });
    this.optimizeButton.addEventListener("click", () => void this.performOptimization(this.optimizeButton));

    const cancelBtn = buttonRow.createEl("button", { text: this.i18n.cropCancel });
    cancelBtn.addEventListener("click", () => this.close());

    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  onClose(): void {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  private initCanvas(): void {
    const maxW = Math.min(window.innerWidth * 0.8, this.img.naturalWidth);
    const maxH = Math.min(window.innerHeight * 0.5, this.img.naturalHeight);
    const scale = Math.min(maxW / this.img.naturalWidth, maxH / this.img.naturalHeight, 1);
    this.canvas.width = Math.round(this.img.naturalWidth * scale);
    this.canvas.height = Math.round(this.img.naturalHeight * scale);
    this.canvas.style.width = `${this.canvas.width}px`;
    this.canvas.style.height = `${this.canvas.height}px`;

    // Initial crop = full image
    this.cropX = 0;
    this.cropY = 0;
    this.cropW = this.canvas.width;
    this.cropH = this.canvas.height;

    this.draw();
    this.currentResolutionValueEl.setText(`${this.img.naturalWidth} x ${this.img.naturalHeight}`);
    this.currentSizeValueEl.setText(this.formatSize(this.currentSizeBytes));
    this.updateEstimatedOutputResolution();
    void this.updateEstimatedOutputSize();
  }

  private createInfoRow(container: HTMLElement, label: string): HTMLSpanElement {
    container.createEl("span", { text: `${label}:` });
    return container.createEl("span", { text: "-" });
  }

  private draw(): void {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    // Dim outside crop region
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, this.canvas.width, this.cropY);
    ctx.fillRect(0, this.cropY + this.cropH, this.canvas.width, this.canvas.height - this.cropY - this.cropH);
    ctx.fillRect(0, this.cropY, this.cropX, this.cropH);
    ctx.fillRect(this.cropX + this.cropW, this.cropY, this.canvas.width - this.cropX - this.cropW, this.cropH);

    // Crop rectangle border
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(this.cropX, this.cropY, this.cropW, this.cropH);

    // Corner handles
    ctx.fillStyle = "#00bcd4";
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    const h = this.HANDLE_SIZE;
    const corners = this.getHandleRects();
    for (const rect of Object.values(corners)) {
      ctx.fillRect(rect.x, rect.y, h, h);
      ctx.strokeRect(rect.x, rect.y, h, h);
    }
  }

  private getHandleRects(): Record<string, { x: number; y: number }> {
    const h = this.HANDLE_SIZE;
    const { cropX: x, cropY: y, cropW: w, cropH: hh } = this;
    return {
      nw: { x: x - h / 2, y: y - h / 2 },
      ne: { x: x + w - h / 2, y: y - h / 2 },
      sw: { x: x - h / 2, y: y + hh - h / 2 },
      se: { x: x + w - h / 2, y: y + hh - h / 2 },
    };
  }

  private hitTestHandle(mx: number, my: number): string {
    const h = this.HANDLE_SIZE;
    const hb = this.HANDLE_HITBOX;
    for (const [name, rect] of Object.entries(this.getHandleRects())) {
      const cx = rect.x + h / 2;
      const cy = rect.y + h / 2;
      if (mx >= cx - hb / 2 && mx <= cx + hb / 2 && my >= cy - hb / 2 && my <= cy + hb / 2) {
        return name;
      }
    }
    return "";
  }

  private hitTestCrop(mx: number, my: number): boolean {
    return (
      mx >= this.cropX && mx <= this.cropX + this.cropW &&
      my >= this.cropY && my <= this.cropY + this.cropH
    );
  }

  private canvasCoords(e: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? this.canvas.width / rect.width : 1;
    const scaleY = rect.height > 0 ? this.canvas.height / rect.height : 1;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return {
      x: Math.max(0, Math.min(this.canvas.width, x)),
      y: Math.max(0, Math.min(this.canvas.height, y)),
    };
  }

  private onMouseDown(e: MouseEvent): void {
    const { x, y } = this.canvasCoords(e);
    const handle = this.hitTestHandle(x, y);
    if (handle) {
      this.isResizing = true;
      this.resizeHandle = handle;
      this.dragStartX = x;
      this.dragStartY = y;
      return;
    }
    if (this.hitTestCrop(x, y)) {
      this.isDragging = true;
      this.dragStartX = x - this.cropX;
      this.dragStartY = y - this.cropY;
      return;
    }
    // Start new crop region
    this.isDragging = false;
    this.isResizing = false;
    this.cropX = x;
    this.cropY = y;
    this.cropW = 1;
    this.cropH = 1;
    this.isResizing = true;
    this.resizeHandle = "se";
    this.dragStartX = x;
    this.dragStartY = y;
  }

  private readonly onMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging && !this.isResizing) return;
    const { x, y } = this.canvasCoords(e);

    if (this.isDragging) {
      this.cropX = Math.max(0, Math.min(this.canvas.width - this.cropW, x - this.dragStartX));
      this.cropY = Math.max(0, Math.min(this.canvas.height - this.cropH, y - this.dragStartY));
    } else {
      const dx = x - this.dragStartX;
      const dy = y - this.dragStartY;
      this.dragStartX = x;
      this.dragStartY = y;

      const h = this.resizeHandle;
      if (h.includes("e")) this.cropW = Math.max(10, this.cropW + dx);
      if (h.includes("s")) this.cropH = Math.max(10, this.cropH + dy);
      if (h.includes("w")) {
        const newW = Math.max(10, this.cropW - dx);
        this.cropX += this.cropW - newW;
        this.cropW = newW;
      }
      if (h.includes("n")) {
        const newH = Math.max(10, this.cropH - dy);
        this.cropY += this.cropH - newH;
        this.cropH = newH;
      }

      // Clamp to canvas bounds
      this.cropX = Math.max(0, this.cropX);
      this.cropY = Math.max(0, this.cropY);
      if (this.cropX + this.cropW > this.canvas.width) this.cropW = this.canvas.width - this.cropX;
      if (this.cropY + this.cropH > this.canvas.height) this.cropH = this.canvas.height - this.cropY;
    }

    this.draw();
    this.updateEstimatedOutputResolution();
    void this.updateEstimatedOutputSize();
  };

  private readonly onMouseUp = (): void => {
    this.isDragging = false;
    this.isResizing = false;
  };

  private async performOptimization(optimizeButton: HTMLButtonElement): Promise<void> {
    optimizeButton.disabled = true;
    try {
      const payload = await this.renderOptimizedBlob();
      if (payload.blob.size >= this.currentSizeBytes) {
        new Notice(this.i18n.optimizeWouldIncreaseSize, 8000);
        return;
      }
      const risk = this.evaluateRisk(payload);
      if (risk.level === "high") {
        const confirmed = await this.confirmHighRiskOptimization(risk.message);
        if (!confirmed) return;
      }
      await this.onOptimize(payload);
      this.close();
    } catch (error) {
      console.error("[Magic Tools] Optimize image failed", error);
      new Notice(this.i18n.optimizeSaveFailed);
    } finally {
      optimizeButton.disabled = false;
    }
  }

  private getSourceRect(): { x: number; y: number; width: number; height: number } {
    const scaleX = this.img.naturalWidth / this.canvas.width;
    const scaleY = this.img.naturalHeight / this.canvas.height;

    const srcX = Math.round(this.cropX * scaleX);
    const srcY = Math.round(this.cropY * scaleY);
    const srcW = Math.max(1, Math.round(this.cropW * scaleX));
    const srcH = Math.max(1, Math.round(this.cropH * scaleY));

    return { x: srcX, y: srcY, width: srcW, height: srcH };
  }

  private updateEstimatedOutputResolution(): void {
    const rect = this.getSourceRect();
    this.outputResolutionValueEl.setText(`${rect.width} x ${rect.height}`);
  }

  private async updateEstimatedOutputSize(): Promise<void> {
    const requestId = ++this.estimateRequestId;
    this.outputSizeValueEl.setText("...");
    if (this.optimizeButton) this.optimizeButton.disabled = true;
    try {
      const payload = await this.renderOptimizedBlob();
      if (requestId !== this.estimateRequestId) return;
      this.outputResolutionValueEl.setText(`${payload.width} x ${payload.height}`);
      const qualityInfo = payload.quality !== this.quality ? ` (${payload.quality})` : "";
      const sizeText = `${this.formatSize(payload.blob.size)}${qualityInfo}`;
      const risk = this.evaluateRisk(payload);
      this.riskValueEl.setText(risk.label);
      if (payload.blob.size >= this.currentSizeBytes) {
        this.outputSizeValueEl.setText(`${sizeText} ⚠️`);
        if (this.optimizeButton) this.optimizeButton.disabled = true;
      } else {
        this.outputSizeValueEl.setText(sizeText);
        if (this.optimizeButton) this.optimizeButton.disabled = false;
      }
    } catch {
      if (requestId !== this.estimateRequestId) return;
      this.outputSizeValueEl.setText("-");
      this.riskValueEl.setText("-");
      if (this.optimizeButton) this.optimizeButton.disabled = true;
    }
  }

  private evaluateRisk(payload: ImageOptimizationPayload): { level: "low" | "medium" | "high"; label: string; message: string } {
    const ratio = payload.blob.size / Math.max(1, this.currentSizeBytes);
    const pixels = Math.max(1, payload.width * payload.height);
    const bpp = (payload.blob.size * 8) / pixels;
    const lowQuality = this.qualityEnabled && payload.quality <= 30;
    const aggressiveShrink = ratio < 0.25;
    const veryLowBpp = bpp < 0.6;

    if ((lowQuality && aggressiveShrink) || (lowQuality && veryLowBpp) || (aggressiveShrink && veryLowBpp)) {
      return {
        level: "high",
        label: this.i18n.optimizeRiskHigh,
        message: this.i18n.optimizeRiskDisclaimer,
      };
    }

    if ((this.qualityEnabled && payload.quality <= 40) || ratio < 0.4 || bpp < 1.0) {
      return {
        level: "medium",
        label: this.i18n.optimizeRiskMedium,
        message: this.i18n.optimizeRiskDisclaimer,
      };
    }

    return {
      level: "low",
      label: this.i18n.optimizeRiskLow,
      message: this.i18n.optimizeRiskDisclaimer,
    };
  }

  private confirmHighRiskOptimization(message: string): Promise<boolean> {
    const prompt = `${this.i18n.optimizeHighRiskTitle}\n\n${message}\n\n${this.i18n.optimizeContinueAnyway}?`;
    return Promise.resolve(window.confirm(prompt));
  }

  private async renderOptimizedBlob(): Promise<ImageOptimizationPayload> {
    const src = this.getSourceRect();

    const baseCanvas = document.createElement("canvas");
    baseCanvas.width = src.width;
    baseCanvas.height = src.height;
    const baseCtx = baseCanvas.getContext("2d");
    if (!baseCtx) throw new Error("Canvas context unavailable");
    baseCtx.drawImage(this.img, src.x, src.y, src.width, src.height, 0, 0, src.width, src.height);

    const qualityCandidates = this.getCandidateQualities();
    const scaleCandidates = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25];
    let bestPayload: ImageOptimizationPayload | null = null;

    for (const scale of scaleCandidates) {
      const targetW = Math.max(1, Math.round(src.width * scale));
      const targetH = Math.max(1, Math.round(src.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(baseCanvas, 0, 0, src.width, src.height, 0, 0, targetW, targetH);

      for (const q of qualityCandidates) {
        const blob = await this.renderBlob(canvas, q);
        if (!blob) continue;

        const payload: ImageOptimizationPayload = {
          blob,
          width: targetW,
          height: targetH,
          quality: q,
          outputMimeType: this.getEffectiveOutputMimeType(),
        };

        if (!bestPayload || payload.blob.size < bestPayload.blob.size) {
          bestPayload = payload;
        }

        if (payload.blob.size < this.currentSizeBytes) {
          return payload;
        }
      }
    }

    if (bestPayload) return bestPayload;

    throw new Error("Blob conversion failed");
  }

  private getCandidateQualities(): number[] {
    if (!this.qualityEnabled && !this.forceJpegConversion) {
      return [this.quality];
    }

    const filtered = this.QUALITY_OPTIONS.filter((q) => q <= this.quality);
    return filtered.length ? [...filtered] : [this.quality];
  }

  private renderBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
    const mime = this.getEffectiveOutputMimeType();
    return new Promise((resolve) => {
      canvas.toBlob(resolve, mime, quality / 100);
    });
  }

  private getEffectiveOutputMimeType(): string {
    return this.forceJpegConversion ? "image/jpeg" : this.outputMimeType;
  }

  private formatSize(bytes: number): string {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
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
        if (this.findImageContextNearPointer(editor, window.event as PointerEvent | undefined)) {
          return;
        }
        const pointerEvent = window.event as PointerEvent | undefined;
        const imageContext =
          this.findImageContextNearPointer(editor, pointerEvent) ?? this.getCurrentImageContext(editor, view);

        const selectedText = editor.getSelection().trim();
        const hasSelection = selectedText.length >= this.settings.minPdfSelectionChars;
        const canExportSelection = hasSelection && !!view.file;
        const canExtractImage = !!imageContext;
        const canOptimizeImage = canExtractImage && this.settings.enableImageOptimization;
        const canExplainSelection = this.canShowAiDefinitionAction(selectedText);

        if (!canExportSelection && !canExtractImage && !canOptimizeImage && !canExplainSelection) {
          return;
        }

        menu.addItem((item) => {
          item.setTitle(this.i18n.menuGroupTitle).setIsLabel(true).setSection("magic-tools");
        });

        if (canExportSelection && view.file) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.contextExportSelectionToPdf);
            item.setSection("magic-tools");
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

        if (canExplainSelection) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.explainSelectionWithAi);
            item.setSection("magic-tools");
            item.onClick(async () => {
              await this.handleAiDefinition(selectedText);
            });
          });
        }

        if (canExtractImage && imageContext) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.extractTextFromImage);
            item.setSection("magic-tools");
            item.onClick(async () => this.handleImageOcr(editor, imageContext));
          });
        }

        if (canOptimizeImage && imageContext) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.optimizeAction);
            item.setSection("magic-tools");
            item.onClick(async () => this.handleImageOptimization(imageContext.file));
          });
        }
      }),
    );

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof TFile)) return;
        if (!this.isImageFile(file)) return;

        menu.addItem((item) => {
          item.setTitle(this.i18n.menuGroupTitle).setIsLabel(true).setSection("magic-tools");
        });

        menu.addItem((item) => {
          item.setTitle(this.i18n.extractTextFromImage);
          item.setSection("magic-tools");
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

            await this.handleImageOcr(editor, imageContext);
          });
        });

        if (this.settings.enableImageOptimization) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.optimizeAction);
            item.setSection("magic-tools");
            item.onClick(async () => this.handleImageOptimization(file));
          });
        }
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

  private async handleImageOcr(editor: Editor, imageContext: ImageContext): Promise<void> {
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

  private async handleImageOptimization(imageFile: TFile): Promise<void> {
    const extension = imageFile.extension.toLowerCase();
    if (!isImageOptimizationSupported(extension)) {
      new Notice(this.i18n.optimizeUnsupportedFormat(extension));
      return;
    }

    const binary = await this.app.vault.readBinary(imageFile);
    const mimeType = this.getMimeType(extension);
    const base64 = this.arrayBufferToBase64(binary);
    const dataUrl = `data:${mimeType};base64,${base64}`;

    new ImageOptimizationModal(this.app, dataUrl, mimeType, binary.byteLength, async (payload) => {
      try {
        const optimizedBinary = await payload.blob.arrayBuffer();

        if (this.settings.replaceOriginalImage) {
          if (this.settings.createBackupBeforeReplace) {
            const bkpPath = imageFile.path + ".bkp";
            await this.app.vault.adapter.writeBinary(bkpPath, binary);
          }

          await this.app.vault.modifyBinary(imageFile, optimizedBinary);
          new Notice(
            this.settings.createBackupBeforeReplace
              ? this.i18n.optimizeSavedReplacedWithBackup
              : this.i18n.optimizeSavedReplaced,
          );
          return;
        }

        const outputExt = payload.outputMimeType === "image/jpeg"
          ? "jpg"
          : payload.outputMimeType === "image/webp"
            ? "webp"
            : imageFile.extension;
        const outputPath = buildOptimizedImagePathWithExtension(imageFile.path, outputExt);
        await this.app.vault.adapter.writeBinary(outputPath, optimizedBinary);
        new Notice(this.i18n.optimizeSavedNewFile(outputPath));
      } catch (error) {
        console.error("[Magic Tools] Image optimization save failed", error);
        throw error;
      }
    }).open();
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

  hasOnlineAiConfigured(): boolean {
    return !!this.settings.googleApiKey.trim() || !!this.settings.openaiApiKey.trim();
  }

  private canShowAiDefinitionAction(selection: string): boolean {
    return this.settings.enableAiDefinitions
      && this.hasOnlineAiConfigured()
      && !!selection.trim();
  }

  private async handleAiDefinition(selection: string): Promise<void> {
    if (!this.settings.enableAiDefinitions) return;
    if (!this.hasOnlineAiConfigured()) {
      new Notice(this.i18n.aiDefinitionApiKeyMissing);
      return;
    }
    if (!isAiDefinitionSelectionValid(selection)) {
      new Notice(this.i18n.aiDefinitionSelectionInvalid);
      return;
    }

    try {
      const timeoutMs = clampTimeoutSeconds(this.settings.ocrTimeoutSeconds) * 1000;
      const explanation = await withTimeout(this.runAiDefinition(selection), timeoutMs);
      const safeText = sanitizeOcrText(explanation);
      if (!safeText) {
        throw new Error("EMPTY_AI_DEFINITION_RESULT");
      }

      const singleParagraph = safeText.replace(/\s*\n+\s*/g, " ").trim();
      const normalizedTerm = selection.trim();
      const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const termTokens = normalizedTerm.split(/\s+/).filter(Boolean).map(escapeRegex);
      const termPattern = termTokens.length ? new RegExp(`\\b${termTokens.join("\\\\s+")}\\b`, "i") : null;
      const matchedTermInExplanation = termPattern ? singleParagraph.match(termPattern)?.[0] ?? "" : "";
      const smartCapitalizeWord = (word: string): string => {
        if (!word) return word;
        const hasUpperAfterFirst = /[A-Z]/.test(word.slice(1));
        if (hasUpperAfterFirst) return word;
        if (word === word.toUpperCase()) return word;
        if (word === word.toLowerCase()) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      };
      const fallbackCapitalizedTerm = normalizedTerm
        .split(/(\s+)/)
        .map((chunk) => (chunk.trim() ? smartCapitalizeWord(chunk) : chunk))
        .join("");
      const capitalizedTerm = matchedTermInExplanation || fallbackCapitalizedTerm;
      const formatted = `**${capitalizedTerm}**: ${singleParagraph}`;

      new AiDefinitionModal(this.app, formatted).open();
    } catch (error) {
      console.error("[Magic Tools] Explain selection failed", error);
      if (error instanceof Error && error.message === "OCR_TIMEOUT") {
        new Notice(this.i18n.aiDefinitionTimeout, 8000);
      } else if (error instanceof Error && error.message.includes("HTTP 503")) {
        new Notice(this.i18n.aiDefinitionServiceUnavailable, 8000);
      } else if (error instanceof Error && error.message.includes("HTTP 429")) {
        new Notice(this.i18n.aiDefinitionRateLimited, 8000);
      } else {
        new Notice(this.i18n.aiDefinitionFailed);
      }
    }
  }

  private resolveAiDefinitionProvider(): "gemini" | "openai" | null {
    if (this.settings.defaultProvider === "gemini" && this.settings.googleApiKey.trim()) return "gemini";
    if (this.settings.defaultProvider === "openai" && this.settings.openaiApiKey.trim()) return "openai";
    if (this.settings.openaiApiKey.trim()) return "openai";
    if (this.settings.googleApiKey.trim()) return "gemini";
    return null;
  }

  private getAiLanguageHint(): string {
    return getAiDefinitionLanguageName(this.settings.aiDefinitionLanguage);
  }

  private async runAiDefinition(selection: string): Promise<string> {
    const provider = this.resolveAiDefinitionProvider();
    if (!provider) {
      throw new Error(this.i18n.aiDefinitionApiKeyMissing);
    }

    const languageHint = this.getAiLanguageHint();
    const prompt =
      `Explain the selected term or phrase in 2-4 short sentences. ` +
      `If it is a company, person, or organization, explain what it is and why it is known. ` +
      `Be concise, factual, and avoid markdown/bullets. Language: ${languageHint}. Selection: ${selection}`;

    if (provider === "gemini") {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.settings.googleApiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
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
      return payload.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("\n") ?? "";
    }

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
            content: [{ type: "input_text", text: prompt }],
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
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    };

    if (payload.output_text?.trim()) {
      return payload.output_text;
    }

    return payload.output
      ?.flatMap((item) => item.content ?? [])
      .map((part) => (part.type === "output_text" || part.type === "text" ? part.text ?? "" : ""))
      .join("\n")
      .trim() ?? "";
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

    if (!view.file) return null;
    const matches = getMarkdownImageMatches(lineText);
    for (const syntax of matches) {
      const file = this.resolveImageFile(syntax, view.file.path);
      if (file) {
        return {
          file,
          line,
          syntax,
        };
      }
    }
    return null;
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

    const candidates = resolveMarkdownImagePaths(mdMatch[1], sourcePath);
    for (const candidate of candidates) {
      const af = this.app.vault.getAbstractFileByPath(candidate);
      if (af instanceof TFile) return af;
    }
    return null;
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

      const candidates = resolveMarkdownImagePaths(rawPath, sourcePath);
      for (const candidate of candidates) {
        const file = this.app.vault.getAbstractFileByPath(candidate);
        if (file instanceof TFile) {
          return `![${alt}](${this.app.vault.getResourcePath(file)})`;
        }
      }
      return `![${alt}](${rawPath})`;
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

    const matches = getMarkdownImageMatches(tokenText || lineText);
    if (!matches.length) return null;

    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) return null;

    for (const syntax of matches) {
      const file = this.resolveImageFile(syntax, activeFile.path);
      if (file) {
        return { file, line, syntax };
      }
    }
    return null;
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
    const loaded = (await this.loadData()) as Partial<MagicToolsSettings> & { enableCrop?: boolean };
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);
    if (typeof loaded.enableImageOptimization !== "boolean" && typeof loaded.enableCrop === "boolean") {
      this.settings.enableImageOptimization = loaded.enableCrop;
    }
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
            this.display();
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
            this.display();
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
          .onChange(async (value: string) => {
            const allowed: OcrProvider[] = ["local", "gemini", "openai"];
            if (allowed.includes(value as OcrProvider)) {
              this.plugin.settings.defaultProvider = value as OcrProvider;
              await this.plugin.saveSettings();
            }
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
          .onChange(async (value: string) => {
            const allowed: OcrLanguage[] = ["auto", "es", "en"];
            if (allowed.includes(value as OcrLanguage)) {
              this.plugin.settings.ocrLanguage = value as OcrLanguage;
              await this.plugin.saveSettings();
            }
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

    containerEl.createEl("h3", { text: this.i18n.sectionAiDefinitions });

    const hasAiApiConfigured = this.plugin.hasOnlineAiConfigured();

    new Setting(containerEl)
      .setName(this.i18n.settingEnableAiDefinitions)
      .setDesc(this.i18n.settingEnableAiDefinitionsDesc)
      .addToggle((toggle) => {
        toggle
          .setValue(hasAiApiConfigured ? this.plugin.settings.enableAiDefinitions : false)
          .setDisabled(!hasAiApiConfigured)
          .onChange(async (value) => {
            this.plugin.settings.enableAiDefinitions = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(this.i18n.settingAiDefinitionLanguage)
      .setDesc(this.i18n.settingAiDefinitionLanguageDesc)
      .addDropdown((dropdown) => {
        dropdown
          .addOption("auto", this.i18n.aiLangAuto)
          .addOption("en", this.i18n.aiLangEn)
          .addOption("es", this.i18n.aiLangEs)
          .addOption("pt", this.i18n.aiLangPt)
          .addOption("fr", this.i18n.aiLangFr)
          .addOption("de", this.i18n.aiLangDe)
          .addOption("it", this.i18n.aiLangIt)
          .addOption("nl", this.i18n.aiLangNl)
          .addOption("ru", this.i18n.aiLangRu)
          .addOption("zh", this.i18n.aiLangZh)
          .addOption("ja", this.i18n.aiLangJa)
          .setValue(this.plugin.settings.aiDefinitionLanguage)
          .setDisabled(!hasAiApiConfigured)
          .onChange(async (value: string) => {
            const allowed: AiDefinitionLanguage[] = ["auto", "en", "es", "pt", "fr", "de", "it", "nl", "ru", "zh", "ja"];
            if (allowed.includes(value as AiDefinitionLanguage)) {
              this.plugin.settings.aiDefinitionLanguage = value as AiDefinitionLanguage;
              await this.plugin.saveSettings();
            }
          });
      });

    if (!hasAiApiConfigured) {
      const warning = containerEl.createEl("p", { text: this.i18n.aiDefinitionsRequiresApi });
      warning.style.margin = "6px 0 12px";
      warning.style.color = "var(--text-warning, #c86d00)";
    }

    containerEl.createEl("h3", { text: this.i18n.sectionImages });

    new Setting(containerEl)
      .setName(this.i18n.settingEnableImageOptimization)
      .setDesc(this.i18n.settingEnableImageOptimizationDesc)
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.enableImageOptimization).onChange(async (value) => {
          this.plugin.settings.enableImageOptimization = value;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingReplaceOriginalImage)
      .setDesc(this.i18n.settingReplaceOriginalImageDesc)
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.replaceOriginalImage).onChange(async (value) => {
          this.plugin.settings.replaceOriginalImage = value;
          await this.plugin.saveSettings();
          this.display();
        }),
      );

    new Setting(containerEl)
      .setName(this.i18n.settingCreateBackupBeforeReplace)
      .setDesc(this.i18n.settingCreateBackupBeforeReplaceDesc)
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.createBackupBeforeReplace).onChange(async (value) => {
          this.plugin.settings.createBackupBeforeReplace = value;
          await this.plugin.saveSettings();
          this.display();
        }),
      );

    if (this.plugin.settings.replaceOriginalImage && !this.plugin.settings.createBackupBeforeReplace) {
      const warning = containerEl.createEl("p", { text: this.i18n.settingImageRiskDisclaimer });
      warning.style.margin = "6px 0 12px";
      warning.style.color = "var(--text-warning, #c86d00)";
    }

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
