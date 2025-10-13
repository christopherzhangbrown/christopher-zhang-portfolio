"use client"

import { useEffect, useRef } from "react"
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiRedux, SiTailwindcss, SiSass, SiStyledcomponents,
  SiSupabase, SiGit, SiGithub
} from "react-icons/si"

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  const frontend = [
    { name: "HTML", icon: <SiHtml5 className="text-[#e34f26] text-2xl" /> },
    { name: "CSS", icon: <SiCss3 className="text-[#1572b6] text-2xl" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#f7df1e] text-2xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178c6] text-2xl" /> },
    { name: "React", icon: <SiReact className="text-[#61dafb] text-2xl" /> },
    { name: "Redux", icon: <SiRedux className="text-[#764abc] text-2xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06b6d4] text-2xl" /> },
    { name: "SASS", icon: <SiSass className="text-[#cc6699] text-2xl" /> },
    { name: "Styled-Components", icon: <SiStyledcomponents className="text-[#db7093] text-2xl" /> },
  ]

  const backend = [
    { name: "Supabase", icon: <SiSupabase className="text-[#3ecf8e] text-2xl" /> },
  ]

  const tools = [
    { name: "Git", icon: <SiGit className="text-[#f05032] text-2xl" /> },
    { name: "GitHub", icon: <SiGithub className="text-[#181717] text-2xl" /> },
  ]

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
        <h2 className="text-2xl font-semibold mb-16 flex items-center gap-3">
          <span className="text-3xl animate-spin-slow">✻</span> MY STACK
        </h2>
        <div className="space-y-20">
          {/* Frontend */}
          <div className="flex items-start gap-12">
            <h3 className="text-6xl font-bold text-white w-1/3 text-left">FRONTEND</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-8 w-2/3">
              {frontend.map((tech) => (
                <div key={tech.name} className="flex items-center gap-4">
                  {tech.icon}
                  <span className="text-xl font-normal">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Backend */}
          <div className="flex items-start gap-12">
            <h3 className="text-6xl font-bold text-white w-1/3 text-left">BACKEND</h3>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 w-2/3">
              {backend.map((tech) => (
                <div key={tech.name} className="flex items-center gap-4">
                  {tech.icon}
                  <span className="text-xl font-normal">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Tools */}
          <div className="flex items-start gap-12">
            <h3 className="text-6xl font-bold text-white w-1/3 text-left">TOOLS</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 w-2/3">
              {tools.map((tool) => (
                <div key={tool.name} className="flex items-center gap-4">
                  {tool.icon}
                  <span className="text-xl font-normal">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
