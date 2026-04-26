# Carousel workbench

A small Next.js-based workbench for designing LinkedIn carousels with Cursor/AI.

**Philosophy:** commit the infrastructure (templates, scripts, example), don't commit the generated content or rendered images. Every carousel is a single TSX file that plugs into a shared HTML/CSS frame.

## Quick start

```bash
npm run dev                              # terminal 1 — runs Next.js
open http://localhost:3000/workbench     # preview in browser

# one-time:
npm run carousel:install                 # installs chromium for Playwright

# export to PNG (dev server must be running):
npm run carousel:export <slug>           # single carousel
npm run carousel:export all              # everything in workbench/carousels/
```

Exported PNGs land in `workbench/out/<slug>/` at 2160×2700 (retina, 2×) by default. Override with `SCALE=3` env var for 3240×4050.

## Brand system

See `workbench/BRAND_BOOK.md`. Use it as the default source of truth for colors, typography, spacing, and overall tone.

## Files you care about

```
workbench/
├── carousels/                 ← AI writes new .tsx files here (gitignored)
│   └── _example.tsx           ← committed as the reference
├── templates/
│   └── minimal/
│       ├── Slide.tsx          ← the HTML frame (1080×1350)
│       ├── types.ts           ← slide shape enforced by TypeScript
│       └── README.md          ← per-template prompt rules
└── out/                       ← rendered PNGs (gitignored)
```

## Workflow

1. Write a LinkedIn post / draft.
2. Ask Cursor: _"create a carousel from this post in `workbench/carousels/<slug>.tsx` using the minimal template"_ (see prompt below).
3. Preview at `http://localhost:3000/workbench/<slug>` — swipe with arrow keys.
4. Iterate on the content.tsx file until it reads well.
5. Run `npm run carousel:export <slug>`.
6. Upload the PNGs from `workbench/out/<slug>/` to LinkedIn (create a document or upload as images).

## Prompt for Cursor / AI

> You are generating a LinkedIn carousel. Create exactly one file at `workbench/carousels/<slug>.tsx` that `export default`s an object typed as either:
> - `MinimalCarousel` from `../templates/minimal/types` (template id: `minimal`)
> - `LabCarousel` from `../templates/lab/types` (template id: `lab`)
>
> Rules:
> - Read the template README for copy rules:
>   - `workbench/templates/minimal/README.md`
>   - `workbench/templates/lab/README.md`
> - First slide is always `kind: "title"`, last slide is always `kind: "cta"`.
> - Target 6–8 slides total (LinkedIn sweet spot). Each slide must stand on its own — no "continued on next slide".
> - Keep visuals consistent with `workbench/BRAND_BOOK.md`. Use Ice Blue `#5B8CFF` as default accent unless there's a strong reason not to.
> - Do not import anything other than the carousel type (`MinimalCarousel` or `LabCarousel`). No extra components, no client hooks.
> - Do not rephrase the user's post into generic marketing-speak. Keep their voice.
>
> After writing the file, remind me to visit `http://localhost:3000/workbench/<slug>` and tell me the export command.

Copy that prompt into a Cursor chat and paste your post after it.

## Adding a new template

1. `mkdir workbench/templates/<name>` and mirror `minimal/`: `Slide.tsx`, `types.ts`, `README.md`.
2. Register in `workbench/templates/index.ts` — add to the `AnyCarousel` union and the `templates` map.
3. Update the prompt above to mention the new template option.

## Tech notes

- The frame is a React component (`Slide.tsx`) rendering plain HTML elements with Tailwind. That's what "HTML frame" means here — no shadcn, no abstractions, just DOM you can read top-to-bottom.
- `font-weight: 300` and `font-size: 0.875rem` defaults from `app/globals.css` apply globally; the template overrides them with explicit Tailwind classes.
- Playwright screenshots the `[data-slide]` element (not the viewport) so surrounding chrome doesn't leak into the PNG.
- The isolated render route `/workbench/<slug>/slide/<index>` is also handy for manual screenshots or PDF exports via browser print.
