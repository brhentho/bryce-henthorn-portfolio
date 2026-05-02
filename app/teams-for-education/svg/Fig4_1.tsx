/**
 * Anatomy of a virtual table card — single table with leader-line call-outs
 * to TABLE CARD, FIXED SEAT, PERSISTENT MATERIALS SLOT, and MODERATION HOOK.
 * Mirrors the operator-manual exploded-view pattern.
 */
export function Fig4_1() {
  const W = 1600
  const H = 900

  // Table geometry — anchored center-left so the right margin can hold callouts
  const tableX = 220
  const tableY = 280
  const tableW = 560
  const tableH = 340
  const cx = tableX + tableW / 2 // 500
  const cy = tableY + tableH / 2 // 450

  // Seats — 6 around the table (3 top, 3 bottom)
  const seatY_top = tableY - 56
  const seatY_bottom = tableY + tableH + 56
  const seatXs = [tableX + 100, cx, tableX + tableW - 100]
  const seatR = 28

  // Materials slot inside the table
  const slotX = tableX + 60
  const slotY = tableY + 60
  const slotW = 220
  const slotH = 130

  // Moderation indicator dot (top-right of table)
  const modX = tableX + tableW - 36
  const modY = tableY + 36

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="manual-schematic block w-full"
      role="img"
      aria-label="Anatomy of a virtual table card with labelled call-outs"
    >
      {/* faint reference horizon */}
      <line
        x1={120}
        y1={cy}
        x2={1480}
        y2={cy}
        stroke="var(--rule)"
        strokeWidth={0.5}
        strokeDasharray="2 6"
      />

      {/* table card */}
      <rect
        x={tableX}
        y={tableY}
        width={tableW}
        height={tableH}
        stroke="var(--rule-strong)"
        fill="var(--bg)"
      />

      {/* materials slot inside the table */}
      <rect
        x={slotX}
        y={slotY}
        width={slotW}
        height={slotH}
        stroke="var(--rule)"
        strokeWidth={0.75}
        strokeDasharray="4 5"
      />
      <text
        x={slotX + slotW / 2}
        y={slotY + slotH / 2 + 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight={400}
        letterSpacing="1.2"
        fill="var(--text-tertiary)"
      >
        MATERIALS
      </text>

      {/* moderation indicator */}
      <circle cx={modX} cy={modY} r={10} fill="var(--accent-schematic)" stroke="none" />
      <circle cx={modX} cy={modY} r={18} stroke="var(--rule-strong)" strokeWidth={0.75} />

      {/* seats */}
      {seatXs.map((sx, i) => (
        <g key={`top-${i}`}>
          <circle cx={sx} cy={seatY_top} r={seatR} stroke="var(--rule-strong)" fill="var(--bg)" />
          <text
            x={sx}
            y={seatY_top + 5}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            fontWeight={500}
            fill="var(--text-tertiary)"
          >
            {i + 1}
          </text>
        </g>
      ))}
      {seatXs.map((sx, i) => (
        <g key={`bot-${i}`}>
          <circle cx={sx} cy={seatY_bottom} r={seatR} stroke="var(--rule-strong)" fill="var(--bg)" />
          <text
            x={sx}
            y={seatY_bottom + 5}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            fontWeight={500}
            fill="var(--text-tertiary)"
          >
            {i + 4}
          </text>
        </g>
      ))}

      {/* leader lines from table to right-margin callouts */}
      <g stroke="var(--rule)" strokeWidth={0.5}>
        {/* TABLE CARD — points to the table edge midpoint */}
        <line x1={tableX + tableW} y1={cy} x2={1180} y2={cy} />
        <line x1={1180} y1={cy} x2={1300} y2={cy} />
        <circle cx={tableX + tableW} cy={cy} r={4} fill="var(--rule-strong)" />

        {/* FIXED SEAT — points to seat #2 (top-center) */}
        <line x1={cx + seatR} y1={seatY_top} x2={1180} y2={seatY_top - 50} />
        <line x1={1180} y1={seatY_top - 50} x2={1300} y2={seatY_top - 50} />
        <circle cx={cx + seatR} cy={seatY_top} r={4} fill="var(--rule-strong)" />

        {/* MATERIALS SLOT — points to slot edge */}
        <line x1={slotX + slotW} y1={slotY + slotH / 2} x2={1180} y2={cy - 70} />
        <line x1={1180} y1={cy - 70} x2={1300} y2={cy - 70} />
        <circle cx={slotX + slotW} cy={slotY + slotH / 2} r={4} fill="var(--rule-strong)" />

        {/* MODERATION HOOK — points to the dot */}
        <line x1={modX + 18} y1={modY} x2={1180} y2={cy + 80} />
        <line x1={1180} y1={cy + 80} x2={1300} y2={cy + 80} />
        <circle cx={modX + 18} cy={modY} r={4} fill="var(--rule-strong)" />
      </g>

      {/* right-margin callouts */}
      <g>
        {/* FIXED SEAT */}
        <text
          x={1310}
          y={seatY_top - 46}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-secondary)"
        >
          FIXED SEAT
        </text>
        <text
          x={1310}
          y={seatY_top - 26}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Same seat across sessions
        </text>

        {/* MATERIALS SLOT */}
        <text
          x={1310}
          y={cy - 66}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-secondary)"
        >
          PERSISTENT MATERIALS SLOT
        </text>
        <text
          x={1310}
          y={cy - 46}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Pre-loaded; no mid-class downloads
        </text>

        {/* TABLE CARD */}
        <text
          x={1310}
          y={cy + 4}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-secondary)"
        >
          TABLE CARD
        </text>
        <text
          x={1310}
          y={cy + 24}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Persistent group container
        </text>

        {/* MODERATION HOOK */}
        <text
          x={1310}
          y={cy + 84}
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight={500}
          letterSpacing="1.4"
          fill="var(--text-secondary)"
        >
          MODERATION HOOK
        </text>
        <text
          x={1310}
          y={cy + 104}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight={400}
          fill="var(--text-tertiary)"
        >
          Ambient teacher controls
        </text>
      </g>
    </svg>
  )
}
