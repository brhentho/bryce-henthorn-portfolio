/**
 * Shared content for the /explore directions.
 *
 * Portfolio copy is lifted from the production pages (app/page.tsx and
 * app/agents-in-windows/page.tsx). The directions must differ in design
 * and interaction only — never in claims. Do not add metrics, findings,
 * shipped functionality, or ownership statements that production does not make.
 */

export type DirectionId = "direction-a" | "direction-b" | "direction-c" | "direction-d" | "direction-e" | "direction-f"

export const DIRECTIONS: {
  id: DirectionId
  letter: string
  name: string
  idea: string
}[] = [
  {
    id: "direction-a",
    letter: "A",
    name: "Layered editorial",
    idea: "The editorial document, given physical depth: type, imagery and annotation on separate planes.",
  },
  {
    id: "direction-b",
    letter: "B",
    name: "Project destinations",
    idea: "Each project is a place. A persistent dial and a growing porthole carry you between them.",
  },
  {
    id: "direction-c",
    letter: "C",
    name: "Spatial story",
    idea: "You move through the work: scattered windows converge into one taskbar you can operate.",
  },
  {
    id: "direction-d",
    letter: "D",
    name: "Cinema",
    idea: "An art-directed visual essay. Expansive images, intimate details, and a filmstrip you direct.",
  },
  {
    id: "direction-e",
    letter: "E",
    name: "Working model",
    idea: "The product is the argument. Operate the interface, then inspect the decisions behind it.",
  },
  {
    id: "direction-f",
    letter: "F",
    name: "Design atlas",
    idea: "A map of decisions and evidence. Trace the thinking, or go directly to the artifact.",
  },
]

export const PERSON = {
  name: "Bryce Henthorn",
  role: "Product Designer, Windows AI",
  email: "bhenthorn2757@gmail.com",
  location: "Seattle, WA",
  statement: "I turn complex systems into trustworthy experiences.",
  secondary: "Designing AI agents and enterprise workflows for Windows at Microsoft.",
  thesis:
    "Complex systems become trustworthy when people can understand what is happening and act on it.",
  thesisBody:
    "My work makes system behavior legible: clarifying state, exposing meaningful control, and turning technical constraints into product decisions teams can carry forward.",
  principles: [
    { label: "State", statement: "Show what the system is doing." },
    { label: "Control", statement: "Put the next meaningful action in reach." },
    { label: "Trust", statement: "Expose why an outcome appeared." },
  ],
}

export type Project = {
  slug: "agents" | "recall" | "teams"
  name: string
  years: string
  title: string
  proof: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  atmosphere: string
  /** Tone used by directions that shift the environment per project. */
  tone: { base: string; lift: string; glow: string }
  /** Production case study (Recall and Teams are not re-explored here). */
  productionHref: string
}

export const PROJECTS: Project[] = [
  {
    slug: "agents",
    name: "Agents in Windows",
    years: "2025–",
    title: "Making AI agents visible and interruptible in Windows.",
    proof: "Design lead · 3 teams",
    image: "/images/agents/hero-demo.png",
    imageAlt:
      "Windows desktop with a Researcher agent panel showing a checklist of in-progress sub-tasks",
    imageWidth: 2240,
    imageHeight: 884,
    atmosphere: "/images/heroes/AgentsInWindowsHero.jpg",
    tone: { base: "#070B14", lift: "#0E1A33", glow: "#3B7BE0" },
    productionHref: "/agents-in-windows",
  },
  {
    slug: "recall",
    name: "Windows Recall",
    years: "2023–25",
    title: "Designing semantic search for everything you’ve seen.",
    proof: "Search design · relevance & privacy",
    image: "/images/recall/hero-demo.png",
    imageAlt: "Recall app on a Windows desktop, search results page with multiple match cards",
    imageWidth: 1120,
    imageHeight: 442,
    atmosphere: "/images/heroes/Recallhero.jpg",
    tone: { base: "#0D0712", lift: "#24102C", glow: "#B04BD0" },
    productionHref: "/recall",
  },
  {
    slug: "teams",
    name: "Teams for Education",
    years: "2020–21",
    title: "Modernizing online classes for an authentic virtual experience.",
    proof: "Design lead · classroom research",
    image: "/images/teams/hero-demo.png",
    imageAlt:
      "Microsoft Teams classroom view. Virtual tables of students with avatars and chat moderation panel.",
    imageWidth: 1120,
    imageHeight: 442,
    atmosphere: "/images/heroes/TeamsProjectHero.jpg",
    tone: { base: "#0B0B0C", lift: "#1A1712", glow: "#D49B3D" },
    productionHref: "/teams-for-education",
  },
]

