"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowUpRight, X } from "lucide-react"

type ProjectItem = {
  id: string
  title: string
  tags: string[]
  image: string
  blurb: string
  detail: string
}

const projects: ProjectItem[] = [
  {
    id: "06",
    title: "Dating Profile Analyzer",
    tags: ["React", "TypeScript", "Node.js", "Firebase", "Gemini AI"],
    image: "/DatingProfile/dating-profile-home.png",
    blurb: "AI feedback engine for dating photos and bios.",
    detail: "Face-aware image scoring, bio analysis, and practical profile rewrites.",
  },
  {
    id: "05",
    title: "TripPlanner",
    tags: ["TypeScript", "React", "Express.js", "Firebase"],
    image: "/TravelPlanner/travel-planner-home.png",
    blurb: "Route planning tool with privacy-aware export.",
    detail: "A* optimization, map overlays, and pseudonymized analytics.",
  },
  {
    id: "01",
    title: "AI Swim Start Analyzer",
    tags: ["React", "OpenCV", "MediaPipe"],
    image: "/AIStart/AIStart.png",
    blurb: "Computer vision assistant for start mechanics.",
    detail: "Video-based posture, angle, and timing feedback for training sessions.",
  },
  {
    id: "03",
    title: "Snake Game",
    tags: ["C", "Data Structures", "Game Logic"],
    image: "/SnakeGame/snakegamegameover.png",
    blurb: "Classic arcade logic rebuilt in C.",
    detail: "Optimized movement updates, collision checks, and memory handling.",
  },
  {
    id: "04",
    title: "FTC Robot Programming",
    tags: ["Java", "OpenCV", "PID Control"],
    image: "/FTCRobotics/robotics.png",
    blurb: "Autonomous robotics stack for FTC competitions.",
    detail: "Vision-guided control loops and reliable hardware orchestration.",
  },
]

export function Projects() {
  const router = useRouter()
  const [open, setOpen] = useState<ProjectItem | null>(null)

  return (
    <section id="projects" className="relative border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="label">// 004 — Projects</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-5xl tracking-tighter md:text-7xl">Projects.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">Selected work — click any project to open a short case study.</p>
          </div>
        </div>

        <div className="space-y-px bg-hairline">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>

        <AnimatePresence>
          {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

function ProjectRow({ project, index, onOpen }: { project: ProjectItem; index: number; onOpen: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.button
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative grid w-full grid-cols-12 items-center gap-6 bg-background px-2 py-8 text-left transition-colors hover:bg-surface"
    >
      <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">/{String(index + 1).padStart(2, "0")}</div>
      <div className="col-span-10 md:col-span-4">
        <div className="font-display text-2xl tracking-tight md:text-4xl">{project.title}</div>
        <div className="label mt-2">{project.tags.join(" · ")}</div>
      </div>
      <div className="hidden md:block md:col-span-3 text-sm text-muted-foreground">{project.blurb}</div>
      <div className="hidden md:block md:col-span-3 font-mono text-xs text-muted-foreground">{project.tags.slice(0, 4).join(" / ")}</div>
      <div className="col-span-12 md:col-span-1 flex justify-end">
        <span className="grid h-10 w-10 place-items-center border border-hairline group-hover:border-signal group-hover:text-signal transition-colors">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <AnimatePresence>
        {hover && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="pointer-events-none absolute right-20 top-1/2 hidden h-40 w-64 -translate-y-1/2 overflow-hidden border border-hairline lg:block">
            <img src={project.image} alt="" className="h-full w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 overflow-y-auto bg-background/80 backdrop-blur-md">
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()} className="mx-auto my-12 max-w-5xl border border-hairline bg-background">
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4 md:px-10">
          <div className="font-mono text-xs tracking-widest text-muted-foreground">CASE_STUDY / {project.id.toUpperCase()}</div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center border border-hairline hover:border-signal hover:text-signal transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="aspect-[16/9] overflow-hidden border-b border-hairline">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="px-6 py-10 md:px-10 md:py-14">
          <div className="label mb-3">{project.tags.join(" · ")}</div>
          <h3 className="font-display text-4xl tracking-tighter md:text-6xl">{project.title}</h3>

          <div className="mt-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3 label">Problem</div>
            <p className="col-span-12 md:col-span-9 leading-relaxed text-muted-foreground">{project.blurb}</p>
          </div>

          <div className="mt-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3 label">Details</div>
            <div className="col-span-12 md:col-span-9 leading-relaxed text-muted-foreground">{project.detail}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
