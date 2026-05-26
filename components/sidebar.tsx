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
        className="fixed top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-[rgba(249,244,236,0.84)] text-foreground hover:border-accent hover:text-accent transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && <div className="fixed inset-0 bg-[rgba(26,24,20,0.28)] z-50" onClick={() => setIsOpen(false)} />}

      <aside
        className={`fixed top-0 right-0 h-full w-80 border-l border-border/80 bg-[rgba(247,241,233,0.96)] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-8">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 hover:border-accent hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <nav className="flex-1 space-y-5">
            <Link href="#home" className="block text-3xl hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="#stack" className="block text-3xl hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
              Stack
            </Link>
            <Link
              href="#education"
              className="block text-3xl hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Education
            </Link>
            <Link
              href="#experience"
              className="block text-3xl hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="block text-3xl hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          </nav>

          <div className="space-y-3 pt-8 border-t border-border/80 font-mono text-xs uppercase tracking-[0.14em]">
            <a href="https://github.com/christopherzhangbrown" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/christopher-zhang1" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href="/SWEResumeChristopherZhang.pdf" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">
              Resume
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
