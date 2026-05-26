"use client"

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          AX / LAB — All systems nominal
        </div>
        <div>© 2026 Christopher Zhang. Built with intent.</div>
      </div>
    </footer>
  )
}
