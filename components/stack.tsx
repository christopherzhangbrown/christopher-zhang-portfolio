"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import type { ComponentType, CSSProperties } from "react"
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
  SiVercel,
  SiKubernetes,
} from "react-icons/si"

type Tech = { name: string; Icon: ComponentType<{ className?: string; style?: CSSProperties }>; color: string; bg: string }

const groups: { title: string; items: Tech[] }[] = [
  {
    title: "Programming & Markup Languages",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB", bg: "rgba(55,118,171,0.12)" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", bg: "rgba(247,223,30,0.12)" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", bg: "rgba(49,120,198,0.12)" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26", bg: "rgba(227,79,38,0.12)" },
      { name: "CSS", Icon: SiCss3, color: "#1572B6", bg: "rgba(21,114,182,0.12)" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB", bg: "rgba(97,218,251,0.12)" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933", bg: "rgba(51,153,51,0.12)" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", bg: "rgba(255,255,255,0.08)" },
    ],
  },
  {
    title: "Databases & Storage",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", bg: "rgba(65,105,225,0.12)" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248", bg: "rgba(71,162,72,0.12)" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D", bg: "rgba(220,56,45,0.12)" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032", bg: "rgba(240,80,50,0.12)" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED", bg: "rgba(36,150,237,0.12)" },
      { name: "AWS", Icon: SiAmazonwebservices, color: "#FF9900", bg: "rgba(255,153,0,0.12)" },
      { name: "Vercel", Icon: SiVercel, color: "#FFFFFF", bg: "rgba(255,255,255,0.08)" },
      { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5", bg: "rgba(50,108,229,0.12)" },
    ],
  },
]

export function Stack() {
  return (
    <Section
      id="stack"
      index="005 — Stack"
      title="Engineering stack."
      subtitle="The tools and languages I reach for across the systems I ship."
    >
      <div className="space-y-px bg-hairline">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: gi * 0.06 }}
            className="grid grid-cols-12 gap-6 bg-background px-2 py-8"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="label">/{String(gi + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-display text-xl tracking-tight md:text-2xl">{g.title}</h3>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]">
                {g.items.map((t) => (
                  <div key={t.name} className="group flex min-h-20 items-center gap-3 rounded-xl border border-hairline bg-background p-4 transition-colors hover:bg-surface">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline" style={{ backgroundColor: t.bg }}>
                      <t.Icon className="h-5 w-5" style={{ color: t.color }} />
                    </span>
                    <span className="font-mono text-sm leading-tight">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
