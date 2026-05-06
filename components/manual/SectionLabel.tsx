import { cn } from "@/lib/utils"

type Props = {
  number: string
  label: string
  title: string
  id?: string
  className?: string
}

export function SectionLabel({ number, label, title, id, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3", className)} id={id}>
      <div className="t-mono-label text-[color:var(--text-tertiary)]">
        § {number} / {label.toUpperCase()}
      </div>
      <h2 className="t-h1 text-balance text-[color:var(--text-primary)]">{title}</h2>
      <hr className="rule mt-2" />
    </div>
  )
}
