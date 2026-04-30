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
        "hover:decoration-[color:var(--text-primary)] transition-colors",
        className,
      )}
    >
      <span aria-hidden="true">§ {section}</span>
      {label ? <span className="text-[color:var(--text-secondary)]">{label}</span> : null}
    </Link>
  )
}
