"use client"

interface SectionNavigationProps {
  sections: Array<{ id: string; label: string }>
  currentIndex: number
  onNavigate: (index: number) => void
  className?: string
}

export function SectionNavigation({
  sections,
  currentIndex,
  onNavigate,
  className = ""
}: SectionNavigationProps) {
  return (
    <nav
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 ${className}`}
      aria-label="Section navigation"
    >
      {sections.map((section, index) => {
        const isActive = index === currentIndex
        
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(index)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'true' : 'false'}
          >
            {/* Tooltip label */}
            <span className="absolute right-full mr-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {section.label}
            </span>

            {/* Dot indicator */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-white shadow-lg shadow-white/50'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60 hover:w-2.5 hover:h-2.5'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}

// Mobile navigation (bottom bar)
export function SectionNavigationMobile({
  sections,
  currentIndex,
  onNavigate,
  className = ""
}: SectionNavigationProps) {
  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 ${className}`}
      aria-label="Section navigation"
    >
      {sections.map((section, index) => {
        const isActive = index === currentIndex
        
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(index)}
            className={`block rounded-full transition-all duration-300 ${
              isActive
                ? 'w-3 h-3 bg-white shadow-lg'
                : 'w-2 h-2 bg-white/40'
            }`}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'true' : 'false'}
          />
        )
      })}
    </nav>
  )
}
