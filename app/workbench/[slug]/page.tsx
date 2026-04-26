import { notFound } from "next/navigation"
import Link from "next/link"
import {
  isWorkbenchEnabled,
  listCarouselSlugs,
  loadCarousel,
} from "@/workbench/lib/carousels"
import { getTemplate } from "@/workbench/templates"
import { CarouselViewer } from "./CarouselViewer"
import { PostPanel } from "./PostPanel"

export async function generateStaticParams() {
  return listCarouselSlugs().map((slug) => ({ slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function CarouselPage({ params }: PageProps) {
  if (!isWorkbenchEnabled) notFound()
  const { slug } = await params
  const carousel = await loadCarousel(slug)
  if (!carousel) notFound()

  const Template = getTemplate(carousel.template)
  const slidesMarkup = carousel.slides.map((slide, i) => (
    <Template
      key={i}
      carousel={carousel as any}
      slide={slide as any}
      index={i}
      total={carousel.slides.length}
    />
  ))

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/workbench" className="text-sm text-neutral-400 hover:text-white">
            ← workbench
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-sm font-semibold">{carousel.title}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span>
            {carousel.slides.length} slides · {carousel.template}
          </span>
          <span className="hidden md:inline px-2 py-1 rounded bg-neutral-800 font-mono">
            npm run carousel:export {slug}
          </span>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_520px]">
        <CarouselViewer slideCount={carousel.slides.length}>{slidesMarkup}</CarouselViewer>
        <div className="hidden lg:flex min-h-0">
          <PostPanel slug={slug} title={carousel.title} post={carousel.post} />
        </div>
      </div>
    </div>
  )
}
