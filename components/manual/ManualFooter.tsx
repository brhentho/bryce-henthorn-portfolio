import { ViewTransitionLink } from "./ViewTransitionLink"

const INDEX_ITEMS: { href: string; label: string }[] = [
  { href: "/",                      label: "WORK" },
  { href: "/agents-in-windows",     label: "AGENTS" },
  { href: "/recall",                label: "RECALL" },
  { href: "/teams-for-education",   label: "TEAMS" },
  { href: "/about",                 label: "ABOUT" },
]

const linkClass =
  "t-body-sm block text-[color:var(--text-primary)] underline decoration-[color:var(--rule-strong)] decoration-[0.5px] underline-offset-[0.25em] transition-all duration-[160ms] hover:decoration-[color:var(--accent-trace)] hover:decoration-[1.5px]"

const indexLinkClass =
  "t-mono-label inline-block text-[color:var(--text-primary)] transition-colors duration-[160ms] hover:text-[color:var(--accent-trace)]"

/* INDEX / AUTHOR / CONTACT section headers. Plain `<p>` — never a link.
   Tracking + tertiary tone separates the header from the items beneath it
   so the column reads as label → list, not as a flat stack of links. */
const sectionHeaderClass =
  "t-mono-label text-[color:var(--text-tertiary)] cursor-default select-none"

/**
 * Site-wide footer. Three columns: author, document index, contact.
 * Hairline rule on top.
 */
export function ManualFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)] mt-16">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
        {/* Author */}
        <div className="space-y-3">
          <p className={sectionHeaderClass}>AUTHOR</p>
          <div className="space-y-1">
            <p className="t-body text-[color:var(--text-primary)]">Bryce Henthorn</p>
            <p className="t-mono-caption text-[color:var(--text-secondary)]">
              Senior Product Designer, Microsoft
            </p>
          </div>
        </div>

        {/* Index */}
        <div className="space-y-3">
          <p className={sectionHeaderClass}>INDEX</p>
          <ul className="space-y-1.5">
            {INDEX_ITEMS.map((item) => (
              <li key={item.href}>
                <ViewTransitionLink href={item.href} className={indexLinkClass}>
                  {item.label}
                </ViewTransitionLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <p className={sectionHeaderClass}>CONTACT</p>
          <div className="space-y-1">
            <a href="tel:+13609272833" className={linkClass}>
              360.927.2833
            </a>
            <a href="mailto:bhenthorn2757@gmail.com" className={linkClass}>
              bhenthorn2757@gmail.com
            </a>
            <p className="t-body-sm text-[color:var(--text-secondary)]">Seattle, WA</p>
          </div>
        </div>
      </div>
      <div className="container pb-8 pt-2 border-t border-[color:var(--rule)]">
        <p className="t-mono-caption text-[color:var(--text-tertiary)]">
          © 2026 Bryce Henthorn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
