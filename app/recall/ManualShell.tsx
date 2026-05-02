import type { ReactNode } from "react"
import { ProgressIndicator } from "@/components/manual/ProgressIndicator"
import { ScrollRevealController } from "@/components/manual/ScrollRevealController"
import { NowReading } from "@/components/manual/NowReading"

type Props = {
  children: ReactNode
}

/**
 * Wrapper for operator-manual pages. Mounts the .manual scope plus the
 * orientation chrome (ProgressIndicator, NowReading) and the scroll-reveal
 * controller. Dark-only — there is no longer a paper mode.
 */
export function ManualShell({ children }: Props) {
  return (
    <div className="manual">
      <ProgressIndicator />
      <NowReading />
      <ScrollRevealController />
      {children}
    </div>
  )
}
