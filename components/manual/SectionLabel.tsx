import { cn } from "@/lib/utils"

type Props = {
  /** Retained for call-site compatibility — no longer rendered. */
  number?: string
  /** Retained for call-site compatibility — no longer rendered. */
  label?: string
  title: string
  id?: string
  className?: string
}

/**
 * Section header. As of the 2026 revision the `§ NN / LABEL` eyebrow and the
 * hairline rule under the heading are gone — sections open directly on their
 * headline. `number` and `label` stay in the prop type so the ~37 existing call
 * sites keep documenting where each section sits in the document order.
 */
export function SectionLabel({ title, id, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3", className)} id={id}>
      <h2 className="t-h1 text-balance text-[color:var(--text-primary)]">{title}</h2>
    </div>
  )
}
