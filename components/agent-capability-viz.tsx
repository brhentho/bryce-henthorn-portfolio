"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const timelineData = [
  { year: "2020", hours: 0.08, label: "Minutes" },
  { year: "2021", hours: 0.5, label: "" },
  { year: "2022", hours: 1.5, label: "" },
  { year: "2023", hours: 5, label: "" },
  { year: "2024", hours: 12, label: "" },
  { year: "2025", hours: 30, label: "" },
  { year: "2026", hours: 72, label: "" },
]

const milestones = [
  { year: "2020", y: 0.08, text: "Autocomplete & suggestions", sub: "Seconds of work" },
  { year: "2022", y: 1.5, text: "Code generation & chat", sub: "Minutes of work" },
  { year: "2024", y: 12, text: "Multi-step task agents", sub: "Hours of work" },
  { year: "2026", y: 72, text: "Autonomous workflows", sub: "Days of work" },
]

interface TooltipPayload {
  payload: { year: string; hours: number }
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    let duration: string
    if (d.hours < 1) duration = `${Math.round(d.hours * 60)} minutes`
    else if (d.hours < 24) duration = `~${Math.round(d.hours)} hours`
    else duration = `~${Math.round(d.hours / 24)} days`
    return (
      <div
        style={{
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: "10px 14px",
          color: "#e2e8f0",
          fontSize: 13,
        }}
      >
        <div style={{ fontWeight: 600 }}>{d.year}</div>
        <div style={{ color: "#60a5fa", marginTop: 2 }}>
          Max autonomous task length: {duration}
        </div>
      </div>
    )
  }
  return null
}

export function AgentCapabilityViz() {
  return (
    <div
      style={{
        background: "#0a0f1a",
        color: "#e2e8f0",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "40px 32px 32px",
        maxWidth: 960,
        margin: "0 auto",
        borderRadius: 16,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#60a5fa",
            marginBottom: 8,
          }}
        >
          Context — Why This Work Matters
        </div>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
            color: "#f1f5f9",
          }}
        >
          Agent Autonomy Is Growing Exponentially
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#94a3b8",
            margin: "8px 0 0",
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          AI agents now complete tasks that previously took 30+ hours in under
          10 — with capability doubling every ~7 months. As autonomy grows, so
          does the need for OS-level infrastructure to deploy, observe, and
          govern them.
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#64748b",
            margin: "6px 0 0",
            fontStyle: "italic",
          }}
        >
          Source: METR, &ldquo;Task Completion Horizon Over Time&rdquo; — Kwa et al. (2025),
          Samadi et al. (2025)
        </p>
      </div>

      {/* Chart */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: 12,
          padding: "24px 16px 8px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart
            data={timelineData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="capabilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              scale="log"
              domain={[0.05, 100]}
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => {
                if (v < 1) return `${Math.round(v * 60)}m`
                if (v < 24) return `${Math.round(v)}h`
                return `${Math.round(v / 24)}d`
              }}
              label={{
                value: "Max Autonomous Task Length",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { fill: "#64748b", fontSize: 11, textAnchor: "middle" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x="2025"
              stroke="rgba(250,204,21,0.4)"
              strokeDasharray="6 4"
              label={{
                value: "Windows Agent Canvas initiative",
                position: "top",
                fill: "#fbbf24",
                fontSize: 11,
                fontWeight: 600,
                offset: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#capabilityGradient)"
              dot={(props: { cx: number; cy: number; index: number }) => {
                const { cx, cy, index } = props
                const milestone = milestones.find(
                  (m) => m.year === timelineData[index]?.year
                )
                if (!milestone) return <g key={index} />
                return (
                  <g key={index}>
                    <circle cx={cx} cy={cy} r={6} fill="#3b82f6" stroke="#0a0f1a" strokeWidth={2} />
                    <text x={cx} y={cy - 18} textAnchor="middle" fill="#e2e8f0" fontSize={11} fontWeight={600}>
                      {milestone.text}
                    </text>
                    <text x={cx} y={cy - 6} textAnchor="middle" fill="#64748b" fontSize={9}>
                      {milestone.sub}
                    </text>
                  </g>
                )
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
