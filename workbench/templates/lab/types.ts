import type { BaseCarousel } from "../../types"

export type LabDiagramPreset = "default"

type LabSlideBase = {
  eyebrow?: string
  footerTitle?: string
  footerLeftDot?: boolean
  footerLinks?: [string, string]
}

/**
 * Standard content slide — eyebrow, title, optional body + bullet card.
 * The infra-flow diagram is shown by default; set `diagram: false` to hide it
 * (useful on hook and CTA slides where you want quiet whitespace instead).
 */
export type LabContentSlide = LabSlideBase & {
  kind: "lab"
  title: string
  /** Highlighted tail of the title (rendered in accent blue). */
  titleEmphasis?: string
  body?: string
  points?: string[]
  diagram?: LabDiagramPreset | false
}

export type LabCodeLanguage = "sql" | "python" | "yaml" | "bash" | "text"

/**
 * Code snippet slide — one sharp monospace block with optional filename chrome
 * and caption. Hide the floating diagram — code is the visual.
 */
export type LabCodeSlide = LabSlideBase & {
  kind: "code"
  title: string
  titleEmphasis?: string
  language?: LabCodeLanguage
  /** Small label rendered above the code block (e.g. "models/audit_log.sql"). */
  filename?: string
  /** One-line caption rendered under the code block. */
  caption?: string
  code: string
}

/**
 * Side-by-side comparison — great for "what tests cover vs what they miss"
 * or "before/after" framing. Each column gets a label + short bullet list.
 */
export type LabCompareSlide = LabSlideBase & {
  kind: "compare"
  title: string
  titleEmphasis?: string
  left: { label: string; items: string[] }
  right: { label: string; items: string[] }
}

/**
 * Stat slide — one oversized number used as a pattern interrupt.
 * Keep the value < 6 characters ("98k", "4m", "1/2", "2am") for best typography.
 */
export type LabStatSlide = LabSlideBase & {
  kind: "stat"
  value: string
  label: string
  body?: string
}

export type LabSlide =
  | LabContentSlide
  | LabCodeSlide
  | LabCompareSlide
  | LabStatSlide

export type LabCarousel = BaseCarousel<"lab", LabSlide> & {
  /** Default: "Joachim Hodana." */
  brandName?: string
  /** Default: "joachimhodana.com" */
  linkPrimary?: string
  /** Default: "betterdataengineer.joachimhodana.com" */
  linkSecondary?: string
}
