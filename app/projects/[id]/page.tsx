import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Github, X } from "lucide-react"
import { AmbientBackground } from "@/components/AmbientBackground"

type ProjectStudy = {
  title: string
  tag: string
  year: string
  problem: string
  contributions: string[]
  architecture: string[]
  stack: string[]
  demo: string
  repo: string
  gallery: { src: string; alt: string; className?: string }[]
}

const projectData: Record<string, ProjectStudy> = {
  "01": {
    title: "AI Swim Start Analyzer",
    tag: "Computer Vision · Training",
    year: "2025",
    problem: "Coaches needed fast biomechanical feedback during live starts, but common pose pipelines were too slow and too fragile under occlusion.",
    contributions: [
      "Built a MediaPipe-based analysis flow for live swim-start posture tracking.",
      "Automated timing and angle measurements to turn raw video into coaching feedback.",
      "Shipped a React interface for session review, metrics, and progress tracking.",
    ],
    architecture: [
      "React UI → Python/OpenCV analysis → MediaPipe pose detection",
      "Frame timing and angle scoring feed the coaching feedback layer",
      "Session review view stores notes and exports training data",
    ],
    stack: ["React", "OpenCV", "MediaPipe", "Python", "Computer Vision"],
    demo: "#",
    repo: "#",
    gallery: [
      { src: "/AIStart/AIStart.png", alt: "AI Swim Start Analyzer dashboard" },
      { src: "/AIStart/AIStartFeedback.png", alt: "AI Swim Start Analyzer feedback screen" },
    ],
  },
  "05": {
    title: "TripPlanner",
    tag: "Planning · Maps",
    year: "2025",
    problem: "Trip planning was split across route math, map state, and privacy-sensitive storage, making it hard to ship one coherent planner.",
    contributions: [
      "Implemented A* route optimization for multi-stop trip planning with dynamic graph construction.",
      "Built a privacy-safe export flow with pseudonymization, consent gating, and audit logging.",
      "Created the Mapbox experience for route rendering, activity filtering, and saved-trip review.",
    ],
    architecture: [
      "React frontend → Express API → Firebase Firestore",
      "Mapbox GL renders routes, pins, and trip overlays",
      "Test coverage with Vitest validates privacy and routing logic",
    ],
    stack: ["TypeScript", "React", "Express.js", "Node.js", "Firebase Firestore", "Mapbox GL"],
    demo: "#",
    repo: "#",
    gallery: [
      { src: "/TravelPlanner/travel-planner-home.png", alt: "TripPlanner home screen" },
      { src: "/TravelPlanner/travel-planner-map-routes.png", alt: "TripPlanner route map" },
    ],
  },
  "06": {
    title: "Dating Profile Analyzer",
    tag: "AI · Vision",
    year: "2026",
    problem: "Users needed quick, actionable feedback on profile photos and bios, but most tools were generic and didn’t explain what to improve.",
    contributions: [
      "Built face-aware image scoring for sharpness, lighting, and framing quality.",
      "Integrated Gemini-based bio analysis for tone, clarity, and engagement feedback.",
      "Connected Firestore, Cloud Storage, and Authentication for the full workflow.",
    ],
    architecture: [
      "React client → Node.js services → Firebase auth and storage",
      "TensorFlow.js and image-processing checks score uploaded photos",
      "Gemini AI generates rewrite suggestions for profile bios",
    ],
    stack: ["React", "TypeScript", "Node.js", "Firebase", "Gemini AI", "TensorFlow.js"],
    demo: "#",
    repo: "#",
    gallery: [
      { src: "/DatingProfile/dating-profile-home.png", alt: "Dating Profile Analyzer home screen" },
      { src: "/DatingProfile/dating-profile-dashboard.png", alt: "Dating Profile Analyzer dashboard" },
    ],
  },
  "07": {
    title: "Vision Transformer Evaluation Framework",
    tag: "Computer Vision · Research",
    year: "2026",
    problem: "Comparing Vision Transformer and CNN variants needed a clean evaluation flow and a presentation format that made the tradeoffs easy to read.",
    contributions: [
      "Built a repeatable benchmarking workflow for ViT and CNN model comparisons.",
      "Analyzed performance tradeoffs across training and evaluation configurations.",
      "Packaged the results into a poster-first presentation format.",
    ],
    architecture: [
      "Python training pipeline → PyTorch experiments → evaluation summaries",
      "Shared protocol keeps model comparisons consistent across runs",
      "Poster layout communicates methodology, metrics, and findings",
    ],
    stack: ["Python", "PyTorch", "Computer Vision", "ViT", "CNNs"],
    demo: "#",
    repo: "#",
    gallery: [{ src: "/DLFinal/DL Final Poster.png", alt: "Vision Transformer Evaluation Framework poster" }],
  },
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projectData[id]

  if (!project) {
    return (
      <div className="min-h-screen bg-background px-6 py-12 text-foreground">
        <div className="mx-auto max-w-5xl">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <p className="mt-10 text-sm text-muted-foreground">Project not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientBackground />
      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <div className="mx-auto my-12 max-w-5xl border border-hairline bg-background">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4 md:px-10">
            <div className="label">Case study / {project.title}</div>
            <Link href="/#projects" className="grid h-9 w-9 place-items-center border border-hairline hover:border-signal hover:text-signal transition-colors">
              <X className="h-4 w-4" />
            </Link>
          </div>

          <div className="aspect-[16/9] overflow-hidden border-b border-hairline">
            <img src={project.gallery[0].src} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
          </div>

          <div className="px-6 py-10 md:px-10 md:py-14">
            <div className="label mb-3">{project.tag} · {project.year}</div>
            <h3 className="font-display text-4xl tracking-tighter md:text-6xl">{project.title}</h3>

            {/* Metrics section removed per request */}

            <div className="mt-12 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Problem</div>
              <p className="col-span-12 md:col-span-9 leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Contributions</div>
              <ul className="col-span-12 md:col-span-9 space-y-3">
                {project.contributions.map((c) => (
                  <li key={c} className="flex gap-4 text-muted-foreground leading-relaxed">
                    <span className="mt-2 h-px w-6 shrink-0 bg-signal/60" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Architecture</div>
              <ul className="col-span-12 md:col-span-9 space-y-2 font-mono text-sm text-muted-foreground">
                {project.architecture.map((a) => (
                  <li key={a} className="border-l border-signal/40 pl-4">{a}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Stack</div>
              <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="border border-hairline px-3 py-1 text-xs font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-hairline pt-8">
              <a href={project.demo} className="group inline-flex items-center gap-3 bg-foreground px-5 py-3 text-xs font-mono uppercase tracking-widest text-background hover:bg-signal transition-colors">
                Live Demo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={project.repo} className="group inline-flex items-center gap-3 border border-hairline px-5 py-3 text-xs font-mono uppercase tracking-widest hover:border-signal hover:text-signal transition-colors">
                <Github className="h-4 w-4" /> Repository
              </a>
            </div>

            <div className="mt-16">
              {project.gallery.slice(1).map((img) => (
                <div key={img.src} className="w-full max-w-5xl bg-black shadow-lg rounded-lg overflow-hidden mt-6">
                  <img src={img.src} alt={img.alt} className="object-contain w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, content }: { label: string; content: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground md:col-span-3">{label}</div>
      <div className="col-span-12 md:col-span-9">{content}</div>
    </div>
  )
}
