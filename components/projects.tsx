"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Section } from "@/components/Section"

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
    id: "07",
    title: "Vision Transformer Evaluation Framework",
    tags: ["Python", "PyTorch", "ViT", "CNNs", "Computer Vision"],
    image: "/DLFinal/DL%20Final%20Poster.png",
    blurb: "Benchmarking ViT and CNN models.",
    detail: "Poster-driven evaluation workflow for comparing ViT and CNN variants, metrics, and experimental findings.",
  },
]

export function Projects() {
  return (
    <Section id="projects" index="004 — Projects" title="Projects." subtitle="Selected work — click any project to open a short case study.">
      <div>
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </Section>
  )
}

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const [hover, setHover] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<number | null>(null)
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push(`/projects/${project.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative grid w-full grid-cols-12 items-center gap-6 border-b border-hairline bg-transparent px-2 py-8 text-left transition-colors hover:bg-foreground/[0.04]"
    >
      <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">/{String(index + 1).padStart(2, "0")}</div>
      <div className="col-span-10 md:col-span-4">
        <div className="font-display text-2xl tracking-tight md:text-4xl">{project.title}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              onMouseEnter={() => setHoveredTag(tagIndex)}
              onMouseLeave={() => setHoveredTag(null)}
              className={`cursor-default border px-3 py-1 text-xs font-mono transition-colors ${hoveredTag === tagIndex ? "border-signal text-foreground" : "border-hairline text-muted-foreground"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden md:block md:col-span-3 text-sm text-muted-foreground">{project.blurb}</div>
      <div className="hidden md:block md:col-span-3 font-mono text-xs text-muted-foreground">{project.tags.slice(0, 4).join(" / ")}</div>
      <div className="col-span-12 md:col-span-1 flex justify-end">
        <span className="grid h-10 w-10 place-items-center border border-hairline group-hover:border-signal group-hover:text-signal transition-colors">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {hover && (
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="pointer-events-none absolute right-20 top-1/2 hidden h-40 w-64 -translate-y-1/2 overflow-hidden border border-hairline lg:block">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </motion.div>
      )}
    </motion.button>
  )
}

// Modal removed: project rows navigate to their case-study pages
