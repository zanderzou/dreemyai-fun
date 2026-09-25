import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/zande/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const targets = process.argv[2]
  ? [[process.argv[2], Number(process.argv[3] || 1280)]]
  : [["ja/", 1280], ["de/", 1280], ["ar/", 1280], ["ar/", 390], ["ja/blog/dreemy-ai-vs-character-ai/", 390]];
try {
  for (const [route, width] of targets) {
    const page = await browser.newPage({ viewport: { width, height: 840 }, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:4324/${route}`, { waitUntil: "domcontentloaded" });
    await page.locator("h1").waitFor();
    const file = path.join(os.tmpdir(), `dreemy-${route.replaceAll("/", "-")}-${width}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(file);
    await page.close();
  }
} finally { await browser.close(); }
