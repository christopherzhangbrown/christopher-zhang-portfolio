"use client"

import { useEffect, useRef } from "react"

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  const frontend = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Redux",
    "Zustand",
    "Tailwind CSS",
    "SASS",
    "Styled-Components",
  ]

  const backend = ["Supabase"]

  const tools = ["Git", "GitHub", "Postman", "VSCODE", "VIM", "NPM", "PNPM", "Yarn"]

  const studying = ["Next.js", "GSAP", "Frammer Motion"]

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
    <section ref={sectionRef} className="py-20 px-6 bg-card/50 backdrop-blur-sm opacity-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16">My Stack</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">frontend</h3>
            <ul className="space-y-3">
              {frontend.map((tech) => (
                <li key={tech} className="text-lg hover:text-primary transition-colors duration-200">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">backend</h3>
            <ul className="space-y-3">
              {backend.map((tech) => (
                <li key={tech} className="text-lg hover:text-primary transition-colors duration-200">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">tools</h3>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool} className="text-lg hover:text-primary transition-colors duration-200">
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">studying</h3>
            <ul className="space-y-3">
              {studying.map((tech) => (
                <li key={tech} className="text-lg hover:text-primary transition-colors duration-200">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
