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
    cardImage: "/images/projects/Teams for EDU project card.png",
    heroImage: "/images/projects/teams-hero-real.png",
    alt: "A teacher at the front of a classroom, wide shot from the back showing spatial dynamics of in-person learning",
  },
  recall: {
    cardImage: "/images/projects/Recall project card.png",
    heroImage: "/images/projects/recall-hero-real.png",
    alt: "A home office desk with a computer monitor, representing the everyday context of digital memory",
  },
  "agents-in-windows": {
    cardImage: "/images/projects/Agents project card.png",
    heroImage: "/images/projects/agents-hero-real.png",
    alt: "A person sitting still at a minimal desk, AI agents working autonomously in the background",
  },
  "copilot-actions": {
    cardImage: "/images/projects/copilot-card-real.png",
    heroImage: "/images/projects/copilot-card-real.png",
    alt: "Copilot Actions, Windows desktop with blurred overlay suggesting unrevealed work",
  },
}
