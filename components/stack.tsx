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
      index="002 — Stack"
      title="Skills."
      subtitle="Programming languages, frameworks, data stores, and delivery tooling I use to build and ship."
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
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative overflow-hidden rounded-xl border border-hairline bg-background p-4 shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 hover:bg-surface hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle at top left, ${t.bg}, transparent 70%)` }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex min-h-20 items-center gap-3">
                      <motion.span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-background/90"
                        style={{ backgroundColor: t.bg }}
                        whileHover={{ rotate: -6, scale: 1.08 }}
                        transition={{ duration: 0.25 }}
                      >
                        <t.Icon className="h-5 w-5" style={{ color: t.color }} />
                      </motion.span>
                      <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-0.5">
                        <div className="font-mono text-sm leading-tight">{t.name}</div>
                        {t.detail ? <div className="mt-1 font-mono text-[11px] leading-tight text-muted-foreground">{t.detail}</div> : null}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
