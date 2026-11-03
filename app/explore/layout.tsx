import type { Metadata } from "next"
import { ContinuityListener } from "@/components/explore/ContinuityLink"
import { ExploreBar } from "@/components/explore/ExploreBar"
import "./explore.css"

export const metadata: Metadata = {
  title: "Explorations | Bryce Henthorn",
  robots: { index: false, follow: false },
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="xp">
      <ContinuityListener />
      <ExploreBar />
      {children}
    </div>
  )
}
