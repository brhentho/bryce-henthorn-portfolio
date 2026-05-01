import { cn } from "@/lib/utils"

interface SpecItem {
  label: string
  value: string
}

interface OverviewSpecPanelProps {
  specs: SpecItem[]
  className?: string
}

export function OverviewSpecPanel({ specs, className }: OverviewSpecPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface p-6 md:p-8",
        className
      )}
    >
      <h2 className="font-heading text-sm font-semibold text-foreground-secondary mb-6 tracking-tight">
        Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec) => (
          <div key={spec.label}>
            <dt className="text-xs font-sans font-medium text-foreground-tertiary uppercase tracking-wider mb-1.5">
              {spec.label}
            </dt>
            <dd className="text-sm text-foreground-secondary leading-relaxed font-sans">
              {spec.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}
