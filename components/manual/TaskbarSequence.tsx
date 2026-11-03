"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RegistrationMark } from "./RegistrationMark"

const STEPS = [
  {
    label: "A familiar surface",
    detail: "The familiar taskbar offers a place to return to ongoing work.",
    src: "/assets/Frame 2147238301.png",
    alt: "An early taskbar concept showing application icons and activity indicators",
    width: 1302,
    height: 314,
  },
  {
    label: "Agent activity",
    detail: "Agent icons join apps in the taskbar, bringing their activity into view.",
    src: "/assets/Frame 2147238302.png",
    alt: "A taskbar concept with agent icons alongside application icons",
    width: 1302,
    height: 314,
  },
  {
    label: "Progress on demand",
    detail: "An expanded card adds progress detail without reopening the conversation.",
    src: "/images/agents/taskbar-poster.jpg",
    alt: "Researcher progress card expanded above the Windows taskbar",
    width: 760,
    height: 428,
  },
]

export function TaskbarSequence() {
  const [selected, setSelected] = useState(0)
  const sequenceRef = useRef<HTMLDivElement>(null)
  const manuallySelected = useRef(false)
  const current = STEPS[selected]

  useEffect(() => {
    const sequence = sequenceRef.current
    if (!sequence || !("IntersectionObserver" in window)) return
    const desktopMotion = window.matchMedia("(min-width: 1024px) and (min-height: 52rem) and (prefers-reduced-motion: no-preference)")
    const steps = Array.from(sequence.querySelectorAll<HTMLElement>("[data-step]"))
    const observer = new IntersectionObserver((entries) => {
      if (manuallySelected.current || !desktopMotion.matches) return
      for (const entry of entries) {
        if (entry.isIntersecting) setSelected(Number(entry.target.getAttribute("data-step")))
      }
    }, { rootMargin: "-30% 0px -45% 0px" })
    steps.forEach((step) => observer.observe(step))
    const resumeOnScroll = () => {
      if (!manuallySelected.current || !desktopMotion.matches) return
      manuallySelected.current = false
      const closest = steps.reduce((best, step) => {
        const distance = Math.abs(step.getBoundingClientRect().top + step.offsetHeight / 2 - window.innerHeight * .425)
        return distance < best.distance ? { step, distance } : best
      }, { step: steps[0], distance: Infinity })
      if (closest.step) setSelected(Number(closest.step.getAttribute("data-step")))
    }
    window.addEventListener("scroll", resumeOnScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", resumeOnScroll)
    }
  }, [])

  return (
    <div className="taskbar-sequence" ref={sequenceRef}>
      <div className="taskbar-sequence-visual">
        <figure>
          <div className="taskbar-sequence-image">
            <RegistrationMark className="absolute -top-[6px] -left-[6px]" />
            <Image key={current.src} src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(min-width: 1024px) 720px, 100vw" />
          </div>
          <figcaption className="t-mono-caption">FIG. 3.1–3.3 · Taskbar concepts and a progress card still.</figcaption>
        </figure>
      </div>
      <ol className="taskbar-sequence-steps" aria-label="Taskbar design progression">
        {STEPS.map((step, index) => (
          <li key={step.label} data-step={index}>
            <button type="button" aria-pressed={selected === index} onClick={() => { manuallySelected.current = true; setSelected(index) }}>
              <span className="t-mono-label">{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{step.label}</strong><span className="t-body-sm">{step.detail}</span></span>
            </button>
            <figure className="taskbar-mobile-figure">
              <div className="taskbar-mobile-frame">
                <RegistrationMark className="absolute -top-[6px] -left-[6px]" />
                <Image src={step.src} alt={step.alt} width={step.width} height={step.height} sizes="100vw" className={index === 2 ? "taskbar-mobile-detail" : undefined} />
              </div>
              <figcaption className="t-mono-caption">
                FIG. 3.{index + 1} · {step.detail}
                {index === 2 && <> <a href={step.src}>View full image</a></>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  )
}
