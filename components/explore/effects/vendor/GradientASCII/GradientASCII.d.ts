import type { ComponentType, CSSProperties } from "react"
interface GradientASCIIProps {
  colors?: string[]
  shape?: "horizon" | "pinch" | "rise" | "eclipse"
  cellSize?: number
  density?: number
  speed?: number
  glow?: number
  flicker?: number
  grain?: number
  intro?: boolean
  fontFamily?: string
  dpr?: number
  style?: CSSProperties
}
declare const GradientASCII: ComponentType<GradientASCIIProps>
export default GradientASCII
