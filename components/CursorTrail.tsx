"use client"

import { useEffect, useState } from "react"

type Point = { x: number; y: number }

const hiddenPoint: Point = { x: -100, y: -100 }

export function CursorTrail() {
  const [cursor, setCursor] = useState<Point>(hiddenPoint)
  const [trail, setTrail] = useState<Point>(hiddenPoint)

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    const onLeave = () => {
      setCursor(hiddenPoint)
      setTrail(hiddenPoint)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  useEffect(() => {
    let frame = 0

    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (cursor.x - prev.x) * 0.18,
        y: prev.y + (cursor.y - prev.y) * 0.18,
      }))
      frame = window.requestAnimationFrame(animate)
    }

    frame = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frame)
  }, [cursor])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_24px_rgba(217,178,76,0.35)]"
        style={{ left: cursor.x, top: cursor.y }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/35"
        style={{ left: trail.x, top: trail.y }}
      />
    </>
  )
}