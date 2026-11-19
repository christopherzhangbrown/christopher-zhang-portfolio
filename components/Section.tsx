"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionProps {
  id: string
  index?: string
  title?: string
  subtitle?: string
  children?: ReactNode
}

export function Section({ id, index, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-12 grid grid-cols-12 items-start gap-6">
          <div className="col-span-12 md:col-span-3">
            {index && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45 }}
                className="label"
              >
                {index}
              </motion.div>
            )}
          </div>
          <div className="col-span-12 md:col-span-9">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="font-display text-5xl tracking-tighter md:text-7xl"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mt-4 max-w-2xl text-muted-foreground md:text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}
