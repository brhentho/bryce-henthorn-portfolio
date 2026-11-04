import type { ComponentType, CSSProperties } from "react"
interface FerrofluidProps {
  colors?: string[]
  speed?: number
  scale?: number
  brightness?: number
  spikeHeight?: number
  sharpness?: number
  tilt?: number
  mouseStrength?: number
  clickPulse?: boolean
  intro?: boolean
  dpr?: number
  style?: CSSProperties
}
declare const Ferrofluid: ComponentType<FerrofluidProps>
export default Ferrofluid
