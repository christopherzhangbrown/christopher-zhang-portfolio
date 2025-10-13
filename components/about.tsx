"use client"

import { useEffect, useRef } from "react"

export function About() {
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
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center justify-center px-6 py-20 opacity-0">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">This is me.</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                I'm <span className="font-semibold">Christopher Zhang</span>
                <br />
                Aspiring software engineer with a passion for clean code, innovative problem-solving, and building
                applications that make a real difference in people's lives.
              </p>

              <p>
                A 19 year old Brown University student studying computer science, originally from Charlotte, NC but currently
                based in Providence, RI. Dedicated to mastering both frontend and backend technologies while exploring
                the intersection of technology and human experience.
              </p>

              <p>
                My approach combines academic rigor with hands-on experimentation. I believe in writing code that's not
                just functional, but elegant and maintainable. Whether it's optimizing algorithms or crafting intuitive
                user interfaces, I strive to create solutions that are both technically sound and genuinely useful.
              </p>

              <p className="italic text-muted-foreground">currently debugging my sleep schedule and my code simultaneously</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-muted rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-500">
              <span className="text-muted-foreground text-sm">Profile Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
