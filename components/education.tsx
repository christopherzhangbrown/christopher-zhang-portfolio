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
        <div className="space-y-12">
          {/* Brown University */}
          <div className="border-l-4 border-[#3b82f6] pl-8 relative">
            <div className="absolute w-4 h-4 bg-[#3b82f6] rounded-full -left-2.5 top-0"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Brown University</h3>
                <p className="text-lg text-white/80">Business Economics & Sc.B. Computer Science</p>
              </div>
              <div className="text-right text-white/60">
                <p>Providence, RI</p>
                <p>Expected Graduation May 2028</p>
              </div>
            </div>
            <div className="space-y-2 text-white/80">
              <p><span className="font-semibold">GPA:</span> 4.00/4.00</p>
              <p><span className="font-semibold">Varsity Student-Athlete</span> - NCAA Division 1 Swimming</p>
              <p><span className="font-semibold">Relevant Coursework:</span> Computing Foundations, Computer Systems, Program Design with Data Structures and Algorithms</p>
            </div>
          </div>

          {/* Ardrey Kell High School */}
          <div className="border-l-4 border-[#3b82f6] pl-8 relative">
            <div className="absolute w-4 h-4 bg-[#3b82f6] rounded-full -left-2.5 top-0"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Ardrey Kell High School</h3>
              </div>
              <div className="text-right text-white/60">
                <p>Charlotte, NC</p>
                <p>Graduated June 2024</p>
              </div>
            </div>
            <div className="space-y-2 text-white/80">
              <p><span className="font-semibold">GPA:</span> 4.00/4.00</p>
              <p><span className="font-semibold">Relevant Coursework:</span> AP Computer Science Principles and A, AP Calculus BC, AP Statistics, AP Physics 1</p>
              <p><span className="font-semibold">Awards and Honors:</span> FTC Dean's List Finalist, 3x President's Volunteer Service Award (Gold), Varsity Swim Captain, NTHS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
