import { cn } from "@/lib/utils"

type Item = {
  value: string
  unit: string
  label: string
}

type Props = {
  items: Item[]
  className?: string
}

export function Telemetry({ items, className }: Props) {
  return (
    <div
      className={cn(
        "border border-[color:var(--rule)]",
        "grid grid-cols-1 sm:grid-cols-3",
        "divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--rule)]",
        className,
      )}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2 p-6">
          <div
            className="font-[number:600] text-[color:var(--text-primary)]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {item.value}
          </div>
          <div className="t-mono-label text-[color:var(--text-secondary)]">{item.unit}</div>
          <div className="t-mono-caption text-[color:var(--text-tertiary)]">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
