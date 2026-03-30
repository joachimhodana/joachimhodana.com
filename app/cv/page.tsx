import fs from "node:fs/promises"
import path from "node:path"
import Link from "next/link"

type CvItem = {
  fileName: string
  href: string
  title: string
  subtitle?: string
}

function titleFromFileName(fileName: string) {
  const base = fileName.replace(/\.pdf$/i, "")
  return base
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function deriveSubtitle(title: string) {
  const t = title.toLowerCase()
  if (t.includes("data engineer")) return "Data Engineer"
  if (t.includes("python")) return "Python Software Engineer"
  if (t.includes("fullstack")) return "Fullstack Software Engineer"
  return undefined
}

async function getCvs(): Promise<CvItem[]> {
  const publicDir = path.join(process.cwd(), "public")
  let entries: string[] = []
  try {
    entries = await fs.readdir(publicDir)
  } catch {
    return []
  }

  return entries
    .filter((f) => /\.pdf$/i.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => {
      const title = titleFromFileName(fileName)
      return {
        fileName,
        href: `/${fileName}`,
        title,
        subtitle: deriveSubtitle(title),
      }
    })
}

export default async function CvIndexPage() {
  const cvs = await getCvs()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">CV ARCHIVE</div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">Download my CVs</h1>
          <p className="text-muted-foreground max-w-xl">
            Role-specific versions.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {cvs.length === 0 ? (
            <div className="border border-border rounded-lg p-6 text-muted-foreground">
              No CV PDFs found in <span className="font-mono">public/</span>.
            </div>
          ) : (
            cvs.map((cv) => (
              <Link
                key={cv.fileName}
                href={cv.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border rounded-xl hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg bg-background/80 backdrop-blur-sm"
              >
                <div className="p-6 sm:p-7 flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="text-base sm:text-lg font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {cv.subtitle ?? cv.title}
                      </div>
                      {cv.subtitle && (
                        <span className="px-2 py-0.5 text-[10px] font-mono tracking-wide border border-border rounded text-muted-foreground">
                          PDF
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono break-all">{cv.fileName}</div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 shrink-0 pt-0.5">
                    <span>Open</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

