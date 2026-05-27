"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { useState } from "react"

const items = [
  {
    school: "Brown University",
    degree: "Sc.B. Computer Science — A.B. Business Economics",
    year: "2024 — 2028",
    coursework: ["Software Engineering", "Computer Systems", "Data Structures and Algorithms", "Deep Learning", "Foundations of AI"],
    notes: "NCAA Division I Swimmer",
  },
]

export function Education() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Section id="education" index="001 — Education" title="Academic background.">
      <div className="divide-y divide-hairline border-y border-hairline">
        {items.map((it, i) => (
          <motion.div
            key={it.school}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group grid grid-cols-12 gap-6 py-10 transition-colors hover:bg-surface/50"
          >
            <div className="col-span-12 md:col-span-2 font-mono text-sm text-muted-foreground">{it.year}</div>
            <div className="col-span-12 md:col-span-5">
              <h3 className="font-display text-2xl tracking-tight md:text-3xl">{it.school}</h3>
              <p className="mt-2 text-muted-foreground">{it.degree}</p>
              <p className="mt-3 text-sm text-muted-foreground">{it.notes}</p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="label mb-3">Coursework</div>
              <div className="flex flex-wrap gap-2">
                {it.coursework.map((c, idx) => (
                  <span
                    key={c}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    className={`border px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${hovered === idx ? 'border-signal text-foreground' : 'border-hairline text-muted-foreground'}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
