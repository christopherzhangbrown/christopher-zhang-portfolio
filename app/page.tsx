"use client"

import { useEffect } from "react"
import { Hero } from "@/components/hero"
import { Education } from "@/components/education"
import { Stack } from "@/components/stack"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { Nav } from "@/components/nav"
import { AmbientBackground } from "@/components/AmbientBackground"

const SECTION_IDS = ["home", "education", "stack", "experience", "projects", "contact"]

export default function Home() {
  useEffect(() => {
    // Let the browser own the initial fragment scroll; scroll-margin-top in
    // globals.css keeps the target clear of the fixed nav.
    if (!window.location.hash) return
    const el = document.getElementById(window.location.hash.slice(1))
    if (!el) return
    const timer = window.setTimeout(() => el.scrollIntoView({ block: "start" }), 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Sections are taller than the viewport, so a ratio threshold can never fire
    // for several of them. Watch a thin band near the top of the viewport instead
    // and treat whichever section occupies it as current.
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.filter((e) => e.isIntersecting)
        if (active.length === 0) return
        const top = active.reduce((prev, curr) =>
          Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
        )
        const next = `#${top.target.id}`
        if (window.location.hash !== next) {
          window.history.replaceState(null, "", next)
        }
      },
      { rootMargin: "-20% 0px -75% 0px" }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AmbientBackground />
      <Nav />
      <main className="relative z-10 text-foreground">
        <Hero />
        <Education />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
