"use client"

import { cn } from "@/lib/utils"

type State = { label: string }

type Props = {
  states: State[]
  duration?: number
  className?: string
}

export function StateDiagram({ states, duration = 6000, className }: Props) {
  const W = 1200
  const H = 200
  const padX = 80
  const usable = W - padX * 2
  const step = states.length > 1 ? usable / (states.length - 1) : 0
  const cy = H / 2
  const r = 14
  const animSec = duration / 1000

  return (
    <div
      className={cn(
        "border border-[color:var(--rule)] my-10 lg:my-14 p-6",
        className,
      )}
      role="img"
      aria-label={`State diagram: ${states.map((s) => s.label).join(" → ")}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        className="text-[color:var(--rule-strong)]"
      >
        {/* connecting line */}
        <line
          x1={padX}
          y1={cy}
          x2={W - padX}
          y2={cy}
          stroke="var(--rule-strong)"
          strokeWidth={1}
        />
        {/* nodes */}
        {states.map((s, i) => {
          const cx = padX + i * step
          return (
            <g key={s.label}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="var(--bg)"
                stroke="var(--rule-strong)"
                strokeWidth={1}
              />
              <text
                x={cx}
                y={cy + r + 28}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontWeight={500}
                fontSize="11"
                letterSpacing="1.2"
                fill="var(--text-tertiary)"
              >
                {s.label}
              </text>
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontWeight={400}
                fontSize="10"
                fill="var(--text-tertiary)"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          )
        })}
        {/* animated dot */}
        <circle
          data-anim
          r={5}
          cy={cy}
          fill="var(--accent-schematic)"
          style={{
            animation: `manual-state-dot ${animSec}s linear infinite`,
            offsetPath: `path("M ${padX} ${cy} L ${W - padX} ${cy}")`,
          }}
        />
      </svg>
      <style>{`
        @keyframes manual-state-dot {
          0%   { offset-distance: 0%; opacity: 1; }
          90%  { offset-distance: 100%; opacity: 1; }
          95%  { opacity: 0; }
          100% { offset-distance: 0%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
