import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  section: string
  href: string
  label?: string
  className?: string
}

export function Crossref({ section, href, label, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "t-mono-caption inline-flex items-baseline gap-[0.4em]",
        "underline decoration-[color:var(--rule-strong)] decoration-[0.5px] underline-offset-[0.25em]",
        "transition-all duration-[160ms]",
        "hover:decoration-[color:var(--accent-trace)] hover:decoration-[1.5px] hover:text-[color:var(--text-primary)]",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[color:var(--accent-trace)] focus-visible:outline-offset-2",
        className,
      )}
    >
      <span aria-hidden="true">§ {section}</span>
      {label ? <span className="text-[color:var(--text-secondary)]">{label}</span> : null}
    </Link>
  )
}
