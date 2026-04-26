export const SLIDE_WIDTH = 1080
export const SLIDE_HEIGHT = 1350

export type Author = {
  name: string
  handle?: string
  avatar?: string
}

/**
 * Base shape every carousel file must satisfy.
 * The `slides` array is strongly typed by the chosen template's own types.
 */
export type BaseCarousel<TemplateId extends string, Slide> = {
  template: TemplateId
  title: string
  author?: Author
  accent?: string
  /** Mark as already published; shown under Archived in the workbench list. */
  archived?: boolean
  /**
   * Optional LinkedIn post copy that the carousel was derived from.
   * Shown in the workbench UI next to the preview for easy editing/copying.
   */
  post?: string
  slides: Slide[]
}
