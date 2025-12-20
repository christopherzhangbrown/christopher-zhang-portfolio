"use client"

import { ReactNode } from "react"

export type AnimationState = 'before' | 'entering' | 'active' | 'exiting' | 'after'

interface FullScreenSectionProps {
  id: string
  title?: ReactNode
  titleClassName?: string
  children: ReactNode
  animationState: AnimationState
  className?: string
  contentClassName?: string
}

export function FullScreenSection({
  id,
  title,
  titleClassName = "",
  children,
  animationState,
  className = "",
  contentClassName = ""
}: FullScreenSectionProps) {
  
  // Content animation styles based on state
  const getContentStyle = () => {
    switch (animationState) {
      case 'before':
        return {
          opacity: 0,
          transform: 'translateY(100px) scale(0.95)',
          pointerEvents: 'none' as const
        }
      case 'entering':
        return {
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto' as const
        }
      case 'active':
        return {
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          pointerEvents: 'auto' as const
        }
      case 'exiting':
        return {
          opacity: 0,
          transform: 'translateY(-50px) scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none' as const
        }
      case 'after':
        return {
          opacity: 0,
          transform: 'translateY(-100px) scale(0.95)',
          pointerEvents: 'none' as const
        }
    }
  }

  return (
    <section
      id={id}
      className={`min-h-screen w-full flex flex-col snap-start snap-always relative ${className}`}
      data-section={id}
    >
      {/* Title - stays anchored */}
      {title && (
        <div className={`w-full px-6 pt-20 pb-8 ${titleClassName}`}>
          <div className="max-w-5xl mx-auto">
            {title}
          </div>
        </div>
      )}

      {/* Content - swoops in/out */}
      <div
        className={`flex-1 w-full ${contentClassName}`}
        style={getContentStyle()}
      >
        {children}
      </div>
    </section>
  )
}
