"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const projects = [
  {
    number: "_01.",
    title: "Egy-Railway",
    tags: ["React", "React Query", "Supabase"],
    href: "/projects/egyrailway",
  },
  {
    number: "_02.",
    title: "Green Shop",
    tags: ["React", "React Query", "Supabase"],
    href: "/projects/greenshop",
  },
  {
    number: "_03.",
    title: "Foodie",
    tags: ["JavaScript", "OOP", "RESTFull api"],
    href: "/projects/foodie",
  },
]

export function Projects() {
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
    <section ref={sectionRef} id="projects" className="py-20 px-6 bg-card/50 backdrop-blur-sm opacity-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16">SELECTED PROJECTS</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.number}
              href={project.href}
              className="group block p-6 border border-border rounded-lg hover:border-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.number}</p>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
