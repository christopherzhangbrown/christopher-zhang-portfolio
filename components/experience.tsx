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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3b82f6] via-[#3b82f6]/60 to-transparent"></div>
          
          <div className="space-y-16">
            {/* Mandy - Software Engineer */}
            <div className="relative flex items-start gap-8">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-8 h-8 bg-[#3b82f6] rounded-full border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover:bg-card/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="mb-2 lg:mb-0">
                    <h3 className="text-2xl font-bold text-white mb-1">Mandy</h3>
                    <p className="text-lg text-[#3b82f6] font-medium">Software Engineer</p>
                  </div>
                  <div className="text-right text-white/60">
                    <p className="font-medium">Remote</p>
                    <p className="text-sm">June 2025 – August 2025</p>
                  </div>
                </div>
                <div className="space-y-2 text-white/80 leading-relaxed">
                  <p>• Built an AI tool that redesigns rooms from photos and suggests Amazon products, helping users explore 1,000+ unique decor items</p>
                  <p>• Developed a full-stack app for 1,000+ image uploads and layout generation using Next.js, TypeScript, IMGBB, and Vercel</p>
                  <p>• Built user account functionality with Clerk to track preferences and deliver tailored product recommendations and chatbot responses</p>
                </div>
              </div>
            </div>

            {/* Waves Swim Team - Head Coach */}
            <div className="relative flex items-start gap-8">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-8 h-8 bg-[#3b82f6] rounded-full border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover:bg-card/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="mb-2 lg:mb-0">
                    <h3 className="text-2xl font-bold text-white mb-1">Waves Swim Team</h3>
                    <p className="text-lg text-[#3b82f6] font-medium">Head Coach</p>
                  </div>
                  <div className="text-right text-white/60">
                    <p className="font-medium">Charlotte, NC</p>
                    <p className="text-sm">April 2025 – July 2025</p>
                  </div>
                </div>
                <div className="space-y-2 text-white/80 leading-relaxed">
                  <p>• Led and managed training for over 150 swimmers of all age levels, designing effective practice plans to maximize performance</p>
                  <p>• Organized and coordinated 10+ swim meets, including lineup selections, race strategies, and on-deck coaching</p>
                </div>
              </div>
            </div>

            {/* Techies Robotics - Co-founder & Mentor */}
            <div className="relative flex items-start gap-8">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-8 h-8 bg-[#3b82f6] rounded-full border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover:bg-card/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="mb-2 lg:mb-0">
                    <h3 className="text-2xl font-bold text-white mb-1">Techies Robotics</h3>
                    <p className="text-lg text-[#3b82f6] font-medium">Co-founder & Mentor</p>
                  </div>
                  <div className="text-right text-white/60">
                    <p className="font-medium">Charlotte, NC</p>
                    <p className="text-sm">March 2021 – June 2024</p>
                  </div>
                </div>
                <div className="space-y-2 text-white/80 leading-relaxed">
                  <p>• Designed, developed, and maintained the organization's website to ensure a seamless user experience and updated content</p>
                  <p>• Recruited and managed a network of over 150 volunteers annually, planned and organized 10 volunteer activities per year</p>
                  <p>• Designed curriculum and led over 5 robotics summer camps, teaching over 200 people Spike Prime and block coding</p>
                  <p>• Mentored youth robotics teams in programming, leading to four 1st place Robot Performance wins and international awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
