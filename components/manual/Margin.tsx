import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  anchor?: string
  className?: string
}

/**
 * On ≥1024px, renders in the right margin column of `.section-grid`.
 * Below 1024px, reflows inline as an indented block (real <aside>, not hidden).
 */
export function Margin({ children, anchor, className }: Props) {
  return (
    <aside
      data-anchor={anchor}
      className={cn(
        "t-mono-marginalia",
        "border-l border-[color:var(--rule)] pl-4 my-4",
        "lg:my-0 lg:border-l lg:pl-4 lg:col-start-2",
        "max-w-prose lg:max-w-none",
        className,
      )}
    >
      {children}
    </aside>
  )
}
