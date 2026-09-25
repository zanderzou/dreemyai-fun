import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/zande/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist", "client");
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") files.push(full);
  }
}
walk(out);
const routes = files.map(file => {
  const relative = path.relative(out, file).replaceAll("\\", "/");
  return relative === "index.html" ? "/" : `/${relative.slice(0, -11)}/`;
}).sort();
if (routes.length !== 120) throw Error(`Expected 120 indexable routes, got ${routes.length}`);

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const failures = [];
try {
  for (const width of [390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(`http://127.0.0.1:4324${route}`, { waitUntil: "domcontentloaded", timeout: 20000 });
      if (response?.status() !== 200) { failures.push(`${width} ${route}: HTTP ${response?.status()}`); continue; }
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: document.querySelector("h1")?.textContent?.trim() || "",
        empty: [...document.querySelectorAll("main section")].filter(section => section.getBoundingClientRect().height === 0).length,
      }));
      if (state.overflow > 1) failures.push(`${width} ${route}: horizontal overflow ${state.overflow}px`);
      if (!state.h1) failures.push(`${width} ${route}: no visible H1`);
      if (state.empty) failures.push(`${width} ${route}: ${state.empty} zero-height sections`);
    }
    await context.close();
  }
} finally { await browser.close(); }
if (failures.length) {
  console.error(`Layout audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log("Layout audit passed: 240/240 desktop/mobile pages, no horizontal overflow or empty sections.");
