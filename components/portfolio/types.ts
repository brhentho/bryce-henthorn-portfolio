export type PortfolioPage = "agents" | "recall" | "teams" | "about"
export type ChapterLink = { id: string; label: string }
export type LedgerItem = { label: string; value: string }
export type MediaItem =
  | { kind: "image"; title: string; src: string; alt: string; width: number; height: number; caption: string }
  | { kind: "video"; title: string; src: string; poster: string; width: number; height: number; caption: string; description: string }
  | { kind: "request"; title: string; description: string; requestId: string; reason: "requested" | "clearance-needed" }

export type DecisionItem = { title: string; tradeoff: string; disposition: string; chosen?: boolean }
