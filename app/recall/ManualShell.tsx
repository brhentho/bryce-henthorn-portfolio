import type { ReactNode } from "react"
import { ScrollRevealController } from "@/components/manual/ScrollRevealController"
import { NowReading } from "@/components/manual/NowReading"

type Props = {
  children: ReactNode
}

/**
 * Wrapper for operator-manual pages. Mounts the .manual scope plus NowReading
 * and the scroll-reveal controller. The § NN / TT counter now lives inline in
 * TopBar, so the fixed-position ProgressIndicator is no longer mounted here.
 */
export function ManualShell({ children }: Props) {
  return (
    <div className="manual">
      <NowReading />
      <ScrollRevealController />
      {children}
    </div>
  )
}
