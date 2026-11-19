import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github, X } from "lucide-react"
import { AmbientBackground } from "@/components/AmbientBackground"
import { Nav } from "@/components/nav"

type ProjectStudy = {
  title: string
  tag: string
  year: string
  problem: string
  /** "What I built" — one paragraph, shown under the problem. */
  built?: string
  /** Captioned product assets, shown before the architecture. */
  demo?: { src: string; alt: string; caption: string; video?: boolean; poster?: string }[]
  contributions?: string[]
  /** Longer-form engineering write-ups; used instead of `contributions`. */
  engineering?: { title: string; body: string }[]
  architecture: string[]
  /** Prose that explains why the architecture is split the way it is. */
  architectureNotes?: string[]
  research?: { question: string; answer: string }[]
  stack: string[]
  repo?: string
  live?: string
  liveLabel?: string
  gallery: { src: string; alt: string; className?: string }[]
}

const projectData: Record<string, ProjectStudy> = {
  "06": {
    title: "DiveVolt",
    tag: "Video Platform · Computer Vision",
    year: "2026",
    problem: "Diving coaches film every practice. The clips pile up on an iPad with no names on them, so pulling up one diver's last few 105Bs means scrolling through a camera roll, and most of that video rarely gets looked at again once practice is over.",
    built: "DiveVolt covers coaching from the pool deck to the diver's phone. An iPad on a tripod replays each dive on the pool TV a few seconds after the diver hits the water. If the coach taps Keep, the clip is saved, the app works out which dive it was from the video, and it goes into that diver's folder under the right dive group and board. Later, a coach can step through it frame by frame, draw on it, put it next to an earlier attempt or an elite dive, and send the diver a private link. I built every piece of it myself, from the iPhone and iPad app and the web app to the ops site and the pose and analysis pipeline underneath. It's live at divevolt.com, and the Brown diving team has been piloting it.",
    demo: [
      {
        src: "/DiveVolt/divevolt-review.jpg",
        alt: "DiveVolt review screen: a 105B forward two-and-a-half pike from 3 m paused at the top of the dive, a skeleton drawn on the diver, and a panel showing height off the board, hip angle and knee angle against their target ranges",
        caption: "The top of a 105B. The pike gets measured right on the frame, next to where it should be.",
      },
      {
        src: "/DiveVolt/divevolt-compare.jpg",
        alt: "DiveVolt compare view: two of the same diver's 105B attempts side by side, both paused at the top of the dive, with the note “Lined up at hurdle, takeoff, top, entry”",
        caption: "Two of her 105Bs, about a week apart. The app lines them up at the hurdle, takeoff, top and entry on its own.",
      },
      {
        src: "/DiveVolt/divevolt-folder.jpg",
        alt: "A diver's folder in DiveVolt: 74 clips grouped into Front, Back, Gainer, Inward and Twister, with a 1 m / 3 m filter",
        caption: "Her folder, sorted by dive group, with a 1 m / 3 m filter on top.",
      },
    ],
    architecture: [
      "Next.js 15 on Vercel → Neon Postgres + private Vercel Blob, one codebase for the web app, the Capacitor iPhone/iPad shell, and ops.divevolt.com",
      "Modal workers: ffmpeg (playback copy, finding the dive in a long clip) and the pose pass (YOLOX detection, RTMPose-x, a flight solver)",
      "Deterministic TypeScript engine reads keypoints into the dive code, checkpoints and measurements",
      "Middleware splits hosts, so the admin pages don't exist on the coach app's address",
    ],
    architectureNotes: [
      "The iOS app is the same Next.js app inside a Capacitor shell, plus one native Swift plugin for the TV. Connect a TV over AirPlay or HDMI and it shows just the replay. The iPad keeps the controls. Since everything else is plain web code, one deploy updates the iPad, the laptop and every diver's link at once.",
      "Pose and transcoding run as two separate Modal apps that share a secret. In dev, the app won't send footage to the live pose app unless I override it on purpose. The ops site pulls Modal's bill (by month, by day, by clip), so I know what analysing any single clip cost me.",
    ],
    engineering: [
      {
        title: "Instant replay without a replay box",
        body: "Replay mode records the camera with MediaRecorder as fragmented MP4 and plays it back through MediaSource on a set delay behind live. When the coach taps Keep, the fragments from just before the tap get stitched into a regular MP4 and queued for upload. You watch the dive first. Then you decide if it's worth saving.",
      },
      {
        title: "Tracking someone who's upside down",
        body: "Pose models expect people standing up, and a diver halfway through a somersault isn't. So each airborne frame gets posed on a crop rotated until the diver looks upright, and I keep whichever skeleton is most confident while still lining up with the frame before. The flight is solved as a single gravity parabola, fit with RANSAC across every moving blob and detector box. Then the tracker once followed a teammate onto the mats next to the pool. Since then, a new pick has to stay near the last confirmed position, be roughly the same size, and drop along the curve.",
      },
      {
        title: "Reading the dive code blind",
        body: "The dive code comes from the pose and nothing else. The clip's current label is never used as a hint. Auto-sort and the accuracy script call the exact same function, which means the accuracy number measures what the app actually files. When the read is unsure, the Tag screen shows something like “Looks like 303B” and the coach taps once to confirm.",
      },
      {
        title: "When in doubt, hide the number",
        body: "Each measurement is marked as clear or so-so tracking. If tracking is shaky (tucks, blur, splash) or the timing is physically impossible, the number disappears and the app says why. Clips also remember where the camera was standing. Anything that angle could throw off gets a caveat or gets dropped, and Compare warns you when two clips were shot from different spots.",
      },
      {
        title: "Privacy for the divers",
        body: "Before anything uploads, the phone wipes the video's GPS, make and model by editing the file in place, with no re-encode. Every diver has a consent box. It controls share links and whether their footage goes to the pose service at all. Diver links are private, and a coach can revoke one whenever. Slow motion at 120 or 240 fps is stored exactly as filmed, and big files go up in parts that retry without creating duplicates.",
      },
    ],
    research: [
      {
        question: "How often does it get the dive right?",
        answer: "I tested it on 32 clips where the dive number was already known: three Brown dives off the 3 m, plus elite and college footage. It got 25 right. Five of the seven misses were refusals. Those clips were filmed from the stands with people in the way, so the tracker lost the diver and said so instead of guessing. Twisting dives get marked low confidence, because a camera off to the side has a hard time seeing twists.",
      },
      {
        question: "Where do the checkpoints come from?",
        answer: "They're positions anyone can check, and none of them is a grade. In the hurdle, the thigh should sit around 90° to the trunk. In the air, the diver holds whatever shape the code's letter calls for (pike, tuck or straight), and the entry should be within 5° of vertical. The app only shows the checkpoints that apply to that dive. Sources are written up in the repo's research notes.",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Capacitor", "Swift", "Python", "YOLOX", "RTMPose", "Modal", "ffmpeg", "Neon Postgres", "Vercel Blob", "Vercel"],
    live: "https://divevolt.com",
    liveLabel: "divevolt.com",
    gallery: [
      { src: "/DiveVolt/divevolt-landing.jpg", alt: "DiveVolt landing page: the video coaching app built for diving" },
    ],
  },
  "02": {
    title: "AI Job Hunting Agent",
    tag: "Automation · AI",
    year: "2026",
    problem: "Job hunting means repeatedly scanning career pages, tailoring resumes, and tracking applications by hand, which makes it easy to miss strong roles or spend too long on each application.",
    contributions: [
      "Automated monitoring of 110+ company career pages every 15 minutes, diffing against the last snapshot and emailing ranked alerts for new matching roles.",
      "Designed a suggest-and-approve tailoring flow: Claude proposes job-specific edits against a fixed master resume, and only the ones I check off are applied. Used across 150+ applications.",
      "Labelled every suggestion as grounded or extrapolated deterministically, so an edit that adds a keyword or number the master resume doesn't contain gets flagged before it reaches the checklist.",
    ],
    architecture: [
      "Next.js UI → Node.js + Express API → node-cron monitor polling ATS APIs",
      "Claude suggests discrete edits; Cheerio fetches and cleans pasted job descriptions",
      "PostgreSQL stores jobs, snapshots, resume versions, and application status",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Cheerio", "Claude"],
    live: "https://web-production-d867c.up.railway.app/playground",
    gallery: [
      { src: "/AI-Job-Agent/AI-Job-Home.png", alt: "AI Job Hunting Agent resume history dashboard" },
    ],
  },
  "01": {
    title: "SwimVolt",
    tag: "Computer Vision · Sports",
    year: "2026",
    problem: "You can't see your own start. It's the one part of the race that happens behind you, it's over in about a second, and a coach on deck is watching an entire lane at once. So the feedback you get is “that felt slow,” never “your back knee was at 91° coming off the block.”",
    built: "SwimVolt turns a ten-second phone clip into 49 biomechanical measurements across the four phases of a racing start: setup, launch, flight, and entry. Each one gets compared to a technique target, and the three that matter most for that dive become the corrections you actually see. I built the whole thing myself, from talking to coaches through the CV pipeline, the product, billing, and deploy. It's live at swimvolt.com with 200+ users.",
    demo: [
      {
        src: "/SwimVolt/swimvolt-results.jpg",
        alt: "SwimVolt results screen — video paused on the measured frame with the skeleton overlay on and a 122° angle drawn on the front knee, beside the correction it produced",
        caption: "The measurement and the instruction are the same thing.",
      },
      {
        src: "/SwimVolt/swimvolt-overlay.mp4",
        alt: "The pose overlay tracking one dive from setup through entry, the phase bar advancing underneath it",
        caption: "26 keypoints a frame, tracked through splash and rotation.",
        video: true,
        poster: "/SwimVolt/swimvolt-overlay-poster.jpg",
      },
    ],
    architecture: [
      "Next.js 15 / React 19 on Vercel → HMAC ticket against a per-account quota → FastAPI + RTMPose on a Modal T4",
      "Model loaded once per container at startup, not once per request",
      "Phase detection, all 49 measurements and every coaching rule run client-side, deterministic TypeScript",
      "Neon Postgres and Cloudflare R2 store the result; the server never scores the dive",
    ],
    architectureNotes: [
      "I split it that way on purpose. Pose inference needs a T4 and half a gigabyte of warm model weights, so it gets its own service, with an HMAC ticket minted against a per-account quota in front of it. A public URL that spends GPU seconds is a bill anyone can run up.",
      "Everything after pose inference runs in milliseconds and is deterministic TypeScript. The server only stores the result. That way the expensive half scales on its own, and the half that decides what a swimmer gets told is testable in-process — about 3,400 TypeScript tests and 250+ Python tests.",
    ],
    engineering: [
      {
        title: "Frame timing is the contract everything else depends on",
        body: "Container metadata lies. One real clip claims 82 frames at 27fps and decodes 73 at about 30fps, so seeking per sample and labelling each frame with the time I asked for gave me a timing error that grew the further into the clip you got. Now I decode sequentially and stamp every frame with its own presentation timestamp — the one clock the pose overlay, the phase boundaries, and every duration metric all share.",
      },
      {
        title: "Getting keypoints to survive real pool footage",
        body: "One mistracked frame published a bogus coaching cue, and neither of the obvious guards caught it. The One Euro filter raises its cutoff with speed by design, so a keypoint that teleports gets the least smoothing in the whole clip, and the bad joint scored higher confidence than the correct ones next to it. I fixed it with a temporal-continuity rejector, plus a left/right leg-swap corrector that decides the whole limb chain in one vote per frame.",
      },
      {
        title: "Camera motion, measured rather than assumed",
        body: "Optical flow on background features with the swimmer masked out. This has to be server-side, because a swimmer moving left and a camera panning right look identical in a keypoint stream. Four of the metrics are fitted across frames in pixel space, so those get nulled when the background drifts. The within-frame joint angles are fine either way, which means the check can name the four measurements it invalidated instead of throwing out the dive.",
      },
      {
        title: "Keeping the coaching engine deterministic, and cutting the one LLM call",
        body: "It praised “good arm drive” on the same dive whose correction card read arm pull 0.33 → ≥0.40. Now every instruction comes out of a rule table reading measured values, so the praise and the corrections can't contradict each other.",
      },
      {
        title: "The production surface",
        body: "Stripe subscriptions over a free tier, Firebase auth, presigned R2 uploads that run in parallel with the 15 to 45 second GPU pass, an H.264 transcode path because iPhone HEVC decodes fine on the GPU but renders black in Chrome, a Compare view that ghosts an elite reference dive over your own, an age gate, and GPS stripping at upload time. A raw phone capture pins the pool a frequently-teenage swimmer trains at to within about nine metres.",
      },
    ],
    research: [
      {
        question: "How reliable is a measurement?",
        answer: "Two ways. First, a stability harness re-analyses the same dive 300 times with small camera tilts and keypoint jitter, and measures how often each metric's verdict flips. Every metric a swimmer sees has to flip 10% of the time or less, and 19 of the 49 clear that bar. The rest are coach-only. Second, I filmed 12 dives with two phones at once and scored both takes. Three metrics agreed every time and four flipped often, front knee worst at 80%. The /research page shows both, so nobody has to take the numbers on trust.",
      },
      {
        question: "Are the phase boundaries in the right place?",
        answer: "I hand-labelled 15 clips frame by frame and checked the detector against them. Mean error is 1.5 frames or better on launch, foot-off, and entry.",
      },
      {
        question: "Where do the targets come from?",
        answer: "Of the 34 metrics with a target, two come from published biomechanics literature, twenty are set by coaching rules shaped by a review with a USA Swimming high-performance consultant, and twelve are still my own estimate. There's a public /research page that prints that breakdown per metric. If a number the app is coaching on isn't backed by anything yet, it says so.",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Python", "FastAPI", "RTMPose", "Modal", "Neon Postgres", "Cloudflare R2", "Firebase Auth", "Stripe", "Vercel"],
    live: "https://swimvolt.com",
    liveLabel: "swimvolt.com",
    gallery: [
      { src: "/SwimVolt/swimvolt-hero.jpg", alt: "SwimVolt landing page — your start, measured" },
    ],
  },
  "04": {
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
    gallery: [
      { src: "/TravelPlanner/travel-planner-home.png", alt: "TripPlanner home screen" },
      { src: "/TravelPlanner/travel-planner-map-routes.png", alt: "TripPlanner route map" },
    ],
  },
  "03": {
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
    gallery: [
      { src: "/DatingProfile/dating-profile-home.png", alt: "Dating Profile Analyzer home screen" },
      { src: "/DatingProfile/dating-profile-dashboard.png", alt: "Dating Profile Analyzer dashboard" },
    ],
  },
  "05": {
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
    gallery: [{ src: "/DLFinal/DL Final Poster.png", alt: "Vision Transformer Evaluation Framework poster" }],
  },
}

/** Same order as the homepage list, so "next project" follows what the visitor saw. */
const ORDER = ["06", "01", "02", "03", "04", "05"]

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = projectData[id]
  if (!project) return { title: "Project not found · Christopher Zhang" }
  return {
    title: `${project.title} · Christopher Zhang`,
    description: project.problem,
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projectData[id]

  if (!project) notFound()

  const at = ORDER.indexOf(id)
  const prevId = at > 0 ? ORDER[at - 1] : null
  const nextId = at >= 0 && at < ORDER.length - 1 ? ORDER[at + 1] : null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientBackground />
      <Nav />
      <div className="relative z-10 mx-auto max-w-6xl pb-12 pt-28 md:px-6">
        <div className="mx-auto my-12 max-w-5xl border-y border-hairline bg-background md:border">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4 md:px-10">
            <div className="label">Case study / {project.title}</div>
            <Link
              href="/#projects"
              aria-label="Back to projects"
              className="grid h-11 w-11 place-items-center border border-hairline-strong transition-colors hover:border-signal hover:text-signal"
            >
              <X className="h-4 w-4" />
            </Link>
          </div>

          <div className="aspect-[16/9] overflow-hidden border-b border-hairline">
            <img src={project.gallery[0].src} alt={project.gallery[0].alt} className="h-full w-full object-cover object-top" fetchPriority="high" />
          </div>

          <div className="px-6 py-10 md:px-10 md:py-14">
            <div className="label mb-3">{project.tag} · {project.year}</div>
            <h1 className="font-display text-4xl tracking-tighter md:text-6xl">{project.title}</h1>

            {/* Metrics section removed per request */}

            <div className="mt-12 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Problem</div>
              <p className="col-span-12 max-w-[68ch] leading-relaxed text-muted-foreground md:col-span-9">{project.problem}</p>
            </div>

            {project.built && (
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 label">What I built</div>
                <p className="col-span-12 max-w-[68ch] leading-relaxed text-muted-foreground md:col-span-9">{project.built}</p>
              </div>
            )}

            {project.demo && (
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 label">Demo</div>
                <div className="col-span-12 md:col-span-9 space-y-8">
                  {project.demo.map((d) => (
                    <figure key={d.src} className="space-y-3">
                      <div className="overflow-hidden border border-hairline bg-surface">
                        {d.video ? (
                          <video
                            src={d.src}
                            poster={d.poster}
                            aria-label={d.alt}
                            className="w-full"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            preload="metadata"
                          />
                        ) : (
                          <img src={d.src} alt={d.alt} className="w-full object-contain" loading="lazy" />
                        )}
                      </div>
                      <figcaption className="text-sm leading-relaxed text-muted-foreground">{d.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {project.contributions && (
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 label">Contributions</div>
                <ul className="col-span-12 md:col-span-9 space-y-3">
                  {project.contributions.map((c) => (
                    <li key={c} className="flex items-center gap-4 text-muted-foreground leading-relaxed">
                      <span className="inline-block h-0.5 w-6 shrink-0 bg-signal" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Architecture</div>
              <div className="col-span-12 md:col-span-9 space-y-6">
                <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                  {project.architecture.map((a) => (
                    <li key={a} className="border-l border-signal/40 pl-4">{a}</li>
                  ))}
                </ul>
                {project.architectureNotes?.map((n) => (
                  <p key={n} className="max-w-[68ch] leading-relaxed text-muted-foreground">{n}</p>
                ))}
              </div>
            </div>

            {project.engineering && (
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 label">Engineering</div>
                <ul className="col-span-12 md:col-span-9 space-y-8">
                  {project.engineering.map((e) => (
                    <li key={e.title} className="border-l border-signal/40 pl-5">
                      <h4 className="font-display text-lg tracking-tight md:text-xl">{e.title}</h4>
                      <p className="mt-2 max-w-[68ch] leading-relaxed text-muted-foreground">{e.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.research && (
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 label">Research &amp; validation</div>
                <ul className="col-span-12 md:col-span-9 space-y-8">
                  {project.research.map((r) => (
                    <li key={r.question}>
                      <h4 className="font-display text-lg tracking-tight md:text-xl">{r.question}</h4>
                      <p className="mt-2 max-w-[68ch] leading-relaxed text-muted-foreground">{r.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3 label">Stack</div>
              <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-muted-foreground">
                {project.stack.map((s, sIndex) => (
                  <span
                    key={s}
                    className={`cursor-default transition-colors before:mr-2 before:text-muted-foreground before:transition-colors before:content-['•'] hover:text-signal hover:before:text-signal ${sIndex === 0 ? "before:content-['']" : ""}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {(project.repo || project.live) && (
              <div className="mt-12 flex flex-wrap gap-3 border-t border-hairline pt-8">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 border border-hairline-strong px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-signal hover:text-signal">
                    <ExternalLink className="h-4 w-4" /> {project.liveLabel ?? "Live Demo"}
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 border border-hairline-strong px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-signal hover:text-signal">
                    <Github className="h-4 w-4" /> Repository
                  </a>
                )}
              </div>
            )}

            {project.gallery.length > 1 && (
              <div className="mt-16 space-y-6">
                {project.gallery.slice(1).map((img) => (
                  <div key={img.src} className="w-full overflow-hidden border border-hairline bg-surface">
                    <img src={img.src} alt={img.alt} className="w-full object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <nav aria-label="More projects" className="grid grid-cols-2 border-t border-hairline">
            {prevId ? (
              <Link
                href={`/projects/${prevId}`}
                className="group flex flex-col gap-2 px-6 py-6 transition-colors hover:bg-surface/50 md:px-10"
              >
                <span className="label inline-flex items-center gap-2">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <span className="font-display text-lg tracking-tight transition-colors group-hover:text-signal md:text-2xl">
                  {projectData[prevId].title}
                </span>
              </Link>
            ) : (
              <Link
                href="/#projects"
                className="group flex flex-col gap-2 px-6 py-6 transition-colors hover:bg-surface/50 md:px-10"
              >
                <span className="label inline-flex items-center gap-2">
                  <ArrowLeft className="h-3 w-3" /> Back
                </span>
                <span className="font-display text-lg tracking-tight transition-colors group-hover:text-signal md:text-2xl">
                  All projects
                </span>
              </Link>
            )}
            {nextId ? (
              <Link
                href={`/projects/${nextId}`}
                className="group flex flex-col items-end gap-2 border-l border-hairline px-6 py-6 text-right transition-colors hover:bg-surface/50 md:px-10"
              >
                <span className="label inline-flex items-center gap-2">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-display text-lg tracking-tight transition-colors group-hover:text-signal md:text-2xl">
                  {projectData[nextId].title}
                </span>
              </Link>
            ) : (
              <Link
                href="/#projects"
                className="group flex flex-col items-end gap-2 border-l border-hairline px-6 py-6 text-right transition-colors hover:bg-surface/50 md:px-10"
              >
                <span className="label inline-flex items-center gap-2">
                  Back <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-display text-lg tracking-tight transition-colors group-hover:text-signal md:text-2xl">
                  All projects
                </span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
