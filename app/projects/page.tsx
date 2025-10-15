"use client"

import { Sidebar } from "@/components/sidebar"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function ProjectsPage() {
  return (
    <>
      <AnimatedBackground />
      <Sidebar />
      <main className="relative z-10 text-foreground">
        <div className="pt-20"> {/* Add top padding to account for any fixed header */}
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  )
}
