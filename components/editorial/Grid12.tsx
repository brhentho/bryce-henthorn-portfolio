import { cn } from '@/lib/utils'

interface Grid12Props {
  children: React.ReactNode
  className?: string
}

export function Grid12({ children, className }: Grid12Props) {
  return <div className={cn('g12', className)}>{children}</div>
}
