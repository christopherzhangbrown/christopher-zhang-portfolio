"use client"

import { useEffect, useRef } from "react"

export function Hero() {
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
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 opacity-0">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Profile Picture */}
          <div className="flex justify-center lg:order-2">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl hover:scale-105 transition-transform duration-500">
              CZ
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
              <span className="text-white">CHRISTOPHER</span>
              <br />
              <span className="text-[#3b82f6]">ZHANG</span>
            </h1>

            <div className="space-y-4 max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed">
                Hi! I'm <span className="font-semibold">Christopher Zhang</span>, a{" "}
                <span className="font-semibold">Brown University student</span> studying computer science and economics, and aspiring software engineer with a passion for
                building innovative, scalable, and user-friendly web solutions.
              </p>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300 font-medium"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
