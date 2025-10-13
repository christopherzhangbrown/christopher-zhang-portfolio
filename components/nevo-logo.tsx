"use client"

import { useEffect, useState } from "react"

export function PersonalLogo() {
  const letters = [
    { char: "C", className: "text-white" },
    { char: "H", className: "text-white" },
    { char: "R", className: "text-white/60" },
    { char: "I", className: "text-white/40" },
    { char: "S", className: "text-white/20" },
  ];
  const [visible, setVisible] = useState(Array(letters.length).fill(false));
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Pop up each letter one by one, quickly
    letters.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 70);
    });
    // Hold the logo longer before fading out
    setTimeout(() => setFadeOut(true), letters.length * 90 + 1200);
  }, []);

  return (
    <div className={`transition-opacity duration-700 ${fadeOut ? "opacity-0 blur-xl" : "opacity-100 blur-0"} bg-[#3b82f6] fixed inset-0 flex items-center justify-center z-50`}>
      <div className="relative">
        <div className="text-[120px] md:text-[180px] lg:text-[220px] font-bold tracking-tight leading-none flex">
          {letters.map((l, i) => (
            <span
              key={i}
              className={
                `${l.className} inline-block transition-all duration-500 ease-out ` +
                (visible[i] ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0")
              }
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {l.char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
