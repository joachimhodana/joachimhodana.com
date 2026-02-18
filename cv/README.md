# CV (LaTeX source)

The CV is maintained as LaTeX in `Joachim-Hodana-CV.tex`.

**Build PDF:**

```bash
npm run build:cv
# or: bun run build:cv
```

The script uses `pdflatex` if available, otherwise **Docker** (image: `texlive/texlive:latest`, ~2GB one-time pull). Lighter images miss packages required by `hyperref` (clickable links in the PDF).

- **Option A — Docker:** `docker pull texlive/texlive:latest` once, then `npm run build:cv`.
- **Option B — Local TeX (macOS):** `brew install --cask basictex` (smaller than MacTeX; then run `eval "$(/usr/libexec/path_helper -s)"` or open a new terminal so `pdflatex` is on PATH).

Output: `public/Joachim Hodana CV.pdf` (used by the site’s “Download CV” button).
