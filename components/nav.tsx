"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const SECTIONS = [
  { id: "education", label: "Education" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-hairline bg-background/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <a href="/" className="flex items-center gap-2" aria-label="Christopher Zhang, home">
          <span className="h-2 w-2 rounded-full bg-signal motion-safe:animate-pulse" />
          <span className="font-mono text-xs tracking-widest">CZ / Portfolio</span>
        </a>

        <div className="hidden gap-8 md:flex">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`/#${s.id}`} className="label transition-colors hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden items-center gap-2 border border-hairline-strong px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-signal hover:text-signal md:flex"
          >
            Available <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center border border-hairline-strong transition-colors hover:border-signal hover:text-signal md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-hairline md:hidden">
        <div className="mx-auto grid max-w-7xl divide-y divide-hairline px-6">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={() => setOpen(false)}
              className="label py-4 transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
