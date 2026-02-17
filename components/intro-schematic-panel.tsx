import { cn } from "@/lib/utils"

interface IntroSchematicPanelProps {
  variant: "teams" | "recall" | "agents"
  className?: string
}

export function IntroSchematicPanel({ variant, className }: IntroSchematicPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-surface overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-foreground/[0.08]" />
      <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-foreground/[0.08]" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-foreground/[0.08]" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-foreground/[0.08]" />

      {/* Teal indicator + label */}
      <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
        <span className="font-mono text-[10px] tracking-[0.15em] text-foreground-tertiary uppercase">
          {variant === "teams" && "System diagram"}
          {variant === "recall" && "Architecture"}
          {variant === "agents" && "Shell model"}
        </span>
      </div>

      {/* Diagram content */}
      <div className="relative h-full flex items-center justify-center p-10 pt-14">
        {variant === "teams" && <TeamsSchematic />}
        {variant === "recall" && <RecallSchematic />}
        {variant === "agents" && <AgentsSchematic />}
      </div>
    </div>
  )
}

function TeamsSchematic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none" className="opacity-25 max-w-[320px]">
      {/* Full-class view (top) */}
      <rect x="60" y="10" width="200" height="60" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <text x="70" y="28" className="text-foreground" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.4">FULL CLASS</text>
      {/* Grid of small tiles inside */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <rect key={i} x={72 + (i % 4) * 44} y={34} width={36} height={28} rx="1.5" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.4" />
      ))}

      {/* Arrow down */}
      <line x1="160" y1="70" x2="160" y2="95" stroke="currentColor" strokeWidth="0.6" className="text-foreground" />
      <polygon points="156,92 160,100 164,92" fill="currentColor" className="text-accent" opacity="0.4" />

      {/* Divider dashes */}
      <line x1="40" y1="105" x2="280" y2="105" stroke="currentColor" strokeWidth="0.4" className="text-foreground" strokeDasharray="3 5" opacity="0.3" />
      <text x="130" y="115" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.3">TRANSITION</text>

      {/* Virtual tables (bottom) */}
      <rect x="20" y="130" width="120" height="90" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <text x="30" y="146" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">TABLE A</text>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={32 + (i % 2) * 50} y={154} width={42} height={24} rx="1.5" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.5" />
      ))}
      {[0, 1].map(i => (
        <rect key={i} x={32 + i * 50} y={184} width={42} height={24} rx="1.5" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.5" />
      ))}
      <circle cx="28" cy="146" r="2" fill="currentColor" className="text-accent" opacity="0.5" />

      <rect x="160" y="130" width="120" height="90" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <text x="170" y="146" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">TABLE B</text>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={172 + (i % 2) * 50} y={154} width={42} height={24} rx="1.5" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.5" />
      ))}
      {[0, 1].map(i => (
        <rect key={i} x={172 + i * 50} y={184} width={42} height={24} rx="1.5" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.5" />
      ))}
      <circle cx="168" cy="146" r="2" fill="currentColor" className="text-accent" opacity="0.5" />

      {/* Tick marks */}
      <line x1="10" y1="10" x2="10" y2="230" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="6" y1="70" x2="14" y2="70" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="6" y1="130" x2="14" y2="130" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
    </svg>
  )
}

