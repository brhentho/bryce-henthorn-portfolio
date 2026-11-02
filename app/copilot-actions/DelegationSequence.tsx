"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"
import styles from "./copilot-actions.module.css"

const STAGES = [
  { label: "Delegate", question: "What am I handing over?", detail: "Make the task and the access it needs understandable before work begins.", responsibility: "Intent → authorized task", focus: "Scope & permission" },
  { label: "Observe", question: "What is happening now?", detail: "Keep the task recognizable while the agent works, with enough context to decide whether to check in.", responsibility: "Agent works · person stays informed", focus: "Progress & context" },
  { label: "Intervene", question: "What does it need from me?", detail: "Make a request for help specific. Distinguish answering a question from taking direct control.", responsibility: "Agent encounters a boundary → person decides", focus: "Handoff & control" },
  { label: "Review", question: "What changed?", detail: "Make the result understandable so the person can assess the work and decide what to do next.", responsibility: "Agent output → human judgment", focus: "Result & next step" },
]

export function DelegationSequence() {
  const [active, setActive] = useState(0)
  const id = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const stage = STAGES[active]

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === "ArrowDown") next = (index + 1) % STAGES.length
    else if (event.key === "ArrowUp") next = (index - 1 + STAGES.length) % STAGES.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = STAGES.length - 1
    else return
    event.preventDefault()
    setActive(next)
    buttons.current[next]?.focus()
  }

  return (
    <div className={styles.sequence}>
      <div className={styles.stageRail} role="tablist" aria-label="Delegation stages" aria-orientation="vertical">
        {STAGES.map((item, index) => (
          <button
            key={item.label}
            ref={(element) => { buttons.current[index] = element }}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span className="t-mono-label">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.label}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className={styles.stagePanel}>
        <p className="t-mono-label">{stage.focus}</p>
        <h3 className="t-h1">{stage.question}</h3>
        <p className="t-body">{stage.detail}</p>
        <p className={`t-mono-caption ${styles.responsibility}`}>{stage.responsibility}</p>
      </div>
    </div>
  )
}
