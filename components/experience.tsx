"use client"

import { useEffect, useRef } from "react"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-6 opacity-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16">My Experience</h2>

        <div className="border-l-2 border-border pl-8 space-y-8">
          <div className="hover:translate-x-2 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-2">All-Safe</h3>
            <p className="text-lg text-muted-foreground mb-2">Frontend Developer - Internship</p>
            <p className="text-sm text-muted-foreground">04/2025 - 07/2025</p>
          </div>
        </div>
      </div>
    </section>
  )
}
