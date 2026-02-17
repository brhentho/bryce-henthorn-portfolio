import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  counter?: string
  className?: string
}

export function SectionHeader({ label, counter, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-10 md:mb-12 relative", className)}>
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-1 h-1 rounded-full bg-accent opacity-50" />
        <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-tertiary uppercase">
          {label}
        </span>
      </div>
      <div className="h-px flex-1 bg-border-divider" />
      {counter && (
        <span className="font-mono text-[11px] tracking-[0.15em] text-foreground shrink-0 opacity-[0.08]">
          {counter}
        </span>
      )}
    </div>
  )
}
