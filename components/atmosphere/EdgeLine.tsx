interface EdgeLineProps {
  position?: 'top' | 'bottom'
  className?: string
}

export function EdgeLine({ position = 'bottom', className }: EdgeLineProps) {
  return (
    <div
      className={`edge-line ${className ?? ''}`}
      aria-hidden="true"
      style={{ [position]: 0 }}
    />
  )
}
