import { cn } from "@/lib/utils"
import { TelemetryValue } from "./TelemetryValue"

type Item = {
  value: string
  unit: string
  label: string
}

type Props = {
  items: Item[]
  className?: string
  variant?: "framed" | "quiet"
}

const valueStyle = {
  fontFamily: "var(--font-display)",
  lineHeight: 1,
  letterSpacing: "-0.02em",
  fontVariantNumeric: "tabular-nums",
}

export function Telemetry({ items, className, variant = "framed" }: Props) {
  const isQuiet = variant === "quiet"

  return (
    <div
      data-variant={variant}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-3",
        isQuiet
          ? "gap-y-8 sm:gap-x-8 lg:gap-x-12"
          : [
              "border border-[color:var(--rule)]",
              "divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--rule)]",
            ],
        className,
      )}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {items.map((item) =>
        isQuiet ? (
          <div key={item.label} className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <div
                className="font-[number:600] text-[color:var(--text-primary)]"
                style={{
                  ...valueStyle,
                  fontSize: "clamp(1.875rem, 4vw, 3rem)",
                }}
              >
                <TelemetryValue target={item.value} />
              </div>
              <div className="t-mono-label text-[color:var(--text-secondary)]">
                {item.unit}
              </div>
            </div>
            <div className="t-mono-caption mt-3 max-w-[34ch] text-[color:var(--text-secondary)]">
              {item.label}
            </div>
          </div>
        ) : (
          <div key={item.label} className="flex flex-col gap-2 p-6">
            <div
              className="font-[number:600] text-[color:var(--text-primary)]"
              style={{
                ...valueStyle,
                fontSize: "clamp(1.875rem, 5vw, 3.5rem)",
              }}
            >
              <TelemetryValue target={item.value} />
            </div>
            <div className="t-mono-label text-[color:var(--text-secondary)]">
              {item.unit}
            </div>
            <div className="t-mono-caption text-[color:var(--text-tertiary)]">
              {item.label}
            </div>
          </div>
        ),
      )}
    </div>
  )
}
