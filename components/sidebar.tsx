"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 flex items-center justify-center text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-md border-l border-[#3b82f6]/30 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-8 w-10 h-10 flex items-center justify-center hover:bg-[#3b82f6]/20 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-6">
            <Link
              href="#home"
              className="block text-2xl font-light text-white hover:text-[#3b82f6] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="#stack"
              className="block text-2xl font-light text-white hover:text-[#3b82f6] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Tech Stack
            </Link>
            <Link
              href="#experience"
              className="block text-2xl font-light text-white hover:text-[#3b82f6] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="block text-2xl font-light text-white hover:text-[#3b82f6] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          </nav>

          {/* Social Links */}
          <div className="space-y-4 pt-8 border-t border-[#3b82f6]/30">
            <a
              href="https://github.com/christopherzhangbrown"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white/70 hover:text-[#3b82f6] transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christopher-zhang1"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white/70 hover:text-[#3b82f6] transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white/70 hover:text-[#3b82f6] transition-colors duration-300 uppercase"
            >
              Resume
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
