import type { ComponentType } from "react"
import { MinimalSlideFrame } from "./minimal/Slide"
import type { MinimalCarousel, MinimalSlide } from "./minimal/types"
import { LabSlideFrame } from "./lab/Slide"
import type { LabCarousel, LabSlide } from "./lab/types"
import type { BaseCarousel } from "../types"

export type AnyCarousel = MinimalCarousel | LabCarousel
export type AnySlide = MinimalSlide | LabSlide

export type SlideFrameProps = {
  carousel: AnyCarousel
  slide: AnySlide
  index: number
  total: number
}

type TemplateRegistry = {
  [K in AnyCarousel["template"]]: ComponentType<{
    carousel: Extract<AnyCarousel, BaseCarousel<K, any>>
    slide: Extract<AnyCarousel, BaseCarousel<K, any>>["slides"][number]
    index: number
    total: number
  }>
}

export const templates: TemplateRegistry = {
  minimal: MinimalSlideFrame,
  lab: LabSlideFrame,
}

export function getTemplate(id: AnyCarousel["template"]) {
  const T = templates[id]
  if (!T) throw new Error(`Unknown template: ${id}`)
  return T as ComponentType<SlideFrameProps>
}
