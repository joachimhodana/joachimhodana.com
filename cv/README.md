# CV (LaTeX source)

Source: `Joachim-Hodana-CV-Data-Engineer.tex`

Built PDF (site download): `public/Joachim_Hodana_Data_Engineer_CV.pdf`

```bash
npm run build:cv
```

Build order:

1. **Tectonic** (`brew install tectonic`) - preferred
2. Local **pdflatex**
3. Container runtime with `texlive/texlive:latest` (~2GB one-time pull)
   - Prefers Apple Container (`container`) when available
   - Falls back to Docker
