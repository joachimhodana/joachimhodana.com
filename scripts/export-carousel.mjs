#!/usr/bin/env node
// Export LinkedIn carousel slides to high-quality PNG using Playwright.
//
// Usage:
//   npm run carousel:export <slug> [slug2] ...
//   npm run carousel:export all
//
// Requires a running dev server (npm run dev) and chromium installed
// (npm run carousel:install — only needed once).
//
// Env:
//   BASE_URL   default http://localhost:3000
//   SCALE      default 2 (1 = 1080x1350, 2 = 2160x2700, 3 = 3240x4050)
//   OUT_DIR    default workbench/out

import { chromium } from "playwright"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs"
import { join, resolve } from "node:path"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const SCALE = Math.max(1, parseInt(process.env.SCALE ?? "2", 10))
const OUT_DIR = resolve(process.env.OUT_DIR ?? "workbench/out")
const CAROUSELS_DIR = resolve("workbench/carousels")

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error("usage: npm run carousel:export <slug|all> [slug2] ...")
  process.exit(1)
}

function allSlugs() {
  return readdirSync(CAROUSELS_DIR)
    .filter((f) => /\.tsx?$/.test(f))
    .map((f) => f.replace(/\.tsx?$/, ""))
}

const slugs = args.includes("all") ? allSlugs() : args
if (slugs.length === 0) {
  console.error("no carousels to export")
  process.exit(1)
}

async function ensureServerUp() {
  const url = `${BASE_URL}/workbench`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`status ${res.status}`)
  } catch (err) {
    console.error(`✗ dev server not reachable at ${BASE_URL}`)
    console.error(`  start it with: npm run dev`)
    console.error(`  (${err instanceof Error ? err.message : err})`)
    process.exit(1)
  }
}

async function exportCarousel(browser, slug) {
  const firstSlideUrl = `${BASE_URL}/workbench/${slug}/slide/0`
  const outDir = join(OUT_DIR, slug)
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: SCALE,
  })
  const page = await context.newPage()

  await page.goto(firstSlideUrl, { waitUntil: "networkidle" })
  const root = page.locator("[data-slide-root]").first()
  await root.waitFor({ state: "visible", timeout: 30_000 })
  const countAttr = await root.getAttribute("data-slide-count")
  const total = Number(countAttr)
  if (!Number.isInteger(total) || total <= 0) {
    await context.close()
    throw new Error(`could not determine slide count for ${slug} (got ${countAttr})`)
  }

  console.log(`→ ${slug} · ${total} slides · ${1080 * SCALE}×${1350 * SCALE}px`)

  const hideDevChromeCss = `
    nextjs-portal,
    [data-nextjs-dev-overlay],
    [data-nextjs-dev-indicator],
    [data-nextjs-toast],
    [data-next-badge-root],
    [data-next-mark],
    #__next-build-watcher { display: none !important; visibility: hidden !important; }
    html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: transparent !important; }
  `

  for (let i = 0; i < total; i++) {
    const url = `${BASE_URL}/workbench/${slug}/slide/${i}`
    await page.goto(url, { waitUntil: "networkidle" })
    await page.addStyleTag({ content: hideDevChromeCss })
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready
    })
    const slide = page.locator("[data-slide]").first()
    await slide.waitFor({ state: "visible" })
    const pad = String(i + 1).padStart(2, "0")
    const file = join(outDir, `${slug}-${pad}.png`)
    await slide.screenshot({ path: file, type: "png", omitBackground: false })
    process.stdout.write(`  ✔ ${pad}/${String(total).padStart(2, "0")}  ${file}\n`)
  }

  await context.close()
}

async function main() {
  await ensureServerUp()
  const browser = await chromium.launch()
  try {
    for (const slug of slugs) {
      await exportCarousel(browser, slug)
    }
  } finally {
    await browser.close()
  }
  console.log(`\ndone · ${slugs.length} carousel(s) → ${OUT_DIR}`)
}

main().catch((err) => {
  console.error("✗ export failed:", err)
  process.exit(1)
})
