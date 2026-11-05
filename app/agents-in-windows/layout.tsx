import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "Agents in Windows | Bryce Henthorn",
  description: "Designing a familiar return point and shared states for agent work in Windows.",
}

export default function AgentsInWindowsLayout({ children }: { children: React.ReactNode }) {
  return children
}
