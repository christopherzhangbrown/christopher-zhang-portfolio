"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionProps {
  id: string
  index?: string
  title?: string
  subtitle?: string
  children?: ReactNode
}

export function Section({ id, index, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="relative border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid grid-cols-12 items-end gap-6"
        >
          <div className="col-span-12 md:col-span-3">
            {index && <div className="label">// {index}</div>}
          </div>
          <div className="col-span-12 md:col-span-9">
            {title && <h2 className="font-display text-5xl tracking-tighter md:text-7xl">{title}</h2>}
            {subtitle && <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{subtitle}</p>}
          </div>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
