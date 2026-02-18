export interface ProjectImages {
  cardImage: string
  heroImage: string
  alt: string
}

/**
 * Centralized image config for all projects.
 * Replace placeholder paths with real screenshot paths when available.
 * Images should be placed in /public/images/projects/
 */
export const projectImages: Record<string, ProjectImages> = {
  "teams-for-education": {
    cardImage: "/images/projects/teams-card-real.png",
    heroImage: "/images/projects/teams-hero-real.png",
    alt: "Teams for Education — virtual tables interface showing structured group collaboration",
  },
  recall: {
    cardImage: "/images/projects/recall-card-real.png",
    heroImage: "/images/projects/recall-hero-real.png",
    alt: "Windows Recall — semantic memory timeline showing visual search results and recalled content",
  },
  "agents-in-windows": {
    cardImage: "/images/projects/agents-card-real.png",
    heroImage: "/images/projects/agents-hero.jpg",
    alt: "Agents in Windows — Researcher agent showing multi-step task progress on the desktop",
  },
  "copilot-actions": {
    cardImage: "/images/projects/copilot-card-real.png",
    heroImage: "/images/projects/copilot-card-real.png",
    alt: "Copilot Actions — Windows desktop with blurred overlay suggesting unrevealed work",
  },
}
