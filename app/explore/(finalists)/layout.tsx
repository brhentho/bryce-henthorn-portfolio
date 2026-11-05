import "../round-two.css"
import "./final.css"

// Without JS, scroll choreography never runs; settle every server-rendered entrance at its final state.
// Scoped to project entrances and case evidence. Heroes keep their own accepted rendering.
const NO_SCRIPT_SETTLED = `<style>
.fn :is([data-project-art], [data-project-art] .fn-device, [data-project-art] .fn-device-image, [data-project-art] figcaption,
  .fn-registration-rule, [data-project-copy], [data-project-copy] *, .fn-project-annotation, .fn-evidence-plate) {
  transform: none !important; translate: none !important; scale: none !important; rotate: none !important;
  clip-path: none !important; opacity: 1 !important;
}
.fn .fn-evidence-plate { --fn-reg: 8px !important; }
</style>`

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="xr fn">
    <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT_SETTLED }} />
    {children}
  </div>
}
