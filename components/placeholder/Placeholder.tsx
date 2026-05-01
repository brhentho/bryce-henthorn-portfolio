import { cn } from '@/lib/utils'

interface PlaceholderProps {
  type: 'img' | 'diag' | 'ui'
  label: string
  aspectRatio?: string
  minHeight?: string
  className?: string
}

export function Placeholder({
  type,
  label,
  aspectRatio,
  minHeight = '240px',
  className,
}: PlaceholderProps) {
  const typeClass = type === 'img' ? 'ph-img' : type === 'diag' ? 'ph-diag' : 'ph-ui'

  return (
    <div
      className={cn('ph', typeClass, className)}
      style={{ aspectRatio, minHeight: aspectRatio ? undefined : minHeight }}
    >
      <span className="ph-label">{label}</span>
    </div>
  )
}
