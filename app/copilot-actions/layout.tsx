import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "Copilot Actions | Bryce Henthorn",
  description:
    "Designing how people delegate computer work and stay in control. A case study of Copilot Actions on Windows.",
  // Keep the review draft out of search until ownership and outcomes are confirmed.
  robots: { index: false, follow: false },
}

export default function CopilotActionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
