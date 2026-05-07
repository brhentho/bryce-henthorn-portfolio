"use client"

import { useEffect, useState } from "react"

/**
 * Bottom-left fixed chip showing the current section's mono label
 * (e.g. "NOW READING · § 02 / PROBLEM"). Reads label text from each
 * <section data-section>'s first .t-mono-label descendant — that's the
 * SectionLabel eyebrow or the hero's "§ 00 / OVERVIEW" line.
 *
 * Desktop only (≥1024px), aria-hidden — purely orientation chrome.
 */
export function NowReading() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    )
    if (sections.length === 0) return

    const labelMap = new Map<HTMLElement, string>()
    sections.forEach((section) => {
      const monoLabel = section.querySelector<HTMLElement>(".t-mono-label")
      const text = monoLabel?.textContent?.trim() || ""
      if (text) labelMap.set(section, text)
    })

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          )
        const top = visible[0]
        if (top) {
          const text = labelMap.get(top.target as HTMLElement)
          if (text) setLabel(text)
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-2 t-mono-caption pointer-events-none select-none"
      style={{
        opacity: label ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      <span
        className="manual-now-reading-led inline-block rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "var(--accent-trace)",
          boxShadow: "0 0 6px color-mix(in srgb, var(--accent-trace) 60%, transparent)",
        }}
      />
      <span className="text-[color:var(--text-tertiary)] leading-none">NOW READING ·</span>
      {label && (
        <span
          key={label}
          className="manual-now-reading-text text-[color:var(--text-secondary)] leading-none"
        >
          {label}
        </span>
      )}
    </div>
  )
}
