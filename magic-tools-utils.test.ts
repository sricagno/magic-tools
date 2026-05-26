import { describe, expect, it } from "vitest";
import {
  MAX_OUTPUT_LENGTH,
  MAX_TIMEOUT_SECONDS,
  MIN_TIMEOUT_SECONDS,
  buildSelectionPdfOutputPath,
  clampTimeoutSeconds,
  getMarkdownImageMatch,
  removeWikiDecorators,
  sanitizeOcrText,
} from "./magic-tools-utils";

describe("getMarkdownImageMatch", () => {
  it("matches wikilink image syntax", () => {
    const input = "prefix ![[folder/image.png|300]] suffix";
    expect(getMarkdownImageMatch(input)).toBe("![[folder/image.png|300]]");
  });

  it("matches markdown image syntax", () => {
    const input = "![alt](assets/picture.jpg)";
    expect(getMarkdownImageMatch(input)).toBe("![alt](assets/picture.jpg)");
  });

  it("returns null when there is no image", () => {
    expect(getMarkdownImageMatch("just text")).toBeNull();
  });
});

describe("removeWikiDecorators", () => {
  it("removes alias and heading decorators", () => {
    expect(removeWikiDecorators("folder/image.png|300#section")).toBe("folder/image.png");
  });
});

describe("sanitizeOcrText", () => {
  it("removes control characters", () => {
    expect(sanitizeOcrText("A\u0000B\u0007C\nD")).toBe("ABC\nD");
  });

  it("caps output length", () => {
    const longText = "x".repeat(MAX_OUTPUT_LENGTH + 50);
    expect(sanitizeOcrText(longText).length).toBe(MAX_OUTPUT_LENGTH);
  });
});

describe("clampTimeoutSeconds", () => {
  it("clamps below minimum", () => {
    expect(clampTimeoutSeconds(1)).toBe(MIN_TIMEOUT_SECONDS);
  });

  it("clamps above maximum", () => {
    expect(clampTimeoutSeconds(300)).toBe(MAX_TIMEOUT_SECONDS);
  });

  it("keeps valid values", () => {
    expect(clampTimeoutSeconds(8)).toBe(8);
  });
});

describe("buildSelectionPdfOutputPath", () => {
  it("builds output path in same note folder", () => {
    expect(buildSelectionPdfOutputPath("Folder/Note.md", "Note")).toBe("Folder/Note-selection.pdf");
  });

  it("builds output path at vault root", () => {
    expect(buildSelectionPdfOutputPath("Note.md", "Note")).toBe("Note-selection.pdf");
  });

  it("uses configured export folder when provided", () => {
    expect(buildSelectionPdfOutputPath("Folder/Note.md", "Note", "Exports/PDF")).toBe(
      "Exports/PDF/Note-selection.pdf",
    );
  });
});
