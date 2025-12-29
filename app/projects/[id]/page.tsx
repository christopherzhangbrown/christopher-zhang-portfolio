"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { use, useEffect, useMemo, useRef, useState } from "react"

type ProjectData = {
  title: string
  year: string
  url?: string
  techAndTechnique: string
  description: string
  keyFeatures: string[]
}

const projectData: Record<string, ProjectData> = {
  "01": {
    title: "AI Swim Start Analyzer",
    year: "2025",
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
    year: "2024-2025",
    url: "https://www.chrisswimzz.com/",
    techAndTechnique: "HTML, CSS, TypeScript, Supabase, Web Development",
    description: "Full-stack personal brand website built with modern web technologies, featuring a Supabase-powered waitlist system and integrated messaging functionality that routes directly to email for seamless community engagement",
    keyFeatures: [
      "Supabase backend integration for real-time waitlist management and user data storage",
      "Custom messaging system with email integration for direct community communication",
      "Modern TypeScript implementation ensuring type safety and code maintainability",
      "Responsive web design optimized for cross-device compatibility and performance",
      "Database-driven content management for dynamic updates and scalability",
      "Full-stack architecture supporting both frontend interactions and backend processing"
    ]
  },
  "03": {
    title: "Snake Game",
    year: "2025", 
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
    year: "2020-2024",
    techAndTechnique: "Java, OpenCV, PID Control, Robotics, Computer Vision",
    description: "Autonomous robot programming for FIRST Tech Challenge",
    keyFeatures: [
      "Autonomous navigation using computer vision and sensor fusion",
      "PID control systems for precise motor control and positioning",
      "Odometry-based localization for accurate position estimation",
      "Real-time object detection and tracking with OpenCV integration",
      "Robust error handling and fail-safe mechanisms for competition",
      "Modular code architecture for easy debugging and improvements",
      "Telemetry system for real-time robot diagnostics and monitoring"
    ]
  },
  "05": {
    title: "TripPlanner",
    year: "2025",
    techAndTechnique: "TypeScript, React, Express.js, Node.js, Firebase Firestore, Mapbox GL, Vitest, A* Algorithm",
    description: "Full-stack travel planning application featuring privacy-preserving data export, real-time route optimization, and interactive map visualization. Built with TypeScript and React frontend, Express.js backend, and Firebase Firestore database.",
    keyFeatures: [
      "A* pathfinding algorithm implementation for multi-stop route optimization covering 250+ miles with real-time graph construction and tile-based caching",
      "Privacy-safe data export system with SHA-256 pseudonymization, consent gating via Firebase, spatial/temporal generalization, and comprehensive audit logging",
      "Interactive Mapbox visualization with activity filtering, real-time route rendering, and dynamic map controls for enhanced user experience",
      "Integrated multiple REST APIs: NOAA weather data, FBI crime statistics, and ACS census demographics with custom proxy handlers",
      "Voronoi diagram generation for weather mapping and polygon-based spatial analysis across trip routes",
      "Firebase authentication and Firestore integration for secure user data management and real-time synchronization",
      "Comprehensive testing suite using Vitest for unit tests and property-based testing to ensure data privacy compliance",
      "Responsive web design with optimized performance for both desktop and mobile devices"
    ]
  }
}

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const project = projectData[resolvedParams.id as keyof typeof projectData]

  // Generate random dot positions only on the client
  const [dots, setDots] = useState<Array<{ left: string; top: string; animationDelay: string; animationDuration: string }>>([])
  useEffect(() => {
    setDots(
      Array.from({ length: 50 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }))
    )
  }, [])

  // Ref for each image
  const imageRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)]

  // Parallax effect: use requestAnimationFrame for smooth scroll
  useEffect(() => {
    if (resolvedParams.id !== "02" && resolvedParams.id !== "05") return;
    let running = true;
    function animate() {
      if (!running) return;
      for (let idx = 1; idx < imageRefs.length; idx++) {
        const imgRef = imageRefs[idx].current;
        if (!imgRef) continue;
        const container = imgRef.parentElement;
        if (!container) continue;
        const containerHeight = container.offsetHeight;
        const imageHeight = containerHeight * 1.1;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate progress: 0 when image enters, 1 when leaves
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        const eased = Math.pow(progress, 1.7);
        // Clamp translateY so image never leaves its container
        const maxTranslateY = imageHeight - containerHeight;
        const translateY = Math.max(0, Math.min(maxTranslateY, maxTranslateY * eased));
        imgRef.style.transform = `translateY(-${translateY}px)`;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => { running = false; };
  }, [resolvedParams.id, imageRefs])

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.animationDelay,
                animationDuration: dot.animationDuration,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
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
              {project.url ? (
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-[#3b82f6] transition-colors"
                >
                  <ExternalLink size={20} />
                  <span className="text-sm">Visit Site</span>
                </a>
              ) : (
                <ExternalLink size={20} className="text-white/40" />
              )}
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
          {/* Chris Swimzz Images Gallery */}
          {resolvedParams.id === "02" && (
            <div className="mt-16">
              <div className="flex flex-col items-center">
                {["HomePageChrisSwimzz.png", "AIStartAnalyzerChrisSwimzz.png", "ContactPageChrisSwimzz.png"].map((img, idx) => (
                  <div
                    key={img}
                    className={`w-full max-w-6xl aspect-[16/10] overflow-hidden bg-black shadow-lg${idx !== 0 ? ' mt-6' : ''}`}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={`/ChrisSwimzz/${img}`}
                      alt={`Chris Swimzz screenshot ${idx + 1}`}
                      className="object-cover w-full"
                      style={{
                        height: "110%",
                        position: "relative",
                        top: 0,
                        left: 0,
                      }}
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/1280x560?text=Image+Not+Found'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* AI Swim Start Analyzer Images Gallery */}
          {resolvedParams.id === "01" && (
            <div className="mt-16">
              <div className="flex flex-col items-center">
                {["AIStart.png", "AIStartFeedback.png"].map((img, idx) => (
                  <div
                    key={img}
                    className={`w-full max-w-6xl aspect-[16/10] overflow-hidden bg-black shadow-lg${idx !== 0 ? ' mt-6' : ''}`}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={`/AIStart/${img}`}
                      alt={`AI Swim Start Analyzer screenshot ${idx + 1}`}
                      className="object-cover w-full"
                      style={{
                        height: "110%",
                        position: "relative",
                        top: 0,
                        left: 0,
                      }}
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/1280x560?text=Image+Not+Found'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Snake Game Video Only Gallery */}
          {resolvedParams.id === "03" && (
            <div className="mt-16">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-3xl overflow-hidden bg-black shadow-lg" style={{ position: "relative" }}>
                  <video controls width="100%" style={{ display: "block", objectFit: "contain" }}>
                    <source src="/SnakeGame/snakegamedemo.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}
          {/* FTC Robotics Videos Gallery */}
          {resolvedParams.id === "04" && (
            <div className="mt-16">
              <div className="flex flex-col items-center">
                {["nrzZ7f0O4-w", "JZznWXfDy58"].map((videoId, idx) => (
                  <div
                    key={videoId}
                    className={`w-full max-w-6xl aspect-[16/10] overflow-hidden bg-black shadow-lg${idx !== 0 ? ' mt-6' : ''}`}
                    style={{ position: "relative" }}
                  >
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`FTC Robotics video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ display: 'block', width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* TripPlanner Gallery */}
          {resolvedParams.id === "05" && (
            <div className="mt-16">
              <div className="flex flex-col items-center">
                {["travel-planner-home.png", "travel-planner-map-routes.png", "saved-trips.png"].map((img, idx) => (
                  <div
                    key={img}
                    className={`w-full max-w-6xl bg-black shadow-lg rounded-lg overflow-hidden${idx !== 0 ? ' mt-6' : ''}`}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={`/TravelPlanner/${img}`}
                      alt={`TripPlanner screenshot ${idx + 1}`}
                      className="object-contain w-full"
                      style={{
                        maxHeight: "600px",
                        display: "block",
                        margin: "0 auto",
                      }}
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/1280x560?text=Image+Not+Found'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
