/** Before / after horizontal split frame — merged vs separated. */
export function Fig3_1() {
  return (
    <svg
      viewBox="0 0 1600 900"
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="block w-full"
      role="img"
      aria-label="Before and after split: merged versus separated layout"
    >
      <line x1="800" y1="80" x2="800" y2="820" stroke="var(--rule-strong)" />

      <text x="80" y="120" fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4" fill="var(--text-tertiary)">BEFORE · MERGED</text>
      <text x="820" y="120" fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4" fill="var(--text-tertiary)">AFTER · SEPARATED</text>

      {/* BEFORE — one dense block */}
      <g stroke="var(--rule-strong)">
        <rect x="80" y="220" width="640" height="500" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1="100" y1={260 + i * 60} x2="700" y2={260 + i * 60} stroke="var(--rule)" />
        ))}
      </g>

      {/* AFTER — three separated panels */}
      <g stroke="var(--rule-strong)">
        <rect x="880" y="220" width="640" height="140" />
        <rect x="880" y="380" width="640" height="160" />
        <rect x="880" y="560" width="640" height="160" />
        {/* annotation dot on the new clean panel */}
        <circle cx="900" cy="400" r="6" fill="var(--accent-schematic)" stroke="none" />
      </g>
      <text x="920" y="404" fontFamily="var(--font-mono)" fontSize="11" fontWeight={400} fill="var(--text-tertiary)">PRIMARY RECALL CARD</text>
    </svg>
  )
}
