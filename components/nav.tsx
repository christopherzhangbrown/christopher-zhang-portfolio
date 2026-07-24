"use client"

const SECTIONS = ["education", "stack", "experience", "projects", "contact"]

export function Nav() {
  return (
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
      <a href="/" className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-signal animate-pulse" />
        <span className="font-mono text-xs tracking-widest">CZ / Portfolio</span>
      </a>
      <div className="hidden gap-8 md:flex">
        {SECTIONS.map((s) => (
          <a key={s} href={`/#${s}`} className="label hover:text-foreground transition-colors">
            {s}
          </a>
        ))}
      </div>
      <a
        href="/#contact"
        className="group flex items-center gap-2 border border-hairline px-4 py-2 text-xs font-mono uppercase tracking-widest hover:border-signal hover:text-signal transition-colors"
      >
        Available <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      </a>
    </nav>
  )
}
