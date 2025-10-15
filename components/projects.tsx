"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAnimation, useStaggeredAnimation } from "@/hooks/use-animation"

const projects = [
  {
    number: "_01.",
    id: "01",
    title: "AI Swim Start Analyzer",
    tags: ["React", "OpenCV", "MediaPipe"],
    hasImage: true,
  },
  {
    number: "_02.",
    id: "02", 
    title: "Chris Swimzz Website", 
    tags: ["HTML", "CSS", "TypeScript", "Supabase"],
    hasImage: true,
  },
  {
    number: "_03.",
    id: "03",
    title: "Snake Game",
    tags: ["C", "Data Structures", "Game Logic"],
    hasImage: true,
  },
  {
    number: "_04.",
    id: "04",
    title: "FTC Robot Programming",
    tags: ["Java", "OpenCV", "PID Control"],
    hasImage: true,
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const router = useRouter()

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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: window.innerWidth / 2, y: e.clientY })
  }

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-6 bg-card/50 backdrop-blur-sm opacity-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-16 flex items-center gap-3">
          <span className="text-3xl animate-spin-slow animate-glow">✻</span> SELECTED PROJECTS
        </h2>

        <div className="relative" onMouseMove={handleMouseMove}>
          {projects.map((project, index) => (
            <div
              key={project.number}
              className="flex items-center justify-between py-8 border-b border-white/10 group hover:bg-white/5 transition-all duration-300 relative cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.number)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Left side - Project info */}
              <div className="flex items-center gap-8 flex-1">
                <span className="text-white/40 text-xs font-mono">{project.number}</span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#3b82f6] transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-white/50 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* External link icon */}
              <div className={`absolute top-6 right-6 transition-opacity duration-300 ${
                hoveredProject === project.number ? 'opacity-100' : 'opacity-0'
              }`}>
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          ))}

          {/* Floating project preview that follows mouse */}
          {hoveredProject && (
            <div 
              className="fixed pointer-events-none z-50 transition-opacity duration-200"
              style={{
                left: mousePosition.x + 100,
                top: mousePosition.y - 150, // Positioned higher
                transform: 'translateZ(0)', // Hardware acceleration
              }}
            >
              <div className="w-80 h-48 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white/40 text-sm">Project Preview</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
