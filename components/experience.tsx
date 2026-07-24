"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Section } from "@/components/Section"

type ExperienceItem = {
  company: string
  role: string
  location: string
  period: string
  href?: string
  bullets: string[]
  tags?: string[]
}
const experiences: ExperienceItem[] = [
  {
    company: "Scout Motors",
    role: "AI Engineering Intern",
    location: "Charlotte, NC",
    period: "Summer 2026",
    bullets: [
      "Role in progress. Details coming soon."
    ],
    tags: ["TBD"],
  },
  {
    company: "Mandy",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "Summer 2025",
    bullets: [
      "Built an AI tool that redesigns rooms from photos and suggests Amazon products, helping users explore 1,000+ unique decor items.",
      "Developed a full-stack app for 1,000+ image uploads and layout generation using Next.js, TypeScript, IMGBB, and Vercel.",
      "Built user account functionality with Clerk to track preferences and deliver tailored product recommendations and chatbot responses.",
    ],
    tags: ["TypeScript", "Next.js / React", "OpenAI", "Supabase"],
  },
]

export function Experience() {
  const [hoveredTag, setHoveredTag] = useState<{ item: number; tag: number } | null>(null)

  return (
    <Section id="experience" index="003 — Experience" title="Work experience." subtitle="Selected roles and projects where I shipped product or led teams.">
      <div className="divide-y divide-hairline border-y border-hairline">
        {experiences.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group grid grid-cols-12 gap-6 py-10 transition-colors hover:bg-surface/50"
          >
            <div className="col-span-12 md:col-span-2 font-mono text-sm text-muted-foreground">
              <div className="text-signal">/{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-4">{item.period}</div>
              <div className="mt-2 text-foreground">{item.location}</div>
            </div>

            <div className="col-span-12 md:col-span-8">
              <h3 className="font-display text-2xl md:text-3xl">
                {item.company}
              </h3>

              <ul className="mt-6 space-y-4 text-[color:color-mix(in_srgb,var(--foreground)_82%,white)]">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-4">
                    <span className="mt-1 inline-block h-0.5 w-6 bg-signal" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {item.tags && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-muted-foreground">
                  {item.tags.map((t, tagIndex) => (
                    <span
                      key={t}
                      onMouseEnter={() => setHoveredTag({ item: i, tag: tagIndex })}
                      onMouseLeave={() => setHoveredTag(null)}
                      className={`group cursor-default transition-colors before:mr-2 before:text-muted-foreground before:transition-colors hover:text-[#d7b04c] hover:before:text-[#d7b04c] before:content-['•'] ${tagIndex === 0 ? "before:content-['']" : ""} ${hoveredTag?.item === i && hoveredTag.tag === tagIndex ? "text-[#d7b04c]" : ""}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-12 md:col-span-2 text-right font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <div>{item.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
