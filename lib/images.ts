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
    cardImage: "/images/projects/u9563819146_Wide_shot_from_the_back_of_a_classroom_a_teacher__cf6ce048-b4b7-4f34-b4e2-bbf2b606112a_2.png",
    heroImage: "/images/projects/teams-hero-real.png",
    alt: "A teacher at the front of a classroom, wide shot from the back showing spatial dynamics of in-person learning",
  },
  recall: {
    cardImage: "/images/projects/u9563819146_A_home_office_desk_with_a_computer_monitor_displa_9f40e7fb-6f59-42d7-ae72-2a94bf7af410_2.png",
    heroImage: "/images/projects/recall-hero-real.png",
    alt: "A home office desk with a computer monitor, representing the everyday context of digital memory",
  },
  "agents-in-windows": {
    cardImage: "/images/projects/u9563819146_A_person_sitting_still_at_a_minimal_desk_in_a_dar_2624f994-e120-4fe5-87c2-bec4ab024660_2.png",
    heroImage: "/images/projects/agents-hero-real.png",
    alt: "A person sitting still at a minimal desk, AI agents working autonomously in the background",
  },
  "copilot-actions": {
    cardImage: "/images/projects/copilot-card-real.png",
    heroImage: "/images/projects/copilot-card-real.png",
    alt: "Copilot Actions, Windows desktop with blurred overlay suggesting unrevealed work",
  },
}
