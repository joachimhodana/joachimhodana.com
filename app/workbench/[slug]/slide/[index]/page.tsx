import { notFound } from "next/navigation"
import {
  isWorkbenchEnabled,
  listCarouselSlugs,
  loadCarousel,
} from "@/workbench/lib/carousels"
import { getTemplate } from "@/workbench/templates"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/workbench/types"

export async function generateStaticParams() {
  const out: { slug: string; index: string }[] = []
  for (const slug of listCarouselSlugs()) {
    const c = await loadCarousel(slug)
    if (!c) continue
    for (let i = 0; i < c.slides.length; i++) {
      out.push({ slug, index: String(i) })
    }
  }
  return out
}

type PageProps = {
  params: { slug: string; index: string }
}

export default async function SlidePage({ params }: PageProps) {
  if (!isWorkbenchEnabled) notFound()
  const { slug, index: indexRaw } = params
  const index = Number(indexRaw)
  const carousel = await loadCarousel(slug)
  if (!carousel) notFound()
  if (!Number.isInteger(index) || index < 0 || index >= carousel.slides.length) notFound()

  const Template = getTemplate(carousel.template)
  const slide = carousel.slides[index]

  return (
    <div
      data-slide-root
      data-slide-count={carousel.slides.length}
      style={{
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Template
        carousel={carousel as any}
        slide={slide as any}
        index={index}
        total={carousel.slides.length}
      />
    </div>
  )
}
