"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ModeToggle } from "@/components/manual/ModeToggle"
import { ProgressIndicator } from "@/components/manual/ProgressIndicator"

type Mode = "dark" | "paper"
const STORAGE_KEY = "recall-manual-mode"

type Props = {
  children: ReactNode
}

/**
 * Client island for the operator-manual case study. Owns the data-mode
 * attribute on the .manual wrapper and persists it in localStorage.
 *
 * SSR renders dark; localStorage is read post-mount via useEffect to avoid
 * hydration mismatches. Acceptable trade-off: a single render in dark mode
 * before swapping to paper for users with that preference stored.
 */
export function ManualShell({ children }: Props) {
  const [mode, setMode] = useState<Mode>("dark")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "dark" || stored === "paper") {
        setMode(stored)
      }
    } catch {
      // localStorage unavailable; stay on default
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [mode, hydrated])

  return (
    <div className="manual" data-mode={mode}>
      <ModeToggle mode={mode} onChange={setMode} />
      <ProgressIndicator />
      {children}
    </div>
  )
}
