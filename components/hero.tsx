"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden" id="home">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-background to-transparent" />
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-signal/10 blur-[120px]" />
        <TelemetrySVG />
      </motion.div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs tracking-widest">CZ / Portfolio</span>
        </div>
        <div className="hidden gap-8 md:flex">
          {["education", "stack", "experience", "projects", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className="label hover:text-foreground transition-colors">
              {s}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="group flex items-center gap-2 border border-hairline px-4 py-2 text-xs font-mono uppercase tracking-widest hover:border-signal hover:text-signal transition-colors"
        >
          Available <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        </a>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pt-20 pb-32 md:px-10 md:pt-32">
        <div className="col-span-12 md:col-span-3 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="label mb-2">Subject</div>
            <div className="font-mono text-sm">AI Engineer</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="label mb-2">Location</div>
            <div className="font-mono text-sm">Charlotte, NC</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="label mb-2">Status</div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
              Open to opportunities
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label mb-8">
            // 001 — Introduction
          </motion.div>

          <h1 className="font-display text-[14vw] leading-[0.88] tracking-tighter md:text-[8.5vw]">
            {["Christopher", "Zhang."].map((word, i) => (
              <motion.span key={word} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="block">
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Hi! I'm Christopher Zhang, a Brown University student and Division 1 swimmer studying Computer Science & Business Economics, currently interning as an AI Engineer at Scout Motors.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }} className="mt-12 flex flex-wrap items-center gap-4">
            <a href="#projects" className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 text-sm font-mono uppercase tracking-widest text-background hover:bg-signal transition-colors">
              View Selected Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="#contact" className="group inline-flex items-center gap-3 border border-hairline px-6 py-4 text-sm font-mono uppercase tracking-widest hover:border-foreground transition-colors">
              Initiate Contact
            </a>
            <div className="flex items-center gap-1 ml-2">
              {[{ Icon: Github, href: "https://github.com/christopher895" }, { Icon: Linkedin, href: "https://www.linkedin.com/in/christopher-zhang1/" }, { Icon: Mail, href: "mailto:christopher_zhang@brown.edu" }].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="grid h-11 w-11 place-items-center border border-hairline hover:border-signal hover:text-signal transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TelemetrySVG() {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <motion.path d="M0,500 Q200,420 400,460 T800,400 T1200,440" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut" }} />
      <motion.path d="M0,580 Q300,520 600,560 T1200,520" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.3, ease: "easeInOut" }} />
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.circle key={i} cx={100 + i * 95} cy={500 - Math.sin(i) * 40} r="2" fill="var(--signal)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0.3] }} transition={{ duration: 1.5, delay: 1 + i * 0.05 }} />
      ))}
    </svg>
  )
}
