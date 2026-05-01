import type { Metadata } from "next"
import "../recall/recall.css"

export const metadata: Metadata = {
  title: "About | Bryce Henthorn",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
