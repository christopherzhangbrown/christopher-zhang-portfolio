const LINKS = [
  { label: "Email", href: "mailto:christopher_zhang@brown.edu" },
  { label: "GitHub", href: "https://github.com/christopher895" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/christopher-zhang1/" },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:px-10">
        <div>© {new Date().getFullYear()} Christopher Zhang</div>
        <div className="flex gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
