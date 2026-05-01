interface DotGridProps {
  mask?: boolean
  className?: string
}

export function DotGrid({ mask = true, className }: DotGridProps) {
  return (
    <div
      className={`dot-grid ${className ?? ''}`}
      aria-hidden="true"
      style={
        mask
          ? {
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)',
            }
          : undefined
      }
    />
  )
}
