import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { RegistrationMark } from "./RegistrationMark"

type Props = {
  /** The upcoming section's number (e.g., "07"). Used for the heading id;
   *  no longer rendered as a `§ NN / TT` line. */
  number: string
  /** Retained for call-site compatibility — no longer rendered. */
  total?: string
  /** Chapter title, repeated as the upcoming section's name. */
  title: string
  /** Optional ambient mark or schematic rendered under the title. */
  ambient?: ReactNode
  className?: string
}

/**
 * Internal chapter divider (§2.10 in docs/layout-direction.md). Marks
 * transitions between major movements. Approximately 60vh, centered, with
 * registration marks at the four corners. The `§ NN / TT` pagination line
 * was removed in the 2026 revision — the plate carries its title alone.
 *
 * Not a numbered section: deliberately omits data-section. data-reveal
 * participates in the page's scroll-reveal sequence.
 */
export function CoverPlate({ number, title, ambient, className }: Props) {
  return (
    <section
      data-reveal
      data-reveal-role="cover"
      aria-labelledby={`cover-${number}-title`}
      className={cn(
        "relative my-12 lg:my-20 min-h-[60vh] border border-[color:var(--rule)]",
        "flex flex-col items-center justify-center text-center",
        "px-6 py-16 lg:py-24",
        className,
      )}
    >
      <RegistrationMark
        className="absolute -top-[6px] -left-[6px]"
        aria-hidden="true"
      />
      <RegistrationMark
        className="absolute -top-[6px] -right-[6px]"
        aria-hidden="true"
      />
      <RegistrationMark
        className="absolute -bottom-[6px] -left-[6px]"
        aria-hidden="true"
      />
      <RegistrationMark
        className="absolute -bottom-[6px] -right-[6px]"
        aria-hidden="true"
      />

      <h2
        id={`cover-${number}-title`}
        className="t-display-l text-[color:var(--text-primary)]"
      >
        {title}
      </h2>
      {ambient ? (
        <div className="mt-10 max-w-md text-[color:var(--text-tertiary)]">
          {ambient}
        </div>
      ) : null}
    </section>
  )
}
