"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

export function AmbientBackground() {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 40, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 40, damping: 20 })
  const x = useTransform(springX, [-1, 1], [-16, 16])
  const y = useTransform(springY, [-1, 1], [-16, 16])

  useEffect(() => {
    if (reduceMotion) return
    const onMove = (event: MouseEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [pointerX, pointerY, reduceMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <motion.div className="absolute inset-0" style={{ x, y }}>
        <div
          className="absolute left-1/2 top-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 opacity-35 animate-[spin-slow_90s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, color-mix(in oklch, var(--signal) 12%, transparent), transparent 20%, transparent 55%, oklch(0.55 0.12 260 / 0.14), transparent 80%)",
          }}
        />
        {[
          { top: "8%", left: "12%", size: 6, delay: "0s", dur: "9s", anim: "float-a" },
          { top: "22%", left: "78%", size: 4, delay: "0s", dur: "12s", anim: "float-b" },
          { top: "48%", left: "35%", size: 5, delay: "0s", dur: "14s", anim: "float-c" },
          { top: "65%", left: "88%", size: 5, delay: "2s", dur: "11s", anim: "float-a" },
          { top: "80%", left: "18%", size: 4, delay: "1s", dur: "10s", anim: "float-b" },
          { top: "72%", left: "52%", size: 5, delay: "1.5s", dur: "10s", anim: "float-c" },
          { top: "34%", left: "62%", size: 4, delay: "0.8s", dur: "12s", anim: "float-a" },
          { top: "90%", left: "72%", size: 6, delay: "2.4s", dur: "11s", anim: "float-b" },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-signal"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              boxShadow: "0 0 12px var(--signal)",
              animation: `${d.anim} ${d.dur} ease-in-out infinite ${d.delay}`,
            }}
          />
        ))}
      </motion.div>

      <div className="noise absolute -inset-[10%] opacity-40" />

      {/* viewBox matches a landscape viewport so the schematic keeps its geometry
          instead of being squashed ~5:1 by preserveAspectRatio="none". */}
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 1000">
        <line x1="120" y1="180" x2="420" y2="380" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_6s_linear_infinite]" />
        <line x1="420" y1="380" x2="300" y2="640" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_8s_linear_infinite]" />
        <line x1="1180" y1="240" x2="1430" y2="440" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_7s_linear_infinite]" />
        <line x1="1430" y1="440" x2="1150" y2="700" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_9s_linear_infinite]" />
        <line x1="240" y1="780" x2="540" y2="900" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_6.5s_linear_infinite]" />
        <line x1="1260" y1="820" x2="980" y2="940" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_7.5s_linear_infinite]" />
        {[[120, 180], [420, 380], [1180, 240], [1430, 440], [240, 780], [540, 900], [1260, 820]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="var(--signal)" />
        ))}
        {[[300, 640], [1150, 700], [980, 940]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="currentColor" opacity="0.5" />
        ))}
      </svg>
    </div>
  )
}
