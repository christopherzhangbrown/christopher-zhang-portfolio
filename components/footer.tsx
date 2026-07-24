"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

const PROMPT = "christopher@zhang:~$ still building"

function TerminalLine() {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!inView || chars >= PROMPT.length) return
    if (reduceMotion) {
      setChars(PROMPT.length)
      return
    }
    const timer = setTimeout(() => setChars((c) => c + 1), 35)
    return () => clearTimeout(timer)
  }, [inView, chars, reduceMotion])

  return (
    <span ref={ref}>
      {PROMPT.slice(0, chars)}
      <span className="ml-0.5 inline-block w-[0.5em] animate-[blink_1s_step-end_infinite]">_</span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          <TerminalLine />
        </div>
        <div>© 2026 Christopher Zhang.</div>
      </div>
    </footer>
  )
}
