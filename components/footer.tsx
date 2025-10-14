"use client"

import { useEffect, useRef } from "react"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="relative z-10 py-12 px-6 border-t border-border/50 opacity-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">You know how to find me:</h3>
            <a
              href="mailto:christopher_zhang@brown.edu"
              className="text-lg hover:text-primary hover:scale-110 transition-all duration-300"
            >
              christopher_zhang@brown.edu
            </a>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://github.com/christopherzhang1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Chris
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
