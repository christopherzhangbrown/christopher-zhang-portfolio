"use client"

import { motion } from "framer-motion"
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
    slug: "06",
    title: "DiveVolt",
    tags: ["Next.js", "TypeScript", "Capacitor", "Swift", "Python", "RTMPose", "Modal", "Postgres"],
    image: "/DiveVolt/divevolt-compare.jpg",
    blurb: "Diving coaches film every practice, but the clips pile up on an iPad with no names on them and rarely get watched again.",
    detail: "DiveVolt shows each dive on the pool TV seconds after it happens, then saves it to that diver's folder so they can actually go back and watch it. Brown's diving team is piloting it.",
    live: true,
    liveLabel: "Live at divevolt.com",
  },
  {
    slug: "01",
    title: "SwimVolt",
    tags: ["Next.js", "TypeScript", "Python", "RTMPose", "Modal", "Postgres", "Stripe"],
    image: "/SwimVolt/swimvolt-hero.jpg",
    blurb: "You can't see your own racing start, and a coach watching a whole lane can't catch everything either.",
    detail: "SwimVolt takes a ten-second phone video of your start and tells you the three things to fix first. It has 200+ users.",
    live: true,
    liveLabel: "Live at swimvolt.com",
  },
  {
    slug: "02",
    title: "AI Job Hunting Agent",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Cheerio", "Claude"],
    image: "/AI-Job-Agent/AI-Job-Home.png",
    blurb: "Watches 110+ company career pages every 15 minutes and emails ranked alerts when a matching role opens.",
    detail: "Claude suggests job-specific resume edits that only apply once I approve them. I have used it across 150+ applications.",
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
    <Section id="projects" title="Projects." subtitle="Open any project for the full case study.">
      <div className="border-t border-hairline">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  )
}

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 2) * 0.06 }}
      className="group border-b border-hairline"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="grid w-full grid-cols-12 gap-x-6 gap-y-5 py-8 text-left md:py-10"
      >
        <div className="col-span-12 overflow-hidden border border-hairline bg-surface md:col-span-5">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            width={640}
            height={400}
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>

        <div className="col-span-12 flex flex-col md:col-span-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl tracking-tight transition-colors group-hover:text-signal md:text-4xl">
                {project.title}
              </h3>
              {project.live && (
                <div className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  {project.liveLabel ?? "Live demo"}
                </div>
              )}
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-hairline-strong transition-colors group-hover:border-signal group-hover:text-signal">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <p className="mt-5 max-w-[62ch] text-[color:color-mix(in_srgb,var(--foreground)_82%,transparent)]">
            {project.blurb} <span className="text-muted-foreground">{project.detail}</span>
          </p>

          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 font-mono text-sm text-muted-foreground">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className={`before:mr-2 before:text-muted-foreground before:content-['•'] ${tagIndex === 0 ? "before:content-['']" : ""}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
