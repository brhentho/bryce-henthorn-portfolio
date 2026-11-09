"use client"

import { useId, useRef, useState, type FormEvent } from "react"
import {
  ArrowUp24Regular,
  CursorClick24Filled,
  CursorHover16Regular,
  Pause24Regular,
  RecordStop24Regular,
} from "@fluentui/react-icons"
import { nextComposerPhase, type ComposerEvent, type ComposerOption, type ComposerPhase } from "@/lib/copilot-composer"
import styles from "./composer-explorations.module.css"

const assets = "/images/copilot-actions/composer/"
const options = [
  { id: 1, title: "Most similar to current design" },
  { id: 2, title: "More in line with CMC" },
  { id: 3, title: "Don’t block composer" },
] as const

function Asset({ file }: { file: string }) {
  const largeMask = file === "2fb6e.svg" || file === "97627.svg"
  if (largeMask || file === "b93f7.svg" || file === "eedbc.svg" || file === "fe398.svg") {
    return <span aria-hidden="true" className={`${styles.mask} ${largeMask ? styles.largeMask : file === "fe398.svg" ? styles.cancelMask : ""}`} style={{ maskImage: `url("${assets}${file}")` }} />
  }
  return <img src={`${assets}${file}`} alt="" draggable={false} />
}

function Example({ option, steering, initial, message = "" }: {
  option: ComposerOption
  steering: boolean
  initial: ComposerPhase
  message?: string
}) {
  const [phase, setPhase] = useState(initial)
  const [draft, setDraft] = useState(message)
  const [pristine, setPristine] = useState(true)
  const [announcement, setAnnouncement] = useState("")
  const panel = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const id = useId()
  const paused = phase === "paused"
  const editable = paused || (phase === "running" && option === 3)
  const status = paused ? (option === 1 && !steering ? "Action stopped" : "Action paused") : "Browsing for you"
  const label = initial === "control" ? "Took control" : initial === "stopped" ? "Stopped" : initial === "paused" ? (option === 1 && !steering ? "Stopped" : "Paused") : "Running"

  function act(event: ComposerEvent) {
    if (event === "send" && !draft.trim()) {
      input.current?.focus()
      return
    }
    const next = nextComposerPhase(phase, event, option, draft)
    setPhase(next)
    setPristine(false)
    setAnnouncement(event === "send" ? "Instruction submitted in this local example. Nothing was sent to an agent." :
      next === "ended" ? "End of the supplied flow. Reset examples to return to the reference." :
      next === "control" ? "You’re in control in this local example." :
      next === "running" ? "Example resumed." : "Example interrupted. Choose how to continue.")
    if (event === "send") setDraft("")
    // The activated control may disappear when the surface changes.
    requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    act("send")
  }

  const takeControl = (subtle = false) => (
    <button type="button" className={subtle ? styles.chip : styles.strong} onClick={() => act("take-control")}>
      {subtle ? <CursorHover16Regular aria-hidden /> : <Asset file="97627.svg" />}<span>Take control</span>
    </button>
  )
  const resume = (subtle = false) => (
    <button type="button" className={subtle ? styles.defaultButton : styles.strong} onClick={() => act("resume")}>
      <Asset file={subtle ? "c4d3d.svg" : "2fb6e.svg"} /><span>Resume</span>
    </button>
  )
  const end = (
    <button type="button" className={styles.defaultButton} aria-label="Stop action (end this example)" onClick={() => act("cancel")}>
      <Asset file="6c62c.svg" />
    </button>
  )

  return (
    <div className={styles.example} data-example={`${option}-${initial}${message ? "-filled" : ""}`}>
      <p className={styles.stateLabel} id={id}>{label} example</p>
      <div ref={panel} tabIndex={-1} role="group" aria-labelledby={id} className={styles.surfaceFocus} data-phase={phase}>
        {phase === "ended" ? (
          <p className={styles.endNote}>End of the supplied flow. No completion or cancellation screen was provided. Reset examples to return to the reference.</p>
        ) : phase === "control" ? (
          <div className={`${styles.composer} ${styles.takeover}`}>
            <div className={styles.statusRow}>
              <span className={styles.status}>
                <img className={styles.avatar} src={`${assets}fc579.png`} alt="" width={24} height={24} />
                You’re in control
              </span>
              {resume()}
            </div>
          </div>
        ) : phase === "stopped" ? (
          <div className={`${styles.composer} ${styles.stopped}`}>
            <h4>Action stopped</h4>
            <p>This action is not currently running. Continue or take control of action?</p>
            <div className={styles.stopChoices}>
              <button type="button" className={styles.defaultButton} onClick={() => act("resume")}>Resume action</button>
              <button type="button" className={styles.strong} onClick={() => act("take-control")}>Take control</button>
              <button type="button" className={styles.cancelText} onClick={() => act("cancel")}>Cancel action</button>
            </div>
          </div>
        ) : (
          <form className={styles.composer} onSubmit={submit}>
            <div className={styles.statusRow}>
              <span className={styles.status}>
                {paused ? (option === 1 && !steering ? <RecordStop24Regular aria-hidden /> : <Pause24Regular aria-hidden />) : <CursorClick24Filled aria-hidden />}
                <span>{status}</span>
              </span>
              {option !== 2 ? takeControl() : paused ? <div className={styles.controls}>{resume()}{end}</div> : null}
            </div>
            <div className={styles.inner}>
              <div className={styles.input} data-pristine={pristine} data-disabled={!editable}>
                <textarea
                  ref={input}
                  aria-label="Message Copilot"
                  placeholder="Message Copilot"
                  value={draft}
                  disabled={!editable}
                  rows={1}
                  onChange={event => { setDraft(event.target.value); setPristine(false) }}
                  onKeyDown={event => {
                    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                      event.preventDefault()
                      act("send")
                    }
                  }}
                />
                {pristine && <span className={styles.inputReference} aria-hidden="true">
                  {!draft && <Asset file="6bc7b.svg" />}
                  {draft || "Message Copilot"}
                  {draft && <Asset file="6bc7b.svg" />}
                </span>}
              </div>
              <div className={styles.toolbar}>
                <div className={styles.controls}>
                  {option === 2 ? takeControl(true) : option === 1 && paused ? <>{end}{resume(true)}</> :
                    option === 3 && steering ? <button type="button" className={`${styles.chip} ${styles.cancelText}`} onClick={() => act("interrupt")}><Asset file="fe398.svg" />Cancel</button> :
                      <span className={styles.chip} aria-disabled="true"><Asset file="dd37d.svg" />Action</span>}
                </div>
                <div className={styles.controls}>
                  {editable && (paused || steering || draft.trim()) && <>
                    <button className={styles.iconButton} type="button" aria-label="Add attachment (not part of this example)" disabled><Asset file="b93f7.svg" /></button>
                    <button className={styles.iconButton} type="button" aria-label="Microphone (not part of this example)" disabled><Asset file="eedbc.svg" /></button>
                  </>}
                  {editable && draft.trim() ? (
                    <button type="submit" className={`${styles.iconButton} ${styles.send}`} aria-label="Send redirect message"><ArrowUp24Regular aria-hidden /></button>
                  ) : !paused && !(option === 3 && steering) ? (
                    <button type="button" className={styles.iconButton} aria-label={option === 2 ? "Pause action" : "Stop to choose next action"} onClick={() => act("interrupt")}>
                      {option === 2 ? <span className={styles.pauseIcon}><Asset file="c3217.svg" /><span className={styles.pauseBars} aria-hidden="true" /></span> : <Asset file="549c3.svg" />}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <span className="sr-only" role="status">{announcement}</span>
    </div>
  )
}

function Board({ steering }: { steering: boolean }) {
  const [revision, setRevision] = useState(0)
  return (
    <>
      <div className={styles.board} data-composer-board={steering ? "steering" : "placement"} key={revision}>
        <div className={styles.boardContent}>
          {options.map(option => (
            <div className={styles.option} key={option.id} data-option={option.id}>
              <h3>Option {option.id}: {option.title}</h3>
              <div className={styles.samples}>
                <Example option={option.id} steering={steering} initial="running" message={option.id === 3 && steering ? "Redirect message from customer" : ""} />
                <Example option={option.id} steering={steering} initial={option.id === 3 && !steering ? "stopped" : "paused"} message={option.id !== 3 && steering ? "Redirect message" : ""} />
                {option.id !== 3 ? <Example option={option.id} steering={steering} initial="control" /> :
                  steering ? <Example option={3} steering initial="stopped" /> : null}
                {option.id === 3 && steering && <>
                  <Example option={3} steering initial="running" />
                  <Example option={3} steering initial="running" message="Redirect message from customer" />
                </>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className={styles.reset} onClick={() => setRevision(value => value + 1)}>Reset examples</button>
    </>
  )
}

export function ComposerExplorations() {
  return (
    <figure className={`pf-media ${styles.explorations}`}>
      <p className={styles.instructions}>
        Explore the controls below. Each example is independent and runs locally;
        nothing operates your computer or sends a message. Attachment and microphone
        controls are visual context only.
      </p>
      <details className={styles.boardDisclosure} open>
        <summary>Control placement <span>First exploration</span></summary>
        <Board steering={false} />
      </details>
      <details className={styles.boardDisclosure}>
        <summary>Steering in context <span>Second exploration</span></summary>
        <Board steering />
      </details>
      <noscript><p>Interactive examples require JavaScript. Both boards and their reference states remain readable above.</p></noscript>
    </figure>
  )
}
