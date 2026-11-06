import { useId } from "react"
import "../../app/portfolio-diagrams.css"

const work = [
  { context: "App", state: "Running", shape: "square" },
  { context: "Conversation", state: "Needs attention", shape: "circle" },
  { context: "Notification", state: "Completed", shape: "hexagon" },
] as const

type Work = (typeof work)[number]

function WorkMark({ shape, compact = false, tail = false, head = false, attention = false }: {
  shape: Work["shape"]; compact?: boolean; tail?: boolean; head?: boolean; attention?: boolean
}) {
  return <svg viewBox="0 0 80 80" aria-hidden="true"
    className={`pf-visibility-mark${compact ? " pf-visibility-mark--compact" : ""}${attention ? " pf-visibility-mark--attention" : ""}`}>
    {tail && <path className="pf-visibility-mark__link" d="M40 66v14" />}
    {head && <path className="pf-visibility-mark__link" d="M40 0v16" />}
    {shape === "square" && <>
      <rect className="pf-visibility-mark__surface" x="14" y="14" width="52" height="52" rx="12" />
      <path className="pf-visibility-mark__detail" d="M28 30h24M28 40h24M28 50h14" />
    </>}
    {shape === "circle" && <>
      <circle className="pf-visibility-mark__surface" cx="40" cy="40" r="28" />
      <path className="pf-visibility-mark__detail" d="M27 34h26M27 46h18" />
    </>}
    {shape === "hexagon" && <>
      <path className="pf-visibility-mark__surface" d="M26 12h28l20 28-20 28H26L6 40Z" />
      <circle className="pf-visibility-mark__detail" cx="40" cy="40" r="5" />
    </>}
  </svg>
}

function WorkContext({ item, shared = false }: { item: Work; shared?: boolean }) {
  return <div className={`pf-visibility-origin pf-visibility-origin--${item.shape}`}>
    <p className="pf-visibility-origin__name">{item.context}</p>
    <WorkMark shape={item.shape} tail={shared} />
    {!shared && <p className="pf-visibility-origin__state">{item.state}</p>}
  </div>
}

function ComparisonFigure({ shared }: { shared: boolean }) {
  const id = useId()
  return <figure className={`pf-visibility-figure${shared ? " pf-visibility-figure--shared" : ""}`}
    aria-labelledby={`${id}-heading`} aria-describedby={`${id}-description`}>
    <h3 id={`${id}-heading`} className="pf-visibility-heading">{shared ? "Shared visibility" : "Scattered visibility"}</h3>
    <p id={`${id}-description`} className="sr-only">
      {shared
        ? "The same work stays in separate contexts. Windows provides a common visibility layer: app work is running, conversation work needs attention, and notification work is completed. Matching shapes and individual lines associate each context with its own state; work is not merged."
        : "App work is running, conversation work needs attention, and notification work is completed. These states are separate, so each place must be checked."}
    </p>
    {shared ? <div className="pf-visibility-shared">
      <div className="pf-visibility-sources">
        {work.map(item => <WorkContext key={item.context} item={item} shared />)}
      </div>
      <svg className="pf-visibility-bridges" viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 0v56M150 0v56M250 0v56" />
      </svg>
      <div className="pf-visibility-layer">
        <div className="pf-visibility-states">
          {work.map(item => <div key={item.context} className="pf-visibility-state">
            <svg className="pf-visibility-inlet" viewBox="0 0 2 20" preserveAspectRatio="none" aria-hidden="true"><path d="M1 0v20" /></svg>
            <WorkMark shape={item.shape} compact head attention={item.state === "Needs attention"} />
            <span className="pf-visibility-state__label" aria-label={`${item.context}: ${item.state}`}>{item.state}</span>
          </div>)}
        </div>
        <p className="pf-visibility-layer__label">Windows <span>Shared visibility layer</span></p>
      </div>
    </div> : <div className="pf-visibility-scattered">
      {work.map(item => <WorkContext key={item.context} item={item} />)}
    </div>}
    <figcaption className="pf-visibility-caption">
      <span>{shared ? "Fig. 02.2" : "Fig. 02.1"}</span>
      <span>{shared ? "One place to check" : "Check each place"}</span>
    </figcaption>
  </figure>
}

export function AgentsComparison() {
  return <div className="pf-visibility-map">
    <div className="pf-visibility-pair">
      <ComparisonFigure shared={false} />
      <ComparisonFigure shared />
    </div>
    <p className="pf-visibility-copy">Work stays distributed. Visibility has a common home.</p>
  </div>
}
