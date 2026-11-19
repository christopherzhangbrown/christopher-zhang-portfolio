import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

const PROFILES = [
  { Icon: Github, href: "https://github.com/christopher895", label: "GitHub profile" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/christopher-zhang1/", label: "LinkedIn profile" },
  { Icon: Mail, href: "mailto:christopher_zhang@brown.edu", label: "Email Christopher" },
]

const META = [
  { label: "Studying", value: "CS & Economics, Brown '28", delay: "0.15s" },
  { label: "Based in", value: "Providence, RI", delay: "0.2s" },
]

export function Hero() {
  return (
    <section className="relative w-full" id="home">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-10 px-6 pt-28 pb-16 md:px-10 md:pt-40 md:pb-24">
        <aside className="order-2 col-span-12 md:order-1 md:col-span-3">
          <img
            src="/christopher-zhang.jpg"
            alt="Christopher Zhang on the rocks by the ocean, smiling"
            width={640}
            height={800}
            fetchPriority="high"
            className="rise hidden aspect-[4/5] w-full border border-hairline object-cover md:block"
          />
          <dl className="grid grid-cols-2 gap-6 md:mt-8 md:grid-cols-1">
            {META.map((m) => (
              <div key={m.label} className="rise" style={{ animationDelay: m.delay }}>
                <dt className="label mb-2">{m.label}</dt>
                <dd className="text-sm">{m.value}</dd>
              </div>
            ))}
            <div className="rise col-span-2 md:col-span-1" style={{ animationDelay: "0.25s" }}>
              <dt className="label mb-2">Looking for</dt>
              <dd className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                Summer 2027 SWE / AI internships
              </dd>
            </div>
          </dl>
        </aside>

        <div className="order-1 col-span-12 md:order-2 md:col-span-9">
          <img
            src="/christopher-zhang.jpg"
            alt="Christopher Zhang"
            width={640}
            height={800}
            fetchPriority="high"
            className="rise mb-8 aspect-[4/5] w-24 border border-hairline object-cover md:hidden"
          />

          <h1 className="font-display text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.9] tracking-[-0.04em]">
            {["Christopher", "Zhang."].map((word, i) => (
              <span
                key={word}
                className="block rise"
                style={{ ["--rise" as string]: "60px", animationDuration: "0.9s", animationDelay: `${0.1 + i * 0.08}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground rise md:text-xl"
            style={{ animationDelay: "0.4s" }}
          >
            I build AI products and ship them. At Scout Motors I built a self-service developer platform
            that took application onboarding from 7 steps to 1. On my own, I launched SwimVolt and
            DiveVolt, computer-vision products for swimmers and diving coaches.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 rise" style={{ animationDelay: "0.5s" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 font-mono text-sm uppercase tracking-widest text-background transition-colors hover:bg-signal"
            >
              See my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-hairline-strong px-6 py-4 font-mono text-sm uppercase tracking-widest transition-colors hover:border-foreground"
            >
              Get in touch
            </a>
            <div className="flex items-center gap-1">
              {PROFILES.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid h-11 w-11 place-items-center border border-hairline-strong transition-colors hover:border-signal hover:text-signal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
