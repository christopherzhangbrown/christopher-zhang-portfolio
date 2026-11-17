import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, X } from "lucide-react"
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
    problem: "Diving coaches film every practice, but the footage piles up as untitled clips on an iPad. Finding one diver's last few attempts at a 105B means scrolling a camera roll, so the video rarely gets used after the moment it was shot.",
    built: "DiveVolt is the whole coaching loop for a diving team. On deck, an iPad on a tripod plays every dive on the pool TV a few seconds after the diver lands. Tap Keep and the clip is saved, its dive code read from the video, and filed into that diver's folder by dive group and board. After practice, coaches step through it frame by frame, draw on it, line it up against an earlier attempt or an elite dive, and send the diver a private link. I built all of it: the iPhone and iPad app, the web app coaches use on a laptop, the ops site, and the pose and analysis pipeline behind them. It's live at divevolt.com and has been piloted with the Brown diving team.",
    demo: [
      {
        src: "/DiveVolt/divevolt-review.jpg",
        alt: "DiveVolt review screen: a 105B forward two-and-a-half pike from 3 m paused at the top of the dive, a skeleton drawn on the diver, and a panel showing height off the board, hip angle and knee angle against their target ranges",
        caption: "Paused at the top of a 105B. The pike is measured on the frame and checked against where it should be.",
      },
      {
        src: "/DiveVolt/divevolt-compare.jpg",
        alt: "DiveVolt compare view: two of the same diver's 105B attempts side by side, both paused at the top of the dive, with the note “Lined up at hurdle, takeoff, top, entry”",
        caption: "Two attempts a week apart, lined up automatically at hurdle, takeoff, top and entry.",
      },
      {
        src: "/DiveVolt/divevolt-folder.jpg",
        alt: "A diver's folder in DiveVolt: 74 clips grouped into Front, Back, Gainer, Inward and Twister, with a 1 m / 3 m filter",
        caption: "Each diver's folder, grouped by dive and filtered by board.",
      },
    ],
    architecture: [
      "Next.js 15 on Vercel → Neon Postgres + private Vercel Blob, one codebase for the web app, the Capacitor iPhone/iPad shell, and ops.divevolt.com",
      "Modal workers: ffmpeg (playback copy, finding the dive in a long clip) and the pose pass (YOLOX detection, RTMPose-x, a flight solver)",
      "Deterministic TypeScript engine reads keypoints into the dive code, checkpoints and measurements",
      "Middleware splits hosts, so the admin pages don't exist on the coach app's address",
    ],
    architectureNotes: [
      "The iOS app is a Capacitor shell around the same Next.js app, plus one native Swift plugin. It drives the second screen: with a TV connected over AirPlay or HDMI, the TV shows only the replay while the iPad keeps the controls. Everything else ships with a normal web deploy, so a fix reaches the iPad, the laptop and the diver's link together.",
      "The pose pass and the transcoder are separate Modal apps behind a shared secret, and dev refuses to send footage to the live pose app unless explicitly overridden. The ops site reads Modal's bill back per month, per day and per clip, so I can see what each clip costs to analyse.",
    ],
    engineering: [
      {
        title: "Instant replay without a replay box",
        body: "Replay mode records the camera as fragmented MP4 with MediaRecorder and plays it back through MediaSource, a set number of seconds behind live. Tapping Keep stitches the fragments from just before the tap into a normal MP4 and queues it for upload, so a coach can decide to save a dive after watching it, not before.",
      },
      {
        title: "Following a diver who is upside down",
        body: "Pose models assume people are upright, so in the air each frame is posed on a crop rotated until the diver looks upright, keeping the most confident skeleton that joins up with the last one. The flight itself is solved as one gravity parabola, fit with RANSAC over every moving blob and detector box. After the tracker once followed a teammate onto the mats beside the pool, each new pick also has to stay close to the last confirmed position, stay about the same size, and fall with the curve.",
      },
      {
        title: "Reading the dive code blind",
        body: "The code is read from the pose alone. The clip's existing label is never a hint, and auto-sort and its accuracy script call the same function, so the score measures exactly what the app files. When the read isn't sure, the Tag screen says “Looks like 303B” and the coach confirms with one tap instead of typing.",
      },
      {
        title: "Hiding a number instead of guessing",
        body: "Every measurement says whether tracking was clear or so-so. A number is hidden, with the reason, when tracking is unsure (tucks, blur, splash) or the dive's timing is physically impossible. Each clip also records where the camera stood, and measurements that position could distort get a caveat or are dropped. Compare warns when two clips were filmed from different spots.",
      },
      {
        title: "Footage of teenagers, handled like it",
        body: "Before upload, the phone blanks the video's GPS, make and model in place without re-encoding. A per-diver consent box gates both share links and sending footage to the pose service. Diver links are private and revocable. Native 120 and 240 fps slow motion is stored as filmed, and big files go up in parts that retry without duplicating.",
      },
    ],
    research: [
      {
        question: "How often does it get the dive right?",
        answer: "On 32 clips with a known dive number (three Brown 3 m dives plus elite and college footage), the engine named 25 correctly. Five of the seven misses were refusals: filmed from the stands with people in the way, the tracker lost the diver and said so rather than guessing. Twisting dives are flagged low confidence because a side camera sees twists poorly.",
      },
      {
        question: "Where do the checkpoints come from?",
        answer: "They're objective positions, not grades: thigh about 90° to the trunk in the hurdle, the shape the dive code's letter names (pike, tuck or straight), and an entry within 5° of vertical. Only the checkpoints that apply to the dive are shown, and the sources are written up in the repo's research notes.",
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
      { src: "/AI-Job-Agent/AI-Job-Resume.png", alt: "AI Job Hunting Agent resume editor, split view" },
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

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projectData[id]

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AmbientBackground />
        <Nav />
        <div className="relative z-10 px-6 pb-12 pt-28">
          <div className="mx-auto max-w-5xl">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <p className="mt-10 text-sm text-muted-foreground">Project not found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientBackground />
      <Nav />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-28">
        <div className="mx-auto my-12 max-w-5xl border border-hairline bg-background">
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

            {project.built && (
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 label">What I built</div>
                <p className="col-span-12 md:col-span-9 leading-relaxed text-muted-foreground">{project.built}</p>
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
                  <p key={n} className="leading-relaxed text-muted-foreground">{n}</p>
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
                      <p className="mt-2 leading-relaxed text-muted-foreground">{e.body}</p>
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
                      <p className="mt-2 leading-relaxed text-muted-foreground">{r.answer}</p>
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

            <div className="mt-16">
              {project.gallery.slice(1).map((img) => (
                <div key={img.src} className="w-full max-w-5xl border border-hairline bg-surface overflow-hidden mt-6">
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
