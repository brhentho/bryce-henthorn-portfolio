import { cn } from "@/lib/utils"

type Props = {
  size?: number
  className?: string
}

export function RegistrationMark({ size = 12, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.75}
      aria-hidden="true"
      className={cn("text-[color:var(--rule-strong)]", className)}
    >
      <circle cx="6" cy="6" r="3" />
      <line x1="6" y1="0" x2="6" y2="12" />
      <line x1="0" y1="6" x2="12" y2="6" />
    </svg>
  )
}