function RecallSchematic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none" className="opacity-25 max-w-[320px]">
      {/* Search bar at top */}
      <rect x="40" y="10" width="240" height="28" rx="14" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <circle cx="58" cy="24" r="6" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.5" />
      <line x1="62" y1="28" x2="66" y2="32" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.5" />
      <line x1="74" y1="24" x2="180" y2="24" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />

      {/* Arrow down */}
      <line x1="160" y1="38" x2="160" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <text x="168" y="52" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.3">SEMANTIC INDEX</text>

      {/* Memory cards grid */}
      <rect x="20" y="65" width="130" height="80" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      {/* Visual snapshot area */}
      <rect x="28" y="73" width="114" height="40" rx="1.5" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.4" />
      <line x1="60" y1="83" x2="100" y2="83" stroke="currentColor" strokeWidth="0.4" className="text-accent" opacity="0.3" />
      <line x1="60" y1="90" x2="88" y2="90" stroke="currentColor" strokeWidth="0.4" className="text-accent" opacity="0.3" />
      {/* Metadata */}
      <line x1="28" y1="120" x2="80" y2="120" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="28" y1="128" x2="60" y2="128" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
      <circle cx="136" cy="73" r="2" fill="currentColor" className="text-accent" opacity="0.5" />

      <rect x="170" y="65" width="130" height="80" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="178" y="73" width="114" height="40" rx="1.5" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.4" />
      <line x1="210" y1="83" x2="250" y2="83" stroke="currentColor" strokeWidth="0.4" className="text-accent" opacity="0.3" />
      <line x1="210" y1="90" x2="240" y2="90" stroke="currentColor" strokeWidth="0.4" className="text-accent" opacity="0.3" />
      <line x1="178" y1="120" x2="230" y2="120" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="178" y1="128" x2="210" y2="128" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
      <circle cx="286" cy="73" r="2" fill="currentColor" className="text-accent" opacity="0.5" />

      {/* Controls panel below */}
      <rect x="20" y="160" width="280" height="44" rx="3" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <text x="30" y="176" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.3">PRIVACY CONTROLS</text>
      {/* Toggle indicators */}
      <rect x="30" y="184" width="24" height="10" rx="5" stroke="currentColor" strokeWidth="0.6" className="text-accent" opacity="0.4" />
      <circle cx="46" cy="189" r="3.5" fill="currentColor" className="text-accent" opacity="0.35" />
      <line x1="64" y1="189" x2="120" y2="189" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />

      <rect x="150" y="184" width="24" height="10" rx="5" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.3" />
      <line x1="184" y1="189" x2="240" y2="189" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />

      {/* Timeline ticks on right */}
      <line x1="310" y1="65" x2="310" y2="204" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="306" y1="65" x2="314" y2="65" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="306" y1="105" x2="314" y2="105" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="306" y1="160" x2="314" y2="160" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
    </svg>
  )
}

function AgentsSchematic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none" className="opacity-25 max-w-[320px]">
      {/* Taskbar at bottom */}
      <rect x="20" y="200" width="280" height="30" rx="2" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <text x="30" y="218" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">TASKBAR</text>
      {/* App icons */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={120 + i * 32} y={208} width={20} height={14} rx="1.5" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.4" />
      ))}
      {/* Agent indicator */}
      <rect x="216" y="208" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.5" />
      <circle cx="226" cy="215" r="2" fill="currentColor" className="text-accent" opacity="0.6" />
      {/* Pulsing ring around agent icon */}
      <circle cx="226" cy="215" r="5" stroke="currentColor" strokeWidth="0.4" className="text-accent" opacity="0.2" />

      {/* Hover card floating above agent icon */}
      <line x1="226" y1="200" x2="226" y2="178" stroke="currentColor" strokeWidth="0.5" className="text-foreground" strokeDasharray="2 2" opacity="0.3" />

      <rect x="160" y="60" width="140" height="115" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <text x="170" y="78" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">AGENT STATUS</text>

      {/* Progress section */}
      <line x1="170" y1="86" x2="290" y2="86" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <text x="170" y="98" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.3">CURRENT STEP</text>
      <rect x="170" y="102" width="80" height="6" rx="3" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <rect x="170" y="102" width="52" height="6" rx="3" fill="currentColor" className="text-accent" opacity="0.2" />

      {/* Activity lines */}
      <text x="170" y="122" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.3">RECENT</text>
      <line x1="170" y1="128" x2="260" y2="128" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="170" y1="136" x2="240" y2="136" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="170" y1="144" x2="250" y2="144" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />

      {/* Control buttons */}
      <rect x="170" y="154" width="40" height="14" rx="2" stroke="currentColor" strokeWidth="0.6" className="text-accent" opacity="0.4" />
      <text x="178" y="164" className="text-accent" fill="currentColor" fontSize="5.5" fontFamily="monospace" opacity="0.4">PAUSE</text>
      <rect x="218" y="154" width="36" height="14" rx="2" stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.3" />
      <text x="226" y="164" className="text-foreground" fill="currentColor" fontSize="5.5" fontFamily="monospace" opacity="0.3">STOP</text>

      {/* Escalation path on left */}
      <rect x="20" y="60" width="120" height="70" rx="3" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <text x="30" y="78" className="text-foreground" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">ESCALATION</text>
      <line x1="30" y1="86" x2="130" y2="86" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      {/* Decision / Failure / Permissions */}
      <circle cx="38" cy="98" r="3" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="46" y1="98" x2="100" y2="98" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <circle cx="38" cy="110" r="3" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="46" y1="110" x2="90" y2="110" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <circle cx="38" cy="122" r="3" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="46" y1="122" x2="110" y2="122" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />

      {/* Connecting line from escalation to hover card */}
      <line x1="140" y1="95" x2="160" y2="95" stroke="currentColor" strokeWidth="0.4" className="text-foreground" strokeDasharray="2 3" opacity="0.2" />
    </svg>
  )
}
