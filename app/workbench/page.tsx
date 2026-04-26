import Link from "next/link"
import { notFound } from "next/navigation"
import { isWorkbenchEnabled, listCarousels } from "@/workbench/lib/carousels"

export default async function WorkbenchIndex() {
  if (!isWorkbenchEnabled) notFound()
  const carousels = await listCarousels()
  const active = carousels.filter((c) => !c.archived)
  const archived = carousels.filter((c) => c.archived)

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-10 py-16 font-sans">
      <header className="max-w-5xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-[0.24em] text-neutral-500 mb-3">
          Carousel workbench
        </div>
        <h1 className="text-4xl font-bold tracking-[-0.02em] mb-3">LinkedIn carousels</h1>
        <p className="text-base text-neutral-600 max-w-2xl font-normal">
          Generate carousel content as TSX files in{" "}
          <code className="!p-1 text-xs">workbench/carousels/</code>, preview them here, then
          export to PNG with{" "}
          <code className="!p-1 text-xs">npm run carousel:export &lt;slug&gt;</code>.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        {carousels.length === 0 ? (
          <div className="border border-dashed border-neutral-300 rounded-xl p-12 text-center text-neutral-500">
            No carousels yet. Ask the AI to create one in{" "}
            <code className="!p-1 text-xs">workbench/carousels/&lt;slug&gt;.tsx</code>.
          </div>
        ) : (
          <div className="grid gap-10">
            <section>
              <div className="text-xs uppercase tracking-[0.24em] text-neutral-500 mb-4">
                Active
              </div>
              {active.length ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none !p-0">
                  {active.map((c) => (
                    <li key={c.slug} className="!p-0">
                      <Link
                        href={`/workbench/${c.slug}`}
                        className="block rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-400 transition-colors"
                      >
                        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                          {c.template} · {c.slideCount} slides
                        </div>
                        <div className="text-xl font-semibold tracking-[-0.01em] mb-3 leading-tight">
                          {c.title}
                        </div>
                        <div className="font-mono text-xs text-neutral-400">
                          {c.slug}.tsx
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-neutral-500">
                  No active carousels.
                </div>
              )}
            </section>

            {archived.length ? (
              <section>
                <div className="text-xs uppercase tracking-[0.24em] text-neutral-500 mb-4">
                  Archived
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none !p-0">
                  {archived.map((c) => (
                    <li key={c.slug} className="!p-0">
                      <Link
                        href={`/workbench/${c.slug}`}
                        className="block rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-400 transition-colors opacity-[0.82]"
                      >
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                            {c.template} · {c.slideCount} slides
                          </div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-600 border border-neutral-200 rounded px-2 py-1">
                            archived
                          </div>
                        </div>
                        <div className="text-xl font-semibold tracking-[-0.01em] mb-3 leading-tight">
                          {c.title}
                        </div>
                        <div className="font-mono text-xs text-neutral-400">
                          {c.slug}.tsx
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        )}
      </main>
    </div>
  )
}
