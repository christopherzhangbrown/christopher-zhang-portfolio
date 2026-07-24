"use client"

import { Sidebar } from "@/components/sidebar"
import { Nav } from "@/components/nav"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { AmbientBackground } from "@/components/AmbientBackground"

export default function ProjectsPage() {
  return (
    <>
      <AmbientBackground />
      <Nav />
      <Sidebar />
      <main className="relative z-10 text-foreground">
        <Projects />
      </main>
      <Footer />
    </>
  )
}
