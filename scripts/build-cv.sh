#!/usr/bin/env bash
# Build a LaTeX CV into public/ with a stable PDF filename.
#
# Defaults: Data Engineer CV → public/Joachim_Hodana_Data_Engineer_CV.pdf (site download link)
#
# Other variants, e.g.:
#   CV_TEX=Joachim-Hodana-CV-Software-Engineer.tex CV_PDF=Joachim_Hodana_Software_Engineer_CV.pdf bash scripts/build-cv.sh
#
set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CV_DIR="$REPO_ROOT/cv"
OUT_DIR="$REPO_ROOT/public"

# Source .tex file (basename under cv/)
CV_TEX="${CV_TEX:-Joachim-Hodana-CV-Data-Engineer.tex}"
# Output filename in public/
CV_PDF="${CV_PDF:-Joachim_Hodana_Data_Engineer_CV.pdf}"

TEX_BASENAME="${CV_TEX%.tex}"

build_with_pdflatex() {
  cd "$CV_DIR"
  pdflatex -interaction=nonstopmode -output-directory="$OUT_DIR" "$CV_TEX" >/dev/null
  pdflatex -interaction=nonstopmode -output-directory="$OUT_DIR" "$CV_TEX"
}

build_with_docker() {
  # Full TeX Live image (~2GB). Minimal images miss hyperref deps (e.g. infwarerr).
  docker run --rm \
    -v "$CV_DIR:/work:ro" \
    -v "$OUT_DIR:/out" \
    -w /work \
    texlive/texlive:latest \
    sh -c "pdflatex -interaction=nonstopmode -output-directory=/out '$CV_TEX' >/dev/null && pdflatex -interaction=nonstopmode -output-directory=/out '$CV_TEX'"
}

if command -v pdflatex &>/dev/null; then
  build_with_pdflatex
elif command -v docker &>/dev/null; then
  echo "pdflatex not found; using Docker (texlive/texlive:latest, ~2GB one-time pull)..."
  build_with_docker
else
  echo "Error: neither pdflatex nor Docker found. Install TeX (e.g. brew install --cask basictex) or Docker." >&2
  exit 1
fi

# Rename to final filename and remove LaTeX aux files from public
mv "$OUT_DIR/$TEX_BASENAME.pdf" "$OUT_DIR/$CV_PDF"
rm -f "$OUT_DIR/$TEX_BASENAME.aux" "$OUT_DIR/$TEX_BASENAME.log" "$OUT_DIR/$TEX_BASENAME.out"

echo "CV built: public/$CV_PDF"