export const AGENTS = {
  eyebrow: "Case study · Agents in Windows",
  title: "Making AI agents visible and interruptible in Windows.",
  lede: "Agent work was scattered across apps and notifications, with no way to see it or step in.",
  call: "We anchored agents to the taskbar with one shared set of states.",
  ledger: [
    { label: "Role", value: "Lead designer, agent visibility & orchestration" },
    { label: "Team", value: "3 engineering partner teams" },
    { label: "Platform", value: "Windows 11 shell, taskbar, Ask Copilot" },
    { label: "Years", value: "2025–present" },
  ],
  hero: {
    src: "/images/agents/hero-demo.png",
    alt: "Windows desktop with a Researcher agent panel showing a checklist of in-progress sub-tasks",
    width: 2240,
    height: 884,
  },
  context: {
    title: "Windows needed a place for agents to live",
    body: [
      "Right now agents scatter across the system. Some hide inside apps. Some show up in Copilot chats. Others surface as notifications. No one knows where their work actually lives. The OS level is where this fragmentation breaks. Windows needed to be the place where agents became visible, manageable, and trustworthy.",
      "I led the core design work alongside partner teams across Microsoft, mapping the entire lifecycle of how agents would operate in the OS, then building a system stable enough to ship but flexible enough to evolve.",
    ],
    figure: {
      src: "/images/agents/context-desktop.png",
      alt: "Windows desktop with agent taskbar concept",
      width: 1175,
      height: 726,
      caption: "Windows desktop with agent taskbar concept",
    },
  },
  problem: {
    thesis: "People don’t fear automation. They fear not knowing.",
    body: [
      "Agents scattered everywhere. Inside apps, buried in chat history, coming through notifications. Users had no idea where their work actually was or if anything was still running. Fragments. No coherent picture.",
      "Early interviews hit a consistent note. Users liked having help. What they hated was surprises. They wanted to know what was happening, where it was happening, when it’d be done. They didn’t distrust automation itself. They distrusted invisibility.",
    ],
    fragmented: {
      label: "Fragmented",
      src: "/images/agents/problem-fragmentation.png",
      alt: "Fragmented agent experience across multiple windows",
      width: 732,
      height: 367,
      caption: "Fragmentation across apps. Windows has no insight into what is running within each window.",
    },
    visible: {
      label: "Observable",
      src: "/images/agents/problem-observability.png",
      alt: "Windows with unified agent observability",
      width: 732,
      height: 367,
      caption: "Windows extends for agent observability. Consistent patterns for monitoring and management.",
    },
  },
  decision: {
    title: "Anchoring to what users already know",
    body: [
      "We tested three directions. Keep agents inside the apps that spawn them. Pin them independently like applications. Or create a dedicated agent workspace. Each had problems. Some felt bloated for something that barely existed yet. Others made agents too cryptic about where they actually were and how to get back to them.",
      "Agents are genuinely new, but they don’t have to feel alien. We pushed for a progressive approach. Build on something users already use every day rather than forcing them to memorize a new system. We anchored agents to the taskbar. Same place apps live. Same behaviors. But with new states and signals that reflect how agents work.",
    ],
    options: [
      {
        code: "01",
        option: "Inside the originating app",
        tradeoff: "Agent work remains fragmented across the apps that start it.",
        disposition: "Move visibility to the OS.",
        chosen: false,
      },
      {
        code: "02",
        option: "Independent taskbar pin",
        tradeoff: "A familiar return point, but progress needs a shared state language.",
        disposition: "Chosen foundation: familiar location, new states.",
        chosen: true,
      },
      {
        code: "03",
        option: "Dedicated agent workspace",
        tradeoff: "Adds another place to learn and manage before the interaction model is established.",
        disposition: "Keep the initial model progressive.",
        chosen: false,
      },
    ],
  },
  keyframes: [
    {
      label: "Empty pin",
      detail: "A familiar return point exists before work starts.",
      src: "/assets/Frame 2147238301.png",
      alt: "Taskbar evolution keyframe 1 — agent pinned to the taskbar with no active work",
    },
    {
      label: "Active state",
      detail: "The pin communicates ongoing work without requiring the app to stay open.",
      src: "/assets/Frame 2147238302.png",
      alt: "Taskbar evolution keyframe 2 — pinned agent showing an in-progress state indicator",
    },
    {
      label: "Hover card expanded",
      detail: "Progress detail appears on demand, keeping the taskbar compact.",
      src: "/assets/Frame 2147238303.png",
      alt: "Taskbar evolution keyframe 3 — hover card expanded from the taskbar icon showing step detail",
    },
  ],
  keyframeSize: { width: 651, height: 155 },
  taskbar: {
    title: "The taskbar becomes a window into agent work",
    body: [
      "Agents pin to the taskbar just like apps do. Invoke one and it appears as an icon. Familiar. Clear that something’s working. The metaphor works. But agents don’t behave like apps. They move through states: planning, executing, waiting, done.",
      "The real challenge was fitting agent progress into taskbar space. Agents from different providers send different outputs and different cadences. Some stream step-by-step. Some go silent. We built hover cards that expand from the icon to show progress in detail.",
    ],
    video: "/media/agents-taskbar-detail.mp4",
    poster: "/images/agents/taskbar-poster.jpg",
    videoLabel: "Taskbar agent hover card expanding to show progress",
    videoCaption:
      "The expanded hover card makes the current step inspectable without reopening the conversation.",
  },
  states: [
    { key: "running", src: "/assets/agents/Running agent.svg", label: "Running" },
    { key: "attention", src: "/assets/agents/Needs attention agent.svg", label: "Needs attention" },
    { key: "completed", src: "/assets/agents/Completed agent.svg", label: "Completed" },
    { key: "failed", src: "/assets/agents/Failed agent.svg", label: "Failed" },
    { key: "paused", src: "/assets/agents/Paused agent.svg", label: "Paused" },
  ],
  simulation: {
    title: "See the state. Take control. Return to the work.",
    disclaimer:
      "Interactive portfolio simulation using the published state icons. These controls illustrate the design intent; they do not operate Windows.",
  },
  impact: {
    title: "From invisible to interruptible",
    quote:
      "We had to tell teams ‘no’ to custom experiences so we could promise users a predictable system.",
    body: [
      "I led the visibility and orchestration design across three engineering partner teams. The work defined a shared way for agents to appear, report progress, and request help through Windows surfaces.",
      "The platform work is ongoing. The evidence here is the shared interaction language, shell prototypes, and collaboration across three partner teams.",
    ],
    figure: {
      src: "/images/agents/impact-stage.png",
      alt: "Agents in Windows presented on stage",
      width: 1861,
      height: 1045,
      caption:
        "Public presentation of Agents in Windows. The stage image documents the announcement; the interaction artifacts explain the design work.",
    },
    facts: [
      { value: "5", unit: "states", label: "Running, attention, completed, failed, paused" },
      { value: "3", unit: "teams", label: "Engineering partner teams" },
      { value: "Q", unit: "cadence", label: "Quarterly OS shipping cycle" },
    ],
  },
} as const

export function caseHref(direction: DirectionId) {
  return `/explore/${direction}/agents-in-windows`
}

export function homeHref(direction: DirectionId) {
  return `/explore/${direction}`
}
