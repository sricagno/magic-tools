import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packagePath = path.join(root, "package.json");
const manifestPath = path.join(root, "manifest.json");
const versionsPath = path.join(root, "versions.json");

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const versions = fs.existsSync(versionsPath)
  ? JSON.parse(fs.readFileSync(versionsPath, "utf8"))
  : {};

manifest.version = pkg.version;
versions[pkg.version] = manifest.minAppVersion;

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
fs.writeFileSync(versionsPath, `${JSON.stringify(versions, null, 2)}\n`, "utf8");

console.log(`Synced manifest version to ${pkg.version}`);
console.log(`Updated versions.json with ${pkg.version} -> ${manifest.minAppVersion}`);
