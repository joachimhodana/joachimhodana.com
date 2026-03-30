import { Spinner } from "@/components/ui/spinner"

export function PortfolioLoader({ label = "Loading portfolio…" }: { label?: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="relative w-full max-w-md px-6">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-40">
          <div className="h-48 w-full bg-gradient-to-r from-muted via-foreground/20 to-muted rounded-full animate-pulse" />
        </div>

        <div className="border border-border rounded-2xl bg-background/80 backdrop-blur-sm shadow-lg p-8">
          <div className="flex items-center gap-3">
            <Spinner className="size-5" />
            <div className="text-sm font-mono tracking-wider text-muted-foreground">{label}</div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-3 w-3/4 rounded bg-muted/40" />
            <div className="h-3 w-2/3 rounded bg-muted/40" />
            <div className="h-3 w-1/2 rounded bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

