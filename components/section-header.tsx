import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  className?: string
}

export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-10 md:mb-12", className)}>
      <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-tertiary uppercase shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-border-divider" />
    </div>
  )
}
