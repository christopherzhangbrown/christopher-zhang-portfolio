"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const projects = [
	{
		id: "01",
		title: "AI Swim Start Analyzer",
		tags: ["React", "OpenCV", "MediaPipe"],
		hasImage: true,
	},
	{
		id: "02",
		title: "Chris Swimzz Website",
		tags: ["HTML", "CSS", "TypeScript", "Supabase"],
		hasImage: true,
	},
	{
		id: "03",
		title: "Snake Game",
		tags: ["C", "Data Structures", "Game Logic"],
		hasImage: true,
	},
	{
		id: "04",
		title: "FTC Robot Programming",
		tags: ["Java", "OpenCV", "PID Control"],
		hasImage: true,
	},
]

export function Projects() {
	const sectionRef = useRef<HTMLElement>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [hoveredProject, setHoveredProject] = useState<string | null>(null)
	const router = useRouter()

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

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePosition({ x: window.innerWidth / 2, y: e.clientY })
	}

	const handleProjectClick = (projectId: string) => {
		router.push(`/projects/${projectId}`)
	}

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="py-20 px-6 bg-card/50 backdrop-blur-sm opacity-0"
		>
			<div className="max-w-5xl mx-auto">
				<h2 className="text-2xl font-semibold mb-16 flex items-center gap-3">
					<span className="text-3xl animate-spin-slow animate-glow">✻</span>{" "}
					SELECTED PROJECTS
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<div
							key={project.id}
							className="flex flex-col items-center w-full bg-[#18181b] rounded-2xl overflow-hidden shadow-xl transition-transform transition-shadow transition-colors duration-1000 hover:scale-105 hover:shadow-2xl hover:shadow-[#3b82f6]/40 cursor-pointer"
							style={{ minHeight: "320px" }}
							onClick={() => handleProjectClick(project.id)}
						>
							{/* Image section */}
							{project.id === "01" ? (
								<img
									src="/AIStart/AIStart.png"
									alt={project.title}
									className="object-cover w-full h-[192px] rounded-t-2xl"
								/>
							) : project.id === "02" ? (
								<img
									src="/ChrisSwimzz/HomePageChrisSwimzz.png"
									alt={project.title}
									className="object-cover w-full h-[192px] rounded-t-2xl"
								/>
							) : project.id === "03" ? (
								<img
									src="/SnakeGame/snakegamegameOver.png"
									alt={project.title}
									className="object-cover w-full h-[192px] rounded-t-2xl"
								/>
							) : project.id === "04" ? (
								<img
									src="/FTCRobotics/robotics.png"
									alt={project.title}
									className="object-cover w-full h-[192px] rounded-t-2xl"
								/>
							) : (
								<div className="bg-[#3b82f6]/20 flex items-center justify-center w-full h-[192px] rounded-t-2xl">
									<span className="text-[#3b82f6] text-4xl">💻</span>
								</div>
							)}
							{/* Text section */}
							<div className="w-full p-6 flex flex-col items-center">
								<div className="flex items-center gap-3 w-full justify-center">
									<h3 className="text-2xl font-bold text-[#3b82f6] mb-2 text-center">
										{project.title}
									</h3>
									<a
										href={`/projects/${project.id}`}
										target="_blank"
										rel="noopener noreferrer"
										className="!text-[#3b82f6] hover:!text-white transition-colors z-20 relative bg-white/10 p-1 rounded-sm"
										onClick={(e) => e.stopPropagation()}
										aria-label={`Open ${project.title} in new tab`}
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</a>
								</div>
								<p className="text-white/80 text-base leading-relaxed text-center mb-4">
									{project.id === "01" &&
										"AI-powered swimming start analysis tool using computer vision and MediaPipe for real-time performance optimization."}
									{project.id === "02" &&
										"Full-stack website with Supabase backend, featuring waitlist management and integrated email messaging system."}
									{project.id === "03" &&
										"Classic snake game implementation in C demonstrating efficient algorithms and dynamic memory management."}
									{project.id === "04" &&
										"Autonomous robot programming for FTC competition with computer vision, PID control, and sensor integration."}
								</p>
								<div className="flex flex-wrap gap-2 justify-center mb-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-xs rounded-full border border-[#3b82f6]/20"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
