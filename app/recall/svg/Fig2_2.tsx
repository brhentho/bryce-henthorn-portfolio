/**
 * Rejected concepts grid — 2x2 of empty rectangles with diagonal slashes,
 * "REJECTED" mono label beneath each, caption slot below the grid.
 */
export function Fig2_2() {
  const cells = [
    { label: "TIMELINE-FIRST" },
    { label: "QUERY-ONLY" },
    { label: "SUMMARIES" },
    { label: "AGENT-LED" },
  ]
  const cellW = 660
  const cellH = 320
  const gap = 40
  const paddingX = 80
  const paddingTop = 100
  const W = paddingX * 2 + cellW * 2 + gap
  const H = paddingTop + cellH * 2 + gap + 80

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="block w-full"
      role="img"
      aria-label="Grid of four rejected concept directions"
    >
      {cells.map((c, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = paddingX + col * (cellW + gap)
        const y = paddingTop + row * (cellH + gap)
        return (
          <g key={c.label}>
            <rect x={x} y={y} width={cellW} height={cellH} stroke="var(--rule-strong)" />
            <line
              x1={x} y1={y} x2={x + cellW} y2={y + cellH}
              stroke="var(--rule)" strokeWidth={0.5}
            />
            <text
              x={x + cellW / 2} y={y + cellH + 28}
              textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4"
              fill="var(--text-tertiary)"
            >
              REJECTED · {c.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
