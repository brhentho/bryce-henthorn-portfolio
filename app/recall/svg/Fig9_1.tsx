/**
 * Pattern propagation — Recall search principles radiating outward to
 * other Windows surfaces. Center node is the origin; concentric rings
 * mark adoption layers, with WINDOWS SEARCH and FILE EXPLORER as the
 * primary annotated rings. Outer ring (dashed) is qualitative.
 */
export function Fig9_1() {
  const W = 1600
  const H = 900
  const cx = 760
  const cy = 450

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="manual-schematic block w-full"
      role="img"
      aria-label="Ripple diagram showing Recall search patterns adopted across Windows Search and File Explorer"
    >
      {/* outer (qualitative) ring — dashed */}
      <circle
        cx={cx}
        cy={cy}
        r={380}
        stroke="var(--rule)"
        strokeWidth={0.75}
        strokeDasharray="3 5"
      />

      {/* middle ring — File Explorer */}
      <circle cx={cx} cy={cy} r={250} stroke="var(--rule-strong)" />

      {/* inner ring — Windows Search */}
      <circle cx={cx} cy={cy} r={130} stroke="var(--rule-strong)" />

      {/* baseline horizon */}
      <line
        x1={120}
        y1={cy}
        x2={1480}
        y2={cy}
        stroke="var(--rule)"
        strokeWidth={0.5}
        strokeDasharray="2 6"
      />

      {/* center origin node */}
      <circle cx={cx} cy={cy} r={16} fill="var(--accent-schematic)" stroke="none" />
      <line
        x1={cx - 22}
        y1={cy}
        x2={cx + 22}
        y2={cy}
        stroke="var(--rule-strong)"
        strokeWidth={0.5}
      />
      <line
        x1={cx}
        y1={cy - 22}
        x2={cx}
        y2={cy + 22}
        stroke="var(--rule-strong)"
        strokeWidth={0.5}
      />

      {/* center label */}
      <text
        x={cx}
        y={cy + 48}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fontWeight={500}
        letterSpacing="1.4"
        fill="var(--text-secondary)"
      >
        RECALL · SEARCH PATTERNS
      </text>
      <text
        x={cx}
        y={cy + 68}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight={400}
        fill="var(--text-tertiary)"
      >
        match-type separation · provenance · controls
      </text>

      {/* leader lines from each ring's right edge to right-margin labels */}
      <g stroke="var(--rule)" strokeWidth={0.5}>
        {/* inner ring → WINDOWS SEARCH */}
        <line x1={cx + 130} y1={cy} x2={1180} y2={cy - 100} />
        <line x1={1180} y1={cy - 100} x2={1300} y2={cy - 100} />
        <circle cx={cx + 130} cy={cy} r={4} fill="var(--rule-strong)" />

        {/* middle ring → FILE EXPLORER */}
        <line x1={cx + 250} y1={cy} x2={1180} y2={cy} />
        <line x1={1180} y1={cy} x2={1300} y2={cy} />
        <circle cx={cx + 250} cy={cy} r={4} fill="var(--rule-strong)" />

        {/* outer ring → FUTURE OS SURFACES */}
        <line x1={cx + 380} y1={cy} x2={1180} y2={cy + 110} />
        <line x1={1180} y1={cy + 110} x2={1300} y2={cy + 110} />
        <circle cx={cx + 380} cy={cy} r={3} fill="var(--rule)" />
      </g>

      {/* right-margin labels */}
      <g>
        <text
          x={1310}
          y={cy - 96}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-secondary)"
        >
          WINDOWS SEARCH
        </text>
        <text
          x={1310}
          y={cy - 76}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Match-type separation in results
        </text>

        <text
          x={1310}
          y={cy + 4}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-secondary)"
        >
          FILE EXPLORER
        </text>
        <text
          x={1310}
          y={cy + 24}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Relevance transparency on results
        </text>

        <text
          x={1310}
          y={cy + 114}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-tertiary)"
        >
          FUTURE OS SURFACES
        </text>
        <text
          x={1310}
          y={cy + 134}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Pattern available for adoption
        </text>
      </g>

      {/* small legend in lower-left */}
      <g>
        <line
          x1={140}
          y1={780}
          x2={170}
          y2={780}
          stroke="var(--rule-strong)"
          strokeWidth={1}
        />
        <text
          x={180}
          y={784}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight={400}
          letterSpacing="1.2"
          fill="var(--text-tertiary)"
        >
          ADOPTED
        </text>
        <line
          x1={300}
          y1={780}
          x2={330}
          y2={780}
          stroke="var(--rule)"
          strokeWidth={0.75}
          strokeDasharray="3 5"
        />
        <text
          x={340}
          y={784}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight={400}
          letterSpacing="1.2"
          fill="var(--text-tertiary)"
        >
          QUALITATIVE
        </text>
      </g>
    </svg>
  )
}
