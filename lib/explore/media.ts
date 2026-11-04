import type { Project } from "./content"

export const PROJECT_MOBILE_MEDIA = {
  agents: { src: "/explore/agents-mobile.webp", alt: "Researcher agent progress checklist." },
  recall: { src: "/explore/recall-mobile.webp", alt: "Recall search results, including a presentation with a red barn." },
  teams: { src: "/explore/teams-mobile.webp", alt: "Teams classroom group with student avatars and a raised hand." },
} satisfies Record<Project["slug"], { src: string; alt: string }>

export type ExplorationMedia = {
  src: string
  kind: "image" | "video"
  poster?: string
  alt: string
  width: number
  height: number
  position?: string
  illustrative: boolean
  credit: string
}

/** Replacement slots: preserve dimensions, alt text and provenance when swapping a source. */
export const EXPLORATION_MEDIA = {
  cinema: {
    src: "/explore/cinema-study.svg",
    kind: "image",
    alt: "Three sculptural paper surfaces: a small state marker, an open control, and a continuous return path.",
    width: 1200,
    height: 1400,
    illustrative: true,
    credit: "Original vector composition for this portfolio exploration.",
  },
  taskbar: {
    src: "/media/agents-taskbar-detail.mp4",
    kind: "video",
    poster: "/images/agents/taskbar-poster.jpg",
    alt: "Taskbar agent hover card expanding to show progress.",
    width: 1600,
    height: 900,
    illustrative: false,
    credit: "Existing portfolio taskbar demonstration.",
  },
} as const satisfies Record<string, ExplorationMedia>
