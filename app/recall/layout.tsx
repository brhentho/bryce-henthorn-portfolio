import type { Metadata } from "next"
import "./recall.css"

export const metadata: Metadata = {
  title: "Windows Recall | Bryce Henthorn",
}

export default function RecallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
