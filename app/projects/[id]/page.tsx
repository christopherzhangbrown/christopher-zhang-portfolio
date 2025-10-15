"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { use } from "react"

const projectData = {
  "01": {
    title: "AI Swim Start Analyzer",
    year: "2024",
    techAndTechnique: "React, OpenCV, MediaPipe, Python, Computer Vision",
    description: "AI-powered swimming start analysis tool",
    keyFeatures: [
      "Real-time video analysis of swimming starts using MediaPipe pose detection",
      "Automated timing and angle measurements for start optimization", 
      "Clean, modern interface built with React for coaches and athletes",
      "Computer vision algorithms to track body positioning and movement",
      "Performance metrics visualization with detailed analytics",
      "Export functionality for training data and progress tracking"
    ]
  },
  "02": {
    title: "Chris Swimzz Website",
    year: "2023",
    techAndTechnique: "HTML, CSS, TypeScript, Supabase, Web Development",
    description: "Personal swimming coaching and training website",
    keyFeatures: [
      "Responsive web design for optimal viewing on all devices",
      "Interactive training programs and workout schedules",
      "User authentication and profile management with Supabase",
      "Real-time progress tracking and performance analytics",
      "Modern TypeScript implementation for type safety and maintainability",
      "Content management system for coaching resources and articles"
    ]
  },
  "03": {
    title: "Snake Game",
    year: "2023", 
    techAndTechnique: "C, Data Structures, Game Development, Algorithms",
    description: "Classic snake game implementation in C",
    keyFeatures: [
      "Efficient game loop implementation using C programming language",
      "Dynamic memory management for growing snake body segments",
      "Collision detection algorithms for walls and self-collision",
      "Score tracking and high score persistence",
      "Optimized rendering system for smooth gameplay experience",
      "Clean code architecture demonstrating fundamental programming concepts"
    ]
  },
  "04": {
    title: "FTC Robot Programming",
    year: "2022",
    techAndTechnique: "Java, OpenCV, PID Control, Robotics, Computer Vision",
    description: "Autonomous robot programming for FIRST Tech Challenge",
    keyFeatures: [
      "Autonomous navigation using computer vision and sensor fusion",
      "PID control systems for precise motor control and positioning",
      "Real-time object detection and tracking with OpenCV integration",
      "Robust error handling and fail-safe mechanisms for competition",
      "Modular code architecture for easy debugging and improvements",
      "Telemetry system for real-time robot diagnostics and monitoring"
    ]
  }
}

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const project = projectData[resolvedParams.id as keyof typeof projectData]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 py-12 max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.push('/#projects')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Project header */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-6xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-4">
              <ExternalLink size={20} className="text-white/40" />
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className="space-y-12">
          {/* Year */}
          <div>
            <h3 className="text-white/60 mb-2">Year</h3>
            <p className="text-xl">{project.year}</p>
          </div>

          {/* Tech & Technique */}
          <div>
            <h3 className="text-white/60 mb-4">Tech & Technique</h3>
            <p className="text-lg leading-relaxed">{project.techAndTechnique}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-white/60 mb-4">Description</h3>
            <p className="text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-white/60 mb-6">Key Features:</h3>
            <ul className="space-y-4">
              {project.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-white/40 mt-2">•</span>
                  <span className="text-lg leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
