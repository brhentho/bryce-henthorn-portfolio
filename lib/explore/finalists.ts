export const FINALISTS = [
  { id: "synthesis", name: "Synthesis", number: "00", description: "The direct merge. Familiar editorial layers, a clear reading grid, and an isolated choice of hero." },
  { id: "presence", name: "Presence", number: "01", description: "A centered, responsive Orb and expansive product chapters. More scale, without holding the reading." },
  { id: "signal", name: "Signal", number: "02", description: "An ASCII atmosphere and image-rich editorial spreads. Color and composition follow the argument." },
] as const
export type Finalist = typeof FINALISTS[number]["id"]
export type HeroKind = "orb" | "ascii"

export function finalistHref(id: Finalist, onCase = false, hero: HeroKind = "ascii") {
  return `/explore/${id}${onCase ? "/agents-in-windows" : ""}${id === "synthesis" ? `?hero=${hero}` : ""}`
}
