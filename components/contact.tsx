"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Check, Copy, FileDown, Github, Linkedin, Mail } from "lucide-react"
import { useState } from "react"
import { Section } from "@/components/Section"

const EMAIL = "christopher_zhang@brown.edu"

const profiles = [
  {
    name: "GitHub",
    handle: "github.com/christopher895",
    href: "https://github.com/christopher895",
    Icon: Github,
    meta: "Projects, code, and experiments",
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/christopher-zhang1",
    href: "https://www.linkedin.com/in/christopher-zhang1/",
    Icon: Linkedin,
    meta: "Professional updates and networking",
  },
  {
    name: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: Mail,
    meta: "Best way to reach me",
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Section id="contact" index="005 — Contact" title="Let's connect.">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 border-t border-hairline pt-12"
        >
          <div className="col-span-12 md:col-span-7">
            <div className="label mb-3">Direct line</div>
            <button
              onClick={copy}
              className="group flex w-full items-start justify-between gap-4 border border-hairline px-5 py-5 text-left hover:border-signal transition-colors md:items-center md:px-6"
            >
              <span className="flex min-w-0 items-start gap-4 md:items-center">
                <Mail className="h-5 w-5 text-signal" />
                <span className="min-w-0 break-all font-display text-lg tracking-tight leading-tight md:text-2xl">
                  {EMAIL}
                </span>
              </span>
              {copied ? (
                <Check className="h-4 w-4 text-signal" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              )}
            </button>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="label mb-3">Resume</div>
            <a
              href="/SWEResumeChristopherZhang.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between border border-hairline p-4 hover:border-signal transition-colors"
            >
              <div className="flex items-start justify-between">
                <FileDown className="h-6 w-6 text-signal" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl tracking-tight">Download PDF</div>
                <div className="label mt-2">PDF · Updated 2026</div>
                
              </div>
            </a>
          </div>
        </motion.div>
        <div className="mt-12">
          <div className="grid divide-y divide-hairline border-y border-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
            {profiles.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col justify-between p-8 hover:bg-foreground/[0.04] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <p.Icon className="h-6 w-6" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-8">
                  <div className="font-display text-2xl">{p.name}</div>
                  <div className="mt-1 break-all font-mono text-sm text-muted-foreground">{p.handle}</div>
                  <div className="label mt-3">{p.meta}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
    </Section>
  )
}
