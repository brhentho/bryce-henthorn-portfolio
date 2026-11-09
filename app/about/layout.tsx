import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "About | Bryce Henthorn",
  description: "Bryce Henthorn, Product Designer, Windows AI at Microsoft. Working approach, selected experience, and contact.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
