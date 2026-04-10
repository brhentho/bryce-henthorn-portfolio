interface GlowProps {
  color: string
  size?: string
  top?: string
  left?: string
  opacity?: number
  pulse?: boolean
  className?: string
}

export function Glow({
  color,
  size = '60%',
  top = '40%',
  left = '30%',
  opacity = 0.06,
  pulse = false,
  className,
}: GlowProps) {
  return (
    <div
      className={`glow ${className ?? ''}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        opacity,
        transform: 'translate(-50%, -50%)',
        animation: pulse ? 'pulseGlow 6s ease-in-out infinite' : undefined,
      }}
    />
  )
}
