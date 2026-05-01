/**
 * Placeholder hero schematic. Replace with Midjourney render via
 * <Figure src="/images/recall/hero-schematic.png" /> when available.
 */
export function HeroSchematic() {
  return (
    <svg
      viewBox="0 0 1600 900"
      width="100%"
      height="auto"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className="manual-schematic block w-full text-[color:var(--rule-strong)]"
      role="img"
      aria-label="Placeholder hero schematic"
    >
      {/* outer frame */}
      <rect x="40" y="40" width="1520" height="820" stroke="var(--rule-strong)" />

      {/* registration marks at corners */}
      {[
        [40, 40], [1560, 40], [40, 860], [1560, 860],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={6} stroke="var(--rule-strong)" />
          <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke="var(--rule-strong)" strokeWidth="0.5" />
          <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke="var(--rule-strong)" strokeWidth="0.5" />
        </g>
      ))}

      {/* central diagram: a stylised memory mesh */}
      <g transform="translate(800,450)">
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x2 = Math.cos(rad) * 220
          const y2 = Math.sin(rad) * 160
          return (
            <line key={deg} x1={0} y1={0} x2={x2} y2={y2} stroke="var(--rule-strong)" />
          )
        })}
        <circle r="12" fill="var(--accent-schematic)" stroke="none" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x = Math.cos(rad) * 220
          const y = Math.sin(rad) * 160
          return <circle key={deg} cx={x} cy={y} r="6" fill="var(--bg)" stroke="var(--rule-strong)" />
        })}
      </g>

      {/* leader-line annotations */}
      <g stroke="var(--rule-strong)" strokeWidth="0.5">
        <line x1="800" y1="290" x2="800" y2="200" />
        <line x1="800" y1="200" x2="1100" y2="200" />
      </g>
      <text
        x="1108" y="204"
        fontFamily="var(--font-mono)" fontSize="11" fontWeight={500}
        letterSpacing="1.2" fill="var(--text-tertiary)"
      >
        SEMANTIC INDEX · RECALL
      </text>

      <text
        x="80" y="120"
        fontFamily="var(--font-mono)" fontSize="11" fontWeight={500}
        letterSpacing="1.2" fill="var(--text-tertiary)"
      >
        FIG. 0.1 / HERO PLACEHOLDER
      </text>
    </svg>
  )
}
