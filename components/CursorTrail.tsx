"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

const TEXT_TAGS = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "A", "BUTTON", "LI", "LABEL"])

export function CursorTrail() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Only take over the pointer on devices that actually have a precise one.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setEnabled(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!enabled || reduceMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let pointerX = -100
    let pointerY = -100
    let trailX = -100
    let trailY = -100
    let scale = 1
    let visible = false
    let frame = 0
    let sinceProbe = 0

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    const render = () => {
      trailX += (pointerX - trailX) * 0.18
      trailY += (pointerY - trailY) * 0.18

      // elementFromPoint forces layout, so sample it a few times a second
      // rather than on every frame or every mousemove.
      sinceProbe += 1
      if (sinceProbe > 8 && visible) {
        sinceProbe = 0
        const el = document.elementFromPoint(pointerX, pointerY)
        const isTextLeaf = !!el && el.childElementCount === 0 && !!el.textContent?.trim()
        scale = el && (TEXT_TAGS.has(el.tagName) || isTextLeaf) ? 2.5 : 1
      }

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%) scale(${scale})`
      ring.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%) scale(${scale})`
      frame = window.requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    frame = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [enabled, reduceMotion])

  if (!enabled || reduceMotion) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 200ms ease, scale 200ms ease" }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-white mix-blend-difference will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 200ms ease" }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-signal/35 will-change-transform"
      />
    </>
  )
}
