import type { BaseCarousel } from "../../types"

export type MinimalTitleSlide = {
  kind: "title"
  eyebrow?: string
  title: string
  subtitle?: string
}

export type MinimalContentSlide = {
  kind: "content"
  eyebrow?: string
  title: string
  body?: string
  bullets?: string[]
}

export type MinimalQuoteSlide = {
  kind: "quote"
  quote: string
  attribution?: string
}

export type MinimalStatSlide = {
  kind: "stat"
  value: string
  label: string
  context?: string
}

export type MinimalCtaSlide = {
  kind: "cta"
  eyebrow?: string
  title: string
  body?: string
  cta: string
}

export type MinimalSlide =
  | MinimalTitleSlide
  | MinimalContentSlide
  | MinimalQuoteSlide
  | MinimalStatSlide
  | MinimalCtaSlide

export type MinimalCarousel = BaseCarousel<"minimal", MinimalSlide>
