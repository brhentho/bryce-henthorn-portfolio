/** Research synthesis — 5 nodes connected into a synthesis hub. */
export function Fig2_1() {
  const W = 1600
  const H = 900
  const nodes = [
    { id: "A", x: 200,  y: 220, label: "INTERVIEWS" },
    { id: "B", x: 400,  y: 700, label: "DIARY STUDIES" },
    { id: "C", x: 1000, y: 760, label: "TELEMETRY" },
    { id: "D", x: 1300, y: 320, label: "USABILITY" },
    { id: "E", x: 1100, y: 140, label: "EXPERT REVIEW" },
  ]
  const hub = { x: 760, y: 460, label: "SYNTHESIS" }
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      fill="none"
      strokeWidth={1}
      className="manual-schematic block w-full"
      role="img"
      aria-label="Research synthesis diagram with 5 source nodes"
    >
      {nodes.map((n) => (
        <line key={`l-${n.id}`} x1={n.x} y1={n.y} x2={hub.x} y2={hub.y} stroke="var(--rule-strong)" />
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={20} stroke="var(--rule-strong)" fill="var(--bg)" />
          <text
            x={n.x} y={n.y + 50}
            textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.2"
            fill="var(--text-tertiary)"
          >
            {n.label}
          </text>
        </g>
      ))}
      <circle cx={hub.x} cy={hub.y} r={36} stroke="var(--rule-strong)" fill="var(--accent-schematic)" />
      <text
        x={hub.x} y={hub.y + 70}
        textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="11" fontWeight={500} letterSpacing="1.4"
        fill="var(--text-tertiary)"
      >
        {hub.label}
      </text>
    </svg>
  )
}
