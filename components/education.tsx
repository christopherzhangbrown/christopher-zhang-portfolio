"use client"

import { useEffect, useRef } from "react"

export function Education() {
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
    <section ref={sectionRef} className="py-20 px-6 bg-card/50 backdrop-blur-sm opacity-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-16 flex items-center gap-3">
          <span className="text-3xl animate-spin-slow">✻</span> EDUCATION
        </h2>
        {/* Brown University - Simple Card */}
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover:bg-card/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#3b82f6]/10 transition-all duration-300 group cursor-pointer">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div className="mb-2 lg:mb-0">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#3b82f6] transition-colors">Brown University</h3>
              <p className="text-lg text-[#3b82f6] font-medium">Sc.B. Computer Science and A.B. Business Economics</p>
            </div>
            <div className="text-right text-white/60">
              <p className="font-medium">Providence, RI</p>
              <p className="text-sm">Expected Graduation May 2028</p>
            </div>
          </div>
          <div className="space-y-3 text-white/80 leading-relaxed">
            <p><span className="font-semibold">GPA:</span> 4.00/4.00</p>
            <p><span className="font-semibold">Varsity Student-Athlete</span> - NCAA Division 1 Swimming</p>
            
            <div>
              <p className="font-semibold text-[#3b82f6] mb-1">Relevant Coursework:</p>
              <ul className="text-sm space-y-1 ml-2">
                <li>• Software Engineering</li>
                <li>• Fundamentals of Computer Systems</li>
                <li>• Program Design with Data Structures and Algorithms</li>
                <li>• Discrete Structures and Probability</li>
                <li>• Computing Foundations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
