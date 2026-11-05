import { PROJECTS, type Project } from "@/lib/explore/content"

export const PORTFOLIO_PROJECTS: readonly (Project & { artifactStatus: string })[] = PROJECTS.map(project => {
  if (project.slug === "agents") return { ...project, proof: "Agent visibility & orchestration", artifactStatus: "Platform design / prototype" }
  if (project.slug === "recall") return { ...project, title: "Finding remembered moments—and understanding why they appeared.", artifactStatus: "Search interaction design" }
  return { ...project, title: "Restoring small-group participation to the virtual classroom.", proof: "Tested concept · classroom research", artifactStatus: "Tested concept prototype" }
})
