export const AGENT_STATES = {
  working: [
    { id: "intake", name: "Intake", period: 3000 },
    { id: "process", name: "Process", period: 2800 },
    { id: "synthesize", name: "Synthesize", period: 2400 },
    { id: "output", name: "Output", period: 1600 },
  ],
  nonWorking: [
    { id: "attention", name: "Needs Attention", period: 1200, color: "#FFB800" },
    { id: "failed", name: "Failed", period: 4000, color: "#FF3B30" },
    { id: "complete", name: "Complete", period: 4000, color: "#34C759" },
  ],
} as const

export const WORKING_COLOR = "#5B9BF5"
