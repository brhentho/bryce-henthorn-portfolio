import type { ComponentType, CSSProperties } from "react"
interface OrbProps {
  colors?: string[]
  backgroundColor?: string
  size?: number
  speed?: number
  glow?: number
  bleed?: number
  trail?: number
  intro?: boolean
  followCursor?: boolean
  rotateOnHover?: boolean
  hoverIntensity?: number
  clickPulse?: boolean
  dpr?: number
  style?: CSSProperties
}
declare const Orb: ComponentType<OrbProps>
export default Orb
