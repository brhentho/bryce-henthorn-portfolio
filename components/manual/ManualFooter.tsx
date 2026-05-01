import { ViewTransitionLink } from "./ViewTransitionLink"

const INDEX_ITEMS: { href: string; label: string }[] = [
  { href: "/",                      label: "Home" },
  { href: "/recall",                label: "Windows Recall" },
  { href: "/agents-in-windows",     label: "Agents in Windows" },
  { href: "/teams-for-education",   label: "Teams for Education" },
  { href: "/about",                 label: "About" },
]

type Props = {
  rev?: string
}

/**
 * Site-wide footer. Three columns: author/contact, document index, metadata.
 * Mono labels per column; hairline rule on top, end-of-document line at bottom.
 */
export function ManualFooter({ rev = "2.4" }: Props) {
  return (
    <footer className="border-t border-[color:var(--rule)] mt-16">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
        {/* Author */}
        <div className="space-y-3">
          <p className="t-mono-label">AUTHOR</p>
          <div className="space-y-1">
            <p className="t-body text-[color:var(--text-primary)]">Bryce Henthorn</p>
            <p className="t-body-sm text-[color:var(--text-secondary)]">
              Senior Product Designer, Microsoft
            </p>
            <p className="t-body-sm text-[color:var(--text-secondary)]">Seattle, WA</p>
          </div>
          <a
            href="mailto:bhenthorn2757@gmail.com"
            className="t-body-sm inline-block text-[color:var(--text-primary)] underline decoration-[color:var(--rule-strong)] decoration-[0.5px] underline-offset-[0.25em] transition-all duration-[160ms] hover:decoration-[color:var(--accent-trace)] hover:decoration-[1.5px]"
          >
            bhenthorn2757@gmail.com
          </a>
        </div>

        {/* Index */}
        <div className="space-y-3">
          <p className="t-mono-label">INDEX</p>
          <ul className="space-y-1.5">
            {INDEX_ITEMS.map((item) => (
              <li key={item.href}>
                <ViewTransitionLink
                  href={item.href}
                  className="t-body-sm text-[color:var(--text-primary)] underline decoration-[color:var(--rule-strong)] decoration-[0.5px] underline-offset-[0.25em] transition-all duration-[160ms] hover:decoration-[color:var(--accent-trace)] hover:decoration-[1.5px]"
                >
                  {item.label}
                </ViewTransitionLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Document */}
        <div className="space-y-3">
          <p className="t-mono-label">DOCUMENT</p>
          <div className="space-y-1">
            <p className="t-body-sm text-[color:var(--text-secondary)]">REV. {rev}</p>
            <p className="t-body-sm text-[color:var(--text-secondary)]">
              &copy; 2026 Bryce Henthorn
            </p>
          </div>
          <p className="t-mono-caption text-[color:var(--text-tertiary)] mt-6">
            END OF DOCUMENT
          </p>
        </div>
      </div>
    </footer>
  )
}
