import { cn } from "@/lib/utils"

type Props = {
  rev: string
  date: string
  name: string
  doc: string
  className?: string
}

export function RevisionHeader({ rev, date, name, doc, className }: Props) {
  const fields = [
    { label: "REV.", value: rev },
    { label: "DATE", value: date },
    { label: "AUTHOR", value: name },
    { label: "DOC", value: doc },
  ]
  return (
    <header
      className={cn(
        "manual-revision-header border-b border-[color:var(--rule)] py-3",
        className,
      )}
    >
      <div className="container flex flex-wrap items-baseline gap-x-6 gap-y-1">
        {fields.map((f, i) => (
          <span key={f.label} className="flex items-baseline gap-2">
            <span className="t-mono-label">{f.label}</span>
            <span className="t-mono-caption text-[color:var(--text-primary)]">{f.value}</span>
            {i < fields.length - 1 ? (
              <span aria-hidden="true" className="t-mono-caption text-[color:var(--text-tertiary)] hidden sm:inline ml-4">
                /
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </header>
  )
}
