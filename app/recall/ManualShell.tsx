import type { ReactNode } from "react"
import { ModeToggle } from "@/components/manual/ModeToggle"
import { ProgressIndicator } from "@/components/manual/ProgressIndicator"

/**
 * Site-wide chrome wrapper for operator-manual pages. Mounts the global
 * DARK/PAPER toggle and the per-page ProgressIndicator. Both are client
 * components; the shell itself can stay server-rendered.
 *
 * Mode state is owned by next-themes (via ThemeProvider in app/layout.tsx)
 * which sets `data-mode="dark"|"paper"` on <html>. CSS in globals.css
 * resolves tokens against that attribute.
 */
export function ManualShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ModeToggle />
      <ProgressIndicator />
      {children}
    </>
  )
}
