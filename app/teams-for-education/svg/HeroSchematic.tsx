/**
 * Virtual classroom hero schematic — top-down rendering of a 6-table /
 * 30-seat virtual classroom in a 3x2 grid. Mirrors the operator-manual
 * style of Recall's HeroSchematic: hairline rules, mono labels,
 * registration marks at corners, accent for the teacher origin.
 */
export function HeroSchematic() {
  // Grid: 3 columns × 2 rows of tables
  const cols = [320, 800, 1280]
  const rows = [320, 660]

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
      aria-label="Top-down virtual classroom: 6 tables in a 3x2 grid"
    >
      {/* faint reference grid */}
      <g stroke="var(--rule)" strokeWidth={0.5} strokeDasharray="2 6">
        <line x1="800" y1="80" x2="800" y2="820" />
        <line x1="100" y1="490" x2="1500" y2="490" />
      </g>

      {/* tables */}
      {rows.map((cy, rowIdx) =>
        cols.map((cx, colIdx) => {
          const idx = rowIdx * cols.length + colIdx
          const tableW = 200
          const tableH = 120
          const seatR = 14

          return (
            <g key={`${rowIdx}-${colIdx}`}>
              {/* table card */}
              <rect
                x={cx - tableW / 2}
                y={cy - tableH / 2}
                width={tableW}
                height={tableH}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />

              {/* materials slot — small dashed rect inside the table */}
              <rect
                x={cx - 32}
                y={cy - 22}
                width={64}
                height={44}
                stroke="var(--rule)"
                strokeWidth={0.5}
                strokeDasharray="3 4"
              />

              {/* seats around the table — 6 per table (top 2, bottom 2, left 1, right 1) */}
              {/* top seats */}
              <circle
                cx={cx - 50}
                cy={cy - tableH / 2 - 28}
                r={seatR}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />
              <circle
                cx={cx + 50}
                cy={cy - tableH / 2 - 28}
                r={seatR}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />
              {/* bottom seats */}
              <circle
                cx={cx - 50}
                cy={cy + tableH / 2 + 28}
                r={seatR}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />
              <circle
                cx={cx + 50}
                cy={cy + tableH / 2 + 28}
                r={seatR}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />
              {/* left seat */}
              <circle
                cx={cx - tableW / 2 - 28}
                cy={cy}
                r={seatR}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />
              {/* right seat */}
              <circle
                cx={cx + tableW / 2 + 28}
                cy={cy}
                r={seatR}
                stroke="var(--rule-strong)"
                fill="var(--bg)"
              />

              {/* table label */}
              <text
                x={cx}
                y={cy + tableH / 2 + 70}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fontWeight={500}
                letterSpacing="1.4"
                fill="var(--text-tertiary)"
              >
                TABLE {String(idx + 1).padStart(2, "0")}
              </text>
            </g>
          )
        }),
      )}

      {/* teacher origin — accent dot at top center */}
      <g>
        <circle
          cx={800}
          cy={140}
          r={16}
          fill="var(--accent-schematic)"
          stroke="none"
        />
        <line
          x1={800 - 22}
          y1={140}
          x2={800 + 22}
          y2={140}
          stroke="var(--rule-strong)"
          strokeWidth={0.5}
        />
        <line
          x1={800}
          y1={140 - 22}
          x2={800}
          y2={140 + 22}
          stroke="var(--rule-strong)"
          strokeWidth={0.5}
        />
        <text
          x={800}
          y={184}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-tertiary)"
        >
          TEACHER · GLOBAL VIEW
        </text>
      </g>

    </svg>
  )
}
