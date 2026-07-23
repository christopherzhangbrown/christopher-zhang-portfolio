"use client"

import { Sidebar } from "@/components/sidebar"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { AmbientBackground } from "@/components/AmbientBackground"

export default function ProjectsPage() {
  return (
    <>
      <AmbientBackground />
      <Sidebar />
      <main className="relative z-10 text-foreground">
        <div className="pt-20">
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  )
}
