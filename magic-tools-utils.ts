export const MAX_OUTPUT_LENGTH = 20000;
export const MAX_TIMEOUT_SECONDS = 30;
export const MIN_TIMEOUT_SECONDS = 3;

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
