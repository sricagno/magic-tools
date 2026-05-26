export const MAX_OUTPUT_LENGTH = 20000;
export const MAX_TIMEOUT_SECONDS = 30;
export const MIN_TIMEOUT_SECONDS = 3;

export function sanitizeOcrText(input: string): string {
  const withoutControl = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return withoutControl.slice(0, MAX_OUTPUT_LENGTH).trim();
}

export function getMarkdownImageMatch(text: string): string | null {
  const wiki = text.match(/!\[\[([^\]]+)\]\]/);
  if (wiki?.[0]) return wiki[0];

  const md = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return md?.[0] ?? null;
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
