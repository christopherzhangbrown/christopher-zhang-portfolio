"use client"

import { useEffect, useRef } from "react"
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiGit, SiGithub,
  SiPython, SiC, SiNodedotjs, SiExpress, 
  SiFirebase, SiMongodb, SiVercel
} from "react-icons/si"

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null)
  const allItemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Dynamic adaptive timing - starts when section enters viewport, ends when it leaves
      const sectionHeight = rect.height
      const startPoint = windowHeight * 0.6  // Start when 70% of section is visible
      const endPoint = -sectionHeight * 0.6  // End when section is almost out of view
      
      let sectionProgress = 0
      
      // Only animate when section is actually visible
      if (rect.top <= startPoint && rect.bottom >= 0) {
        if (rect.top <= startPoint && rect.top >= endPoint) {
          // Normal scroll progress through the section
          sectionProgress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)))
        } else if (rect.top < endPoint) {
          // Section fully scrolled through
          sectionProgress = 1
        }
      }
      
      // Adaptive item timing based on actual content
      const totalItems = allItemsRef.current.filter(item => item !== null).length
      
      if (totalItems === 0) return
      
      // Dynamic spacing - items appear evenly throughout the scroll
      const itemSpacing = 0.45 / totalItems  // SMALLER = items finish showing up quicker

      allItemsRef.current.forEach((item, index) => {
        if (!item) return
        
        // Each item has its own trigger point within the section
        const itemTrigger = index * itemSpacing  // When this specific item starts animating
        const itemProgress = Math.max(0, Math.min(1, (sectionProgress - itemTrigger) / itemSpacing))
        
        // Smooth easing function for better animation feel
        const easedProgress = itemProgress < 0.5 
          ? 2 * itemProgress * itemProgress 
          : 1 - Math.pow(-2 * itemProgress + 2, 3) / 2
        
        item.style.opacity = easedProgress.toString()
        item.style.transform = `translateY(${(1 - easedProgress) * 20}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true }) // Handle window resize
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Remove the effect that was hiding items
  // useEffect removed - items should be visible by default

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



  // All items are now handled directly in the JSX with proper ref indexing

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-card/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-16 flex items-center gap-3">
          <span className="text-3xl animate-spin-slow">✻</span> MY STACK
        </h2>
        <div className="space-y-12 md:space-y-20">
          {/* Languages */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            <div
              ref={el => { if (el) allItemsRef.current[0] = el }}
              className="opacity-0 transition-all duration-400 ease-out md:w-1/3"
              style={{ transform: "translateY(30px)" }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white text-left">LANGUAGES</h3>
            </div>
            <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8 md:w-2/3">
              {languages.map((tech, index) => (
                <div 
                  key={tech.name}
                  ref={el => { if (el) allItemsRef.current[index + 1] = el }}
                  className="flex items-center gap-3 md:gap-4 hover:scale-110 transition-all duration-300 ease-out opacity-0"
                  style={{ transform: "translateY(30px)" }}
                >
                  {tech.icon}
                  <span className="text-lg md:text-xl font-normal">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Frameworks */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            <div
              ref={el => { if (el) allItemsRef.current[languages.length + 1] = el }}
              className="opacity-0 transition-all duration-300 ease-out md:w-1/3"
              style={{ transform: "translateY(30px)" }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white text-left">FRAMEWORKS</h3>
            </div>
            <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8 md:w-2/3">
              {frameworks.map((tech, index) => (
                <div 
                  key={tech.name}
                  ref={el => { if (el) allItemsRef.current[languages.length + 2 + index] = el }}
                  className="flex items-center gap-3 md:gap-4 hover:scale-110 transition-all duration-300 ease-out opacity-0"
                  style={{ transform: "translateY(30px)" }}
                >
                  {tech.icon}
                  <span className="text-lg md:text-xl font-normal">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            <div
              ref={el => { if (el) allItemsRef.current[languages.length + frameworks.length + 2] = el }}
              className="opacity-0 transition-all duration-300 ease-out md:w-1/3"
              style={{ transform: "translateY(30px)" }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white text-left">TOOLS</h3>
            </div>
            <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8 md:w-2/3">
              {tools.map((tool, index) => (
                <div 
                  key={tool.name}
                  ref={el => { if (el) allItemsRef.current[languages.length + frameworks.length + 3 + index] = el }}
                  className="flex items-center gap-3 md:gap-4 hover:scale-110 transition-all duration-300 ease-out opacity-0"
                  style={{ transform: "translateY(30px)" }}
                >
                  {tool.icon}
                  <span className="text-lg md:text-xl font-normal">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
