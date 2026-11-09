import type { Metadata } from "next"
import { Suspense } from "react"
import { ContinuityListener } from "@/components/explore/ContinuityLink"
import { ExploreBar } from "@/components/explore/ExploreBar"
import { TreatmentProvider } from "@/components/explore/Treatment"
import "./explore.css"
import "./effects.css"

export const metadata: Metadata = {
  title: "Explorations | Bryce Henthorn",
  robots: { index: false, follow: false },
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="xp">
      <Suspense fallback={<><ExploreBar />{children}</>}>
        <TreatmentProvider>
          <ContinuityListener />
          <ExploreBar />
          {children}
        </TreatmentProvider>
      </Suspense>
    </div>
  )
}
