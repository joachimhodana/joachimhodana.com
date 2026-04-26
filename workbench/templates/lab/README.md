# Template: `lab`

Research-lab / premium minimal frame based on the provided HTML mock.

## Defaults (brand system)

- **Ink**: `#191919`
- **Paper**: `#FAFAF8`
- **Accent (Ice Blue)**: `#5B8CFF` (default if `carousel.accent` is missing)

## Slide shape

Use `LabCarousel` from `workbench/templates/lab/types`. `slides` is a discriminated
union — pick the right `kind` for each slide. Mix kinds to keep rhythm.

### `kind: "lab"` — the default content slide

Use for the title, hook, closing thought, and most "explanation" slides.

- `eyebrow` — monospace label (e.g. `dbt · observability`)
- `title` + optional `titleEmphasis` (blue tail)
- `body` — one concise paragraph
- `points` — 0–5 bullet points (rendered inside the white card)
- `diagram` — `false` to hide the floating infra diagram (default shown)

Limits: `title` ≤ ~9 words total. `body` ≤ ~35 words. Each point ≤ ~10–12 words.

### `kind: "code"` — monospace snippet

Use this when the post shows a SQL or Python snippet. Do not paraphrase the
code into bullets — the code _is_ the content.

- `title` + `titleEmphasis`
- `language` — `"sql"`, `"python"`, `"yaml"`, `"bash"`, or `"text"`
- `filename` — optional (e.g. `models/audit_log.sql`)
- `caption` — one-line context under the block
- `code` — raw code as a template literal

Limits: keep snippets under ~14 lines and ~60 chars wide — longer and the
monospace gets uncomfortable at carousel resolution.

### `kind: "compare"` — side-by-side columns

Great for "what tests cover vs what they miss", "test status vs reality",
"before vs after", etc.

- `title` + `titleEmphasis`
- `left` — `{ label, items[] }` (rendered muted — the "expected" side)
- `right` — `{ label, items[] }` (rendered with accent — the "real" side)

Limits: 2–4 items per column. Each item ≤ ~10 words.

### `kind: "stat"` — oversized number (pattern interrupt)

Use once per carousel at most, as a visual break.

- `value` — short string, ≤ 6 characters (`"5"`, `"98k"`, `"4m"`, `"1/2"`, `"2am"`)
- `label` — one-line headline
- `body` — optional short supporting line

## Copy rules (across kinds)

- First slide is the hook — no "kind: title" needed, just a strong `kind: "lab"`.
- Last slide is the CTA — usually `kind: "lab"` with a punchy `title` +
  `"link in comments."`-style emphasis.
- Target 6–8 slides.
- Mix at least two different `kind`s — all-content slides get boring.
- Keep the voice of the post. Do not rephrase into marketing-speak.

## Footers

Default footer is:

- left: `Building better data infrastructure.`
- right: `joachimhodana.com | betterdataengineer.joachimhodana.com`

Override per carousel via `brandName`, `linkPrimary`, `linkSecondary`.
Override per slide via `footerTitle` and `footerLinks`.
