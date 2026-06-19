export const MAX_OUTPUT_LENGTH = 20000;
export const MAX_TIMEOUT_SECONDS = 30;
export const MIN_TIMEOUT_SECONDS = 3;
export const IMAGE_OPTIMIZATION_EXTENSIONS = ["png", "jpg", "jpeg", "webp"] as const;
export const AI_DEFINITION_MAX_WORDS = 8;
export const AI_DEFINITION_MAX_CHARS = 60;

export function sanitizeOcrText(input: string): string {
  const withoutControl = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return withoutControl.slice(0, MAX_OUTPUT_LENGTH).trim();
}

export function getMarkdownImageMatch(text: string): string | null {
  return getMarkdownImageMatches(text)[0] ?? null;
}

export function getMarkdownImageMatches(text: string): string[] {
  const matches: Array<{ index: number; syntax: string }> = [];

  const wikiRegex = /!\[\[([^\]]+)\]\]/g;
  for (const m of text.matchAll(wikiRegex)) {
    if (typeof m.index === "number" && m[0]) {
      matches.push({ index: m.index, syntax: m[0] });
    }
  }

  const mdRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
  for (const m of text.matchAll(mdRegex)) {
    if (typeof m.index === "number" && m[0]) {
      matches.push({ index: m.index, syntax: m[0] });
    }
  }

  return matches.sort((a, b) => a.index - b.index).map((m) => m.syntax);
}

export function removeWikiDecorators(pathLike: string): string {
  return pathLike.split("|")[0].split("#")[0].trim();
}

export function clampTimeoutSeconds(seconds: number): number {
  return Math.min(MAX_TIMEOUT_SECONDS, Math.max(MIN_TIMEOUT_SECONDS, Math.round(seconds)));
}

export function getParentPath(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx === -1 ? "" : path.substring(0, idx);
}

/**
 * Resolve a markdown image path (from `![alt](path)`) relative to the note.
 * Returns candidate vault-relative paths in priority order:
 *   1. Relative to the note's parent folder
 *   2. Relative to vault root (fallback)
 */
export function resolveMarkdownImagePaths(rawPath: string, sourcePath: string): string[] {
  const decoded = decodeURIComponent(rawPath.trim());
  const candidates: string[] = [];

  const normalize = (p: string): string => {
    const parts = p.replace(/\\/g, "/").split("/");
    const out: string[] = [];
    for (const part of parts) {
      if (!part || part === ".") continue;
      if (part === "..") {
        if (out.length > 0) out.pop();
        continue;
      }
      out.push(part);
    }
    return out.join("/");
  };

  const pushCandidate = (p: string): void => {
    const normalized = normalize(p);
    if (normalized && !candidates.includes(normalized)) {
      candidates.push(normalized);
    }
  };

  if (decoded.startsWith("/")) {
    // Absolute vault path (leading slash stripped)
    const abs = decoded.substring(1).replace(/\/{2,}/g, "/");
    pushCandidate(abs);
  } else {
    const parent = getParentPath(sourcePath);
    const relative = parent ? `${parent}/${decoded}` : decoded;
    pushCandidate(relative.replace(/\/{2,}/g, "/"));

    // Fallback: try from vault root
    if (parent) {
      pushCandidate(decoded.replace(/\/{2,}/g, "/"));
    }
  }

  return candidates;
}

export function buildSelectionPdfOutputPath(
  notePath: string,
  noteBasename: string,
  exportFolder?: string,
): string {
  const folder = exportFolder?.trim();
  if (folder) {
    return `${folder}/${noteBasename}-selection.pdf`.replace(/\/{2,}/g, "/");
  }

  const parent = getParentPath(notePath);
  const raw = parent ? `${parent}/${noteBasename}-selection.pdf` : `${noteBasename}-selection.pdf`;
  return raw.replace(/\/{2,}/g, "/");
}

export function isImageOptimizationSupported(extension: string): boolean {
  const ext = extension.toLowerCase();
  return IMAGE_OPTIMIZATION_EXTENSIONS.includes(ext as (typeof IMAGE_OPTIMIZATION_EXTENSIONS)[number]);
}

export function isAiDefinitionSelectionValid(
  selection: string,
  maxWords: number = AI_DEFINITION_MAX_WORDS,
  maxChars: number = AI_DEFINITION_MAX_CHARS,
): boolean {
  const normalized = selection.trim();
  if (!normalized) return false;
  if (normalized.length > maxChars) return false;

  const words = normalized.split(/\s+/).filter(Boolean);
  return words.length >= 1 && words.length <= maxWords;
}

export function getAiDefinitionLanguageName(code: string): string {
  const labels: Record<string, string> = {
    auto: "auto",
    en: "English",
    es: "Spanish",
    pt: "Portuguese",
    fr: "French",
    de: "German",
    it: "Italian",
    nl: "Dutch",
    ru: "Russian",
    zh: "Chinese (Simplified)",
    ja: "Japanese",
  };

  return labels[code] ?? "auto";
}

export function buildOptimizedImagePath(filePath: string): string {
  const normalized = filePath.replace(/\\/g, "/");
  const slashIdx = normalized.lastIndexOf("/");
  const folder = slashIdx === -1 ? "" : normalized.substring(0, slashIdx + 1);
  const fileName = slashIdx === -1 ? normalized : normalized.substring(slashIdx + 1);
  const dotIdx = fileName.lastIndexOf(".");

  if (dotIdx === -1) {
    return `${folder}${fileName}-optimized`;
  }

  const base = fileName.substring(0, dotIdx);
  const ext = fileName.substring(dotIdx + 1);
  return `${folder}${base}-optimized.${ext}`;
}

export function buildOptimizedImagePathWithExtension(filePath: string, extension: string): string {
  const normalized = filePath.replace(/\\/g, "/");
  const slashIdx = normalized.lastIndexOf("/");
  const folder = slashIdx === -1 ? "" : normalized.substring(0, slashIdx + 1);
  const fileName = slashIdx === -1 ? normalized : normalized.substring(slashIdx + 1);
  const dotIdx = fileName.lastIndexOf(".");
  const base = dotIdx === -1 ? fileName : fileName.substring(0, dotIdx);
  return `${folder}${base}-optimized.${extension.replace(/^\./, "")}`;
}
