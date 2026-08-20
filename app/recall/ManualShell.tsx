import type { ReactNode } from "react"
import { ScrollRevealController } from "@/components/manual/ScrollRevealController"

type Props = {
  children: ReactNode
}

/**
 * Wrapper for operator-manual pages. Mounts the .manual scope plus the
 * scroll-reveal controller. The fixed ProgressIndicator, the inline
 * § NN / TT counter, and the NOW READING chip were all retired in the 2026
 * revision — page position is carried by the header's numbered index alone.
 */
export function ManualShell({ children }: Props) {
  return (
    <div className="manual">
      <ScrollRevealController />
      {children}
    </div>
  )
}
