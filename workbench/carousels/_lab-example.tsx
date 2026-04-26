import type { LabCarousel } from "../templates/lab/types"

const carousel: LabCarousel = {
  template: "lab",
  title: "Lab template example",
  accent: "#5B8CFF",
  brandName: "Joachim Hodana",
  linkPrimary: "joachimhodana.com",
  linkSecondary: "betterdataengineer.joachimhodana.com",
  slides: [
    {
      kind: "lab",
      eyebrow: "Data Engineering",
      title: "Your title goes",
      titleEmphasis: "right here.",
      body: "Use this space for a concise explanation. Keep it sharp, technical and easy to scan. One strong idea per slide.",
      points: [
        "Make the first point concrete and specific.",
        "Use clean hierarchy instead of decoration.",
        "Keep the visual system consistent across posts.",
      ],
    },
  ],
}

export default carousel

