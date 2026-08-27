"use client"

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/Section"

type ProjectItem = {
  slug: string
  title: string
  tags: string[]
  image: string
  blurb: string
  detail: string
  live?: boolean
  liveLabel?: string
}

const projects: ProjectItem[] = [
  {
    slug: "01",
    title: "SwimVolt",
    tags: ["Next.js", "TypeScript", "Python", "RTMPose", "Modal", "Postgres", "Stripe"],
    image: "/SwimVolt/swimvolt-hero.jpg",
    blurb: "Turns a ten-second phone clip into 45 biomechanical measurements of a racing start, and names the three worth fixing.",
    detail: "RTMPose on a Modal T4, deterministic scoring in TypeScript, and repeatability measured by filming every dive twice. Live with 100+ users.",
    live: true,
    liveLabel: "Live — swimvolt.com",
  },
  {
    slug: "02",
    title: "AI Job Hunting Agent",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Cheerio", "Claude", "GPT-4o"],
    image: "/AI-Job-Agent/AI-Job-Resume.png",
    blurb: "AI resume workflow that finds roles, tailors resumes, and tracks applications.",
    detail: "Node.js and Cheerio scraping pipeline with GPT-4o-driven tailoring, Postgres storage, and application tracking.",
    live: true,
  },
  {
    slug: "03",
    title: "Dating Profile Analyzer",
    tags: ["React", "TypeScript", "Node.js", "Firebase", "Gemini AI"],
    image: "/DatingProfile/dating-profile-home.png",
    blurb: "AI feedback engine for dating photos and bios.",
    detail: "Face-aware image scoring, bio analysis, and practical profile rewrites.",
  },
  {
    slug: "04",
    title: "TripPlanner",
    tags: ["TypeScript", "React", "Express.js", "Firebase"],
    image: "/TravelPlanner/travel-planner-home.png",
    blurb: "Route planning tool with privacy-aware export.",
    detail: "A* optimization, map overlays, and pseudonymized analytics.",
  },
  {
    slug: "05",
    title: "Vision Transformer Evaluation Framework",
    tags: ["Python", "PyTorch", "ViT", "CNNs", "Computer Vision"],
    image: "/DLFinal/DL%20Final%20Poster.png",
    blurb: "Benchmarking ViT and CNN models.",
    detail: "Poster-driven evaluation workflow for comparing ViT and CNN variants, metrics, and experimental findings.",
  },
]

export function Projects() {
  return (
    <Section id="projects" index="004 — Projects" title="Projects." subtitle="Selected work — open any project for a short case study.">
      <div className="border-t border-hairline">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  )
}

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const [hover, setHover] = useState(false)
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handlePreviewMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 14)
    rotateX.set(py * -14)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        resetTilt()
      }}
      className="group relative border-b border-hairline transition-colors hover:bg-surface/50"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} — case study`}
        className="grid w-full grid-cols-12 items-center gap-x-6 gap-y-3 px-2 py-8 text-left"
      >
        <div className="col-span-2 font-mono text-sm text-signal md:col-span-1">/{String(index + 1).padStart(2, "0")}</div>

        <div className="col-span-10 md:col-span-4">
          <div className="font-display text-2xl tracking-tight md:text-4xl">{project.title}</div>
          {project.live && (
            <div className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {project.liveLabel ?? "Live demo"}
            </div>
          )}
        </div>

        <div className="col-span-12 flex items-start gap-4 text-sm text-[color:color-mix(in_srgb,var(--foreground)_82%,transparent)] md:col-span-6">
          <span className="mt-2 inline-block h-0.5 w-6 shrink-0 bg-signal" />
          <span>
            {project.blurb}{" "}
            <span className="text-muted-foreground">{project.detail}</span>
          </span>
        </div>

        <div className="col-span-12 flex justify-end md:col-span-1">
          <span className="grid h-10 w-10 place-items-center border border-hairline-strong transition-colors group-hover:border-signal group-hover:text-signal">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted-foreground md:col-start-2 md:col-span-11">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className={`before:mr-2 before:text-muted-foreground before:content-['•'] ${tagIndex === 0 ? "before:content-['']" : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      <AnimatePresence>
        {hover && !reduceMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onMouseMove={handlePreviewMove}
            onMouseLeave={resetTilt}
            style={{ perspective: 800 }}
            aria-hidden="true"
            className="pointer-events-none absolute right-24 top-1/2 hidden h-40 w-64 -translate-y-1/2 overflow-hidden border border-hairline bg-surface xl:block"
          >
            <motion.img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={256}
              height={160}
              style={{ rotateX: springRotateX, rotateY: springRotateY }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
