import fs from "node:fs"
import path from "node:path"
import type { AnyCarousel } from "../templates"

const CAROUSELS_DIR = path.join(process.cwd(), "workbench", "carousels")

/**
 * Workbench is a local dev tool — we don't want the routes leaking into the
 * static export that gets deployed. Set WORKBENCH=1 to force-enable (e.g. for
 * a local `next build` when you specifically want to test the build).
 */
export const isWorkbenchEnabled =
  process.env.NODE_ENV !== "production" || process.env.WORKBENCH === "1"

export type CarouselSummary = {
  slug: string
  title: string
  template: AnyCarousel["template"]
  slideCount: number
  archived: boolean
}

function slugify(filename: string) {
  return filename.replace(/\.tsx?$/, "")
}

export function listCarouselSlugs(): string[] {
  if (!isWorkbenchEnabled) return []
  if (!fs.existsSync(CAROUSELS_DIR)) return []
  return fs
    .readdirSync(CAROUSELS_DIR)
    .filter((f) => /\.tsx?$/.test(f))
    .map(slugify)
    .sort()
}

export async function loadCarousel(slug: string): Promise<AnyCarousel | null> {
  if (!isWorkbenchEnabled) return null
  const tsxPath = path.join(CAROUSELS_DIR, `${slug}.tsx`)
  const tsPath = path.join(CAROUSELS_DIR, `${slug}.ts`)
  if (!fs.existsSync(tsxPath) && !fs.existsSync(tsPath)) return null

  // Webpack/Turbopack bundle all files matching this template, which is what we want.
  const mod = await import(`../carousels/${slug}`)
  const carousel = (mod.default ?? mod.carousel) as AnyCarousel | undefined
  if (!carousel) {
    throw new Error(
      `Carousel "${slug}" has no default export. Export the carousel object with \`export default\`.`,
    )
  }
  return carousel
}

export async function listCarousels(): Promise<CarouselSummary[]> {
  const slugs = listCarouselSlugs()
  const out: CarouselSummary[] = []
  for (const slug of slugs) {
    const c = await loadCarousel(slug)
    if (!c) continue
    out.push({
      slug,
      title: c.title,
      template: c.template,
      slideCount: c.slides.length,
      archived: Boolean((c as any).archived),
    })
  }
  return out
}
