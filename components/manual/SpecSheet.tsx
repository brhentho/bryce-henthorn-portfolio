import { cn } from "@/lib/utils"

type Row = { label: string; value: string }

type Props = {
  rows: Row[]
  className?: string
}

export function SpecSheet({ rows, className }: Props) {
  return (
    <dl
      className={cn(
        "border-y border-[color:var(--rule)]",
        className,
      )}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn(
            "grid grid-cols-[160px_1fr] sm:grid-cols-[200px_1fr] items-baseline gap-x-6 py-3",
            i < rows.length - 1 ? "border-b border-[color:var(--rule)]" : "",
          )}
        >
          <dt className="t-mono-label">{row.label}</dt>
          <dd className="t-body text-[color:var(--text-primary)]">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
