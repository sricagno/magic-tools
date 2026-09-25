import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

type PackageManifest = {
  engines?: {
    node?: string;
  };
};

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const nodeBaseline = fs.readFileSync(path.join(repoRoot, ".nvmrc"), "utf8").trim();
const packageJson = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"),
) as {
  engines?: { node?: string };
  scripts: Record<string, string>;
  devDependencies: Record<string, string>;
};
const tsconfig = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "tsconfig.json"), "utf8"),
) as {
  compilerOptions?: { types?: string[] };
  include?: string[];
};
const releaseWorkflow = fs.readFileSync(
  path.join(repoRoot, ".github", "workflows", "release.yml"),
  "utf8",
);
const vitestManifest = readInstalledManifest("vitest");

function parseVersion(version: string): [number, number, number] {
  const normalized = version.trim().replace(/^v/, "");
  const [major = "0", minor = "0", patch = "0"] = normalized.split(".");
  return [Number(major), Number(minor), Number(patch)];
}

function compareVersions(left: string, right: string): number {
  const leftParts = parseVersion(left);
  const rightParts = parseVersion(right);

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] > rightParts[index]) return 1;
    if (leftParts[index] < rightParts[index]) return -1;
  }

  return 0;
}

function satisfiesTerm(version: string, term: string): boolean {
  const normalized = term.trim();

  if (normalized.startsWith(">=")) {
    return compareVersions(version, normalized.slice(2).trim()) >= 0;
  }

  if (normalized.startsWith("^")) {
    const lowerBound = normalized.slice(1).trim();
    const [major] = parseVersion(lowerBound);
    const [versionMajor] = parseVersion(version);

    return versionMajor === major && compareVersions(version, lowerBound) >= 0;
  }

  return compareVersions(version, normalized) === 0;
}

function satisfiesRange(version: string, range: string): boolean {
  return range.split("||").some((term) => satisfiesTerm(version, term));
}

function readInstalledManifest(packageName: string): PackageManifest {
  return JSON.parse(
    fs.readFileSync(path.join(repoRoot, "node_modules", packageName, "package.json"), "utf8"),
  ) as PackageManifest;
}

describe("tooling contracts", () => {
  it("pins the Node baseline consistently across local and release tooling", () => {
    expect(nodeBaseline).toBe("22.12.0");
    expect(packageJson.engines?.node).toBe(vitestManifest.engines?.node);
    expect(satisfiesRange(nodeBaseline, packageJson.engines?.node ?? "")).toBe(true);
    expect(releaseWorkflow).toMatch(/node-version-file:\s*["']?\.nvmrc["']?/);
  });

  it("keeps the integrity script aligned with the required verification flow", () => {
    expect(packageJson.scripts["check:integrity"]).toBe(
      "pnpm exec tsc --noEmit && pnpm test && pnpm build",
    );
  });

  it("keeps the release workflow install, integrity, and packaging steps", () => {
    expect(releaseWorkflow).toContain("pnpm install --frozen-lockfile");
    expect(releaseWorkflow).toContain("run: pnpm run check:integrity");
    expect(releaseWorkflow).toContain("cp manifest.json dist/manifest.json");
    expect(releaseWorkflow).toContain("cp main.js dist/main.js");
    expect(releaseWorkflow).toContain("cp styles.css dist/styles.css");
  });

  it("keeps root-level test files inside TypeScript verification", () => {
    expect(tsconfig.compilerOptions?.types).toContain("node");
    expect(tsconfig.include).toContain("*.test.ts");
  });

  it("keeps the Node baseline compatible with the installed tooling engines", () => {
    for (const packageName of ["esbuild", "vite", "vitest"]) {
      const manifest = readInstalledManifest(packageName);
      expect(manifest.engines?.node, `${packageName} must declare a Node engine range`).toBeTruthy();
      expect(satisfiesRange(nodeBaseline, manifest.engines?.node ?? "")).toBe(true);
    }
  });
});
