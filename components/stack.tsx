"use client"

import { useEffect, useRef } from "react"
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiGit, SiGithub,
  SiJava, SiPython, SiC, SiNodedotjs, SiExpress, SiVisualstudiocode, 
  SiFirebase, SiMongodb, SiVercel
} from "react-icons/si"

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  const languages = [
    { name: "Java", icon: <span className="w-6 h-6 bg-[#ed8b00] rounded text-white text-xs flex items-center justify-center">J</span> },
    { name: "Python", icon: <SiPython className="text-[#3776ab] text-2xl" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#f7df1e] text-2xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178c6] text-2xl" /> },
    { name: "C", icon: <span className="w-6 h-6 bg-[#a8b9cc] rounded text-white text-xs flex items-center justify-center">C</span> },
    { name: "C++", icon: <span className="w-6 h-6 bg-[#00599c] rounded text-white text-xs flex items-center justify-center">C++</span> },
    { name: "HTML", icon: <SiHtml5 className="text-[#e34f26] text-2xl" /> },
    { name: "CSS", icon: <SiCss3 className="text-[#1572b6] text-2xl" /> },
  ]

  const frameworks = [
    { name: "React", icon: <SiReact className="text-[#61dafb] text-2xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933] text-2xl" /> },
    { name: "Express.js", icon: <span className="w-6 h-6 bg-[#000000] rounded text-white text-xs flex items-center justify-center">E</span> },
  ]

  const tools = [
    { name: "Git", icon: <SiGit className="text-[#f05032] text-2xl" /> },
    { name: "GitHub", icon: <SiGithub className="text-[#181717] text-2xl" /> },
    { name: "VS Code", icon: <span className="w-6 h-6 bg-[#007acc] rounded text-white text-xs flex items-center justify-center">VS</span> },
    { name: "Firebase", icon: <SiFirebase className="text-[#ffca28] text-2xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47a248] text-2xl" /> },
    { name: "Vercel", icon: <SiVercel className="text-[#000000] text-2xl" /> },
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
          {/* Languages */}
          <div className="flex items-start gap-12">
            <h3 className="text-4xl font-bold text-white w-1/3 text-left">LANGUAGES</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-8 w-2/3">
              {languages.map((tech) => (
                <div key={tech.name} className="flex items-center gap-4">
                  {tech.icon}
                  <span className="text-xl font-normal">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Frameworks */}
          <div className="flex items-start gap-12">
            <h3 className="text-4xl font-bold text-white w-1/3 text-left">FRAMEWORKS</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-8 w-2/3">
              {frameworks.map((tech) => (
                <div key={tech.name} className="flex items-center gap-4">
                  {tech.icon}
                  <span className="text-xl font-normal">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Tools */}
          <div className="flex items-start gap-12">
            <h3 className="text-4xl font-bold text-white w-1/3 text-left">TOOLS</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-8 w-2/3">
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
