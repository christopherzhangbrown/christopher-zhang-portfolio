"use client"

import { useEffect, useState } from "react"

export function PersonalLogo() {
  const letters = ["C", "H", "R", "I", "S"]
  const [visible, setVisible] = useState(Array(letters.length).fill(false))
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    letters.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * 70)
    })

    setTimeout(() => setFadeOut(true), letters.length * 80 + 900)
  }, [letters.length])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-[88px] md:text-[140px] lg:text-[190px] leading-none tracking-tight flex">
        {letters.map((letter, i) => (
          <span
            key={letter}
            className={`inline-block transition-all duration-300 ease-out ${
              visible[i] ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            } ${i >= 3 ? "text-accent" : "text-foreground"}`}
            style={{ transitionDelay: `${i * 38}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
