export const PAIRS = [
  { code: "model.predict(input_tensor)", human: "Analyzing your request" },
  { code: "confidence: 0.94", human: "High confidence result" },
  { code: "agent.execute(task_queue[0])", human: "Starting your task" },
  { code: "ctx.summarize(history[-5:])", human: "Reviewing recent context" },
  { code: "if risk_score > threshold:", human: "Checking safety" },
  { code: "embeddings = encode(query)", human: "Understanding intent" },
  { code: "response.stream(chunks)", human: "Preparing your answer" },
  { code: "orchestrator.delegate(sub)", human: "Breaking into steps" },
  { code: "memory.retrieve(user_ctx)", human: "Recalling preferences" },
  { code: "validation.run(output)", human: "Verifying the result" },
  { code: "planner.next_action(state)", human: "Deciding next step" },
  { code: "tools.search(knowledge_base)", human: "Searching for info" },
  { code: "reason(chain[n], depth=3)", human: "Thinking it through" },
  { code: "score: softmax([0.2, 0.9])", human: "Evaluating options" },
  { code: "delegate(subtask_list)", human: "Coordinating work" },
] as const

export type TextPair = (typeof PAIRS)[number]

export interface TextParticle {
  x: number
  y: number
  speed: number
  code: string
  human: string
  morph: number
  alpha: number
  drift: number
  lastDropY: number
}

export interface DroppedGlyph {
  x: number
  y: number
  char: string
  alpha: number
  decay: number
  font: string
}

/* Timing */
export const SPAWN_MIN_MS = 3500
export const SPAWN_JITTER_MS = 2500
export const SPEED_MIN = 28
export const SPEED_RANGE = 14
export const DROP_INTERVAL_PX = 18
export const MAX_ALPHA = 0.16
export const MORPH_ZONE_PX = 50
export const GLYPH_MIN_ALPHA = 0.005

/* Fonts */
export const FONT_CODE = "400 15px 'SF Mono', 'Fira Code', 'Courier New', monospace"
export const FONT_HUMAN = "400 15px -apple-system, 'Segoe UI', sans-serif"
