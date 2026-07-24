"use client"

import { useEffect } from "react"
import { Hero } from "@/components/hero"
import { Education } from "@/components/education"
import { Stack } from "@/components/stack"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { AmbientBackground } from "@/components/AmbientBackground"

export default function Home() {
  useEffect(() => {
    // Scroll to hash once sections have mounted
    const timer = setTimeout(() => {
      if (window.location.hash) {
        const el = document.getElementById(window.location.hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // IntersectionObserver for hash update on scroll
    const sectionIds = ["home", "education", "stack", "experience", "projects", "contact"]
    const observer = new window.IntersectionObserver(
      (entries) => {
        // Find the section closest to the top (top >= 0)
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const topSection = visible.reduce((prev, curr) =>
            Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
          )
          if (window.location.hash !== `#${topSection.target.id}`) {
            window.history.replaceState(null, "", `#${topSection.target.id}`)
          }
        }
      },
      { threshold: 0.2 }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AmbientBackground />
      <main className="relative z-10 text-foreground">
        <section id="home">
          <Hero />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="stack">
          <Stack />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
