"use client"

import { useEffect, useRef, useState } from "react"

const SECTIONS = ["education", "stack", "experience", "projects", "contact"]

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [navHeight, setNavHeight] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => setNavHeight(entries[0].contentRect.height))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300 ${
          scrolled ? "border-b border-hairline bg-background/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding] duration-300 md:px-10 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
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
        </div>
      </nav>
      <div style={{ height: navHeight }} />
    </>
  )
}
