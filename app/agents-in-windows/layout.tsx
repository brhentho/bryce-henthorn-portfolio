import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "Agents in Windows | Bryce Henthorn",
}

export default function AgentsInWindowsLayout({ children }: { children: React.ReactNode }) {
  return children
}
