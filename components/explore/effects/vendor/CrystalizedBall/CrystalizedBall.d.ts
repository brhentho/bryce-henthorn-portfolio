import type { ComponentType, CSSProperties } from "react"
interface CrystalizedBallProps {
  color?: string
  size?: number
  speed?: number
  fill?: number
  particleCount?: number
  crackle?: number
  intro?: boolean
  interactive?: boolean
  style?: CSSProperties
}
declare const CrystalizedBall: ComponentType<CrystalizedBallProps>
export default CrystalizedBall
