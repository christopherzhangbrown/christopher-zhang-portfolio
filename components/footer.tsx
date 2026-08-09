const PROMPT = "christopher@zhang:~$ still building"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal motion-safe:animate-pulse" />
          <span
            className="typewriter"
            style={{
              ["--type-width" as string]: `${PROMPT.length}ch`,
              ["--type-steps" as string]: PROMPT.length,
            }}
          >
            {PROMPT}
          </span>
          <span aria-hidden="true" className="inline-block w-[0.5em] motion-safe:animate-[blink_1s_step-end_infinite]">
            _
          </span>
        </div>
        <div>© 2026 Christopher Zhang.</div>
      </div>
    </footer>
  )
}
