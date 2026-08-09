"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

const PROFILES = [
  { Icon: Github, href: "https://github.com/christopher895", label: "GitHub profile" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/christopher-zhang1/", label: "LinkedIn profile" },
  { Icon: Mail, href: "mailto:christopher_zhang@brown.edu", label: "Email Christopher" },
]

const META = [
  { label: "Role", value: "AI Engineer Intern", delay: "0.1s" },
  { label: "Location", value: "Charlotte, NC", delay: "0.2s" },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden" id="home">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-background to-transparent" />
      <motion.div style={{ y, opacity }} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-signal/10 blur-[120px]" />
        <TelemetrySVG />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pt-32 pb-32 md:px-10 md:pt-48">
        <div className="order-2 col-span-12 mt-12 space-y-8 md:order-1 md:col-span-3 md:mt-0">
          {META.map((m) => (
            <div key={m.label} className="rise" style={{ animationDelay: m.delay }}>
              <div className="label mb-2">{m.label}</div>
              <div className="font-mono text-sm">{m.value}</div>
            </div>
          ))}
          <div className="rise" style={{ animationDelay: "0.3s" }}>
            <div className="label mb-2">Status</div>
            <div className="flex items-start gap-2 font-mono text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal motion-safe:animate-pulse" />
              Open to opportunities
            </div>
          </div>
        </div>

        <div className="order-1 col-span-12 md:order-2 md:col-span-9">
          <div className="label mb-8 rise">// 001 — Introduction</div>

          <h1 className="font-display text-[clamp(3.25rem,12vw,8rem)] leading-[0.88] tracking-tighter">
            {["Christopher", "Zhang."].map((word, i) => (
              <span
                key={word}
                className="block rise"
                style={{ ["--rise" as string]: "80px", animationDuration: "0.9s", animationDelay: `${0.2 + i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground rise md:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            Hi! I&apos;m Christopher Zhang, a Brown University Sc.B. Computer Science &amp; A.B.
            Business Economics student-athlete, currently interning as an AI Engineer at Scout Motors.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4 rise" style={{ animationDelay: "0.85s" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 font-mono text-sm uppercase tracking-widest text-background transition-colors hover:bg-signal"
            >
              View Selected Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-hairline-strong px-6 py-4 font-mono text-sm uppercase tracking-widest transition-colors hover:border-foreground"
            >
              Initiate Contact
            </a>
            <div className="ml-2 flex items-center gap-1">
              {PROFILES.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid h-11 w-11 place-items-center border border-hairline-strong transition-colors hover:border-signal hover:text-signal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** The ambient telemetry curve that sweeps the full width behind the hero. */
function TelemetrySVG() {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <path
        className="telemetry-draw"
        d="M0,500 Q200,420 400,460 T800,400 T1200,440"
        pathLength={1}
        fill="none"
        stroke="var(--signal)"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        className="telemetry-draw"
        d="M0,580 Q300,520 600,560 T1200,520"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        style={{ animationDuration: "3s", animationDelay: "0.3s" }}
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          className="telemetry-dot"
          cx={100 + i * 95}
          cy={500 - Math.sin(i) * 40}
          r="2"
          fill="var(--signal)"
          style={{ animationDelay: `${1 + i * 0.05}s` }}
        />
      ))}
    </svg>
  )
}

