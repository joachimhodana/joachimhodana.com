"use client"

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/workbench/types"

type Props = {
  children: ReactNode[]
  slideCount: number
}

export function CarouselViewer({ children, slideCount }: Props) {
  const [index, setIndex] = useState(0)
  const [scale, setScale] = useState(0.5)
  const stageRef = useRef<HTMLDivElement>(null)

  const updateScale = useCallback(() => {
    const el = stageRef.current
    if (!el) return
    const padding = 48
    const maxW = el.clientWidth - padding * 2
    const maxH = el.clientHeight - padding * 2
    const s = Math.min(maxW / SLIDE_WIDTH, maxH / SLIDE_HEIGHT, 1)
    setScale(s > 0 ? s : 0.5)
  }, [])

  useLayoutEffect(() => {
    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener("resize", updateScale)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateScale)
    }
  }, [updateScale])

  const prev = useCallback(
    () => setIndex((i) => Math.max(0, i - 1)),
    [],
  )
  const next = useCallback(
    () => setIndex((i) => Math.min(slideCount - 1, i + 1)),
    [slideCount],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      else if (e.key === "ArrowRight" || e.key === " ") next()
      else if (e.key === "Home") setIndex(0)
      else if (e.key === "End") setIndex(slideCount - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next, slideCount])

  const slideW = SLIDE_WIDTH * scale
  const slideH = SLIDE_HEIGHT * scale

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div
        ref={stageRef}
        className="flex-1 flex items-center justify-center relative overflow-hidden select-none"
      >
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous slide"
          className="absolute left-6 z-10 w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-xl"
        >
          ←
        </button>

        <div
          style={{ width: slideW, height: slideH }}
          className="relative shadow-[0_30px_80px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden bg-white"
        >
          <div
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {children[index]}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={index === slideCount - 1}
          aria-label="Next slide"
          className="absolute right-6 z-10 w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-xl"
        >
          →
        </button>
      </div>

      <footer className="shrink-0 border-t border-neutral-800 px-8 py-4 flex items-center justify-between gap-4">
        <div className="text-xs text-neutral-500 font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
        </div>
        <div className="flex gap-2 items-center">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={
                "w-2 h-2 rounded-full transition-all " +
                (i === index ? "bg-white w-6" : "bg-neutral-600 hover:bg-neutral-400")
              }
            />
          ))}
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          {Math.round(scale * 100)}%
        </div>
      </footer>
    </div>
  )
}
