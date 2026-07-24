"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 grid h-11 w-11 place-items-center border border-hairline bg-surface text-foreground hover:border-signal hover:text-signal transition-colors md:hidden"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && <div className="fixed inset-0 bg-background/70 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />}

      <aside
        className={`fixed top-0 right-0 h-full w-80 border-l border-hairline bg-surface text-foreground z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-8">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-8 grid h-10 w-10 place-items-center border border-hairline hover:border-signal hover:text-signal transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <nav className="flex-1 space-y-5">
            <Link href="/#home" className="block font-display text-3xl tracking-tight hover:text-signal transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/#stack" className="block font-display text-3xl tracking-tight hover:text-signal transition-colors" onClick={() => setIsOpen(false)}>
              Stack
            </Link>
            <Link
              href="/#education"
              className="block font-display text-3xl tracking-tight hover:text-signal transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Education
            </Link>
            <Link
              href="/#experience"
              className="block font-display text-3xl tracking-tight hover:text-signal transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="/#projects"
              className="block font-display text-3xl tracking-tight hover:text-signal transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          </nav>

          <div className="space-y-3 pt-8 border-t border-hairline font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <a href="https://github.com/christopher895" target="_blank" rel="noopener noreferrer" className="block hover:text-signal transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/christopher-zhang1" target="_blank" rel="noopener noreferrer" className="block hover:text-signal transition-colors">
              LinkedIn
            </a>
            <a href="/SWEResumeChristopherZhang.pdf" target="_blank" rel="noopener noreferrer" className="block hover:text-signal transition-colors">
              Resume
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
