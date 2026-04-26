import type { CSSProperties, ReactNode } from "react"
import type {
  LabCarousel,
  LabCodeLanguage,
  LabCodeSlide,
  LabCompareSlide,
  LabContentSlide,
  LabSlide,
  LabStatSlide,
} from "./types"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../types"

type SlideProps = {
  carousel: LabCarousel
  slide: LabSlide
  index: number
  total: number
}

// Brand system defaults (workbench/BRAND_BOOK.md)
const DEFAULT_INK = "#191919"
const DEFAULT_PAPER = "#FAFAF8"
const DEFAULT_MUTED = "#737373"
const DEFAULT_BORDER = "#E7E5E0"
const DEFAULT_ACCENT = "#5B8CFF"
const DEFAULT_ACCENT_SOFT = "#DCE7FF"

// Layout constants (all in px on the 1080x1350 canvas)
const CONTENT_MAX = 820 // title + eyebrow column
const BODY_MAX = 720 // body paragraph column
const CARD_MAX = 680 // bullet-card column; narrower so the diagram fits on its right

export function LabSlideFrame({ carousel, slide, index, total }: SlideProps) {
  const accent = carousel.accent ?? DEFAULT_ACCENT

  const rootStyle: CSSProperties = {
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    background: DEFAULT_PAPER,
    color: DEFAULT_INK,
    ["--ink" as string]: DEFAULT_INK,
    ["--paper" as string]: DEFAULT_PAPER,
    ["--muted" as string]: DEFAULT_MUTED,
    ["--border" as string]: DEFAULT_BORDER,
    ["--blue" as string]: accent,
    ["--blue-soft" as string]: DEFAULT_ACCENT_SOFT,
  }

  const brandName = carousel.brandName ?? "Joachim Hodana"
  const footerTitle =
    slide.footerTitle ?? "Building better data infrastructure"
  const linkPrimary = carousel.linkPrimary ?? "joachimhodana.com"
  const linkSecondary =
    carousel.linkSecondary ?? "betterdataengineer.joachimhodana.com"

  // Only the regular content slide carries the floating infra diagram motif.
  const showDiagram = slide.kind === "lab" && slide.diagram !== false

  return (
    <main
      data-slide
      data-slide-index={index}
      style={rootStyle}
      className="relative overflow-hidden font-sans"
    >
      <Circle />
      <DotGrid />

      <header className="flex items-center justify-between mb-[120px] px-[64px] pt-[64px]">
        <div className="text-[24px] font-semibold tracking-[-0.03em]">
          {brandName}
          <span style={{ color: accent }}>.</span>
        </div>
        <div
          className="text-[18px]"
          style={{ color: accent, fontFamily: "var(--font-mono)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </header>

      <section className="relative z-[2] px-[64px]">
        {slide.kind === "lab" ? (
          <ContentBody slide={slide} accent={accent} />
        ) : null}
        {slide.kind === "code" ? (
          <CodeBody slide={slide} accent={accent} />
        ) : null}
        {slide.kind === "compare" ? (
          <CompareBody slide={slide} accent={accent} />
        ) : null}
        {slide.kind === "stat" ? (
          <StatBody slide={slide} accent={accent} />
        ) : null}
      </section>

      {showDiagram ? <Diagram accent={accent} /> : null}

      <footer
        className="absolute left-[64px] right-[64px] bottom-[54px] h-[128px] rounded-[16px] flex items-center justify-between px-[36px] gap-[20px]"
        style={{ background: DEFAULT_INK, color: "white" }}
      >
        <div
          className="text-[22px] font-semibold tracking-[-0.03em] shrink-0"
          style={{ whiteSpace: "nowrap" }}
        >
          {footerTitle}
          <span style={{ color: accent }}>.</span>
        </div>

        <div
          className="flex items-center gap-[14px] text-[15px] shrink-0"
          style={{ color: "#f3f3f3", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}
        >
          <span>{(slide.footerLinks?.[0] ?? linkPrimary) as string}</span>
          <span
            className="inline-block w-[2px] h-[18px]"
            style={{ background: accent }}
          />
          <span>{(slide.footerLinks?.[1] ?? linkSecondary) as string}</span>
        </div>
      </footer>
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                              */
/* -------------------------------------------------------------------------- */

function Eyebrow({ text, accent }: { text?: string; accent: string }) {
  if (!text) return null
  return (
    <div
      className="mb-[28px] uppercase tracking-[0.04em] text-[20px]"
      style={{ color: accent, fontFamily: "var(--font-mono)" }}
    >
      {text}
    </div>
  )
}

function Title({
  text,
  emphasis,
  accent,
  size = 92,
}: {
  text: string
  emphasis?: string
  accent: string
  size?: number
}) {
  return (
    <h1
      className="m-0 leading-[0.96] tracking-[-0.07em] font-bold"
      style={{
        fontFamily: "var(--font-geist-sans)",
        fontSize: size,
      }}
    >
      {text}
      {emphasis ? (
        <>
          {" "}
          <span style={{ color: accent }}>{emphasis}</span>
        </>
      ) : null}
    </h1>
  )
}

function AccentBar({ accent }: { accent: string }) {
  return (
    <div
      className="w-[96px] h-[5px] rounded-full"
      style={{ background: accent }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Content slide (original layout)                                            */
/* -------------------------------------------------------------------------- */

function ContentBody({
  slide,
  accent,
}: {
  slide: LabContentSlide
  accent: string
}) {
  const points = slide.points?.filter(Boolean) ?? []
  return (
    <div style={{ maxWidth: CONTENT_MAX }}>
      <Eyebrow text={slide.eyebrow} accent={accent} />
      <div className="mb-[40px]">
        <Title text={slide.title} emphasis={slide.titleEmphasis} accent={accent} />
      </div>
      <div className="mb-[52px]">
        <AccentBar accent={accent} />
      </div>

      {slide.body ? (
        <p
          className="m-0 text-[34px] leading-[1.32] tracking-[-0.03em]"
          style={{ color: "#2a2a2a", maxWidth: BODY_MAX }}
        >
          {slide.body}
        </p>
      ) : null}

      {points.length ? (
        <div
          className="mt-[80px] border rounded-[12px] bg-white p-[36px] grid gap-[24px]"
          style={{ borderColor: DEFAULT_BORDER, maxWidth: CARD_MAX }}
        >
          {points.map((text, i) => (
            <div
              key={i}
              className="flex gap-[20px] items-start text-[28px] leading-[1.25] tracking-[-0.03em]"
            >
              <span
                className="w-[12px] h-[12px] rounded-full flex-[0_0_auto] mt-[12px]"
                style={{ background: accent }}
              />
              <div>{text}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Code slide                                                                 */
/* -------------------------------------------------------------------------- */

function CodeBody({ slide, accent }: { slide: LabCodeSlide; accent: string }) {
  const language: LabCodeLanguage = slide.language ?? "text"

  return (
    <div style={{ maxWidth: 960 }}>
      <Eyebrow text={slide.eyebrow} accent={accent} />
      <div className="mb-[28px]">
        <Title
          text={slide.title}
          emphasis={slide.titleEmphasis}
          accent={accent}
          size={64}
        />
      </div>
      <div className="mb-[36px]">
        <AccentBar accent={accent} />
      </div>

      <CodeBlock
        code={slide.code}
        language={language}
        filename={slide.filename}
        accent={accent}
      />

      {slide.caption ? (
        <p
          className="mt-[28px] m-0 text-[22px] leading-[1.4] tracking-[-0.02em]"
          style={{ color: DEFAULT_MUTED }}
        >
          {slide.caption}
        </p>
      ) : null}
    </div>
  )
}

function CodeBlock({
  code,
  language,
  filename,
  accent,
}: {
  code: string
  language: LabCodeLanguage
  filename?: string
  accent: string
}) {
  const lines = normalizeCode(code).split("\n")

  return (
    <div
      className="rounded-[12px] overflow-hidden border"
      style={{
        borderColor: DEFAULT_BORDER,
        background: "#ffffff",
        boxShadow: "0 10px 32px rgba(25,25,25,0.04)",
      }}
    >
      <div
        className="flex items-center justify-between px-[22px] h-[44px] border-b"
        style={{ borderColor: DEFAULT_BORDER, background: "#F5F5F2" }}
      >
        <div
          className="text-[15px] tracking-[0.04em]"
          style={{ color: DEFAULT_MUTED, fontFamily: "var(--font-mono)" }}
        >
          {filename ?? ""}
        </div>
        <div
          className="text-[13px] uppercase tracking-[0.14em] px-[10px] py-[4px] rounded-[4px]"
          style={{
            color: accent,
            fontFamily: "var(--font-mono)",
            background: "rgba(91,140,255,0.08)",
          }}
        >
          {language}
        </div>
      </div>

      <pre
        className="m-0 p-[24px] text-[20px] leading-[1.55]"
        style={{
          fontFamily: "var(--font-mono)",
          color: DEFAULT_INK,
          background: "#ffffff",
          whiteSpace: "pre",
          overflow: "hidden",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span
              className="shrink-0 text-right pr-[18px] select-none"
              style={{
                width: 44,
                color: "#B8B8B3",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {i + 1}
            </span>
            <span className="flex-1">{renderLine(line, language, accent)}</span>
          </div>
        ))}
      </pre>
    </div>
  )
}

function normalizeCode(src: string) {
  let code = src.replace(/\t/g, "  ")
  // Drop leading blank lines.
  code = code.replace(/^\n+/, "")
  // Drop trailing blank lines / whitespace.
  code = code.replace(/\s+$/, "")
  return code
}

const SQL_KEYWORDS = new Set([
  "select", "from", "where", "as", "group", "by", "order", "limit", "with",
  "and", "or", "not", "in", "on", "join", "left", "right", "inner", "outer",
  "case", "when", "then", "else", "end", "null", "is", "like", "between",
  "distinct", "union", "all", "having", "count", "sum", "avg", "min", "max",
  "current_timestamp", "datediff", "coalesce", "cast",
])

const PYTHON_KEYWORDS = new Set([
  "def", "return", "import", "from", "for", "in", "if", "elif", "else",
  "with", "as", "while", "class", "pass", "break", "continue",
  "and", "or", "not", "is", "lambda",
  "try", "except", "finally", "raise", "yield", "global", "nonlocal",
  "True", "False", "None",
])

const PYTHON_BUILTINS = new Set([
  "open", "round", "len", "range", "list", "dict", "tuple", "set",
  "int", "float", "str", "bool", "print",
])

type Tok = { text: string; color?: string; weight?: number }

function tokenizeLine(line: string, language: LabCodeLanguage): Tok[] {
  if (!line) return [{ text: " " }]

  const commentStart =
    language === "sql"
      ? "--"
      : language === "python" || language === "yaml" || language === "bash"
      ? "#"
      : null

  const out: Tok[] = []
  let i = 0
  const n = line.length

  while (i < n) {
    const ch = line[i]

    if (commentStart && line.startsWith(commentStart, i)) {
      out.push({ text: line.slice(i), color: DEFAULT_MUTED })
      return out
    }

    if (ch === "'" || ch === '"') {
      const quote = ch
      let j = i + 1
      while (j < n && line[j] !== quote) {
        if (line[j] === "\\" && j + 1 < n) j += 2
        else j += 1
      }
      j = Math.min(j + 1, n)
      out.push({ text: line.slice(i, j), color: "#2F5FE3" })
      i = j
      continue
    }

    // Jinja {{ ... }}
    if (ch === "{" && line[i + 1] === "{") {
      const end = line.indexOf("}}", i)
      const j = end === -1 ? n : end + 2
      out.push({ text: line.slice(i, j), color: "#2F5FE3", weight: 500 })
      i = j
      continue
    }

    // Python decorator @foo
    if (language === "python" && ch === "@") {
      let j = i + 1
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++
      out.push({ text: line.slice(i, j), color: DEFAULT_ACCENT, weight: 500 })
      i = j
      continue
    }

    if (/\s/.test(ch)) {
      let j = i
      while (j < n && /\s/.test(line[j])) j++
      out.push({ text: line.slice(i, j) })
      i = j
      continue
    }

    if (/[0-9]/.test(ch)) {
      let j = i
      while (j < n && /[0-9_.]/.test(line[j])) j++
      out.push({ text: line.slice(i, j), color: DEFAULT_INK, weight: 500 })
      i = j
      continue
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++
      const word = line.slice(i, j)
      const lower = word.toLowerCase()

      if (language === "sql" && SQL_KEYWORDS.has(lower)) {
        out.push({ text: word, color: DEFAULT_ACCENT, weight: 500 })
      } else if (language === "python" && PYTHON_KEYWORDS.has(word)) {
        out.push({ text: word, color: DEFAULT_ACCENT, weight: 500 })
      } else if (language === "python" && PYTHON_BUILTINS.has(word)) {
        out.push({ text: word, color: DEFAULT_INK, weight: 500 })
      } else {
        out.push({ text: word })
      }
      i = j
      continue
    }

    out.push({ text: ch })
    i += 1
  }

  return out
}

function renderLine(line: string, language: LabCodeLanguage, _accent: string) {
  const tokens = tokenizeLine(line, language)
  const nodes: ReactNode[] = []
  tokens.forEach((t, i) => {
    nodes.push(
      <span
        key={i}
        style={{
          color: t.color,
          fontWeight: t.weight,
        }}
      >
        {t.text}
      </span>,
    )
  })
  return <>{nodes}</>
}

/* -------------------------------------------------------------------------- */
/* Compare slide                                                              */
/* -------------------------------------------------------------------------- */

function CompareBody({
  slide,
  accent,
}: {
  slide: LabCompareSlide
  accent: string
}) {
  return (
    <div style={{ maxWidth: 960 }}>
      <Eyebrow text={slide.eyebrow} accent={accent} />
      <div className="mb-[32px]">
        <Title
          text={slide.title}
          emphasis={slide.titleEmphasis}
          accent={accent}
          size={72}
        />
      </div>
      <div className="mb-[52px]">
        <AccentBar accent={accent} />
      </div>

      <div className="grid grid-cols-2 gap-[28px]">
        <CompareColumn
          label={slide.left.label}
          items={slide.left.items}
          variant="muted"
          accent={accent}
        />
        <CompareColumn
          label={slide.right.label}
          items={slide.right.items}
          variant="accent"
          accent={accent}
        />
      </div>
    </div>
  )
}

function CompareColumn({
  label,
  items,
  variant,
  accent,
}: {
  label: string
  items: string[]
  variant: "muted" | "accent"
  accent: string
}) {
  const isAccent = variant === "accent"
  return (
    <div
      className="rounded-[12px] border p-[28px] bg-white"
      style={{
        borderColor: isAccent ? accent : DEFAULT_BORDER,
        boxShadow: "0 10px 32px rgba(25,25,25,0.04)",
      }}
    >
      <div
        className="uppercase tracking-[0.1em] text-[16px] mb-[22px]"
        style={{
          color: isAccent ? accent : DEFAULT_MUTED,
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </div>
      <div className="grid gap-[18px]">
        {items.map((text, i) => (
          <div
            key={i}
            className="flex gap-[14px] items-start text-[24px] leading-[1.28] tracking-[-0.02em]"
          >
            <span
              className="shrink-0 text-[22px]"
              style={{
                color: isAccent ? accent : DEFAULT_MUTED,
                fontFamily: "var(--font-mono)",
                width: 22,
              }}
            >
              {isAccent ? "→" : "·"}
            </span>
            <div style={{ color: isAccent ? DEFAULT_INK : "#4a4a4a" }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Stat slide                                                                 */
/* -------------------------------------------------------------------------- */

function StatBody({ slide, accent }: { slide: LabStatSlide; accent: string }) {
  return (
    <div style={{ maxWidth: 920 }}>
      <Eyebrow text={slide.eyebrow} accent={accent} />

      <div
        className="m-0 font-bold leading-[0.88] tracking-[-0.08em]"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: 260,
          color: accent,
        }}
      >
        {slide.value}
      </div>

      <div className="mt-[24px] mb-[32px]">
        <AccentBar accent={accent} />
      </div>

      <div
        className="text-[36px] leading-[1.2] tracking-[-0.03em] font-semibold"
        style={{ color: DEFAULT_INK, maxWidth: 780 }}
      >
        {slide.label}
      </div>

      {slide.body ? (
        <p
          className="m-0 mt-[24px] text-[26px] leading-[1.4] tracking-[-0.02em]"
          style={{ color: DEFAULT_MUTED, maxWidth: 780 }}
        >
          {slide.body}
        </p>
      ) : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Background motifs                                                          */
/* -------------------------------------------------------------------------- */

function DotGrid() {
  return (
    <div
      className="absolute top-[190px] right-[80px] w-[260px] h-[260px] opacity-[0.35] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(var(--blue) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}
    />
  )
}

function Circle() {
  return (
    <div
      className="absolute right-[90px] top-[250px] w-[420px] h-[420px] rounded-full opacity-[0.38] pointer-events-none"
      style={{ background: "var(--blue-soft)" }}
    />
  )
}

/**
 * Infra flow diagram — tucked into the bottom-right column so it sits
 * to the right of the (narrower) card, fully visible as a brand motif.
 */
function Diagram({ accent }: { accent: string }) {
  return (
    <div
      className="absolute right-[30px] bottom-[280px] w-[300px] h-[200px] pointer-events-none"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none">
        <path
          d="M70 55 C 110 55 90 135 160 135"
          stroke={accent}
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <path
          d="M160 135 C 200 135 180 55 230 55"
          stroke={accent}
          strokeWidth="2.5"
        />
        <path
          d="M230 55 C 270 55 240 135 300 135"
          stroke={accent}
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
      </svg>

      <Node left={0} top={20} label="raw" />
      <Node left={80} top={100} label="dbt" accent={accent} />
      <Node left={160} top={20} label="mart" />
      <Node left={230} top={100} label="BI" accent={accent} />
    </div>
  )
}

function Node({
  left,
  top,
  label,
  accent,
}: {
  left: number
  top: number
  label: string
  accent?: string
}) {
  const isBlue = Boolean(accent)
  return (
    <div
      className="absolute w-[70px] h-[70px] rounded-[10px] grid place-items-center text-[20px] border shadow-[0_10px_32px_rgba(25,25,25,0.04)]"
      style={{
        left,
        top,
        borderColor: isBlue ? accent : DEFAULT_BORDER,
        color: isBlue ? accent : DEFAULT_INK,
        background: isBlue ? "#f7faff" : "white",
        fontFamily: "var(--font-mono)",
      }}
    >
      {label}
    </div>
  )
}
