"use client"

import { useEffect, useRef } from "react"
import { useAnimation, useStaggeredAnimation } from "@/hooks/use-animation"

export function Experience() {
  const sectionRef = useAnimation<HTMLElement>("animate-fade-in-up")
  const titleRef = useAnimation<HTMLHeadingElement>("animate-fade-in-right")
  const experiencesRef = useStaggeredAnimation<HTMLDivElement>("animate-slide-in-scale", { staggerDelay: 300 })

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-6 opacity-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-16 flex items-center gap-3">
          <span className="text-3xl animate-spin-slow">✻</span> EXPERIENCE
        </h2>

        <div className="space-y-12">
          {/* Mandy - Software Engineer */}
          <div className="border-l-4 border-[#3b82f6] pl-8 relative">
            <div className="absolute w-4 h-4 bg-[#3b82f6] rounded-full -left-2.5 top-0"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Mandy</h3>
                <p className="text-lg text-white/80">Software Engineer</p>
              </div>
              <div className="text-right text-white/60">
                <p>Remote</p>
                <p>June 2025 – August 2025</p>
              </div>
            </div>
            <div className="space-y-2 text-white/80">
              <p>• Built an AI tool that redesigns rooms from photos and suggests Amazon products, helping users explore 1,000+ unique decor items</p>
              <p>• Developed a full-stack app for 1,000+ image uploads and layout generation using Next.js, TypeScript, IMGBB, and Vercel</p>
              <p>• Built user account functionality with Clerk to track preferences and deliver tailored product recommendations and chatbot responses</p>
            </div>
          </div>

          {/* Waves Swim Team - Head Coach */}
          <div className="border-l-4 border-[#3b82f6] pl-8 relative">
            <div className="absolute w-4 h-4 bg-[#3b82f6] rounded-full -left-2.5 top-0"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Waves Swim Team</h3>
                <p className="text-lg text-white/80">Head Coach</p>
              </div>
              <div className="text-right text-white/60">
                <p>Charlotte, NC</p>
                <p>April 2025 – July 2025</p>
              </div>
            </div>
            <div className="space-y-2 text-white/80">
              <p>• Led and managed training for over 150 swimmers of all age levels, designing effective practice plans to maximize performance</p>
              <p>• Organized and coordinated 10+ swim meets, including lineup selections, race strategies, and on-deck coaching</p>
            </div>
          </div>

          {/* Techies Robotics - Co-founder & Mentor */}
          <div className="border-l-4 border-[#3b82f6] pl-8 relative">
            <div className="absolute w-4 h-4 bg-[#3b82f6] rounded-full -left-2.5 top-0"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Techies Robotics</h3>
                <p className="text-lg text-white/80">Co-founder & Mentor</p>
              </div>
              <div className="text-right text-white/60">
                <p>Charlotte, NC</p>
                <p>March 2021 – June 2024</p>
              </div>
            </div>
            <div className="space-y-2 text-white/80">
              <p>• Designed, developed, and maintained the organization's website to ensure a seamless user experience and updated content</p>
              <p>• Recruited and managed a network of over 150 volunteers annually, planned and organized 10 volunteer activities per year</p>
              <p>• Designed curriculum and led over 5 robotics summer camps, teaching over 200 people Spike Prime and block coding</p>
              <p>• Mentored youth robotics teams in programming, leading to four 1st place Robot Performance wins and international awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
