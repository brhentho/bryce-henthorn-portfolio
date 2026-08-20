import { cn } from "@/lib/utils"

type Row = { label: string; value: string }

type Props = {
  rows: Row[]
  className?: string
}

export function SpecSheet({ rows, className }: Props) {
  return (
    <dl className={cn(className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[160px_1fr] sm:grid-cols-[200px_1fr] items-baseline gap-x-6 py-3"
        >
          <dt className="t-mono-label">{row.label}</dt>
          <dd className="t-body text-[color:var(--text-primary)]">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
