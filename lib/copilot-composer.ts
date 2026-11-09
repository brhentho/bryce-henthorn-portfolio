export type ComposerOption = 1 | 2 | 3
export type ComposerPhase = "running" | "paused" | "control" | "stopped" | "ended"
export type ComposerEvent = "interrupt" | "take-control" | "resume" | "send" | "cancel"

// Local exhibit behavior, not a contract for the product or its agent runtime.
export function nextComposerPhase(
  phase: ComposerPhase,
  event: ComposerEvent,
  option: ComposerOption,
  message = "",
): ComposerPhase {
  if (phase === "ended") return phase
  switch (event) {
    case "interrupt":
      return phase === "running" || (phase === "paused" && option === 3)
        ? (option === 3 ? "stopped" : "paused") : phase
    case "take-control":
      return "control"
    case "resume":
      return "running"
    case "send":
      return message.trim() && (phase === "paused" || (phase === "running" && option === 3))
        ? "running" : phase
    case "cancel":
      return "ended"
  }
}
