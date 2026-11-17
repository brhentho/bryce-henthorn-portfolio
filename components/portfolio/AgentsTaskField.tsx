"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
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

  useEffect(() => {
    const root = ref.current
    const space = root?.querySelector<HTMLElement>(".pf-task-field__space")
    if (!root || !space || typeof IntersectionObserver === "undefined") return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pills = Array.from(space.querySelectorAll<HTMLElement>(".pf-task-position"))
    const animations: Animation[] = []
    let phase: "armed" | "playing" | "settled" = "settled"
    let frame = 0
    let visible = false
    const sync = () => {
      root.dataset.running = String(visible && phase === "settled" && !reduced.matches && !document.hidden)
    }
    const stopWatching = () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      resize.disconnect()
      cancelAnimationFrame(frame)
      frame = 0
    }
    const settle = () => {
      phase = "settled"
      delete root.dataset.reveal
      stopWatching()
      animations.forEach(animation => animation.cancel())
      sync()
    }
    const tokens = getComputedStyle(root)
    const milliseconds = (name: string) => {
      const value = tokens.getPropertyValue(name).trim()
      return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000)
    }
    const order = pills.map((_, index) => index)
    // Shuffle animation order only; positions and accessible reading order stay fixed.
    for (let index = order.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1))
      ;[order[index], order[swap]] = [order[swap], order[index]]
    }
    const reveal = () => {
      phase = "playing"
      try {
        order.forEach((index, rank) => {
          animations.push(pills[index].animate([
            { transform: "scale(0)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
          ], {
            duration: milliseconds("--duration-enter"),
            delay: rank * milliseconds("--stagger-word"),
            easing: tokens.getPropertyValue("--ease-out-expo").trim(),
            fill: "backwards",
          }))
        })
        root.dataset.reveal = "playing"
        void Promise.all(animations.map(animation => animation.finished)).then(settle, error => {
          if (!(error instanceof DOMException && error.name === "AbortError")) {
            console.warn("Task pill reveal interrupted.", error)
            settle()
          }
        })
      } catch (error) {
        console.warn("Task pill reveal could not start.", error)
        settle()
      }
    }
    const check = () => {
      frame = 0
      const rect = space.getBoundingClientRect()
      if (rect.bottom <= 0 || (phase === "playing" && rect.top >= window.innerHeight)) {
        settle()
      } else if (phase === "armed" && rect.top + rect.height / 2 <= window.innerHeight / 2) {
        if (reduced.matches || document.hidden) settle()
        else reveal()
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(check)
    }
    const resize = new ResizeObserver(schedule)
    const preferences = () => {
      if (reduced.matches) settle()
      sync()
    }
    const visibility = () => {
      if (document.hidden && phase === "playing") settle()
      sync()
    }
    const hash = () => {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target && (target.contains(root) || root.contains(target))) settle()
    }
    root.dataset.enhanced = ""
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: .1 })
    observer.observe(root)
    // Already-visible content, restored scroll and no-JS output remain fully visible.
    if (!reduced.matches && space.getBoundingClientRect().top >= window.innerHeight) {
      phase = "armed"
      root.dataset.reveal = "armed"
      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      resize.observe(space)
      hash()
    }
    document.addEventListener("visibilitychange", visibility)
    reduced.addEventListener("change", preferences)
    window.addEventListener("hashchange", hash)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", visibility)
      reduced.removeEventListener("change", preferences)
      window.removeEventListener("hashchange", hash)
      settle()
      delete root.dataset.enhanced
      delete root.dataset.running
    }
  }, [])

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
  </figure>
}
