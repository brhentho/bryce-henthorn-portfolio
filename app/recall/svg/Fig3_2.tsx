/** Confidence indicator system — 4 states (low → certain). */
export function Fig3_2() {
  const states = [
    { label: "LOW",      pct: 0.25 },
    { label: "MEDIUM",   pct: 0.50 },
    { label: "HIGH",     pct: 0.75 },
    { label: "CERTAIN",  pct: 1.00 },
  ]
  const W = 1600
  const H = 600
  const slotW = 320
  const padX = 80
  const cy = 280
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="block w-full"
      role="img"
      aria-label="Confidence indicator: four states from low to certain"
    >
      {states.map((s, i) => {
        const x = padX + i * (slotW + 32)
        const barW = slotW - 80
        const barX = x + 40
        const filledW = barW * s.pct
        return (
          <g key={s.label}>
            <rect x={x} y={cy - 80} width={slotW} height={160} stroke="var(--rule-strong)" />
            {/* bar track */}
            <line x1={barX} y1={cy} x2={barX + barW} y2={cy} stroke="var(--rule)" />
            {/* filled portion */}
            <line x1={barX} y1={cy} x2={barX + filledW} y2={cy} stroke="var(--accent-schematic)" strokeWidth={3} />
            {/* tick endcaps */}
            <line x1={barX} y1={cy - 6} x2={barX} y2={cy + 6} stroke="var(--rule-strong)" />
            <line x1={barX + barW} y1={cy - 6} x2={barX + barW} y2={cy + 6} stroke="var(--rule-strong)" />
            {/* label */}
            <text
              x={x + slotW / 2} y={cy + 130}
              textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4"
              fill="var(--text-tertiary)"
            >
              {s.label}
            </text>
            <text
              x={x + 40} y={cy - 30}
              fontFamily="var(--font-mono)" fontSize="10" fontWeight={400}
              fill="var(--text-tertiary)"
            >
              {Math.round(s.pct * 100).toString().padStart(2, "0")}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
