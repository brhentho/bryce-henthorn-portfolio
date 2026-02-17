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
        "rounded-lg border border-border bg-surface p-6 md:p-8",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
        <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-tertiary uppercase">
          Overview
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec) => (
          <div key={spec.label}>
            <dt className="font-mono text-[11px] tracking-[0.15em] text-foreground-tertiary uppercase mb-1.5">
              {spec.label}
            </dt>
            <dd className="text-sm text-foreground-secondary leading-relaxed">
              {spec.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}
