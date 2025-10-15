"use client"

import { useEffect, useRef } from "react"

interface AnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useAnimation<T extends HTMLElement = HTMLElement>(
  animationClass: string,
  options: AnimationOptions = {}
) {
  const elementRef = useRef<T>(null)
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = false
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove any existing animation classes
            element.classList.remove(...element.classList.toString().split(' ').filter(c => c.startsWith('animate-')))
            
            // Add the new animation class
            element.classList.add(animationClass)
            element.style.opacity = "1"
          } else if (!triggerOnce) {
            // If not triggerOnce, remove animation when out of view
            element.classList.remove(animationClass)
            element.style.opacity = "0"
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animationClass, threshold, rootMargin, triggerOnce])

  return elementRef
}

// Hook for staggered animations (multiple elements)
export function useStaggeredAnimation<T extends HTMLElement = HTMLElement>(
  animationClass: string,
  options: AnimationOptions & { staggerDelay?: number } = {}
) {
  const containerRef = useRef<T>(null)
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = false,
    staggerDelay = 100
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              // Remove existing animations
              child.classList.remove(...child.classList.toString().split(' ').filter(c => c.startsWith('animate-')))
              
              // Add staggered animation
              setTimeout(() => {
                child.classList.add(animationClass)
                child.style.opacity = "1"
              }, index * staggerDelay)
            })
          } else if (!triggerOnce) {
            children.forEach((child) => {
              child.classList.remove(animationClass)
              child.style.opacity = "0"
            })
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [animationClass, threshold, rootMargin, triggerOnce, staggerDelay])

  return containerRef
}
