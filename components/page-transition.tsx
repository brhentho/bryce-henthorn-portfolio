"use client"

import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger animation on next frame after mount
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {children}
    </div>
  )
}
