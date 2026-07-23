"use client"

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div
        className="absolute left-1/2 top-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 opacity-35 animate-[spin-slow_90s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, color-mix(in oklch, var(--signal) 12%, transparent), transparent 20%, transparent 55%, oklch(0.55 0.12 260 / 0.14), transparent 80%)",
        }}
      />
      <div className="noise absolute -inset-[10%] opacity-40" />

      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1600 4000">
        <line x1="120" y1="200" x2="420" y2="520" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_6s_linear_infinite]" />
        <line x1="420" y1="520" x2="300" y2="900" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_8s_linear_infinite]" />
        <line x1="1200" y1="1400" x2="1450" y2="1750" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_7s_linear_infinite]" />
        <line x1="1450" y1="1750" x2="1150" y2="2100" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_9s_linear_infinite]" />
        <line x1="200" y1="2600" x2="500" y2="2950" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_6.5s_linear_infinite]" />
        <line x1="1300" y1="3300" x2="1000" y2="3650" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_7.5s_linear_infinite]" />
        {[[120, 200], [420, 520], [1200, 1400], [1450, 1750], [200, 2600], [500, 2950], [1300, 3300]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="var(--signal)" />
        ))}
        {[[300, 900], [1150, 2100], [1000, 3650]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="currentColor" opacity="0.5" />
        ))}
      </svg>

      {[
        { top: "8%", left: "12%", size: 6, delay: "0s", dur: "9s", anim: "float-a" },
        { top: "22%", left: "78%", size: 4, delay: "0s", dur: "12s", anim: "float-b" },
        { top: "48%", left: "35%", size: 5, delay: "0s", dur: "14s", anim: "float-c" },
        { top: "65%", left: "88%", size: 5, delay: "2s", dur: "11s", anim: "float-a" },
        { top: "80%", left: "18%", size: 4, delay: "1s", dur: "10s", anim: "float-b" },
        { top: "130%", left: "22%", size: 5, delay: "1.5s", dur: "10s", anim: "float-c" },
        { top: "180%", left: "70%", size: 4, delay: "0.8s", dur: "12s", anim: "float-a" },
        { top: "230%", left: "40%", size: 6, delay: "2.4s", dur: "11s", anim: "float-b" },
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
    </div>
  )
}
