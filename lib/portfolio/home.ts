import { PROJECTS, type Project } from "@/lib/explore/content"

export const PORTFOLIO_PROJECTS: readonly (Project & { artifactStatus: string })[] = PROJECTS.map(project => {
  if (project.slug === "agents") return {
    ...project,
    image: "/images/agents/hero-taskbar-attention.png", imageWidth: 2000, imageHeight: 1125,
    imageAlt: "Windows desktop with Copilot and Researcher taskbar previews, showing a needs-attention state",
    proof: "Agent visibility & orchestration", artifactStatus: "Platform design / prototype",
  }
  if (project.slug === "recall") return {
    ...project,
    image: "/images/recall/hero-text-matches.png", imageWidth: 2000, imageHeight: 1165,
    imageAlt: "Recall text-match results for a presentation with a red barn on a Windows desktop",
    title: "Finding remembered moments—and understanding why they appeared.", artifactStatus: "Search interaction design",
  }
  return {
    ...project,
    image: "/images/teams/hero-classroom-groups.png", imageWidth: 2000, imageHeight: 1075,
    imageAlt: "Teams classroom concept showing group rooms and the teacher's Groups management panel",
    title: "Restoring small-group participation to the virtual classroom.",
    proof: "Tested concept · classroom research", artifactStatus: "Tested concept prototype",
  }
})
