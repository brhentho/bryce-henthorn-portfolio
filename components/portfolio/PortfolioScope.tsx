import type { ReactNode } from "react"
import "../../app/explore/explore.css"
import "../../app/explore/effects.css"
import "../../app/portfolio-primitives.css"
import "../../app/portfolio-foundation.css"
import "../../app/portfolio.css"
import "../../app/portfolio-pages.css"

const NO_SCRIPT = `<style>
.portfolio :is([data-project-art], [data-project-art] .fn-device, [data-project-art] .fn-device-image, [data-project-art] figcaption,
.fn-registration-rule, [data-project-copy], [data-project-copy] *, .fn-project-annotation, .pf-motion, .fn-evidence-plate) {
transform:none!important;translate:none!important;scale:none!important;rotate:none!important;clip-path:none!important;opacity:1!important
}
</style>`

export function PortfolioScope({ children }: { children: ReactNode }) {
  return <div className="portfolio xp xr fn">
    <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT }} />
    {children}
  </div>
}
