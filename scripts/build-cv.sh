#!/usr/bin/env bash
set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CV_DIR="$REPO_ROOT/cv"
OUT_DIR="$REPO_ROOT/public"
PDF_NAME="Joachim Hodana CV.pdf"

build_with_pdflatex() {
  cd "$CV_DIR"
  pdflatex -interaction=nonstopmode -output-directory="$OUT_DIR" Joachim-Hodana-CV.tex >/dev/null
  pdflatex -interaction=nonstopmode -output-directory="$OUT_DIR" Joachim-Hodana-CV.tex
}

build_with_docker() {
  # Full TeX Live image (~2GB). Minimal images miss hyperref deps (e.g. infwarerr).
  docker run --rm \
    -v "$CV_DIR:/work:ro" \
    -v "$OUT_DIR:/out" \
    -w /work \
    texlive/texlive:latest \
    sh -c "pdflatex -interaction=nonstopmode -output-directory=/out Joachim-Hodana-CV.tex >/dev/null && pdflatex -interaction=nonstopmode -output-directory=/out Joachim-Hodana-CV.tex"
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
mv "$OUT_DIR/Joachim-Hodana-CV.pdf" "$OUT_DIR/$PDF_NAME"
rm -f "$OUT_DIR/Joachim-Hodana-CV.aux" "$OUT_DIR/Joachim-Hodana-CV.log" "$OUT_DIR/Joachim-Hodana-CV.out"

echo "CV built: public/$PDF_NAME"
