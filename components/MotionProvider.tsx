"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

/**
 * The global CSS reduced-motion override only reaches CSS animations and
 * transitions. Framer Motion drives its arrivals as inline styles, so without
 * this it defaults to `reducedMotion: "never"` and keeps animating regardless
 * of the user's system setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
