# CV (LaTeX sources)

Sources live in this folder with **explicit role/variant names** so you can maintain many CVs side by side.

| File | Typical output in `public/` |
|------|-----------------------------|
| `Joachim-Hodana-CV-Data-Engineer.tex` | `Joachim_Hodana_Data_Engineer_CV.pdf` (default site download) |
| `Joachim-Hodana-CV-Python-Software-Engineer.tex` | `Joachim_Hodana_Python_Software_Engineer_CV.pdf` |
| `Joachim-Hodana-CV-Fullstack-Software-Engineer.tex` | `Joachim_Hodana_Fullstack_Software_Engineer_CV.pdf` |

Add more files following the same pattern → compile with `CV_TEX` and `CV_PDF` as below.

**Build PDF (default = Data Engineer):**

```bash
npm run build:cv
# or: bun run build:cv
```

**Build another variant (e.g. Python Software Engineer):**

```bash
CV_TEX=Joachim-Hodana-CV-Python-Software-Engineer.tex CV_PDF=Joachim_Hodana_Python_Software_Engineer_CV.pdf npm run build:cv
```

Example (Fullstack):

```bash
CV_TEX=Joachim-Hodana-CV-Fullstack-Software-Engineer.tex CV_PDF=Joachim_Hodana_Fullstack_Software_Engineer_CV.pdf npm run build:cv
```

The script uses `pdflatex` if available, otherwise **Docker** (image: `texlive/texlive:latest`, ~2GB one-time pull). Lighter images miss packages required by `hyperref` (clickable links in the PDF).

- **Option A — Docker:** `docker pull texlive/texlive:latest` once, then `npm run build:cv`.
- **Option B — Local TeX (macOS):** `brew install --cask basictex` (smaller than MacTeX; then run `eval "$(/usr/libexec/path_helper -s)"` or open a new terminal so `pdflatex` is on PATH).

Default output used by the site’s “Download CV” button: `public/Joachim_Hodana_Data_Engineer_CV.pdf`.
