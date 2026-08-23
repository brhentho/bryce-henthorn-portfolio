"use client"

import { useEffect, useRef, useState } from "react"
import { RegistrationMark, ViewTransitionLink } from "@/components/manual"
import styles from "./editorial-motion.module.css"

type TreatmentProps = {
  number: string
  title: string
  summary: string
  replayLabel: string
  run: number
  onReplay: () => void
  children: React.ReactNode
}

function Treatment({
  number,
  title,
  summary,
  replayLabel,
  run,
  onReplay,
  children,
}: TreatmentProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || entered) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setEntered(true)
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [entered])

  return (
    <section className={styles.treatment} aria-labelledby={`treatment-${number}`}>
      <header className={styles.treatmentHeader}>
        <div>
          <p className={styles.eyebrow}>TREATMENT {number} / 02</p>
          <h2 id={`treatment-${number}`}>{title}</h2>
        </div>
        <p className={styles.summary}>{summary}</p>
      </header>

      <div
        ref={stageRef}
        className={`${styles.stage} ${entered ? styles.stageActive : styles.stageIdle}`}
        key={run}
      >
        {children}
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={onReplay} className={styles.replay}>
          <span aria-hidden="true">↻</span>
          {replayLabel}
        </button>
        <span className={styles.motionNote}>CLICK · TOUCH · KEYBOARD</span>
      </div>
    </section>
  )
}

function MechanicalAperture() {
  return (
    <article className={`${styles.plate} ${styles.aperturePlate}`}>
      <div className={styles.apertureContent}>
        <div className={styles.plateTopline}>
          <span>FIG. 04.2</span>
          <span>ASSEMBLY SEQUENCE</span>
        </div>
        <div className={styles.apertureBody}>
          <p className={styles.microLabel}>SYSTEM DIAGRAM</p>
          <h3>INTENT → ACTION</h3>
          <div className={styles.processRail} aria-label="Intent to action process">
            <span>01 / REQUEST</span>
            <i aria-hidden="true" />
            <span>02 / RESOLVE</span>
            <i aria-hidden="true" />
            <span>03 / EXECUTE</span>
          </div>
        </div>
      </div>
      <div className={`${styles.apertureShutter} ${styles.shutterLeft}`} aria-hidden="true" />
      <div className={`${styles.apertureShutter} ${styles.shutterRight}`} aria-hidden="true" />
      <RegistrationMark className={`${styles.lockMark} ${styles.lockTopLeft}`} size={16} />
      <RegistrationMark className={`${styles.lockMark} ${styles.lockBottomRight}`} size={16} />
    </article>
  )
}

function DataFlowTypography() {
  const headline = ["DESIGNING", "SYSTEMS", "THAT", "EXPLAIN", "THEMSELVES"]

  return (
    <article className={`${styles.plate} ${styles.dataPlate}`}>
      <div className={styles.dataHeader}>
        <span>DOCUMENT INDEX / 06</span>
        <div className={styles.statusStack} aria-label="Status resolves to ready">
          <span className={styles.statusIndexing}>INDEXING</span>
          <span className={styles.statusMatched}>MATCHED</span>
          <span className={styles.statusReady}>READY</span>
        </div>
      </div>
      <h3 className={styles.dataHeadline} aria-label={headline.join(" ")}>
        {headline.map((word, index) => (
          <span key={word} style={{ "--word-index": index } as React.CSSProperties}>
            {word}
          </span>
        ))}
      </h3>
      <div className={styles.dataFooter}>
        <span>BRYCE HENTHORN</span>
        <span>PRODUCT DESIGN · HUMAN–AI SYSTEMS</span>
      </div>
    </article>
  )
}

export default function EditorialMotionExperiment() {
  const [runs, setRuns] = useState([0, 0])

  function replay(index: number) {
    setRuns((current) =>
      current.map((value, itemIndex) => (itemIndex === index ? value + 1 : value))
    )
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Experiment navigation">
        <ViewTransitionLink href="/" className={styles.wordmark}>
          BH / OPS
        </ViewTransitionLink>
        <span>EXPERIMENT 02 · EDITORIAL MOTION</span>
        <ViewTransitionLink href="/" className={styles.exit}>
          EXIT LAB
        </ViewTransitionLink>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroIndex}>
          <RegistrationMark size={18} />
          <span>MOTION STUDY / 2026</span>
        </div>
        <h1>TWO WAYS TO MAKE THE MANUAL FEEL ALIVE.</h1>
        <p>
          A controlled comparison of motion treatments for the portfolio. Each
          direction preserves the same type, rules, registration marks, and
          document logic—only the behavior changes.
        </p>
        <a href="#mechanical-aperture" className={styles.begin}>
          BEGIN COMPARISON <span aria-hidden="true">↓</span>
        </a>
      </header>

      <div id="mechanical-aperture">
        <Treatment
          number="01"
          title="MECHANICAL APERTURE"
          summary="Two precise shutters expose a complete composition, then registration marks lock it into place. Best for chapter changes and major figures."
          replayLabel="REPLAY APERTURE"
          run={runs[0]}
          onReplay={() => replay(0)}
        >
          <MechanicalAperture />
        </Treatment>
      </div>

      <Treatment
        number="02"
        title="DATA-FLOW TYPOGRAPHY"
        summary="Stable language resolves left to right while system status advances from indexing to ready. Best for hero statements and proof-heavy transitions."
        replayLabel="REPLAY RESOLVE"
        run={runs[1]}
        onReplay={() => replay(1)}
      >
        <DataFlowTypography />
      </Treatment>

      <footer className={styles.footer}>
        <span>END OF STUDY</span>
        <p>TWO BEHAVIORS. ONE DOCUMENT LANGUAGE.</p>
        <ViewTransitionLink href="/">RETURN TO PORTFOLIO →</ViewTransitionLink>
      </footer>
    </main>
  )
}
