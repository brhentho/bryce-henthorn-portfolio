const linkClass =
  "t-body-sm inline-flex min-h-11 max-w-full items-center [overflow-wrap:anywhere] text-[color:var(--text-primary)] underline decoration-[color:var(--rule-strong)] decoration-[0.5px] underline-offset-[0.25em] transition-[color,text-decoration-color] duration-[var(--duration-fast-ui)] ease-[var(--ease-out-quad)] hover:text-[color:var(--text-secondary)] hover:decoration-[color:var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-trace)]"

/**
 * Compact site-wide footer. One hairline closes the document; author and
 * contact information share a quiet two-column registration row.
 */
export function ManualFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)]">
      <div className="container grid grid-cols-1 gap-x-12 gap-y-8 py-10 md:grid-cols-2 lg:py-12">
        <div className="flex flex-col items-start">
          <p className="t-body text-[color:var(--text-primary)]">Bryce Henthorn</p>
          <p className="t-mono-caption manual-footer-meta mt-1">
            Senior Product Designer, Microsoft
          </p>
          <p className="t-mono-colophon manual-footer-meta mt-6">© 2026</p>
        </div>

        <div className="flex flex-col items-start md:items-end md:text-right">
          <a href="mailto:bhenthorn2757@gmail.com" className={linkClass}>
            bhenthorn2757@gmail.com
          </a>
          <a href="tel:+13609272833" className={linkClass}>
            360.927.2833
          </a>
          <p className="t-mono-caption manual-footer-meta mt-1">
            Seattle, WA
          </p>
        </div>
      </div>
    </footer>
  )
}
