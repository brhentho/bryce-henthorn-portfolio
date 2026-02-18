import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  className?: string
}

export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-10 md:mb-12", className)}>
      <span className="text-sm font-heading font-semibold text-foreground-secondary tracking-tight">
        {label}
      </span>
      <div className="h-px flex-1 bg-border-divider" />
    </div>
  )
}
