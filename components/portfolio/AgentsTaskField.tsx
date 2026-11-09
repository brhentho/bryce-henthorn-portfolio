"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import "../../app/portfolio-task-field.css"

const tasks = [
  { id: "github", label: "Implement accordian", provider: "GitHub", icon: "/assets/agents/Github.png", width: 29, height: 29 },
  { id: "outreach", label: "New client outreach", provider: "Outreach agent", icon: "outreach.svg", width: 24, height: 24 },
  { id: "ticket", label: "Respond to ticket #412", provider: "Ticket agent", icon: "ticket.png", width: 24, height: 24 },
  { id: "finance", label: "Create spreadsheet", provider: "Finance agent", icon: "finance.svg", width: 27.9167, height: 27.9167 },
  { id: "research", label: "Design trends 2026", provider: "Research agent", icon: "research.svg", width: 24, height: 24 },
  { id: "copilot", label: "Rewrite file intro", provider: "Copilot", icon: null, width: 37, height: 37 },
] as const

const copilotLayers = [
  { name: "top", width: 16.114, height: 13.1029, x: 16.033, y: 1.809 },
  { name: "bottom", width: 15.6359, height: 12.9777, x: 4.282, y: 21.211 },
  { name: "left", width: 23.1278, height: 23.8958, x: -.504, y: 1.812 },
  { name: "right", width: 23.1278, height: 23.8958, x: 13.376, y: 10.292 },
] as const

function CopilotIcon() {
  return <span className="pf-task-copilot" aria-hidden="true">
    {copilotLayers.map(layer => <span key={layer.name} style={{ left: `${layer.x / 37 * 100}%`, top: `${layer.y / 37 * 100}%`, width: `${layer.width / 37 * 100}%`, height: `${layer.height / 37 * 100}%` }}>
      <Image src={`/images/agents/task-pills/copilot-${layer.name}.svg`} alt="" width={layer.width} height={layer.height} />
    </span>)}
  </span>
}

export function AgentsTaskField() {
  const ref = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = false
    const sync = () => {
      root.dataset.running = String(visible && !paused && !reduced.matches && document.visibilityState === "visible")
    }
    root.dataset.enhanced = ""
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: .1 })
    observer.observe(root)
    document.addEventListener("visibilitychange", sync)
    reduced.addEventListener("change", sync)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", sync)
      reduced.removeEventListener("change", sync)
      root.dataset.running = "false"
    }
  }, [paused])

  return <figure ref={ref} className="pf-task-field" aria-label="Illustrative tasks scattered across agents">
    <ul className="pf-task-field__space" aria-label="Examples of distributed work">
      {tasks.map(task => <li key={task.id} className={`pf-task-position pf-task-position--${task.id}`}>
        <div className="pf-task-pill">
          <span className="pf-task-icon">
            {task.icon ? <Image src={task.icon.startsWith("/") ? task.icon : `/images/agents/task-pills/${task.icon}`} alt="" width={task.width} height={task.height} />
              : <CopilotIcon />}
          </span>
          <span className="sr-only">{task.provider}: </span>
          <span className="pf-task-label">{task.label}</span>
        </div>
      </li>)}
    </ul>
    <div className="pf-task-field__controls">
      <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </div>
  </figure>
}
