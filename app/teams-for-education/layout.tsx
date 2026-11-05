import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "Teams for Education | Bryce Henthorn",
  description: "A tested virtual-classroom concept exploring persistent small groups, teacher orchestration, and shared materials.",
}

export default function TeamsForEducationLayout({ children }: { children: React.ReactNode }) {
  return children
}
