import { useEffect, useState } from "react"

const NAME = "CHRISTOPHER\nZHANG"

export function TypingNameHero() {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed("")
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(NAME.slice(0, i))
      i++
      if (i > NAME.length) clearInterval(interval)
    }, 90)
    return () => clearInterval(interval)
  }, [])

  // Split lines for color styling
  const lines = displayed.split("\n")

  return (
    <span className="block text-center">
      <span className="text-white">
        {lines[0]}
        {lines.length === 1 && <span className="animate-blink">|</span>}
      </span>
      {lines.length > 1 && <br />}
      <span className="text-[#3b82f6]">
        {lines[1] || ""}
        {lines.length > 1 && <span className="animate-blink">|</span>}
      </span>
      <style>{`
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
      `}</style>
    </span>
  )
}
