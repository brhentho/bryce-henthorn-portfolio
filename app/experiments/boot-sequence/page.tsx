"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BootSequence } from "@/components/boot-sequence/BootSequence"
import { FakeHero } from "./FakeHero"

function Inner() {
  const params = useSearchParams()
  const force = params.get("force") === "1"
  const [replayKey, setReplayKey] = useState(0)

  return (
    <>
      <FakeHero />
      <BootSequence key={replayKey} force={force || replayKey > 0} />
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.removeItem("boot-sequence-played")
          } catch {
            // ignore
          }
          setReplayKey((k) => k + 1)
        }}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 100,
          padding: "8px 12px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "#FFFFFF",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.4)",
          cursor: "pointer",
        }}
      >
        ↻ REPLAY
      </button>
    </>
  )
}

export default function BootSequenceExperimentPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}
