"use client"

import { motion } from "framer-motion"
import type { ComponentType, CSSProperties } from "react"
import { Section } from "@/components/Section"
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
  SiArgo,
  SiKubernetes,
  SiMediapipe,
  SiN8N,
} from "react-icons/si"

type Tech = {
  name: string
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>
  color: string
  bg: string
  detail?: string
}

function PlaywrightIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 5.5 16 9l1.8 3L16 15 7.5 18.5 6 12l1.5-6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 8.5h4.2L15.5 12l-1.3 3.5H10L8.8 12 10 8.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.8" />
    </svg>
  )
}

function KargoIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 7h12v10H6z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 7V5h6v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const groups: { title: string; items: Tech[] }[] = [
  {
    title: "Programming Languages",
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
      { name: "Playwright", Icon: PlaywrightIcon, color: "#2EAD33", bg: "rgba(46,173,51,0.12)" },
      { name: "MediaPipe", Icon: SiMediapipe, color: "#FF8C42", bg: "rgba(255,140,66,0.12)" },
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
      { name: "AWS", detail: "EKS, Lambda, Bedrock, EC2", Icon: SiAmazonwebservices, color: "#FF9900", bg: "rgba(255,153,0,0.12)" },
      { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5", bg: "rgba(50,108,229,0.12)" },
      { name: "Argo CD", Icon: SiArgo, color: "#E64A19", bg: "rgba(230,74,25,0.12)" },
      { name: "Kargo", Icon: KargoIcon, color: "#1F6FEB", bg: "rgba(31,111,235,0.12)" },
      { name: "n8n", Icon: SiN8N, color: "#EA4B71", bg: "rgba(234,75,113,0.12)" },
    ],
  },
]

export function Stack() {
  return (
    <Section
      id="stack"
      index="002 — Skills"
      title="Skills."
      subtitle="Programming languages, frameworks, data stores, and delivery tooling I use to build and ship."
    >
      <div>
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: gi * 0.06 }}
            className="grid grid-cols-12 gap-6 border-b border-hairline px-2 py-8"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="label">/{String(gi + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-display text-xl tracking-tight md:text-2xl">{g.title}</h3>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-9 gap-y-7">
              {g.items.map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 4, filter: "brightness(1.15)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2.5"
                >
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-hairline"
                    style={{ backgroundColor: t.bg }}
                  >
                    <t.Icon className="h-4 w-4" style={{ color: t.color }} />
                  </span>
                  <div className="min-w-0" style={{ color: t.color }}>
                    <div className="font-mono text-sm text-foreground">{t.name}</div>
                    {t.detail && <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{t.detail}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
