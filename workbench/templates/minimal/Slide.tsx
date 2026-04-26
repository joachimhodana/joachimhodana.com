import type { CSSProperties } from "react"
import type { MinimalCarousel, MinimalSlide } from "./types"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../types"

type SlideProps = {
  carousel: MinimalCarousel
  slide: MinimalSlide
  index: number
  total: number
}

// Brand signature accent (Ice Blue) from workbench/BRAND_BOOK.md
const DEFAULT_ACCENT = "#5B8CFF"

export function MinimalSlideFrame({ carousel, slide, index, total }: SlideProps) {
  const accent = carousel.accent ?? DEFAULT_ACCENT
  const isCover = index === 0
  const isLast = index === total - 1

  const rootStyle: CSSProperties = {
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    ["--accent" as string]: accent,
  }

  return (
    <div
      data-slide
      data-slide-index={index}
      style={rootStyle}
      className="relative flex flex-col overflow-hidden bg-white text-neutral-900 font-sans"
    >
      <div
        className="absolute top-0 left-0 h-[10px]"
        style={{ background: accent, width: `${((index + 1) / total) * 100}%` }}
      />

      <div className="flex-1 px-[88px] pt-[120px] pb-[60px] flex flex-col">
        <SlideBody slide={slide} accent={accent} isCover={isCover} />
      </div>

      <Footer carousel={carousel} index={index} total={total} isLast={isLast} accent={accent} />
    </div>
  )
}

function SlideBody({
  slide,
  accent,
  isCover,
}: {
  slide: MinimalSlide
  accent: string
  isCover: boolean
}) {
  switch (slide.kind) {
    case "title":
      return (
        <div className="flex flex-col justify-end h-full">
          {slide.eyebrow ? (
            <div
              className="mb-8 text-[22px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {slide.eyebrow}
            </div>
          ) : null}
          <h1 className="text-[88px] leading-[1.04] font-bold tracking-[-0.02em] text-neutral-900 max-w-[820px]">
            {slide.title}
          </h1>
          {slide.subtitle ? (
            <p className="mt-10 text-[34px] leading-[1.3] font-light text-neutral-600 max-w-[780px]">
              {slide.subtitle}
            </p>
          ) : null}
        </div>
      )

    case "content":
      return (
        <div className="flex flex-col justify-center h-full">
          {slide.eyebrow ? (
            <div
              className="mb-6 text-[20px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {slide.eyebrow}
            </div>
          ) : null}
          <h2 className="text-[64px] leading-[1.08] font-bold tracking-[-0.015em] text-neutral-900 max-w-[860px]">
            {slide.title}
          </h2>
          {slide.body ? (
            <p className="mt-10 text-[30px] leading-[1.4] font-light text-neutral-700 max-w-[820px]">
              {slide.body}
            </p>
          ) : null}
          {slide.bullets?.length ? (
            <ul className="mt-10 space-y-6 list-none">
              {slide.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 text-[28px] leading-[1.4] font-normal text-neutral-800"
                >
                  <span
                    className="mt-[18px] inline-block w-[14px] h-[14px] rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  <span className="flex-1">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )

    case "quote":
      return (
        <div className="flex flex-col justify-center h-full">
          <div
            className="text-[200px] leading-none font-serif select-none"
            style={{ color: accent, fontFamily: "Georgia, serif" }}
          >
            &ldquo;
          </div>
          <blockquote className="-mt-10 text-[54px] leading-[1.2] font-light text-neutral-900 max-w-[820px]">
            {slide.quote}
          </blockquote>
          {slide.attribution ? (
            <div className="mt-10 text-[26px] font-medium text-neutral-500">
              — {slide.attribution}
            </div>
          ) : null}
        </div>
      )

    case "stat":
      return (
        <div className="flex flex-col justify-center h-full items-start">
          <div
            className="text-[260px] leading-none font-bold tracking-[-0.04em]"
            style={{ color: accent }}
          >
            {slide.value}
          </div>
          <div className="mt-4 text-[44px] leading-[1.1] font-semibold text-neutral-900 max-w-[820px]">
            {slide.label}
          </div>
          {slide.context ? (
            <p className="mt-8 text-[28px] leading-[1.4] font-light text-neutral-600 max-w-[800px]">
              {slide.context}
            </p>
          ) : null}
        </div>
      )

    case "cta":
      return (
        <div className="flex flex-col justify-center h-full">
          {slide.eyebrow ? (
            <div
              className="mb-6 text-[22px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {slide.eyebrow}
            </div>
          ) : null}
          <h2 className="text-[76px] leading-[1.05] font-bold tracking-[-0.02em] text-neutral-900 max-w-[820px]">
            {slide.title}
          </h2>
          {slide.body ? (
            <p className="mt-8 text-[30px] leading-[1.4] font-light text-neutral-700 max-w-[800px]">
              {slide.body}
            </p>
          ) : null}
          <div className="mt-14">
            <span
              className="inline-flex items-center gap-4 px-[36px] py-[24px] text-[30px] font-semibold text-white rounded-full"
              style={{ background: accent }}
            >
              {slide.cta}
              <span className="text-[36px]">→</span>
            </span>
          </div>
        </div>
      )
  }
}

function Footer({
  carousel,
  index,
  total,
  isLast,
  accent,
}: {
  carousel: MinimalCarousel
  index: number
  total: number
  isLast: boolean
  accent: string
}) {
  const author = carousel.author
  return (
    <div className="px-[88px] pb-[64px] flex items-end justify-between gap-8">
      <div className="flex items-center gap-4">
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt=""
            width={64}
            height={64}
            className="w-[64px] h-[64px] rounded-full object-cover"
          />
        ) : author ? (
          <div
            className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-white font-bold text-[24px]"
            style={{ background: accent }}
          >
            {author.name.charAt(0)}
          </div>
        ) : null}
        {author ? (
          <div className="flex flex-col">
            <div className="text-[22px] font-semibold text-neutral-900 leading-tight">
              {author.name}
            </div>
            {author.handle ? (
              <div className="text-[18px] font-normal text-neutral-500 leading-tight">
                @{author.handle}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        {!isLast ? (
          <div className="text-[20px] font-medium text-neutral-500 flex items-center gap-2">
            swipe <span className="text-[24px]">→</span>
          </div>
        ) : null}
        <div
          className="text-[20px] font-semibold px-[14px] py-[6px] rounded-full border border-neutral-200"
          style={{ color: "#0a0a0a" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}
