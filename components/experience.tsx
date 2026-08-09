"use client"

import { motion } from "framer-motion"
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
    role: "AI Engineer Intern",
    location: "Charlotte, NC",
    period: "May 2026 — Present",
    bullets: [
      "Engineered an AI security assistant using Copilot Studio and Jira, reducing projected support costs by $800K annually.",
      "Designed and deployed a self-service developer platform automating application provisioning, repository creation, and Kubernetes deployments, reducing application onboarding from 7 steps to 1 across 4 standardized service templates.",
      "Architected the platform backend with AWS Lambda, Amazon Bedrock, and Terraform to translate natural language requests into automated application deployment workflows.",
      "Developed an MCP server and Go Kubernetes monitoring service using client-go informers, ingesting cluster state into PostgreSQL to enable application triage, health checks, environment comparison, and AI-assisted remediation.",
    ],
    tags: ["Copilot Studio", "Jira", "AWS", "Bedrock", "Terraform", "Go"],
  },
  {
    company: "Mandy",
    role: "Software Engineer Intern",
    location: "Remote",
    period: "June 2025 — August 2025",
    bullets: [
      "Built an AI-powered room redesign platform that transforms user-uploaded room images into personalized interior designs and generates relevant product recommendations.",
      "Engineered a full-stack application using Next.js, TypeScript, Clerk, IMGBB, and Vercel, developing pipelines for image uploads, AI-generated redesigns, user onboarding, and personalized recommendations.",
      "Created a recommendation pipeline mapping user preferences to Amazon furniture suggestions with personalized filtering.",
    ],
    tags: ["Next.js", "TypeScript", "Clerk", "IMGBB", "Vercel"],
  },
]

export function Experience() {
  return (
    <Section
      id="experience"
      index="003 — Experience"
      title="Work experience."
      subtitle="Roles where I shipped production systems."
    >
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
            <div className="col-span-12 font-mono text-sm text-muted-foreground md:col-span-2">
              <div className="text-signal">/{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-4">{item.period}</div>
              <div className="mt-2 text-foreground">{item.location}</div>
            </div>

            <div className="col-span-12 md:col-span-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl md:text-3xl">{item.company}</h3>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.role}</div>
              </div>

              <ul className="mt-6 space-y-4 text-[color:color-mix(in_srgb,var(--foreground)_82%,transparent)]">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-4">
                    <span className="mt-2.5 inline-block h-0.5 w-6 shrink-0 bg-signal" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {item.tags && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted-foreground">
                  {item.tags.map((t, tagIndex) => (
                    <span
                      key={t}
                      className={`cursor-default transition-colors before:mr-2 before:text-muted-foreground before:transition-colors before:content-['•'] hover:text-signal hover:before:text-signal ${
                        tagIndex === 0 ? "before:content-['']" : ""
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
