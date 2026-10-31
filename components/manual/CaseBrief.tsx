type Props = {
  problem: string
  ownership: string
  decision: string
  outcome: string
  status: string
  links: { href: string; label: string }[]
}

/** Spec-sheet composition: a fast reading path before the figures. */
export function CaseBrief({ problem, ownership, decision, outcome, status, links }: Props) {
  const rows = [
    ["PROBLEM", problem], ["MY OWNERSHIP", ownership], ["PIVOTAL DECISION", decision],
    ["EVIDENCE", outcome], ["RELEASE STATUS", status],
  ]
  return (
    <div className="case-brief" aria-label="Case study at a glance">
      <dl className="case-brief-grid">
        {rows.map(([label, value]) => (
          <div key={label} className={label === "RELEASE STATUS" ? "case-brief-status" : undefined}>
            <dt className="t-mono-label">{label}</dt>
            <dd className="t-body-sm mt-3">{value}</dd>
          </div>
        ))}
      </dl>
      <nav className="case-jumps" aria-label="Jump into this case study">
        {links.map((link) => <a className="t-mono-caption" key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}
      </nav>
    </div>
  )
}
