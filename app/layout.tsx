import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CursorTrail } from "@/components/CursorTrail"
import { ScrollProgress } from "@/components/ScrollProgress"
import { MotionProvider } from "@/components/MotionProvider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const TITLE = "Christopher Zhang — AI Engineer"
const DESCRIPTION =
  "I build AI systems that run in production. AI Engineer Intern at Scout Motors; Computer Science and Business Economics at Brown."

export const metadata: Metadata = {
  metadataBase: new URL("https://christopher-zhang-portfolio.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: TITLE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Framer Motion bakes `opacity: 0` into the SSR markup for every
            scroll-triggered arrival. Without JS those never resolve, so the page
            below the hero would stay blank. */}
        <noscript>
          <style>{`main [style*="opacity"], footer [style*="opacity"] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <MotionProvider>
          <CursorTrail />
          <ScrollProgress />
          {children}
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
