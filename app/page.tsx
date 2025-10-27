"use client"

import { useState, useEffect } from "react"
import { PersonalLogo } from "@/components/nevo-logo"
import { Sidebar } from "@/components/sidebar"
import { Hero } from "@/components/hero"

import { Stack } from "@/components/stack"
import { Education } from "@/components/education"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  // Always initialize to false to avoid SSR mismatch
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setShowContent(false)
    const timer = setTimeout(() => {
      setShowContent(true)
      window.sessionStorage.setItem('hasVisited', 'true')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return
    // Scroll to hash after content is rendered
    setTimeout(() => {
      if (window.location.hash) {
        const el = document.getElementById(window.location.hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 0)
  }, [showContent])

  useEffect(() => {
    if (!showContent) return
    // IntersectionObserver for hash update on scroll
    const sectionIds = ["home", "stack", "education", "experience", "projects"]
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
  }, [showContent])

  // Always render a consistent placeholder for SSR and client
  if (!showContent) {
    // Show logo on every full page load (refresh), not on client-side navigation
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#3b82f6]">
        <PersonalLogo />
      </main>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <Sidebar />
      <main className="relative z-10 text-foreground">
        <section id="home">
          <Hero />
        </section>
        <section id="stack">
          <Stack />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </main>
      <Footer />
    </>
  )
}
