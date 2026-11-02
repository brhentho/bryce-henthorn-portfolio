type LedgerItem = { label: string; value: string }

type Props = {
  /** The situation, in one plain clause. */
  lede: string
  /** What the team did about it. Set brighter than the lede. */
  call: string
  /** Three or four short facts, read as one strip. */
  ledger: LedgerItem[]
  links: { href: string; label: string }[]
}

/**
 * Opening read of a case study: one sentence that runs problem → our call,
 * then a single mono ledger of facts. Replaces the hero spec sheet so the
 * same facts never appear twice above the fold.
 */
export function CaseBrief({ lede, call, ledger, links }: Props) {
  return (
    <div className="case-brief" aria-label="Case study at a glance">
      <p className="t-h2 case-brief-lede">
        {lede} <span className="case-brief-call">{call}</span>
      </p>
      <div className="case-ledger">
        <dl className="case-ledger-facts">
          {ledger.map((item) => (
            <div key={item.label}>
              <dt className="t-mono-label">{item.label}</dt>
              <dd className="t-body-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
        <nav className="case-jumps" aria-label="Jump into this case study">
          <span className="t-mono-label">JUMP TO</span>
          {links.map((link) => (
            <a className="t-mono-caption" key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
