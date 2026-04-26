"use client"

import { useCallback, useMemo, useState } from "react"

type Props = {
  slug: string
  title: string
  post?: string
}

export function PostPanel({ slug, title, post }: Props) {
  const [copied, setCopied] = useState(false)

  const text = useMemo(() => (post ?? "").trim(), [post])
  const hasText = text.length > 0

  const onCopy = useCallback(async () => {
    if (!hasText) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }, [hasText, text])

  return (
    <aside className="min-h-0 flex flex-col border-l border-neutral-800 bg-neutral-950">
      <div className="shrink-0 px-6 py-4 border-b border-neutral-800">
        <div className="text-xs uppercase tracking-[0.24em] text-neutral-500 mb-2">
          Post content
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{title}</div>
            <div className="text-xs text-neutral-500 font-mono mt-1 truncate">
              workbench/carousels/{slug}.tsx
            </div>
          </div>
          <button
            type="button"
            onClick={onCopy}
            disabled={!hasText}
            className="shrink-0 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {hasText ? (
          <pre className="m-0 p-6 text-[13px] leading-[1.55] text-neutral-200 whitespace-pre-wrap break-words font-sans">
            {text}
          </pre>
        ) : (
          <div className="p-6 text-sm text-neutral-500">
            No post text found for this carousel. Add a top-level{" "}
            <code className="px-1 py-[2px] rounded bg-neutral-900 text-neutral-300">
              post
            </code>{" "}
            field in the carousel file.
          </div>
        )}
      </div>
    </aside>
  )
}

