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
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!showContent) {
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
        <Hero />
        <Stack />
        <Education />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
