import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/zande/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const base = "http://127.0.0.1:4324";
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 850 } });
  await desktop.goto(`${base}/blog/dreemy-ai-vs-character-ai/`);
  await desktop.locator(".language-picker summary").click();
  await desktop.locator('.language-options a[lang="ja"]').click();
  if (new URL(desktop.url()).pathname !== "/ja/blog/dreemy-ai-vs-character-ai/") throw Error("Article language switch lost its route");
  await desktop.locator(".language-picker summary").click();
  await desktop.locator('.language-options a[lang="ar"]').click();
  if (new URL(desktop.url()).pathname !== "/ar/blog/dreemy-ai-vs-character-ai/") throw Error("Arabic article switch lost its route");
  if (await desktop.locator("html").getAttribute("dir") !== "rtl") throw Error("Arabic article is not RTL");
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`${base}/de/`);
  await mobile.locator("[data-menu-button]").click();
  if (!await mobile.locator("[data-mobile-nav]").isVisible()) throw Error("Mobile menu failed to open");
  await mobile.locator('[data-mobile-nav] a[href="/de/blog/"]').click();
  if (new URL(mobile.url()).pathname !== "/de/blog/") throw Error("Mobile menu lost the locale");
  await mobile.close();
  console.log("Navigation audit passed: article language switch, Arabic RTL, and localized mobile menu.");
} finally { await browser.close(); }
