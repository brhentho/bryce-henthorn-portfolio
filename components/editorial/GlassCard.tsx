import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  accentBorder?: string
}

export function GlassCard({ children, className, hover = false, accentBorder }: GlassCardProps) {
  return (
    <div
      className={cn('glass', hover && 'glass-hover', className)}
      style={accentBorder ? { borderColor: accentBorder } : undefined}
    >
      {children}
    </div>
  )
}
