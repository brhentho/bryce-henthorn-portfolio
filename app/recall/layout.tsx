import type { Metadata } from "next"
import "./recall.css"

export const metadata: Metadata = {
  title: "Windows Recall | Bryce Henthorn",
  description: "Designing semantic search, understandable result groups, and meaningful controls for captured content.",
}

export default function RecallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
