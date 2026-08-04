#!/usr/bin/env bash
# Build a LaTeX CV into public/ with a stable PDF filename.
#
# Prefers Tectonic (small install, on-demand packages): brew install tectonic
# Then local pdflatex, then a container runtime (Apple Container preferred over Docker).
#
# Defaults: Data Engineer CV → public/Joachim_Hodana_Data_Engineer_CV.pdf (site download link)
#
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CV_DIR="$REPO_ROOT/cv"
OUT_DIR="$REPO_ROOT/public"

# Source .tex file (basename under cv/)
CV_TEX="${CV_TEX:-Joachim-Hodana-CV-Data-Engineer.tex}"
# Output filename in public/
CV_PDF="${CV_PDF:-Joachim_Hodana_Data_Engineer_CV.pdf}"

TEX_BASENAME="${CV_TEX%.tex}"
TEX_PATH="$CV_DIR/$CV_TEX"
TEXLIVE_IMAGE="${TEXLIVE_IMAGE:-docker.io/texlive/texlive:latest}"

build_with_tectonic() {
  tectonic --outdir "$OUT_DIR" "$TEX_PATH"
}

build_with_pdflatex() {
  cd "$CV_DIR"
  pdflatex -interaction=nonstopmode -output-directory="$OUT_DIR" "$CV_TEX" >/dev/null
  pdflatex -interaction=nonstopmode -output-directory="$OUT_DIR" "$CV_TEX"
}

# Prefer Apple Container (`container`) over Docker when both exist.
resolve_container_cli() {
  if command -v container &>/dev/null; then
    echo "container"
  elif command -v docker &>/dev/null; then
    echo "docker"
  else
    return 1
  fi
}

build_with_container() {
  local cli="$1"
  local -a run_cmd
  # Full TeX Live image (~2GB). Minimal images miss hyperref deps (e.g. infwarerr).
  local latex_cmd="pdflatex -interaction=nonstopmode -output-directory=/out '$CV_TEX' >/dev/null && pdflatex -interaction=nonstopmode -output-directory=/out '$CV_TEX'"

  if [[ "$cli" == "container" ]]; then
    # Apple Container: use --mount (explicit bind mounts) and --rm.
    # Image refs typically need a registry host (docker.io/...).
    run_cmd=(
      container run --rm
      --mount "type=bind,source=$CV_DIR,target=/work,readonly"
      --mount "type=bind,source=$OUT_DIR,target=/out"
      --workdir /work
      "$TEXLIVE_IMAGE"
      sh -c "$latex_cmd"
    )
  else
    # Docker / Docker-compatible CLIs.
    run_cmd=(
      docker run --rm
      -v "$CV_DIR:/work:ro"
      -v "$OUT_DIR:/out"
      -w /work
      "$TEXLIVE_IMAGE"
      sh -c "$latex_cmd"
    )
  fi

  "${run_cmd[@]}"
}

CONTAINER_CLI=""
if command -v tectonic &>/dev/null; then
  build_with_tectonic
elif command -v pdflatex &>/dev/null; then
  echo "tectonic not found; using pdflatex (install: brew install tectonic)..." >&2
  build_with_pdflatex
elif CONTAINER_CLI="$(resolve_container_cli)"; then
  echo "tectonic/pdflatex not found; using $CONTAINER_CLI ($TEXLIVE_IMAGE, ~2GB one-time pull)..." >&2
  build_with_container "$CONTAINER_CLI"
else
  echo "Error: install Tectonic (brew install tectonic), TeX (brew install --cask basictex), Apple Container, or Docker." >&2
  exit 1
fi

# Rename to final filename and remove LaTeX aux files from public
mv "$OUT_DIR/$TEX_BASENAME.pdf" "$OUT_DIR/$CV_PDF"
rm -f "$OUT_DIR/$TEX_BASENAME.aux" "$OUT_DIR/$TEX_BASENAME.log" "$OUT_DIR/$TEX_BASENAME.out"

echo "CV built: public/$CV_PDF"
