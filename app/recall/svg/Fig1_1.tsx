/** Search vs. recall — conceptual difference. */
export function Fig1_1() {
  return (
    <svg
      viewBox="0 0 1600 900"
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="block w-full"
      role="img"
      aria-label="Diagram contrasting search and recall paradigms"
    >
      {/* divider */}
      <line x1="800" y1="80" x2="800" y2="820" stroke="var(--rule-strong)" />

      {/* labels */}
      <text x="80" y="120" fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4" fill="var(--text-tertiary)">SEARCH</text>
      <text x="820" y="120" fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4" fill="var(--text-tertiary)">RECALL</text>

      {/* SEARCH: linear input → result */}
      <g stroke="var(--rule-strong)">
        <rect x="80" y="380" width="180" height="80" />
        <line x1="260" y1="420" x2="600" y2="420" />
        <polygon points="600,420 590,415 590,425" fill="var(--rule-strong)" />
        <rect x="600" y="380" width="120" height="80" />
      </g>
      <text x="170" y="425" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={400} fill="var(--text-tertiary)">QUERY</text>
      <text x="660" y="425" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={400} fill="var(--text-tertiary)">RESULT</text>

      {/* RECALL: ambient field → recognition */}
      <g stroke="var(--rule-strong)">
        {[0, 1, 2, 3].map((row) => (
          [0, 1, 2, 3, 4, 5].map((col) => {
            const x = 880 + col * 90
            const y = 280 + row * 90
            const filled = (row + col) % 4 === 0
            return (
              <circle
                key={`${row}-${col}`}
                cx={x} cy={y} r={filled ? 8 : 4}
                stroke="var(--rule-strong)"
                fill={filled ? "var(--accent-schematic)" : "var(--bg)"}
              />
            )
          })
        ))}
      </g>
      <text x="1240" y="700" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={400} fill="var(--text-tertiary)">AMBIENT FIELD · RECOGNITION</text>
    </svg>
  )
}
