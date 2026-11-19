"use client"

import { Nav } from "@/components/nav"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 text-foreground">
        <Projects />
      </main>
      <Footer />
    </>
  )
}
