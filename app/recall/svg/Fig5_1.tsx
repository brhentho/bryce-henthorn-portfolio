/**
 * Match-type signals — anatomy of a Recall result card with TEXT MATCH and
 * VISUAL MATCH zones called out via leader lines. The card is the anchor;
 * labels fan out to the right margin.
 */
export function Fig5_1() {
  const W = 1600
  const H = 900

  // Card geometry
  const cardX = 140
  const cardY = 180
  const cardW = 760
  const cardH = 540
  const headerH = 60
  const splitX = cardX + 320 // visual / text divider

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="manual-schematic block w-full"
      role="img"
      aria-label="Anatomy of a Recall result card showing text-match and visual-match zones"
    >
      {/* card outline */}
      <rect
        x={cardX}
        y={cardY}
        width={cardW}
        height={cardH}
        stroke="var(--rule-strong)"
      />

      {/* header strip divider */}
      <line
        x1={cardX}
        y1={cardY + headerH}
        x2={cardX + cardW}
        y2={cardY + headerH}
        stroke="var(--rule)"
        strokeWidth={0.5}
      />

      {/* visual / text vertical divider */}
      <line
        x1={splitX}
        y1={cardY + headerH}
        x2={splitX}
        y2={cardY + cardH - 80}
        stroke="var(--rule)"
        strokeWidth={0.5}
      />

      {/* badges row divider */}
      <line
        x1={cardX}
        y1={cardY + cardH - 80}
        x2={cardX + cardW}
        y2={cardY + cardH - 80}
        stroke="var(--rule)"
        strokeWidth={0.5}
      />

      {/* header text — timestamp + app */}
      <text
        x={cardX + 20}
        y={cardY + 38}
        fontFamily="var(--font-mono)"
        fontSize="12"
        fontWeight={500}
        letterSpacing="1.2"
        fill="var(--text-tertiary)"
      >
        10:42 · ONENOTE · 2024-04-12
      </text>

      {/* visual zone — simulated screenshot via diagonal hatching */}
      <g stroke="var(--rule)" strokeWidth={0.5}>
        {Array.from({ length: 12 }).map((_, i) => {
          const yOff = cardY + headerH + 20 + i * 30
          return (
            <line
              key={`hatch-${i}`}
              x1={cardX + 20}
              y1={yOff}
              x2={splitX - 20}
              y2={yOff - 20}
            />
          )
        })}
      </g>

      {/* text zone — simulated text via stacked horizontal lines */}
      <g stroke="var(--rule-strong)" strokeWidth={0.75}>
        {Array.from({ length: 9 }).map((_, i) => {
          const yOff = cardY + headerH + 30 + i * 36
          const widthVar = i % 3 === 2 ? 280 : i % 3 === 1 ? 360 : 320
          return (
            <line
              key={`txt-${i}`}
              x1={splitX + 20}
              y1={yOff}
              x2={splitX + 20 + widthVar}
              y2={yOff}
            />
          )
        })}
      </g>

      {/* match badges at bottom */}
      <g>
        {/* V badge — visual */}
        <rect
          x={cardX + 20}
          y={cardY + cardH - 60}
          width={48}
          height={40}
          stroke="var(--rule-strong)"
        />
        <text
          x={cardX + 44}
          y={cardY + cardH - 32}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="14"
          fontWeight={500}
          fill="var(--text-secondary)"
        >
          V
        </text>

        {/* T badge — text */}
        <rect
          x={cardX + 80}
          y={cardY + cardH - 60}
          width={48}
          height={40}
          stroke="var(--rule-strong)"
        />
        <text
          x={cardX + 104}
          y={cardY + cardH - 32}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="14"
          fontWeight={500}
          fill="var(--text-secondary)"
        >
          T
        </text>

        <text
          x={cardX + cardW - 20}
          y={cardY + cardH - 32}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1.2"
          fill="var(--text-tertiary)"
        >
          MATCH SIGNALS
        </text>
      </g>

      {/* leader lines + annotations on the right */}
      <g stroke="var(--rule)" strokeWidth={0.5}>
        {/* visual zone leader */}
        <line x1={splitX - 100} y1={cardY + 200} x2={1180} y2={cardY + 200} />
        <line x1={1180} y1={cardY + 200} x2={1280} y2={cardY + 200} />
        <circle cx={splitX - 100} cy={cardY + 200} r={4} fill="var(--rule-strong)" />

        {/* text zone leader */}
        <line x1={splitX + 120} y1={cardY + 360} x2={1180} y2={cardY + 360} />
        <line x1={1180} y1={cardY + 360} x2={1280} y2={cardY + 360} />
        <circle cx={splitX + 120} cy={cardY + 360} r={4} fill="var(--rule-strong)" />

        {/* V badge leader */}
        <line x1={cardX + 44} y1={cardY + cardH - 20} x2={cardX + 44} y2={cardY + cardH + 30} />
        <line x1={cardX + 44} y1={cardY + cardH + 30} x2={1180} y2={cardY + cardH + 30} />
        <line x1={1180} y1={cardY + cardH + 30} x2={1280} y2={cardY + cardH + 30} />
      </g>

      {/* annotation labels — right margin */}
      <text
        x={1300}
        y={cardY + 204}
        fontFamily="var(--font-mono)"
        fontSize="13"
        fontWeight={500}
        letterSpacing="1.4"
        fill="var(--text-secondary)"
      >
        VISUAL MATCH
      </text>
      <text
        x={1300}
        y={cardY + 226}
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight={400}
        fill="var(--text-tertiary)"
      >
        Pixels recognised, not described
      </text>

      <text
        x={1300}
        y={cardY + 364}
        fontFamily="var(--font-mono)"
        fontSize="13"
        fontWeight={500}
        letterSpacing="1.4"
        fill="var(--text-secondary)"
      >
        TEXT MATCH
      </text>
      <text
        x={1300}
        y={cardY + 386}
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight={400}
        fill="var(--text-tertiary)"
      >
        OCR of extracted on-screen text
      </text>

      <text
        x={1300}
        y={cardY + cardH + 34}
        fontFamily="var(--font-mono)"
        fontSize="13"
        fontWeight={500}
        letterSpacing="1.4"
        fill="var(--text-secondary)"
      >
        SIGNAL CHIPS
      </text>
      <text
        x={1300}
        y={cardY + cardH + 56}
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight={400}
        fill="var(--text-tertiary)"
      >
        Why this card surfaced
      </text>
    </svg>
  )
}
