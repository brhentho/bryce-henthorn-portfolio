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
    cardImage: "/images/projects/teams-hero-real.png",
    heroImage: "/images/projects/teams-hero-real.png",
    alt: "Teams for Education — virtual tables interface showing structured group collaboration",
  },
  recall: {
    cardImage: "/images/projects/recall-card.jpg",
    heroImage: "/images/projects/recall-hero.jpg",
    alt: "Windows Recall — semantic memory cards showing visual search results",
  },
  "agents-in-windows": {
    cardImage: "/images/projects/agents-card.jpg",
    heroImage: "/images/projects/agents-hero.jpg",
    alt: "Agents in Windows — taskbar presence and hover summary for AI agents",
  },
  "copilot-actions": {
    cardImage: "/images/projects/copilot-card.jpg",
    heroImage: "/images/projects/copilot-hero.jpg",
    alt: "Copilot Actions — taskbar entry points for cross-app actions",
  },
}
