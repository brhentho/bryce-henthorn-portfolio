import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "Teams for Education | Bryce Henthorn",
}

export default function TeamsForEducationLayout({ children }: { children: React.ReactNode }) {
  return children
}
